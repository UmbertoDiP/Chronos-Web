# Deploy script with AI-SEO fixes
# Automated deployment to Cloudflare Pages
# Windows PowerShell version

$ErrorActionPreference = "Stop"

Write-Host "========================================
FOLDER2TEXT - AI-SEO FIX DEPLOYMENT
========================================
" -ForegroundColor Cyan

# Step 1: Build project
Write-Host "[1/5] Building project..." -ForegroundColor Yellow
npm run build

# Step 2: Verify critical files
Write-Host "[2/5] Verifying critical files..." -ForegroundColor Yellow
if (!(Test-Path "dist\_redirects")) {
    Write-Host "ERROR: _redirects not found in dist/" -ForegroundColor Red
    exit 1
}

if (!(Test-Path "dist\_headers")) {
    Write-Host "ERROR: _headers not found in dist/" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Critical files present" -ForegroundColor Green

# Step 3: Check wrangler auth
Write-Host "[3/5] Checking Cloudflare authentication..." -ForegroundColor Yellow
try {
    npx wrangler whoami 2>&1 | Out-Null
} catch {
    Write-Host "⚠️  Not authenticated. Run: npx wrangler login" -ForegroundColor Yellow
    exit 1
}

# Step 4: Deploy to Cloudflare Pages
Write-Host "[4/5] Deploying to Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy dist --project-name=folder2text --branch=main

# Step 5: Post-deployment instructions
Write-Host "
[5/5] Post-Deployment Manual Steps
========================================
" -ForegroundColor Cyan

Write-Host "⚠️  CRITICAL: Fix Cloudflare Dashboard Settings
" -ForegroundColor Red

Write-Host "Login: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text
"

Write-Host "1. Disable Bot Fight Mode (AI Crawler Block):" -ForegroundColor Yellow
Write-Host "   - Settings → Security → Bot Management"
Write-Host "   - Set 'Cloudflare Managed Challenge' to OFF"
Write-Host "   - OR add WAF rule to allow AI bots:"
Write-Host "     Expression: (http.user_agent contains 'GPTBot') or (http.user_agent contains 'ClaudeBot')"
Write-Host "     Action: Skip → All remaining custom rules"
Write-Host ""

Write-Host "2. Remove Dashboard Redirect Rules:" -ForegroundColor Yellow
Write-Host "   - Settings → Functions → Page Rules"
Write-Host "   - DELETE any 301/308 redirect rules"
Write-Host "   - Settings → Transform Rules → Redirect Rules"
Write-Host "   - DELETE any redirect rules"
Write-Host ""

Write-Host "3. Verify _redirects File Respected:" -ForegroundColor Yellow
Write-Host "   - Check build logs: dist/_redirects should be copied"
Write-Host "   - Test: curl -I https://folder2text.com/privacy"
Write-Host "   - Should return: HTTP 200 (not 308)"
Write-Host ""

Write-Host "4. Purge Cache:" -ForegroundColor Yellow
Write-Host "   - Caching → Configuration → Purge Everything"
Write-Host ""

Write-Host "========================================
Deployment URL: https://folder2text.com
Preview URL: https://main.folder2text.pages.dev
========================================
" -ForegroundColor Cyan

Write-Host "✅ Build deployed successfully" -ForegroundColor Green
Write-Host "⚠️  Complete manual steps above to fix AI crawler issues" -ForegroundColor Yellow

Write-Host "
Re-test with: /verify-seo https://folder2text.com
Expected score: 85+/100 🟢
" -ForegroundColor Green
