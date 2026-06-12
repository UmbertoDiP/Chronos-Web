# Next Tasks Summary - Folder2Text

## Task 1: Fix Bug Carattere ">"

**File di riferimento**:
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\TASK-BUG-CARATTERE-MAGGIORE.md
```

**Status**: 🔴 CRITICO - Bug visibile in produzione

**Priorità**: ALTA

**Prossimi step**:
1. Purge cache Cloudflare
2. Test disabilitazione FounderFloatingButton
3. Test disabilitazione BreadcrumbList
4. Git bisect se necessario

---

## Build & Deploy References

### Build Guide
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\build.md
```

### Wrangler Deploy Guide
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\WRANGLER-DEPLOY-GUIDE.md
```

### Bug Investigation Handoff
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\BUG-CARATTERE-MAGGIORE-HANDOFF.md
```

---

## Quick Start per Nuova Conversazione

### Per continuare debug bug ">":

1. Leggi contesto completo:
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\TASK-BUG-CARATTERE-MAGGIORE.md
```

2. Leggi dettagli investigazione precedente:
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\BUG-CARATTERE-MAGGIORE-HANDOFF.md
```

3. Riferimenti build/deploy:
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\build.md
```
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\WRANGLER-DEPLOY-GUIDE.md
```

---

## File Progetto Chiave

### Source Code
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
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\CookieConsent.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\StructuredData\BreadcrumbList.tsx
```

### Pages
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\pages\Index.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\pages\PrivacyPolicy.tsx
```

```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\pages\TermsOfService.tsx
```

### Build Output
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\dist\index.html
```

---

## URLs Importanti

- **Production**: https://folder2text.com
- **Latest Preview**: https://658f693c.folder2text.pages.dev
- **GitHub**: https://github.com/UmbertoDiP/folder2text
- **Cloudflare Dashboard**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text

---

## Workflow Standard

Per ogni modifica:
1. Modifica codice
2. Build: `npm run build` (vedi build.md)
3. Deploy: `npx wrangler pages deploy ...` (vedi WRANGLER-DEPLOY-GUIDE.md)
4. **Purge cache Cloudflare** (CRITICO)
5. Hard refresh browser (Ctrl+Shift+R)
6. Verifica su production
7. Documenta risultato

---

## Note per Claude

- Questo progetto è un wrapper Lovable per Folder2Text
- Deploy su Cloudflare Pages via wrangler CLI
- **SEMPRE** purgare cache dopo deploy
- Build automation documentata in build.md
- Deploy automation documentata in WRANGLER-DEPLOY-GUIDE.md
