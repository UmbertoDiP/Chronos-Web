import os
import re
import json
import time
from deep_translator import GoogleTranslator

LOCALES_DIR = r"C:\Users\umber\Documents\MyProjects\articulate-flow-gen\src\lib\i18n\locales"

# The English target texts
updates_en = {
    'hero.badge': 'New · AI Auto-Pilot for developers',
    'hero.title': 'Automate Your UI with the',
    'hero.titleHighlight': 'AI Auto-Pilot',
    'hero.subtitle': 'Chronos is an AI Auto-Pilot for developers. It runs silently in the background, automatically intercepting and clicking confirmation buttons to enable truly unattended AI workflows.',
    'features.oneClick.title': 'Silent Auto-Pilot Mode',
    'features.oneClick.desc': 'Turn it on with F8 and let Chronos handle the UI. It scans for approval buttons and clicks them automatically.',
    'landing.heroSubtitle1': 'Chronos is your AI Auto-Pilot.',
    'landing.heroSubtitle2': 'It runs silently in the background, automatically intercepting and clicking confirmation buttons to enable truly unattended AI workflows.',
    'landing.faq.a1': 'Chronos is an AI Auto-Pilot for developers. It resolves the bottleneck of AI agents stopping for human authorization by automatically clicking approval buttons in the UI.',
    'landing.proFeatures.ext.desc': 'The Auto-Pilot clicks allow/submit buttons so your AI agent can work for hours uninterrupted.',
    'landing.proFeatures.split.desc': 'Triggers and UI interactions are tracked natively to provide a full audit trail.',
    'useCases.fileMerge.title': 'Unattended Agent Workflows',
    'useCases.fileMerge.subtitle': 'Let your AI agent run for days. Chronos will automatically click Allow and Approve buttons when prompted.',
    'useCases.logAnalysis.title': 'Zero Context Switching',
    'useCases.logAnalysis.subtitle': 'No more interruptions to click "Run" or "Submit". Stay focused while the AI works.',
}

# The Italian target texts
updates_it = {
    'hero.badge': 'Novità · AI Auto-Pilot per Sviluppatori',
    'hero.title': 'Automatizza la tua UI con',
    'hero.titleHighlight': 'l\'AI Auto-Pilot',
    'hero.subtitle': 'Chronos è un AI Auto-Pilot per sviluppatori. Gira silenziosamente in background intercettando e cliccando automaticamente i bottoni di conferma per flussi di lavoro completamente unattended.',
    'features.oneClick.title': 'Modalità Auto-Pilot Silenziosa',
    'features.oneClick.desc': 'Attivalo con F8 e lascia che Chronos gestisca l\'interfaccia. Scansiona i bottoni di approvazione e li clicca in autonomia.',
    'landing.heroSubtitle1': 'Chronos è il tuo AI Auto-Pilot.',
    'landing.heroSubtitle2': 'Gira silenziosamente in background intercettando e cliccando automaticamente i bottoni di conferma per flussi di lavoro completamente unattended.',
    'landing.faq.a1': 'Chronos è un AI Auto-Pilot per sviluppatori. Risolve il collo di bottiglia degli Agent AI che si fermano a chiedere autorizzazioni umane, cliccando automaticamente i bottoni di conferma.',
    'landing.proFeatures.ext.desc': 'L\'Auto-Pilot clicca bottoni di allow/submit per far lavorare il tuo Agent per ore senza interruzioni.',
    'landing.proFeatures.split.desc': 'I trigger e le interazioni UI vengono tracciati localmente fornendo un audit-trail completo.',
    'useCases.fileMerge.title': 'Workflow unattended per Agent',
    'useCases.fileMerge.subtitle': 'Lascia girare l\'Agent per giorni. Chronos cliccherà per te Allow e Approve quando richiesto.',
    'useCases.logAnalysis.title': 'Zero Interruzioni',
    'useCases.logAnalysis.subtitle': 'Basta fermarsi per cliccare "Run" o "Submit". Resta concentrato mentre l\'IA lavora in autonomia.',
}

def escape_string(text):
    return text.replace("'", "\\'")

def process_file(filepath, filename):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"Processing {filename}...")
    
    # Extract language code from filename
    # E.g. 'en.ts' -> 'en'
    lang_code = filename.replace('.ts', '')
    
    if filename == 'asian.ts':
        blocks = list(re.finditer(r'export const ([a-z]+):[^{]+{', content))
        new_content = content
        
        for i, block in enumerate(blocks):
            sub_lang = block.group(1)
            start_idx = block.end()
            end_idx = blocks[i+1].start() if i + 1 < len(blocks) else len(new_content)
            
            block_content = new_content[start_idx:end_idx]
            print(f"  Translating block {sub_lang}...")
            
            try:
                translator = GoogleTranslator(source='en', target=sub_lang)
            except Exception as e:
                print(f"  Failed to initialize translator for {sub_lang}: {e}")
                # Fallback to English if translation is unsupported
                translator = None
                
            for key, en_text in updates_en.items():
                if sub_lang == 'en':
                    target_text = en_text
                elif sub_lang == 'it':
                    target_text = updates_it.get(key, en_text)
                else:
                    if translator:
                        try:
                            target_text = translator.translate(en_text)
                            time.sleep(0.5) # rate limiting
                        except Exception as e:
                            print(f"  Translation failed for {key} in {sub_lang}: {e}")
                            target_text = en_text
                    else:
                        target_text = en_text
                
                escaped_target = escape_string(target_text)
                # Regex to match `'key': 'old_value'`
                pattern = r"(['\"]" + re.escape(key) + r"['\"]\s*:\s*['\"])(.*?)(['\"](?=[,}]))"
                
                # We need to replace block_content
                block_content = re.sub(pattern, r"\g<1>" + escaped_target + r"\3", block_content)
            
            # Reassemble new_content
            new_content = new_content[:start_idx] + block_content + new_content[end_idx:]
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
    else:
        # Standard processing for en.ts, it.ts, es.ts etc.
        try:
            target_lang = lang_code
            if target_lang == 'zh-CN' or target_lang == 'zh-TW': 
                target_lang = target_lang.replace('-', '-') 
                
            translator = GoogleTranslator(source='en', target=target_lang)
        except Exception as e:
            print(f"Failed to initialize translator for {lang_code}: {e}")
            translator = None
            
        new_content = content
        
        for key, en_text in updates_en.items():
            if lang_code == 'en':
                target_text = en_text
            elif lang_code == 'it':
                target_text = updates_it.get(key, en_text)
            else:
                if translator:
                    try:
                        target_text = translator.translate(en_text)
                        time.sleep(0.5)
                    except Exception as e:
                        print(f"Translation failed for {key} in {lang_code}: {e}")
                        target_text = en_text
                else:
                    target_text = en_text
                    
            escaped_target = escape_string(target_text)
            pattern = r"(['\"]" + re.escape(key) + r"['\"]\s*:\s*['\"])(.*?)(['\"](?=[,}]))"
            new_content = re.sub(pattern, r"\g<1>" + escaped_target + r"\3", new_content)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    if not os.path.exists(LOCALES_DIR):
        print(f"Locales directory not found: {LOCALES_DIR}")
        return
        
    for filename in os.listdir(LOCALES_DIR):
        if filename.endswith('.ts'):
            filepath = os.path.join(LOCALES_DIR, filename)
            process_file(filepath, filename)
            
    print("All i18n files updated!")

if __name__ == "__main__":
    main()
