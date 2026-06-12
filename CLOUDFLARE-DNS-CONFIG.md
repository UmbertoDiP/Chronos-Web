# Cloudflare DNS Configuration - folder2text.com

## Zone ID
```
e0cedffc009f228280e138af47bb3a30
```

## Account ID
```
3b6245b263d581a0eddebc30df4797d6
```

## Cloudflare Nameservers (da configurare su Dynadot)
```
carter.ns.cloudflare.com
robin.ns.cloudflare.com
```

## DNS Records Configurati

### Root Domain (Website)
```
Type: CNAME
Name: @
Content: folder2text.pages.dev
Proxied: Yes
TTL: Auto
```

### WWW Subdomain
```
Type: CNAME
Name: www
Content: folder2text.pages.dev
Proxied: Yes
TTL: Auto
```

### Email (Dynadot MX Records)
```
Type: MX
Name: @
Content: mx1.dynadot-email.com
Priority: 10
TTL: Auto
```

```
Type: MX
Name: @
Content: mx2.dynadot-email.com
Priority: 20
TTL: Auto
```

### SPF Record (Email Authentication)
```
Type: TXT
Name: @
Content: v=spf1 include:spf.dynadot.com ~all
TTL: Auto
```

### Google Site Verification
```
Type: TXT
Name: @
Content: google-site-verification=m3PENSYyCMqSSwV5qfSAN1sfn_evVAUTalyFXwOZAwM
TTL: Auto
```

## Azioni Richieste

### 1. Su Dynadot
- Vai nelle impostazioni DNS del dominio folder2text.com
- Cambia i nameserver da "Dynadot DNS" a "Custom Nameservers"
- Inserisci:
  - carter.ns.cloudflare.com
  - robin.ns.cloudflare.com
- Salva le modifiche

### 2. Attesa Propagazione
- La propagazione DNS richiede 5-48 ore
- Puoi verificare lo stato su: https://dnschecker.org

### 3. Verifica Funzionamento
- Website: https://folder2text.com (dovrebbe caricare da folder2text.pages.dev)
- Email: Invia un'email di test per verificare che l'email funzioni ancora

## Status Attuale
- ✅ DNS records configurati su Cloudflare
- ✅ Record NS conflittuali rimossi
- ✅ MX records per email Dynadot aggiunti
- ✅ SPF record aggiunto
- ✅ Google verification preservato
- ⏳ In attesa: Cambio nameserver su Dynadot

## Note
- Il CNAME per il root domain (@) è configurato con Cloudflare Proxy attivo
- Cloudflare gestisce automaticamente il CNAME flattening quando il proxy è attivo
- L'email continuerà a funzionare tramite i server Dynadot (mx1/mx2.dynadot-email.com)
