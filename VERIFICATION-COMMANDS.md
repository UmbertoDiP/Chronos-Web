# Verification Commands - Folder2Text Migration FASE 1→2→3

**Progetto**: Folder2Text Lovable Wrapper
**Status**: FASE 3 COMPLETATA ✅
**Ownership**: 85% Lovable / 15% Middleware
**Production**: https://folder2text.com

---

## Quick Status Check

```bash
# Navigate to project
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable

# Check git status
git status
git log --oneline -5

# Check middleware size
wc -l functions/_middleware.js
# Expected: 38 lines (from 125)

# Check production HTTP
curl -s -o /dev/null -w "%{http_code}" https://folder2text.com/
# Expected: 200
```

---

## FASE 1 Verification (Meta Tags)

**Implemented**: 2026-02-26
**Commit**: 0af901d

```bash
# 1. Check hreflang tags (37 total: 36 lingue + x-default)
curl -s https://folder2text.com/ | grep -o 'hreflang=' | wc -l
# Expected: 37

# 2. Check meta description (React Helmet dynamic)
curl -s https://folder2text.com/ | grep '<meta name="description"'

# 3. Check Open Graph tags
curl -s https://folder2text.com/ | grep 'og:title'
curl -s https://folder2text.com/ | grep 'og:description'

# 4. Check canonical URL
curl -s https://folder2text.com/ | grep 'rel="canonical"'

# 5. Verify React Helmet installed
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable
grep -i "react-helmet-async" package.json
# Expected: "react-helmet-async": "^2.0.5"
```

**Results**:
- ✅ Meta tags: Dynamic per lingua (36 + x-default)
- ✅ SEO Score: 100/100
- ✅ Ownership: 50% Lovable / 50% Middleware

---

## FASE 2 Verification (Structured Data Inline)

**Implemented**: 2026-02-27
**Commit**: 7a8c4a0

```bash
# 1. Check structured data components exist
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable
ls src/components/StructuredData/
# Expected: BreadcrumbList.tsx, FAQPage.tsx, WebSite.tsx, WebApplication.tsx, index.ts

# 2. Count @type occurrences (static HTML only - middleware Organization)
curl -s https://folder2text.com/ | grep -o '"@type"' | wc -l
# Expected: 1-2 (Organization from middleware, Lovable schemas are client-side)

# 3. Verify Organization schema from middleware
curl -s https://folder2text.com/ | grep -o '"@type":"Organization"'
# Expected: match

# 4. Check FAQPage component integration
grep -r "FAQPage" src/pages/Index.tsx
# Expected: import and render

# 5. Check BreadcrumbList on privacy/terms
grep -r "BreadcrumbList" src/pages/PrivacyPolicy.tsx
grep -r "BreadcrumbList" src/pages/TermsOfService.tsx
# Expected: both have BreadcrumbList
```

**Results**:
- ✅ 4 modular components created
- ✅ Homepage: 4 schemas (BreadcrumbList, FAQPage, WebSite, WebApplication)
- ✅ Privacy/Terms: 1 schema each (BreadcrumbList)
- ✅ Ownership: 75% Lovable / 25% Middleware

---

## FASE 3 Verification (Middleware Cleanup + Advanced SEO)

**Implemented**: 2026-02-28
**Commit**: 02c417d

```bash
# 1. Check middleware size reduction
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable
wc -l functions/_middleware.js
# Expected: 38 lines (from 125) = -70%

# 2. Verify ONLY Organization schema in middleware
cat functions/_middleware.js | grep -i "organization"
# Expected: match

# 3. Verify NO H1 hidden backup
cat functions/_middleware.js | grep -i "h1.*hidden"
# Expected: empty

# 4. Verify NO Semantic HTML5 wrappers
cat functions/_middleware.js | grep -i "<main"
cat functions/_middleware.js | grep -i "<article"
# Expected: empty

# 5. Check HowTo component exists
ls src/components/StructuredData/HowTo.tsx
# Expected: file exists

# 6. Check Product component exists
ls src/components/StructuredData/Product.tsx
# Expected: file exists

# 7. Verify Product integration in PricingModal
grep -A 5 "Product" src/components/PricingModal.tsx
# Expected: 2 Product instances (Monthly + Annual)

# 8. Check HowTo integration in Index
grep "HowTo" src/pages/Index.tsx
# Expected: import and render
```

**Results**:
- ✅ Middleware: 38 lines (-70%)
- ✅ Only Organization schema in middleware
- ✅ HowTo schema added (3 step)
- ✅ Product schemas added (×2)
- ✅ Ownership: 85% Lovable / 15% Middleware

---

## Production Health Check

```bash
# Full site check
curl -s -o /dev/null -w "Homepage: %{http_code}\n" https://folder2text.com/
curl -s -o /dev/null -w "Sitemap: %{http_code}\n" https://folder2text.com/sitemap.xml
curl -s -o /dev/null -w "Robots: %{http_code}\n" https://folder2text.com/robots.txt

# Expected: All 200

# Sitemap URLs count
curl -s https://folder2text.com/sitemap.xml | grep -o '<loc>' | wc -l
# Expected: 9 URLs

# AI Crawlers allowed
curl -s https://folder2text.com/robots.txt | grep -i "gptbot\|claudebot\|bingbot"
# Expected: Allow all (no Disallow)
```

---

## SEO Audit with /verify-seo

### Full Audit (All Phases)

```bash
/verify-seo https://folder2text.com
```

**Verifica**:
- ✅ HTTP 200 su homepage, sitemap, robots.txt
- ✅ 9 URLs in sitemap
- ✅ Hreflang tags (37 total)
- ✅ Meta tags dinamici (title, description, OG)
- ✅ Structured data presente (Organization + Lovable schemas client-side)
- ✅ AI crawlers allowed (8/8)
- ✅ No redirect issues on homepage

### Advanced Audit (Detailed)

```bash
/verify-seo https://folder2text.com --analyze-payload --output FINAL-SEO-AUDIT-POST-FASE3.md
```

**Output**: Report dettagliato con:
- HTTP status di tutte le pagine sitemap
- Structured data validation
- Hreflang compliance
- robots.txt analysis
- Meta tags completeness
- Performance metrics

---

## Schema Validation (Client-Side)

**Note**: React Helmet schemas sono iniettati client-side e NON visibili in `curl`. Per verificarli:

### Manual Browser Test

1. Apri https://folder2text.com/ in browser
2. Apri DevTools → Elements → `<head>`
3. Cerca `<script type="application/ld+json">`
4. Verifica presence:
   - Organization (middleware)
   - BreadcrumbList (Lovable)
   - FAQPage (Lovable)
   - WebSite (Lovable)
   - WebApplication (Lovable)
   - HowTo (Lovable)

### Google Rich Results Test

```
https://search.google.com/test/rich-results?url=https://folder2text.com/
```

Verifica:
- Organization schema detected
- FAQPage eligible (7 questions)
- BreadcrumbList present
- WebApplication valid

---

## Ownership Verification

### Calculate Ownership Distribution

**Middleware** (15%):
- 1 schema: Organization
- 38 LOC

**Lovable** (85%):
- 7 schemas: BreadcrumbList, FAQPage, WebSite, WebApplication, HowTo, Product ×2
- Meta tags: title, description, canonical, hreflang (37), OG tags, Twitter Card
- UI: All React components
- i18n: 36 lingue complete

**Calculation**:
```
Total elements: ~60
Lovable owns: ~51 (85%)
Middleware owns: ~9 (15%)
```

---

## Rollback Plan (If Issues)

### Rollback to FASE 2

```bash
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable

# Rollback commit
git log --oneline | head -5
git revert 02c417d  # FASE 3 commit

# Rebuild
npm run build

# Redeploy
npx wrangler pages deploy dist --branch=main

# Verify
curl -s https://folder2text.com/ | grep '@type' | wc -l
# Should be: 1 (Organization from middleware, Lovable 4 client-side)
```

**Backup commits**:
- FASE 1: `0af901d`
- FASE 2: `7a8c4a0`
- FASE 3: `02c417d`

---

## Build + Deploy Commands (Quick Reference)

```bash
# Full workflow
cd c:\Users\umber\Documents\MyProjects\Folder2TextLovable

# Build
npm run build

# Deploy preview
npx wrangler pages deploy dist --branch=preview

# Verify preview
curl -s -o /dev/null -w "%{http_code}" https://preview.folder2text.pages.dev/

# Deploy production
npx wrangler pages deploy dist --branch=main

# Verify production
/verify-seo https://folder2text.com
```

---

## Documentation Files

```
c:\Users\umber\Documents\MyProjects\Folder2TextLovable\FASE-1-COMPLETE-REPORT.md
c:\Users\umber\Documents\MyProjects\Folder2TextLovable\FASE-2-COMPLETE-REPORT.md
c:\Users\umber\Documents\MyProjects\Folder2TextLovable\FASE-3-COMPLETE-REPORT.md
c:\Users\umber\Documents\MyProjects\Folder2TextLovable\LOVABLE-WORKFLOW-STATUS.md
c:\Users\umber\Documents\MyProjects\Folder2TextLovable\VERIFICATION-COMMANDS.md (this file)
```

---

## Next Steps (Optional FASE 4)

**Enhancements**:
- i18n HowTo schema (36 lingue)
- aggregateRating for WebApplication (when data available)
- Standard Product schema (€14.99 lifetime)
- Additional structured data types

**Priority**: Low - Current implementation complete

---

**Last Updated**: 2026-02-28
**Status**: FASE 3 COMPLETE ✅
**Production**: https://folder2text.com (live)
**Ownership**: 85% Lovable / 15% Middleware
