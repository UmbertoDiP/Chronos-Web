// SEO configuration per language
// Phase 1: Lovable owns title, description, og tags, hreflang, canonical

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
}

const BASE_URL = 'https://chronos.dev';

// Shared technical keywords that remain in English across all languages
const universalKeywords = [
  // Competitor/Alternative
  "repomix alternative", "repo2txt alternative", "code2prompt alternative", "git2txt alternative",
  "repomix windows", "repomix vs chronos", "folder2txt download", "repo to text tool windows",
  // LLM brands (universal)
  "chatgpt", "claude", "gemini", "notebooklm", "llama", "mistral", "deepseek", "grok",
  // Platform
  "microsoft store", "windows 10", "windows 11",
  // Niche/Vertical
  "rag codebase preparation", "vscode project to text", "prompt engineering code context",
  // Microsoft Store official keywords (synced with Partner Center listing)
  "file merge", "text consolidation", "folder aggregation", "developer tools",
  "log analysis", "data processing", "file management",
  // Long-tail expansions of Store keywords (global reach across all markets)
  "merge files into one", "merge text files", "combine multiple files",
  "consolidate text files", "aggregate folder contents", "developer productivity tool",
  "log file analysis tool", "log aggregation tool", "bulk text processing",
  "batch file processing", "file management utility", "developer file tools",
];

export const seoConfigByLanguage: Record<string, SEOConfig> = {
  en: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      // Cluster 1 - Core Product
      "folder to text", "chronos", "folder structure to text", "directory to text",
      "folder tree to text", "folder contents to text", "folder to txt", "dir to text", "directory tree generator",
      // Cluster 2 - LLM/AI Context
      "codebase to llm", "code to llm context", "project folder to llm", "feed codebase to chatgpt",
      "give project context to ai", "llm context file generator", "ai context from codebase",
      "codebase context tool", "prepare code for llm", "code context window",
      "llm prompt preparation tool", "single file context llm",
      // Cluster 4 - Problem-Based Long-Tail
      "how to convert folder structure to text", "how to share codebase with chatgpt",
      "how to give code context to claude", "how to paste entire project into llm",
      "how to export folder as text file", "how to convert directory tree to text",
      "how to prepare codebase for ai review", "how to send entire project to chatgpt",
      "how to share code with ai assistant", "best way to give ai full codebase",
      // Cluster 5 - Use Cases
      "code documentation generator", "project structure export tool", "codebase export for ai",
      "folder structure documentation", "directory listing tool", "code review preparation tool",
      "ai code review tool", "codebase audit tool", "project onboarding documentation",
      // Cluster 6 - Platform
      "folder to text windows app", "folder to text microsoft store", "folder structure converter download",
      "free folder to text converter", "offline folder converter", "local folder to text tool",
      // Cluster 7 - Format/Output
      "folder to markdown", "directory tree to markdown", "folder structure to clipboard",
      "export folder structure as markdown", "codebase to single file", "merge codebase into one file",
      "concatenate project files", "combine code files into one",
      // Cluster 8 - Niche
      "prepare code for notebooklm", "code audit with gemini", "code review with claude",
      "chatgpt code analysis context", "ai pair programming context", "code to ai prompt",
      ...universalKeywords
    ]
  },
  it: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "cartelle in testo", "chronos", "struttura cartelle in testo", "directory in testo",
      "albero cartelle", "contenuto cartelle in testo", "convertitore cartelle",
      "codebase per llm", "codice per contesto llm", "progetto per chatgpt",
      "contesto ai dal codice", "preparare codice per llm", "strumento contesto codebase",
      "come convertire struttura cartelle in testo", "come condividere codebase con chatgpt",
      "come dare contesto codice a claude", "come esportare cartella come file di testo",
      "come preparare codebase per revisione ai", "miglior modo per dare codebase a ai",
      "generatore documentazione codice", "esportazione struttura progetto",
      "esportazione codebase per ai", "documentazione struttura cartelle",
      "strumento revisione codice ai", "strumento audit codebase",
      "cartelle in testo app windows", "convertitore cartelle download gratuito",
      "convertitore cartelle offline", "strumento locale cartelle in testo",
      "cartelle in markdown", "struttura cartelle negli appunti",
      "codebase in singolo file", "unire file codice in uno",
      ...universalKeywords
    ]
  },
  de: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "ordner zu text", "chronos", "ordnerstruktur in text", "verzeichnis zu text",
      "verzeichnisbaum", "ordnerinhalt in text", "ordner konvertieren",
      "codebase für llm", "code für llm-kontext", "projekt für chatgpt",
      "ai-kontext aus codebase", "code für llm vorbereiten", "codebase-kontext-tool",
      "ordnerstruktur in text umwandeln", "codebase mit chatgpt teilen",
      "code-kontext an claude geben", "ganzes projekt in llm einfügen",
      "ordner als textdatei exportieren", "verzeichnisbaum in text umwandeln",
      "codebase für ai-review vorbereiten", "code-dokumentation generator",
      "projektstruktur-export", "codebase-export für ai",
      "ordnerstruktur-dokumentation", "code-review-tool ai",
      "ordner zu text windows app", "ordnerstruktur-konverter download",
      "kostenloser ordner-zu-text-konverter", "offline ordner-konverter",
      "ordner zu markdown", "verzeichnisbaum zu markdown",
      "codebase in eine datei", "code-dateien zusammenführen",
      ...universalKeywords
    ]
  },
  fr: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "dossier en texte", "chronos", "arborescence en texte", "répertoire en texte",
      "arbre de dossiers", "contenu dossier en texte", "convertir dossiers",
      "codebase pour llm", "code pour contexte llm", "projet pour chatgpt",
      "contexte ai depuis codebase", "préparer code pour llm", "outil contexte codebase",
      "comment convertir arborescence en texte", "comment partager codebase avec chatgpt",
      "comment donner contexte code à claude", "comment exporter dossier en fichier texte",
      "comment préparer codebase pour revue ai", "meilleure façon de donner codebase à ai",
      "générateur documentation code", "export structure projet",
      "export codebase pour ai", "documentation arborescence",
      "outil revue code ai", "outil audit codebase",
      "dossier en texte app windows", "convertisseur dossiers télécharger gratuitement",
      "convertisseur dossiers hors ligne", "outil local dossier en texte",
      "dossier en markdown", "arborescence en markdown",
      "codebase en un seul fichier", "fusionner fichiers code en un",
      ...universalKeywords
    ]
  },
  es: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "carpetas a texto", "chronos", "estructura carpetas a texto", "directorio a texto",
      "árbol de carpetas", "contenido carpetas a texto", "convertir carpetas",
      "codebase para llm", "código para contexto llm", "proyecto para chatgpt",
      "contexto ai desde codebase", "preparar código para llm", "herramienta contexto codebase",
      "cómo convertir estructura carpetas a texto", "cómo compartir codebase con chatgpt",
      "cómo dar contexto código a claude", "cómo exportar carpeta como archivo de texto",
      "cómo preparar codebase para revisión ai", "mejor forma de dar codebase a ai",
      "generador documentación código", "exportar estructura proyecto",
      "exportar codebase para ai", "documentación estructura carpetas",
      "herramienta revisión código ai", "herramienta auditoría codebase",
      "carpetas a texto app windows", "convertidor carpetas descarga gratuita",
      "convertidor carpetas offline", "herramienta local carpetas a texto",
      "carpetas a markdown", "estructura carpetas al portapapeles",
      "codebase en un solo archivo", "combinar archivos código en uno",
      ...universalKeywords
    ]
  },
  pt: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "pastas para texto", "chronos", "estrutura pastas para texto", "diretório para texto",
      "árvore de pastas", "conteúdo pastas para texto", "converter pastas",
      "codebase para llm", "código para contexto llm", "projeto para chatgpt",
      "contexto ai a partir de codebase", "preparar código para llm", "ferramenta contexto codebase",
      "como converter estrutura pastas em texto", "como compartilhar codebase com chatgpt",
      "como dar contexto código para claude", "como exportar pasta como arquivo de texto",
      "como preparar codebase para revisão ai", "melhor forma de dar codebase para ai",
      "gerador documentação código", "exportar estrutura projeto",
      "exportar codebase para ai", "documentação estrutura pastas",
      "ferramenta revisão código ai", "ferramenta auditoria codebase",
      "pastas para texto app windows", "conversor pastas download gratuito",
      "conversor pastas offline", "ferramenta local pastas para texto",
      "pastas para markdown", "estrutura pastas para clipboard",
      "codebase em um único arquivo", "combinar arquivos código em um",
      ...universalKeywords
    ]
  },
  nl: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "map naar tekst", "chronos", "mappenstructuur naar tekst", "directory naar tekst",
      "mappenboom", "mapinhoud naar tekst", "mappen converteren",
      "codebase voor llm", "code voor llm-context", "project voor chatgpt",
      "ai-context vanuit codebase", "code voorbereiden voor llm", "codebase-context-tool",
      "mapstructuur naar tekst converteren", "codebase delen met chatgpt",
      "code-context aan claude geven", "map exporteren als tekstbestand",
      "codebase voorbereiden voor ai-review", "code-documentatie generator",
      "projectstructuur exporteren", "codebase exporteren voor ai",
      "map naar tekst windows app", "gratis map-naar-tekst-converter",
      "offline mapconverter", "map naar markdown",
      "codebase in één bestand", "codebestanden samenvoegen",
      ...universalKeywords
    ]
  },
  pl: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "folder na tekst", "chronos", "struktura folderów na tekst", "katalog na tekst",
      "drzewo katalogów", "zawartość folderów na tekst", "konwerter folderów",
      "codebase dla llm", "kod dla kontekstu llm", "projekt dla chatgpt",
      "kontekst ai z codebase", "przygotować kod dla llm", "narzędzie kontekstu codebase",
      "jak konwertować strukturę folderów na tekst", "jak udostępnić codebase chatgpt",
      "jak dać kontekst kodu claude", "jak eksportować folder jako plik tekstowy",
      "generator dokumentacji kodu", "eksport struktury projektu",
      "eksport codebase dla ai", "narzędzie recenzji kodu ai",
      "folder na tekst aplikacja windows", "darmowy konwerter folderów",
      "offline konwerter folderów", "folder na markdown",
      "codebase w jeden plik", "połączyć pliki kodu w jeden",
      ...universalKeywords
    ]
  },
  sv: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "mapp till text", "chronos", "mappstruktur till text", "katalog till text",
      "katalogträd", "mappinnehåll till text", "konvertera mappar",
      "kodbas för llm", "kod för llm-kontext", "projekt för chatgpt",
      "ai-kontext från kodbas", "förbereda kod för llm", "kodbas-kontextverktyg",
      "hur konvertera mappstruktur till text", "hur dela kodbas med chatgpt",
      "koddokumentationsgenerator", "exportera projektstruktur",
      "mapp till text windows-app", "gratis mapp-till-text-konverterare",
      "offline mappkonverterare", "mapp till markdown",
      "kodbas till en fil", "slå ihop kodfiler till en",
      ...universalKeywords
    ]
  },
  no: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "mappe til tekst", "chronos", "mappestruktur til tekst", "katalog til tekst",
      "katalogtre", "mappeinnhold til tekst", "konverter mapper",
      "kodebase for llm", "kode for llm-kontekst", "prosjekt for chatgpt",
      "ai-kontekst fra kodebase", "forberede kode for llm",
      "hvordan konvertere mappestruktur til tekst", "hvordan dele kodebase med chatgpt",
      "kodedokumentasjonsgenerator", "eksporter prosjektstruktur",
      "mappe til tekst windows-app", "gratis mappe-til-tekst-konverter",
      "offline mappekonverter", "mappe til markdown",
      "kodebase til én fil", "slå sammen kodefiler til én",
      ...universalKeywords
    ]
  },
  da: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "mappe til tekst", "chronos", "mappestruktur til tekst", "katalog til tekst",
      "katalogtræ", "mappeindhold til tekst", "konverter mapper",
      "kodebase for llm", "kode for llm-kontekst", "projekt for chatgpt",
      "ai-kontekst fra kodebase", "forberede kode for llm",
      "kodedokumentationsgenerator", "eksporter projektstruktur",
      "mappe til tekst windows-app", "gratis mappe-til-tekst-konverter",
      "offline mappekonverter", "mappe til markdown",
      "kodebase til én fil", "sammenflet kodefiler til én",
      ...universalKeywords
    ]
  },
  fi: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "kansio tekstiksi", "chronos", "kansiorakenne tekstiksi", "hakemisto tekstiksi",
      "hakemistopuu", "kansion sisältö tekstiksi", "muunna kansiot",
      "koodikanta llm:lle", "koodi llm-kontekstiin", "projekti chatgpt:lle",
      "ai-konteksti koodikannasta", "valmistella koodi llm:lle",
      "kansiorakenne tekstiksi muunnos", "koodikanta jakaa chatgpt:lle",
      "koodidokumentaatiogeneraattori", "projektirakenteen vienti",
      "kansio tekstiksi windows-sovellus", "ilmainen kansio-tekstiksi-muunnin",
      "offline kansiomuunnin", "kansio markdowniksi",
      "koodikanta yhdeksi tiedostoksi", "yhdistä kooditiedostot yhdeksi",
      ...universalKeywords
    ]
  },
  cs: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "složka na text", "chronos", "struktura složek na text", "adresář na text",
      "strom adresářů", "obsah složky na text", "převést složky",
      "codebase pro llm", "kód pro llm kontext", "projekt pro chatgpt",
      "ai kontext z codebase", "připravit kód pro llm",
      "jak převést strukturu složek na text", "jak sdílet codebase s chatgpt",
      "generátor dokumentace kódu", "export struktury projektu",
      "složka na text windows aplikace", "bezplatný převodník složek",
      "offline převodník složek", "složka na markdown",
      "codebase do jednoho souboru", "sloučit soubory kódu do jednoho",
      ...universalKeywords
    ]
  },
  el: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "φάκελος σε κείμενο", "chronos", "δομή φακέλων σε κείμενο", "κατάλογος σε κείμενο",
      "δέντρο καταλόγων", "περιεχόμενα φακέλου σε κείμενο", "μετατροπέας φακέλων",
      "codebase για llm", "κώδικας για πλαίσιο llm", "έργο για chatgpt",
      "πλαίσιο ai από codebase", "προετοιμασία κώδικα για llm",
      "πώς να μετατρέψετε δομή φακέλων σε κείμενο", "πώς να μοιραστείτε codebase με chatgpt",
      "γεννήτρια τεκμηρίωσης κώδικα", "εξαγωγή δομής έργου",
      "φάκελος σε κείμενο εφαρμογή windows", "δωρεάν μετατροπέας φακέλων",
      "offline μετατροπέας φακέλων", "φάκελος σε markdown",
      "codebase σε ένα αρχείο", "συγχώνευση αρχείων κώδικα σε ένα",
      ...universalKeywords
    ]
  },
  ro: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "folder în text", "chronos", "structură foldere în text", "director în text",
      "arbore directoare", "conținut folder în text", "convertor foldere",
      "codebase pentru llm", "cod pentru context llm", "proiect pentru chatgpt",
      "context ai din codebase", "pregătire cod pentru llm",
      "cum să convertiți structura folderelor în text", "cum să partajați codebase cu chatgpt",
      "generator documentație cod", "export structură proiect",
      "folder în text aplicație windows", "convertor gratuit foldere",
      "convertor offline foldere", "folder în markdown",
      "codebase într-un singur fișier", "combinare fișiere cod într-unul singur",
      ...universalKeywords
    ]
  },
  hu: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "mappa szövegre", "chronos", "mappastruktúra szövegre", "könyvtár szövegre",
      "könyvtárfa", "mappa tartalom szövegre", "mappa konvertálás",
      "kódbázis llm-hez", "kód llm kontextushoz", "projekt chatgpt-hez",
      "ai kontextus kódbázisból", "kód előkészítése llm-hez",
      "hogyan konvertáljuk a mappastruktúrát szöveggé", "hogyan osszuk meg a kódbázist chatgpt-vel",
      "kóddokumentáció generátor", "projektstruktúra exportálás",
      "mappa szövegre windows alkalmazás", "ingyenes mappa-szöveg konverter",
      "offline mappa konverter", "mappa markdownba",
      "kódbázis egyetlen fájlba", "kódfájlok egyesítése egybe",
      ...universalKeywords
    ]
  },
  bg: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "папка в текст", "chronos", "структура на папки в текст", "директория в текст",
      "дърво на директории", "съдържание на папка в текст", "конвертор на папки",
      "кодова база за llm", "код за llm контекст", "проект за chatgpt",
      "ai контекст от кодова база", "подготовка на код за llm",
      "генератор на документация за код", "експорт на структура на проект",
      "папка в текст windows приложение", "безплатен конвертор на папки",
      "офлайн конвертор на папки", "папка в markdown",
      "кодова база в един файл", "обединяване на код файлове в един",
      ...universalKeywords
    ]
  },
  hr: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "mapa u tekst", "chronos", "struktura mapa u tekst", "direktorij u tekst",
      "stablo direktorija", "sadržaj mape u tekst", "pretvarač mapa",
      "codebase za llm", "kod za llm kontekst", "projekt za chatgpt",
      "ai kontekst iz codebase", "pripremiti kod za llm",
      "generator dokumentacije koda", "izvoz strukture projekta",
      "mapa u tekst windows aplikacija", "besplatni pretvarač mapa",
      "offline pretvarač mapa", "mapa u markdown",
      "codebase u jednu datoteku", "spojiti datoteke koda u jednu",
      ...universalKeywords
    ]
  },
  sk: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "priečinok na text", "chronos", "štruktúra priečinkov na text", "adresár na text",
      "strom adresárov", "obsah priečinka na text", "prevodník priečinkov",
      "codebase pre llm", "kód pre llm kontext", "projekt pre chatgpt",
      "ai kontext z codebase", "pripraviť kód pre llm",
      "generátor dokumentácie kódu", "export štruktúry projektu",
      "priečinok na text windows aplikácia", "bezplatný prevodník priečinkov",
      "offline prevodník priečinkov", "priečinok na markdown",
      "codebase do jedného súboru", "zlúčiť súbory kódu do jedného",
      ...universalKeywords
    ]
  },
  sr: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "фасцикла у текст", "chronos", "структура фасцикли у текст", "директоријум у текст",
      "стабло директоријума", "садржај фасцикле у текст", "конвертор фасцикли",
      "кодна база за llm", "код за llm контекст", "пројекат за chatgpt",
      "ai контекст из кодне базе", "припремити код за llm",
      "генератор документације кода", "извоз структуре пројекта",
      "фасцикла у текст windows апликација", "бесплатни конвертор фасцикли",
      "офлајн конвертор фасцикли", "фасцикла у markdown",
      "кодна база у један фајл", "спојити фајлове кода у један",
      ...universalKeywords
    ]
  },
  lt: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "aplankas į tekstą", "chronos", "aplankų struktūra į tekstą", "katalogas į tekstą",
      "katalogų medis", "aplanko turinys į tekstą", "aplankų konverteris",
      "kodų bazė llm", "kodas llm kontekstui", "projektas chatgpt",
      "ai kontekstas iš kodų bazės", "paruošti kodą llm",
      "kodo dokumentacijos generatorius", "projekto struktūros eksportas",
      "aplankas į tekstą windows programa", "nemokamas aplankų konverteris",
      "neprisijungus aplankų konverteris", "aplankas į markdown",
      "kodų bazė į vieną failą", "sujungti kodo failus į vieną",
      ...universalKeywords
    ]
  },
  lv: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "mape uz tekstu", "chronos", "mapju struktūra uz tekstu", "direktorijs uz tekstu",
      "direktoriju koks", "mapes saturs uz tekstu", "mapju konvertors",
      "kodu bāze llm", "kods llm kontekstam", "projekts chatgpt",
      "ai konteksts no kodu bāzes", "sagatavot kodu llm",
      "koda dokumentācijas ģenerators", "projekta struktūras eksports",
      "mape uz tekstu windows lietotne", "bezmaksas mapju konvertors",
      "bezsaistes mapju konvertors", "mape uz markdown",
      "kodu bāze vienā failā", "apvienot koda failus vienā",
      ...universalKeywords
    ]
  },
  et: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "kaust tekstiks", "chronos", "kaustastruktuur tekstiks", "kataloog tekstiks",
      "kataloogipuu", "kausta sisu tekstiks", "kaustade teisendaja",
      "koodibaas llm-ile", "kood llm kontekstiks", "projekt chatgpt-le",
      "ai kontekst koodibaasist", "koodi ettevalmistamine llm-ile",
      "koodi dokumentatsiooni generaator", "projekti struktuuri eksport",
      "kaust tekstiks windowsi rakendus", "tasuta kaustade teisendaja",
      "võrguühenduseta kaustade teisendaja", "kaust markdowniks",
      "koodibaas üheks failiks", "koodifailide ühendamine üheks",
      ...universalKeywords
    ]
  },
  sl: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "mapa v besedilo", "chronos", "struktura map v besedilo", "imenik v besedilo",
      "drevo imenikov", "vsebina mape v besedilo", "pretvornik map",
      "kodna baza za llm", "koda za llm kontekst", "projekt za chatgpt",
      "ai kontekst iz kodne baze", "pripraviti kodo za llm",
      "generator dokumentacije kode", "izvoz strukture projekta",
      "mapa v besedilo windows aplikacija", "brezplačni pretvornik map",
      "offline pretvornik map", "mapa v markdown",
      "kodna baza v eno datoteko", "združiti datoteke kode v eno",
      ...universalKeywords
    ]
  },
  uk: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "папка у текст", "chronos", "структура папок у текст", "каталог у текст",
      "дерево каталогів", "вміст папки у текст", "конвертер папок",
      "кодова база для llm", "код для llm контексту", "проєкт для chatgpt",
      "ai контекст із кодової бази", "підготувати код для llm",
      "генератор документації коду", "експорт структури проєкту",
      "папка у текст windows додаток", "безкоштовний конвертер папок",
      "офлайн конвертер папок", "папка у markdown",
      "кодова база в один файл", "об'єднати файли коду в один",
      ...universalKeywords
    ]
  },
  // Asian languages
  zh: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "文件夹转文本", "chronos", "文件夹结构转文本", "目录转文本",
      "目录树", "文件夹内容转文本", "文件夹转换器",
      "代码库转llm", "代码转llm上下文", "项目发给chatgpt",
      "从代码库获取ai上下文", "为llm准备代码",
      "如何将文件夹结构转换为文本", "如何与chatgpt分享代码库",
      "代码文档生成器", "项目结构导出",
      "文件夹转文本windows应用", "免费文件夹转换器",
      "离线文件夹转换器", "文件夹转markdown",
      "代码库合并为单个文件", "合并代码文件",
      ...universalKeywords
    ]
  },
  ja: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "フォルダをテキストに", "chronos", "フォルダ構造をテキストに", "ディレクトリをテキストに",
      "ディレクトリツリー", "フォルダ内容をテキストに", "フォルダ変換",
      "コードベースをllmに", "コードをllmコンテキストに", "プロジェクトをchatgptに",
      "コードベースからaiコンテキスト", "llm用コード準備",
      "フォルダ構造をテキストに変換する方法", "コードベースをchatgptと共有する方法",
      "コードドキュメント生成ツール", "プロジェクト構造エクスポート",
      "フォルダをテキストにwindowsアプリ", "無料フォルダ変換ツール",
      "オフラインフォルダ変換ツール", "フォルダをmarkdownに",
      "コードベースを単一ファイルに", "コードファイルを一つに結合",
      ...universalKeywords
    ]
  },
  ko: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "폴더를 텍스트로", "chronos", "폴더 구조를 텍스트로", "디렉토리를 텍스트로",
      "디렉토리 트리", "폴더 내용을 텍스트로", "폴더 변환기",
      "코드베이스를 llm으로", "코드를 llm 컨텍스트로", "프로젝트를 chatgpt에",
      "코드베이스에서 ai 컨텍스트", "llm용 코드 준비",
      "폴더 구조를 텍스트로 변환하는 방법", "코드베이스를 chatgpt와 공유하는 방법",
      "코드 문서 생성기", "프로젝트 구조 내보내기",
      "폴더를 텍스트로 windows 앱", "무료 폴더 변환기",
      "오프라인 폴더 변환기", "폴더를 markdown으로",
      "코드베이스를 단일 파일로", "코드 파일을 하나로 합치기",
      ...universalKeywords
    ]
  },
  hi: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "फ़ोल्डर से टेक्स्ट", "chronos", "फ़ोल्डर संरचना से टेक्स्ट", "डायरेक्टरी से टेक्स्ट",
      "डायरेक्टरी ट्री", "फ़ोल्डर सामग्री से टेक्स्ट", "फ़ोल्डर कनवर्टर",
      "कोडबेस llm के लिए", "कोड llm संदर्भ के लिए", "प्रोजेक्ट chatgpt के लिए",
      "कोडबेस से ai संदर्भ", "llm के लिए कोड तैयार करें",
      "कोड दस्तावेज़ीकरण जनरेटर", "प्रोजेक्ट संरचना एक्सपोर्ट",
      "फ़ोल्डर से टेक्स्ट windows ऐप", "मुफ़्त फ़ोल्डर कनवर्टर",
      "ऑफ़लाइन फ़ोल्डर कनवर्टर", "फ़ोल्डर से markdown",
      "कोडबेस एक फ़ाइल में", "कोड फ़ाइलों को एक में मिलाएं",
      ...universalKeywords
    ]
  },
  th: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "โฟลเดอร์เป็นข้อความ", "chronos", "โครงสร้างโฟลเดอร์เป็นข้อความ", "ไดเรกทอรีเป็นข้อความ",
      "ต้นไม้ไดเรกทอรี", "เนื้อหาโฟลเดอร์เป็นข้อความ", "ตัวแปลงโฟลเดอร์",
      "โค้ดเบสสำหรับ llm", "โค้ดสำหรับบริบท llm", "โปรเจกต์สำหรับ chatgpt",
      "บริบท ai จากโค้ดเบส", "เตรียมโค้ดสำหรับ llm",
      "ตัวสร้างเอกสารโค้ด", "ส่งออกโครงสร้างโปรเจกต์",
      "โฟลเดอร์เป็นข้อความแอป windows", "ตัวแปลงโฟลเดอร์ฟรี",
      "ตัวแปลงโฟลเดอร์ออฟไลน์", "โฟลเดอร์เป็น markdown",
      "โค้ดเบสเป็นไฟล์เดียว", "รวมไฟล์โค้ดเป็นหนึ่ง",
      ...universalKeywords
    ]
  },
  vi: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "thư mục sang văn bản", "chronos", "cấu trúc thư mục sang văn bản", "thư mục sang text",
      "cây thư mục", "nội dung thư mục sang văn bản", "bộ chuyển đổi thư mục",
      "codebase cho llm", "mã cho ngữ cảnh llm", "dự án cho chatgpt",
      "ngữ cảnh ai từ codebase", "chuẩn bị mã cho llm",
      "trình tạo tài liệu mã", "xuất cấu trúc dự án",
      "thư mục sang văn bản ứng dụng windows", "bộ chuyển đổi thư mục miễn phí",
      "bộ chuyển đổi thư mục ngoại tuyến", "thư mục sang markdown",
      "codebase thành một tệp", "gộp tệp mã thành một",
      ...universalKeywords
    ]
  },
  id: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "folder ke teks", "chronos", "struktur folder ke teks", "direktori ke teks",
      "pohon direktori", "isi folder ke teks", "konverter folder",
      "codebase untuk llm", "kode untuk konteks llm", "proyek untuk chatgpt",
      "konteks ai dari codebase", "siapkan kode untuk llm",
      "generator dokumentasi kode", "ekspor struktur proyek",
      "folder ke teks aplikasi windows", "konverter folder gratis",
      "konverter folder offline", "folder ke markdown",
      "codebase menjadi satu file", "gabungkan file kode menjadi satu",
      ...universalKeywords
    ]
  },
  // Middle Eastern
  ar: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "مجلد إلى نص", "chronos", "هيكل المجلدات إلى نص", "دليل إلى نص",
      "شجرة الدليل", "محتويات المجلد إلى نص", "محول المجلدات",
      "قاعدة الكود لـ llm", "كود لسياق llm", "مشروع لـ chatgpt",
      "سياق ai من قاعدة الكود", "تحضير الكود لـ llm",
      "مولد توثيق الكود", "تصدير هيكل المشروع",
      "مجلد إلى نص تطبيق windows", "محول مجلدات مجاني",
      "محول مجلدات بدون اتصال", "مجلد إلى markdown",
      "قاعدة الكود في ملف واحد", "دمج ملفات الكود في واحد",
      ...universalKeywords
    ]
  },
  he: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "תיקייה לטקסט", "chronos", "מבנה תיקיות לטקסט", "ספרייה לטקסט",
      "עץ ספריות", "תוכן תיקייה לטקסט", "ממיר תיקיות",
      "בסיס קוד ל-llm", "קוד להקשר llm", "פרויקט ל-chatgpt",
      "הקשר ai מבסיס קוד", "הכנת קוד ל-llm",
      "מחולל תיעוד קוד", "ייצוא מבנה פרויקט",
      "תיקייה לטקסט אפליקציית windows", "ממיר תיקיות חינמי",
      "ממיר תיקיות לא מקוון", "תיקייה ל-markdown",
      "בסיס קוד לקובץ אחד", "מיזוג קבצי קוד לאחד",
      ...universalKeywords
    ]
  },
  tr: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "klasör metne", "chronos", "klasör yapısı metne", "dizin metne",
      "dizin ağacı", "klasör içeriği metne", "klasör dönüştürücü",
      "kod tabanı llm için", "kod llm bağlamı için", "proje chatgpt için",
      "kod tabanından ai bağlamı", "llm için kod hazırlama",
      "kod dokümantasyonu oluşturucu", "proje yapısı dışa aktarma",
      "klasör metne windows uygulaması", "ücretsiz klasör dönüştürücü",
      "çevrimdışı klasör dönüştürücü", "klasör markdowna",
      "kod tabanı tek dosyaya", "kod dosyalarını birleştirme",
      ...universalKeywords
    ]
  },
  ru: {
    title: "Chronos AI Auto-Pilot & Autoclicker for Windows",
    description: "Chronos is an AI Auto-Pilot and Autoclicker that automatically clicks security popups and manages AI cooldowns for Cursor, Windsurf, Trae, and Claude. Let your AI code without interruptions.",
    keywords: [
      "папка в текст", "chronos", "структура папок в текст", "каталог в текст",
      "дерево каталогов", "содержимое папки в текст", "конвертер папок",
      "кодовая база для llm", "код для контекста llm", "проект для chatgpt",
      "ai контекст из кодовой базы", "подготовить код для llm",
      "как конвертировать структуру папок в текст", "как поделиться кодовой базой с chatgpt",
      "генератор документации кода", "экспорт структуры проекта",
      "папка в текст приложение windows", "бесплатный конвертер папок",
      "офлайн конвертер папок", "папка в markdown",
      "кодовая база в один файл", "объединить файлы кода в один",
      ...universalKeywords
    ]
  },
};

// ============================================================
// Localized long-tail keywords (≥3 per language)
// Translations of the 7 official Microsoft Store keywords:
//   file merge, text consolidation, folder aggregation,
//   developer tools, log analysis, data processing, file management
// Goal: capture native-language search intent in every market.
// ============================================================
const localizedLongTail: Record<string, string[]> = {
  en: [
    'merge files into one document', 'analyze log files with ai', 'aggregate folder content for llm',
  ],
  it: [
    'unire file in uno solo', 'analisi log con ai', 'aggregare contenuto cartella', 'strumenti per sviluppatori windows',
  ],
  de: [
    'dateien zusammenführen in einer datei', 'logdateien analysieren mit ki', 'ordnerinhalt zusammenfassen', 'entwicklerwerkzeuge windows',
  ],
  fr: [
    'fusionner fichiers en un seul', 'analyse de logs avec ia', 'agréger contenu dossier', 'outils développeur windows',
  ],
  es: [
    'combinar archivos en uno', 'análisis de logs con ia', 'agregar contenido carpeta', 'herramientas para desarrolladores',
  ],
  pt: [
    'unir arquivos em um só', 'análise de logs com ia', 'agregar conteúdo de pasta', 'ferramentas para desenvolvedores',
  ],
  nl: [
    'bestanden samenvoegen tot één', 'logbestanden analyseren met ai', 'maponderdelen samenvoegen', 'developer tools windows',
  ],
  pl: [
    'scalanie plików w jeden', 'analiza logów z ai', 'agregacja zawartości folderu', 'narzędzia dla programistów',
  ],
  sv: [
    'slå ihop filer till en', 'logganalys med ai', 'aggregera mappinnehåll', 'utvecklarverktyg windows',
  ],
  no: [
    'slå sammen filer til én', 'logganalyse med ai', 'aggregere mappeinnhold', 'utviklerverktøy windows',
  ],
  da: [
    'sammenflet filer til én', 'loganalyse med ai', 'aggreger mappeindhold', 'udviklerværktøjer windows',
  ],
  fi: [
    'yhdistä tiedostot yhdeksi', 'lokitiedostojen analyysi tekoälyllä', 'yhdistä kansion sisältö', 'kehittäjätyökalut windows',
  ],
  cs: [
    'sloučit soubory do jednoho', 'analýza logů s ai', 'agregace obsahu složky', 'nástroje pro vývojáře',
  ],
  el: [
    'συγχώνευση αρχείων σε ένα', 'ανάλυση log με ai', 'συγκέντρωση περιεχομένου φακέλου', 'εργαλεία για προγραμματιστές',
  ],
  ro: [
    'unește fișiere într-unul singur', 'analiză loguri cu ai', 'agregare conținut folder', 'instrumente pentru dezvoltatori',
  ],
  hu: [
    'fájlok egyesítése egybe', 'naplófájlok elemzése ai-val', 'mappa tartalmának összesítése', 'fejlesztői eszközök windows',
  ],
  bg: [
    'обединяване на файлове в един', 'анализ на логове с ai', 'агрегиране на съдържание на папка', 'инструменти за разработчици',
  ],
  hr: [
    'spajanje datoteka u jednu', 'analiza logova s ai', 'agregacija sadržaja mape', 'alati za programere',
  ],
  sk: [
    'zlúčiť súbory do jedného', 'analýza logov s ai', 'agregácia obsahu priečinka', 'nástroje pre vývojárov',
  ],
  sr: [
    'spajanje fajlova u jedan', 'analiza logova sa ai', 'agregacija sadržaja foldera', 'alati za programere',
  ],
  lt: [
    'sujungti failus į vieną', 'žurnalo failų analizė su ai', 'aplankų turinio sujungimas', 'kūrėjų įrankiai windows',
  ],
  lv: [
    'apvienot failus vienā', 'žurnāla failu analīze ar mi', 'mapes satura apvienošana', 'izstrādātāju rīki windows',
  ],
  et: [
    'ühenda failid üheks', 'logifailide analüüs tehisintellektiga', 'kausta sisu koondamine', 'arendaja tööriistad windows',
  ],
  sl: [
    'združi datoteke v eno', 'analiza dnevnikov z ai', 'združevanje vsebine mape', 'orodja za razvijalce',
  ],
  uk: [
    'обʼєднати файли в один', 'аналіз логів з ai', 'агрегування вмісту папки', 'інструменти для розробників',
  ],
  zh: [
    '将文件合并为一个', 'ai日志分析工具', '文件夹内容聚合', '开发者工具 windows',
  ],
  ja: [
    'ファイルを一つに結合', 'aiでログ解析', 'フォルダ内容の集約', '開発者ツール windows',
  ],
  ko: [
    '파일을 하나로 병합', 'ai 로그 분석', '폴더 내용 집계', '개발자 도구 windows',
  ],
  hi: [
    'फाइलें एक में मर्ज करें', 'ai के साथ लॉग विश्लेषण', 'फोल्डर सामग्री एकत्रीकरण', 'डेवलपर टूल्स विंडोज',
  ],
  th: [
    'รวมไฟล์เป็นไฟล์เดียว', 'วิเคราะห์ล็อกด้วย ai', 'รวมเนื้อหาโฟลเดอร์', 'เครื่องมือสำหรับนักพัฒนา',
  ],
  vi: [
    'gộp tệp thành một', 'phân tích log với ai', 'tổng hợp nội dung thư mục', 'công cụ cho lập trình viên',
  ],
  id: [
    'gabungkan file menjadi satu', 'analisis log dengan ai', 'agregasi konten folder', 'alat pengembang windows',
  ],
  ar: [
    'دمج الملفات في ملف واحد', 'تحليل السجلات بالذكاء الاصطناعي', 'تجميع محتوى المجلد', 'أدوات المطورين ويندوز',
  ],
  he: [
    'מיזוג קבצים לקובץ אחד', 'ניתוח לוגים עם בינה מלאכותית', 'איחוד תוכן תיקייה', 'כלי פיתוח לחלונות',
  ],
  tr: [
    'dosyaları tek bir dosyada birleştir', 'yapay zekâ ile log analizi', 'klasör içeriği birleştirme', 'geliştirici araçları windows',
  ],
  ru: [
    'объединить файлы в один', 'анализ логов с ии', 'агрегация содержимого папки', 'инструменты разработчика windows',
  ],
};

// Inject localized long-tail into each locale's keywords (deduped, appended)
for (const lang of Object.keys(seoConfigByLanguage)) {
  const extra = localizedLongTail[lang] || [];
  if (extra.length === 0) continue;
  const cfg = seoConfigByLanguage[lang];
  const seen = new Set(cfg.keywords.map(k => k.toLowerCase()));
  for (const k of extra) {
    if (!seen.has(k.toLowerCase())) {
      cfg.keywords.push(k);
      seen.add(k.toLowerCase());
    }
  }
}

export const LOCALIZED_LONG_TAIL = localizedLongTail;

// Map locale codes to og:locale format
const localeMap: Record<string, string> = {
  en: 'en_US', it: 'it_IT', de: 'de_DE', fr: 'fr_FR', es: 'es_ES',
  pt: 'pt_PT', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', no: 'nb_NO',
  da: 'da_DK', fi: 'fi_FI', cs: 'cs_CZ', el: 'el_GR', ro: 'ro_RO',
  hu: 'hu_HU', bg: 'bg_BG', hr: 'hr_HR', sk: 'sk_SK', sr: 'sr_RS',
  lt: 'lt_LT', lv: 'lv_LV', et: 'et_EE', sl: 'sl_SI', uk: 'uk_UA',
  zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', hi: 'hi_IN', th: 'th_TH',
  vi: 'vi_VN', id: 'id_ID', ar: 'ar_SA', he: 'he_IL', tr: 'tr_TR', ru: 'ru_RU',
};

export function getSEOConfig(language: string): SEOConfig {
  return seoConfigByLanguage[language] || seoConfigByLanguage.en;
}

export function getCanonicalUrl(language: string): string {
  return language === 'en' ? BASE_URL + '/' : `${BASE_URL}/${language}`;
}

export function getOGLocale(language: string): string {
  return localeMap[language] || 'en_US';
}

export function getAllHreflangEntries(): Array<{ lang: string; url: string }> {
  return Object.keys(seoConfigByLanguage).map(lang => ({
    lang,
    url: lang === 'en' ? BASE_URL + '/' : `${BASE_URL}/${lang}`,
  }));
}

export { BASE_URL };
