# Cloudflare DNS Verification per folder2text.com

## Record TXT da aggiungere su Dynadot

**Tipo**: TXT
**Host**: @ (oppure folder2text.com)
**Value**: `google-site-verification=m3PENSYyCMqSSwV5qfSAN1sfn_evVAUTalyFXwOZAwM`
**TTL**: 3600 (o default)

## Passi su Dynadot

1. Vai su Dynadot → Domain Settings → DNS Settings per folder2text.com
2. Seleziona "Dynadot DNS" (come hai già fatto)
3. Nella sezione **"Text (TXT) Records"** o **"Add Record"**:
   - Record Type: **TXT**
   - Host: **@** (root domain)
   - Text Value: **google-site-verification=m3PENSYyCMqSSwV5qfSAN1sfn_evVAUTalyFXwOZAwM**
4. Clicca **Save Settings**
5. Torna su Cloudflare e clicca **VERIFICA**

## Note

- La verifica può richiedere 5-15 minuti dopo aver salvato il record TXT
- Se la verifica fallisce subito, attendi qualche minuto e riprova
- Dopo la verifica, Cloudflare attiverà automaticamente SSL per folder2text.com

## Record CNAME da aggiungere (dopo verifica TXT)

Dopo che la verifica TXT è completata, aggiungi anche questi CNAME:

**Record 1 (root)**:
- Type: CNAME
- Host: @
- Target: folder2text.pages.dev

**Record 2 (www)**:
- Type: CNAME
- Host: www
- Target: folder2text.pages.dev
