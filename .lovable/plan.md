

## Studio Keyword SEO Intensivo - Folder2Text

### Analisi dello Stato Attuale

**Dati GSC (ultimi 30 giorni)**:
- "folder to text": 2 click, 6 impressioni, posizione ~7
- "folder2txt": 2 click, 2 impressioni, posizione ~7.5
- "folder to text converter": 1 click, 3 impressioni, posizione ~7
- "folderllm": 1 click, 21 impressioni, posizione ~10
- "folder llm": 0 click, 2 impressioni, posizione ~9

**Keywords attuali nel SEO config (EN)**: 14 keyword generiche, tutte concentrate su nomi di LLM e termini base.

**Problemi identificati**: mancano completamente le long-tail keyword ad alto intento, le keyword dei concorrenti, le keyword problem-based e le keyword di comparazione.

---

### Ricerca Concorrenziale

Concorrenti diretti scoperti:
- **Repomix** ("pack codebase into AI-friendly formats")
- **repo2txt** / **repo2text** ("convert GitHub repos to text for LLMs")
- **code2prompt** ("codebase to LLM context")
- **git2txt** ("GitHub to text for LLMs")
- **dir2txt** ("directory to txt/json")
- **gptify** ("code repo to prompt-friendly format")
- **MarkItDown** (Microsoft, file-to-text)

---

### Piano Keyword Completo

Le keyword sono organizzate in cluster per intento di ricerca. Tutte vanno aggiunte al campo `keywords` in `src/lib/seo/config.ts` (EN) e adattate nelle altre 35 lingue.

#### Cluster 1 - Core Product (Short-tail)
```text
folder to text
folder2text
folder structure to text
directory to text
folder tree to text
folder contents to text
folder to txt
dir to text
directory tree generator
```

#### Cluster 2 - LLM/AI Context (High Intent)
```text
codebase to llm
code to llm context
project folder to llm
feed codebase to chatgpt
give project context to ai
llm context file generator
ai context from codebase
codebase context tool
prepare code for llm
code context window
llm prompt preparation tool
single file context llm
```

#### Cluster 3 - Competitor/Alternative Keywords
```text
repomix alternative
repo2txt alternative
code2prompt alternative
git2txt alternative
repomix windows
folder2txt download
repomix vs folder2text
repo to text tool windows
```

#### Cluster 4 - Problem-Based Long-Tail (Alto traffico potenziale)
```text
how to convert folder structure to text
how to share codebase with chatgpt
how to give code context to claude
how to paste entire project into llm
how to export folder as text file
how to convert directory tree to text
how to prepare codebase for ai review
how to send entire project to chatgpt
how to share code with ai assistant
best way to give ai full codebase
```

#### Cluster 5 - Use Case Specifiche
```text
code documentation generator
project structure export tool
codebase export for ai
folder structure documentation
directory listing tool
code review preparation tool
ai code review tool
codebase audit tool
project onboarding documentation
developer documentation generator
```

#### Cluster 6 - Platform/Distribution
```text
folder to text windows app
folder to text microsoft store
folder structure converter download
directory converter windows 10
directory converter windows 11
free folder to text converter
offline folder converter
local folder to text tool
```

#### Cluster 7 - Format/Output
```text
folder to markdown
folder to text tree view
directory tree to markdown
folder structure to clipboard
export folder structure as markdown
codebase to single file
merge codebase into one file
concatenate project files
combine code files into one
```

#### Cluster 8 - Niche/Vertical
```text
prepare code for notebooklm
notebooklm context from code
code audit with gemini
code review with claude
chatgpt code analysis context
ai pair programming context
vscode project to text
code to ai prompt
prompt engineering code context
rag codebase preparation
```

---

### Implementazione Tecnica

#### Step 1 - Aggiornare `src/lib/seo/config.ts`
Espandere il campo `keywords` per EN da 14 a ~60 keyword, raggruppando tutti i cluster sopra. Poi adattare per IT, DE, FR, ES, PT e le altre 30 lingue con le traduzioni appropriate delle keyword ad alta rilevanza.

#### Step 2 - Aggiornare i `<title>` e `<meta description>`
Ottimizzare il title tag EN per includere le keyword con maggiore volume:
```text
Prima:  "Folder2Text – Convert Folder Structures to Text for ChatGPT, Claude, Gemini & LLMs"
Dopo:   "Folder2Text – Convert Codebase & Folder Structure to Text for ChatGPT, Claude & LLMs | Free Tool"
```

Description aggiornata per catturare long-tail:
```text
"Free tool to convert folder structures and codebases into a single text file for LLMs. Feed your entire project to ChatGPT, Claude, Gemini, DeepSeek & more. Smart filters, Markdown export, 100% offline & private. Best Repomix alternative for Windows."
```

#### Step 3 - Adattare per tutte le 36 lingue
Tradurre title e description ottimizzati. Aggiungere le keyword localizzate pertinenti per ogni mercato (le keyword competitor come "repomix alternative" restano in inglese per tutte le lingue dato che sono termini tecnici universali).

#### Step 4 - Aggiornare il WebApplication schema
Aggiungere `alternativeName` e `keywords` nello schema JSON-LD in `src/components/StructuredData/WebApplication.tsx` per coprire i sinonimi.

### File da modificare

| File | Modifica |
|------|----------|
| `src/lib/seo/config.ts` | Espandere keywords per tutte le 36 lingue, ottimizzare title/description |
| `src/components/StructuredData/WebApplication.tsx` | Aggiungere alternativeName e keywords allo schema |

### Stima Impatto

- **Impressioni potenziali**: +300-500% (da ~36/mese a 150-200+) grazie alla copertura di keyword long-tail a bassa competizione
- **Click potenziali**: +200-400% grazie al targeting di query con intento transazionale ("download", "alternative", "best tool")
- **Posizionamento**: salita su 8+ cluster tematici invece di 2-3 attuali

