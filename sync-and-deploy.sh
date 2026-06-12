#!/bin/bash
# Sync templates from FolderTextMerger and deploy to production

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOVABLE_DIR="$SCRIPT_DIR"
MASTER_TEMPLATES="../FolderTextMerger/lovable-templates"

echo "================================================"
echo "Folder2Text Lovable - Sync & Deploy to Production"
echo "================================================"
echo ""

# Step 1: Sync templates from master
echo "[1/5] Syncing templates from master..."
if [ -d "$MASTER_TEMPLATES" ]; then
    echo "  - Copying PrivacyPolicy.tsx from master..."
    cp "$MASTER_TEMPLATES/PrivacyPolicy.tsx" "$LOVABLE_DIR/src/pages/PrivacyPolicy.tsx"

    echo "  - Copying TermsOfService.tsx from master..."
    cp "$MASTER_TEMPLATES/TermsOfService.tsx" "$LOVABLE_DIR/src/pages/TermsOfService.tsx"

    echo "  Templates synced successfully!"
else
    echo "  WARNING: Master templates directory not found at $MASTER_TEMPLATES"
    echo "  Continuing with existing files..."
fi
echo ""

# Step 2: Check for changes
echo "[2/5] Checking for changes..."
cd "$LOVABLE_DIR"
if git diff --quiet src/pages/PrivacyPolicy.tsx src/pages/TermsOfService.tsx; then
    echo "  No template changes detected."
    TEMPLATES_CHANGED=false
else
    echo "  Template changes detected!"
    TEMPLATES_CHANGED=true
fi
echo ""

# Step 3: Build project
echo "[3/5] Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    exit 1
fi
echo ""

# Step 4: Deploy to Cloudflare Pages (production branch)
echo "[4/5] Deploying to Cloudflare Pages (production)..."
npx wrangler pages deploy dist/ \
    --project-name=folder2text \
    --branch=folder2text \
    --commit-dirty=true
if [ $? -ne 0 ]; then
    echo "ERROR: Deployment failed!"
    exit 1
fi
echo ""

# Step 5: Commit and push to GitHub (if templates changed)
if [ "$TEMPLATES_CHANGED" = true ]; then
    echo "[5/5] Committing and pushing template updates to GitHub..."
    git add src/pages/PrivacyPolicy.tsx src/pages/TermsOfService.tsx
    git commit -m "Sync updated templates from master (Privacy Policy & Terms of Service)"
    git push origin main
    echo "  Changes pushed to GitHub!"
else
    echo "[5/5] Skipping GitHub push (no template changes)."
fi
echo ""

echo "================================================"
echo "Deployment Complete!"
echo "================================================"
echo ""
echo "Live URLs:"
echo "  - Production: https://folder2text.com"
echo "  - WWW: https://www.folder2text.com"
echo "  - Preview: https://main.folder2text.pages.dev"
echo ""
echo "Verify deployment:"
echo "  - Check Google Analytics is loaded"
echo "  - Verify sitemap: https://folder2text.com/sitemap.xml"
echo "  - Test Privacy Policy: https://folder2text.com/privacy"
echo "  - Test Terms of Service: https://folder2text.com/terms"
echo ""
