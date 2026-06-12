# Definitions & Conventions

## Projects
- Folder2TextLovable: wrapper UI / landing / modale pricing + traduzioni master (Lovable is source of truth)
- FolderTextMerger: applicazione Windows 11 (Python) che integra modale e usa i18n locale

## i18n Source of Truth
- Lovable è il master.
- L'app consuma risorse esportate (JSON) da Lovable.
- L'app può avere fallback locali, ma le chiavi ufficiali devono esistere in Lovable.

## Deterministic output
Per "deterministic output" intendiamo:
- Stesso input logico => output bit-identico
- Ordinamento file deterministico
- Nessun timestamp o metadato variabile nel contenuto del file
- Normalizzazione path coerente (Windows)

## Hash policy
- Hash richiesto: SHA-256
- L'hash è calcolato sul file output finale, byte-per-byte.
- Se l'output varia, si considera bug fino a prova contraria (a meno di requisiti espliciti).
