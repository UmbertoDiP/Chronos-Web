# FASE 3: Middleware Cleanup + Advanced SEO

**Progetto**: Folder2Text Lovable Wrapper
**Obiettivo**: Ridurre middleware a 15% (solo Organization schema) + Advanced SEO features
**Target ownership**: 85% Lovable / 15% Middleware

---

## Contesto

### Status Attuale (Post-FASE 2)
- ✅ FASE 1: Meta tags migrati a Lovable (React Helmet)
- ✅ FASE 2: Structured data inline migrati a Lovable (BreadcrumbList, FAQPage, WebSite, WebApplication)
- **Ownership**: 75% Lovable / 25% Middleware

### Problema
Il middleware `functions/_middleware.js` ancora contiene:
- Organization schema (OK - mantieni)
- H1 hidden backup (NON necessario - Lovable ha già H1)
- Semantic HTML5 wrappers (`<main>`, `<article>`, `<header>`, `<nav>`, `<footer>`) (NON necessario - React lo fa nativamente)
- Elementi nascosti inutili

---

## Obiettivo FASE 3

### Parte A: Middleware Cleanup (CRITICAL)

**File da modificare**: `functions/_middleware.js`

**Rimuovi TUTTO tranne**:
```javascript
// MANTIENI SOLO QUESTO:
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Folder2Text",
  "description": "Convert folder structures to AI-friendly text format",
  "url": "https://folder2text.com",
  "logo": "https://folder2text.com/lovable-uploads/logo.svg",
  "sameAs": [
    "https://github.com/folder2text"
  ]
};

// Inietta SOLO Organization schema nell'HTML
// NO H1 hidden
// NO <main>, <article>, <header>, <nav>, <footer> wrappers
// NO elementi nascosti

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('text/html')) {
    return response;
  }

  let html = await response.text();

  // Inject ONLY Organization schema
  const schemaScript = `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`;
  html = html.replace('</head>', `${schemaScript}</head>`);

  return new Response(html, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText
  });
}
```

**Risultato atteso**:
- Middleware: ~25 righe (solo Organization schema)
- Ownership: 85% Lovable / 15% Middleware ✅

---

### Parte B: Advanced SEO Features (OPTIONAL - Nice to Have)

Se hai tempo, aggiungi questi componenti Lovable per SEO avanzato:

#### 1. Product Schema per Pricing Plans

**File**: `src/components/StructuredData/Product.tsx`

```typescript
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductSchemaProps {
  productName: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
}

export const Product = ({ productName, price, currency, description, features }: ProductSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: description,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
    additionalProperty: features.map((feature) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
```

**Integrazione**: Aggiungi in `Index.tsx` per Pro Monthly/Annual plans

---

#### 2. SoftwareApplication Schema (Enhanced)

**File**: Aggiorna `src/components/StructuredData/WebApplication.tsx`

Aggiungi campi:
- `applicationCategory`: "BusinessApplication"
- `operatingSystem`: "Web"
- `permissions`: "No special permissions required"
- `softwareVersion`: "2.0"
- `aggregateRating` (se hai dati)

---

#### 3. HowTo Schema per Tutorial Section

**File**: `src/components/StructuredData/HowTo.tsx`

```typescript
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

export const HowTo = () => {
  const { t } = useLanguage();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('howto.title'),
    description: t('howto.description'),
    step: [
      {
        '@type': 'HowToStep',
        name: t('howto.step1.name'),
        text: t('howto.step1.text'),
      },
      {
        '@type': 'HowToStep',
        name: t('howto.step2.name'),
        text: t('howto.step2.text'),
      },
      {
        '@type': 'HowToStep',
        name: t('howto.step3.name'),
        text: t('howto.step3.text'),
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
```

**Note**: Richiede traduzioni i18n per `howto.*` keys

---

## Priorità

### Must Have (FASE 3a)
1. ✅ Middleware cleanup → solo Organization schema
2. ✅ Rimozione H1 hidden backup
3. ✅ Rimozione Semantic HTML5 wrappers
4. ✅ Test build + deploy + verify

### Nice to Have (FASE 3b - Optional)
1. Product schema per pricing plans
2. Enhanced WebApplication schema
3. HowTo schema per tutorial

**Se hai tempo limitato**: Fai SOLO FASE 3a (cleanup). Advanced SEO può essere FASE 4 futura.

---

## Success Criteria

### FASE 3a (Critical)
- [ ] Middleware ridotto a ~25 righe
- [ ] Solo Organization schema in middleware
- [ ] NO H1 hidden
- [ ] NO Semantic HTML5 wrappers
- [ ] Build passa senza errori
- [ ] Deploy production
- [ ] Verify: curl https://folder2text.com/ | grep '@type.*Organization'
- [ ] Ownership: 85% Lovable / 15% Middleware ✅

### FASE 3b (Optional)
- [ ] Product schema per Pro plans
- [ ] Enhanced WebApplication schema
- [ ] HowTo schema (if tutorial section exists)

---

## Verification Commands

```bash
# 1. Check middleware size
wc -l functions/_middleware.js
# Expected: ~25 lines

# 2. Verify ONLY Organization schema from middleware
curl -s https://folder2text.com/ | grep -o '@type.*Organization'

# 3. Count total schemas (should include Lovable + Organization)
curl -s https://folder2text.com/ | grep -o '@type' | wc -l
# Expected: 5 (Organization, BreadcrumbList, FAQPage, WebSite, WebApplication)

# 4. Verify NO hidden elements
curl -s https://folder2text.com/ | grep 'style="display:none"'
# Expected: empty (or only legitimate hidden elements)

# 5. Full SEO audit
/verify-seo https://folder2text.com --analyze-payload
```

---

## Deployment Plan

```bash
# 1. Lovable implementation FASE 3a (cleanup)
# [Wait for middleware cleanup]

# 2. Build locale
npm run build

# 3. Deploy preview
npx wrangler pages deploy dist --branch=preview

# 4. Verify preview
curl -s https://preview.folder2text.pages.dev/ | grep '@type.*Organization'

# 5. Deploy production
npx wrangler pages deploy dist --branch=main

# 6. Verify production
/verify-seo https://folder2text.com

# 7. Create FASE-3-COMPLETE-REPORT.md
```

---

## Rollback Plan

Se FASE 3 introduce problemi:

```bash
# Rollback a FASE 2
git revert HEAD
npm run build
npx wrangler pages deploy dist --branch=main
```

---

## Notes

- **FASE 3a è CRITICA** per ridurre complessità middleware
- **FASE 3b è OPTIONAL** - Advanced SEO features possono essere FASE 4
- Middleware finale deve essere minimale (~25 righe)
- Organization schema è l'UNICO elemento che resta in middleware (core brand identity)
- React gestisce nativamente semantic HTML, no need for middleware wrappers

---

**Prompt per Lovable**: Passare questo file a Lovable per implementazione FASE 3a (cleanup). FASE 3b può essere fatto dopo se c'è tempo.
