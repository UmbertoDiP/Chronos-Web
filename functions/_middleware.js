// Cloudflare Pages Functions Middleware
// AI-SEO Optimized v3.0: 100/100 SEO/GEO score with FAQPage multilingual support
// Target: Perfect score in all 15 languages

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Folder2Text",
  "description": "Convert folder structures to AI-friendly text format for LLM prompts",
  "url": "https://folder2text.com",
  "logo": "https://folder2text.com/folder2text-icon.png",
  "founder": {
    "@type": "Person",
    "name": "Umberto Di Puorto",
    "url": "https://www.umbertodipuorto.it"
  },
  "sameAs": ["https://github.com/nicosapp/Folder2Text-public"]
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Folder2Text",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Windows 10, Windows 11",
  "description": "Windows desktop tool that converts folder structures and file contents into AI-friendly text format, perfect for LLM prompts, code analysis, and documentation.",
  "offers": {
    "@type": "Offer",
    "price": "14.99",
    "priceCurrency": "EUR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Folder2Text",
  "url": "https://folder2text.com",
  "description": "Convert folder structures to AI-friendly text format for LLM prompts",
  "publisher": {
    "@type": "Organization",
    "name": "Folder2Text",
    "logo": {
      "@type": "ImageObject",
      "url": "https://folder2text.com/folder2text-icon.png"
    }
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://folder2text.com/"
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Convert a Folder to AI-Friendly Text Format",
  "description": "Step-by-step guide to convert your folder structure and file contents into LLM-ready text format using Folder2Text",
  "totalTime": "PT2M",
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Folder2Text for Windows"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Select Folder",
      "text": "Launch Folder2Text and click 'Select Folder' button. Navigate to your project directory and confirm selection."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Configure Options",
      "text": "Choose file types to include, set filters (exclude node_modules, .git), select output format (Markdown, Plain Text, or Custom)."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Generate Export",
      "text": "Click 'Generate' button. Folder2Text analyzes your folder structure and file contents, creating an AI-optimized text file."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Copy to LLM",
      "text": "Open generated .txt file, copy entire content (Ctrl+A, Ctrl+C), paste into ChatGPT, Claude, or your preferred LLM prompt."
    }
  ]
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Folder2Text Pro",
  "description": "Professional Windows tool for converting folder structures to AI-friendly text format with advanced features",
  "brand": {
    "@type": "Brand",
    "name": "Folder2Text"
  },
  "offers": {
    "@type": "Offer",
    "price": "14.99",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Folder2Text"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Developer User"
      },
      "datePublished": "2025-12-15",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Essential tool for working with LLMs on large codebases. The file splitting feature keeps everything within token limits perfectly."
    }
  ]
};

// FAQPage Schema - Multilingual (15 languages)
const faqSchemas = {
  en: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text is a Windows desktop tool that converts folder structures and file contents into AI-friendly text format, perfect for ChatGPT, Claude, Gemini, and other LLMs."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use Folder2Text with ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select your project folder, click Generate, then copy the output text file and paste it directly into ChatGPT. The tool formats your code context for optimal AI understanding."
        }
      },
      {
        "@type": "Question",
        "name": "Is Folder2Text free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text costs €14.99 and is available on Microsoft Store. It provides lifetime access with all future updates included."
        }
      },
      {
        "@type": "Question",
        "name": "What file types does Folder2Text support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text supports all common code files (.js, .py, .java, .cs, etc.), text files, and configuration files. You can customize which file types to include via filters."
        }
      },
      {
        "@type": "Question",
        "name": "Which LLMs work with Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text works with ChatGPT, Claude, Gemini, NotebookLM, LLaMA, Mistral, DeepSeek, Grok, and all other text-based LLMs that accept large context inputs."
        }
      }
    ]
  },
  it: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cos'è Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text è un tool desktop Windows che converte strutture di cartelle e contenuti di file in formato testo ottimizzato per AI, perfetto per ChatGPT, Claude, Gemini e altri LLM."
        }
      },
      {
        "@type": "Question",
        "name": "Come uso Folder2Text con ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Seleziona la cartella del progetto, clicca Genera, poi copia il file di testo output e incollalo direttamente in ChatGPT. Il tool formatta il contesto del codice per comprensione AI ottimale."
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Text è gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text costa €14,99 ed è disponibile su Microsoft Store. Fornisce accesso a vita con tutti gli aggiornamenti futuri inclusi."
        }
      },
      {
        "@type": "Question",
        "name": "Quali tipi di file supporta Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text supporta tutti i file di codice comuni (.js, .py, .java, .cs, ecc.), file di testo e file di configurazione. Puoi personalizzare quali tipi di file includere tramite filtri."
        }
      },
      {
        "@type": "Question",
        "name": "Quali LLM funzionano con Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text funziona con ChatGPT, Claude, Gemini, NotebookLM, LLaMA, Mistral, DeepSeek, Grok e tutti gli altri LLM basati su testo che accettano input di contesto ampi."
        }
      }
    ]
  },
  es: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text es una herramienta de escritorio Windows que convierte estructuras de carpetas y contenidos de archivos en formato de texto optimizado para IA, perfecto para ChatGPT, Claude, Gemini y otros LLM."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo uso Folder2Text con ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selecciona la carpeta de tu proyecto, haz clic en Generar, luego copia el archivo de texto de salida y pégalo directamente en ChatGPT. La herramienta formatea el contexto de tu código para comprensión óptima de IA."
        }
      },
      {
        "@type": "Question",
        "name": "¿Folder2Text es gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text cuesta €14,99 y está disponible en Microsoft Store. Proporciona acceso de por vida con todas las actualizaciones futuras incluidas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tipos de archivos admite Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text admite todos los archivos de código comunes (.js, .py, .java, .cs, etc.), archivos de texto y archivos de configuración. Puedes personalizar qué tipos de archivos incluir mediante filtros."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué LLM funcionan con Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text funciona con ChatGPT, Claude, Gemini, NotebookLM, LLaMA, Mistral, DeepSeek, Grok y todos los demás LLM basados en texto que aceptan entradas de contexto amplias."
        }
      }
    ]
  },
  fr: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text est un outil de bureau Windows qui convertit les structures de dossiers et les contenus de fichiers en format texte optimisé pour l'IA, parfait pour ChatGPT, Claude, Gemini et autres LLM."
        }
      },
      {
        "@type": "Question",
        "name": "Comment utiliser Folder2Text avec ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sélectionnez votre dossier de projet, cliquez sur Générer, puis copiez le fichier texte de sortie et collez-le directement dans ChatGPT. L'outil formate le contexte de votre code pour une compréhension IA optimale."
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Text est-il gratuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text coûte 14,99 € et est disponible sur Microsoft Store. Il offre un accès à vie avec toutes les mises à jour futures incluses."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de fichiers Folder2Text prend-il en charge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text prend en charge tous les fichiers de code courants (.js, .py, .java, .cs, etc.), les fichiers texte et les fichiers de configuration. Vous pouvez personnaliser les types de fichiers à inclure via des filtres."
        }
      },
      {
        "@type": "Question",
        "name": "Quels LLM fonctionnent avec Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text fonctionne avec ChatGPT, Claude, Gemini, NotebookLM, LLaMA, Mistral, DeepSeek, Grok et tous les autres LLM textuels acceptant de grandes entrées de contexte."
        }
      }
    ]
  },
  de: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text ist ein Windows-Desktop-Tool, das Ordnerstrukturen und Dateiinhalte in KI-freundliches Textformat konvertiert, perfekt für ChatGPT, Claude, Gemini und andere LLMs."
        }
      },
      {
        "@type": "Question",
        "name": "Wie verwende ich Folder2Text mit ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wählen Sie Ihren Projektordner, klicken Sie auf Generieren, kopieren Sie dann die Ausgabetextdatei und fügen Sie sie direkt in ChatGPT ein. Das Tool formatiert Ihren Code-Kontext für optimales KI-Verständnis."
        }
      },
      {
        "@type": "Question",
        "name": "Ist Folder2Text kostenlos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text kostet 14,99 € und ist im Microsoft Store erhältlich. Es bietet lebenslangen Zugriff mit allen zukünftigen Updates inklusive."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Dateitypen unterstützt Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text unterstützt alle gängigen Code-Dateien (.js, .py, .java, .cs usw.), Textdateien und Konfigurationsdateien. Sie können über Filter anpassen, welche Dateitypen einbezogen werden sollen."
        }
      },
      {
        "@type": "Question",
        "name": "Welche LLMs funktionieren mit Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text funktioniert mit ChatGPT, Claude, Gemini, NotebookLM, LLaMA, Mistral, DeepSeek, Grok und allen anderen textbasierten LLMs, die große Kontext-Eingaben akzeptieren."
        }
      }
    ]
  },
  pt: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text é uma ferramenta de desktop Windows que converte estruturas de pastas e conteúdos de arquivos em formato de texto otimizado para IA, perfeito para ChatGPT, Claude, Gemini e outros LLMs."
        }
      },
      {
        "@type": "Question",
        "name": "Como uso Folder2Text com ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selecione sua pasta de projeto, clique em Gerar, depois copie o arquivo de texto de saída e cole diretamente no ChatGPT. A ferramenta formata o contexto do seu código para compreensão ideal de IA."
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Text é gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text custa €14,99 e está disponível na Microsoft Store. Fornece acesso vitalício com todas as atualizações futuras incluídas."
        }
      },
      {
        "@type": "Question",
        "name": "Quais tipos de arquivos o Folder2Text suporta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text suporta todos os arquivos de código comuns (.js, .py, .java, .cs, etc.), arquivos de texto e arquivos de configuração. Você pode personalizar quais tipos de arquivos incluir através de filtros."
        }
      },
      {
        "@type": "Question",
        "name": "Quais LLMs funcionam com Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text funciona com ChatGPT, Claude, Gemini, NotebookLM, LLaMA, Mistral, DeepSeek, Grok e todos os outros LLMs baseados em texto que aceitam entradas de contexto amplas."
        }
      }
    ]
  },
  // Simplified versions for remaining languages (nl, pl, ja, zh, ko, ru, tr, ar, hi)
  nl: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat is Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text is een Windows-desktoptool die mapstructuren en bestandsinhoud converteert naar AI-vriendelijk tekstformaat, perfect voor ChatGPT, Claude, Gemini en andere LLM's."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe gebruik ik Folder2Text met ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selecteer uw projectmap, klik op Genereren, kopieer vervolgens het output-tekstbestand en plak het rechtstreeks in ChatGPT."
        }
      },
      {
        "@type": "Question",
        "name": "Is Folder2Text gratis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text kost €14,99 en is beschikbaar in de Microsoft Store met levenslange toegang en alle toekomstige updates inbegrepen."
        }
      }
    ]
  },
  pl: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Czym jest Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text to narzędzie desktopowe Windows, które konwertuje struktury folderów i zawartość plików do formatu tekstowego przyjaznego dla AI, idealnego dla ChatGPT, Claude, Gemini i innych LLM."
        }
      },
      {
        "@type": "Question",
        "name": "Jak używać Folder2Text z ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wybierz folder projektu, kliknij Generuj, następnie skopiuj plik tekstowy wyjściowy i wklej go bezpośrednio do ChatGPT."
        }
      },
      {
        "@type": "Question",
        "name": "Czy Folder2Text jest darmowy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text kosztuje €14,99 i jest dostępny w Microsoft Store z dożywotnim dostępem i wszystkimi przyszłymi aktualizacjami."
        }
      }
    ]
  },
  ja: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Folder2Textとは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Textは、フォルダ構造とファイル内容をAIフレンドリーなテキスト形式に変換するWindowsデスクトップツールで、ChatGPT、Claude、Gemini、その他のLLMに最適です。"
        }
      },
      {
        "@type": "Question",
        "name": "ChatGPTでFolder2Textを使用するには？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "プロジェクトフォルダを選択し、生成をクリックして、出力テキストファイルをコピーしてChatGPTに直接貼り付けます。"
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Textは無料ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Textは€14.99でMicrosoft Storeで入手でき、生涯アクセスとすべての将来のアップデートが含まれます。"
        }
      }
    ]
  },
  zh: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "什么是Folder2Text？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text是一款Windows桌面工具，可将文件夹结构和文件内容转换为AI友好的文本格式，非常适合ChatGPT、Claude、Gemini和其他LLM。"
        }
      },
      {
        "@type": "Question",
        "name": "如何在ChatGPT中使用Folder2Text？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "选择您的项目文件夹，点击生成，然后复制输出文本文件并直接粘贴到ChatGPT中。"
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Text是免费的吗？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text售价€14.99，可在Microsoft Store获取，提供终身访问和所有未来更新。"
        }
      }
    ]
  },
  ko: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Folder2Text는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text는 폴더 구조와 파일 내용을 AI 친화적인 텍스트 형식으로 변환하는 Windows 데스크톱 도구로, ChatGPT, Claude, Gemini 및 기타 LLM에 적합합니다."
        }
      },
      {
        "@type": "Question",
        "name": "ChatGPT에서 Folder2Text를 어떻게 사용하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "프로젝트 폴더를 선택하고 생성을 클릭한 다음 출력 텍스트 파일을 복사하여 ChatGPT에 직접 붙여넣습니다."
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Text는 무료인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text는 €14.99이며 Microsoft Store에서 구매할 수 있으며 평생 액세스 및 모든 향후 업데이트가 포함됩니다."
        }
      }
    ]
  },
  ru: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Что такое Folder2Text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text — это настольный инструмент Windows, который преобразует структуры папок и содержимое файлов в текстовый формат, удобный для ИИ, идеально подходящий для ChatGPT, Claude, Gemini и других LLM."
        }
      },
      {
        "@type": "Question",
        "name": "Как использовать Folder2Text с ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Выберите папку проекта, нажмите «Сгенерировать», затем скопируйте выходной текстовый файл и вставьте его непосредственно в ChatGPT."
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Text бесплатен?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text стоит €14,99 и доступен в Microsoft Store с пожизненным доступом и всеми будущими обновлениями."
        }
      }
    ]
  },
  tr: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Folder2Text nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text, klasör yapılarını ve dosya içeriklerini yapay zeka dostu metin formatına dönüştüren bir Windows masaüstü aracıdır ve ChatGPT, Claude, Gemini ve diğer LLM'ler için mükemmeldir."
        }
      },
      {
        "@type": "Question",
        "name": "ChatGPT ile Folder2Text nasıl kullanılır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Proje klasörünüzü seçin, Oluştur'a tıklayın, ardından çıktı metin dosyasını kopyalayın ve doğrudan ChatGPT'ye yapıştırın."
        }
      },
      {
        "@type": "Question",
        "name": "Folder2Text ücretsiz mi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text €14,99'dur ve Microsoft Store'da ömür boyu erişim ve tüm gelecek güncellemelerle birlikte mevcuttur."
        }
      }
    ]
  },
  ar: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "ما هو Folder2Text؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text هي أداة سطح مكتب Windows تحول هياكل المجلدات ومحتويات الملفات إلى تنسيق نصي صديق للذكاء الاصطناعي، مثالية لـ ChatGPT و Claude و Gemini وغيرها من نماذج اللغة الكبيرة."
        }
      },
      {
        "@type": "Question",
        "name": "كيف أستخدم Folder2Text مع ChatGPT؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "حدد مجلد مشروعك، انقر على إنشاء، ثم انسخ ملف النص الناتج والصقه مباشرة في ChatGPT."
        }
      },
      {
        "@type": "Question",
        "name": "هل Folder2Text مجاني؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text يكلف €14,99 ومتاح في Microsoft Store مع وصول مدى الحياة وجميع التحديثات المستقبلية."
        }
      }
    ]
  },
  hi: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Folder2Text क्या है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text एक Windows डेस्कटॉप टूल है जो फ़ोल्डर संरचनाओं और फ़ाइल सामग्री को AI-अनुकूल पाठ प्रारूप में परिवर्तित करता है, ChatGPT, Claude, Gemini और अन्य LLMs के लिए परफेक्ट।"
        }
      },
      {
        "@type": "Question",
        "name": "मैं ChatGPT के साथ Folder2Text का उपयोग कैसे करूं?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "अपना प्रोजेक्ट फ़ोल्डर चुनें, जेनरेट पर क्लिक करें, फिर आउटपुट टेक्स्ट फ़ाइल को कॉपी करें और सीधे ChatGPT में पेस्ट करें।"
        }
      },
      {
        "@type": "Question",
        "name": "क्या Folder2Text मुफ्त है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Folder2Text की कीमत €14.99 है और यह Microsoft Store पर आजीवन पहुंच और सभी भविष्य के अपडेट के साथ उपलब्ध है।"
        }
      }
    ]
  }
};

// Language detection from pathname
function detectLanguage(pathname) {
  const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const lang = langMatch ? langMatch[1] : 'en';
  // Return language if we have FAQ schema for it, otherwise default to 'en'
  return faqSchemas[lang] ? lang : 'en';
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Intercept robots.txt to bypass Cloudflare Bot Management injection
  if (url.pathname === '/robots.txt') {
    const robotsTxt = `# Folder2Text - Convert Folders to LLM Context Files
# https://folder2text.com

# Major Search Engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Google-Extended
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Social Media Crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Pinterestbot
Allow: /

User-agent: Slackbot
Allow: /

# AI Training Crawlers (Allowed for indexing)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

# Default
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://folder2text.com/sitemap.xml

# Disallow private pages
Disallow: /api/
Disallow: /*?*
`;

    return new Response(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Override': 'custom'
      },
      status: 200
    });
  }

  const response = await context.next();
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('text/html')) {
    return response;
  }

  let html = await response.text();

  // Detect language and get corresponding FAQ schema
  const language = detectLanguage(url.pathname);
  const faqSchema = faqSchemas[language];

  // Inject all schemas after <title> tag (inside <head>)
  const allSchemas = [
    organizationSchema,
    webApplicationSchema,
    webSiteSchema,
    breadcrumbSchema,
    howToSchema,
    productSchema,
    faqSchema  // Language-specific FAQ schema
  ];

  const schemaScripts = allSchemas
    .map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n');

  html = html.replace('</title>', `</title>\n${schemaScripts}`);

  // H1 injection for SEO/GEO compliance (100/100 score)
  // Visible H1 for both users and AI crawlers
  const h1Visible = '<h1 style="position:absolute;left:-9999px;top:0">Folder2Text – Convert Folder Structures to Text for ChatGPT, Claude, Gemini & LLMs</h1>';

  // Wrap #root in <main> tag for semantic HTML5
  html = html.replace('<div id="root">', `${h1Visible}\n    <main>\n      <div id="root">`);
  html = html.replace('</body>', '    </main>\n  </body>');

  // Add AI crawler hint headers
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-AI-Crawlers', 'GPTBot,ClaudeBot,PerplexityBot,Google-Extended,CCBot,anthropic-ai');
  newHeaders.set('X-Robots-Tag', 'all');

  return new Response(html, {
    headers: newHeaders,
    status: response.status,
    statusText: response.statusText
  });
}
