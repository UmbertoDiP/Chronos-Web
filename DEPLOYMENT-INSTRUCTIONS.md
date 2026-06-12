# Deployment Instructions - Lovable Portfolio

## ✅ Deploy Completato

**Sito Live**: https://umbertodipuorto-lovable.pages.dev

**Deploy URLs**:
- https://5bf06e1d.umbertodipuorto-lovable.pages.dev (ultimo deploy)
- https://umbertodipuorto-lovable.pages.dev (principale)

**Repository**: https://github.com/UmbertoDiP/umbertodipuorto-0f1f101c
**Tag**: v1.0.0

---

## 🌐 Configurazione Custom Domain umbertodipuorto.it

### Status Attuale
- ✅ Progetto Cloudflare Pages: `umbertodipuorto-lovable`
- ✅ Dominio presente in Cloudflare: `umbertodipuorto.it`
- ⚠️ Nameserver non configurati correttamente

### Step per Attivare il Dominio

#### Opzione A: Nameserver Cloudflare (Raccomandato)

1. Vai su: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/umbertodipuorto.it
2. Click **"Abilita"** o **"Enable"**
3. Cloudflare mostrerà i nameserver (es: `ns1.cloudflare.com`, `ns2.cloudflare.com`)
4. Vai al pannello del tuo **registrar** (dove hai comprato il dominio)
5. Sostituisci i nameserver attuali con quelli Cloudflare
6. Attendi propagazione (24-48h, ma spesso 2-4h)

#### Opzione B: CNAME Record (Veloce - 1-2h)

Se non puoi cambiare nameserver:

1. Vai al pannello DNS del tuo registrar
2. Aggiungi record CNAME:
   ```
   Type: CNAME
   Name: @
   Value: umbertodipuorto-lovable.pages.dev
   TTL: 300
   ```
3. Attendi propagazione DNS (1-2h)

### Verifica Configurazione

Dopo la configurazione, verifica con:

```bash
# Verifica nameserver
nslookup -type=NS umbertodipuorto.it

# Verifica puntamento
nslookup umbertodipuorto.it
```

---

## 📦 Deploy Manuale (se necessario)

```bash
cd C:\Users\umber\Documents\MyProjects\UmbertoDiPuortoLovable

# Build
npm install
npm run build

# Deploy
wrangler pages deploy dist --project-name=umbertodipuorto-lovable --branch=main
```

---

## 🔄 Deploy Automatico

Il deploy automatico tramite GitHub Actions è configurato ma richiede piano GitHub con billing attivo.

**Workflow**: `.github/workflows/deploy-cloudflare-pages.yml`

**Trigger**: Push su branch `main`

**Secrets richiesti** (già configurati):
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## 📂 Backup Asset Vecchio Progetto

Backup salvato in: `C:\Users\umber\Documents\MyProjects\UmbertoDiPuorto-backup-assets/`

Contiene:
- `curriculum.pdf`
- `curriculum/` (folder)
- `assets/` (folder)

---

## 🚀 Prossimi Deploy

### Deploy da Locale
```bash
npm run build
wrangler pages deploy dist --project-name=umbertodipuorto-lovable
```

### Creare Nuova Versione
```bash
git tag -a v1.x.x -m "Description"
git push origin v1.x.x
```

---

## 🔗 Link Utili

- **Dashboard Cloudflare**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6
- **Progetto Pages**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/umbertodipuorto-lovable
- **GitHub Actions**: https://github.com/UmbertoDiP/umbertodipuorto-0f1f101c/actions
- **Repository**: https://github.com/UmbertoDiP/umbertodipuorto-0f1f101c

---

## ✅ Checklist Post-Deploy

- [x] Build locale funzionante
- [x] Deploy su Cloudflare Pages
- [x] Tag v1.0.0 creato
- [x] GitHub Actions workflow configurato
- [x] Backup asset vecchio progetto
- [ ] Custom domain umbertodipuorto.it configurato (in corso)
- [ ] Verifica HTTPS funzionante
- [ ] Test mobile responsive
- [ ] Verifica SEO metadata

---

**Data Deploy**: 2026-01-17
**Versione**: v1.0.0
