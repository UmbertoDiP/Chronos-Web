# Workflow Automatico Deploy Lovable → Produzione

**Scopo**: Documento da invocare in ogni conversazione per aggiornare e deployare automaticamente il progetto Lovable wrapper su Cloudflare Pages fino a produzione.

## Quick Command

Usa questo comando in ogni conversazione per eseguire tutto automaticamente:

```
Esegui WORKFLOW-AUTO-DEPLOY.md: pull → verifica wrapper → sync template → build → deploy preview → deploy produzione → commit → push
```

---

## Workflow Completo (Step-by-Step)

### FASE 1: Aggiornamento Repository

```bash
cd /c/Users/umber/Documents/MyProjects/Folder2TextLovable
git fetch origin
git pull origin main
```

**Output atteso**: `Fast-forward` o `Already up to date`

**Verifica**:
```bash
git log --oneline -3
git status
```

---

### FASE 2: Verifica Wrapper Integrità

Verifica che i file wrapper NON siano stati sovrascritti da Lovable export:

#### 2.1 Google Analytics (index.html)
```bash
grep -E "G-P29XH6Z3VX|gtag" index.html
```
**Atteso**: Deve mostrare script gtag.js con ID G-P29XH6Z3VX

#### 2.2 Sitemap (public/sitemap.xml)
```bash
head -20 public/sitemap.xml | grep -E "<url>|<loc>"
```
**Atteso**: Deve mostrare URLs con https://folder2text.com

#### 2.3 Robots.txt (public/robots.txt)
```bash
cat public/robots.txt
```
**Atteso**:
```
User-agent: *
Allow: /
Sitemap: https://folder2text.com/sitemap.xml
```

#### 2.4 Favicon e Manifest (public/)
```bash
ls -lh public/ | grep -E "favicon|manifest"
```
**Atteso**: Presenza di favicon.ico, favicon.svg, manifest.json

**Se qualcosa manca**: Ripristina da backup wrapper o da commit precedente.

---

### FASE 3: Sync Template Master

Sincronizza Privacy Policy e Terms of Service da master templates:

```bash
# Verifica esistenza template master
ls -la ../FolderTextMerger/lovable-templates/

# Copia template master → Lovable
cp ../FolderTextMerger/lovable-templates/PrivacyPolicy.tsx src/pages/PrivacyPolicy.tsx
cp ../FolderTextMerger/lovable-templates/TermsOfService.tsx src/pages/TermsOfService.tsx
```

**Verifica modifiche**:
```bash
git diff src/pages/PrivacyPolicy.tsx src/pages/TermsOfService.tsx
```

---

### FASE 4: Build Progetto

```bash
npm run build
```

**Output atteso**:
- `✓ X modules transformed`
- `✓ Forced copy of sitemap.xml to dist/`
- `✓ built in X.XXs`
- Nessun errore critico (warnings su chunk size sono OK)

**Verifica build output**:
```bash
ls -lh dist/ | head -10
ls dist/assets/*.js | wc -l
```

**Atteso**:
- Directory `dist/` popolata
- File `index.html`, `sitemap.xml`, `robots.txt`
- Assets JS e CSS in `dist/assets/`

---

### FASE 5: Deploy Preview (Testing)

Deploy su URL preview per verificare prima di produzione:

```bash
npx wrangler pages deploy dist/ \
    --project-name=folder2text \
    --commit-dirty=true
```

**Output atteso**:
```
✨ Deployment complete! Take a peek over at https://XXXXX.folder2text.pages.dev
✨ Deployment alias URL: https://main.folder2text.pages.dev
```

**Verifica Preview**:
1. Apri URL preview nel browser
2. Verifica Google Analytics caricato (DevTools Network → gtag.js)
3. Verifica sitemap accessibile: `/sitemap.xml`
4. Verifica Privacy Policy: `/privacy`
5. Verifica Terms of Service: `/terms`
6. Verifica nuovi componenti visibili (se aggiunti)

**Se OK**: Procedi con deploy produzione
**Se KO**: Fix errori e ripeti build + deploy preview

---

### FASE 6: Deploy Produzione

Deploy su custom domain folder2text.com:

```bash
npx wrangler pages deploy dist/ \
    --project-name=folder2text \
    --branch=folder2text \
    --commit-dirty=true
```

**Output atteso**:
```
✨ Deployment complete! Take a peek over at https://YYYYY.folder2text.pages.dev
```

**Custom domain aggiornato automaticamente**: https://folder2text.com

**Verifica Produzione** (dopo 1-2 minuti per cache CDN):
1. Apri https://folder2text.com (hard refresh: Ctrl+F5)
2. Verifica https://www.folder2text.com (redirect a apex domain)
3. Verifica Google Analytics
4. Verifica sitemap e robots.txt
5. Test funzionalità principali

---

### FASE 7: Commit e Push GitHub

Se ci sono modifiche ai template o wrapper:

```bash
# Stage modifiche
git add src/pages/PrivacyPolicy.tsx src/pages/TermsOfService.tsx

# Verifica cosa verrà committato
git diff --cached

# Commit
git commit -m "Sync updated templates from master (Privacy Policy & Terms of Service)"

# Push
git push origin main
```

**IMPORTANTE**: Chiedi SEMPRE approvazione prima di `git push`

---

## Script Automatico Completo

Per eseguire tutto in un colpo solo, usa lo script esistente:

```bash
bash sync-and-deploy.sh
```

Questo script esegue automaticamente:
1. Sync template master
2. Build
3. Deploy produzione
4. Commit e push (se ci sono modifiche template)

---

## Checklist Post-Deploy

Dopo ogni deploy, verifica:

- [ ] https://folder2text.com carica correttamente
- [ ] https://www.folder2text.com reindirizza a apex domain
- [ ] Google Analytics presente (DevTools Network → gtag.js?id=G-P29XH6Z3VX)
- [ ] https://folder2text.com/sitemap.xml accessibile (9 URLs)
- [ ] https://folder2text.com/robots.txt accessibile
- [ ] https://folder2text.com/privacy mostra Privacy Policy aggiornata
- [ ] https://folder2text.com/terms mostra Terms of Service aggiornati
- [ ] Nessun errore 404 o 500
- [ ] Nessun errore console JavaScript
- [ ] Favicon visualizzato correttamente
- [ ] Mobile responsive (test su smartphone)

---

## Troubleshooting

### Problema: "Changes not visible on folder2text.com"

**Causa**: Cache CDN Cloudflare

**Soluzione**:
1. Attendi 2-3 minuti per propagazione cache
2. Hard refresh browser: `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac)
3. Verifica in incognito/private window
4. Verifica preview deployment è aggiornato (cache minima)
5. Se preview OK ma produzione NO → hai deployato su preview invece di production branch

**Fix**:
```bash
npx wrangler pages deploy dist/ --project-name=folder2text --branch=folder2text
```

### Problema: "Build failed" o "wrangler.toml error"

**Causa**: File wrangler.toml conflittuale presente

**Soluzione**:
```bash
# Disabilita wrangler.toml (non serve per Cloudflare Pages)
mv wrangler.toml wrangler.toml.disabled

# Ripeti build
npm run build
```

### Problema: "Template sync not working"

**Causa**: Template master non trovato o path errato

**Soluzione**:
```bash
# Verifica esistenza template master
ls -la ../FolderTextMerger/lovable-templates/

# Se non esiste, crea da versione corrente
mkdir -p ../FolderTextMerger/lovable-templates/
cp src/pages/PrivacyPolicy.tsx ../FolderTextMerger/lovable-templates/
cp src/pages/TermsOfService.tsx ../FolderTextMerger/lovable-templates/
```

### Problema: "npm run build fails"

**Causa**: Dipendenze mancanti o node_modules corrotto

**Soluzione**:
```bash
# Reinstalla dipendenze
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problema: "Git push rejected (non-fast-forward)"

**Causa**: Branch locale indietro rispetto a origin

**Soluzione**:
```bash
# Pull con rebase
git pull --rebase origin main

# Verifica conflitti e risolvili se necessari
# Poi push
git push origin main
```

---

## URLs di Riferimento

**Production**:
- Main: https://folder2text.com
- WWW: https://www.folder2text.com
- Sitemap: https://folder2text.com/sitemap.xml
- Privacy: https://folder2text.com/privacy
- Terms: https://folder2text.com/terms

**Preview/Testing**:
- Alias: https://main.folder2text.pages.dev
- Hash URLs: https://[hash].folder2text.pages.dev (ogni deploy)

**Dashboard**:
- Cloudflare Pages: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text
- GitHub Repo: https://github.com/UmbertoDiP/folder2text

**Master Templates**:
- Location: `C:\Users\umber\Documents\MyProjects\FolderTextMerger\lovable-templates\`
- PrivacyPolicy.tsx
- TermsOfService.tsx

---

## Architettura Wrapper Recap

```
Folder2TextLovable/          ← Wrapper (deployment config + SEO)
├── index.html               ← WRAPPED (Google Analytics, meta tags)
├── public/                  ← WRAPPED (favicon, robots, sitemap, manifest)
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── src/                     ← LOVABLE CODE (mostly read-only)
│   ├── pages/
│   │   ├── PrivacyPolicy.tsx    ← Exception: managed by master template
│   │   └── TermsOfService.tsx   ← Exception: managed by master template
│   ├── components/
│   └── App.tsx
├── vite.config.ts
├── package.json
├── dist/                    ← Build output (deploy this)
├── deploy.sh                ← Quick deploy script
├── sync-and-deploy.sh       ← Full automation script
└── WORKFLOW-AUTO-DEPLOY.md  ← This file
```

**Regola Fondamentale**:
- NON modificare MAI `src/` direttamente (eccetto PrivacyPolicy.tsx e TermsOfService.tsx via master templates)
- SEMPRE modificare wrapper layer: `index.html`, `public/`, `vite.config.ts`
- Master templates vivono in `FolderTextMerger/lovable-templates/` (source of truth)

---

## Invocazione Rapida (per Claude)

Quando vuoi deployare in produzione, scrivi:

```
Esegui WORKFLOW-AUTO-DEPLOY.md completo
```

Questo triggera automaticamente:
1. Pull repo
2. Verifica wrapper
3. Sync template
4. Build
5. Deploy preview
6. Deploy produzione (dopo conferma utente)
7. Commit e push

---

**Ultima revisione**: 2026-01-31
**Maintainer**: Umberto Di Puorto
**Progetto**: Folder2Text Lovable Wrapper
