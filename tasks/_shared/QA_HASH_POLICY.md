# QA Hash Policy (SHA-256)

## Goal
Garantire che l'estrazione sia ripetibile e che output equivalenti siano identici in contenuto e dimensione.

## Requirements
- L'estrazione produce un solo file unico nella directory corretta.
- Se due estrazioni selezionano lo stesso insieme logico di file, l'output deve avere:
  - stessa size
  - stesso SHA-256

## Canonical checks
- Compute SHA-256 of produced file
- Compare hashes across:
  - invocazione da cartella padre vs cartella figlia
  - invocazione da menu contestuale su folder vs su file (se supportato)
  - invocazione da Explorer in punti diversi

## What breaks determinism
- Timestamps in header/footer
- Non-deterministic filesystem enumeration order
- Absolute paths including username/machine-specific segments
- Platform-dependent line endings inconsistently applied

## Expected artifacts
Nel task specifico devono essere salvati:
- 3+ output file generati (campioni)
- tabella risultati: scenario -> output path -> size -> sha256
- steps di riproduzione
