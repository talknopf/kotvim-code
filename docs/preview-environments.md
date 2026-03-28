# Preview Environments

Every pull request to `master` automatically gets a temporary preview environment deployed to EKS.

## How it works

1. **On PR open/update**: The `preview-deploy` workflow builds the Docker image, deploys it to a new Kubernetes namespace (`kotvim-code-pr-{number}`), and creates an ingress at `pr-{number}.kotvim-code.luposec.io`.

2. **On PR close/merge**: The `preview-cleanup` workflow deletes the namespace and cleans up ECR images.

3. **Database**: Previews share the production database. This is safe because lesson data is static and user progress is isolated per user.

4. **Secrets**: Production secrets are copied to each preview namespace automatically.

## One-time setup

Before preview environments will work, you need to complete these steps:

### 1. Wildcard DNS record

Add a wildcard DNS record so all `pr-*.kotvim-code.luposec.io` subdomains resolve to the same nginx ingress load balancer.

In your Route 53 hosted zone for `kotvim-code.luposec.io`, add:

```
*.kotvim-code.luposec.io  ->  ALIAS  ->  (same NLB as kotvim-code.luposec.io)
```

You can add this via the AWS Console or by updating the `dns.yaml` workflow.

### 2. Google OAuth (optional)

Google OAuth requires each redirect URI to be explicitly registered. For previews to support login, add this to your Google Cloud Console OAuth credentials:

```
https://pr-*.kotvim-code.luposec.io/api/auth/callback/google
```

> **Note:** Google does not support wildcard redirect URIs in production OAuth apps. Two alternatives:
>
> - **Skip login in previews** — UI changes can still be reviewed without auth. The preview will show the landing page.
> - **Use a single stable preview URL** — e.g., `https://preview.kotvim-code.luposec.io` and route the latest PR there.

For most PR reviews (UI changes, layout, content), you don't need auth to work.

### 3. cert-manager

The preview ingress uses `cert-manager.io/cluster-issuer: letsencrypt-prod` to automatically provision TLS certificates. Make sure your cert-manager cluster issuer `letsencrypt-prod` is configured.

If you hit Let's Encrypt rate limits (50 certs per domain per week), consider switching to a wildcard certificate using DNS-01 challenge.

## Resource limits

Preview deployments are lightweight:
- 1 replica (vs 2 in production)
- 50m CPU request / 250m limit (vs 100m/500m)
- 128Mi memory request / 256Mi limit (vs 256Mi/512Mi)

## Troubleshooting

### Preview not accessible
1. Check the wildcard DNS record exists
2. Check the namespace was created: `kubectl get ns kotvim-code-pr-{number}`
3. Check the deployment: `kubectl get pods -n kotvim-code-pr-{number}`
4. Check the TLS certificate: `kubectl get certificate -n kotvim-code-pr-{number}`

### Preview stuck deploying
Check pod logs: `kubectl logs -n kotvim-code-pr-{number} -l app=kotvim-code-preview`
