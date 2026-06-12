# Folder2Text Lovable - Progetto Pre-Configurato

Progetto duplicato da UmbertoDiPuortoLovable con configurazione base per folder2text.com

## Quick Start

```bash
cd C:\Users\umber\Documents\MyProjects\Folder2TextLovable
npm install
npm run dev
```

## Deployment Flow

### 1. Build Locale
```bash
npm run build
```

### 2. Deploy Temporaneo FTP (Netsons)
Prima configura credenziali FTP in `upload-ftp-folder2text.sh`:
```bash
FTP_HOST="ftp.folder2text.com"
FTP_USER="tuo_username"
FTP_PASS="tua_password"
```

Poi esegui upload:
```bash
bash upload-ftp-folder2text.sh
```

### 3. Deploy Finale Cloudflare Pages

#### A. Crea progetto su Cloudflare Pages
```bash
wrangler pages create folder2text-app
wrangler pages deploy dist --project-name=folder2text-app
```

#### B. Configura custom domain
1. Dashboard Cloudflare: https://dash.cloudflare.com
2. Pages → folder2text-app → Custom domains
3. Aggiungi: `folder2text.com` e `www.folder2text.com`

#### C. Aggiorna nameserver del dominio
Su registrar dominio (es. Dynadot, Netsons):
```
carter.ns.cloudflare.com
robin.ns.cloudflare.com
```

## Files da Personalizzare

### 1. `index.html`
- Title e meta tags
- JSON-LD structured data
- Favicon references

### 2. `public/manifest.json`
- name, short_name, description
- start_url, scope

### 3. `public/robots.txt`
- Sitemap URL

### 4. `public/sitemap.xml`
- URL del sito

### 5. `.github/workflows/deploy-ftp.yml` (opzionale)
- Configurazione GitHub Actions per auto-deploy

## Comandi Utili

```bash
# Dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Upload FTP
bash upload-ftp-folder2text.sh
```

## Struttura Progetto Wrappato

```
Folder2TextLovable/
├── src/               # Codice Lovable (NON modificare direttamente)
├── public/            # Assets statici
│   ├── favicon.svg
│   ├── manifest.json
│   ├── sitemap.xml
│   └── robots.txt
├── dist/              # Build output (git-ignored)
├── index.html         # Entry point HTML
├── package.json       # Dependencies
├── vite.config.ts     # Build config
└── upload-ftp-folder2text.sh  # FTP deploy script
```

## Note Importanti

1. **NON committare file Lovable originali** se sovrascrivi con nuovo export
2. **Mantieni immagini grandi FUORI dal progetto** (usa FTP script per upload separato)
3. **Verifica build prima del deploy**: `npm run build && npm run preview`
4. **Git ignore**: `dist/`, `node_modules/`, `.env*` già configurati
5. **Favicon**: Genera da favicon.svg usando `generate-favicons.html`

## Deployment Checklist

- [ ] Build locale funzionante (`npm run build`)
- [ ] Meta tags aggiornati in `index.html`
- [ ] Favicon personalizzato in `public/`
- [ ] `sitemap.xml` con URL corretti
- [ ] `robots.txt` configurato
- [ ] Credenziali FTP configurate (se deploy temporaneo)
- [ ] Cloudflare Pages project creato
- [ ] Custom domain aggiunto
- [ ] Nameserver DNS aggiornati
- [ ] Verifica HTTPS funzionante

## Prossimi Step

1. Scarica export Lovable per folder2text.com
2. Sovrascrivi cartella `src/` con nuovo codice
3. Personalizza meta tags, favicon, sitemap
4. Build e test locale
5. Deploy su FTP (temporaneo) o Cloudflare Pages (finale)
