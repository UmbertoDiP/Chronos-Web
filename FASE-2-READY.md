# FASE 2 - Structured Data Inline: PRONTO ✅

**Data**: 2026-02-26
**Obiettivo**: Migrare BreadcrumbList + FAQPage + WebSite → Lovable inline
**Ownership Target**: 75% Lovable / 25% Middleware

---

## Path Prompt Lovable FASE 2

```
c:\Users\umber\Documents\MyProjects\Folder2TextLovable\PROMPT-LOVABLE-I18N-SEO-PHASE2.md
```

---

## Cosa Farà Lovable

### 1. Creare StructuredData Components

**File da creare**:
- `src/components/StructuredData/BreadcrumbList.tsx` - Breadcrumb navigation
- `src/components/StructuredData/FAQPage.tsx` - FAQ schema from i18n (4 FAQ)
- `src/components/StructuredData/WebSite.tsx` - WebSite + SearchAction
- `src/components/StructuredData/index.ts` - Barrel export

### 2. Integrare nelle Pages

**Homepage (Index.tsx)**:
```typescript
<BreadcrumbList />  // Home only
<FAQPage />         // 4 FAQ from i18n translations
<WebSite />         // Site + SearchAction
```

**Privacy Policy**:
```typescript
<BreadcrumbList />  // Home → Privacy
```

**Terms of Service**:
```typescript
<BreadcrumbList />  // Home → Terms
```

### 3. FAQ Translations (già disponibili)

```typescript
// i18n translations esistenti:
faq.trial.q / faq.trial.a     ✅
faq.refund.q / faq.refund.a   ✅
faq.privacy.q / faq.privacy.a ✅
faq.updates.q / faq.updates.a ✅
```

Lovable userà `useTranslation()` o `useLanguage().t()` per caricare FAQ dinamicamente.

---

## Middleware (NON TOCCARE)

**Mantieni in middleware**:
```json
✅ Organization schema (core brand identity)
✅ H1 hidden backup
✅ Semantic HTML5 wrappers (<main>, <article>)
```

**NON duplicare schema** tra Lovable e Middleware.

---

## Success Criteria

**Build**:
- [ ] TypeScript: 0 errors
- [ ] Build: Success
- [ ] Bundle size delta: <50KB

**Browser Console Test**:
- [ ] BreadcrumbList detected on all pages
- [ ] FAQPage detected on homepage (4 items)
- [ ] WebSite + SearchAction detected
- [ ] NO schema duplication

**Deployment**:
- [ ] Preview deploy + verify
- [ ] Production deploy + verify
- [ ] Ownership: 75% Lovable / 25% Middleware ✅

---

## Workflow Post-Lovable

```bash
# 1. Build locale
npm run build

# 2. Deploy preview
npx wrangler pages deploy dist --project-name=folder2text --branch=preview

# 3. Verify structured data
curl -s https://preview.folder2text.pages.dev/ | grep '@type.*BreadcrumbList'
curl -s https://preview.folder2text.pages.dev/ | grep '@type.*FAQPage'
curl -s https://preview.folder2text.pages.dev/ | grep '@type.*WebSite'

# 4. Deploy production (se preview OK)
npx wrangler pages deploy dist --project-name=folder2text --branch=main

# 5. Verify production
curl -s https://folder2text.com/ | grep -o '@type' | wc -l
# Expected: 4 (Organization, BreadcrumbList, FAQPage, WebSite)

# 6. Full SEO audit
/verify-seo https://folder2text.com --analyze-payload
```

---

## Ownership Distribution

**FASE 1 (completata)**:
- Middleware: 50%
- Lovable: 50% ✅

**FASE 2 (target)**:
- Middleware: 25%
- Lovable: 75% 🎯

**FASE 3 (futura)**:
- Middleware: 15%
- Lovable: 85% 📋

---

## Benefici FASE 2

**Per Developer**:
- Structured data nel codice React versionato
- Type-safe schema definitions
- Riutilizzo components cross-pages

**Per SEO**:
- FAQPage → Migliora Answer Engine visibility (Perplexity, ChatGPT)
- BreadcrumbList → Migliora site navigation per AI crawlers
- WebSite + SearchAction → Abilita site search per Google
- Ownership 75% Lovable (target raggiunto)

---

**PROCEDI**: Passa prompt a Lovable → Attendi implementation → Deploy → Verify
