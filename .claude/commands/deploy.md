# /deploy - Workflow Automatico Deploy Lovable → Produzione

**Usage**: `/deploy [--skip-preview] [--skip-commit]`

**Purpose**: Esegue workflow completo per deployare progetto Lovable wrapper su Cloudflare Pages in produzione.

## Opzioni

- `--skip-preview`: Salta deploy preview e vai diretto a produzione
- `--skip-commit`: Salta commit e push su GitHub (solo deploy)

## Workflow Automatico

Quando l'utente invoca `/deploy`, esegui AUTONOMAMENTE tutte le seguenti fasi IN SEQUENZA:

### FASE 1: Aggiornamento Repository

```bash
cd /c/Users/umber/Documents/MyProjects/Folder2TextLovable
git fetch origin
git pull origin main
git log --oneline -3
git status
```

**Verifica**:
- Output contiene `Fast-forward` o `Already up to date`
- `git status` mostra clean working tree

**Se errori**: STOP e notifica utente.

---

### FASE 2: Verifica Wrapper Integrità

**IMPORTANTE**: Verifica che file wrapper NON siano stati sovrascritti da Lovable export.

#### 2.1 Google Analytics (index.html)

```bash
grep -E "G-P29XH6Z3VX|gtag" index.html
```

**Atteso**: Script gtag.js con ID G-P29XH6Z3VX presente.

**Se manca**:
1. STOP workflow
2. Notifica: "Google Analytics mancante in index.html"
3. Chiedi se ripristinare da backup/commit precedente

#### 2.2 Sitemap (public/sitemap.xml)

```bash
head -20 public/sitemap.xml | grep -E "<url>|<loc>"
```

**Atteso**: URLs con `https://folder2text.com`

**Se manca**:
1. STOP workflow
2. Notifica: "Sitemap mancante o corrotta"
3. Suggerisci ripristino

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

**Se manca**: STOP e suggerisci ripristino.

#### 2.4 Favicon e Manifest (public/)

```bash
ls -lh public/ | grep -E "favicon|manifest"
```

**Atteso**: Presenza di `favicon.ico`, `favicon.svg`, `manifest.json`

**Se manca**: STOP e suggerisci ripristino.

**Se TUTTO OK**: Procedi con FASE 3.

---

### FASE 3: Sync Template Master

Sincronizza Privacy Policy e Terms of Service da master templates:

```bash
# Verifica esistenza template master
ls -la ../FolderTextMerger/lovable-templates/

# Copia template master → Lovable
cp ../FolderTextMerger/lovable-templates/PrivacyPolicy.tsx src/pages/PrivacyPolicy.tsx
cp ../FolderTextMerger/lovable-templates/TermsOfService.tsx src/pages/TermsOfService.tsx

# Verifica modifiche
git diff src/pages/PrivacyPolicy.tsx src/pages/TermsOfService.tsx
```

**Notifica utente**:
- Se diff vuoto: "Template già aggiornati"
- Se diff presente: Mostra summary diff (numero linee changed)

**Se template master NON esiste**:
- Notifica: "Master templates non trovati"
- Chiedi se creare da versione corrente
- Procedi comunque con build

---

### FASE 4: Build Progetto

```bash
npm run build
```

**Output atteso**:
- `✓ X modules transformed`
- `✓ Forced copy of sitemap.xml to dist/`
- `✓ built in X.XXs`
- Nessun errore critico (warnings su chunk size OK)

**Verifica build output**:
```bash
ls -lh dist/ | head -10
ls dist/assets/*.js | wc -l
```

**Verifica**:
- Directory `dist/` popolata
- File `index.html`, `sitemap.xml`, `robots.txt` presenti
- Assets JS e CSS in `dist/assets/`

**Se build fallisce**:
1. STOP workflow
2. Mostra errore npm
3. Suggerisci fix:
   - `rm -rf node_modules package-lock.json && npm install` (se dipendenze)
   - Verifica wrangler.toml non conflittuale

---

### FASE 4.5: Sync Assets → FolderTextMerger (App Desktop)

**IMPORTANTE**: Sincronizza assets compilati da Lovable verso l'app desktop Python (PyQt6).

#### 4.5.1 Backup Assets Vecchi

```bash
cd ../FolderTextMerger/lovable_modal
mkdir -p assets_backup_$(date +%Y%m%d)
cp -r assets/* assets_backup_$(date +%Y%m%d)/ 2>/dev/null || true
```

#### 4.5.2 Copia Nuovi Assets

```bash
# Svuota cartella assets e copia nuovi da Lovable build
rm -rf assets/*
cp -r ../Folder2TextLovable/dist/assets/* assets/
```

#### 4.5.3 Aggiorna modal-only.html

Estrai i nomi dei nuovi assets dal dist/index.html di Lovable:

```bash
cd ../Folder2TextLovable
NEW_CSS=$(grep -oP 'href="/assets/\K[^"]+\.css' dist/index.html)
NEW_JS=$(grep -oP 'src="/assets/\K[^"]+\.js' dist/index.html)
```

Aggiorna modal-only.html con i nuovi riferimenti:

```bash
cd ../FolderTextMerger/lovable_modal
# Usa Edit tool per aggiornare i riferimenti <link> e <script>
```

**Pattern da cercare**:
```html
<link rel="stylesheet" href="./assets/[OLD_HASH].css">
<script type="module" src="./assets/[OLD_HASH].js"></script>
```

**Sostituire con**:
```html
<link rel="stylesheet" href="./assets/[NEW_HASH].css">
<script type="module" src="./assets/[NEW_HASH].js"></script>
```

#### 4.5.4 Verifica Integrità

```bash
# Verifica che i file esistano
test -f assets/$NEW_CSS && test -f assets/$NEW_JS && echo "Assets verified OK" || echo "Assets MISSING"

# Verifica modal-only.html referenzia file corretti
grep -E "assets/(index|modal)" modal-only.html
```

#### 4.5.5 Commit FolderTextMerger (se modifiche)

```bash
cd ../FolderTextMerger
git status --short lovable_modal/

# Se ci sono modifiche
if [ -n "$(git status --porcelain lovable_modal/)" ]; then
  git add lovable_modal/modal-only.html lovable_modal/assets/
  git commit -m "Sync updated Lovable assets from Folder2TextLovable build

- Updated modal-only.html with new asset hashes
- Removed old assets
- Added new compiled assets from Lovable build ($(date +%Y-%m-%d))
- Includes PrivacyPolicy, TermsOfService, AdminWaitlist modules"
fi
```

**Notifica utente**:
- "Assets sincronizzati: [numero file] copiati"
- "modal-only.html aggiornato con hash: [CSS_HASH], [JS_HASH]"
- "FolderTextMerger commit creato" (se ci sono modifiche)

**Se errori**:
1. STOP workflow
2. Mostra errore specifico
3. Suggerisci ripristino da backup: `cp -r assets_backup_[DATE]/* assets/`

**Se TUTTO OK**: Procedi con FASE 5.

---

### FASE 5: Deploy Preview (Testing)

**IMPORTANTE**: Questa fase è OBBLIGATORIA a meno che `--skip-preview` specificato.

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

**Estrai URL preview** e forniscilo all'utente.

**Notifica utente**:
```
✅ Deploy preview completato

Preview URL: https://[hash].folder2text.pages.dev

Verifica manualmente:
1. Apri URL preview nel browser
2. Verifica Google Analytics caricato (DevTools Network → gtag.js)
3. Verifica sitemap: /sitemap.xml
4. Verifica Privacy Policy: /privacy
5. Verifica Terms of Service: /terms

Procedo con deploy produzione? (y/n)
```

**Attendi risposta utente**.

**Se utente risponde NO**:
- STOP workflow
- Notifica: "Deploy produzione annullato. Preview disponibile per test."

**Se utente risponde YES**:
- Procedi con FASE 6

**Se `--skip-preview` specificato**:
- Salta FASE 5 completamente
- Notifica: "Preview skippato, deploy diretto in produzione"
- Procedi con FASE 6

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

**Notifica utente**:
```
✅ Deploy produzione completato

Production URL: https://folder2text.com
(Cache CDN: attendi 1-2 minuti per propagazione)

Verifica produzione:
1. https://folder2text.com (hard refresh: Ctrl+F5)
2. https://www.folder2text.com (redirect OK?)
3. Google Analytics presente
4. Sitemap e robots.txt accessibili

Deployment hash: [hash].folder2text.pages.dev
```

**Se deploy fallisce**:
1. STOP workflow
2. Mostra errore wrangler
3. Suggerisci troubleshooting:
   - Verifica API token Cloudflare
   - Verifica progetto folder2text esiste su Cloudflare Pages
   - Verifica permessi wrangler

---

### FASE 7: Commit e Push GitHub

**IMPORTANTE**: Questa fase è FACOLTATIVA (solo se ci sono modifiche template).

**Se `--skip-commit` specificato**:
- Salta FASE 7 completamente
- Notifica: "Commit e push skippati"
- Termina workflow

**Verifica modifiche**:
```bash
git status --short
```

**Se NO modifiche**:
- Notifica: "Nessuna modifica da committare"
- Termina workflow con SUCCESS

**Se CI SONO modifiche**:

```bash
# Stage modifiche template
git add src/pages/PrivacyPolicy.tsx src/pages/TermsOfService.tsx

# Verifica cosa verrà committato
git diff --cached
```

**Notifica utente**:
```
⚠️  Modifiche template rilevate

File modificati:
- src/pages/PrivacyPolicy.tsx
- src/pages/TermsOfService.tsx

Posso committare e pushare su GitHub? (y/n)
```

**Attendi risposta utente**.

**Se utente risponde YES**:

```bash
# Commit
git commit -m "Sync updated templates from master (Privacy Policy & Terms of Service)"

# Push
git push origin main
```

**Notifica**:
```
✅ Commit e push completati

Commit: Sync updated templates from master
Branch: main
Remote: origin
```

**Se utente risponde NO**:
- Notifica: "Commit annullato. Modifiche in staging (git reset HEAD per annullare staging)"
- Termina workflow

**Se push fallisce** (non-fast-forward):
1. Notifica errore
2. Suggerisci: `git pull --rebase origin main`
3. Chiedi se riprovare push

---

## Checklist Post-Deploy (AUTOMATICA)

Dopo deploy produzione, esegui automaticamente queste verifiche (NO stop su errori):

```bash
# Verifica homepage accessibile
curl -Is https://folder2text.com | head -1

# Verifica sitemap accessibile
curl -Is https://folder2text.com/sitemap.xml | head -1

# Verifica robots.txt accessibile
curl -Is https://folder2text.com/robots.txt | head -1
```

**Mostra risultato**:
```
✅ Checklist Post-Deploy

- [ ] https://folder2text.com → HTTP 200 OK
- [ ] https://folder2text.com/sitemap.xml → HTTP 200 OK
- [ ] https://folder2text.com/robots.txt → HTTP 200 OK

IMPORTANTE: Verifica manualmente nel browser (cache CDN può ritardare):
- [ ] https://folder2text.com carica correttamente
- [ ] https://www.folder2text.com reindirizza a apex domain
- [ ] Google Analytics presente (DevTools Network)
- [ ] Privacy Policy e Terms of Service aggiornati
- [ ] Favicon visualizzato
- [ ] Nessun errore console JavaScript
```

---

## Output Finale

Al termine del workflow (SUCCESS), mostra:

```
========================================
✅ WORKFLOW DEPLOY COMPLETATO
========================================

Fasi eseguite:
✅ FASE 1: Repository aggiornato
✅ FASE 2: Wrapper integrità verificata
✅ FASE 3: Template sincronizzati
✅ FASE 4: Build completata
✅ FASE 5: Preview deploy (se richiesto)
✅ FASE 6: Produzione deploy
✅ FASE 7: Commit e push (se modifiche)

Production URL: https://folder2text.com
Preview URL: https://main.folder2text.pages.dev

Dashboard Cloudflare:
https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text

GitHub Repo:
https://github.com/UmbertoDiP/folder2text

Prossimi step suggeriti:
1. Apri https://folder2text.com e verifica manualmente
2. Hard refresh (Ctrl+F5) per bypassare cache browser
3. Test su mobile (responsive design)
4. Verifica Google Analytics su Real-Time dashboard

========================================
```

---

## Gestione Errori

**Principio**: STOP immediato al primo errore critico, notifica utente con contesto e suggerimenti fix.

**Errori non critici** (warnings):
- Notifica ma procedi (es. chunk size warnings, cache warnings)

**Errori critici** (STOP workflow):
- Git pull conflicts
- Wrapper file mancanti
- Build failed
- Deploy failed
- Push rejected

Per ogni errore critico:
1. STOP workflow immediatamente
2. Notifica fase fallita
3. Mostra errore completo
4. Suggerisci fix specifico
5. Chiedi se riprovare o annullare

---

## Esempi Uso

### Deploy completo (default)
```
/deploy
```
→ Esegue tutte le 7 fasi con conferme per preview → produzione → push

### Deploy rapido (skip preview)
```
/deploy --skip-preview
```
→ Esegue fasi 1-4, salta 5, esegue 6-7

### Deploy solo codice (no commit)
```
/deploy --skip-commit
```
→ Esegue fasi 1-6, salta 7

### Deploy super rapido
```
/deploy --skip-preview --skip-commit
```
→ Esegue fasi 1-4, 6 (minimo assoluto)

---

## Note Implementazione

**IMPORTANTE per Claude**:
- Usa Bash tool per TUTTI i comandi shell
- NON usare echo/printf per comunicare - output diretto text
- Mostra output comandi SOLO se rilevante per l'utente
- Usa TodoWrite per tracciare progresso fasi
- Chiedi conferme SOLO dove specificato (preview → produzione, push)
- Applica TUTTE le regole Git da CLAUDE.md (chiedi approvazione prima di push)

**Autonomia**:
- Esegui fasi 1-4 AUTONOMAMENTE senza interruzioni
- STOP solo su errori critici o conferme richieste
- Fornisci feedback conciso dopo ogni fase

**Performance**:
- Parallellizza comandi indipendenti dove possibile (es. verifiche wrapper)
- Usa git show HEAD:file per confronti veloci se necessario

**Time savings**: Risparmio 15-25 minuti per deploy completo vs manuale

---

**Version**: 1.0 (2026-02-16)
**Maintainer**: Umberto Di Puorto
**Progetto**: Folder2Text Lovable Wrapper
**Documentazione completa**: WORKFLOW-AUTO-DEPLOY.md
