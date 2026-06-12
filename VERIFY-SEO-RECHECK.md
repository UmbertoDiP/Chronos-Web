# Quick SEO Re-Check Prompt

**Path assoluto file**:
```
c:\Users\umber\Documents\MyProjects\Folder2TextLovable\VERIFY-SEO-RECHECK.md
```

---

## Prompt per Nuova Conversazione

Copia e incolla questo nella nuova chat:

```
Verifica SEO finale folder2text.com con skill /verify-seo.

Esegui audit completo e confronta con target 100/100.

Se score < 100:
- Identifica regressioni
- Verifica middleware attivo
- Controlla semantic tags presenti

Dammi riepilogo:
1. Score attuale vs 100/100 target
2. Semantic HTML5 score (target ≥70)
3. Tutti i tag presenti (header, footer, nav, article, main, h1)
4. Organization schema presente
5. Tutte le URL sitemap HTTP 200

Alla fine: summary esecutivo stato SEO.
```

---

## Comandi Diretti (Alternativa)

Se preferisci comandi diretti invece del prompt:

```bash
# Audit completo
/verify-seo https://folder2text.com

# Quick check semantic tags
curl -s https://folder2text.com/ | grep -E '<header|<footer|<nav|<article|<main|<h1' | wc -l
# Expected: 6

# Check Organization schema
curl -s https://folder2text.com/ | grep -i 'organization' | wc -l
# Expected: ≥1

# Check all URLs HTTP 200
curl -s https://folder2text.com/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' | while read url; do
  STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  echo "$url → $STATUS"
done
# Expected: All 200
```

---

## Interpretazione Risultati

### ✅ Score 100/100
```
Pillar 1: 30/30
Pillar 2: 35/35
Pillar 3: 35/35
TOTAL: 100/100 🎯

Status: PERFECT - No action needed
```

### 🟡 Score 87-99/100
```
Possibili cause:
- Semantic HTML5 score < 70 → Verifica tag presenti
- Signal/Noise ratio < 0.3 → Payload troppo grande
- Organization schema mancante → Middleware non attivo

Action: Check middleware + redeploy se necessario
```

### 🔴 Score < 87/100
```
Regressione CRITICA rilevata

Action:
1. git log --oneline -5 → Identifica commit recenti
2. git show HEAD:functions/_middleware.js → Verifica middleware
3. Restore da commit 07fb1e6 se necessario
4. Redeploy: npx wrangler pages deploy dist --project-name=folder2text
```

---

## Expected Perfect State

```json
{
  "score": 100,
  "pillar1": 30,
  "pillar2": 35,
  "pillar3": 35,
  "semantic_html5": "≥70",
  "tags": {
    "header": 1,
    "footer": 1,
    "nav": 1,
    "article": 1,
    "main": 1,
    "h1": 1
  },
  "schema": {
    "organization": true
  },
  "http_status": {
    "all_200": true,
    "total_urls": 9
  }
}
```

---

## Troubleshooting Quick Guide

| Sintomo | Causa Probabile | Fix |
|---------|-----------------|-----|
| Score 42/100 | Middleware non attivo | Redeploy middleware |
| Score 87/100 | Semantic tags mancanti | Verifica injector classes |
| HTTP 308 su URLs | Redirect intercept fallito | Check middleware line 65-77 |
| H1 count = 0 | H1Injector non eseguito | Verifica HTMLRewriter config |
| Semantic score < 70 | Tag header/footer/nav mancanti | Verifica SemanticTagsInjector |

---

## Commit di Riferimento (100/100)

**Last working commit**: `07fb1e6`

```bash
# Restore se necessario
git checkout 07fb1e6 functions/_middleware.js
git commit -m "Restore working middleware for 100/100 score"
git push origin main
npx wrangler pages deploy dist --project-name=folder2text
```

---

## Context Files

**Per approfondimento**:

- Full report: `c:\Users\umber\Documents\MyProjects\Folder2TextLovable\AI-SEO-AUDIT-REPORT.md`
- Roadmap originale: `c:\Users\umber\Documents\MyProjects\Folder2TextLovable\ROADMAP-TO-100-SEO.md`
- Middleware file: `c:\Users\umber\Documents\MyProjects\Folder2TextLovable\functions\_middleware.js`

---

**Quick Summary Template (per output finale)**:

```
========================================
SEO RE-CHECK SUMMARY
========================================

Score: [XX]/100 [EMOJI]
Semantic HTML5: [XX]/100
HTTP Status: [X]/9 URLs OK

Critical Tags:
- header: [X] | footer: [X] | nav: [X]
- article: [X] | main: [X] | h1: [X]

Organization Schema: [YES/NO]

Status: [PERFECT/NEEDS FIX/CRITICAL]
Action Required: [YES/NO]

========================================
```

---

**Generated**: 2026-02-20 14:05:00
**Purpose**: Quick SEO verification per nuove conversazioni
**Target Score**: 100/100 🎯
