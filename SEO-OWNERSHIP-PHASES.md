# SEO Ownership Migration Strategy

**Progetto**: Folder2Text Lovable Wrapper
**Obiettivo**: Migrare gestione SEO da Cloudflare Middleware a Lovable (React)
**Status Baseline**: 100/100 SEO Score (commit: 07fb1e6)

---

## Strategia 3 Fasi

### FASE 1: Meta Tags Ownership → Lovable (IN CORSO)

**Obiettivo**: Lovable gestisce tutti i meta tags HTML dinamici

**Lovable Implementa**:
- React Helmet Async per gestione <head>
- SEO config per 31 lingue (title, description, keywords)
- Open Graph tags dinamici
- Twitter Cards
- Hreflang tags (32 alternate links)
- Canonical URLs per ogni lingua

**Middleware Mantiene**:
- JSON-LD schemas (Organization, FAQPage, WebApplication, BreadcrumbList)
- <main> semantic wrapper
- H1 hidden backup

**Commit Milestone**: "PHASE1: Meta tags ownership migrated to Lovable"

**Verifica Success**:
```bash
# Meta tags presenti in HTML source
curl -s https://folder2text.com | grep '<meta name="description"'

# Hreflang count = 32
curl -s https://folder2text.com | grep -c 'rel="alternate" hreflang='

# Score mantenuto
/verify-seo https://folder2text.com
# Target: 100/100
```

---

### FASE 2: Structured Data Semplici → Lovable (PROSSIMA)

**Obiettivo**: Lovable genera structured data inline dove possibile

**Lovable Aggiunge**:
- BreadcrumbList component React
- FAQPage structured data inline (JSON-LD in component)
- Product/Offer schemas per pricing

**Middleware Riduce**:
- Solo Organization schema (brand identity core)
- Solo WebApplication schema (app info core)

**Esempio BreadcrumbList Component**:
```typescript
// src/components/SEO/BreadcrumbSchema.tsx
export function BreadcrumbSchema() {
  const { currentLanguage } = useLanguage();
  const breadcrumbs = getBreadcrumbs(currentLanguage);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Commit Milestone**: "PHASE2: Breadcrumb and FAQ schemas migrated to Lovable"

**Verifica Success**:
```bash
# Breadcrumb presente in HTML
curl -s https://folder2text.com | grep 'BreadcrumbList'

# FAQ ancora presente
curl -s https://folder2text.com | grep 'FAQPage'

# Score mantenuto
/verify-seo https://folder2text.com
# Target: 100/100
```

---

### FASE 3: Skill SEO-Check Automation (FUTURA)

**Obiettivo**: Skill automatica per verificare ownership distribution e suggerire ottimizzazioni

**Skill**: `/seo-check`

**Funzionalità**:
1. **Ownership Analysis**
   - Rileva: quali meta tags genera Lovable
   - Rileva: quali schemas genera middleware
   - Calcola: % ownership Lovable vs Middleware

2. **Duplication Detection**
   - Verifica: meta tags duplicati (Lovable + middleware)
   - Verifica: structured data duplicati
   - Alert: conflitti trovati

3. **Migration Suggestions**
   - Identifica: schemas migrabili da middleware a Lovable
   - Suggerisce: next step migration
   - Stima: impatto score

4. **Performance Metrics**
   - Middleware execution time
   - HTML injection overhead
   - Optimization opportunities

**Output Esempio**:
```
=== SEO OWNERSHIP REPORT ===

Lovable Ownership: 65%
├── Meta tags: 100% (32/32 tags)
├── Structured data: 40% (2/5 schemas)
└── Semantic HTML: 30% (H1 only)

Middleware Ownership: 35%
├── Meta tags: 0% (migrated to Lovable)
├── Structured data: 60% (3/5 schemas)
└── Semantic HTML: 70% (<main> wrapper, H1 backup)

Duplications: 0 found

Migration Opportunities:
1. BreadcrumbList → Lovable component (EASY)
2. FAQPage → Lovable inline (MEDIUM)
3. <main> wrapper → Lovable layout (EASY)

Next Action: Implement PHASE 2 migration
```

**Implementazione Skill**:
- Location: `.claude/commands/seo-check.md`
- Tool: Curl + HTML parsing
- Compare: Lovable src vs middleware logic
- Report: Ownership distribution + suggestions

---

## Ownership Distribution Target

### Stato Attuale (Pre-FASE 1)
```
Lovable: 20%
├── UI components
└── i18n system

Middleware: 80%
├── Meta tags
├── Structured data (5 schemas)
└── Semantic wrappers
```

### FASE 1 Completata
```
Lovable: 50%
├── UI components
├── i18n system
└── Meta tags (title, description, og:*, hreflang)

Middleware: 50%
├── Structured data (5 schemas)
└── Semantic wrappers
```

### FASE 2 Completata
```
Lovable: 75%
├── UI components
├── i18n system
├── Meta tags
└── Structured data (BreadcrumbList, FAQPage)

Middleware: 25%
├── Core schemas (Organization, WebApplication)
└── Minimal semantic support
```

### FASE 3 Target (Ottimale)
```
Lovable: 85%
├── UI components
├── i18n system
├── Meta tags
├── Most structured data
└── Semantic HTML

Middleware: 15%
├── Brand identity (Organization)
└── Fallback support
```

---

## Timeline Stimata

### FASE 1 (ORA)
- Implementazione: 1-2 giorni
- Testing: 1 giorno
- Deploy + Audit: 1 giorno
- **Total**: 3-4 giorni

### FASE 2 (2 settimane dopo FASE 1)
- Implementazione: 2-3 giorni
- Testing: 1-2 giorni
- Deploy + Audit: 1 giorno
- **Total**: 4-6 giorni

### FASE 3 (1 mese dopo FASE 2)
- Skill development: 2-3 giorni
- Testing automation: 1 giorno
- Documentation: 1 giorno
- **Total**: 4-5 giorni

**Total Migration**: 6-8 settimane

---

## Risk Assessment per Fase

### FASE 1: Rischio BASSO
- Meta tags NON impattano score structured data
- Duplication impossibile (Lovable genera, middleware no)
- Rollback facile (rimuovere Helmet, middleware riprende)

### FASE 2: Rischio MEDIO
- Structured data duplicati possibile se middleware non aggiornato
- Richiede sync perfetto deploy Lovable + middleware
- Testing accurato pre-production

### FASE 3: Rischio NULLO
- Skill solo read-only (nessuna modifica)
- Automation non impatta production
- Solo reporting e suggestions

---

## Rollback Strategy per Fase

### FASE 1 Rollback
```bash
# Se meta tags Lovable falliscono
git revert [commit-phase1]
npm run build && wrangler pages deploy dist

# Middleware riprenderà meta tags automaticamente (se logica presente)
```

### FASE 2 Rollback
```bash
# Se structured data duplicati
# Opzione A: Rollback Lovable
git revert [commit-phase2]

# Opzione B: Rollback middleware (aggiorna _middleware.ts)
# Rimuovi schemas da middleware, mantieni Lovable
```

### FASE 3 Rollback
Non applicabile (skill read-only, no production impact)

---

## Success Criteria Globali

### Must Have (Tutte le Fasi)
- [ ] SEO score >= 100/100 mantenuto
- [ ] Zero duplicazione meta tags / structured data
- [ ] HTML payload non aumenta (target < 50KB)
- [ ] Meta tags cambiano lingua real-time

### Should Have (FASE 2+)
- [ ] Middleware execution time < 5ms
- [ ] Structured data validati Google Rich Results Test
- [ ] Social sharing preview corretti (Facebook, Twitter, LinkedIn)

### Nice to Have (FASE 3)
- [ ] Skill /seo-check funzionante
- [ ] Auto-detection migration opportunities
- [ ] Performance metrics dashboard

---

## Commit Convention

### FASE 1
```
PHASE1: Meta tags ownership migrated to Lovable

- Implemented React Helmet for dynamic meta tags
- Added SEO config for 31 languages
- Generated hreflang tags (32 alternates)
- Maintained middleware for structured data only

SEO Score: 100/100 (verified)
```

### FASE 2
```
PHASE2: BreadcrumbList and FAQPage migrated to Lovable

- Created BreadcrumbSchema component
- Inline FAQPage structured data
- Reduced middleware to core schemas only
- Removed duplication logic

SEO Score: 100/100 (verified)
```

### FASE 3
```
PHASE3: SEO-Check skill implemented

- Added /seo-check command
- Ownership analysis automation
- Migration suggestions engine
- Performance metrics reporting

Read-only skill, no production impact
```

---

## File References

### FASE 1
- Prompt: `PROMPT-LOVABLE-I18N-SEO-PHASE1.md`
- Workflow: `LOVABLE-WORKFLOW-STATUS.md` (updated)
- Audit: Post-deploy `/verify-seo`

### FASE 2
- Prompt: `PROMPT-LOVABLE-STRUCTURED-DATA-PHASE2.md` (da creare)
- Middleware update: `functions/_middleware.ts` (da ridurre)
- Components: `src/components/SEO/` (da creare)

### FASE 3
- Skill: `.claude/commands/seo-check.md` (da creare)
- Tests: `tests/seo-ownership.test.ts` (da creare)
- Docs: `docs/SEO-ARCHITECTURE.md` (da creare)

---

**Status**: FASE 1 in corso
**Next Milestone**: Deploy FASE 1 + verify score 100/100
**Long-term Goal**: 85% Lovable ownership, 15% middleware
