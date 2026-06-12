#!/bin/bash
# Automated Deploy Script for Folder2Text Lovable Wrapper
# Builds and deploys to Cloudflare Pages production

set -e  # Exit on error

echo "Starting deployment process..."

# Step 1: Build
echo "Building project..."
npm run build

# Step 2: Deploy to production branch
echo "Deploying to Cloudflare Pages (production)..."
npx wrangler pages deploy dist/ --project-name=folder2text --branch=folder2text --commit-dirty=true

# Step 3: Wait for CDN propagation
echo "Waiting 10 seconds for CDN cache propagation..."
sleep 10

# Step 4: Verify deployment
echo ""
echo "Deployment complete!"
echo ""
echo "URLs to verify:"
echo "  Production: https://folder2text.com"
echo "  WWW: https://www.folder2text.com"
echo "  Preview: https://main.folder2text.pages.dev"
echo ""
echo "Note: Browser cache may take 1-2 minutes to update. Force refresh with Ctrl+F5 if needed."
