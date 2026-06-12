# Setup Custom Domain umbertodipuorto.it

## Status Attuale
- ✅ Sito LIVE su: https://umbertodipuorto-lovable.pages.dev
- ⏳ Custom domain: https://umbertodipuorto.it (da configurare)

---

## Step 1: Configura DNS Record (2 minuti)

### Pagina da Usare
https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/umbertodipuorto.it/dns

### Azioni
1. Trova il record esistente:
   ```
   A | umbertodipuorto.it | 46.252.157.113 | Proxied
   ```

2. Click **"Modifica"** (pulsante a destra)

3. Nella finestra di modifica, cambia:
   - **Type**: da `A` a `CNAME`
   - **Name**: `@` (o lascia `umbertodipuorto.it`)
   - **Content/Target**: `umbertodipuorto-lovable.pages.dev`
   - **Proxy status**: `Proxied` (interruttore arancione ON)
   - **TTL**: `Auto`

4. Click **"Save"** o **"Salva"**

### Nota Importante
Se non puoi cambiare il Type da A a CNAME, allora:
- **Elimina** il record A esistente
- **Aggiungi** un nuovo record:
  - Type: `CNAME`
  - Name: `@`
  - Content: `umbertodipuorto-lovable.pages.dev`
  - Proxied: `ON`

---

## Step 2: Aggiungi Custom Domain a Pages (1 minuto)

### Pagina da Usare
https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/umbertodipuorto-lovable/settings/domains

### Azioni
1. Click su **"Set up a custom domain"** (pulsante blu)

2. Nel campo di input, inserisci:
   ```
   umbertodipuorto.it
   ```

3. Click **"Continue"** o **"Continua"**

4. Cloudflare verificherà il DNS (può chiedere conferma se rileva il record)

5. Click **"Activate domain"** se richiesto

### Risultato Atteso
Vedrai il dominio nella lista con status:
- ⏳ "Pending" (in attesa - normale per 2-5 minuti)
- ✅ "Active" (attivo dopo verifica DNS)

---

## Step 3: Verifica (automatico dopo 2-5 minuti)

### Comandi di Verifica
```bash
# Verifica DNS punta a Cloudflare
nslookup umbertodipuorto.it

# Verifica HTTPS funzionante
curl -I https://umbertodipuorto.it
```

### Risultato Atteso
```
umbertodipuorto.it → IP Cloudflare (non più 46.252.157.113)
HTTPS certificate: Valid
Status: 200 OK
```

### Test nel Browser
Apri: https://umbertodipuorto.it

Dovresti vedere il sito Lovable (stesso di https://umbertodipuorto-lovable.pages.dev)

---

## Troubleshooting

### Problema: "Domain already added to your account"
**Soluzione**: Il dominio è già in Cloudflare, vai direttamente allo Step 2.

### Problema: DNS non si propaga
**Soluzione**: Attendi fino a 24h (di solito 2-5 minuti). Verifica con:
```bash
nslookup umbertodipuorto.it 8.8.8.8
```

### Problema: Certificate SSL invalido
**Soluzione**: Cloudflare genera certificato automaticamente. Attendi 5-10 minuti dopo attivazione dominio.

### Problema: "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"
**Soluzione**: Certificato SSL in propagazione. Attendi 10-15 minuti. È normale per nuovi domini.

---

## Timeline Atteso

| Step | Tempo | Status |
|------|-------|--------|
| DNS Record Update | 0-2 min | Immediato |
| Add Custom Domain | 0-1 min | Immediato |
| DNS Propagation | 2-5 min | In background |
| SSL Certificate | 5-10 min | Automatico |
| **TOTALE** | **~15 min** | |

---

## Verifica Finale

Una volta completati gli step, esegui:

```bash
cd C:\Users\umber\Documents\MyProjects\UmbertoDiPuortoLovable
powershell -ExecutionPolicy Bypass -File verify-domain.ps1
```

(Script di verifica automatico - da creare se necessario)

---

## URLs Finali

Dopo configurazione, il sito sarà disponibile su:
- ✅ https://umbertodipuorto.it (dominio custom - PRODUCTION)
- ✅ https://www.umbertodipuorto.it (se hai configurato anche www)
- ✅ https://umbertodipuorto-lovable.pages.dev (URL Cloudflare - backup)

---

**Data**: 2026-01-17
**Progetto**: umbertodipuorto-lovable
**Versione**: v1.0.0
