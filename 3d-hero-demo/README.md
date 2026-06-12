# Folder2Text 3D Hero Demo

Demo standalone della hero section con logo 3D interattivo.

## Setup

### 1. Aggiungi il modello GLB

Metti il file `folder2text_logo.glb` nella cartella `public/`:

```
3d-hero-demo/
├── index.html
├── README.md
└── public/
    └── folder2text_logo.glb  ← Qui!
```

### 2. Avvia un server HTTP locale

**Opzione A - Python:**
```bash
cd 3d-hero-demo
python -m http.server 8000
```

**Opzione B - Node.js:**
```bash
npx serve -p 8000
```

**Opzione C - VS Code Live Server:**
1. Installa l'estensione "Live Server"
2. Right-click su `index.html` → "Open with Live Server"

### 3. Apri nel browser

Naviga su: `http://localhost:8000`

## Features

✅ Logo 3D con materiali PBR realistici
✅ Rotazione continua smooth
✅ Floating animation leggera
✅ Bloom post-processing (effetto neon)
✅ Parallax interattivo al movimento mouse (solo desktop)
✅ Responsive mobile-friendly
✅ Rispetta `prefers-reduced-motion`
✅ Gestione errori e loading state

## Tech Stack

- **Three.js** (via CDN) - Rendering 3D WebGL
- **EffectComposer** - Post-processing pipeline
- **UnrealBloomPass** - Effetto bloom/glow
- **GLTFLoader** - Caricamento modelli 3D

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Richiede supporto WebGL 2.0.
