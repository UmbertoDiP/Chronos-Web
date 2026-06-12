# Quick Start - Nuova Conversazione

**Comandi essenziali per riprendere il lavoro su Folder2Text da una nuova sessione Claude Code**

---

## 1. Verifica Status Produzione

```bash
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable
git status
git log --oneline -5
```

**Output atteso**:
```
On branch main
Your branch is up to date with 'origin/main'
nothing to commit, working tree clean

6f79eb5 AI-SEO optimization: Complete structured data + semantic HTML
3e0a3ff Add complete verification commands documentation
```

---

## 2. AI-SEO Audit Completo

```bash
/verify-seo https://folder2text.com
```

**Cosa fa**:
- Testa tutti i 9 URL del sitemap (HTTP status)
- Verifica AI crawlers (GPTBot, Claude, Perplexity)
- Analizza structured data schemas (Organization, FAQ, WebApp, etc.)
- Controlla H1 tags, semantic HTML5
- Calcola GEO/AEO compliance score (0-100)

**Score target**:
- 🔴 <60: Critical issues
- 🟡 60-79: Good, needs improvement
- 🟢 80+: Excellent AI-SEO compliance

**Output**: Report completo + [AI-SEO-AUDIT-REPORT.md](AI-SEO-AUDIT-REPORT.md) aggiornato

---

## 3. Verifica Deployment Cloudflare

```bash
# Check ultimo deploy
curl -I https://folder2text.com/ | head -1

# Verifica structured data schemas presenti
curl -s https://folder2text.com/ | grep -c '@type'
# Expected: 5+ (Organization, WebApp, FAQ, WebSite, Breadcrumb)

# Lista tutti gli schema types
curl -s https://folder2text.com/ | grep -oP '"@type":"[^"]+"' | sort | uniq

# Verifica H1 tag presente
curl -s https://folder2text.com/ | grep -c '<h1'
# Expected: 1
```

**Expected schemas**:
```
"@type":"BreadcrumbList"
"@type":"ListItem"
"@type":"Organization"
"@type":"Person"
"@type":"Question"
"@type":"FAQPage"
"@type":"SoftwareApplication"
"@type":"WebSite"
```

---

## 4. Build + Deploy Workflow

### Build Locale

```bash
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable
npm run build
```

### Deploy Preview

```bash
wrangler pages deploy dist
```

**Output**: Preview URL tipo `https://abc123.folder2text.pages.dev`

### Deploy Produzione (dopo preview OK)

```bash
# Via GitHub push (auto-deploy)
git add .
git commit -m "Your changes"
git push origin main

# Deploy propagation: ~2-5 min
# Verifica dopo 3 min con curl commands sopra
```

---

## 5. Verifica Fix Manuali Cloudflare

**CRITICAL**: Alcuni fix richiedono Cloudflare Dashboard (non possibili via codice)

### Check SPA Routing (HTTP 308 issue)

```bash
# Test che tutte le route SPA ritornino 200 (non 308)
curl -I https://folder2text.com/privacy | head -1
curl -I https://folder2text.com/it | head -1
curl -I https://folder2text.com/es | head -1

# Expected: HTTP/1.1 200 OK (NOT 308)
```

**Se 308 detected**: Vedi [CLOUDFLARE-MANUAL-FIX-REQUIRED.md](CLOUDFLARE-MANUAL-FIX-REQUIRED.md) sezione "Fix 1"

### Check AI Crawlers Access

```bash
# Verifica che GPTBot possa accedere
curl -A "GPTBot/1.0" https://folder2text.com/ | wc -c
# Expected: ~7500 bytes (HTML), NOT 0

# Verifica Claude-Web
curl -A "Claude-Web" https://folder2text.com/ | grep -i "folder2text"
# Expected: Match found, NOT blocked/403
```

**Se bloccati**: Vedi [CLOUDFLARE-MANUAL-FIX-REQUIRED.md](CLOUDFLARE-MANUAL-FIX-REQUIRED.md) sezione "Fix 2"

---

## 6. Middleware Verification

```bash
# Verifica middleware size (dopo ottimizzazioni)
wc -l functions/_middleware.js

# Expected: ~168 lines (con tutti gli schema + H1 injection)

# Check schema count nel middleware
grep -c '@type' functions/_middleware.js

# Expected: 5+ schemas defined
```

---

## 7. Re-Audit Post-Fix (Target Score 85-100)

```bash
# Dopo aver completato fix manuali Cloudflare:
/verify-seo https://folder2text.com --analyze-payload --output AI-SEO-AUDIT-REPORT-FINAL.md
```

**Metrics da verificare**:
- ✅ HTTP 200 su TUTTI i 9 URL sitemap (no 308)
- ✅ AI crawlers: 0/8 blocked (tutti allowed)
- ✅ Structured data: 5/6 schemas presente
- ✅ H1 tag: 1 presente
- ✅ Signal/Noise ratio: >0.17 (target >0.3)

**Score progression**:
- Pre-fix: 29/100 🔴
- Post code fixes: ~55/100 🟡
- Post Cloudflare fixes: ~85/100 🟢
- With advanced content: 90-100/100 🟢

---

## 8. Quick Health Check (1 Liner)

```bash
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable && \
git status && \
echo "--- Middleware Lines ---" && wc -l functions/_middleware.js && \
echo "--- Production HTTP Status ---" && curl -I https://folder2text.com/ | head -1 && \
echo "--- Structured Data Count ---" && curl -s https://folder2text.com/ | grep -c '@type'
```

**Expected output**:
```
On branch main
nothing to commit, working tree clean
--- Middleware Lines ---
168 functions/_middleware.js
--- Production HTTP Status ---
HTTP/1.1 200 OK
--- Structured Data Count ---
8
```

---

## 9. Documentazione Completa

| File | Purpose |
|------|---------|
| [AI-SEO-AUDIT-REPORT.md](AI-SEO-AUDIT-REPORT.md) | Latest audit results + action plan |
| [CLOUDFLARE-MANUAL-FIX-REQUIRED.md](CLOUDFLARE-MANUAL-FIX-REQUIRED.md) | Dashboard fixes (SPA routing + AI crawlers) |
| [VERIFICATION-COMMANDS.md](VERIFICATION-COMMANDS.md) | All verification commands FASE 1-3 |
| [FASE-3-COMPLETE-REPORT.md](FASE-3-COMPLETE-REPORT.md) | FASE 3 migration report (ownership 85/15) |
| [functions/_middleware.js](functions/_middleware.js) | Middleware con 5 schemas + H1 injection |

---

## 10. Troubleshooting Common Issues

### Issue: Schemas non presenti dopo deploy

```bash
# 1. Verifica ultimo commit pushed
git log origin/main --oneline -1

# 2. Verifica file middleware su GitHub
curl -s https://raw.githubusercontent.com/UmbertoDiP/folder2text/main/functions/_middleware.js | grep -c '@type'

# 3. Purge Cloudflare cache
# Dashboard → Caching → Purge Everything

# 4. Wait 3 min e re-check
sleep 180 && curl -s https://folder2text.com/ | grep -c '@type'
```

### Issue: Score non migliora dopo fix

```bash
# Re-run audit con cache bypass
/verify-seo https://folder2text.com --skip-cache

# O manualmente
curl -H "Cache-Control: no-cache" https://folder2text.com/ > /tmp/fresh.html
grep '@type' /tmp/fresh.html
```

### Issue: AI crawlers ancora bloccati

Problema: Cloudflare Bot Management attivo

**Fix**: Dashboard → Security → Bots → Allow AI crawlers

Vedi: [CLOUDFLARE-MANUAL-FIX-REQUIRED.md](CLOUDFLARE-MANUAL-FIX-REQUIRED.md) sezione completa

---

## 11. Next Steps per 100/100 Score

**Cosa manca per score perfetto** (attualmente ~85/100):

1. **Signal/Noise Ratio** (0.17 → 0.5)
   - Externalize inline CSS/JS
   - Minimize HTML whitespace
   - Target: <500KB HTML total

2. **Advanced Content Optimization**
   - Add 10+ FAQ questions (currently 7)
   - Add HowTo schema (tutorial content)
   - Add direct answer patterns in H2/H3 headings

3. **Perfect Semantic HTML5**
   - Full `<main>`, `<article>`, `<section>` structure
   - Currently: Basic via middleware, enhance in React components

4. **Additional Schemas** (nice-to-have)
   - Product schema (SaaS offering detail)
   - VideoObject (if demo videos added)
   - Review/AggregateRating (real user reviews)

**Time estimate**: 2-4 hours for 100/100

---

## 12. Comandi Slash Disponibili

| Comando | Descrizione |
|---------|-------------|
| `/verify-seo <URL>` | AI-SEO audit completo |
| `/deploy` | Build + deploy Lovable wrapper |
| `/cove <task>` | Chain of Verification protocol |
| `/taskgemini` | Generate Gemini debug prompt |

---

## Summary per Nuova Sessione

**In 3 comandi**:

```bash
# 1. Status check
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable && git status

# 2. AI-SEO audit
/verify-seo https://folder2text.com

# 3. Verifica schemas deployed
curl -s https://folder2text.com/ | grep -oP '"@type":"[^"]+"' | sort | uniq
```

**Current Status** (2026-02-28):
- ✅ Code fixes applied (schemas + H1 + robots.txt)
- ✅ Committed and pushed to main
- ⏳ Cloudflare auto-deploy in progress (~5 min)
- 🔴 Manual Cloudflare fixes pending (SPA routing + bot management)
- 📊 Expected score post-fixes: 85-90/100

**Next Action**: Wait 5 min → Re-run `/verify-seo` → Apply manual Cloudflare fixes if needed

---

**Created**: 2026-02-28
**Last Updated**: 2026-02-28 02:10 UTC
**Project**: Folder2Text Lovable Wrapper
**Production**: https://folder2text.com
