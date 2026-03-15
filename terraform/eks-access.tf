# SSO Admin access to EKS cluster
resource "aws_eks_access_entry" "sso_admin" {
  cluster_name  = var.eks_cluster_name
  principal_arn = "arn:aws:iam::${var.aws_account_id}:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_AdministratorAccess_d414b1f12041d6cf"

  tags = {
    Name = "sso-admin-eks-access"
  }
}

resource "aws_eks_access_policy_association" "sso_admin" {
  cluster_name  = var.eks_cluster_name
  principal_arn = aws_eks_access_entry.sso_admin.principal_arn
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"

  access_scope {
    type = "cluster"
  }
}
