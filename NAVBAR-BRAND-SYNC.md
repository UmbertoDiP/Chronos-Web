# Navbar Brand Sync - Folder2Text Pro → FolderMerge Manager

Copia e incolla questo prompt nel progetto **FolderMerge Manager** su Lovable:

---

## PROMPT DA COPIARE

```
Aggiorna completamente il navbar brand e la tipografia dell'applicazione per allinearla al brand "Folder2Text Pro".

## 1. NAVBAR BRAND

Sostituisci il brand attuale nella navbar con questo codice (mantieni il badge PRO esistente se presente):

### Struttura HTML/JSX:

<Link to="/" className="flex items-center gap-2 shrink-0">
  <FolderOpen className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
  <span className="text-lg sm:text-xl font-bold text-gradient">Folder2Text</span>
</Link>

### Dettagli stilistici:
- Icona: `FolderOpen` da lucide-react
- Dimensioni icona: `w-6 h-6` mobile, `w-7 h-7` desktop (sm:)
- Colore icona: `text-primary` (cyan cyberpunk)
- Testo: "Folder2Text" 
- Dimensioni testo: `text-lg` mobile, `text-xl` desktop (sm:)
- Font weight: `font-bold`
- Colore testo: `text-gradient` (gradient magenta → cyan)
- Gap tra icona e testo: `gap-2`
- Shrink: `shrink-0` per evitare compressione

### Se hai un badge PRO, posizionalo così:

<Link to="/" className="flex items-center gap-2 shrink-0">
  <FolderOpen className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
  <span className="text-lg sm:text-xl font-bold text-gradient">Folder2Text</span>
  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-white rounded">PRO</span>
</Link>


## 2. FONTS - index.css e tailwind.config.ts

### Google Fonts (aggiungi in index.html):

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

### Body font in index.css:

body {
  @apply bg-background text-foreground antialiased;
  font-family: 'Inter', 'SF Mono', 'Consolas', system-ui, -apple-system, sans-serif;
}

### Tailwind config - fontFamily:

fontFamily: {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['SF Mono', 'Consolas', 'Monaco', 'monospace'],
}


## 3. TEXT-GRADIENT CLASS - index.css

Aggiungi questa utility class in @layer utilities:

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

Dove --gradient-primary è:
- Light: linear-gradient(135deg, hsl(312 80% 45%) 0%, hsl(186 100% 38%) 100%)
- Dark: linear-gradient(135deg, hsl(312 100% 59%) 0%, hsl(186 100% 50%) 100%)


## 4. TIPOGRAFIA GLOBALE

### Heading styles (opzionale, per coerenza):

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
}

### Font weights usati nel progetto:
- `font-medium` (500): Testo secondario, descrizioni
- `font-semibold` (600): Label, sottotitoli
- `font-bold` (700): Titoli, brand, CTA
- `font-extrabold` (800): Hero titles, emphasis
- `font-black` (900): Prezzi, numeri importanti


## 5. STILI TESTO SPECIFICI

### Testo primario (titoli, brand):
- Classe: `font-bold` o `font-extrabold`
- Colore: `text-foreground` o `text-gradient`

### Testo secondario (descrizioni):
- Classe: `font-medium`
- Colore: `text-muted-foreground`

### Testo accent (badge, label):
- Classe: `font-bold` o `font-extrabold`
- Colore: `text-accent` o `text-primary`
- Background: `bg-accent` o `bg-primary` con `text-white`

### Testo uppercase (sezioni, categorie):
- Classe: `uppercase tracking-wide` o `tracking-wider`
- Dimensione: `text-xs` o `text-sm`
- Colore: `text-muted-foreground`


## 6. NAVBAR HEADER COMPLETA

Per riferimento, ecco la struttura completa della navbar:

<header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
  <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
    
    {/* Brand */}
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <FolderOpen className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
      <span className="text-lg sm:text-xl font-bold text-gradient">Folder2Text</span>
    </Link>
    
    {/* Desktop Nav */}
    <nav className="hidden lg:flex items-center gap-6 text-sm">
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        Features
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        Pricing
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        Changelog
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        FAQ
      </button>
    </nav>
    
    {/* Actions */}
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Language selector, theme toggle, CTA button */}
    </div>
    
  </div>
</header>

### Stili navbar:
- Sticky: `sticky top-0 z-50`
- Background: `bg-background/95 backdrop-blur`
- Fallback: `supports-[backdrop-filter]:bg-background/60`
- Border: `border-b`
- Altezza: `h-14` mobile, `h-16` desktop (sm:)
- Container: `container mx-auto px-4`
- Layout: `flex items-center justify-between`


## 7. IMPORT LUCIDE ICONS

Assicurati di importare l'icona FolderOpen:

import { FolderOpen } from 'lucide-react';


## RIEPILOGO

| Elemento | Classe/Stile |
|----------|--------------|
| Brand icon | `FolderOpen w-6 h-6 sm:w-7 sm:h-7 text-primary` |
| Brand text | `text-lg sm:text-xl font-bold text-gradient` |
| PRO badge | `px-1.5 py-0.5 text-[10px] font-bold bg-accent text-white rounded` |
| Nav links | `text-muted-foreground hover:text-foreground transition-colors` |
| Font family | Inter (sans), SF Mono (mono) |
| Gradient | Magenta (#E020B0) → Cyan (#00C4D9) |

Applica queste modifiche mantenendo il badge PRO esistente nella tua app.
```

---

## Note Importanti

- Il brand usa **text-gradient** che va da magenta (accent) a cyan (primary)
- L'icona **FolderOpen** è specifica del brand Folder2Text
- Il **badge PRO** usa `bg-accent` (magenta) con testo bianco
- La navbar usa **backdrop-blur** per l'effetto glassmorphism
- Font principale: **Inter** con vari weights (400-900)
