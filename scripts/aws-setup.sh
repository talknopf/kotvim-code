#!/bin/bash
set -euo pipefail

##############################################################################
# kotvim-code AWS Infrastructure Setup Script
#
# This script creates:
#   1. ECR repository for Docker images
#   2. RDS PostgreSQL instance
#   3. GitHub Actions OIDC provider + IAM role
#   4. EKS RBAC for the GitHub Actions deployer role
#   5. Kubernetes secrets (with placeholders for Google OAuth)
#
# Prerequisites:
#   - AWS CLI configured with the presso account
#   - kubectl configured for the EKS cluster
#   - jq and openssl installed
#
# Usage:
#   chmod +x scripts/aws-setup.sh
#   ./scripts/aws-setup.sh
##############################################################################

AWS_REGION="${AWS_REGION:-eu-west-1}"
EKS_CLUSTER_NAME="${EKS_CLUSTER_NAME:-presso}"
ECR_REPO_NAME="kotvim-code"
GITHUB_ORG="talknopf"
GITHUB_REPO="kotvim-code"
RDS_INSTANCE_ID="kotvim-code-db"
RDS_DB_NAME="kotvim_code"
RDS_MASTER_USER="kotvim"
RDS_INSTANCE_CLASS="db.t4g.micro"
RDS_STORAGE_GB=20

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()   { echo -e "${GREEN}[✓]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
info()  { echo -e "${BLUE}[i]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

echo ""; echo "============================================"
echo "  kotvim-code AWS Infrastructure Setup"
echo "============================================"; echo ""

info "Checking prerequisites..."
command -v aws >/dev/null 2>&1 || error "AWS CLI is not installed"
command -v jq >/dev/null 2>&1 || error "jq is not installed"
command -v kubectl >/dev/null 2>&1 || error "kubectl is not installed"

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
log "AWS Account: ${AWS_ACCOUNT_ID}"
log "Region: ${AWS_REGION}"

# ─── Step 1: ECR ───────────────────────────────────────────────────────────
echo ""; info "Step 1: Creating ECR repository..."
if aws ecr describe-repositories --repository-names "${ECR_REPO_NAME}" --region "${AWS_REGION}" >/dev/null 2>&1; then
    warn "ECR repo already exists, skipping"
else
    aws ecr create-repository --repository-name "${ECR_REPO_NAME}" --region "${AWS_REGION}" \
        --image-scanning-configuration scanOnPush=true --encryption-configuration encryptionType=AES256 \
        --image-tag-mutability MUTABLE --output text
    log "ECR repository created"
fi
aws ecr put-lifecycle-policy --repository-name "${ECR_REPO_NAME}" --region "${AWS_REGION}" \
    --lifecycle-policy-text '{"rules":[{"rulePriority":1,"description":"Keep 20 images","selection":{"tagStatus":"any","countType":"imageCountMoreThan","countNumber":20},"action":{"type":"expire"}}]}' >/dev/null

# ─── Step 2: RDS ───────────────────────────────────────────────────────────
echo ""; info "Step 2: Creating RDS PostgreSQL..."
RDS_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=')

EKS_VPC_ID=$(aws eks describe-cluster --name "${EKS_CLUSTER_NAME}" --region "${AWS_REGION}" --query 'cluster.resourcesVpcConfig.vpcId' --output text)
EKS_SUBNET_IDS=$(aws eks describe-cluster --name "${EKS_CLUSTER_NAME}" --region "${AWS_REGION}" --query 'cluster.resourcesVpcConfig.subnetIds' --output text)

if ! aws rds describe-db-subnet-groups --db-subnet-group-name "kotvim-code-db-subnet" --region "${AWS_REGION}" >/dev/null 2>&1; then
    aws rds create-db-subnet-group --db-subnet-group-name "kotvim-code-db-subnet" \
        --db-subnet-group-description "kotvim-code RDS subnets" --subnet-ids ${EKS_SUBNET_IDS} \
        --region "${AWS_REGION}" --output text >/dev/null
    log "DB subnet group created"
fi

RDS_SG_NAME="kotvim-code-rds-sg"
EXISTING_SG=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=${RDS_SG_NAME}" "Name=vpc-id,Values=${EKS_VPC_ID}" \
    --region "${AWS_REGION}" --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || echo "None")

if [ "${EXISTING_SG}" = "None" ] || [ -z "${EXISTING_SG}" ]; then
    RDS_SG_ID=$(aws ec2 create-security-group --group-name "${RDS_SG_NAME}" --description "kotvim-code RDS SG" \
        --vpc-id "${EKS_VPC_ID}" --region "${AWS_REGION}" --query 'GroupId' --output text)
    EKS_NODE_SG=$(aws eks describe-cluster --name "${EKS_CLUSTER_NAME}" --region "${AWS_REGION}" \
        --query 'cluster.resourcesVpcConfig.clusterSecurityGroupId' --output text)
    aws ec2 authorize-security-group-ingress --group-id "${RDS_SG_ID}" --protocol tcp --port 5432 \
        --source-group "${EKS_NODE_SG}" --region "${AWS_REGION}" >/dev/null
    VPC_CIDR=$(aws ec2 describe-vpcs --vpc-ids "${EKS_VPC_ID}" --region "${AWS_REGION}" --query 'Vpcs[0].CidrBlock' --output text)
    aws ec2 authorize-security-group-ingress --group-id "${RDS_SG_ID}" --protocol tcp --port 5432 \
        --cidr-blocks "${VPC_CIDR}" --region "${AWS_REGION}" >/dev/null
    log "RDS security group created: ${RDS_SG_ID}"
else
    RDS_SG_ID="${EXISTING_SG}"
    warn "RDS security group already exists: ${RDS_SG_ID}"
fi

if aws rds describe-db-instances --db-instance-identifier "${RDS_INSTANCE_ID}" --region "${AWS_REGION}" >/dev/null 2>&1; then
    warn "RDS instance already exists, skipping"
    RDS_ENDPOINT=$(aws rds describe-db-instances --db-instance-identifier "${RDS_INSTANCE_ID}" --region "${AWS_REGION}" \
        --query 'DBInstances[0].Endpoint.Address' --output text)
else
    aws rds create-db-instance --db-instance-identifier "${RDS_INSTANCE_ID}" --db-instance-class "${RDS_INSTANCE_CLASS}" \
        --engine postgres --engine-version "16.4" --master-username "${RDS_MASTER_USER}" --master-user-password "${RDS_PASSWORD}" \
        --allocated-storage "${RDS_STORAGE_GB}" --db-name "${RDS_DB_NAME}" --vpc-security-group-ids "${RDS_SG_ID}" \
        --db-subnet-group-name "kotvim-code-db-subnet" --no-publicly-accessible --storage-type gp3 \
        --backup-retention-period 7 --region "${AWS_REGION}" --tags Key=Project,Value=kotvim-code --output text >/dev/null
    info "RDS creation initiated, waiting (5-10 min)..."
    aws rds wait db-instance-available --db-instance-identifier "${RDS_INSTANCE_ID}" --region "${AWS_REGION}"
    RDS_ENDPOINT=$(aws rds describe-db-instances --db-instance-identifier "${RDS_INSTANCE_ID}" --region "${AWS_REGION}" \
        --query 'DBInstances[0].Endpoint.Address' --output text)
    log "RDS is ready!"
fi
log "RDS endpoint: ${RDS_ENDPOINT}"

# ─── Step 3: GitHub OIDC ──────────────────────────────────────────────────
echo ""; info "Step 3: Setting up GitHub Actions OIDC..."
OIDC_PROVIDER_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
if aws iam get-open-id-connect-provider --open-id-connect-provider-arn "${OIDC_PROVIDER_ARN}" >/dev/null 2>&1; then
    warn "GitHub OIDC provider already exists"
else
    THUMBPRINT=$(openssl s_client -servername token.actions.githubusercontent.com -showcerts -connect token.actions.githubusercontent.com:443 < /dev/null 2>/dev/null \
        | openssl x509 -fingerprint -noout | sed 's/://g' | awk -F= '{print tolower($2)}')
    aws iam create-open-id-connect-provider --url "https://token.actions.githubusercontent.com" \
        --client-id-list "sts.amazonaws.com" --thumbprint-list "${THUMBPRINT}" --output text >/dev/null
    log "GitHub OIDC provider created"
fi

GH_ACTIONS_ROLE_NAME="kotvim-code-github-actions"
if aws iam get-role --role-name "${GH_ACTIONS_ROLE_NAME}" >/dev/null 2>&1; then
    warn "IAM role already exists"
    ROLE_ARN=$(aws iam get-role --role-name "${GH_ACTIONS_ROLE_NAME}" --query 'Role.Arn' --output text)
else
    TRUST_POLICY="{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Federated\":\"arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com\"},\"Action\":\"sts:AssumeRoleWithWebIdentity\",\"Condition\":{\"StringEquals\":{\"token.actions.githubusercontent.com:aud\":\"sts.amazonaws.com\"},\"StringLike\":{\"token.actions.githubusercontent.com:sub\":\"repo:${GITHUB_ORG}/${GITHUB_REPO}:*\"}}}]}"
    ROLE_ARN=$(aws iam create-role --role-name "${GH_ACTIONS_ROLE_NAME}" --assume-role-policy-document "${TRUST_POLICY}" \
        --description "kotvim-code GitHub Actions" --tags Key=Project,Value=kotvim-code --query 'Role.Arn' --output text)
    aws iam put-role-policy --role-name "${GH_ACTIONS_ROLE_NAME}" --policy-name "ecr-access" --policy-document \
        '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["ecr:*"],"Resource":"*"}]}'
    aws iam put-role-policy --role-name "${GH_ACTIONS_ROLE_NAME}" --policy-name "eks-access" --policy-document \
        '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["eks:DescribeCluster","eks:ListClusters"],"Resource":"*"}]}'
    log "IAM role created: ${ROLE_ARN}"
fi

# ─── Step 4: EKS RBAC ─────────────────────────────────────────────────────
echo ""; info "Step 4: Configuring EKS RBAC..."
kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kotvim-code-deployer
rules:
  - apiGroups: ["", "apps", "batch", "networking.k8s.io"]
    resources: ["namespaces", "deployments", "services", "ingresses", "pods", "jobs", "secrets", "configmaps"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["apps"]
    resources: ["deployments/status"]
    verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kotvim-code-deployer-binding
subjects:
  - kind: Group
    name: kotvim-code-deployers
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: kotvim-code-deployer
  apiGroup: rbac.authorization.k8s.io
EOF

aws eks create-access-entry --cluster-name "${EKS_CLUSTER_NAME}" --principal-arn "${ROLE_ARN}" \
    --kubernetes-groups "kotvim-code-deployers" --region "${AWS_REGION}" >/dev/null 2>&1 \
    && log "EKS access entry created" \
    || warn "EKS access entry may already exist — check manually if needed"

# ─── Step 5: K8s Secrets ──────────────────────────────────────────────────
echo ""; info "Step 5: Creating K8s namespace and secrets..."
kubectl create namespace kotvim-code --dry-run=client -o yaml | kubectl apply -f -
DATABASE_URL="postgresql://${RDS_MASTER_USER}:${RDS_PASSWORD}@${RDS_ENDPOINT}:5432/${RDS_DB_NAME}?schema=public"
NEXTAUTH_SECRET=$(openssl rand -base64 32)
kubectl create secret generic kotvim-code-secrets --namespace kotvim-code \
    --from-literal=DATABASE_URL="${DATABASE_URL}" --from-literal=NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
    --from-literal=GOOGLE_CLIENT_ID="PLACEHOLDER" --from-literal=GOOGLE_CLIENT_SECRET="PLACEHOLDER" \
    --dry-run=client -o yaml | kubectl apply -f -
log "K8s secrets created (Google OAuth = placeholder)"

# ─── Summary ──────────────────────────────────────────────────────────────
echo ""; echo "============================================"
echo "  ✅ Setup Complete!"; echo "============================================"; echo ""
log "ECR:  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"
log "RDS:  ${RDS_ENDPOINT}"
log "Role: ${ROLE_ARN}"
echo ""
echo -e "${YELLOW}━━━ SAVE THESE CREDENTIALS ━━━${NC}"
echo -e "  RDS Password:    ${RED}${RDS_PASSWORD}${NC}"
echo -e "  NextAuth Secret: ${RED}${NEXTAUTH_SECRET}${NC}"
echo -e "  Database URL:    ${RED}${DATABASE_URL}${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Next steps:"
echo "  1. Add GitHub secret: AWS_ROLE_ARN = ${ROLE_ARN}"
echo "  2. After Google OAuth setup, update K8s secret:"
echo "     kubectl -n kotvim-code create secret generic kotvim-code-secrets \\"
echo "       --from-literal=DATABASE_URL=\"${DATABASE_URL}\" \\"
echo "       --from-literal=NEXTAUTH_SECRET=\"${NEXTAUTH_SECRET}\" \\"
echo "       --from-literal=GOOGLE_CLIENT_ID=\"<ID>\" \\"
echo "       --from-literal=GOOGLE_CLIENT_SECRET=\"<SECRET>\" \\"
echo "       --dry-run=client -o yaml | kubectl apply -f -"
echo "  3. DNS: kotvim-code.luposec.io → EKS ingress"
echo "  4. Push to master → auto-deploy!"
