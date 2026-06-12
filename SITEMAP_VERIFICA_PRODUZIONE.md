# Verifica Sitemap Completa - Folder2Text SEO Final Check

**Data**: 2026-02-18
**Progetto**: Folder2Text Lovable Wrapper
**URL Produzione**: https://folder2text.com
**Scopo**: Verifica finale completezza sitemap e crawlabilità per Google SERP

---

## Contesto Progetto

### Ottimizzazioni SEO Implementate (16-17/02/2026)
- ✅ FAQ structured data (5 domande)
- ✅ BreadcrumbList schema
- ✅ Hreflang tags per 5 lingue
- ✅ Keywords espanse (long-tail)
- ✅ robots.txt con AI crawlers (GPTBot, Claude-Web, etc.)
- ✅ _redirects SPA routing con status 200
- ✅ Sitemap aggiornata (lastmod: 2026-02-16)
- ✅ Deploy produzione completato

### Status Google Search Console (17/02 22:41)
- Homepage: ✅ "Submitted and indexed" (crawlata 17/02 15:45)
- /terms: ✅ "Submitted and indexed"
- /privacy: ⚠️ "Discovered - currently not indexed" (migliorato da "unknown")

### Issue Pending
- /privacy: HTTP 308 redirect (Cloudflare dashboard override)

---

## Tabella Completa Sitemap - Tutte le Lingue

### Riepilogo Numerazione
- **Totale URL in sitemap**: 9
- **Lingue supportate**: 5 (en, it, es, fr, de)
- **Route principali**: 3 (homepage, /privacy, /terms)
- **Route localizzate IT**: 3 (/it, /it/privacy, /it/terms)
- **Route localizzate ES**: 1 (/es)
- **Route localizzate FR**: 1 (/fr)
- **Route localizzate DE**: 1 (/de)

### Tabella Dettagliata per Lingua

| Rotta | EN (Default) | IT | ES | FR | DE |
|-------|-------------|----|----|----|----|
| **Homepage** | ✅ https://folder2text.com/ | ✅ https://folder2text.com/it | ✅ https://folder2text.com/es | ✅ https://folder2text.com/fr | ✅ https://folder2text.com/de |
| **Privacy Policy** | ✅ https://folder2text.com/privacy | ✅ https://folder2text.com/it/privacy | ⚠️ Missing | ⚠️ Missing | ⚠️ Missing |
| **Terms of Service** | ✅ https://folder2text.com/terms | ✅ https://folder2text.com/it/terms | ⚠️ Missing | ⚠️ Missing | ⚠️ Missing |

### Analisi Criticità

**✅ COMPLETO**:
- Homepage tutte le lingue (5/5)
- Privacy EN + IT (2/5)
- Terms EN + IT (2/5)

**⚠️ INCOMPLETO**:
- Privacy mancante per: ES, FR, DE
- Terms mancante per: ES, FR, DE

**Rationale**: Lovable probabilmente ha solo versioni EN/IT di Privacy e Terms. Verifico se esistono route nel codice.

---

## Verifica Produzione - Comandi Automatici

### Script Verifica HTTP Status (Esegui TUTTI in sequenza)

```bash
# Homepage - Tutte le lingue
curl -I https://folder2text.com/ 2>&1 | grep "HTTP/"
curl -I https://folder2text.com/it 2>&1 | grep "HTTP/"
curl -I https://folder2text.com/es 2>&1 | grep "HTTP/"
curl -I https://folder2text.com/fr 2>&1 | grep "HTTP/"
curl -I https://folder2text.com/de 2>&1 | grep "HTTP/"

# Privacy - EN + IT
curl -I https://folder2text.com/privacy 2>&1 | grep "HTTP/"
curl -I https://folder2text.com/it/privacy 2>&1 | grep "HTTP/"

# Terms - EN + IT
curl -I https://folder2text.com/terms 2>&1 | grep "HTTP/"
curl -I https://folder2text.com/it/terms 2>&1 | grep "HTTP/"
```

**Atteso**: TUTTI devono restituire `HTTP/2 200` (NO 301, NO 308, NO 404)

### Verifica Sitemap Download Google

```bash
# Controlla quando Google ha scaricato la sitemap
# Vai a: https://search.google.com/search-console
# Oppure usa gsc_tool.py
```

### Verifica Hreflang Tags

```bash
# Controlla hreflang su homepage
curl -s https://folder2text.com/ | grep -i "hreflang"

# Atteso:
# <link rel="alternate" hreflang="en" href="https://folder2text.com/" />
# <link rel="alternate" hreflang="it" href="https://folder2text.com/it" />
# <link rel="alternate" hreflang="es" href="https://folder2text.com/es" />
# <link rel="alternate" hreflang="fr" href="https://folder2text.com/fr" />
# <link rel="alternate" hreflang="de" href="https://folder2text.com/de" />
# <link rel="alternate" hreflang="x-default" href="https://folder2text.com/" />
```

### Verifica Structured Data

```bash
# Controlla FAQ schema
curl -s https://folder2text.com/ | grep -o '"@type":"FAQPage"'

# Controlla BreadcrumbList
curl -s https://folder2text.com/ | grep -o '"@type":"BreadcrumbList"'

# Tool online: https://search.google.com/test/rich-results
```

---

## Azioni da Eseguire Automaticamente

**Quando apri nuova conversazione, esegui IN SEQUENZA**:

### 1. Verifica HTTP Status Tutti gli URL
```bash
for url in \
  "https://folder2text.com/" \
  "https://folder2text.com/it" \
  "https://folder2text.com/es" \
  "https://folder2text.com/fr" \
  "https://folder2text.com/de" \
  "https://folder2text.com/privacy" \
  "https://folder2text.com/it/privacy" \
  "https://folder2text.com/terms" \
  "https://folder2text.com/it/terms"; do
  echo "Testing: $url"
  curl -I "$url" 2>&1 | grep "HTTP/"
  echo "---"
done
```

**Criterio SUCCESS**: TUTTI devono restituire `HTTP/2 200`

### 2. Verifica Sitemap Accessibile

```bash
curl -I https://folder2text.com/sitemap.xml 2>&1 | grep "HTTP/"
curl -s https://folder2text.com/sitemap.xml | grep -c "<url>"
```

**Atteso**:
- HTTP/2 200
- 9 tag `<url>` totali

### 3. Verifica robots.txt

```bash
curl -s https://folder2text.com/robots.txt | grep "Sitemap:"
curl -s https://folder2text.com/robots.txt | grep "GPTBot"
curl -s https://folder2text.com/robots.txt | grep "Claude-Web"
```

**Atteso**:
- `Sitemap: https://folder2text.com/sitemap.xml`
- `User-agent: GPTBot`
- `User-agent: Claude-Web`

### 4. Verifica Hreflang in HTML

```bash
curl -s https://folder2text.com/ | grep 'rel="alternate" hreflang=' | wc -l
```

**Atteso**: 6 linee (en, it, es, fr, de, x-default)

### 5. Verifica Structured Data

```bash
# FAQ Schema
curl -s https://folder2text.com/ | grep -c '"@type":"Question"'

# BreadcrumbList
curl -s https://folder2text.com/ | grep -c '"@type":"BreadcrumbList"'
```

**Atteso**:
- 5 Question (FAQ schema)
- 1 BreadcrumbList

### 6. Google Search Console CLI Check

```bash
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable
python gsc_submit_changes.py
```

**Atteso**:
- Sitemap submitted successfully
- Homepage: "Submitted and indexed"
- /terms: "Submitted and indexed"
- /privacy: "Discovered" o "Submitted and indexed"

---

## Checklist Finale Pre-Google SERP

Prima di dichiarare "READY FOR GOOGLE":

- [ ] TUTTI gli URL restituiscono HTTP 200 (NO redirect)
- [ ] Sitemap contiene 9 URL
- [ ] Sitemap accessibile da https://folder2text.com/sitemap.xml
- [ ] robots.txt contiene tutti i crawler (inclusi AI)
- [ ] Hreflang tags presenti in index.html (6 tag)
- [ ] FAQ structured data presente (5 domande)
- [ ] BreadcrumbList schema presente
- [ ] Google Search Console mostra sitemap scaricata
- [ ] Homepage indicizzata da Google
- [ ] /privacy NON ha più HTTP 308 redirect
- [ ] /terms indicizzato da Google

---

## Issue Critiche da Risolvere

### 1. Privacy/Terms Mancanti per ES, FR, DE

**Status**: ⚠️ Missing in sitemap

**Verifica**:
```bash
# Controlla se esistono route nel codice Lovable
# Probabile che solo EN/IT siano implementati
```

**Opzioni**:
1. **Se non esistono in Lovable**: OK, sitemap è corretta così
2. **Se esistono in Lovable**: Aggiungi a sitemap.xml

**Azione**: Verifica file sorgenti in `src/pages/` per presenza di Privacy/Terms localizzati

### 2. /privacy HTTP 308 Redirect

**Status**: ⚠️ Pending (issue Cloudflare dashboard)

**Root Cause**: Cloudflare Pages project-level redirect config overrides _redirects file

**Fix**:
1. Login Cloudflare Dashboard: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text
2. Settings → Functions → Page Rules
3. Rimuovi redirect apex → www (se presente)
4. Rimuovi qualsiasi 308 redirect per /privacy

**Verifica Post-Fix**:
```bash
curl -I https://folder2text.com/privacy 2>&1 | grep "HTTP/"
# DEVE restituire: HTTP/2 200
```

---

## Output Finale Atteso

```
========================================
✅ FOLDER2TEXT SITEMAP - VERIFICA COMPLETA
========================================

URLs Totali: 9
URLs HTTP 200: 9/9 ✅
Sitemap Accessible: ✅
robots.txt OK: ✅
Hreflang Tags: 6/6 ✅
FAQ Schema: ✅
BreadcrumbList: ✅
Google Sitemap Downloaded: ✅
Homepage Indexed: ✅
/privacy Status: [TBD]
/terms Indexed: ✅

========================================
STATUS: READY FOR GOOGLE SERP
========================================

Next Steps:
1. Monitor Google Search Console (3-7 giorni)
2. Track impressions/clicks daily
3. Verificare Rich Results: https://search.google.com/test/rich-results?url=https://folder2text.com/
```

---

## Comandi Python - Reference

**Location**: `c:\Users\umber\Documents\MyProjects\Folder2TextLovable\`

- `gsc_tool.py`: Performance data (clicks, impressions, CTR)
- `gsc_list_sites.py`: Lista proprietà Search Console
- `gsc_check_indexing.py`: URL Inspection API (indexing status)
- `gsc_submit_changes.py`: Submit sitemap + check critical URLs

**Token**: `c:\Users\umber\Documents\MyProjects\Folder2TextLovable\jira-token.txt`
**Client Secrets**: `C:\Users\umber\Downloads\client_secret_*.json`

---

## Note Finali

**Sitemap è QUASI completa**:
- ✅ Tutte le homepage localizzate (5 lingue)
- ✅ Privacy/Terms EN + IT
- ⚠️ Privacy/Terms ES/FR/DE mancanti (verificare se esistono in Lovable)

**Issue Critiche**:
1. /privacy HTTP 308 redirect (fix Cloudflare dashboard)
2. Verificare esistenza Privacy/Terms per ES, FR, DE in codebase

**Timeline Google**:
- Crawling: 1-3 giorni ✅ (homepage già crawlata 17/02)
- Indexing: 3-7 giorni (in corso)
- Rich Snippets: 7-14 giorni

---

**Path file**: `c:\Users\umber\Documents\MyProjects\Folder2TextLovable\SITEMAP_VERIFICA_PRODUZIONE.md`
