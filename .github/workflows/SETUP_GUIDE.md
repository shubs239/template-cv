# GitHub Actions S3 Deployment Setup Guide

This guide will help you set up automated deployments from GitHub to S3 with CloudFront invalidation.

## Prerequisites
- GitHub repository with your frontend code
- AWS S3 bucket hosting your static site
- CloudFront distribution pointing to your S3 bucket
- AWS account with IAM access

---

## Step 1: Create IAM User for GitHub Actions

1. **Go to AWS IAM Console** → Users → Create User
2. **User name**: `github-actions-deployer` (or any name you prefer)
3. **Access type**: Select "Programmatic access" (Access key)
4. Click **Next**

### Attach Permissions:

Create a custom policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketSync",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME/*",
        "arn:aws:s3:::YOUR-BUCKET-NAME"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
    }
  ]
}
```

5. **Complete user creation** and save the credentials:
   - **Access Key ID** (looks like: AKIA...)
   - **Secret Access Key** (shown only once!)

---

## Step 2: Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these four secrets:

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `AWS_ACCESS_KEY_ID` | Your IAM Access Key ID | From Step 1 |
| `AWS_SECRET_ACCESS_KEY` | Your IAM Secret Access Key | From Step 1 |
| `S3_BUCKET_NAME` | Your S3 bucket name | AWS S3 Console |
| `CLOUDFRONT_DISTRIBUTION_ID` | Your CloudFront distribution ID | AWS CloudFront Console (looks like: E1234ABCD5678) |

---

## Step 3: Add Workflow File to Your Repository

1. In your GitHub repository, create this folder structure:
   ```
   .github/
     workflows/
       deploy-to-s3.yml
   ```

2. Copy the contents of `deploy-to-s3.yml` (provided separately) into this file

3. **Update the workflow file** with your specific settings:
   - Line 5: Change `main` to your default branch name if different
   - Line 24: Change `us-east-1` to your AWS region
   - Lines 6-13: Add/remove file extensions based on your project

---

## Step 4: Verify and Test

1. **Commit and push** the workflow file to your repository:
   ```bash
   git add .github/workflows/deploy-to-s3.yml
   git commit -m "Add GitHub Actions deployment workflow"
   git push origin main
   ```

2. **Check the Actions tab** in your GitHub repository
   - You should see the workflow running
   - Click on it to see detailed logs

3. **Test the deployment**:
   - Make a small change to your HTML/CSS/JS
   - Commit and push to main branch
   - Watch the GitHub Actions workflow deploy automatically
   - Check your CloudFront URL to see the changes

---

## Troubleshooting

### Workflow fails with "Access Denied"
- Check IAM policy has correct bucket name and distribution ID
- Verify secrets are set correctly in GitHub
- Ensure IAM user has programmatic access enabled

### Files not updating on S3
- Check the `--exclude` flags in the workflow aren't excluding your files
- Verify the workflow is triggered (check Actions tab)
- Confirm you're pushing to the correct branch

### CloudFront still showing old content
- Invalidation can take 1-5 minutes to complete
- Check invalidation was created in CloudFront console
- Try a hard refresh in browser (Ctrl+Shift+R)

### Workflow not triggering
- Check the branch name matches in workflow file (line 5)
- Verify the changed files match the `paths` filters
- Ensure workflow file is in `.github/workflows/` directory

---

## Optional Enhancements

### 1. Deploy only specific folders
If your frontend is in a subfolder (e.g., `frontend/`):

```yaml
- name: Sync files to S3
  run: |
    aws s3 sync ./frontend s3://${{ secrets.S3_BUCKET_NAME }} \
      --delete
```

### 2. Set cache-control headers
For better performance:

```yaml
- name: Sync files to S3
  run: |
    # HTML files - no cache
    aws s3 sync . s3://${{ secrets.S3_BUCKET_NAME }} \
      --exclude "*" --include "*.html" \
      --cache-control "max-age=0, no-cache" \
      --delete
    
    # CSS/JS files - 1 year cache
    aws s3 sync . s3://${{ secrets.S3_BUCKET_NAME }} \
      --exclude "*" --include "*.css" --include "*.js" \
      --cache-control "max-age=31536000, public" \
      --delete
    
    # Images - 1 week cache
    aws s3 sync . s3://${{ secrets.S3_BUCKET_NAME }} \
      --exclude "*" --include "*.jpg" --include "*.png" --include "*.svg" \
      --cache-control "max-age=604800, public" \
      --delete
```

### 3. Add deployment notifications
Get notified when deployments complete (via Slack, Discord, etc.)

### 4. Preview deployments for PRs
Deploy pull requests to a separate S3 bucket for testing before merging

---

## Security Best Practices

✅ **DO:**
- Use GitHub Secrets for all credentials
- Follow principle of least privilege for IAM permissions
- Rotate access keys periodically
- Use specific resource ARNs in IAM policies

❌ **DON'T:**
- Commit AWS credentials to your repository
- Use root AWS account credentials
- Give broader permissions than necessary
- Share access keys

---

## What happens on each push:

1. ✅ Code is pushed to GitHub (main branch)
2. ✅ GitHub Actions workflow triggers automatically
3. ✅ Workflow checks out your code
4. ✅ Authenticates with AWS using secrets
5. ✅ Syncs all files to S3 (deletes removed files)
6. ✅ Creates CloudFront invalidation
7. ✅ Your site is live with latest changes! 🎉

**Deployment time**: Usually 1-3 minutes total

---

## Need Help?

Common information you might need:
- **AWS Region codes**: us-east-1, us-west-2, eu-west-1, etc.
- **Find S3 bucket name**: AWS Console → S3 → Click your bucket
- **Find CloudFront Distribution ID**: AWS Console → CloudFront → Click distribution → ID column
- **Find AWS Account ID**: Click your username in AWS Console top-right