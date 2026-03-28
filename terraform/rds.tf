# ──────────────────────────────────────────────
# RDS PostgreSQL – minimal instance for kotvim-code
# ──────────────────────────────────────────────

# ---------- look up EKS VPC & subnets ----------

data "aws_eks_cluster" "main" {
  name = var.eks_cluster_name
}

locals {
  vpc_id = data.aws_eks_cluster.main.vpc_config[0].vpc_id
}

data "aws_subnets" "eks_private" {
  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }

  tags = {
    "kubernetes.io/role/internal-elb" = "1"
  }
}

# Fallback: if no tagged private subnets, use all EKS subnets
locals {
  db_subnet_ids = length(data.aws_subnets.eks_private.ids) > 0 ? data.aws_subnets.eks_private.ids : tolist(data.aws_eks_cluster.main.vpc_config[0].subnet_ids)
}

# ---------- DB subnet group ----------

resource "aws_db_subnet_group" "kotvim" {
  name       = "kotvim-code-db-subnet"
  subnet_ids = local.db_subnet_ids

  tags = {
    Name = "kotvim-code-db-subnet"
  }
}

# ---------- security group ----------

resource "aws_security_group" "rds" {
  name        = "kotvim-code-rds-sg"
  description = "Allow PostgreSQL from EKS cluster"
  vpc_id      = local.vpc_id

  ingress {
    description     = "PostgreSQL from EKS cluster SG"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [data.aws_eks_cluster.main.vpc_config[0].cluster_security_group_id]
  }

  ingress {
    description = "PostgreSQL from private RFC1918 ranges"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "kotvim-code-rds-sg"
  }
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

  db_subnet_group_name   = aws_db_subnet_group.kotvim.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false

  backup_retention_period = 7
  skip_final_snapshot     = false
  final_snapshot_identifier = "kotvim-code-db-final"

  tags = {
    Name = "kotvim-code-db"
  }

  lifecycle {
    prevent_destroy = true
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
