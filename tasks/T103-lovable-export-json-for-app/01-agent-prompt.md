# Agent Prompt — T103 (CoVe)

Per il task che segue, adotta rigorosamente il protocollo "Chain of Verification" (CoVe).

TASK:
- Definisci un formato JSON standard per le stringhe i18n (nested keys o flat keys).
- Implementa un export ripetibile da Lovable verso cartella `export/i18n/`.
- Ogni lingua deve produrre un file JSON valido.
- Inserisci una validazione minima (lint JSON + check chiavi richieste).

Output obbligatori:
- 03-implementation-plan.md
- 04-test-plan.md
- 05-notes-log.md
- 99-done.md

Nota: se lo script non è implementabile senza accesso alle API di Lovable, documenta chiaramente il flusso manuale con passaggi precisi e verifiche.
