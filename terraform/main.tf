terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Local backend — this is a one-time OIDC setup.
  # State is committed to the repo for visibility.
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project     = "kotvim-code"
      Environment = "production"
      ManagedBy   = "terraform"
    }
  }
}
