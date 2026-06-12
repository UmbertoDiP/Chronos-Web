# Script per configurare dominio custom su Cloudflare Pages
# Esegui con: powershell -ExecutionPolicy Bypass -File setup-domain.ps1

$ErrorActionPreference = "Continue"

Write-Host "`n=== Cloudflare Pages Domain Setup ===" -ForegroundColor Cyan

# Variabili
$ZONE_ID = "b6dd50ed53388fa4645999e1aa5924f8"
$ACCOUNT_ID = "3b6245b263d581a0eddebc30df4797d6"
$DOMAIN = "umbertodipuorto.it"
$PROJECT = "umbertodipuorto-lovable"
$PAGES_TARGET = "umbertodipuorto-lovable.pages.dev"

Write-Host "`nStep 1: Ottengo API Token da Wrangler..." -ForegroundColor Yellow
$whoami = wrangler whoami 2>&1 | Out-String
Write-Host $whoami

# Nota: Non posso estrarre il token OAuth da Wrangler facilmente
# Procedo con metodo alternativo

Write-Host "`nStep 2: Info progetto Cloudflare Pages" -ForegroundColor Yellow
wrangler pages project list | Select-String "umbertodipuorto"

Write-Host "`nStep 3: Deploy corrente" -ForegroundColor Yellow
Write-Host "URL temporaneo: https://5bf06e1d.umbertodipuorto-lovable.pages.dev" -ForegroundColor Green
Write-Host "URL progetto: https://umbertodipuorto-lovable.pages.dev" -ForegroundColor Green

Write-Host "`n=== AZIONI MANUALI RICHIESTE ===" -ForegroundColor Red
Write-Host "`n1. Vai su: https://dash.cloudflare.com/$ACCOUNT_ID/umbertodipuorto.it/dns" -ForegroundColor White
Write-Host "2. Trova record: A | umbertodipuorto.it | 46.252.157.113" -ForegroundColor White
Write-Host "3. Click 'Modifica'" -ForegroundColor White
Write-Host "4. Cambia:" -ForegroundColor White
Write-Host "   - Type: CNAME" -ForegroundColor Cyan
Write-Host "   - Name: @" -ForegroundColor Cyan
Write-Host "   - Content: $PAGES_TARGET" -ForegroundColor Cyan
Write-Host "   - Proxy: ON (arancione)" -ForegroundColor Cyan
Write-Host "5. Save" -ForegroundColor White
Write-Host "`n6. Vai su: https://dash.cloudflare.com/$ACCOUNT_ID/pages/view/$PROJECT/settings/domains" -ForegroundColor White
Write-Host "7. Click 'Set up a custom domain'" -ForegroundColor White
Write-Host "8. Inserisci: $DOMAIN" -ForegroundColor Cyan
Write-Host "9. Continue" -ForegroundColor White

Write-Host "`n=== VERIFICA ===" -ForegroundColor Yellow
Write-Host "Dopo configurazione, attendi 2-5 minuti e verifica:" -ForegroundColor White
Write-Host "  nslookup $DOMAIN" -ForegroundColor Cyan
Write-Host "  curl -I https://$DOMAIN" -ForegroundColor Cyan

Write-Host "`nIl sito è GIÀ LIVE su:" -ForegroundColor Green
Write-Host "  https://umbertodipuorto-lovable.pages.dev`n" -ForegroundColor Green
