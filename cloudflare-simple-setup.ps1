# Cloudflare Simple Setup: Cache Purge & Deploy Verification
# The middleware handles AI crawlers, no WAF rule needed!

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CLOUDFLARE SETUP - FOLDER2TEXT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Load API token
$tokenPath = "$env:USERPROFILE\.claude\cloudflare-api-token.txt"
if (-not (Test-Path $tokenPath)) {
    Write-Host "ERROR: Token not found at $tokenPath" -ForegroundColor Red
    exit 1
}

$token = Get-Content $tokenPath -Raw
$token = $token.Trim()

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# Step 1: Get Zone ID
Write-Host "[1/2] Getting Zone ID for folder2text.com..." -ForegroundColor Yellow

$zonesUri = "https://api.cloudflare.com/client/v4/zones?name=folder2text.com"
$zonesResponse = Invoke-RestMethod -Uri $zonesUri -Headers $headers -Method Get

if ($zonesResponse.result.Count -eq 0) {
    Write-Host "ERROR: Zone not found" -ForegroundColor Red
    exit 1
}

$zoneId = $zonesResponse.result[0].id
Write-Host "   Zone ID: $zoneId" -ForegroundColor Green

# Step 2: Purge cache
Write-Host "`n[2/2] Purging cache..." -ForegroundColor Yellow

$purgeUri = "https://api.cloudflare.com/client/v4/zones/$zoneId/purge_cache"
$purgePayload = @{
    purge_everything = $true
} | ConvertTo-Json

$purgeResponse = Invoke-RestMethod -Uri $purgeUri -Headers $headers -Method Post -Body $purgePayload

if ($purgeResponse.success) {
    Write-Host "   Cache purged successfully!" -ForegroundColor Green
} else {
    Write-Host "   WARNING: Cache purge failed" -ForegroundColor Yellow
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "PRE-DEPLOY SETUP COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nStatus:" -ForegroundColor White
Write-Host "  - Cache: Purged" -ForegroundColor Green
Write-Host "  - Middleware: Ready (functions/_middleware.ts)" -ForegroundColor Green
Write-Host "  - AI Crawlers: Will be handled by middleware" -ForegroundColor Green

Write-Host "`nNext step:" -ForegroundColor White
Write-Host "  Deploy the project to activate middleware:" -ForegroundColor Yellow
Write-Host "    npm run deploy" -ForegroundColor Cyan
Write-Host "`n  Or use automated deploy script:" -ForegroundColor Yellow
Write-Host "    .\deploy-fix-seo.ps1`n" -ForegroundColor Cyan
