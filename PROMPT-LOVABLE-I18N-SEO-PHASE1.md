# MISSIONE: i18n + SEO Meta Tags Ownership (FASE 1)

Agisci come Lead Frontend Engineer specializzato in i18n, SEO on-page e React meta tags management.

## OBIETTIVO STRATEGICO

Portare la gestione dei **meta tags SEO** completamente dentro Lovable (React), mantenendo il middleware Cloudflare solo per JSON-LD schemas complessi.

**Questa è FASE 1**: Lovable prende ownership di title, description, og:tags, hreflang.

**FASE 2 (futura)**: Lovable prenderà ownership di structured data inline.

---

## ARCHITETTURA TARGET (Fase 1)

### LOVABLE Gestisce (NUOVO - da implementare)
- ✅ Meta tags dinamici per 31 lingue (title, description)
- ✅ Open Graph tags (og:title, og:description, og:image, og:url)
- ✅ Twitter Cards (twitter:card, twitter:title, twitter:description)
- ✅ Hreflang tags per tutte le lingue
- ✅ Canonical URLs dinamici
- ✅ Viewport, charset, theme-color
- ✅ Contenuti UI (landing, pricing modal)
- ✅ Sistema i18n completezza

### MIDDLEWARE Cloudflare Mantiene (ESISTENTE - non toccare)
- ✅ JSON-LD schemas (Organization, FAQPage, WebApplication, BreadcrumbList)
- ✅ <main> wrapper semantic
- ✅ H1 hidden backup

**Separazione netta**: Lovable = Meta tags HTML, Middleware = Structured data JSON-LD

---

## STEP 1: Audit i18n Completeness

[IDENTICO AL PROMPT PRECEDENTE]

1. Script confronto en.ts con 30+ file lingua
2. Conteggio chiavi mancanti
3. Auto-generazione traduzioni professionali
4. Focus: landing, pricing, FAQ

**Output**: Report chiavi mancanti + traduzioni generate

---

## STEP 2: Implementazione React Helmet / Meta Tags Hook

### Obiettivo
Creare sistema robusto per gestire <head> HTML dinamicamente in base a lingua corrente.

### Implementazione Consigliata

**Opzione A: React Helmet Async** (Raccomandato)
```bash
npm install react-helmet-async
```

**Opzione B: Custom Hook** (se già presente sistema simile)

### Struttura File

```
src/
├── lib/
│   └── seo/
│       ├── config.ts           # SEO config per lingua
│       ├── useSEOTags.tsx      # Hook meta tags
│       └── SEOHead.tsx         # Component wrapper
└── App.tsx                     # Implementa SEOHead
```

### Config SEO per Lingua

**File**: `src/lib/seo/config.ts`

```typescript
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterHandle?: string;
}

export const seoConfigByLanguage: Record<string, SEOConfig> = {
  en: {
    title: "Folder2Text - Convert Folders to Text Files Online",
    description: "Free online tool to convert folder structures to text files. Export directory trees, file lists, and folder contents instantly. No installation required.",
    keywords: ["folder to text", "directory tree", "export folders", "file list generator", "free tool"],
    ogImage: "https://folder2text.com/og-image-en.png",
    twitterHandle: "@folder2text"
  },
  it: {
    title: "Folder2Text - Converti Cartelle in File di Testo Online",
    description: "Strumento gratuito online per convertire strutture di cartelle in file di testo. Esporta alberi di directory, liste file e contenuti cartelle istantaneamente.",
    keywords: ["converti cartelle", "albero directory", "esporta cartelle", "generatore lista file", "strumento gratuito"],
    ogImage: "https://folder2text.com/og-image-it.png"
  },
  es: {
    title: "Folder2Text - Convertir Carpetas a Archivos de Texto Online",
    description: "Herramienta gratuita online para convertir estructuras de carpetas a archivos de texto. Exporta árboles de directorios, listas de archivos y contenidos al instante.",
    keywords: ["convertir carpetas", "árbol directorio", "exportar carpetas", "generador lista archivos", "herramienta gratis"],
    ogImage: "https://folder2text.com/og-image-es.png"
  },
  // ... altre 28 lingue
  de: {
    title: "Folder2Text - Ordner in Textdateien Online Konvertieren",
    description: "Kostenloses Online-Tool zum Konvertieren von Ordnerstrukturen in Textdateien. Exportieren Sie Verzeichnisbäume, Dateilisten und Ordnerinhalte sofort.",
    keywords: ["ordner konvertieren", "verzeichnisbaum", "ordner exportieren", "dateiliste generator", "kostenloses tool"],
    ogImage: "https://folder2text.com/og-image-de.png"
  },
  fr: {
    title: "Folder2Text - Convertir Dossiers en Fichiers Texte en Ligne",
    description: "Outil gratuit en ligne pour convertir des structures de dossiers en fichiers texte. Exportez des arborescences, listes de fichiers et contenus instantanément.",
    keywords: ["convertir dossiers", "arborescence", "exporter dossiers", "générateur liste fichiers", "outil gratuit"],
    ogImage: "https://folder2text.com/og-image-fr.png"
  }
  // ... continua per tutte le 31 lingue
};

// Fallback per lingue non ancora configurate
export function getSEOConfig(language: string): SEOConfig {
  return seoConfigByLanguage[language] || seoConfigByLanguage.en;
}
```

### SEO Head Component

**File**: `src/lib/seo/SEOHead.tsx`

```typescript
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext'; // o hook lingua esistente
import { getSEOConfig, seoConfigByLanguage } from './config';

interface SEOHeadProps {
  pageType?: 'home' | 'pricing' | 'about'; // per future pagine custom
  customTitle?: string;
  customDescription?: string;
}

export function SEOHead({ pageType = 'home', customTitle, customDescription }: SEOHeadProps) {
  const { currentLanguage } = useLanguage();
  const seoConfig = getSEOConfig(currentLanguage);

  const title = customTitle || seoConfig.title;
  const description = customDescription || seoConfig.description;
  const canonicalUrl = `https://folder2text.com${currentLanguage !== 'en' ? `/${currentLanguage}` : ''}`;

  // Generate hreflang tags for all supported languages
  const hreflangTags = Object.keys(seoConfigByLanguage).map(lang => ({
    lang,
    url: `https://folder2text.com${lang !== 'en' ? `/${lang}` : ''}`
  }));

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={currentLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoConfig.keywords.join(', ')} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" hrefLang="x-default" href="https://folder2text.com" />
      {hreflangTags.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoConfig.ogImage} />
      <meta property="og:locale" content={currentLanguage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoConfig.ogImage} />
      {seoConfig.twitterHandle && (
        <meta name="twitter:site" content={seoConfig.twitterHandle} />
      )}

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
}
```

### Integrazione in App.tsx

```typescript
import { HelmetProvider } from 'react-helmet-async';
import { SEOHead } from '@/lib/seo/SEOHead';

function App() {
  return (
    <HelmetProvider>
      <SEOHead />
      {/* resto app */}
    </HelmetProvider>
  );
}
```

---

## STEP 3: SEO On-Page Content (INVARIATO)

[IDENTICO AL PROMPT PRECEDENTE]

- H1 keyword-rich per ogni lingua
- FAQ section 5+ domande
- Primi paragrafi keyword naturali
- Pricing modal CTA action-oriented

---

## STEP 4: Layout Multilingua (INVARIATO)

[IDENTICO AL PROMPT PRECEDENTE]

- RTL support (ar, he)
- Long text handling (de, ru)
- Break-words, responsive buttons

---

## STEP 5: OG Images per Lingua (BONUS)

### Obiettivo
Creare Open Graph images localizzate per social sharing ottimale.

### Implementazione

**Opzione A: Cloudinary Dynamic Images** (Raccomandato)
```typescript
// config.ts
export function getOGImageUrl(language: string): string {
  const text = encodeURIComponent(seoConfigByLanguage[language]?.title || 'Folder2Text');
  return `https://res.cloudinary.com/YOUR_CLOUD/image/upload/l_text:Arial_60_bold:${text}/og-template.png`;
}
```

**Opzione B: Static Images per Lingua**
```
public/
└── og-images/
    ├── og-image-en.png
    ├── og-image-it.png
    ├── og-image-es.png
    └── ... (31 immagini)
```

Dimensioni: 1200x630px (Facebook/LinkedIn standard)

---

## VERIFICA IMPLEMENTAZIONE

### Checklist Pre-Deploy

- [ ] React Helmet installato e configurato
- [ ] SEOHead component implementato
- [ ] seoConfig completo per tutte 31 lingue
- [ ] Hreflang tags generati per tutte lingue
- [ ] Canonical URLs corretti per ogni lingua
- [ ] OG images presenti (almeno en, it, es, de, fr)
- [ ] Meta tags cambiano dinamicamente al cambio lingua
- [ ] NO duplicazione con middleware (middleware NON genera meta tags)

### Test Manuale

**Test 1: Meta Tags Dinamici**
```javascript
// Browser console
document.querySelector('meta[name="description"]').content
// Deve cambiare in italiano se lingua = 'it'
```

**Test 2: Hreflang Tags**
```javascript
document.querySelectorAll('link[rel="alternate"]').length
// Deve essere = 32 (31 lingue + x-default)
```

**Test 3: Open Graph**
```bash
# Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/?q=https://folder2text.com
```

---

## OUTPUT FINALE

### Fornisci Report Strutturato

```markdown
=== FASE 1 IMPLEMENTATION REPORT ===

## Step 1: i18n Audit
- Chiavi totali baseline (en.ts): XXX
- Chiavi mancanti trovate: XX
- File aggiornati: [lista]
- Completezza: XX/31 lingue a 100%

## Step 2: SEO Meta Tags Ownership
✅ React Helmet installato: [version]
✅ SEOHead component creato: src/lib/seo/SEOHead.tsx
✅ seoConfig completato: XX/31 lingue
✅ Hreflang tags: 32 links generati
✅ OG images: XX/31 lingue disponibili

## Step 3: Content SEO
✅ H1 ottimizzato per 31 lingue
✅ FAQ section: 5 domande
✅ Meta descriptions: 150-160 char

## Step 4: Layout
✅ RTL support: ar, he
✅ Long text: de, ru, fi

## Step 5: OG Images
✅ Static images: XX/31 creati
[ ] Cloudinary dynamic: da implementare

=== NEXT STEPS ===
1. Deploy preview
2. Verificare meta tags su preview.folder2text.pages.dev
3. Test Facebook Sharing Debugger
4. Deploy production
5. Audit SEO score (target: mantieni 100/100)
```

---

## COSA NON FARE (CRITICO)

### ❌ NON Duplicare Meta Tags nel Middleware

Il middleware Cloudflare **NON deve più generare meta tags**.

Se middleware contiene logica tipo:
```typescript
// _middleware.ts - DA RIMUOVERE SE PRESENTE
response.headers.set('meta-description', '...')
```

**Non toccare** (verrà rimosso in FASE 2 dedicata).

### ❌ NON Aggiungere JSON-LD in Lovable (ANCORA)

Organization, FAQPage, WebApplication schemas restano nel middleware.

**FASE 2 futura**: Li migrerai in React components.

---

## STRATEGIA MIGRATION (Fasi Future)

### FASE 1 (QUESTA): Meta Tags → Lovable ✅
- Lovable gestisce: title, description, og:*, hreflang
- Middleware mantiene: JSON-LD schemas

### FASE 2 (PROSSIMA): Structured Data Semplici → Lovable
- Lovable aggiunge: BreadcrumbList inline, FAQPage inline
- Middleware riduce: solo Organization, WebApplication

### FASE 3 (FINALE): Skill SEO-Check Automation
- Skill verifica ownership distribution
- Auto-detection duplicazioni
- Suggerimenti optimization
- Score ownership: % Lovable vs % Middleware

---

## BENEFIT FASE 1

**Per te (Developer)**:
- SEO nel codice React versionato (visibile, manutenibile)
- Meta tags localizzati con sistema i18n esistente
- Zero runtime overhead (Helmet compila a SSR)

**Per progetto**:
- Middleware più leggero (meno logica)
- Meta tags cambiano lingua real-time (UX++)
- OG images personalizzate per social (CTR++)

**Per SEO**:
- Hreflang corretto (Google non penalizza duplicati)
- Canonical URLs precisi (no cannibalizzazione)
- Score 100/100 mantenuto (zero regressione)

---

**PROCEDI CON STEP 1 + STEP 2**

Mostra prima audit i18n, poi implementazione SEOHead con sample per 5 lingue (en, it, es, de, fr).
