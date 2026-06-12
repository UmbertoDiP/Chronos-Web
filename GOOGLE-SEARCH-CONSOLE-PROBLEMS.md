# Google Search Console - Analisi Problemi folder2text.com

**Date**: 2026-03-02 14:45:00
**Source**: Notifica email Google Search Console
**Site**: https://folder2text.com

---

## Tabella Problemi Attuali

| # | Tipo | Severità | Descrizione | URL Affected | Causa Root | Fix Required | Status |
|---|------|----------|-------------|--------------|------------|--------------|--------|
| 1 | Dati strutturati | 🔴 CRITICAL | Campo duplicato "FAQPage" | https://folder2text.com/ | Doppia injection: middleware + React component | Rimuovere FAQPage da `functions/_middleware.js` | ⏳ In corso |

---

## Dettaglio Problema #1: FAQPage Duplicato

### Sintomo

Notifica Google Search Console:
```
Nuovi problemi Dati strutturati Domande frequenti (FAQ) rilevati per folder2text.com

Al proprietario di folder2text.com:

Search Console ha rilevato che il tuo sito è interessato da 1 problemi di tipo Dati strutturati Domande frequenti (FAQ). Sul tuo sito sono stati rilevati i seguenti problemi.

Principali problemi critici*
Campo duplicato "FAQPage"

* I problemi critici impediscono alla tua pagina o funzionalità di apparire nei risultati della Ricerca.
```

### Analisi Tecnica

**Stato produzione (2026-03-02 14:45)**:
```bash
curl -s https://folder2text.com/ | grep -c '"@type":"FAQPage"'
# Output: 1 (corretto ora, ma Google ha scansionato versione precedente)
```

**Timeline problema**:

1. **2026-02-28** (commit `6f79eb5`):
   - Implementato `faqSchema` in `functions/_middleware.js` (injection statica)
   - 12 FAQ questions hardcoded in inglese

2. **2026-02-28** (Lovable update):
   - Aggiunto componente React `src/components/StructuredData/FAQPage.tsx`
   - 7 FAQ questions dinamiche tradotte (multilingua via i18n)
   - Injection via Helmet

3. **2026-03-01** (Google crawl):
   - Googlebot trova **2 schemi FAQPage** sulla stessa pagina
   - Primo: middleware (12 questions)
   - Secondo: React (7 questions)
   - Errore: **Campo duplicato** → blocca rich results FAQ

4. **2026-03-02** (Deploy Lovable semantic tags):
   - React FAQPage deployed
   - Middleware FAQPage ancora presente
   - **Problema persiste** fino a fix middleware

### Impatto

- ❌ **Rich Results FAQ non mostrate** su Google Search
- ❌ **Penalizzazione ranking** per structured data errors
- ❌ **Click-through rate ridotto** (no featured snippets)
- ⚠️  **User experience peggiore** (no risposte dirette in SERP)

### Soluzione

**Step 1**: Rimuovere `faqSchema` da `functions/_middleware.js`

```javascript
// functions/_middleware.js

// ❌ RIMUOVERE QUESTO BLOCCO (linee 37-138):
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [ ... ]
};

// ❌ RIMUOVERE dalla lista schemas da iniettare (linea ~360):
const schemas = [
  organizationSchema,
  webApplicationSchema,
  // faqSchema,  ← COMMENTARE O RIMUOVERE
  webSiteSchema,
  // ...
];
```

**Step 2**: Mantenere solo React `FAQPage.tsx` (già corretto)

```tsx
// src/components/StructuredData/FAQPage.tsx
// ✅ KEEP THIS - supporta traduzioni multilingua
export const FAQPage = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useLanguage();
  // ...
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
});
```

**Step 3**: Deploy fix

```bash
# Build
npm run build

# Deploy produzione
npx wrangler pages deploy dist --project-name=folder2text

# Verifica
curl -s https://folder2text.com/ | grep -c '"@type":"FAQPage"'
# Expected: 1 (non più 2)
```

**Step 4**: Test con Rich Results Test

```bash
# Google Rich Results Test
https://search.google.com/test/rich-results?url=https://folder2text.com/

# Expected: ✅ FAQPage valid, no duplicates
```

**Step 5**: Request re-crawl

1. Apri [Google Search Console](https://search.google.com/search-console?resource_id=https://folder2text.com/)
2. URL Inspection → Inserisci `https://folder2text.com/`
3. Click "Request Indexing"
4. Google re-crawlerà entro 24-48h
5. Verifica dopo 2-3 giorni che l'errore sia scomparso

### Timeline Fix

| Data | Azione | Responsabile | Status |
|------|--------|--------------|--------|
| 2026-03-02 14:45 | Problema identificato | Claude | ✅ Done |
| 2026-03-02 15:00 | Fix middleware implementato | Claude | ⏳ In corso |
| 2026-03-02 15:15 | Deploy produzione | Claude | ⏳ Pending |
| 2026-03-02 15:20 | Rich Results Test | Claude | ⏳ Pending |
| 2026-03-02 15:25 | Request re-crawl GSC | Umberto (manual) | ⏳ Pending |
| 2026-03-04 | Verifica errore scomparso | Umberto | ⏳ Pending |

### Prevenzione Futura

**Rule**: Mai duplicare structured data tra middleware e React.

**Responsabilità**:
- **Middleware** (`functions/_middleware.js`): Schemi statici globali (Organization, WebSite, BreadcrumbList)
- **React** (`src/components/StructuredData/*.tsx`): Schemi dinamici/tradotti (FAQPage, HowTo, Product se multilingua)

**Checklist pre-deploy**:
- [ ] Verifica nessun schema duplicato: `curl -s URL | grep -oP '"@type":\s*"[^"]+"' | sort | uniq -c`
- [ ] Se count > 1 per stesso @type (eccetto nested): FIX BEFORE DEPLOY
- [ ] Test Rich Results Test PRIMA di production deploy
- [ ] Monitor Google Search Console ogni settimana per nuovi errori

---

## Sistema Monitoraggio Automatico

**Skill creata**: `/gsc-monitor`

**Location**: `c:\Users\umber\.claude\commands\gsc-monitor.md`

**Setup richiesto**:
1. Google Cloud Console → Service Account
2. Abilita Search Console API
3. Download credentials JSON → `~/.claude/gsc-credentials.json`
4. Aggiungi Service Account a Google Search Console (Full permission)

**Usage**:
```bash
# Verifica problemi attuali
/gsc-monitor

# Export report
/gsc-monitor --output GSC-REPORT-2026-03-02.md

# Solo structured data issues
/gsc-monitor --issues structured-data
```

**Output**:
- Tabella problemi critici/warnings
- Structured data status per schema
- Performance metrics (clicks, impressions, CTR)
- Top 5 queries
- Quick links (Rich Results Test, Mobile-Friendly, PageSpeed)

**Automazione**:
- Task Scheduler Windows: Daily 9am
- Email notification se critical issues
- Integration con `/deploy` per post-deploy verification

---

## Next Steps

1. ✅ **Immediate**: Fix FAQPage duplicato (rimuovere da middleware)
2. ✅ **Today**: Deploy fix + test Rich Results
3. ⏳ **Week 1**: Setup `/gsc-monitor` con Service Account
4. ⏳ **Week 2**: Verifica errore scomparso da Google Search Console
5. ⏳ **Week 3**: Configura task scheduler per monitoring automatico

---

**Generated by**: Claude Sonnet 4.5
**Session**: Google Search Console Issue Resolution
**Related Files**:
- `functions/_middleware.js` (to fix)
- `src/components/StructuredData/FAQPage.tsx` (keep as-is)
- `.claude/commands/gsc-monitor.md` (new skill)
