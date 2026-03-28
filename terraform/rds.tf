# ──────────────────────────────────────────────
# RDS PostgreSQL – minimal instance for kotvim-code
# ──────────────────────────────────────────────

# ---------- look up EKS cluster ----------

data "aws_eks_cluster" "main" {
  name = var.eks_cluster_name
}

locals {
  vpc_id = data.aws_eks_cluster.main.vpc_config[0].vpc_id
}

# ---------- reference pre-existing resources ----------
# These were created by the infra.yaml workflow

data "aws_db_subnet_group" "kotvim" {
  name = "kotvim-code-db-subnet"
}

data "aws_security_group" "rds" {
  name   = "kotvim-code-rds-sg"
  vpc_id = local.vpc_id
}

# ---------- random password ----------

resource "random_password" "rds" {
  length  = 25
  special = false   # keep URL-safe
}

# ---------- RDS instance ----------

resource "aws_db_instance" "kotvim" {
  identifier     = "kotvim-code-db"
  engine         = "postgres"
  engine_version = "16"
  instance_class = var.rds_instance_class

  allocated_storage = var.rds_allocated_storage
  storage_type      = "gp3"
  storage_encrypted = true

  db_name  = "kotvim_code"
  username = "kotvim"
  password = random_password.rds.result

  db_subnet_group_name   = data.aws_db_subnet_group.kotvim.name
  vpc_security_group_ids = [data.aws_security_group.rds.id]
  publicly_accessible    = false

  backup_retention_period = 7
  skip_final_snapshot     = false
  final_snapshot_identifier = "kotvim-code-db-final"

  tags = {
    Name = "kotvim-code-db"
  }
}

# ---------- outputs ----------

output "rds_endpoint" {
  description = "RDS instance endpoint (host:port)"
  value       = aws_db_instance.kotvim.endpoint
}

output "rds_address" {
  description = "RDS instance hostname"
  value       = aws_db_instance.kotvim.address
}

output "database_url" {
  description = "Full PostgreSQL connection string (sensitive)"
  value       = "postgresql://kotvim:${random_password.rds.result}@${aws_db_instance.kotvim.address}:5432/kotvim_code?schema=public"
  sensitive   = true
}
