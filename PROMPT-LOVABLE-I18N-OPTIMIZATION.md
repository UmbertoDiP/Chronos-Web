# MISSIONE: Ottimizzazione Contenuti i18n "Folder2Text"

Agisci come Lead Frontend Engineer specializzato in i18n e SEO on-page.

## IMPORTANTE - Separazione Responsabilità

**Lovable gestisce**: Contenuti UI visibili (testi, traduzioni, layout)
**Infrastruttura Cloudflare gestisce**: Structured data, semantic HTML wrapper, meta tags tecnici

**NON aggiungere**:
- JSON-LD structured data (Organization, FAQPage, etc.) - già gestiti da middleware Cloudflare
- Modifiche a tag semantic esistenti (<main>, <article>, <section>) - già ottimizzati
- Meta tag statici in <head> HTML - usa React hooks dinamici

---

## STEP 1: Audit i18n Completeness (Zero Buchi)

### Obiettivo
Garantire che tutte le 32 lingue supportate abbiano traduzioni complete per landing page e pricing modal.

### Azioni
1. **Scrivi ed esegui script di controllo in memoria** che:
   - Legge file base `src/locales/en.ts` (o interfaccia TranslationKeys)
   - Confronta con TUTTI i restanti file lingua (it.ts, es.ts, fr.ts, de.ts, pt.ts, etc.)
   - Conta chiavi presenti/mancanti per ogni lingua
   - Genera report: `Lingua | Chiavi Totali | Chiavi Mancanti | %Completezza`

2. **Se rileva chiavi mancanti**:
   - Itera su tutti i file con buchi
   - Auto-genera traduzioni mancanti con tono professionale
   - Mantieni coerenza terminologica (usa stessi termini per concetti ricorrenti)

3. **Focus aree critiche**:
   - Landing page hero section
   - Features list
   - Pricing modal (piani, benefits, CTA)
   - FAQ section
   - Footer links

### Output Atteso
```
=== I18N AUDIT REPORT ===
en.ts: 150 keys (100% baseline)
it.ts: 150 keys (100% complete)
es.ts: 148 keys (98.7% - missing: pricing.benefit3, faq.q5)
fr.ts: 145 keys (96.7% - missing: pricing.cta, faq.q4, faq.q5)
de.ts: 150 keys (100% complete)
...

ACTION: Generated 12 missing translations across 5 language files
```

---

## STEP 2: SEO On-Page Content Optimization

### Obiettivo
Ottimizzare contenuti visibili per keyword relevance e user intent, senza keyword stuffing.

### Landing Page

**H1 principale**:
- Deve includere keyword primaria naturalmente
- Esempi:
  - EN: "Convert Folders to Text Files - Free Online Tool"
  - IT: "Converti Cartelle in File di Testo - Strumento Gratuito"
  - ES: "Convertir Carpetas a Archivos de Texto - Herramienta Gratis"

**Hero description (primi 200 caratteri)**:
- Keyword primarie naturali: "folder structure", "text file", "export", "tree view"
- Benefit-oriented: cosa risolve per utente
- Call-to-action chiaro

**FAQ Section** (se non presente, creala):
- Minimo 5 domande comuni:
  1. "How does Folder2Text work?"
  2. "Is it free to use?"
  3. "What file formats are supported?"
  4. "Can I export folder structure?"
  5. "Is my data private?"
- Risposte concise (2-3 frasi max)
- Usa linguaggio naturale, non tecnico

### Pricing Modal

**Titoli piani chiari**:
- Non "Basic/Pro/Enterprise" generici
- Esempi: "Free Forever", "Professional Monthly", "Teams Unlimited"

**Benefits list keyword-aware**:
- Non: "Unlimited usage"
- Meglio: "Unlimited folder exports" (più specifico)

**Call-to-Action action-oriented**:
- Non: "Get Started"
- Meglio: "Start Converting Now" / "Try Free for 30 Days"

### Meta Tags Dinamici (React Hooks)

Se non presenti, crea hook `useDocumentTitle` o usa React Helmet:

```typescript
// src/hooks/useDocumentTitle.ts
const seoConfig: Record<string, { title: string; description: string }> = {
  en: {
    title: "Folder2Text - Convert Folders to Text Files Online",
    description: "Free online tool to convert folder structures to text files. Export directory trees, file lists, and folder contents instantly. No installation required."
  },
  it: {
    title: "Folder2Text - Converti Cartelle in File di Testo Online",
    description: "Strumento gratuito online per convertire strutture di cartelle in file di testo. Esporta alberi di directory, liste file e contenuti cartelle istantaneamente."
  },
  // ... altre 30 lingue
}
```

**Regole**:
- Title: 50-60 caratteri (incluso brand)
- Description: 150-160 caratteri
- Keyword primaria in title
- Benefit-oriented description

---

## STEP 3: Layout Multilingua (RTL + Long Text)

### Obiettivo
Garantire layout non si rompa con lingue lunghe o RTL.

### Test Lingue Lunghe (Tedesco, Russo, Finlandese)

**Problema**: Tedesco è ~30% più lungo dell'inglese, può rompere layout fixed-width.

**Soluzioni Tailwind**:
```tsx
// Prima (può rompere)
<button className="w-48">Get Started</button>

// Dopo (responsive)
<button className="min-w-48 w-auto px-6">Get Started</button>

// Testi lunghi in card
<div className="break-words hyphens-auto">
  {t('pricing.longDescription')}
</div>
```

### Test RTL (Arabo, Ebraico)

**Direzione testo**:
```tsx
// Rilevamento automatico RTL
const isRTL = ['ar', 'he', 'fa'].includes(currentLanguage);

<div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'text-right' : 'text-left'}>
  {content}
</div>
```

**Tailwind RTL utilities**:
```tsx
// Padding/Margin
className="ml-4 rtl:mr-4 rtl:ml-0"

// Text alignment
className="text-left rtl:text-right"

// Flex direction
className="flex flex-row rtl:flex-row-reverse"
```

### Checklist Pre-Deploy

- [ ] Test visual con lingua più lunga (Tedesco)
- [ ] Test visual con RTL (Arabo)
- [ ] Pricing modal non overflow su mobile
- [ ] CTA buttons non troncati
- [ ] FAQ accordion funziona in tutte le lingue

---

## Regole di Esecuzione

### Prima di Modificare
1. Mostra output audit Step 1 (conteggio chiavi mancanti)
2. Aspetta conferma per procedere con generazione traduzioni

### Durante Modifiche
- Lavora un file lingua alla volta
- Mostra sample modifiche (non tutti i 32 file completi)
- Evidenzia chiavi critiche aggiunte/modificate

### Output Finale
Fornisci:
```
=== MODIFICHE APPLICATE ===

Step 1 - i18n Audit:
- 12 chiavi mancanti generate
- File aggiornati: es.ts, fr.ts, pt.ts, pl.ts, nl.ts

Step 2 - Content SEO:
- H1 ottimizzato (keyword: "convert folders to text")
- FAQ section aggiunta (5 domande)
- Meta tags dinamici implementati (useDocumentTitle hook)
- Pricing CTA rinforzati (action-oriented)

Step 3 - Layout Multilingua:
- RTL support aggiunto (ar, he)
- Break-words su descrizioni lunghe
- Button responsive width (no fixed)

=== TEST RACCOMANDATI ===
1. Visual test con lingua DE (tedesco - più lungo)
2. Visual test con lingua AR (arabo - RTL)
3. Mobile test pricing modal (overflow check)
```

---

## Cosa NON Fare (CRITICO)

### ❌ NON Aggiungere Structured Data
```tsx
// ❌ SBAGLIATO - NON FARE
<script type="application/ld+json">
{
  "@type": "Organization",
  "name": "Folder2Text"
}
</script>
```
**Motivo**: Già gestito da middleware Cloudflare, duplicazione rompe SEO score.

### ❌ NON Modificare Semantic HTML Esistente
```tsx
// ❌ SBAGLIATO - NON MODIFICARE
<main className="...">  // Se già presente, lascialo
<article>               // Se già presente, lascialo
<section>               // Se già presente, lascialo
```
**Motivo**: Architettura semantic già ottimizzata.

### ❌ NON Aggiungere Meta Tag Statici in index.html
```html
<!-- ❌ SBAGLIATO - NON FARE -->
<head>
  <meta name="description" content="Convert folders...">
</head>
```
**Motivo**: Usa React hooks dinamici per meta tags multilingua.

---

## Procedi

Inizia con **STEP 1**: esegui audit i18n e mostra risultati conteggio chiavi prima di generare traduzioni.
