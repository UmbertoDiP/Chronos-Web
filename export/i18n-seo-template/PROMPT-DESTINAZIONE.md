# 📋 Prompt di Istruzioni per il Progetto Destinazione

> Incolla questo prompt in una nuova conversazione Lovable per replicare il sistema i18n + SEO.

---

## Istruzioni

Ho un template esportato da un altro progetto Lovable che contiene l'architettura completa per:

1. **Sistema i18n a 36 lingue** con:
   - Type-safe translation keys (`TranslationKey` type)
   - Fallback chain: locale → English → raw key
   - URL routing con prefisso lingua (`/:lang/`)
   - Rilevamento automatico: URL → localStorage → browser locale
   - Supporto RTL nativo (arabo, ebraico)
   - Naming convention: `namespace.section.element`

2. **Sistema SEO completo** con:
   - Meta tags dinamici per lingua (react-helmet-async)
   - Hreflang per tutte le 36 lingue + x-default
   - Canonical URL con pattern `/{lang}`
   - Open Graph + Twitter Cards localizzati
   - 6 schemi JSON-LD: BreadcrumbList, FAQPage, WebSite, WebApplication, HowTo, Product
   - Strategia keyword a 8 cluster

3. **Suite di test** con:
   - Test esistenza chiavi i18n (tutte le lingue)
   - Test coerenza cross-lingua (variabili, chiavi sconosciute, valori vuoti)
   - Test integrità fallback
   - Test struttura SEO (lunghezza title/description, keywords)
   - Test hreflang e canonical
   - Report finale di copertura con score 0-100%

### Cosa devi fare:

1. Copia la struttura template nel progetto
2. Sostituisci TUTTI i placeholder `[xxx]` con contenuto reale
3. Crea i file locale per ogni lingua supportata
4. Configura la SEO config per ogni lingua
5. Esegui i test fino a raggiungere score 100%

### File di riferimento:
- `template/src/lib/i18n/types.ts` — definizione chiavi
- `template/src/lib/i18n/config.ts` — registro lingue
- `template/src/lib/i18n/translations.ts` — aggregatore
- `template/src/lib/i18n/locales/en.ts` — locale template (placeholder)
- `template/src/lib/seo/config.ts` — configurazione SEO
- `template/src/contexts/LanguageContext.tsx` — context React
- `template/src/components/SEOHead.tsx` — meta tags dinamici
- `template/src/components/StructuredData/PATTERNS.ts` — pattern JSON-LD
- `tests/*.test.ts` — suite completa di validazione

### Regole:
- NON copiare contenuti editoriali dal progetto sorgente
- Ogni valore `[xxx]` è un placeholder da sostituire
- English è sempre la source of truth (TranslationKeys completo)
- Altre lingue usano `Partial<TranslationKeys>` con fallback
- Score 100% richiesto prima del deploy in produzione
