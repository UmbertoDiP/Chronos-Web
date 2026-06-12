#!/bin/bash
# Deploy script with AI-SEO fixes
# Automated deployment to Cloudflare Pages

set -e

echo "========================================
FOLDER2TEXT - AI-SEO FIX DEPLOYMENT
========================================
"

# Step 1: Build project
echo "[1/5] Building project..."
npm run build

# Step 2: Verify critical files
echo "[2/5] Verifying critical files..."
if [ ! -f "dist/_redirects" ]; then
  echo "ERROR: _redirects not found in dist/"
  exit 1
fi

if [ ! -f "dist/_headers" ]; then
  echo "ERROR: _headers not found in dist/"
  exit 1
fi

echo "✅ Critical files present"

# Step 3: Check wrangler auth
echo "[3/5] Checking Cloudflare authentication..."
if ! npx wrangler whoami 2>/dev/null; then
  echo "⚠️  Not authenticated. Run: npx wrangler login"
  exit 1
fi

# Step 4: Deploy to Cloudflare Pages
echo "[4/5] Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=folder2text --branch=main

# Step 5: Post-deployment instructions
echo "
[5/5] Post-Deployment Manual Steps
========================================

⚠️  CRITICAL: Fix Cloudflare Dashboard Settings

Login: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text

1. Disable Bot Fight Mode (AI Crawler Block):
   - Settings → Security → Bot Management
   - Set 'Cloudflare Managed Challenge' to OFF
   - OR add WAF rule to allow AI bots:
     Expression: (http.user_agent contains \"GPTBot\") or (http.user_agent contains \"ClaudeBot\")
     Action: Skip → All remaining custom rules

2. Remove Dashboard Redirect Rules:
   - Settings → Functions → Page Rules
   - DELETE any 301/308 redirect rules
   - Settings → Transform Rules → Redirect Rules
   - DELETE any redirect rules

3. Verify _redirects File Respected:
   - Check build logs: dist/_redirects should be copied
   - Test: curl -I https://folder2text.com/privacy
   - Should return: HTTP 200 (not 308)

4. Purge Cache:
   - Caching → Configuration → Purge Everything

========================================
Deployment URL: https://folder2text.com
Preview URL: https://main.folder2text.pages.dev
========================================

✅ Build deployed successfully
⚠️  Complete manual steps above to fix AI crawler issues

Re-test with: /verify-seo https://folder2text.com
Expected score: 85+/100 🟢
"
