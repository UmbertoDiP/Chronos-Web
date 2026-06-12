# Context — T101

Obiettivo: validare e stabilizzare la modale pricing (Lovable) che viene copiata/wrappata nell'app Windows 11.

Vincoli:
- La modale deve renderizzare correttamente dentro WebView/Wrapper Windows 11.
- Deve supportare i18n (chiavi e contenuti) senza layout rotti (overflow, clipping, scroll).

Dipendenze:
- Task T102 (i18n coverage) influenza i testi.
- Task T103 (export JSON) influenza il formato di consumption.

Output richiesto:
- Modale aggiornata e stabile.
- Test manuale con checklist UI.
- Documentazione per integrazione nell'app.
