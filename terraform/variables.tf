variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "github_org" {
  description = "GitHub organization or user"
  type        = string
  default     = "talknopf"
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  default     = "kotvim-code"
}

variable "eks_cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "pressto-prod"
}

variable "aws_account_id" {
  description = "AWS account ID"
  type        = string
  default     = "212601668346"
}
