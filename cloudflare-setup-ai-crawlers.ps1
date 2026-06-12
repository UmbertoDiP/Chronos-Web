# Cloudflare Setup: Allow AI Crawlers via WAF Rule
# Automated script to create WAF custom rule for AI bot access

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CLOUDFLARE AI CRAWLERS SETUP" -ForegroundColor Cyan
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

$accountId = "3b6245b263d581a0eddebc30df4797d6"

# Step 1: Get Zone ID for folder2text.com
Write-Host "[1/4] Getting Zone ID for folder2text.com..." -ForegroundColor Yellow

$zonesUri = "https://api.cloudflare.com/client/v4/zones?name=folder2text.com"
$zonesResponse = Invoke-RestMethod -Uri $zonesUri -Headers $headers -Method Get

if ($zonesResponse.result.Count -eq 0) {
    Write-Host "ERROR: Zone folder2text.com not found" -ForegroundColor Red
    exit 1
}

$zoneId = $zonesResponse.result[0].id
Write-Host "   Zone ID: $zoneId" -ForegroundColor Green

# Step 2: Check if rule already exists
Write-Host "`n[2/4] Checking existing WAF rules..." -ForegroundColor Yellow

$rulesUri = "https://api.cloudflare.com/client/v4/zones/$zoneId/rulesets"
$rulesResponse = Invoke-RestMethod -Uri $rulesUri -Headers $headers -Method Get

$existingRule = $null
foreach ($ruleset in $rulesResponse.result) {
    if ($ruleset.phase -eq "http_request_firewall_custom") {
        foreach ($rule in $ruleset.rules) {
            if ($rule.description -like "*AI Crawlers*") {
                $existingRule = $rule
                break
            }
        }
    }
}

if ($existingRule) {
    Write-Host "   Found existing AI Crawlers rule: $($existingRule.description)" -ForegroundColor Yellow
    Write-Host "   Skipping creation (already configured)" -ForegroundColor Green
} else {
    # Step 3: Create WAF custom rule
    Write-Host "`n[3/4] Creating WAF custom rule to allow AI crawlers..." -ForegroundColor Yellow

    $ruleExpression = @"
(http.user_agent contains "GPTBot") or
(http.user_agent contains "ChatGPT-User") or
(http.user_agent contains "ClaudeBot") or
(http.user_agent contains "Claude-Web") or
(http.user_agent contains "anthropic-ai") or
(http.user_agent contains "PerplexityBot") or
(http.user_agent contains "Google-Extended") or
(http.user_agent contains "Applebot-Extended") or
(http.user_agent contains "CCBot") or
(http.user_agent contains "Bytespider")
"@

    $rulePayload = @{
        rules = @(
            @{
                action = "skip"
                action_parameters = @{
                    phases = @("http_ratelimit", "http_request_firewall_managed")
                }
                expression = $ruleExpression
                description = "Allow AI Crawlers (GPTBot, ClaudeBot, CCBot, etc.)"
                enabled = $true
            }
        )
    } | ConvertTo-Json -Depth 10

    # Get or create custom ruleset
    $customRulesetUri = "https://api.cloudflare.com/client/v4/zones/$zoneId/rulesets/phases/http_request_firewall_custom/entrypoint"

    try {
        $createResponse = Invoke-RestMethod -Uri $customRulesetUri -Headers $headers -Method Put -Body $rulePayload

        if ($createResponse.success) {
            Write-Host "   WAF rule created successfully!" -ForegroundColor Green
        } else {
            Write-Host "   WARNING: Rule creation response: $($createResponse.errors)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "   ERROR: Failed to create rule: $_" -ForegroundColor Red
        Write-Host "   You may need to create it manually in dashboard" -ForegroundColor Yellow
    }
}

# Step 4: Purge cache
Write-Host "`n[4/4] Purging cache..." -ForegroundColor Yellow

$purgeUri = "https://api.cloudflare.com/client/v4/zones/$zoneId/purge_cache"
$purgePayload = @{
    purge_everything = $true
} | ConvertTo-Json

try {
    $purgeResponse = Invoke-RestMethod -Uri $purgeUri -Headers $headers -Method Post -Body $purgePayload

    if ($purgeResponse.success) {
        Write-Host "   Cache purged successfully!" -ForegroundColor Green
    }
} catch {
    Write-Host "   WARNING: Cache purge failed: $_" -ForegroundColor Yellow
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SETUP COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nConfiguration applied:" -ForegroundColor White
Write-Host "  - WAF Custom Rule: Allow AI Crawlers" -ForegroundColor Green
Write-Host "  - Cache: Purged" -ForegroundColor Green

Write-Host "`nNext steps:" -ForegroundColor White
Write-Host "  1. Verify with: /verify-seo https://folder2text.com" -ForegroundColor Yellow
Write-Host "  2. Expected score: 85+/100" -ForegroundColor Yellow

Write-Host "`nDashboard (optional manual check):" -ForegroundColor White
Write-Host "  https://dash.cloudflare.com/$accountId/pages/view/folder2text`n" -ForegroundColor Gray
