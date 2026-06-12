# Task: Fix Bug Carattere ">" Visibile

## Problema

Un carattere `>` appare visibilmente in alto a sinistra della pagina su https://folder2text.com

**Status**: 🟡 FIX DEPLOYATO - In attesa di verifica

## Test Già Completati (TUTTI FALLITI)

### ❌ Test 1: Rimozione FolderCode Icon
- Rimosso da PrivacyPolicy.tsx e TermsOfService.tsx
- **Risultato**: Bug persiste

### ❌ Test 2: Disabilitazione SkipToContent
- Commentato `<SkipToContent />` in App.tsx
- **Risultato**: Bug persiste

### ❌ Test 3: Revert SkipToContent a v1.3.0
- Revertito da dynamic label a hardcoded string
- **Risultato**: Bug persiste

### ❌ Test 4: Rimozione Completa SkipToContent
- Rimosso completamente da App.tsx
- Build + deploy
- **Risultato**: Bug persiste (confermato da utente)

### ✅ Test 6: Root Cause trovata — Fix _middleware.js
- **Causa**: `functions/_middleware.js` linea 393-394 iniettava `<main role="main">` avvolgendo tutto il `<body>`
- `html.replace(/<body...>/, "<body>\n[h1][h2]\n<main role=\"main\">")`
- Questo creava `<main role="main">>` (doppio `>`) nel DOM live
- Conflitto anche con `<main id="main-content">` di App.tsx (React)
- **Fix**: Rimosse le linee del wrapper `<main>`, mantenuta solo l'injection di H1/H2
- **Risultato**: Deploy del fix in corso


## Ipotesi Cache Wrangler

L'utente ha suggerito che potrebbe essere un problema di cache di Cloudflare/Wrangler.

**Possibili soluzioni**:
- Purge cache Cloudflare manualmente
- Deploy con `--commit-dirty=true`
- Verificare cache del browser (Ctrl+Shift+R)
- Controllare Cloudflare Dashboard per cache settings

## Prossimi Test da Fare

1. **Purge cache Cloudflare**
   - Dashboard → Caching → Purge Everything
   - O via API con wrangler

2. **Test FounderFloatingButton**
   - Disabilitare in App.tsx
   - Build + deploy + purge cache

3. **Test BreadcrumbList**
   - Disabilitare in PrivacyPolicy.tsx e TermsOfService.tsx
   - Build + deploy + purge cache

4. **Git Bisect**
   - Range: v1.3.0 (funzionante) → HEAD
   - Trovare commit esatto che ha introdotto il bug

5. **Analisi dist/index.html**
   - Cercare caratteri spuri hardcoded
   - Verificare bundle JavaScript

## File da Analizzare

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\App.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\SkipToContent.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\FounderFloatingButton.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\StructuredData\BreadcrumbList.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\pages\PrivacyPolicy.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\pages\TermsOfService.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\dist\index.html
```

## Build & Deploy

### Build Project

Riferimento completo in:
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\build.md
```

Quick command:
```bash
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"
npm run build
```

### Deploy con Wrangler

**Production**:
```bash
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"
npx wrangler pages deploy dist --project-name=folder2text --branch=main
```

**Preview/Test**:
```bash
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"
npx wrangler pages deploy dist --project-name=folder2text --branch=test
```

### Purge Cloudflare Cache

**Via Dashboard**:
1. https://dash.cloudflare.com/
2. Account: 3b6245b263d581a0eddebc30df4797d6
3. Pages → folder2text
4. Caching → Purge Everything

**Via Wrangler**:
```bash
# Purge cache dopo deploy
npx wrangler pages deployment tail --project-name=folder2text
```

## URLs

- **Production**: https://folder2text.com
- **Latest Preview**: https://658f693c.folder2text.pages.dev
- **GitHub Repo**: https://github.com/UmbertoDiP/folder2text

## Git Info

- **Branch corrente**: main
- **Ultima versione funzionante**: v1.3.0 (2026-02-12)
- **Tag corrente**: v1.2.0 (2026-03-01)

## Note Importanti

- Il bug è apparso "questa settimana" secondo l'utente
- Il bug NON esisteva prima
- Il bug è visibile su TUTTE le pagine testate
- Il bug persiste anche dopo multipli rebuild + deploy

## Workflow Raccomandato

1. Leggi questo file per contesto completo
2. Leggi `build.md` per build automation
3. Testa un cambio alla volta
4. Build: `npm run build`
5. Deploy: `npx wrangler pages deploy dist --project-name=folder2text --branch=main`
6. **IMPORTANTE**: Purge cache Cloudflare dopo ogni deploy
7. Verifica su https://folder2text.com con Ctrl+Shift+R (hard refresh)
8. Documenta risultato in questo file
9. Se bug persiste, prova prossimo test

## Checklist Pre-Test

Ogni test DEVE includere:
- [ ] Modifica codice (commenta/rimuovi component)
- [ ] Build progetto (`npm run build`)
- [ ] Deploy con wrangler
- [ ] **Purge cache Cloudflare**
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Verifica su production URL
- [ ] Documenta risultato
