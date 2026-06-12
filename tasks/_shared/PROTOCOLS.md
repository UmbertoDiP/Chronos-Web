# Protocols for Agents

Questo repository usa protocolli standard per far lavorare agenti diversi in modo coerente, tracciabile e verificabile.

## Chain of Verification (CoVe) - Protocollo obbligatorio quando indicato
Quando un task richiede CoVe, l'agente DEVE produrre output seguendo questi 4 step:

1. Bozza Iniziale
   - Scrivi una proposta completa e diretta (design, codice, piano, ecc.)
2. Domande di Verifica
   - Identifica 3-5 assunzioni, edge case o punti ambigui e formula domande scettiche
3. Esecuzione Verifica
   - Rispondi alle domande in modo indipendente, cercando errori e alternative migliori
4. Risposta Finale Raffinata
   - Produci l'output finale integrando le correzioni emerse

Regole:
- Non saltare step.
- Non fare finta di verificare: le risposte devono essere critiche e concrete.
- Se manca informazione, l'agente deve dichiararlo esplicitamente e proporre il minimo set di dati necessari.

## Ralph Loop (Quality Loop) - Protocollo consigliato per refactor e bugfix
1. Observe: riproduci il problema e raccogli evidenze (log, screenshot, hash, steps).
2. Hypothesize: 2-3 ipotesi plausibili, ordinate per probabilità.
3. Test: micro-patch per validare ipotesi, senza introdurre cambiamenti ampi.
4. Fix: implementa correzione completa e pulita.
5. Verify: test di regressione e casi limite.
6. Document: aggiorna i file del task (notes, test plan, done).

## Output policy
- Niente output parziale. Se si produce codice, deve essere completo.
- I messaggi di log o output nel codice devono essere in inglese.
- Ogni task aggiorna i file della propria cartella: almeno `05-notes-log.md` e `99-done.md`.
