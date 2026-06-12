# Design System Sync - Folder2Text Pro → FolderMerge Manager

Copia e incolla questo prompt nel progetto **FolderMerge Manager** su Lovable:

---

## PROMPT DA COPIARE

```
Aggiorna completamente il design system dell'applicazione per allinearla al brand "Folder2Text Pro" usando il seguente sistema di colori e stili "Cyberpunk Developer Tools".

## 1. VARIABILI CSS - index.css

Sostituisci le variabili :root e .dark con queste:

### LIGHT MODE (:root)

--background: 252 20% 98%;
--foreground: 252 30% 12%;

--card: 252 15% 97%;
--card-foreground: 252 30% 12%;

--popover: 252 15% 97%;
--popover-foreground: 252 30% 12%;

--primary: 186 100% 38%;
--primary-foreground: 0 0% 100%;

--secondary: 252 25% 94%;
--secondary-foreground: 252 30% 12%;

--muted: 252 20% 92%;
--muted-foreground: 252 15% 40%;

--accent: 312 80% 45%;
--accent-foreground: 0 0% 100%;

--destructive: 0 84% 55%;
--destructive-foreground: 0 0% 100%;

--border: 252 25% 88%;
--input: 252 25% 88%;
--ring: 186 100% 38%;

--radius: 0.5rem;

--success: 142 71% 35%;
--success-foreground: 0 0% 100%;

--warning: 38 92% 50%;
--warning-foreground: 0 0% 100%;

--sidebar-background: 252 20% 96%;
--sidebar-foreground: 252 30% 20%;
--sidebar-primary: 186 100% 38%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 252 20% 92%;
--sidebar-accent-foreground: 252 30% 12%;
--sidebar-border: 252 25% 88%;
--sidebar-ring: 186 100% 38%;

--gradient-primary: linear-gradient(135deg, hsl(312 80% 45%) 0%, hsl(186 100% 38%) 100%);
--gradient-hero: linear-gradient(135deg, hsl(252 30% 95%) 0%, hsl(186 50% 95%) 100%);

--code-bg: 252 25% 94%;
--code-text: 252 30% 15%;

--neon-cyan: 186 100% 38%;
--neon-magenta: 312 80% 45%;
--neon-glow: 186 80% 70%;


### DARK MODE (.dark)

--background: 252 40% 6%;
--foreground: 186 40% 92%;

--card: 252 35% 8%;
--card-foreground: 186 40% 92%;

--popover: 252 35% 8%;
--popover-foreground: 186 40% 92%;

--primary: 186 100% 50%;
--primary-foreground: 252 40% 6%;

--secondary: 252 30% 12%;
--secondary-foreground: 186 40% 92%;

--muted: 252 30% 14%;
--muted-foreground: 252 20% 55%;

--accent: 312 100% 59%;
--accent-foreground: 0 0% 100%;

--destructive: 0 62% 40%;
--destructive-foreground: 186 40% 92%;

--border: 252 30% 16%;
--input: 252 30% 16%;
--ring: 186 100% 50%;

--success: 142 71% 40%;
--success-foreground: 0 0% 100%;

--warning: 38 92% 50%;
--warning-foreground: 0 0% 100%;

--sidebar-background: 252 40% 5%;
--sidebar-foreground: 186 40% 92%;
--sidebar-primary: 186 100% 50%;
--sidebar-primary-foreground: 252 40% 6%;
--sidebar-accent: 252 30% 12%;
--sidebar-accent-foreground: 186 40% 92%;
--sidebar-border: 252 30% 16%;
--sidebar-ring: 186 100% 50%;

--gradient-primary: linear-gradient(135deg, hsl(312 100% 59%) 0%, hsl(186 100% 50%) 100%);
--gradient-hero: linear-gradient(135deg, hsl(312 100% 59% / 0.08) 0%, hsl(186 100% 50% / 0.12) 100%);

--code-bg: 252 35% 10%;
--code-text: 186 80% 85%;

--neon-cyan: 186 100% 50%;
--neon-magenta: 312 100% 59%;
--neon-glow: 186 100% 80%;


## 2. UTILITY CLASSES - index.css

Aggiungi queste utility classes in @layer utilities:

.gradient-primary {
  background: var(--gradient-primary);
}

.gradient-hero {
  background: var(--gradient-hero);
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.neon-glow {
  box-shadow: 
    0 0 5px hsl(var(--neon-cyan) / 0.3),
    0 0 20px hsl(var(--neon-cyan) / 0.2),
    0 0 40px hsl(var(--neon-magenta) / 0.1);
}

.neon-glow-strong {
  box-shadow: 
    0 0 10px hsl(var(--neon-cyan) / 0.5),
    0 0 30px hsl(var(--neon-cyan) / 0.3),
    0 0 60px hsl(var(--neon-magenta) / 0.2);
}

.neon-text {
  text-shadow: 
    0 0 10px hsl(var(--neon-cyan) / 0.5),
    0 0 20px hsl(var(--neon-cyan) / 0.3);
}

.neon-border {
  border-color: hsl(var(--neon-cyan));
  box-shadow: 
    0 0 5px hsl(var(--neon-cyan) / 0.3),
    inset 0 0 5px hsl(var(--neon-cyan) / 0.1);
}

.cyber-card {
  background: linear-gradient(135deg, hsl(252 35% 8%) 0%, hsl(252 40% 6%) 100%);
  border: 1px solid hsl(186 100% 50% / 0.2);
  box-shadow: 
    0 4px 20px hsl(0 0% 0% / 0.3),
    0 0 40px hsl(186 100% 50% / 0.05);
}

.terminal {
  background: hsl(252 40% 6%);
  color: hsl(186 100% 70%);
  font-family: 'SF Mono', 'Consolas', 'Monaco', monospace;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid hsl(186 100% 50% / 0.2);
  box-shadow: 
    0 0 20px hsl(186 100% 50% / 0.1),
    inset 0 0 30px hsl(252 40% 0% / 0.5);
}

.code-block {
  background: hsl(var(--code-bg));
  color: hsl(var(--code-text));
  font-family: 'SF Mono', 'Consolas', 'Monaco', monospace;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
}


## 3. TAILWIND CONFIG - tailwind.config.ts

Aggiungi questi colori in theme.extend.colors:

colors: {
  // ... existing colors ...
  success: {
    DEFAULT: "hsl(var(--success))",
    foreground: "hsl(var(--success-foreground))",
  },
  warning: {
    DEFAULT: "hsl(var(--warning))",
    foreground: "hsl(var(--warning-foreground))",
  },
  neon: {
    cyan: "hsl(var(--neon-cyan))",
    magenta: "hsl(var(--neon-magenta))",
    glow: "hsl(var(--neon-glow))",
  },
}

Aggiungi fontFamily:

fontFamily: {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['SF Mono', 'Consolas', 'Monaco', 'monospace'],
}

Aggiungi animazione glow-pulse in keyframes:

"glow-pulse": {
  "0%, 100%": {
    boxShadow: "0 0 5px hsl(var(--neon-cyan) / 0.3), 0 0 20px hsl(var(--neon-cyan) / 0.2)",
  },
  "50%": {
    boxShadow: "0 0 15px hsl(var(--neon-cyan) / 0.5), 0 0 40px hsl(var(--neon-cyan) / 0.3), 0 0 60px hsl(var(--neon-magenta) / 0.2)",
  },
}

E in animation:

"glow-pulse": "glow-pulse 2s ease-in-out infinite",


## 4. BODY STYLES - index.css

body {
  @apply bg-background text-foreground antialiased;
  font-family: 'Inter', 'SF Mono', 'Consolas', system-ui, -apple-system, sans-serif;
}


## 5. CUSTOM SCROLLBAR - index.css

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-muted/50;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary/30 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-primary/50;
}


## RIEPILOGO COLORI HEX

| Colore | Light Mode | Dark Mode |
|--------|------------|-----------|
| Primary (Cyan) | #00C4D9 | #00E5FF |
| Accent (Magenta) | #D020A0 | #FF2ED1 |
| Background | #FAFAFC | #0B0F1E |
| Foreground | #1A1A2E | #E0F4F8 |
| Card | #F8F8FB | #12162A |
| Border | #E0E0EC | #1E2340 |

Applica tutte queste modifiche mantenendo la compatibilità con entrambi i temi light e dark.
```

---

## Note

- **Light mode** è il tema primario ottimizzato per conversioni
- **Dark mode** usa colori neon più intensi per l'effetto cyberpunk
- I gradienti vanno da **magenta (accent) → cyan (primary)**
- Usa sempre variabili HSL senza `hsl()` wrapper nelle variabili CSS
