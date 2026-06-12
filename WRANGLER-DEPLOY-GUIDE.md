# Wrangler Deploy Guide - Folder2Text

## Quick Reference

### Deploy Production
```bash
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"
npx wrangler pages deploy dist --project-name=folder2text --branch=main
```

### Deploy Preview
```bash
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"
npx wrangler pages deploy dist --project-name=folder2text --branch=preview
```

## Complete Workflow

### 1. Build First
```bash
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"
npm run build
```

Riferimento completo build in:
```
C:\Users\umber\Documents\MyProjects\Folder2TextLovable\build.md
```

### 2. Deploy
```bash
npx wrangler pages deploy dist --project-name=folder2text --branch=main
```

### 3. Purge Cache (IMPORTANTE)
Dopo ogni deploy, purga la cache Cloudflare per vedere le modifiche:

**Via Dashboard**:
1. https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text
2. Vai a → Deployments
3. Seleziona deployment → "Purge cache"

**Via Browser**:
- Ctrl+Shift+R (Windows/Linux)
- Cmd+Shift+R (Mac)
- Hard refresh per bypassare cache locale

## Cloudflare Account Info

**Account ID**: `3b6245b263d581a0eddebc30df4797d6`
**Project Name**: `folder2text`
**Domain**: `folder2text.com`

## Deployment URLs

Ogni deploy genera un URL preview:
- Pattern: `https://<hash>.folder2text.pages.dev`
- Production: `https://folder2text.com` (branch: main)

## Common Issues

### 1. "Working directory has uncommitted changes"
```bash
# Aggiungi --commit-dirty=true se vuoi deployare con modifiche non committate
npx wrangler pages deploy dist --project-name=folder2text --branch=main --commit-dirty=true
```

### 2. Cache non aggiornata
**Soluzione**:
1. Purge cache Cloudflare (dashboard)
2. Hard refresh browser (Ctrl+Shift+R)
3. Verifica URL preview invece di production
4. Disabilita Service Worker se presente

### 3. Modifiche non visibili
**Checklist**:
- [ ] Build completata con successo?
- [ ] Deploy completato?
- [ ] Cache Cloudflare purgata?
- [ ] Hard refresh browser fatto?
- [ ] Verificato su URL preview invece di production?
- [ ] Service Worker disabilitato? (DevTools → Application → Service Workers → Unregister)

## Wrangler Commands

### Login
```bash
npx wrangler login
```

### List Deployments
```bash
npx wrangler pages deployment list --project-name=folder2text
```

### View Logs
```bash
npx wrangler pages deployment tail --project-name=folder2text
```

### Rollback (se necessario)
```bash
# Vai su dashboard e seleziona deployment precedente
# Cloudflare Pages non ha rollback via CLI
```

## Build + Deploy One-Liner

```bash
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable" && npm run build && npx wrangler pages deploy dist --project-name=folder2text --branch=main
```

## Verification Checklist

Dopo ogni deploy:
- [ ] Deploy completato (check URL preview nel terminal)
- [ ] Purge cache Cloudflare
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Verifica homepage: https://folder2text.com
- [ ] Verifica Privacy: https://folder2text.com/privacy
- [ ] Verifica Terms: https://folder2text.com/terms
- [ ] Test responsive (mobile view)
- [ ] Verifica console browser per errori JS

## Dashboard Links

- **Cloudflare Dashboard**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6
- **Pages Project**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text
- **Deployments**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text/deployments
- **Settings**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text/settings

## Environment Variables

Nessuna variabile ambiente richiesta per questo progetto.

## Custom Domain

**Domain**: `folder2text.com`
**DNS**: Gestito da Cloudflare
**SSL**: Auto (Cloudflare Universal SSL)

## Notes

- Ogni deploy su branch `main` va automaticamente in produzione su `folder2text.com`
- Branch diversi da `main` generano solo preview URLs
- Cache Cloudflare è aggressiva - sempre purgarla dopo deploy
- Preview URLs sono permanenti (non scadono)
