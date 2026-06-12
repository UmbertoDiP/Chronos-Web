# Implementation Plan — T103

1) Scegliere schema:
   - Flat: { "pricing.title": "...", "errors.permissionDenied": "..." }
   - Nested: { "pricing": { "title": "..." }, "errors": { "permissionDenied": "..." } }
2) Definire cartella output:
   - export/i18n/<locale>.json
3) Definire chiavi required:
   - pricing modal keys
   - app core keys (da importare poi)
4) Implementare export (script o manual):
   - generazione file per lingua
5) Implementare validazione:
   - JSON parse
   - required keys present
6) Documentare integrazione lato app (rimando ai task APP-I18N)
