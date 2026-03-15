# GitHub OIDC Provider
data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]

  tags = {
    Name = "github-actions-oidc"
  }
}

# Trust policy for GitHub OIDC
data "aws_iam_policy_document" "github_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_org}/${var.github_repo}:*"]
    }
  }
}

# GitHub Actions IAM Role
resource "aws_iam_role" "github_actions" {
  name               = "kotvim-code-github-actions"
  assume_role_policy = data.aws_iam_policy_document.github_assume_role.json

  tags = {
    Name = "github-actions-role"
  }
}

# Self-modifying IAM permissions
data "aws_iam_policy_document" "self_modify_iam" {
  statement {
    sid    = "SelfModifyIAM"
    effect = "Allow"

    actions = [
      "iam:GetRole",
      "iam:GetRolePolicy",
      "iam:ListRolePolicies",
      "iam:PutRolePolicy",
      "iam:DeleteRolePolicy",
      "iam:ListAttachedRolePolicies",
      "iam:AttachRolePolicy",
      "iam:DetachRolePolicy",
      "iam:GetPolicy",
      "iam:GetPolicyVersion",
      "iam:ListPolicyVersions",
      "iam:CreatePolicyVersion",
      "iam:DeletePolicyVersion",
      "iam:SetDefaultPolicyVersion",
    ]

    resources = [
      aws_iam_role.github_actions.arn,
      "arn:aws:iam::${var.aws_account_id}:policy/kotvim-code-*",
    ]
  }
}

resource "aws_iam_role_policy" "self_modify_iam" {
  name   = "self-modify-iam"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.self_modify_iam.json
}

# ECR full access
data "aws_iam_policy_document" "ecr_access" {
  statement {
    sid    = "ECRFullAccess"
    effect = "Allow"

    actions = [
      "ecr:*",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "ecr_access" {
  name   = "ecr-access"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.ecr_access.json
}

# EKS access
data "aws_iam_policy_document" "eks_access" {
  statement {
    sid    = "EKSDescribeAccess"
    effect = "Allow"

    actions = [
      "eks:DescribeCluster",
      "eks:ListClusters",
    ]

    resources = ["*"]
  }

  statement {
    sid    = "EKSSpecificClusterAccess"
    effect = "Allow"

    actions = [
      "eks:DescribeCluster",
    ]

    resources = [
      "arn:aws:eks:${var.region}:${var.aws_account_id}:cluster/${var.eks_cluster_name}",
    ]
  }
}

resource "aws_iam_role_policy" "eks_access" {
  name   = "eks-access"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.eks_access.json
}

# RDS full access
data "aws_iam_policy_document" "rds_access" {
  statement {
    sid    = "RDSFullAccess"
    effect = "Allow"

    actions = [
      "rds:*",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "rds_access" {
  name   = "rds-access"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.rds_access.json
}

# EC2 permissions for VPC, security groups, subnets
data "aws_iam_policy_document" "ec2_access" {
  statement {
    sid    = "EC2NetworkAccess"
    effect = "Allow"

    actions = [
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeSecurityGroupRules",
      "ec2:CreateSecurityGroup",
      "ec2:DeleteSecurityGroup",
      "ec2:AuthorizeSecurityGroupIngress",
      "ec2:AuthorizeSecurityGroupEgress",
      "ec2:RevokeSecurityGroupIngress",
      "ec2:RevokeSecurityGroupEgress",
      "ec2:DescribeSubnets",
      "ec2:DescribeVpcs",
      "ec2:DescribeNetworkInterfaces",
      "ec2:DescribeInstances",
      "ec2:DescribeTags",
      "ec2:CreateTags",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "ec2_access" {
  name   = "ec2-access"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.ec2_access.json
}

# STS GetCallerIdentity
data "aws_iam_policy_document" "sts_access" {
  statement {
    sid    = "STSGetCallerIdentity"
    effect = "Allow"

    actions = [
      "sts:GetCallerIdentity",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "sts_access" {
  name   = "sts-access"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.sts_access.json
}

# Secrets Manager access
data "aws_iam_policy_document" "secrets_manager_access" {
  statement {
    sid    = "SecretsManagerAccess"
    effect = "Allow"

    actions = [
      "secretsmanager:CreateSecret",
      "secretsmanager:GetSecretValue",
      "secretsmanager:UpdateSecret",
      "secretsmanager:DeleteSecret",
      "secretsmanager:DescribeSecret",
      "secretsmanager:ListSecrets",
    ]

    resources = [
      "arn:aws:secretsmanager:${var.region}:${var.aws_account_id}:secret:kotvim-code/*",
    ]
  }
}

resource "aws_iam_role_policy" "secrets_manager_access" {
  name   = "secrets-manager-access"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.secrets_manager_access.json
}

# EKS access entry — allows the GH Actions role to interact with the cluster
resource "aws_eks_access_entry" "github_actions" {
  cluster_name  = var.eks_cluster_name
  principal_arn = aws_iam_role.github_actions.arn

  kubernetes_groups = ["kotvim-code-deployers"]

  tags = {
    Name = "github-actions-eks-access"
  }
}
