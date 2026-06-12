# Implementation Plan — T101

1) Identificare entrypoint della modale pricing (component/page).
2) Simulare wrapper constraints:
   - width ridotta (es. 380-520px)
   - height ridotta (es. 520-700px)
3) Fix layout:
   - usare `min-height`, `max-height`, `overflow: auto` sul container corretto
   - evitare `position: fixed` non necessario
   - verificare focus trap se modale vera
4) Verificare:
   - tab navigation
   - ESC close (se previsto)
   - click outside (se previsto)
5) Test lingue lunghe:
   - aumentare lunghezza stringhe di test
6) Salvare note e test plan aggiornato
