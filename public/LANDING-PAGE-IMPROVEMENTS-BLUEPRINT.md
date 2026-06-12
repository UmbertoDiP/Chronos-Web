# 🚀 Landing Page Improvements Blueprint

> Documento generato dal progetto **Chronos** — una landing page React costruita con Lovable.
> Usalo come checklist e ispirazione per migliorare qualsiasi altra landing page Lovable.

---

## 1. 🎨 Design System & Theming

### Dark/Light Mode completo
- **Toggle theme** con persistenza in localStorage
- **Design tokens semantici** in `index.css` (HSL): `--primary`, `--accent`, `--muted`, `--neon-cyan`, `--neon-magenta`
- **Gradients dedicati** per ogni tema: `--gradient-primary`, `--gradient-hero`
- **Neon glow effects** (cyan/magenta) attenuati in light mode, intensi in dark mode
- Colori **mai hardcoded** nei componenti — tutto via Tailwind semantic tokens

### Suggerimento implementativo
```css
:root {
  --primary: 186 100% 44%;        /* Cyan */
  --accent: 312 100% 50%;         /* Magenta */
  --gradient-hero: linear-gradient(135deg, ...);
  --neon-glow: 186 80% 60%;
}
.dark {
  --background: 252 40% 6%;       /* Deep purple-black */
  --foreground: 186 40% 92%;      /* Cyan-tinted white */
}
```

---

## 2. 🌍 Internazionalizzazione (i18n) — 36 Lingue

### Architettura
- **LanguageContext** con hook `useLanguage()` → `t('key')` reattivo
- **36 lingue** (25 europee + asiatiche + RTL: arabo, ebraico)
- File per lingua in `src/lib/i18n/locales/`
- **Auto-detection**: URL param → localStorage → browser locale
- Supporto **RTL** automatico (`dir="rtl"` su `<html>`)

### Cosa localizzare
- Tutti i testi UI (titoli, descrizioni, CTA, FAQ, pricing)
- Meta tags SEO (`<title>`, `<meta description>`, OG tags)
- Structured data (FAQ, HowTo steps)
- **LanguageSelector** component con ricerca e bandiere

### Suggerimento
Crea un file TypeScript per lingua con interfaccia tipizzata. Usa `t('landing.hero.title')` ovunque, mai stringhe hardcoded.

---

## 3. 🔍 SEO Avanzato

### Meta Tags Dinamici
- **React Helmet Async** per meta tags reattivi per lingua
- `<title>`, `<meta description>`, `<link canonical>` dinamici
- **37 hreflang tags** (`<link rel="alternate" hreflang="xx">`)
- **Open Graph** completo (`og:title`, `og:description`, `og:image`, `og:locale`)
- **Twitter Cards** (`twitter:card`, `twitter:title`, `twitter:image`)

### Structured Data (JSON-LD)
Componenti React dedicati per ogni schema:

| Schema | Scopo | Dove |
|--------|-------|------|
| **BreadcrumbList** | Navigazione breadcrumb | Tutte le pagine |
| **FAQPage** | FAQ con markup semantico | Homepage |
| **WebSite** | SearchAction per sitelinks | Homepage |
| **WebApplication** | Info app + rating | Homepage |
| **HowTo** | Tutorial step-by-step | Homepage |
| **Product** | Piani pricing con prezzo | Modal Pricing |

### Suggerimento
Crea una cartella `src/components/StructuredData/` con un componente per schema. Ogni componente inietta un `<script type="application/ld+json">` nel `<head>`.

---

## 4. ⚡ Performance & UX

### Lazy Loading
- **Pagine non-critiche** caricate con `React.lazy()` + `Suspense`
- Homepage caricata **eagerly** (critica per LCP)
- Fallback con spinner animato durante il caricamento

### Animazioni (Framer Motion)
- **ScrollReveal**: componente wrapper che anima gli elementi all'entrata nel viewport
- **Staggered animations**: elementi della griglia appaiono in sequenza con `delay: index * 0.1`
- **AnimatePresence** per transizioni menu mobile (spring physics)
- **ParticlesBackground**: effetto plexus interattivo nella hero section (canvas)

### Componenti UX
| Componente | Funzione |
|------------|----------|
| `ScrollProgressBar` | Barra di progresso lettura pagina (top) |
| `BackToTopButton` | Pulsante "torna su" con apparizione smooth |
| `MobileStickyCTA` | CTA fisso in basso su mobile |
| `SkipToContent` | Accessibilità — salta al contenuto principale |
| `ErrorBoundary` | Cattura errori React con fallback UI |

---

## 5. 📱 Mobile-First Design

### Responsive completo
- **Grid adattive**: `grid-cols-1 → grid-cols-2 → grid-cols-3`
- **Typography scaling**: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- **Mobile menu** animato con backdrop blur e spring transitions
- **CTA sticky** solo su mobile (`MobileStickyCTA`)
- Header compatto su mobile (`h-14 sm:h-16`)

### Suggerimento
Usa `sm:`, `md:`, `lg:` breakpoints Tailwind sistematicamente. Testa sempre su 375px (iPhone SE) e 390px (iPhone 14).

---

## 6. 🏗️ Struttura Landing Page

### Sezioni (in ordine)
1. **Header** — sticky, backdrop-blur, logo + nav + theme toggle + language selector
2. **Hero** — badge, H1 con gradient, subtitle, 2 CTA, terminal preview animato
3. **Stats** — 4 metriche chiave in griglia (emoji + numero + label)
4. **How It Works** — 3 step con icone e numerazione
5. **Features** — griglia 2×3 con icone Lucide + titolo + descrizione
6. **Comparison Table** — tabella Free vs Pro con checkmark
7. **Pricing** — 2 card (Standard gratuito + Pro con prezzo)
8. **Testimonials** — sezione social proof
9. **FAQ** — accordion con 7 domande (da i18n)
10. **Footer** — link privacy/terms, copyright, social

### Pattern chiave
- Ogni sezione è wrappata in `<ScrollReveal>` per animazione d'ingresso
- ID sections (`#features`, `#pricing`, `#faq`) per smooth scroll navigation
- `<section>` semantiche con padding responsive (`py-12 sm:py-16 lg:py-20`)

---

## 7. 💰 Pricing & Conversione

### Pricing Cards
- **Standard** (gratuito): lista feature con checkmark verdi
- **Pro** (a pagamento): badge "BEST VALUE", lista feature estese, CTA primario
- **Waitlist Modal** per piano Pro (raccolta email pre-lancio)

### Elementi di conversione
- Badge "Available on Microsoft Store" nella hero
- Terminal preview animato (developer credibility)
- Stats section con numeri impattanti
- Comparison table (Free vs Pro chiarissimo)
- Testimonials section (social proof)
- FAQ per ridurre obiezioni
- Mobile sticky CTA (sempre visibile)

---

## 8. 🛡️ Accessibilità (a11y)

- `<SkipToContent>` — link nascosto per skip to main
- `aria-label` su tutti i pulsanti icon-only
- `aria-expanded` sul menu mobile
- `<main id="main-content">` wrapper semantico
- Contrasti colore verificati per WCAG AA
- Supporto RTL nativo per arabo/ebraico

---

## 9. 🔧 Architettura Componenti

### Principi
- **Componenti piccoli e focalizzati** (1 responsabilità)
- **Design tokens** centralizzati in `index.css` + `tailwind.config.ts`
- **shadcn/ui** come base UI (Button, Card, Badge, Dialog, etc.)
- **Lucide React** per icone (tree-shakeable, coerenti)
- **Framer Motion** per animazioni (dichiarative, performanti)

### File structure consigliata
```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── StructuredData/  # JSON-LD schemas
│   ├── SEOHead.tsx      # Meta tags dinamici
│   ├── ScrollReveal.tsx # Animazione scroll
│   ├── ParticlesBackground.tsx
│   └── ...
├── contexts/
│   └── LanguageContext.tsx
├── hooks/
│   ├── useTheme.ts
│   └── use-mobile.tsx
├── lib/
│   ├── i18n/            # Traduzioni
│   └── seo/             # SEO config
└── pages/
    ├── Index.tsx         # Landing page
    └── NotFound.tsx
```

---

## 10. 📋 Checklist Rapida

Prima di pubblicare la tua landing page, verifica:

- [ ] Dark/Light mode funzionante con toggle
- [ ] i18n: almeno 5-6 lingue principali
- [ ] SEO: `<title>`, `<meta description>`, OG tags dinamici per lingua
- [ ] Structured data: almeno FAQPage + WebSite + BreadcrumbList
- [ ] Hreflang tags per ogni lingua supportata
- [ ] Lazy loading per pagine secondarie
- [ ] Animazioni scroll (ScrollReveal o equivalente)
- [ ] Mobile menu responsive con animazioni
- [ ] Sticky CTA su mobile
- [ ] Scroll progress bar
- [ ] Back to top button
- [ ] Error boundary con fallback UI
- [ ] Skip to content link (a11y)
- [ ] ARIA labels su pulsanti icon-only
- [ ] Performance: LCP < 2.5s, CLS < 0.1
- [ ] Favicon + apple-touch-icon + manifest.json (PWA ready)
- [ ] robots.txt + sitemap.xml

---

## 11. 🎯 Stack Tecnologico Consigliato

| Tecnologia | Scopo |
|------------|-------|
| React 18 + TypeScript | Framework |
| Vite | Build tool |
| Tailwind CSS | Styling con design tokens |
| shadcn/ui | Componenti UI base |
| Framer Motion | Animazioni |
| React Helmet Async | Meta tags SEO |
| React Router DOM | Routing con route localizzate |
| Lucide React | Icone |
| Lovable Cloud | Backend (waitlist, analytics) |

---

*Generato da Chronos Landing Page — Marzo 2026*
