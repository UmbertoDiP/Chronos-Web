# MISSIONE: Structured Data Inline Migration (FASE 2)

Agisci come Lead SEO Engineer specializzato in Schema.org structured data, React components e GEO/AEO optimization.

## OBIETTIVO STRATEGICO

Portare la gestione di **structured data semplici** (BreadcrumbList, FAQPage) completamente dentro Lovable (React inline), lasciando solo Organization + WebApplication nel middleware Cloudflare.

**Questa è FASE 2**: Lovable prende ownership di BreadcrumbList + FAQPage inline.

**FASE 1 (completata)**: Meta tags migrati a Lovable ✅
**FASE 3 (futura)**: Skill /seo-check per audit ownership automatico

---

## ARCHITETTURA TARGET (Fase 2)

### LOVABLE Gestisce (NUOVO - da implementare)

**Structured Data Inline**:
- ✅ BreadcrumbList schema (homepage + policies)
- ✅ FAQPage schema (4 FAQ da i18n translations)
- ✅ WebSite schema (search action, site navigation)

**Già gestito da FASE 1**:
- ✅ Meta tags dinamici (title, description)
- ✅ Open Graph tags
- ✅ Hreflang tags (37 tags)
- ✅ Canonical URLs

### MIDDLEWARE Cloudflare Mantiene (ESISTENTE - da NON toccare)

**Schema Complessi**:
- ✅ Organization schema (core brand identity)
- ✅ H1 hidden backup (SEO fallback)
- ✅ Semantic HTML5 wrapper (<main>, <article>)

**Separazione netta**: Lovable = Structured data inline, Middleware = Organization only

---

## STEP 1: Creare StructuredData Components

### Obiettivo

Creare React components riutilizzabili per iniettare JSON-LD schemas inline nel DOM.

### Struttura File

```
src/
├── components/
│   └── StructuredData/
│       ├── BreadcrumbList.tsx      # Breadcrumb navigation
│       ├── FAQPage.tsx              # FAQ schema from i18n
│       ├── WebSite.tsx              # WebSite + SearchAction
│       └── index.ts                 # Export barrel
└── pages/
    ├── Index.tsx                    # Use all schemas
    ├── PrivacyPolicy.tsx            # Use BreadcrumbList only
    └── TermsOfService.tsx           # Use BreadcrumbList only
```

---

## STEP 2: Implementazione BreadcrumbList Component

### Obiettivo

Generare breadcrumb navigation schema per ogni pagina.

### File: `src/components/StructuredData/BreadcrumbList.tsx`

```typescript
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  position: number;
  name: string;
  url: string;
}

export const BreadcrumbList = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const baseUrl = 'https://folder2text.com';

  // Build breadcrumb items based on current route
  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      {
        position: 1,
        name: 'Home',
        url: `${baseUrl}${language !== 'en' ? `/${language}` : ''}`
      }
    ];

    // Extract page from pathname
    const pathParts = location.pathname.split('/').filter(Boolean);

    // If language code in path, skip it
    const pagePart = pathParts.length > 0 && pathParts[0] !== language
      ? pathParts[0]
      : pathParts.length > 1
        ? pathParts[1]
        : null;

    if (pagePart) {
      const pageNames: Record<string, string> = {
        'privacy': 'Privacy Policy',
        'terms': 'Terms of Service'
      };

      items.push({
        position: 2,
        name: pageNames[pagePart] || pagePart,
        url: `${baseUrl}${language !== 'en' ? `/${language}` : ''}/${pagePart}`
      });
    }

    return items;
  };

  const breadcrumbs = buildBreadcrumbs();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbList;
```

---

## STEP 3: Implementazione FAQPage Component

### Obiettivo

Generare FAQPage schema usando le traduzioni i18n esistenti.

**Nota**: Le FAQ sono già tradotte in `src/lib/i18n/locales/*.ts` con chiavi:
- `faq.trial.q` / `faq.trial.a`
- `faq.refund.q` / `faq.refund.a`
- `faq.privacy.q` / `faq.privacy.a`
- `faq.updates.q` / `faq.updates.a`

### File: `src/components/StructuredData/FAQPage.tsx`

```typescript
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next'; // O hook i18n esistente

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQPage = () => {
  const { language } = useLanguage();
  const { t } = useTranslation(); // O useLanguage().t se disponibile

  // Build FAQ items from i18n translations
  const faqKeys = [
    'trial',
    'refund',
    'privacy',
    'updates'
  ];

  const faqs: FAQItem[] = faqKeys.map(key => ({
    question: t(`faq.${key}.q`),
    answer: t(`faq.${key}.a`)
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default FAQPage;
```

---

## STEP 4: Implementazione WebSite Component

### Obiettivo

Aggiungere WebSite schema con SearchAction per site-wide search capability (per Answer Engines).

### File: `src/components/StructuredData/WebSite.tsx`

```typescript
import { Helmet } from 'react-helmet-async';

export const WebSite = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Folder2Text",
    "url": "https://folder2text.com",
    "description": "Free tool to export folder structures to text files optimized for ChatGPT, Claude and LLMs",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://folder2text.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://github.com/UmbertoDiP/folder2text"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default WebSite;
```

---

## STEP 5: Barrel Export

### File: `src/components/StructuredData/index.ts`

```typescript
export { BreadcrumbList } from './BreadcrumbList';
export { FAQPage } from './FAQPage';
export { WebSite } from './WebSite';
```

---

## STEP 6: Integrazione nelle Pages

### Homepage (Index.tsx)

```typescript
import { BreadcrumbList, FAQPage, WebSite } from '@/components/StructuredData';

export default function Index() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbList />
      <FAQPage />
      <WebSite />

      {/* Rest of page */}
      {/* ... */}
    </>
  );
}
```

### Privacy Policy

```typescript
import { BreadcrumbList } from '@/components/StructuredData';

export default function PrivacyPolicy() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbList />

      {/* Rest of page */}
      {/* ... */}
    </>
  );
}
```

### Terms of Service

```typescript
import { BreadcrumbList } from '@/components/StructuredData';

export default function TermsOfService() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbList />

      {/* Rest of page */}
      {/* ... */}
    </>
  );
}
```

---

## VERIFICA IMPLEMENTAZIONE

### Checklist Pre-Deploy

- [ ] BreadcrumbList component creato
- [ ] FAQPage component creato (usa i18n translations)
- [ ] WebSite component creato
- [ ] Barrel export index.ts
- [ ] Integrazione Index.tsx (3 schemas)
- [ ] Integrazione PrivacyPolicy.tsx (1 schema)
- [ ] Integrazione TermsOfService.tsx (1 schema)
- [ ] Nessun errore TypeScript
- [ ] Build locale passa

### Test Manuale (Browser Console)

**Test 1: BreadcrumbList presente**
```javascript
// Homepage
const breadcrumbs = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
  .map(s => JSON.parse(s.textContent))
  .find(j => j['@type'] === 'BreadcrumbList');
console.log(breadcrumbs.itemListElement.length); // Expect: 1 (Home only)

// Privacy page
// Expect: 2 (Home + Privacy)
```

**Test 2: FAQPage presente**
```javascript
const faqPage = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
  .map(s => JSON.parse(s.textContent))
  .find(j => j['@type'] === 'FAQPage');
console.log(faqPage.mainEntity.length); // Expect: 4 FAQ
```

**Test 3: WebSite presente**
```javascript
const website = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
  .map(s => JSON.parse(s.textContent))
  .find(j => j['@type'] === 'WebSite');
console.log(website.potentialAction); // Expect: SearchAction object
```

**Test 4: Cambio lingua**
```javascript
// Cambia lingua a "it"
// Ricontrolla FAQ
const faqPageIT = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
  .map(s => JSON.parse(s.textContent))
  .find(j => j['@type'] === 'FAQPage');
console.log(faqPageIT.mainEntity[0].name); // Deve essere in italiano
```

---

## COSA NON FARE (CRITICO)

### ❌ NON Toccare il Middleware

Il middleware Cloudflare **NON deve essere modificato** in questa fase.

**Organization schema** resta nel middleware (`functions/_middleware.js`).

**FASE 3 futura**: Rimuoveremo semantic tags hidden dal middleware (H1, header, nav, footer) e li faremo gestire da React.

### ❌ NON Duplicare Schema

Verifica che **NON ci siano duplicati** tra Lovable e Middleware:
- BreadcrumbList: SOLO in Lovable (nuovo)
- FAQPage: SOLO in Lovable (nuovo)
- WebSite: SOLO in Lovable (nuovo)
- Organization: SOLO in Middleware (esistente)

Se vedi `@type` duplicato → Errore critico.

---

## OUTPUT FINALE

### Fornisci Report Strutturato

```markdown
=== FASE 2 IMPLEMENTATION REPORT ===

## Structured Data Components Created

✅ BreadcrumbList.tsx
- Location: src/components/StructuredData/BreadcrumbList.tsx
- Lines of code: XX
- Routes supported: /, /privacy, /terms
- Languages: Dynamic (via useLanguage hook)

✅ FAQPage.tsx
- Location: src/components/StructuredData/FAQPage.tsx
- Lines of code: XX
- FAQ count: 4 (from i18n translations)
- Languages: 31 (auto-translated)

✅ WebSite.tsx
- Location: src/components/StructuredData/WebSite.tsx
- Lines of code: XX
- SearchAction: Enabled
- SameAs: GitHub link

## Integration

✅ Index.tsx: 3 schemas (BreadcrumbList + FAQPage + WebSite)
✅ PrivacyPolicy.tsx: 1 schema (BreadcrumbList)
✅ TermsOfService.tsx: 1 schema (BreadcrumbList)

## Verification (Browser Console)

✅ BreadcrumbList detected on all pages
✅ FAQPage detected on homepage (4 items)
✅ WebSite detected on homepage
✅ FAQ translations work (tested: en, it)
✅ NO schema duplication detected

## Build Status

✅ TypeScript: 0 errors
✅ Build: Success
✅ Bundle size: XX MB (delta: +XkB)

=== NEXT STEPS ===

1. Deploy preview
2. Verify structured data on preview URL (curl test)
3. Deploy production
4. Verify ownership distribution (50% → 75% Lovable)
5. Google Rich Results Test (optional)
```

---

## BENEFIT FASE 2

**Per Developer**:
- Structured data nel codice React versionato
- Type-safe schema definitions
- Riutilizzo components cross-pages
- Facile testing in sviluppo locale

**Per Progetto**:
- Middleware ulteriormente semplificato (solo Organization)
- Structured data cambiano lingua dinamicamente
- Separazione netta: Lovable = inline schemas, Middleware = brand only

**Per SEO**:
- FAQPage migliora Answer Engine visibility (Perplexity, ChatGPT)
- BreadcrumbList migliora site navigation per AI crawlers
- WebSite + SearchAction abilita site search per Google
- Ownership distribution: 75% Lovable / 25% Middleware ✅

---

## STRATEGIA MIGRATION (Fasi Complete)

### FASE 1 (COMPLETATA) ✅
- Lovable gestisce: title, description, og:*, hreflang
- Middleware mantiene: JSON-LD schemas
- Ownership: 50% / 50%

### FASE 2 (QUESTA) 🔄
- Lovable aggiunge: BreadcrumbList, FAQPage, WebSite inline
- Middleware riduce: solo Organization
- Ownership: 75% Lovable / 25% Middleware

### FASE 3 (FINALE - FUTURA)
- Skill /seo-check verifica ownership distribution
- Auto-detection duplicazioni
- Suggerimenti optimization
- Score ownership: target 85% Lovable / 15% Middleware

---

**PROCEDI CON IMPLEMENTAZIONE**

Crea i 3 components, integra nelle pages, verifica build, mostra report finale.
