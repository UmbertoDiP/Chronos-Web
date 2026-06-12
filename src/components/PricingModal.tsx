import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, Shield, Zap, HeartHandshake, FolderOpen, Bell, Cpu, SplitSquareVertical, Settings, FileCode, FolderMinus, MousePointer, Sun, Moon, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";
import { ProWaitlistModal } from "@/components/ProWaitlistModal";
import { Product } from "@/components/StructuredData/Product";

// Feature flag: Set to true when Pro subscriptions are ready for purchase
const PRO_AVAILABLE = false;

// Analytics tracking helper
const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  console.log(`[Analytics] ${eventName}`, data);
  // Integration point for real analytics (e.g., Google Analytics, Mixpanel)
  if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as { gtag?: Function }).gtag === 'function') {
    (window as { gtag: Function }).gtag('event', eventName, data);
  }
};

// Modal translations - Updated with strict STANDARD vs PRO separation
const modalTranslations = {
  en: {
    heroTitle: "Choose Your Plan",
    heroSub: "Unlock the full power of Chronos",
    standardIncludes: "STANDARD FEATURES",
    proAdds: "PRO FEATURES",
    comingSoon: "COMING SOON",
    bestValue: "BEST VALUE",
    unlocksPro: "Unlocks PRO",
    stdFeat1: "3 free trials to start", stdFeat1Desc: "Try before you buy",
    stdFeat2: "Unlimited extractions", stdFeat2Desc: "Up to 500 files per extraction",
    stdFeat3: "Lifetime Standard license", stdFeat3Desc: "One-time purchase, forever yours",
    stdFeat4: "Windows context menu", stdFeat4Desc: "Right-click to extract",
    stdFeat5: "Multi-thread processing", stdFeat5Desc: "Parallel execution",
    stdFeat6: "Desktop notifications", stdFeat6Desc: "Process completion alerts",
    proFeat1: "Unlimited files per extraction", proFeat1Desc: "No file count limits",
    proFeat2: "Extension & directory management", proFeat2Desc: "Advanced include/exclude",
    proFeat3: "Configurable auto-split", proFeat3Desc: "By size or file count",
    proFeat4: "Saveable custom presets", proFeat4Desc: "Reusable configurations",
    proFeat5: "Advanced templates", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "All Standard features included", proFeat6Desc: "Everything from Standard license",
    standard: "STANDARD", monthly: "PRO MONTHLY", annual: "PRO ANNUAL",
    lifetimeLicense: "Lifetime license", perMonth: "/month", save50: "SAVE 43%",
    trialLeft: "free left", originalPrice: "€24.99",
    getStandard: "GET STANDARD", getProMonthly: "GET PRO MONTHLY", getProAnnual: "GET PRO ANNUAL",
    joinWaitlist: "JOIN WAITLIST", oneTimePayment: "One-time payment",
    billedMonthly: "Billed monthly", billedAnnually: "Billed annually at €47.88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Safe Payment", instantActivation: "Instant Activation", lifetimeSupport: "Lifetime Support",
    popularChoice: "POPULAR",
  },
  it: {
    heroTitle: "Scegli il Tuo Piano",
    heroSub: "Sblocca tutta la potenza di Chronos",
    standardIncludes: "FUNZIONALITÀ STANDARD",
    proAdds: "FUNZIONALITÀ PRO",
    comingSoon: "PROSSIMAMENTE",
    bestValue: "MIGLIOR VALORE",
    unlocksPro: "Sblocca PRO",
    stdFeat1: "3 tentativi gratuiti", stdFeat1Desc: "Prova prima di acquistare",
    stdFeat2: "Estrazioni illimitate", stdFeat2Desc: "Fino a 500 file per estrazione",
    stdFeat3: "Licenza a vita Standard", stdFeat3Desc: "Acquisto unico, tuo per sempre",
    stdFeat4: "Menu contestuale Windows", stdFeat4Desc: "Click destro per estrarre",
    stdFeat5: "Elaborazione multi-thread", stdFeat5Desc: "Esecuzione parallela",
    stdFeat6: "Notifiche desktop", stdFeat6Desc: "Avvisi completamento",
    proFeat1: "File illimitati per estrazione", proFeat1Desc: "Nessun limite al numero di file",
    proFeat2: "Gestione estensioni e directory", proFeat2Desc: "Includi/escludi avanzato",
    proFeat3: "Suddivisione automatica configurabile", proFeat3Desc: "Per dimensione o numero file",
    proFeat4: "Preset personalizzati salvabili", proFeat4Desc: "Configurazioni riutilizzabili",
    proFeat5: "Template avanzati", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Tutte le funzionalità Standard incluse", proFeat6Desc: "Tutto dalla licenza Standard",
    standard: "STANDARD", monthly: "PRO MENSILE", annual: "PRO ANNUALE",
    lifetimeLicense: "Licenza a vita", perMonth: "/mese", save50: "RISPARMI 43%",
    trialLeft: "gratis rimaste", originalPrice: "€24,99",
    getStandard: "ACQUISTA STANDARD", getProMonthly: "ACQUISTA PRO MENSILE", getProAnnual: "ACQUISTA PRO ANNUALE",
    joinWaitlist: "ISCRIVITI ALLA LISTA", oneTimePayment: "Pagamento unico",
    billedMonthly: "Fatturato mensilmente", billedAnnually: "Fatturato annualmente a €47,88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Pagamento Sicuro", instantActivation: "Attivazione Immediata", lifetimeSupport: "Supporto a Vita",
    popularChoice: "POPOLARE",
  },
  de: {
    heroTitle: "Wähle deinen Plan",
    heroSub: "Entfessle die volle Kraft von Chronos",
    standardIncludes: "STANDARD-FUNKTIONEN",
    proAdds: "PRO-FUNKTIONEN",
    comingSoon: "DEMNÄCHST",
    bestValue: "BESTER WERT",
    unlocksPro: "Pro freischalten",
    stdFeat1: "3 kostenlose Versuche", stdFeat1Desc: "Vor dem Kauf testen",
    stdFeat2: "Unbegrenzte Extraktionen", stdFeat2Desc: "Bis zu 500 Dateien pro Extraktion",
    stdFeat3: "Lebenslange Standard-Lizenz", stdFeat3Desc: "Einmaliger Kauf, für immer deins",
    stdFeat4: "Windows-Kontextmenü", stdFeat4Desc: "Rechtsklick zum Extrahieren",
    stdFeat5: "Multi-Thread-Verarbeitung", stdFeat5Desc: "Parallele Ausführung",
    stdFeat6: "Desktop-Benachrichtigungen", stdFeat6Desc: "Fertigstellungsbenachrichtigungen",
    proFeat1: "Unbegrenzte Dateien pro Extraktion", proFeat1Desc: "Keine Dateilimits",
    proFeat2: "Erweiterungs- & Verzeichnisverwaltung", proFeat2Desc: "Erweitertes Ein-/Ausschließen",
    proFeat3: "Konfigurierbares Auto-Split", proFeat3Desc: "Nach Größe oder Dateianzahl",
    proFeat4: "Speicherbare benutzerdefinierte Presets", proFeat4Desc: "Wiederverwendbare Konfigurationen",
    proFeat5: "Erweiterte Vorlagen", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alle Standard-Funktionen enthalten", proFeat6Desc: "Alles aus der Standard-Lizenz",
    standard: "STANDARD", monthly: "PRO MONATLICH", annual: "PRO JÄHRLICH",
    lifetimeLicense: "Lebenslange Lizenz", perMonth: "/Monat", save50: "SPARE 43%",
    trialLeft: "kostenlos übrig", originalPrice: "€24,99",
    getStandard: "STANDARD KAUFEN", getProMonthly: "PRO MONATLICH KAUFEN", getProAnnual: "PRO JÄHRLICH KAUFEN",
    joinWaitlist: "AUF WARTELISTE", oneTimePayment: "Einmalzahlung",
    billedMonthly: "Monatlich abgerechnet", billedAnnually: "Jährlich abgerechnet mit €47,88",
    viaMsStore: "über Microsoft Store",
    safePayment: "Sichere Zahlung", instantActivation: "Sofortige Aktivierung", lifetimeSupport: "Lebenslanger Support",
    popularChoice: "BELIEBT",
  },
  fr: {
    heroTitle: "Choisissez votre plan",
    heroSub: "Débloquez toute la puissance de Chronos",
    standardIncludes: "FONCTIONNALITÉS STANDARD",
    proAdds: "FONCTIONNALITÉS PRO",
    comingSoon: "BIENTÔT DISPONIBLE",
    bestValue: "MEILLEURE VALEUR",
    unlocksPro: "Débloquer Pro",
    stdFeat1: "3 essais gratuits", stdFeat1Desc: "Essayez avant d'acheter",
    stdFeat2: "Extractions illimitées", stdFeat2Desc: "Jusqu'à 500 fichiers par extraction",
    stdFeat3: "Licence Standard à vie", stdFeat3Desc: "Achat unique, à vous pour toujours",
    stdFeat4: "Menu contextuel Windows", stdFeat4Desc: "Clic droit pour extraire",
    stdFeat5: "Traitement multi-thread", stdFeat5Desc: "Exécution parallèle",
    stdFeat6: "Notifications de bureau", stdFeat6Desc: "Alertes de fin de traitement",
    proFeat1: "Fichiers illimités par extraction", proFeat1Desc: "Aucune limite de fichiers",
    proFeat2: "Gestion des extensions et répertoires", proFeat2Desc: "Inclusion/exclusion avancée",
    proFeat3: "Auto-split configurable", proFeat3Desc: "Par taille ou nombre de fichiers",
    proFeat4: "Préréglages personnalisés enregistrables", proFeat4Desc: "Configurations réutilisables",
    proFeat5: "Modèles avancés", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Toutes les fonctionnalités Standard incluses", proFeat6Desc: "Tout de la licence Standard",
    standard: "STANDARD", monthly: "PRO MENSUEL", annual: "PRO ANNUEL",
    lifetimeLicense: "Licence à vie", perMonth: "/mois", save50: "ÉCONOMISEZ 43%",
    trialLeft: "essais gratuits", originalPrice: "€24,99",
    getStandard: "ACHETER STANDARD", getProMonthly: "ACHETER PRO MENSUEL", getProAnnual: "ACHETER PRO ANNUEL",
    joinWaitlist: "REJOINDRE LA LISTE", oneTimePayment: "Paiement unique",
    billedMonthly: "Facturé mensuellement", billedAnnually: "Facturé annuellement à €47,88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Paiement Sécurisé", instantActivation: "Activation Instantanée", lifetimeSupport: "Support à Vie",
    popularChoice: "POPULAIRE",
  },
  es: {
    heroTitle: "Elige tu plan",
    heroSub: "Desbloquea todo el poder de Chronos",
    standardIncludes: "FUNCIONES ESTÁNDAR",
    proAdds: "FUNCIONES PRO",
    comingSoon: "PRÓXIMAMENTE",
    bestValue: "MEJOR VALOR",
    unlocksPro: "Desbloquea Pro",
    stdFeat1: "3 pruebas gratuitas", stdFeat1Desc: "Prueba antes de comprar",
    stdFeat2: "Extracciones ilimitadas", stdFeat2Desc: "Hasta 500 archivos por extracción",
    stdFeat3: "Licencia Standard de por vida", stdFeat3Desc: "Compra única, tuya para siempre",
    stdFeat4: "Menú contextual de Windows", stdFeat4Desc: "Clic derecho para extraer",
    stdFeat5: "Procesamiento multi-hilo", stdFeat5Desc: "Ejecución paralela",
    stdFeat6: "Notificaciones de escritorio", stdFeat6Desc: "Alertas de finalización",
    proFeat1: "Archivos ilimitados por extracción", proFeat1Desc: "Sin límite de archivos",
    proFeat2: "Gestión de extensiones y directorios", proFeat2Desc: "Inclusión/exclusión avanzada",
    proFeat3: "Auto-división configurable", proFeat3Desc: "Por tamaño o número de archivos",
    proFeat4: "Presets personalizados guardables", proFeat4Desc: "Configuraciones reutilizables",
    proFeat5: "Plantillas avanzadas", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Todas las funciones Standard incluidas", proFeat6Desc: "Todo de la licencia Standard",
    standard: "ESTÁNDAR", monthly: "PRO MENSUAL", annual: "PRO ANUAL",
    lifetimeLicense: "Licencia de por vida", perMonth: "/mes", save50: "AHORRA 43%",
    trialLeft: "gratis restantes", originalPrice: "€24,99",
    getStandard: "COMPRAR ESTÁNDAR", getProMonthly: "COMPRAR PRO MENSUAL", getProAnnual: "COMPRAR PRO ANUAL",
    joinWaitlist: "UNIRSE A LA LISTA", oneTimePayment: "Pago único",
    billedMonthly: "Facturado mensualmente", billedAnnually: "Facturado anualmente a €47,88",
    viaMsStore: "vía Microsoft Store",
    safePayment: "Pago Seguro", instantActivation: "Activación Instantánea", lifetimeSupport: "Soporte de por Vida",
    popularChoice: "POPULAR",
  },
  pt: {
    heroTitle: "Escolha seu plano",
    heroSub: "Desbloqueie todo o poder do Chronos",
    standardIncludes: "RECURSOS STANDARD",
    proAdds: "RECURSOS PRO",
    comingSoon: "EM BREVE",
    bestValue: "MELHOR VALOR",
    unlocksPro: "Desbloqueia Pro",
    stdFeat1: "3 testes gratuitos", stdFeat1Desc: "Experimente antes de comprar",
    stdFeat2: "Extrações ilimitadas", stdFeat2Desc: "Até 500 arquivos por extração",
    stdFeat3: "Licença Standard vitalícia", stdFeat3Desc: "Compra única, seu para sempre",
    stdFeat4: "Menu de contexto do Windows", stdFeat4Desc: "Clique com botão direito para extrair",
    stdFeat5: "Processamento multi-thread", stdFeat5Desc: "Execução paralela",
    stdFeat6: "Notificações de desktop", stdFeat6Desc: "Alertas de conclusão",
    proFeat1: "Arquivos ilimitados por extração", proFeat1Desc: "Sem limite de arquivos",
    proFeat2: "Gestão de extensões e diretórios", proFeat2Desc: "Inclusão/exclusão avançada",
    proFeat3: "Auto-divisão configurável", proFeat3Desc: "Por tamanho ou número de arquivos",
    proFeat4: "Presets personalizados salvos", proFeat4Desc: "Configurações reutilizáveis",
    proFeat5: "Modelos avançados", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Todos os recursos Standard incluídos", proFeat6Desc: "Tudo da licença Standard",
    standard: "STANDARD", monthly: "PRO MENSAL", annual: "PRO ANUAL",
    lifetimeLicense: "Licença vitalícia", perMonth: "/mês", save50: "ECONOMIZE 43%",
    trialLeft: "grátis restantes", originalPrice: "€24,99",
    getStandard: "COMPRAR STANDARD", getProMonthly: "COMPRAR PRO MENSAL", getProAnnual: "COMPRAR PRO ANUAL",
    joinWaitlist: "ENTRAR NA LISTA", oneTimePayment: "Pagamento único",
    billedMonthly: "Cobrado mensalmente", billedAnnually: "Cobrado anualmente a €47,88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Pagamento Seguro", instantActivation: "Ativação Instantânea", lifetimeSupport: "Suporte Vitalício",
    popularChoice: "POPULAR",
  },
  nl: {
    heroTitle: "Kies uw plan",
    heroSub: "Ontgrendel de volledige kracht van Chronos",
    standardIncludes: "STANDAARD FUNCTIES",
    proAdds: "PRO FUNCTIES",
    comingSoon: "BINNENKORT",
    bestValue: "BESTE WAARDE",
    unlocksPro: "Ontgrendelt Pro",
    stdFeat1: "3 gratis proefversies", stdFeat1Desc: "Probeer voordat u koopt",
    stdFeat2: "Onbeperkte extracties", stdFeat2Desc: "Tot 500 bestanden per extractie",
    stdFeat3: "Levenslange Standard licentie", stdFeat3Desc: "Eenmalige aankoop, voor altijd van u",
    stdFeat4: "Windows contextmenu", stdFeat4Desc: "Rechtsklik om te extraheren",
    stdFeat5: "Multi-thread verwerking", stdFeat5Desc: "Parallelle uitvoering",
    stdFeat6: "Desktop notificaties", stdFeat6Desc: "Voltooiingsmeldingen",
    proFeat1: "Onbeperkte bestanden per extractie", proFeat1Desc: "Geen bestandslimieten",
    proFeat2: "Extensie- & mapbeheer", proFeat2Desc: "Geavanceerd in-/uitsluiten",
    proFeat3: "Configureerbare auto-split", proFeat3Desc: "Op grootte of aantal bestanden",
    proFeat4: "Opgeslagen aangepaste presets", proFeat4Desc: "Herbruikbare configuraties",
    proFeat5: "Geavanceerde sjablonen", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alle Standard functies inbegrepen", proFeat6Desc: "Alles uit de Standard licentie",
    standard: "STANDAARD", monthly: "PRO MAANDELIJKS", annual: "PRO JAARLIJKS",
    lifetimeLicense: "Levenslange licentie", perMonth: "/maand", save50: "BESPAAR 43%",
    trialLeft: "gratis over", originalPrice: "€24,99",
    getStandard: "STANDAARD KOPEN", getProMonthly: "PRO MAANDELIJKS KOPEN", getProAnnual: "PRO JAARLIJKS KOPEN",
    joinWaitlist: "OP WACHTLIJST", oneTimePayment: "Eenmalige betaling",
    billedMonthly: "Maandelijks gefactureerd", billedAnnually: "Jaarlijks gefactureerd voor €47,88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Veilige Betaling", instantActivation: "Directe Activatie", lifetimeSupport: "Levenslange Ondersteuning",
    popularChoice: "POPULAIR",
  },
  pl: {
    heroTitle: "Wybierz swój plan",
    heroSub: "Odblokuj pełną moc Chronos",
    standardIncludes: "FUNKCJE STANDARD",
    proAdds: "FUNKCJE PRO",
    comingSoon: "WKRÓTCE",
    bestValue: "NAJLEPSZA WARTOŚĆ",
    unlocksPro: "Odblokuj Pro",
    stdFeat1: "3 darmowe próby", stdFeat1Desc: "Wypróbuj przed zakupem",
    stdFeat2: "Nieograniczone ekstrakcje", stdFeat2Desc: "Do 500 plików na ekstrakcję",
    stdFeat3: "Dożywotnia licencja Standard", stdFeat3Desc: "Jednorazowy zakup, na zawsze Twój",
    stdFeat4: "Menu kontekstowe Windows", stdFeat4Desc: "Prawy przycisk do ekstrakcji",
    stdFeat5: "Przetwarzanie wielowątkowe", stdFeat5Desc: "Wykonywanie równoległe",
    stdFeat6: "Powiadomienia na pulpicie", stdFeat6Desc: "Alerty o zakończeniu",
    proFeat1: "Nieograniczona liczba plików na ekstrakcję", proFeat1Desc: "Brak limitów plików",
    proFeat2: "Zarządzanie rozszerzeniami i katalogami", proFeat2Desc: "Zaawansowane włączanie/wyłączanie",
    proFeat3: "Konfigurowalne auto-dzielenie", proFeat3Desc: "Według rozmiaru lub liczby plików",
    proFeat4: "Zapisywalne niestandardowe presety", proFeat4Desc: "Konfiguracje do ponownego użycia",
    proFeat5: "Zaawansowane szablony", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Wszystkie funkcje Standard w zestawie", proFeat6Desc: "Wszystko z licencji Standard",
    standard: "STANDARD", monthly: "PRO MIESIĘCZNY", annual: "PRO ROCZNY",
    lifetimeLicense: "Licencja dożywotnia", perMonth: "/miesiąc", save50: "OSZCZĘDŹ 43%",
    trialLeft: "darmowych pozostało", originalPrice: "€24,99",
    getStandard: "KUP STANDARD", getProMonthly: "KUP PRO MIESIĘCZNY", getProAnnual: "KUP PRO ROCZNY",
    joinWaitlist: "DOŁĄCZ DO LISTY", oneTimePayment: "Jednorazowa płatność",
    billedMonthly: "Rozliczane miesięcznie", billedAnnually: "Rozliczane rocznie za €47,88",
    viaMsStore: "przez Microsoft Store",
    safePayment: "Bezpieczna Płatność", instantActivation: "Natychmiastowa Aktywacja", lifetimeSupport: "Dożywotnie Wsparcie",
    popularChoice: "POPULARNY",
  },
  sv: {
    heroTitle: "Välj din plan",
    heroSub: "Lås upp all kraft i Chronos",
    standardIncludes: "STANDARDFUNKTIONER",
    proAdds: "PRO-FUNKTIONER",
    comingSoon: "KOMMER SNART",
    bestValue: "BÄSTA VÄRDET",
    unlocksPro: "Låser upp Pro",
    stdFeat1: "3 gratis försök", stdFeat1Desc: "Prova innan du köper",
    stdFeat2: "Obegränsade extraktioner", stdFeat2Desc: "Upp till 500 filer per extraktion",
    stdFeat3: "Livstids Standard-licens", stdFeat3Desc: "Engångsköp, din för alltid",
    stdFeat4: "Windows kontextmeny", stdFeat4Desc: "Högerklicka för att extrahera",
    stdFeat5: "Multi-trådsbearbetning", stdFeat5Desc: "Parallell exekvering",
    stdFeat6: "Skrivbordsnotifikationer", stdFeat6Desc: "Avslutningsmeddelanden",
    proFeat1: "Obegränsade filer per extraktion", proFeat1Desc: "Inga filbegränsningar",
    proFeat2: "Tilläggs- & kataloghantering", proFeat2Desc: "Avancerad inkludera/exkludera",
    proFeat3: "Konfigurerbar auto-delning", proFeat3Desc: "Efter storlek eller filantal",
    proFeat4: "Sparbara anpassade förinställningar", proFeat4Desc: "Återanvändbara konfigurationer",
    proFeat5: "Avancerade mallar", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alla Standardfunktioner inkluderade", proFeat6Desc: "Allt från Standard-licensen",
    standard: "STANDARD", monthly: "PRO MÅNATLIG", annual: "PRO ÅRLIG",
    lifetimeLicense: "Livstidslicens", perMonth: "/månad", save50: "SPARA 43%",
    trialLeft: "gratis kvar", originalPrice: "€24,99",
    getStandard: "KÖP STANDARD", getProMonthly: "KÖP PRO MÅNATLIG", getProAnnual: "KÖP PRO ÅRLIG",
    joinWaitlist: "GÅ MED I VÄNTELISTAN", oneTimePayment: "Engångsbetalning",
    billedMonthly: "Faktureras månadsvis", billedAnnually: "Faktureras årligen för €47,88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Säker Betalning", instantActivation: "Omedelbar Aktivering", lifetimeSupport: "Livstidssupport",
    popularChoice: "POPULÄR",
  },
  no: {
    heroTitle: "Velg din plan",
    heroSub: "Lås opp all kraften i Chronos",
    standardIncludes: "STANDARD FUNKSJONER",
    proAdds: "PRO FUNKSJONER",
    comingSoon: "KOMMER SNART",
    bestValue: "BESTE VERDI",
    unlocksPro: "Låser opp Pro",
    stdFeat1: "3 gratis prøvinger", stdFeat1Desc: "Prøv før du kjøper",
    stdFeat2: "Ubegrensede ekstrakter", stdFeat2Desc: "Opptil 500 filer per ekstraksjon",
    stdFeat3: "Livstids Standard-lisens", stdFeat3Desc: "Engangskjøp, din for alltid",
    stdFeat4: "Windows kontekstmeny", stdFeat4Desc: "Høyreklikk for å ekstrahre",
    stdFeat5: "Multi-tråds behandling", stdFeat5Desc: "Parallell utførelse",
    stdFeat6: "Skrivbordsvarsler", stdFeat6Desc: "Fullføringsvarslinger",
    proFeat1: "Ubegrensede filer per ekstraksjon", proFeat1Desc: "Ingen filbegrensninger",
    proFeat2: "Utvidelse- & katalogadministrasjon", proFeat2Desc: "Avansert inkluder/ekskluder",
    proFeat3: "Konfigurerbar auto-deling", proFeat3Desc: "Etter størrelse eller filantall",
    proFeat4: "Lagrede tilpassede forhåndsinnstillinger", proFeat4Desc: "Gjenbrukbare konfigurasjoner",
    proFeat5: "Avanserte maler", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alle Standard-funksjoner inkludert", proFeat6Desc: "Alt fra Standard-lisensen",
    standard: "STANDARD", monthly: "PRO MÅNEDLIG", annual: "PRO ÅRLIG",
    lifetimeLicense: "Livstidslisens", perMonth: "/måned", save50: "SPAR 43%",
    trialLeft: "gratis igjen", originalPrice: "€24,99",
    getStandard: "KJØP STANDARD", getProMonthly: "KJØP PRO MÅNEDLIG", getProAnnual: "KJØP PRO ÅRLIG",
    joinWaitlist: "BLI MED PÅ VENTELISTEN", oneTimePayment: "Engangsbetaling",
    billedMonthly: "Fakturert månedlig", billedAnnually: "Fakturert årlig for €47,88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Sikker Betaling", instantActivation: "Umiddelbar Aktivering", lifetimeSupport: "Livstidsstøtte",
    popularChoice: "POPULÆR",
  },
  da: {
    heroTitle: "Vælg din plan",
    heroSub: "Lås op for hele kraften i Chronos",
    standardIncludes: "STANDARD FUNKTIONER",
    proAdds: "PRO FUNKTIONER",
    comingSoon: "KOMMER SNART",
    bestValue: "BEDSTE VÆRDI",
    unlocksPro: "Låser op Pro",
    stdFeat1: "3 gratis prøver", stdFeat1Desc: "Prøv før du køber",
    stdFeat2: "Ubegrænsede ekstraktioner", stdFeat2Desc: "Op til 500 filer per ekstraktion",
    stdFeat3: "Livstids Standard-licens", stdFeat3Desc: "Engangskøb, din for evigt",
    stdFeat4: "Windows kontekstmenu", stdFeat4Desc: "Højreklik for at udtrække",
    stdFeat5: "Multi-tråds behandling", stdFeat5Desc: "Parallel udførelse",
    stdFeat6: "Desktop notifikationer", stdFeat6Desc: "Fuldførelsesadvarsler",
    proFeat1: "Ubegrænsede filer per ekstraktion", proFeat1Desc: "Ingen filbegrænsninger",
    proFeat2: "Udvidelse- & katalogadministration", proFeat2Desc: "Avanceret inkluder/ekskluder",
    proFeat3: "Konfigurerbar auto-opdeling", proFeat3Desc: "Efter størrelse eller filantal",
    proFeat4: "Gemte brugerdefinerede forudindstillinger", proFeat4Desc: "Genanvendelige konfigurationer",
    proFeat5: "Avancerede skabeloner", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alle Standard-funktioner inkluderet", proFeat6Desc: "Alt fra Standard-licensen",
    standard: "STANDARD", monthly: "PRO MÅNEDLIG", annual: "PRO ÅRLIG",
    lifetimeLicense: "Livstidslicens", perMonth: "/måned", save50: "SPAR 43%",
    trialLeft: "gratis tilbage", originalPrice: "€24,99",
    getStandard: "KØB STANDARD", getProMonthly: "KØB PRO MÅNEDLIG", getProAnnual: "KØP PRO ÅRLIG",
    joinWaitlist: "TILMELD VENTELISTEN", oneTimePayment: "Engangsbetaling",
    billedMonthly: "Faktureres månedligt", billedAnnually: "Faktureres årligt for €47,88",
    viaMsStore: "via Microsoft Store",
    safePayment: "Sikker Betaling", instantActivation: "Øjeblikkelig Aktivering", lifetimeSupport: "Livstidssupport",
    popularChoice: "POPULÆR",
  },
  fi: {
    heroTitle: "Valitse suunnitelmasi",
    heroSub: "Avaa Chronosin täysi voima",
    standardIncludes: "STANDARD-OMINAISUUDET",
    proAdds: "PRO-OMINAISUUDET",
    comingSoon: "TULOSSA PIAN",
    bestValue: "PARAS ARVO",
    unlocksPro: "Avaa Pro",
    stdFeat1: "3 ilmaista kokeilua", stdFeat1Desc: "Kokeile ennen ostoa",
    stdFeat2: "Rajattomat purkamiset", stdFeat2Desc: "Jopa 500 tiedostoa purkamista kohden",
    stdFeat3: "Elinikäinen Standard-lisenssi", stdFeat3Desc: "Kertaosto, sinun ikuisesti",
    stdFeat4: "Windows kontekstivalikko", stdFeat4Desc: "Napsauta hiiren oikealla purkaaksesi",
    stdFeat5: "Monisäikeinen käsittely", stdFeat5Desc: "Rinnakkainen suoritus",
    stdFeat6: "Työpöytäilmoitukset", stdFeat6Desc: "Valmiusilmoitukset",
    proFeat1: "Rajattomat tiedostot purkamista kohden", proFeat1Desc: "Ei tiedostorajoituksia",
    proFeat2: "Laajennus- ja hakemistohallinta", proFeat2Desc: "Edistynyt sisällytä/poista",
    proFeat3: "Konfiguroitava automaattijako", proFeat3Desc: "Koon tai tiedostomäärän mukaan",
    proFeat4: "Tallennettavat mukautetut esiasetukset", proFeat4Desc: "Uudelleenkäytettävät asetukset",
    proFeat5: "Edistyneet mallit", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Kaikki Standard-ominaisuudet sisältyvät", proFeat6Desc: "Kaikki Standard-lisenssistä",
    standard: "STANDARD", monthly: "PRO KUUKAUSITTAIN", annual: "PRO VUOSITTAIN",
    lifetimeLicense: "Elinikäinen lisenssi", perMonth: "/kuukausi", save50: "SÄÄSTÄ 43%",
    trialLeft: "ilmaista jäljellä", originalPrice: "€24,99",
    getStandard: "OSTA STANDARD", getProMonthly: "OSTA PRO KUUKAUSITTAIN", getProAnnual: "OSTA PRO VUOSITTAIN",
    joinWaitlist: "LIITY JONOTUSLISTALLE", oneTimePayment: "Kertamaksu",
    billedMonthly: "Laskutetaan kuukausittain", billedAnnually: "Laskutetaan vuosittain €47,88",
    viaMsStore: "Microsoft Storen kautta",
    safePayment: "Turvallinen Maksu", instantActivation: "Välitön Aktivointi", lifetimeSupport: "Elinikäinen Tuki",
    popularChoice: "SUOSITTU",
  },
  cs: {
    heroTitle: "Vyberte si svůj plán",
    heroSub: "Odemkněte plnou sílu Chronos",
    standardIncludes: "STANDARDNÍ FUNKCE",
    proAdds: "PRO FUNKCE",
    comingSoon: "JIŽ BRZY",
    bestValue: "NEJLEPŠÍ HODNOTA",
    unlocksPro: "Odemyká Pro",
    stdFeat1: "3 bezplatné zkušební verze", stdFeat1Desc: "Vyzkoušejte před nákupem",
    stdFeat2: "Neomezené extrakce", stdFeat2Desc: "Až 500 souborů na extrakci",
    stdFeat3: "Doživotní Standard licence", stdFeat3Desc: "Jednorázový nákup, navždy vaše",
    stdFeat4: "Windows kontextové menu", stdFeat4Desc: "Klikněte pravým tlačítkem pro extrakci",
    stdFeat5: "Vícevláknové zpracování", stdFeat5Desc: "Paralelní spuštění",
    stdFeat6: "Oznámení na ploše", stdFeat6Desc: "Upozornění na dokončení",
    proFeat1: "Neomezený počet souborů na extrakci", proFeat1Desc: "Žádné limity souborů",
    proFeat2: "Správa rozšíření a adresářů", proFeat2Desc: "Pokročilé zahrnutí/vyloučení",
    proFeat3: "Konfigurovatelné auto-dělení", proFeat3Desc: "Podle velikosti nebo počtu souborů",
    proFeat4: "Uložitelná vlastní přednastavení", proFeat4Desc: "Opakovaně použitelné konfigurace",
    proFeat5: "Pokročilé šablony", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Všechny Standardní funkce zahrnuty", proFeat6Desc: "Vše ze Standardní licence",
    standard: "STANDARD", monthly: "PRO MĚSÍČNÍ", annual: "PRO ROČNÍ",
    lifetimeLicense: "Doživotní licence", perMonth: "/měsíc", save50: "UŠETŘETE 43%",
    trialLeft: "zdarma zbývá", originalPrice: "€24,99",
    getStandard: "KOUPIT STANDARD", getProMonthly: "KOUPIT PRO MĚSÍČNÍ", getProAnnual: "KOUPIT PRO ROČNÍ",
    joinWaitlist: "PŘIPOJIT SE K ČEKACÍ LISTINĚ", oneTimePayment: "Jednorázová platba",
    billedMonthly: "Účtováno měsíčně", billedAnnually: "Účtováno ročně za €47,88",
    viaMsStore: "přes Microsoft Store",
    safePayment: "Bezpečná Platba", instantActivation: "Okamžitá Aktivace", lifetimeSupport: "Doživotní Podpora",
    popularChoice: "OBLÍBENÉ",
  },
  el: {
    heroTitle: "Επιλέξτε το πλάνο σας",
    heroSub: "Ξεκλειδώστε την πλήρη δύναμη του Chronos",
    standardIncludes: "ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ STANDARD",
    proAdds: "ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ PRO",
    comingSoon: "ΕΡΧΕΤΑΙ ΣΥΝΤΟΜΑ",
    bestValue: "ΚΑΛΥΤΕΡΗ ΑΞΙΑ",
    unlocksPro: "Ξεκλειδώνει Pro",
    stdFeat1: "3 δωρεάν δοκιμές", stdFeat1Desc: "Δοκιμάστε πριν αγοράσετε",
    stdFeat2: "Απεριόριστες εξαγωγές", stdFeat2Desc: "Έως 500 αρχεία ανά εξαγωγή",
    stdFeat3: "Ισόβια άδεια Standard", stdFeat3Desc: "Μία φορά αγορά, δική σας για πάντα",
    stdFeat4: "Μενού περιβάλλοντος Windows", stdFeat4Desc: "Δεξί κλικ για εξαγωγή",
    stdFeat5: "Επεξεργασία πολλαπλών νημάτων", stdFeat5Desc: "Παράλληλη εκτέλεση",
    stdFeat6: "Ειδοποιήσεις επιφάνειας εργασίας", stdFeat6Desc: "Ειδοποιήσεις ολοκλήρωσης",
    proFeat1: "Απεριόριστα αρχεία ανά εξαγωγή", proFeat1Desc: "Χωρίς όρια αρχείων",
    proFeat2: "Διαχείριση επεκτάσεων & καταλόγων", proFeat2Desc: "Προηγμένη συμπερίληψη/αποκλεισμός",
    proFeat3: "Διαμορφώσιμο αυτόματο διαχωρισμό", proFeat3Desc: "Με βάση το μέγεθος ή τον αριθμό αρχείων",
    proFeat4: "Αποθηκεύσιμες προσαρμοσμένες προρυθμίσεις", proFeat4Desc: "Επαναχρησιμοποιήσιμες διαμορφώσεις",
    proFeat5: "Προηγμένα πρότυπα", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Όλα τα χαρακτηριστικά Standard περιλαμβάνονται", proFeat6Desc: "Τα πάντα από την άδεια Standard",
    standard: "STANDARD", monthly: "PRO ΜΗΝΙΑΙΟ", annual: "PRO ΕΤΗΣΙΟ",
    lifetimeLicense: "Ισόβια άδεια", perMonth: "/μήνα", save50: "ΕΞΟΙΚΟΝΟΜΗΣΤΕ 43%",
    trialLeft: "δωρεάν απομένουν", originalPrice: "€24,99",
    getStandard: "ΑΓΟΡΑ STANDARD", getProMonthly: "ΑΓΟΡΑ PRO ΜΗΝΙΑΙΟ", getProAnnual: "ΑΓΟΡΑ PRO ΕΤΗΣΙΟ",
    joinWaitlist: "ΣΥΜΜΕΤΟΧΗ ΣΤΗ ΛΙΣΤΑ ΑΝΑΜΟΝΗΣ", oneTimePayment: "Εφάπαξ πληρωμή",
    billedMonthly: "Χρέωση μηνιαία", billedAnnually: "Χρέωση ετησίως €47,88",
    viaMsStore: "μέσω Microsoft Store",
    safePayment: "Ασφαλής Πληρωμή", instantActivation: "Άμεση Ενεργοποίηση", lifetimeSupport: "Ισόβια Υποστήριξη",
    popularChoice: "ΔΗΜΟΦΙΛΕΣ",
  },
  ro: {
    heroTitle: "Alege planul tău",
    heroSub: "Deblochează întreaga putere a Chronos",
    standardIncludes: "FUNCȚII STANDARD",
    proAdds: "FUNCȚII PRO",
    comingSoon: "ÎN CURÂND",
    bestValue: "CEA MAI BUNĂ VALOARE",
    unlocksPro: "Deblochează Pro",
    stdFeat1: "3 încercări gratuite", stdFeat1Desc: "Încearcă înainte de a cumpăra",
    stdFeat2: "Extracții nelimitate", stdFeat2Desc: "Până la 500 fișiere per extracție",
    stdFeat3: "Licență Standard pe viață", stdFeat3Desc: "Achiziție unică, al tău pentru totdeauna",
    stdFeat4: "Meniu contextual Windows", stdFeat4Desc: "Click dreapta pentru a extrage",
    stdFeat5: "Procesare multi-thread", stdFeat5Desc: "Execuție paralelă",
    stdFeat6: "Notificări desktop", stdFeat6Desc: "Alerte de finalizare",
    proFeat1: "Fișiere nelimitate per extracție", proFeat1Desc: "Fără limite de fișiere",
    proFeat2: "Gestionare extensii și directoare", proFeat2Desc: "Includere/excludere avansată",
    proFeat3: "Auto-împărțire configurabilă", proFeat3Desc: "După dimensiune sau număr de fișiere",
    proFeat4: "Preset-uri personalizate salvabile", proFeat4Desc: "Configurații reutilizabile",
    proFeat5: "Șabloane avansate", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Toate funcțiile Standard incluse", proFeat6Desc: "Tot din licența Standard",
    standard: "STANDARD", monthly: "PRO LUNAR", annual: "PRO ANUAL",
    lifetimeLicense: "Licență pe viață", perMonth: "/lună", save50: "ECONOMISEȘTI 43%",
    trialLeft: "gratuite rămase", originalPrice: "€24,99",
    getStandard: "CUMPĂRĂ STANDARD", getProMonthly: "CUMPĂRĂ PRO LUNAR", getProAnnual: "CUMPĂRĂ PRO ANUAL",
    joinWaitlist: "ALĂTURĂ-TE LISTEI", oneTimePayment: "Plată unică",
    billedMonthly: "Facturat lunar", billedAnnually: "Facturat anual la €47,88",
    viaMsStore: "prin Microsoft Store",
    safePayment: "Plată Sigură", instantActivation: "Activare Instantanee", lifetimeSupport: "Suport pe Viață",
    popularChoice: "POPULAR",
  },
  hu: {
    heroTitle: "Válaszd ki a terved",
    heroSub: "Oldd fel a Chronos teljes erejét",
    standardIncludes: "STANDARD FUNKCIÓK",
    proAdds: "PRO FUNKCIÓK",
    comingSoon: "HAMAROSAN",
    bestValue: "LEGJOBB ÉRTÉK",
    unlocksPro: "Pro feloldása",
    stdFeat1: "3 ingyenes próba", stdFeat1Desc: "Próbáld ki vásárlás előtt",
    stdFeat2: "Korlátlan kinyerések", stdFeat2Desc: "Kinyerésenként legfeljebb 500 fájl",
    stdFeat3: "Élethosszig tartó Standard licenc", stdFeat3Desc: "Egyszeri vásárlás, örökké a tiéd",
    stdFeat4: "Windows helyi menü", stdFeat4Desc: "Jobb klikk a kinyeréshez",
    stdFeat5: "Többszálas feldolgozás", stdFeat5Desc: "Párhuzamos végrehajtás",
    stdFeat6: "Asztali értesítések", stdFeat6Desc: "Befejezési figyelmeztetések",
    proFeat1: "Korlátlan fájl kinyerésenként", proFeat1Desc: "Nincs fájlkorlát",
    proFeat2: "Kiterjesztés- és könyvtárkezelés", proFeat2Desc: "Haladó belefoglalás/kizárás",
    proFeat3: "Konfigurálható automatikus felosztás", proFeat3Desc: "Méret vagy fájlszám alapján",
    proFeat4: "Menthető egyéni előbeállítások", proFeat4Desc: "Újrafelhasználható konfigurációk",
    proFeat5: "Haladó sablonok", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Minden Standard funkció benne van", proFeat6Desc: "Minden a Standard licencből",
    standard: "STANDARD", monthly: "PRO HAVI", annual: "PRO ÉVI",
    lifetimeLicense: "Élethosszig tartó licenc", perMonth: "/hónap", save50: "SPÓROLJ 43%",
    trialLeft: "ingyenes maradt", originalPrice: "€24,99",
    getStandard: "STANDARD VÁSÁRLÁS", getProMonthly: "PRO HAVI VÁSÁRLÁS", getProAnnual: "PRO ÉVI VÁSÁRLÁS",
    joinWaitlist: "CSATLAKOZZ A VÁRÓLISTÁHOZ", oneTimePayment: "Egyszeri fizetés",
    billedMonthly: "Havonta számlázva", billedAnnually: "Évente számlázva €47,88",
    viaMsStore: "Microsoft Store-on keresztül",
    safePayment: "Biztonságos Fizetés", instantActivation: "Azonnali Aktiválás", lifetimeSupport: "Élethosszig Tartó Támogatás",
    popularChoice: "NÉPSZERŰ",
  },
  bg: {
    heroTitle: "Изберете своя план",
    heroSub: "Отключете пълната мощ на Chronos",
    standardIncludes: "СТАНДАРТНИ ФУНКЦИИ",
    proAdds: "PRO ФУНКЦИИ",
    comingSoon: "ОЧАКВАЙТЕ СКОРО",
    bestValue: "НАЙ-ДОБРА СТОЙНОСТ",
    unlocksPro: "Отключва Pro",
    stdFeat1: "3 безплатни пробни", stdFeat1Desc: "Изпробвайте преди покупка",
    stdFeat2: "Неограничени извличания", stdFeat2Desc: "До 500 файла на извличане",
    stdFeat3: "Доживотен Standard лиценз", stdFeat3Desc: "Еднократна покупка, завинаги ваша",
    stdFeat4: "Windows контекстно меню", stdFeat4Desc: "Десен клик за извличане",
    stdFeat5: "Многонишкова обработка", stdFeat5Desc: "Паралелно изпълнение",
    stdFeat6: "Известия на работния плот", stdFeat6Desc: "Известия за завършване",
    proFeat1: "Неограничени файлове на извличане", proFeat1Desc: "Без лимит на файлове",
    proFeat2: "Управление на разширения и директории", proFeat2Desc: "Разширено включване/изключване",
    proFeat3: "Конфигурируемо автоматично разделяне", proFeat3Desc: "По размер или брой файлове",
    proFeat4: "Запазваеми потребителски предварителни настройки", proFeat4Desc: "Преизползваеми конфигурации",
    proFeat5: "Разширени шаблони", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Всички Standard функции включени", proFeat6Desc: "Всичко от Standard лиценза",
    standard: "СТАНДАРТЕН", monthly: "PRO МЕСЕЧЕН", annual: "PRO ГОДИШЕН",
    lifetimeLicense: "Доживотен лиценз", perMonth: "/месец", save50: "СПЕСТЕТЕ 43%",
    trialLeft: "безплатни останали", originalPrice: "€24,99",
    getStandard: "КУПИ СТАНДАРТЕН", getProMonthly: "КУПИ PRO МЕСЕЧЕН", getProAnnual: "КУПИ PRO ГОДИШЕН",
    joinWaitlist: "ЗАПИШИ СЕ ЗА СПИСЪКА", oneTimePayment: "Еднократно плащане",
    billedMonthly: "Таксуване месечно", billedAnnually: "Таксуване годишно за €47,88",
    viaMsStore: "през Microsoft Store",
    safePayment: "Сигурно Плащане", instantActivation: "Мигновено Активиране", lifetimeSupport: "Доживотна Поддръжка",
    popularChoice: "ПОПУЛЯРЕН",
  },
  hr: {
    heroTitle: "Odaberite svoj plan",
    heroSub: "Otključajte punu snagu Chronos",
    standardIncludes: "STANDARDNE ZNAČAJKE",
    proAdds: "PRO ZNAČAJKE",
    comingSoon: "USKORO",
    bestValue: "NAJBOLJA VRIJEDNOST",
    unlocksPro: "Otključava Pro",
    stdFeat1: "3 besplatna pokušaja", stdFeat1Desc: "Isprobajte prije kupnje",
    stdFeat2: "Neograničene ekstrakcije", stdFeat2Desc: "Do 500 datoteka po ekstrakciji",
    stdFeat3: "Doživotna Standard licenca", stdFeat3Desc: "Jednokratna kupnja, zauvijek vaša",
    stdFeat4: "Windows kontekstni izbornik", stdFeat4Desc: "Desni klik za ekstrakciju",
    stdFeat5: "Višenitna obrada", stdFeat5Desc: "Paralelno izvršavanje",
    stdFeat6: "Obavijesti na radnoj površini", stdFeat6Desc: "Obavijesti o završetku",
    proFeat1: "Neograničene datoteke po ekstrakciji", proFeat1Desc: "Bez ograničenja datoteka",
    proFeat2: "Upravljanje ekstenzijama i direktorijima", proFeat2Desc: "Napredno uključivanje/isključivanje",
    proFeat3: "Konfigurirajuće automatsko dijeljenje", proFeat3Desc: "Po veličini ili broju datoteka",
    proFeat4: "Spremljive prilagođene predloške", proFeat4Desc: "Ponovljive konfiguracije",
    proFeat5: "Napredni predlošci", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Sve Standardne značajke uključene", proFeat6Desc: "Sve iz Standardne licence",
    standard: "STANDARD", monthly: "PRO MJESEČNO", annual: "PRO GODIŠNJE",
    lifetimeLicense: "Doživotna licenca", perMonth: "/mjesec", save50: "UŠTEDITE 43%",
    trialLeft: "besplatnih preostalo", originalPrice: "€24,99",
    getStandard: "KUPI STANDARD", getProMonthly: "KUPI PRO MJESEČNO", getProAnnual: "KUPI PRO GODIŠNJE",
    joinWaitlist: "PRIDRUŽI SE LISTI ČEKANJA", oneTimePayment: "Jednokratno plaćanje",
    billedMonthly: "Naplaćuje se mjesečno", billedAnnually: "Naplaćuje se godišnje za €47,88",
    viaMsStore: "putem Microsoft Store",
    safePayment: "Sigurno Plaćanje", instantActivation: "Trenutna Aktivacija", lifetimeSupport: "Doživotna Podrška",
    popularChoice: "POPULARNO",
  },
  sk: {
    heroTitle: "Vyberte si svoj plán",
    heroSub: "Odomknite plnú silu Chronos",
    standardIncludes: "ŠTANDARDNÉ FUNKCIE",
    proAdds: "PRO FUNKCIE",
    comingSoon: "ČOSKORO",
    bestValue: "NAJLEPŠIA HODNOTA",
    unlocksPro: "Odomyká Pro",
    stdFeat1: "3 bezplatné skúšky", stdFeat1Desc: "Vyskúšajte pred nákupom",
    stdFeat2: "Neobmedzené extrakcie", stdFeat2Desc: "Až 500 súborov na extrakciu",
    stdFeat3: "Doživotná Standard licencia", stdFeat3Desc: "Jednorazový nákup, navždy vaša",
    stdFeat4: "Windows kontextové menu", stdFeat4Desc: "Pravé tlačidlo na extrakciu",
    stdFeat5: "Viacvláknové spracovanie", stdFeat5Desc: "Paralelné vykonávanie",
    stdFeat6: "Upozornenia na ploche", stdFeat6Desc: "Upozornenia na dokončenie",
    proFeat1: "Neobmedzené súbory na extrakciu", proFeat1Desc: "Žiadne limity súborov",
    proFeat2: "Správa rozšírení a adresárov", proFeat2Desc: "Pokročilé zahrnutie/vylúčenie",
    proFeat3: "Konfigurovateľné auto-delenie", proFeat3Desc: "Podľa veľkosti alebo počtu súborov",
    proFeat4: "Ukladateľné vlastné predvoľby", proFeat4Desc: "Opakovane použiteľné konfigurácie",
    proFeat5: "Pokročilé šablóny", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Všetky Štandardné funkcie zahrnuté", proFeat6Desc: "Všetko zo Štandardnej licencie",
    standard: "ŠTANDARDNÝ", monthly: "PRO MESAČNÝ", annual: "PRO ROČNÝ",
    lifetimeLicense: "Doživotná licencia", perMonth: "/mesiac", save50: "UŠETRITE 43%",
    trialLeft: "bezplatných zostáva", originalPrice: "€24,99",
    getStandard: "KÚPIŤ ŠTANDARDNÝ", getProMonthly: "KÚPIŤ PRO MESAČNÝ", getProAnnual: "KÚPIŤ PRO ROČNÝ",
    joinWaitlist: "PRIPOJTE SA K ČAKACIEMU ZOZNAMU", oneTimePayment: "Jednorazová platba",
    billedMonthly: "Účtované mesačne", billedAnnually: "Účtované ročne za €47,88",
    viaMsStore: "cez Microsoft Store",
    safePayment: "Bezpečná Platba", instantActivation: "Okamžitá Aktivácia", lifetimeSupport: "Doživotná Podpora",
    popularChoice: "OBĽÚBENÉ",
  },
  sr: {
    heroTitle: "Изаберите свој план",
    heroSub: "Откључајте пуну снагу Chronos",
    standardIncludes: "СТАНДАРДНЕ ФУНКЦИЈЕ",
    proAdds: "PRO ФУНКЦИЈЕ",
    comingSoon: "УСКОРО",
    bestValue: "НАЈБОЉА ВРЕДНОСТ",
    unlocksPro: "Откључава Pro",
    stdFeat1: "3 бесплатна покушаја", stdFeat1Desc: "Пробајте пре куповине",
    stdFeat2: "Неограничене екстракције", stdFeat2Desc: "До 500 фајлова по екстракцији",
    stdFeat3: "Доживотна Standard лиценца", stdFeat3Desc: "Једнократна куповина, заувек ваша",
    stdFeat4: "Windows контекстни мени", stdFeat4Desc: "Десни клик за екстракцију",
    stdFeat5: "Вишенитна обрада", stdFeat5Desc: "Паралелно извршавање",
    stdFeat6: "Обавештења на радној површини", stdFeat6Desc: "Обавештења о завршетку",
    proFeat1: "Неограничени фајлови по екстракцији", proFeat1Desc: "Без ограничења фајлова",
    proFeat2: "Управљање екстензијама и директоријумима", proFeat2Desc: "Напредно укључивање/искључивање",
    proFeat3: "Конфигурисано аутоматско дељење", proFeat3Desc: "По величини или броју фајлова",
    proFeat4: "Сачуване прилагођене предефиниције", proFeat4Desc: "Поново употребљиве конфигурације",
    proFeat5: "Напредни шаблони", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Све Стандардне функције укључене", proFeat6Desc: "Све из Стандардне лиценце",
    standard: "СТАНДАРДАН", monthly: "PRO МЕСЕЧНИ", annual: "PRO ГОДИШЊИ",
    lifetimeLicense: "Доживотна лиценца", perMonth: "/месец", save50: "УШТЕДИТЕ 43%",
    trialLeft: "бесплатних преостало", originalPrice: "€24,99",
    getStandard: "КУПИ СТАНДАРДАН", getProMonthly: "КУПИ PRO МЕСЕЧНИ", getProAnnual: "КУПИ PRO ГОДИШЊИ",
    joinWaitlist: "ПРИДРУЖИТЕ СЕ ЛИСТИ ЧЕКАЊА", oneTimePayment: "Једнократна уплата",
    billedMonthly: "Наплаћује се месечно", billedAnnually: "Наплаћује се годишње за €47,88",
    viaMsStore: "преко Microsoft Store",
    safePayment: "Сигурно Плаћање", instantActivation: "Тренутна Активација", lifetimeSupport: "Доживотна Подршка",
    popularChoice: "ПОПУЛАРНО",
  },
  lt: {
    heroTitle: "Pasirinkite savo planą",
    heroSub: "Atrakinkite visą Chronos galią",
    standardIncludes: "STANDARTINĖS FUNKCIJOS",
    proAdds: "PRO FUNKCIJOS",
    comingSoon: "NETRUKUS",
    bestValue: "GERIAUSIA VERTĖ",
    unlocksPro: "Atrakina Pro",
    stdFeat1: "3 nemokami bandymai", stdFeat1Desc: "Išbandykite prieš pirkdami",
    stdFeat2: "Neriboti ištraukimai", stdFeat2Desc: "Iki 500 failų per ištraukimą",
    stdFeat3: "Amžina Standard licencija", stdFeat3Desc: "Vienkartinis pirkinys, jūsų amžinai",
    stdFeat4: "Windows kontekstinis meniu", stdFeat4Desc: "Dešinys paspaudimas ištraukti",
    stdFeat5: "Daugiasriegis apdorojimas", stdFeat5Desc: "Lygiagretus vykdymas",
    stdFeat6: "Darbalaukio pranešimai", stdFeat6Desc: "Užbaigimo įspėjimai",
    proFeat1: "Neriboti failai per ištraukimą", proFeat1Desc: "Jokių failų apribojimų",
    proFeat2: "Plėtinių ir katalogų valdymas", proFeat2Desc: "Išplėstinis įtraukimas/pašalinimas",
    proFeat3: "Konfigūruojamas automatinis padalijimas", proFeat3Desc: "Pagal dydį arba failų skaičių",
    proFeat4: "Išsaugomi tinkinti nustatymai", proFeat4Desc: "Pakartotinai naudojamos konfigūracijos",
    proFeat5: "Išplėstiniai šablonai", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Visos Standartinės funkcijos įtrauktos", proFeat6Desc: "Viskas iš Standartinės licencijos",
    standard: "STANDARTINIS", monthly: "PRO MĖNESINIS", annual: "PRO METINIS",
    lifetimeLicense: "Amžina licencija", perMonth: "/mėnesį", save50: "SUTAUPYKITE 43%",
    trialLeft: "nemokami liko", originalPrice: "€24,99",
    getStandard: "PIRKTI STANDARTINĮ", getProMonthly: "PIRKTI PRO MĖNESINĮ", getProAnnual: "PIRKTI PRO METINĮ",
    joinWaitlist: "PRISIJUNGTI PRIE LAUKIMO SĄRAŠO", oneTimePayment: "Vienkartinis mokėjimas",
    billedMonthly: "Apmokestinama mėnesiškai", billedAnnually: "Apmokestinama kasmet už €47,88",
    viaMsStore: "per Microsoft Store",
    safePayment: "Saugus Mokėjimas", instantActivation: "Momentinė Aktyvacija", lifetimeSupport: "Amžinas Palaikymas",
    popularChoice: "POPULIARUS",
  },
  lv: {
    heroTitle: "Izvēlieties savu plānu",
    heroSub: "Atbloķējiet pilnu Chronos jaudu",
    standardIncludes: "STANDARTA FUNKCIJAS",
    proAdds: "PRO FUNKCIJAS",
    comingSoon: "DRĪZUMĀ",
    bestValue: "LABĀKĀ VĒRTĪBA",
    unlocksPro: "Atbloķē Pro",
    stdFeat1: "3 bezmaksas izmēģinājumi", stdFeat1Desc: "Izmēģiniet pirms pirkšanas",
    stdFeat2: "Neierobežotas ekstrahēšanas", stdFeat2Desc: "Līdz 500 failiem katrā ekstrahēšanā",
    stdFeat3: "Mūža Standard licence", stdFeat3Desc: "Vienreizējs pirkums, jūsu uz visiem laikiem",
    stdFeat4: "Windows konteksta izvēlne", stdFeat4Desc: "Labais klikšķis, lai ekstrahētu",
    stdFeat5: "Daudzpavedienu apstrāde", stdFeat5Desc: "Paralēla izpilde",
    stdFeat6: "Darbvirsmas paziņojumi", stdFeat6Desc: "Pabeigšanas brīdinājumi",
    proFeat1: "Neierobežoti faili katrā ekstrahēšanā", proFeat1Desc: "Nav failu ierobežojumu",
    proFeat2: "Paplašinājumu un direktoriju pārvaldība", proFeat2Desc: "Uzlabota iekļaušana/izslēgšana",
    proFeat3: "Konfigurējama automātiskā sadalīšana", proFeat3Desc: "Pēc izmēra vai failu skaita",
    proFeat4: "Saglabājami pielāgoti iestatījumi", proFeat4Desc: "Atkārtoti lietojamas konfigurācijas",
    proFeat5: "Uzlabotas veidnes", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Visas Standarta funkcijas iekļautas", proFeat6Desc: "Viss no Standarta licences",
    standard: "STANDARTA", monthly: "PRO IKMĒNEŠA", annual: "PRO IKGADĒJS",
    lifetimeLicense: "Mūža licence", perMonth: "/mēnesis", save50: "IETAUPIET 43%",
    trialLeft: "bezmaksas palicis", originalPrice: "€24,99",
    getStandard: "PIRKT STANDARTA", getProMonthly: "PIRKT PRO IKMĒNEŠA", getProAnnual: "PIRKT PRO IKGADĒJS",
    joinWaitlist: "PIEVIENOTIES GAIDĪŠANAS SARAKSTAM", oneTimePayment: "Vienreizējs maksājums",
    billedMonthly: "Rēķins mēnesī", billedAnnually: "Rēķins gadā par €47,88",
    viaMsStore: "caur Microsoft Store",
    safePayment: "Droša Maksāšana", instantActivation: "Tūlītēja Aktivizācija", lifetimeSupport: "Mūža Atbalsts",
    popularChoice: "POPULĀRS",
  },
  et: {
    heroTitle: "Valige oma plaan",
    heroSub: "Avage Chronosi täisjõud",
    standardIncludes: "STANDARDFUNKTSIOONID",
    proAdds: "PRO FUNKTSIOONID",
    comingSoon: "VARSTI",
    bestValue: "PARIM VÄÄRTUS",
    unlocksPro: "Avab Pro",
    stdFeat1: "3 tasuta katset", stdFeat1Desc: "Proovige enne ostmist",
    stdFeat2: "Piiramatud ekstraktsioonid", stdFeat2Desc: "Kuni 500 faili ekstraktsiooni kohta",
    stdFeat3: "Eluaegne Standard litsents", stdFeat3Desc: "Ühekordne ost, igavesti teie",
    stdFeat4: "Windowsi kontekstimenüü", stdFeat4Desc: "Paremklõps ekstraktimiseks",
    stdFeat5: "Mitmekeermeline töötlemine", stdFeat5Desc: "Paralleelne täitmine",
    stdFeat6: "Töölaua teatised", stdFeat6Desc: "Lõpetamise hoiatused",
    proFeat1: "Piiramatud failid ekstraktsiooni kohta", proFeat1Desc: "Ei ole failipiiranguid",
    proFeat2: "Laienduste ja kataloogide haldamine", proFeat2Desc: "Täiustatud kaasamine/väljajätmine",
    proFeat3: "Seadistatav automaatne jagamine", proFeat3Desc: "Suuruse või failide arvu järgi",
    proFeat4: "Salvestatavad kohandatud eelseaded", proFeat4Desc: "Taaskasutatavad konfiguratsioonid",
    proFeat5: "Täiustatud mallid", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Kõik Standardfunktsioonid sisalduvad", proFeat6Desc: "Kõik Standard litsentsist",
    standard: "STANDARD", monthly: "PRO IGAKUINE", annual: "PRO AASTALINE",
    lifetimeLicense: "Eluaegne litsents", perMonth: "/kuu", save50: "SÄÄSTA 43%",
    trialLeft: "tasuta alles", originalPrice: "€24,99",
    getStandard: "OSTA STANDARD", getProMonthly: "OSTA PRO IGAKUINE", getProAnnual: "OSTA PRO AASTALINE",
    joinWaitlist: "LIITU OOTENIMEKIRJAGA", oneTimePayment: "Ühekordne makse",
    billedMonthly: "Arve kuus", billedAnnually: "Arve aastas €47,88",
    viaMsStore: "läbi Microsoft Store",
    safePayment: "Turvaline Makse", instantActivation: "Kohene Aktiveerimine", lifetimeSupport: "Eluaegne Tugi",
    popularChoice: "POPULAARNE",
  },
  sl: {
    heroTitle: "Izberite svoj načrt",
    heroSub: "Odklenite polno moč Chronos",
    standardIncludes: "STANDARDNE FUNKCIJE",
    proAdds: "PRO FUNKCIJE",
    comingSoon: "KMALU",
    bestValue: "NAJBOLJŠA VREDNOST",
    unlocksPro: "Odklene Pro",
    stdFeat1: "3 brezplačni poskusi", stdFeat1Desc: "Poskusite pred nakupom",
    stdFeat2: "Neomejene ekstrakcije", stdFeat2Desc: "Do 500 datotek na ekstrakcijo",
    stdFeat3: "Dosmrtna Standard licenca", stdFeat3Desc: "Enkratni nakup, za vedno vaša",
    stdFeat4: "Windows kontekstni meni", stdFeat4Desc: "Desni klik za ekstrakcijo",
    stdFeat5: "Večnitna obdelava", stdFeat5Desc: "Vzporedna izvedba",
    stdFeat6: "Obvestila na namizju", stdFeat6Desc: "Opozorila ob zaključku",
    proFeat1: "Neomejene datoteke na ekstrakcijo", proFeat1Desc: "Brez omejitev datotek",
    proFeat2: "Upravljanje razširitev in imenikov", proFeat2Desc: "Napredno vključevanje/izključevanje",
    proFeat3: "Nastavljivo samodejno deljenje", proFeat3Desc: "Po velikosti ali številu datotek",
    proFeat4: "Shranjene prilagojene prednastavitve", proFeat4Desc: "Ponovno uporabne konfiguracije",
    proFeat5: "Napredne predloge", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Vse Standardne funkcije vključene", proFeat6Desc: "Vse iz Standardne licence",
    standard: "STANDARDNI", monthly: "PRO MESEČNI", annual: "PRO LETNI",
    lifetimeLicense: "Dosmrtna licenca", perMonth: "/mesec", save50: "PRIHRANITE 43%",
    trialLeft: "brezplačnih ostane", originalPrice: "€24,99",
    getStandard: "KUPI STANDARDNI", getProMonthly: "KUPI PRO MESEČNI", getProAnnual: "KUPI PRO LETNI",
    joinWaitlist: "PRIDRUŽI SE ČAKALNI LISTI", oneTimePayment: "Enkratno plačilo",
    billedMonthly: "Zaračunano mesečno", billedAnnually: "Zaračunano letno za €47,88",
    viaMsStore: "prek Microsoft Store",
    safePayment: "Varno Plačilo", instantActivation: "Takojšnja Aktivacija", lifetimeSupport: "Dosmrtna Podpora",
    popularChoice: "PRILJUBLJENO",
  },
  uk: {
    heroTitle: "Виберіть свій план",
    heroSub: "Розблокуйте повну потужність Chronos",
    standardIncludes: "СТАНДАРТНІ ФУНКЦІЇ",
    proAdds: "PRO ФУНКЦІЇ",
    comingSoon: "НЕЗАБАРОМ",
    bestValue: "НАЙКРАЩА ЦІННІСТЬ",
    unlocksPro: "Розблокує Pro",
    stdFeat1: "3 безкоштовні спроби", stdFeat1Desc: "Спробуйте перед покупкою",
    stdFeat2: "Необмежені вилучення", stdFeat2Desc: "До 500 файлів на вилучення",
    stdFeat3: "Довічна Standard ліцензія", stdFeat3Desc: "Одноразова покупка, ваша назавжди",
    stdFeat4: "Контекстне меню Windows", stdFeat4Desc: "Правий клік для вилучення",
    stdFeat5: "Багатопотокова обробка", stdFeat5Desc: "Паралельне виконання",
    stdFeat6: "Сповіщення на робочому столі", stdFeat6Desc: "Сповіщення про завершення",
    proFeat1: "Необмежені файли на вилучення", proFeat1Desc: "Без обмежень файлів",
    proFeat2: "Управління розширеннями та каталогами", proFeat2Desc: "Розширене включення/виключення",
    proFeat3: "Налаштоване автоматичне розділення", proFeat3Desc: "За розміром або кількістю файлів",
    proFeat4: "Збережені користувацькі налаштування", proFeat4Desc: "Повторно використовувані конфігурації",
    proFeat5: "Розширені шаблони", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Усі Стандартні функції включені", proFeat6Desc: "Все зі Стандартної ліцензії",
    standard: "СТАНДАРТНИЙ", monthly: "PRO ЩОМІСЯЧНИЙ", annual: "PRO РІЧНИЙ",
    lifetimeLicense: "Довічна ліцензія", perMonth: "/місяць", save50: "ЗАОЩАДЖУЙТЕ 43%",
    trialLeft: "безкоштовних залишилось", originalPrice: "€24,99",
    getStandard: "ПРИДБАТИ СТАНДАРТНИЙ", getProMonthly: "ПРИДБАТИ PRO ЩОМІСЯЧНИЙ", getProAnnual: "ПРИДБАТИ PRO РІЧНИЙ",
    joinWaitlist: "ПРИЄДНАТИСЯ ДО СПИСКУ ОЧІКУВАННЯ", oneTimePayment: "Одноразовий платіж",
    billedMonthly: "Рахунок щомісяця", billedAnnually: "Рахунок щорічно за €47,88",
    viaMsStore: "через Microsoft Store",
    safePayment: "Безпечний Платіж", instantActivation: "Миттєва Активація", lifetimeSupport: "Довічна Підтримка",
    popularChoice: "ПОПУЛЯРНИЙ",
  },
  zh: {
    heroTitle: "选择您的计划",
    heroSub: "解锁 Chronos 的全部功能",
    standardIncludes: "标准功能", proAdds: "PRO 功能",
    comingSoon: "即将推出", bestValue: "最佳价值", unlocksPro: "解锁 Pro",
    stdFeat1: "3 次免费试用", stdFeat1Desc: "购买前试用",
    stdFeat2: "无限提取", stdFeat2Desc: "每次提取最多 500 个文件",
    stdFeat3: "终身标准许可证", stdFeat3Desc: "一次购买，永久拥有",
    stdFeat4: "Windows 右键菜单", stdFeat4Desc: "右键单击提取",
    stdFeat5: "多线程处理", stdFeat5Desc: "并行执行",
    stdFeat6: "桌面通知", stdFeat6Desc: "完成提醒",
    proFeat1: "每次提取无限文件", proFeat1Desc: "无文件数量限制",
    proFeat2: "扩展名和目录管理", proFeat2Desc: "高级包含/排除",
    proFeat3: "可配置自动拆分", proFeat3Desc: "按大小或文件数量",
    proFeat4: "可保存自定义预设", proFeat4Desc: "可重复使用的配置",
    proFeat5: "高级模板", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "包含所有标准功能", proFeat6Desc: "标准许可证的一切",
    standard: "标准版", monthly: "PRO 月付", annual: "PRO 年付",
    lifetimeLicense: "终身许可证", perMonth: "/月", save50: "节省 43%",
    trialLeft: "次免费剩余", originalPrice: "€24.99",
    getStandard: "购买标准版", getProMonthly: "购买 PRO 月付", getProAnnual: "购买 PRO 年付",
    joinWaitlist: "加入等候名单", oneTimePayment: "一次性付款",
    billedMonthly: "按月计费", billedAnnually: "按年计费 €47.88",
    viaMsStore: "通过 Microsoft Store",
    safePayment: "安全支付", instantActivation: "即时激活", lifetimeSupport: "终身支持",
    popularChoice: "热门",
  },
  ja: {
    heroTitle: "プランを選択",
    heroSub: "Chronos のフルパワーを解放",
    standardIncludes: "スタンダード機能", proAdds: "PRO 機能",
    comingSoon: "近日公開", bestValue: "最高の価値", unlocksPro: "Pro を解放",
    stdFeat1: "3回の無料トライアル", stdFeat1Desc: "購入前にお試し",
    stdFeat2: "無制限の抽出", stdFeat2Desc: "1回あたり最大500ファイル",
    stdFeat3: "生涯スタンダードライセンス", stdFeat3Desc: "一度の購入で永久に",
    stdFeat4: "Windows コンテキストメニュー", stdFeat4Desc: "右クリックで抽出",
    stdFeat5: "マルチスレッド処理", stdFeat5Desc: "並列実行",
    stdFeat6: "デスクトップ通知", stdFeat6Desc: "完了アラート",
    proFeat1: "抽出ごとに無制限のファイル", proFeat1Desc: "ファイル数制限なし",
    proFeat2: "拡張子とディレクトリ管理", proFeat2Desc: "高度な包含/除外",
    proFeat3: "設定可能な自動分割", proFeat3Desc: "サイズまたはファイル数で",
    proFeat4: "保存可能なカスタムプリセット", proFeat4Desc: "再利用可能な設定",
    proFeat5: "高度なテンプレート", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "すべてのスタンダード機能を含む", proFeat6Desc: "スタンダードライセンスのすべて",
    standard: "スタンダード", monthly: "PRO 月額", annual: "PRO 年額",
    lifetimeLicense: "生涯ライセンス", perMonth: "/月", save50: "43% 節約",
    trialLeft: "回無料残り", originalPrice: "€24.99",
    getStandard: "スタンダード購入", getProMonthly: "PRO 月額購入", getProAnnual: "PRO 年額購入",
    joinWaitlist: "ウェイトリストに参加", oneTimePayment: "一括払い",
    billedMonthly: "月次請求", billedAnnually: "年間請求 €47.88",
    viaMsStore: "Microsoft Store 経由",
    safePayment: "安全な決済", instantActivation: "即時アクティベーション", lifetimeSupport: "生涯サポート",
    popularChoice: "人気",
  },
  ko: {
    heroTitle: "플랜을 선택하세요",
    heroSub: "Chronos의 전체 기능을 잠금 해제하세요",
    standardIncludes: "스탠다드 기능", proAdds: "PRO 기능",
    comingSoon: "출시 예정", bestValue: "최고 가치", unlocksPro: "Pro 잠금 해제",
    stdFeat1: "3회 무료 체험", stdFeat1Desc: "구매 전 체험",
    stdFeat2: "무제한 추출", stdFeat2Desc: "추출당 최대 500개 파일",
    stdFeat3: "평생 스탠다드 라이선스", stdFeat3Desc: "일회성 구매, 영원히 소유",
    stdFeat4: "Windows 컨텍스트 메뉴", stdFeat4Desc: "우클릭으로 추출",
    stdFeat5: "멀티스레드 처리", stdFeat5Desc: "병렬 실행",
    stdFeat6: "데스크톱 알림", stdFeat6Desc: "완료 알림",
    proFeat1: "추출당 무제한 파일", proFeat1Desc: "파일 수 제한 없음",
    proFeat2: "확장자 및 디렉토리 관리", proFeat2Desc: "고급 포함/제외",
    proFeat3: "구성 가능한 자동 분할", proFeat3Desc: "크기 또는 파일 수 기준",
    proFeat4: "저장 가능한 사용자 정의 프리셋", proFeat4Desc: "재사용 가능한 구성",
    proFeat5: "고급 템플릿", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "모든 스탠다드 기능 포함", proFeat6Desc: "스탠다드 라이선스의 모든 것",
    standard: "스탠다드", monthly: "PRO 월간", annual: "PRO 연간",
    lifetimeLicense: "평생 라이선스", perMonth: "/월", save50: "43% 절약",
    trialLeft: "회 무료 남음", originalPrice: "€24.99",
    getStandard: "스탠다드 구매", getProMonthly: "PRO 월간 구매", getProAnnual: "PRO 연간 구매",
    joinWaitlist: "대기자 명단 가입", oneTimePayment: "일회성 결제",
    billedMonthly: "월별 청구", billedAnnually: "연간 청구 €47.88",
    viaMsStore: "Microsoft Store를 통해",
    safePayment: "안전한 결제", instantActivation: "즉시 활성화", lifetimeSupport: "평생 지원",
    popularChoice: "인기",
  },
  hi: {
    heroTitle: "अपनी योजना चुनें",
    heroSub: "Chronos की पूरी शक्ति अनलॉक करें",
    standardIncludes: "स्टैंडर्ड सुविधाएँ", proAdds: "PRO सुविधाएँ",
    comingSoon: "जल्द आ रहा है", bestValue: "सर्वोत्तम मूल्य", unlocksPro: "Pro अनलॉक करें",
    stdFeat1: "3 मुफ्त परीक्षण", stdFeat1Desc: "खरीदने से पहले आज़माएं",
    stdFeat2: "असीमित निष्कर्षण", stdFeat2Desc: "प्रति निष्कर्षण 500 फ़ाइलें तक",
    stdFeat3: "आजीवन स्टैंडर्ड लाइसेंस", stdFeat3Desc: "एकमुश्त खरीद, हमेशा आपका",
    stdFeat4: "Windows संदर्भ मेनू", stdFeat4Desc: "राइट-क्लिक करके निकालें",
    stdFeat5: "मल्टी-थ्रेड प्रोसेसिंग", stdFeat5Desc: "समानांतर निष्पादन",
    stdFeat6: "डेस्कटॉप सूचनाएं", stdFeat6Desc: "पूर्णता अलर्ट",
    proFeat1: "प्रति निष्कर्षण असीमित फ़ाइलें", proFeat1Desc: "कोई फ़ाइल सीमा नहीं",
    proFeat2: "एक्सटेंशन और डायरेक्टरी प्रबंधन", proFeat2Desc: "उन्नत शामिल/बाहर",
    proFeat3: "कॉन्फ़िगर करने योग्य ऑटो-स्प्लिट", proFeat3Desc: "आकार या फ़ाइल संख्या द्वारा",
    proFeat4: "सेव करने योग्य कस्टम प्रीसेट", proFeat4Desc: "पुन: प्रयोज्य कॉन्फ़िगरेशन",
    proFeat5: "उन्नत टेम्प्लेट", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "सभी स्टैंडर्ड सुविधाएँ शामिल", proFeat6Desc: "स्टैंडर्ड लाइसेंस से सब कुछ",
    standard: "स्टैंडर्ड", monthly: "PRO मासिक", annual: "PRO वार्षिक",
    lifetimeLicense: "आजीवन लाइसेंस", perMonth: "/माह", save50: "43% बचाएं",
    trialLeft: "मुफ्त शेष", originalPrice: "€24.99",
    getStandard: "स्टैंडर्ड खरीदें", getProMonthly: "PRO मासिक खरीदें", getProAnnual: "PRO वार्षिक खरीदें",
    joinWaitlist: "प्रतीक्षा सूची में शामिल हों", oneTimePayment: "एकमुश्त भुगतान",
    billedMonthly: "मासिक बिल", billedAnnually: "वार्षिक बिल €47.88",
    viaMsStore: "Microsoft Store के माध्यम से",
    safePayment: "सुरक्षित भुगतान", instantActivation: "तत्काल सक्रियण", lifetimeSupport: "आजीवन सहायता",
    popularChoice: "लोकप्रिय",
  },
  th: {
    heroTitle: "เลือกแผนของคุณ",
    heroSub: "ปลดล็อกพลังเต็มรูปแบบของ Chronos",
    standardIncludes: "ฟีเจอร์มาตรฐาน", proAdds: "ฟีเจอร์ PRO",
    comingSoon: "เร็วๆ นี้", bestValue: "คุ้มค่าที่สุด", unlocksPro: "ปลดล็อก Pro",
    stdFeat1: "ทดลองฟรี 3 ครั้ง", stdFeat1Desc: "ลองก่อนซื้อ",
    stdFeat2: "แยกไฟล์ไม่จำกัด", stdFeat2Desc: "สูงสุด 500 ไฟล์ต่อครั้ง",
    stdFeat3: "ใบอนุญาตมาตรฐานตลอดชีพ", stdFeat3Desc: "ซื้อครั้งเดียว เป็นของคุณตลอดไป",
    stdFeat4: "เมนูคลิกขวา Windows", stdFeat4Desc: "คลิกขวาเพื่อแยกไฟล์",
    stdFeat5: "ประมวลผลหลายเธรด", stdFeat5Desc: "ทำงานแบบขนาน",
    stdFeat6: "การแจ้งเตือนเดสก์ท็อป", stdFeat6Desc: "แจ้งเตือนเมื่อเสร็จ",
    proFeat1: "ไฟล์ไม่จำกัดต่อการแยก", proFeat1Desc: "ไม่มีข้อจำกัดจำนวนไฟล์",
    proFeat2: "จัดการนามสกุลและไดเรกทอรี", proFeat2Desc: "รวม/ไม่รวมขั้นสูง",
    proFeat3: "แบ่งอัตโนมัติที่ปรับได้", proFeat3Desc: "ตามขนาดหรือจำนวนไฟล์",
    proFeat4: "พรีเซ็ตที่บันทึกได้", proFeat4Desc: "การตั้งค่าที่ใช้ซ้ำได้",
    proFeat5: "เทมเพลตขั้นสูง", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "รวมฟีเจอร์มาตรฐานทั้งหมด", proFeat6Desc: "ทุกอย่างจากใบอนุญาตมาตรฐาน",
    standard: "มาตรฐาน", monthly: "PRO รายเดือน", annual: "PRO รายปี",
    lifetimeLicense: "ใบอนุญาตตลอดชีพ", perMonth: "/เดือน", save50: "ประหยัด 43%",
    trialLeft: "ครั้งฟรีเหลือ", originalPrice: "€24.99",
    getStandard: "ซื้อมาตรฐาน", getProMonthly: "ซื้อ PRO รายเดือน", getProAnnual: "ซื้อ PRO รายปี",
    joinWaitlist: "เข้าร่วมรายชื่อรอ", oneTimePayment: "ชำระครั้งเดียว",
    billedMonthly: "เรียกเก็บรายเดือน", billedAnnually: "เรียกเก็บรายปี €47.88",
    viaMsStore: "ผ่าน Microsoft Store",
    safePayment: "ชำระเงินปลอดภัย", instantActivation: "เปิดใช้งานทันที", lifetimeSupport: "สนับสนุนตลอดชีพ",
    popularChoice: "ยอดนิยม",
  },
  vi: {
    heroTitle: "Chọn gói của bạn",
    heroSub: "Mở khóa toàn bộ sức mạnh của Chronos",
    standardIncludes: "TÍNH NĂNG TIÊU CHUẨN", proAdds: "TÍNH NĂNG PRO",
    comingSoon: "SẮP RA MẮT", bestValue: "GIÁ TRỊ TỐT NHẤT", unlocksPro: "Mở khóa Pro",
    stdFeat1: "3 lần dùng thử miễn phí", stdFeat1Desc: "Dùng thử trước khi mua",
    stdFeat2: "Trích xuất không giới hạn", stdFeat2Desc: "Tối đa 500 tệp mỗi lần",
    stdFeat3: "Giấy phép Tiêu chuẩn trọn đời", stdFeat3Desc: "Mua một lần, sở hữu mãi",
    stdFeat4: "Menu chuột phải Windows", stdFeat4Desc: "Nhấp chuột phải để trích xuất",
    stdFeat5: "Xử lý đa luồng", stdFeat5Desc: "Thực thi song song",
    stdFeat6: "Thông báo máy tính", stdFeat6Desc: "Cảnh báo hoàn thành",
    proFeat1: "Tệp không giới hạn mỗi lần trích xuất", proFeat1Desc: "Không giới hạn số tệp",
    proFeat2: "Quản lý phần mở rộng & thư mục", proFeat2Desc: "Bao gồm/loại trừ nâng cao",
    proFeat3: "Tự động chia có thể cấu hình", proFeat3Desc: "Theo kích thước hoặc số tệp",
    proFeat4: "Preset tùy chỉnh có thể lưu", proFeat4Desc: "Cấu hình tái sử dụng",
    proFeat5: "Mẫu nâng cao", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Bao gồm tất cả tính năng Tiêu chuẩn", proFeat6Desc: "Mọi thứ từ giấy phép Tiêu chuẩn",
    standard: "TIÊU CHUẨN", monthly: "PRO HÀNG THÁNG", annual: "PRO HÀNG NĂM",
    lifetimeLicense: "Giấy phép trọn đời", perMonth: "/tháng", save50: "TIẾT KIỆM 43%",
    trialLeft: "lần miễn phí còn lại", originalPrice: "€24,99",
    getStandard: "MUA TIÊU CHUẨN", getProMonthly: "MUA PRO HÀNG THÁNG", getProAnnual: "MUA PRO HÀNG NĂM",
    joinWaitlist: "THAM GIA DANH SÁCH CHỜ", oneTimePayment: "Thanh toán một lần",
    billedMonthly: "Thanh toán hàng tháng", billedAnnually: "Thanh toán hàng năm €47,88",
    viaMsStore: "qua Microsoft Store",
    safePayment: "Thanh toán An toàn", instantActivation: "Kích hoạt Ngay", lifetimeSupport: "Hỗ trợ Trọn đời",
    popularChoice: "PHỔ BIẾN",
  },
  id: {
    heroTitle: "Pilih paket Anda",
    heroSub: "Buka kekuatan penuh Chronos",
    standardIncludes: "FITUR STANDAR", proAdds: "FITUR PRO",
    comingSoon: "SEGERA HADIR", bestValue: "NILAI TERBAIK", unlocksPro: "Buka Pro",
    stdFeat1: "3 percobaan gratis", stdFeat1Desc: "Coba sebelum beli",
    stdFeat2: "Ekstraksi tak terbatas", stdFeat2Desc: "Hingga 500 file per ekstraksi",
    stdFeat3: "Lisensi Standar seumur hidup", stdFeat3Desc: "Beli sekali, milik Anda selamanya",
    stdFeat4: "Menu konteks Windows", stdFeat4Desc: "Klik kanan untuk mengekstrak",
    stdFeat5: "Pemrosesan multi-thread", stdFeat5Desc: "Eksekusi paralel",
    stdFeat6: "Notifikasi desktop", stdFeat6Desc: "Peringatan penyelesaian",
    proFeat1: "File tak terbatas per ekstraksi", proFeat1Desc: "Tanpa batas file",
    proFeat2: "Manajemen ekstensi & direktori", proFeat2Desc: "Sertakan/kecualikan lanjutan",
    proFeat3: "Pemisahan otomatis yang dapat dikonfigurasi", proFeat3Desc: "Berdasarkan ukuran atau jumlah file",
    proFeat4: "Preset kustom yang dapat disimpan", proFeat4Desc: "Konfigurasi yang dapat digunakan ulang",
    proFeat5: "Template lanjutan", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Semua fitur Standar termasuk", proFeat6Desc: "Semua dari lisensi Standar",
    standard: "STANDAR", monthly: "PRO BULANAN", annual: "PRO TAHUNAN",
    lifetimeLicense: "Lisensi seumur hidup", perMonth: "/bulan", save50: "HEMAT 43%",
    trialLeft: "gratis tersisa", originalPrice: "€24,99",
    getStandard: "BELI STANDAR", getProMonthly: "BELI PRO BULANAN", getProAnnual: "BELI PRO TAHUNAN",
    joinWaitlist: "GABUNG DAFTAR TUNGGU", oneTimePayment: "Pembayaran satu kali",
    billedMonthly: "Ditagih bulanan", billedAnnually: "Ditagih tahunan €47,88",
    viaMsStore: "melalui Microsoft Store",
    safePayment: "Pembayaran Aman", instantActivation: "Aktivasi Instan", lifetimeSupport: "Dukungan Seumur Hidup",
    popularChoice: "POPULER",
  },
  ar: {
    heroTitle: "اختر خطتك",
    heroSub: "أطلق العنان لكامل قوة Chronos",
    standardIncludes: "ميزات قياسية", proAdds: "ميزات PRO",
    comingSoon: "قريباً", bestValue: "أفضل قيمة", unlocksPro: "فتح Pro",
    stdFeat1: "3 تجارب مجانية", stdFeat1Desc: "جرّب قبل الشراء",
    stdFeat2: "استخراج غير محدود", stdFeat2Desc: "حتى 500 ملف لكل استخراج",
    stdFeat3: "ترخيص قياسي مدى الحياة", stdFeat3Desc: "شراء لمرة واحدة، ملكك للأبد",
    stdFeat4: "قائمة سياق Windows", stdFeat4Desc: "انقر بزر الماوس الأيمن للاستخراج",
    stdFeat5: "معالجة متعددة الخيوط", stdFeat5Desc: "تنفيذ متوازٍ",
    stdFeat6: "إشعارات سطح المكتب", stdFeat6Desc: "تنبيهات الإكمال",
    proFeat1: "ملفات غير محدودة لكل استخراج", proFeat1Desc: "بدون حدود للملفات",
    proFeat2: "إدارة الامتدادات والمجلدات", proFeat2Desc: "تضمين/استبعاد متقدم",
    proFeat3: "تقسيم تلقائي قابل للتكوين", proFeat3Desc: "حسب الحجم أو عدد الملفات",
    proFeat4: "إعدادات مسبقة مخصصة قابلة للحفظ", proFeat4Desc: "تكوينات قابلة لإعادة الاستخدام",
    proFeat5: "قوالب متقدمة", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "جميع الميزات القياسية مشمولة", proFeat6Desc: "كل شيء من الترخيص القياسي",
    standard: "قياسي", monthly: "PRO شهري", annual: "PRO سنوي",
    lifetimeLicense: "ترخيص مدى الحياة", perMonth: "/شهر", save50: "وفر 43%",
    trialLeft: "مجانية متبقية", originalPrice: "€24.99",
    getStandard: "شراء القياسي", getProMonthly: "شراء PRO الشهري", getProAnnual: "شراء PRO السنوي",
    joinWaitlist: "انضم لقائمة الانتظار", oneTimePayment: "دفعة واحدة",
    billedMonthly: "فوترة شهرية", billedAnnually: "فوترة سنوية €47.88",
    viaMsStore: "عبر Microsoft Store",
    safePayment: "دفع آمن", instantActivation: "تفعيل فوري", lifetimeSupport: "دعم مدى الحياة",
    popularChoice: "شائع",
  },
  he: {
    heroTitle: "בחר את התוכנית שלך",
    heroSub: "שחרר את מלוא העוצמה של Chronos",
    standardIncludes: "תכונות סטנדרט", proAdds: "תכונות PRO",
    comingSoon: "בקרוב", bestValue: "הערך הטוב ביותר", unlocksPro: "שחרר Pro",
    stdFeat1: "3 ניסיונות חינם", stdFeat1Desc: "נסה לפני שתקנה",
    stdFeat2: "חילוצים ללא הגבלה", stdFeat2Desc: "עד 500 קבצים לחילוץ",
    stdFeat3: "רישיון סטנדרט לכל החיים", stdFeat3Desc: "רכישה חד פעמית, שלך לתמיד",
    stdFeat4: "תפריט הקשר של Windows", stdFeat4Desc: "לחץ ימני לחילוץ",
    stdFeat5: "עיבוד רב-הליכי", stdFeat5Desc: "ביצוע מקבילי",
    stdFeat6: "התראות שולחן עבודה", stdFeat6Desc: "התראות השלמה",
    proFeat1: "קבצים ללא הגבלה לחילוץ", proFeat1Desc: "ללא מגבלת קבצים",
    proFeat2: "ניהול סיומות ותיקיות", proFeat2Desc: "הכללה/החרגה מתקדמת",
    proFeat3: "פיצול אוטומטי הניתן להגדרה", proFeat3Desc: "לפי גודל או מספר קבצים",
    proFeat4: "הגדרות מוגדרות מראש שניתן לשמור", proFeat4Desc: "תצורות לשימוש חוזר",
    proFeat5: "תבניות מתקדמות", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "כל תכונות הסטנדרט כלולות", proFeat6Desc: "הכל מרישיון הסטנדרט",
    standard: "סטנדרט", monthly: "PRO חודשי", annual: "PRO שנתי",
    lifetimeLicense: "רישיון לכל החיים", perMonth: "/חודש", save50: "חסוך 43%",
    trialLeft: "חינם נותרו", originalPrice: "€24.99",
    getStandard: "קנה סטנדרט", getProMonthly: "קנה PRO חודשי", getProAnnual: "קנה PRO שנתי",
    joinWaitlist: "הצטרף לרשימת המתנה", oneTimePayment: "תשלום חד פעמי",
    billedMonthly: "חיוב חודשי", billedAnnually: "חיוב שנתי €47.88",
    viaMsStore: "דרך Microsoft Store",
    safePayment: "תשלום מאובטח", instantActivation: "הפעלה מיידית", lifetimeSupport: "תמיכה לכל החיים",
    popularChoice: "פופולרי",
  },
  tr: {
    heroTitle: "Planınızı seçin",
    heroSub: "Chronos'in tüm gücünü açın",
    standardIncludes: "STANDART ÖZELLİKLER", proAdds: "PRO ÖZELLİKLER",
    comingSoon: "YAKINDA", bestValue: "EN İYİ DEĞER", unlocksPro: "Pro'yu aç",
    stdFeat1: "3 ücretsiz deneme", stdFeat1Desc: "Satın almadan önce deneyin",
    stdFeat2: "Sınırsız çıkarım", stdFeat2Desc: "Çıkarım başına 500 dosyaya kadar",
    stdFeat3: "Ömür boyu Standart lisans", stdFeat3Desc: "Tek seferlik satın alma, sonsuza dek sizin",
    stdFeat4: "Windows sağ tıklama menüsü", stdFeat4Desc: "Sağ tıklayarak çıkarın",
    stdFeat5: "Çok iş parçacıklı işleme", stdFeat5Desc: "Paralel yürütme",
    stdFeat6: "Masaüstü bildirimleri", stdFeat6Desc: "Tamamlanma uyarıları",
    proFeat1: "Çıkarım başına sınırsız dosya", proFeat1Desc: "Dosya limiti yok",
    proFeat2: "Uzantı ve dizin yönetimi", proFeat2Desc: "Gelişmiş dahil et/hariç tut",
    proFeat3: "Yapılandırılabilir otomatik bölme", proFeat3Desc: "Boyuta veya dosya sayısına göre",
    proFeat4: "Kaydedilebilir özel ön ayarlar", proFeat4Desc: "Yeniden kullanılabilir yapılandırmalar",
    proFeat5: "Gelişmiş şablonlar", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Tüm Standart özellikler dahil", proFeat6Desc: "Standart lisanstaki her şey",
    standard: "STANDART", monthly: "PRO AYLIK", annual: "PRO YILLIK",
    lifetimeLicense: "Ömür boyu lisans", perMonth: "/ay", save50: "%43 TASARRUF",
    trialLeft: "ücretsiz kaldı", originalPrice: "€24,99",
    getStandard: "STANDART AL", getProMonthly: "PRO AYLIK AL", getProAnnual: "PRO YILLIK AL",
    joinWaitlist: "BEKLEME LİSTESİNE KATIL", oneTimePayment: "Tek seferlik ödeme",
    billedMonthly: "Aylık faturalandırılır", billedAnnually: "Yıllık faturalandırılır €47,88",
    viaMsStore: "Microsoft Store üzerinden",
    safePayment: "Güvenli Ödeme", instantActivation: "Anında Aktivasyon", lifetimeSupport: "Ömür Boyu Destek",
    popularChoice: "POPÜLER",
  },
  ru: {
    heroTitle: "Выберите свой план",
    heroSub: "Раскройте всю мощь Chronos",
    standardIncludes: "СТАНДАРТНЫЕ ФУНКЦИИ", proAdds: "PRO ФУНКЦИИ",
    comingSoon: "СКОРО", bestValue: "ЛУЧШАЯ ЦЕННОСТЬ", unlocksPro: "Разблокировать Pro",
    stdFeat1: "3 бесплатных пробных", stdFeat1Desc: "Попробуйте перед покупкой",
    stdFeat2: "Неограниченные извлечения", stdFeat2Desc: "До 500 файлов за извлечение",
    stdFeat3: "Пожизненная Standard лицензия", stdFeat3Desc: "Разовая покупка, навсегда ваша",
    stdFeat4: "Контекстное меню Windows", stdFeat4Desc: "Правый клик для извлечения",
    stdFeat5: "Многопоточная обработка", stdFeat5Desc: "Параллельное выполнение",
    stdFeat6: "Уведомления на рабочем столе", stdFeat6Desc: "Оповещения о завершении",
    proFeat1: "Неограниченные файлы за извлечение", proFeat1Desc: "Без лимита файлов",
    proFeat2: "Управление расширениями и каталогами", proFeat2Desc: "Расширенное включение/исключение",
    proFeat3: "Настраиваемое автоматическое разделение", proFeat3Desc: "По размеру или количеству файлов",
    proFeat4: "Сохраняемые пользовательские пресеты", proFeat4Desc: "Повторно используемые конфигурации",
    proFeat5: "Расширенные шаблоны", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Все функции Standard включены", proFeat6Desc: "Всё из Standard лицензии",
    standard: "СТАНДАРТ", monthly: "PRO ЕЖЕМЕСЯЧНЫЙ", annual: "PRO ГОДОВОЙ",
    lifetimeLicense: "Пожизненная лицензия", perMonth: "/месяц", save50: "ЭКОНОМИЯ 43%",
    trialLeft: "бесплатных осталось", originalPrice: "€24,99",
    getStandard: "КУПИТЬ СТАНДАРТ", getProMonthly: "КУПИТЬ PRO ЕЖЕМЕСЯЧНЫЙ", getProAnnual: "КУПИТЬ PRO ГОДОВОЙ",
    joinWaitlist: "В СПИСОК ОЖИДАНИЯ", oneTimePayment: "Разовый платёж",
    billedMonthly: "Ежемесячная оплата", billedAnnually: "Годовая оплата €47,88",
    viaMsStore: "через Microsoft Store",
    safePayment: "Безопасная Оплата", instantActivation: "Мгновенная Активация", lifetimeSupport: "Пожизненная Поддержка",
    popularChoice: "ПОПУЛЯРНЫЙ",
  },
};

interface PlanCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  subtitle: string;
  planId: string;
  isHero?: boolean;
  isComingSoon?: boolean;
  savings?: string;
  discountBadge?: string;
  trialInfo?: string;
  isSelected: boolean;
  onSelect: (planId: string) => void;
  bestValueLabel?: string;
  comingSoonLabel?: string;
  unlocksProLabel?: string;
  index?: number;
  popularLabel?: string; // #9: Badge for popular choice
}

const PlanCard = ({
  title,
  price,
  originalPrice,
  subtitle,
  planId,
  isHero = false,
  isComingSoon = false,
  savings,
  discountBadge,
  trialInfo,
  isSelected,
  onSelect,
  bestValueLabel,
  comingSoonLabel,
  unlocksProLabel,
  index = 0,
  popularLabel,
}: PlanCardProps) => {
  // Card with smoother spring transition (#9)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.1 + index * 0.1, 
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ scale: isComingSoon ? 1 : 1.03, y: isComingSoon ? 0 : -4 }}
      whileTap={{ scale: isComingSoon ? 1 : 0.97 }}
      onClick={() => {
        if (!isComingSoon) {
          onSelect(planId);
          trackEvent('plan_selected', { plan: planId });

          // Emit event for PyQt6 bridge
          window.dispatchEvent(new CustomEvent('lovable:plan-selected', {
            detail: { planId }
          }));
        }
      }}
      className={cn(
        // Dimensioni ottimizzate: min-h auto per adattarsi al contenuto, larghezza fissa per allineamento
        "relative flex flex-col items-center rounded-xl cursor-pointer transition-all duration-300",
        "w-full max-w-[240px] md:w-[210px] min-w-[200px] min-h-[220px] h-auto",
        // Padding generoso e bilanciato: più spazio in alto per badge, uniforme ai lati
        "px-5 pt-10 pb-5",
        // Overflow visible per permettere ai badge di estendersi oltre i bordi
        "overflow-visible",
        // #3: Gradient border hover effect + #8: Glass effect on selected
        // #10: Focus ring for accessibility
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isSelected && !isComingSoon
          ? "border-2 border-primary bg-gradient-to-br from-primary/10 via-background to-accent/5 dark:bg-card/90 dark:from-card dark:to-card backdrop-blur-sm shadow-lg"
          : "border border-border/60 bg-gradient-to-br from-muted/20 via-background to-primary/3 dark:bg-card dark:from-card dark:to-card hover:border-primary/50 hover:from-primary/8 hover:to-accent/8 dark:hover:border-primary/40 hover:shadow-md",
        isComingSoon && "opacity-60 cursor-not-allowed"
      )}
      tabIndex={isComingSoon ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isComingSoon) {
            onSelect(planId);
            trackEvent('plan_selected', { plan: planId });
          }
        }
      }}
    >
      {/* Layered shadows + animated glow for selected card (#2, #8) */}
      {isSelected && !isComingSoon && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            boxShadow: [
              '0 4px 6px -1px hsl(var(--primary) / 0.1), 0 2px 4px -2px hsl(var(--primary) / 0.1), 0 0 20px hsl(var(--primary) / 0.2), 0 0 40px hsl(var(--primary) / 0.1)',
              '0 10px 15px -3px hsl(var(--primary) / 0.15), 0 4px 6px -4px hsl(var(--primary) / 0.15), 0 0 30px hsl(var(--primary) / 0.35), 0 0 60px hsl(var(--primary) / 0.2)',
              '0 4px 6px -1px hsl(var(--primary) / 0.1), 0 2px 4px -2px hsl(var(--primary) / 0.1), 0 0 20px hsl(var(--primary) / 0.2), 0 0 40px hsl(var(--primary) / 0.1)'
            ]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* #4: Best Value ribbon/diagonal badge - uses clip-path for clean corners */}
      {isHero && !isComingSoon && bestValueLabel && (
        <div className="absolute -top-2 -right-2 z-20 pointer-events-none">
          <div 
            className="px-3 py-1 bg-gradient-to-r from-accent to-primary text-white text-[9px] font-bold tracking-wider shadow-lg rounded-bl-lg rounded-tr-xl border border-white/20"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8px 100%)'
            }}
          >
            {bestValueLabel}
          </div>
        </div>
      )}

      {/* #9: Popular badge for Standard plan */}
      {popularLabel && planId === "standard" && !isComingSoon && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-gradient-to-r from-success to-primary text-white text-[10px] font-bold tracking-wider whitespace-nowrap shadow-lg flex items-center gap-1">
          <span>⭐</span>
          <span>{popularLabel}</span>
        </div>
      )}

      {/* Unlocks PRO badge with shimmer effect */}
      {(planId === "pro_monthly" || planId === "pro_annual") && !isComingSoon && unlocksProLabel && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-accent text-white text-[10px] font-bold tracking-wider whitespace-nowrap shadow-lg overflow-hidden">
          <span className="relative z-10">{unlocksProLabel}</span>
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>
      )}

      {/* #2: Animated checkmark with draw effect */}
      {isSelected && !isComingSoon && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.1
          }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10 shadow-md"
        >
          <motion.svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          >
            <motion.path 
              d="M20 6L9 17L4 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Plan Title - spaziatura aumentata */}
      <span className="text-sm font-bold tracking-wider uppercase mb-2 text-muted-foreground text-center">
        {title}
      </span>

      {/* Price with strikethrough original and discount badge - layout migliorato */}
      <div className="flex flex-col items-center gap-1 mb-2">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through opacity-60 whitespace-nowrap">
              {originalPrice}
            </span>
          )}
          <span className={cn(
            "text-3xl font-black whitespace-nowrap",
            isComingSoon ? "text-muted-foreground" : "text-foreground"
          )}>
            {price}
          </span>
          {/* Discount badge with pulse animation (#6) */}
          {discountBadge && !isComingSoon && (
            <motion.span 
              className="px-2 py-0.5 rounded bg-destructive text-destructive-foreground text-[10px] font-bold whitespace-nowrap"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [1, 0.9, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {discountBadge}
            </motion.span>
          )}
        </div>
      </div>

      {/* Subtitle - altezza minima per allineamento coerente */}
      <span className="text-base font-medium text-muted-foreground text-center leading-snug min-h-[22px]">
        {subtitle}
      </span>

      {/* Spacer e badge section - flex-grow per distribuzione verticale */}
      <div className="flex-1 flex items-center justify-center w-full mt-3 min-h-[40px]">
        {isComingSoon && comingSoonLabel && (
          <div className="px-3 py-2 rounded-lg bg-secondary border border-border">
            <span className="text-xs font-black tracking-wide text-muted-foreground">
              {comingSoonLabel}
            </span>
          </div>
        )}

        {trialInfo && !isComingSoon && (
          <div className="px-3 py-2 rounded-lg bg-accent/10 border border-accent">
            <span className="text-xs font-extrabold text-accent whitespace-nowrap">
              {trialInfo}
            </span>
          </div>
        )}

        {savings && !isComingSoon && (
          <div className="px-3 py-1.5 rounded-full bg-success/10">
            <span className="text-xs font-bold text-success whitespace-nowrap">
              {savings}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface FeatureItemProps {
  text: string;
  description?: string;
  isPro?: boolean;
  icon?: React.ReactNode;
  index?: number;
}

// #6: Feature item with hover glow + icon pulse effect
const FeatureItem = ({ text, description, isPro = false, icon, index = 0 }: FeatureItemProps) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.05 * index, duration: 0.3 }}
    whileHover={{ 
      backgroundColor: isPro ? 'hsl(var(--accent) / 0.08)' : 'hsl(var(--success) / 0.08)',
      x: 4
    }}
    className="group flex items-start gap-2 py-1.5 px-2 -mx-2 rounded-lg transition-colors cursor-default"
  >
    <motion.div
      className={cn(
        "rounded flex items-center justify-center flex-shrink-0 w-5 h-5 mt-0.5",
        isPro ? "bg-accent/15" : "bg-success/15"
      )}
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {icon ? (
        <span className={cn("w-3.5 h-3.5 transition-transform group-hover:scale-110", isPro ? "text-accent" : "text-success")}>{icon}</span>
      ) : isPro ? (
        <Sparkles className="w-3.5 h-3.5 text-accent" />
      ) : (
        <Check className="w-3.5 h-3.5 text-success" />
      )}
    </motion.div>
    <div className="flex flex-col min-w-0">
      <span className="font-semibold text-foreground text-base leading-tight">{text}</span>
      {description && (
        <span className="font-medium text-muted-foreground text-sm leading-tight">{description}</span>
      )}
    </div>
  </motion.div>
);

interface FeatureItemCompactProps {
  text: string;
  isPro?: boolean;
  icon?: React.ReactNode;
}

const FeatureItemCompact = ({ text, isPro = false, icon }: FeatureItemCompactProps) => (
  <div className="flex items-center gap-1.5 py-0.5">
    <div
      className={cn(
        "rounded flex items-center justify-center flex-shrink-0 w-4 h-4",
        isPro ? "bg-accent/10" : "bg-success/10"
      )}
    >
      {icon ? (
        <span className={cn(isPro ? "text-accent" : "text-success")}>{icon}</span>
      ) : isPro ? (
        <Sparkles className="w-3 h-3 text-accent" />
      ) : (
        <Check className="w-3 h-3 text-success" />
      )}
    </div>
    <span className={cn(
      "font-medium text-xs leading-tight truncate",
      isPro ? "text-muted-foreground" : "text-foreground"
    )}>{text}</span>
  </div>
);

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trialRemaining?: number;
}

export const PricingModal = ({ isOpen, onClose, trialRemaining = 3 }: PricingModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistPlanType, setWaitlistPlanType] = useState<"monthly" | "annual">("monthly");
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  
  const t = modalTranslations[language as keyof typeof modalTranslations] || modalTranslations.en;

  // #10: Scroll body lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // #9: Track modal open
      trackEvent('pricing_modal_opened', { language });
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, language]);

  // #4: Keyboard handling - Escape to close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      trackEvent('pricing_modal_closed', { method: 'escape' });
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // #4: Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

  const handleClose = () => {
    trackEvent('pricing_modal_closed', { method: 'button' });

    // Emit event for PyQt6 bridge
    window.dispatchEvent(new CustomEvent('lovable:close-requested', {}));

    onClose();
  };

  const handleBackdropClick = () => {
    trackEvent('pricing_modal_closed', { method: 'backdrop' });

    // Emit event for PyQt6 bridge
    window.dispatchEvent(new CustomEvent('lovable:close-requested', {}));

    onClose();
  };

  const handlePurchase = () => {
    trackEvent('purchase_initiated', { plan: selectedPlan, language });
    console.log("[MS Store] Initiating purchase for:", selectedPlan);

    // INSERISCI QUI IL LINK REALE DEL TUO PRODOTTO SUL MICROSOFT STORE
    const MS_STORE_LINK = import.meta.env.VITE_MS_STORE_LINK || "https://apps.microsoft.com/store/detail/chronos-autopilot";

    if (selectedPlan === "standard") {
      window.open(MS_STORE_LINK, "_blank");
    } else if (selectedPlan === "pro_monthly" || selectedPlan === "pro_annual") {
      if (PRO_AVAILABLE) {
        window.open(MS_STORE_LINK, "_blank");
      } else {
        // Open waitlist modal
        setWaitlistPlanType(selectedPlan === "pro_monthly" ? "monthly" : "annual");
        setWaitlistModalOpen(true);
        trackEvent('pro_waitlist_opened', { plan: selectedPlan, language });

        // Emit event for PyQt6 bridge
        window.dispatchEvent(new CustomEvent('lovable:waitlist-requested', {
          detail: { planId: selectedPlan }
        }));
      }
    }
  };

  const getCtaText = () => {
    switch (selectedPlan) {
      case "standard":
        return t.getStandard;
      case "pro_monthly":
        return PRO_AVAILABLE ? t.getProMonthly : t.joinWaitlist;
      case "pro_annual":
        return PRO_AVAILABLE ? t.getProAnnual : t.joinWaitlist;
      default:
        return t.getStandard;
    }
  };

  const getCtaSubtext = () => {
    switch (selectedPlan) {
      case "standard":
        return t.oneTimePayment;
      case "pro_monthly":
        return PRO_AVAILABLE ? t.billedMonthly : "";
      case "pro_annual":
        return PRO_AVAILABLE ? t.billedAnnually : "";
      default:
        return "";
    }
  };

  // CTA is never disabled - Pro opens waitlist, Standard opens MS Store
  const isCtaDisabled = false;

  // Standard features with stagger indices
  const standardFeatures = [
    { text: t.stdFeat2, desc: t.stdFeat2Desc, icon: <Zap className="w-4 h-4" /> },
    { text: t.stdFeat3, desc: t.stdFeat3Desc, icon: <Shield className="w-4 h-4" /> },
    { text: t.stdFeat4, desc: t.stdFeat4Desc, icon: <MousePointer className="w-4 h-4" /> },
    { text: t.stdFeat5, desc: t.stdFeat5Desc, icon: <Cpu className="w-4 h-4" /> },
    { text: t.stdFeat6, desc: t.stdFeat6Desc, icon: <Bell className="w-4 h-4" /> },
  ];

  const proFeatures = [
    { text: t.proFeat1, desc: t.proFeat1Desc, icon: <Zap className="w-4 h-4" /> },
    { text: t.proFeat2, desc: t.proFeat2Desc, icon: <FolderMinus className="w-4 h-4" /> },
    { text: t.proFeat3, desc: t.proFeat3Desc, icon: <SplitSquareVertical className="w-4 h-4" /> },
    { text: t.proFeat4, desc: t.proFeat4Desc, icon: <Settings className="w-4 h-4" /> },
    { text: t.proFeat5, desc: t.proFeat5Desc, icon: <FileCode className="w-4 h-4" /> },
    { text: t.proFeat6, desc: t.proFeat6Desc, icon: <Check className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Product Schema for Pro Plans */}
          <Product
            productName="Chronos Studio Monthly"
            price={4.99}
            currency="EUR"
            description="Chronos Studio Monthly subscription - unlimited files, advanced filters, custom presets and templates"
            features={[
              "Unlimited files per extraction",
              "Advanced extension & folder management",
              "Configurable auto-split output",
              "Saveable custom presets",
              "Advanced templates (React, Python, DevOps)",
              "All Standard features included",
            ]}
          />
          <Product
            productName="Chronos Studio Annual"
            price={47.88}
            currency="EUR"
            description="Chronos Studio Annual subscription - save 43% with annual billing, unlimited files and all Pro features"
            features={[
              "Unlimited files per extraction",
              "Advanced extension & folder management",
              "Configurable auto-split output",
              "Saveable custom presets",
              "Advanced templates (React, Python, DevOps)",
              "All Standard features included",
              "43% savings vs monthly",
            ]}
          />
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pricing-modal-title"
              className={cn(
                "relative rounded-2xl shadow-2xl pointer-events-auto w-[95vw] md:w-[85vw] lg:w-[75vw] max-w-[1080px] h-[90vh] flex flex-col overflow-hidden",
                // Solid background - no transparency
                "bg-background"
              )}
              style={{
                boxShadow: "0 25px 60px -12px hsl(0 0% 0% / 0.25)",
              }}
            >
              {/* #1: Top gradient border accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
              
              {/* Header with subtle warm tint */}
              <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 dark:from-transparent dark:to-transparent border-b border-border/50 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <img src="/chronos-icon.png" alt="Chronos" className="w-6 h-6" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gradient leading-tight">Chronos</span>
                    <span className="text-[9px] text-muted-foreground leading-tight">Extract text from folder</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Language Selector - Uses global component */}
                  <LanguageSelector variant="modal" showSearch />

                  {/* 
                    Theme Toggle - Light/Dark Switch.
                    
                    ELECTRON INTEGRATION NOTE:
                    When extracting this modal for Windows Electron app:
                    - By default, inherit system theme preference (nativeTheme.shouldUseDarkColors)
                    - Allow user override to force 'light' or 'dark' via this toggle
                    - Store user preference in electron-store, fallback to system if not set
                    - API: { theme: 'system' | 'light' | 'dark' } where 'system' means inherit OS setting
                  */}
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-muted-foreground" />
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                      aria-label="Toggle dark mode"
                    />
                    <Moon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-muted hover:bg-destructive/10 text-foreground hover:text-destructive transition-all duration-200 border border-border hover:scale-110 active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content - Flex grow to fill space */}
              <div className="flex-1 flex flex-col px-6 py-5 overflow-auto">
                {/* Hero */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-6 flex-shrink-0"
                >
                  {/* Hero title with gradient text (#3) */}
                  <h1 id="pricing-modal-title" className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                    {t.heroTitle}
                  </h1>
                  <p className="text-xl font-medium text-muted-foreground">
                    {t.heroSub}
                  </p>
                </motion.div>

                {/* Row 1: Features Side by Side with stagger animations */}
                {/* Features grid - responsive for tablet (#10) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 flex-shrink-0">
                  {/* Standard Features */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-gradient-to-br from-muted/40 to-primary/5 dark:from-muted/30 dark:to-muted/10 rounded-xl p-5 border border-border/30"
                  >
                    <h3 className="text-base font-bold tracking-wide text-muted-foreground mb-4 uppercase">
                      {t.standardIncludes}
                    </h3>
                    <div className="space-y-3">
                      {standardFeatures.map((feat, idx) => (
                        <FeatureItem 
                          key={idx}
                          text={feat.text} 
                          description={feat.desc} 
                          icon={feat.icon}
                          index={idx}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Pro Features */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-accent/8 to-primary/5 dark:from-accent/5 dark:to-accent/3 rounded-xl p-5 border border-accent/25"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-base font-bold tracking-wide text-accent uppercase">
                        {t.proAdds}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {proFeatures.map((feat, idx) => (
                        <FeatureItem 
                          key={idx}
                          text={feat.text} 
                          description={feat.desc} 
                          isPro 
                          icon={feat.icon}
                          index={idx + 5}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* #7: Decorative separator between features and plan cards */}
                <div className="flex items-center justify-center gap-3 mb-6 flex-shrink-0">
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-border" />
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  </div>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-border" />
                </div>

                {/* Row 2: Plan Cards - Responsive grid for tablet (#10) */}
                <div className="flex flex-wrap justify-center gap-4 mb-6 flex-shrink-0 md:gap-5">
                  <PlanCard
                    title={t.standard}
                    price="€14.99"
                    originalPrice={t.originalPrice}
                    subtitle={t.lifetimeLicense}
                    planId="standard"
                    discountBadge="-40%"
                    trialInfo={trialRemaining !== undefined ? `🎁 ${trialRemaining}/3 ${t.trialLeft}` : undefined}
                    isSelected={selectedPlan === "standard"}
                    onSelect={setSelectedPlan}
                    popularLabel={t.popularChoice}
                    index={0}
                  />
                  <PlanCard
                    title={t.monthly}
                    price="€6.99"
                    subtitle={t.perMonth}
                    planId="pro_monthly"
                    unlocksProLabel={t.unlocksPro}
                    isSelected={selectedPlan === "pro_monthly"}
                    onSelect={setSelectedPlan}
                    index={1}
                  />
                  <PlanCard
                    title={t.annual}
                    price="€3.99"
                    subtitle={t.perMonth}
                    planId="pro_annual"
                    isHero
                    savings={t.save50}
                    bestValueLabel={t.bestValue}
                    isSelected={selectedPlan === "pro_annual"}
                    onSelect={setSelectedPlan}
                    index={2}
                  />
                </div>

                {/* Billing note for annual */}
                {selectedPlan === "pro_annual" && (
                  <p className="text-center text-sm text-muted-foreground mb-4 flex-shrink-0">
                    {t.billedAnnually}
                  </p>
                )}

                {/* Spacer to push CTA and footer down */}
                <div className="flex-1" />

                {/* Row 3: CTA Button with MS Store badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                >
                  {/* #5: CTA button with colored glow shadow */}
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePurchase}
                    className="group relative w-full max-w-[320px] h-12 rounded-xl font-bold text-base tracking-wider text-white transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    style={{
                      boxShadow: '0 8px 30px -8px hsl(var(--accent) / 0.5), 0 4px 15px -4px hsl(var(--primary) / 0.4)'
                    }}
                  >
                    {/* Glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        boxShadow: '0 12px 40px -8px hsl(var(--accent) / 0.6), 0 8px 25px -6px hsl(var(--primary) / 0.5)'
                      }}
                    />
                    {/* Show Bell for waitlist, Store for purchase - with bounce animation on hover */}
                    <motion.span
                      className="inline-flex relative z-10"
                      whileHover={{ 
                        y: [0, -3, 0],
                        transition: { duration: 0.4, repeat: Infinity }
                      }}
                    >
                      {(selectedPlan === "pro_monthly" || selectedPlan === "pro_annual") && !PRO_AVAILABLE ? (
                        <Bell className="w-5 h-5 group-hover:animate-[wiggle_0.5s_ease-in-out_infinite]" />
                      ) : (
                        <Store className="w-5 h-5" />
                      )}
                    </motion.span>
                    <span className="relative z-10">{getCtaText()}</span>
                  </motion.button>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    {getCtaSubtext() && <span>{getCtaSubtext()}</span>}
                    {selectedPlan === "standard" && (
                      <>
                        {getCtaSubtext() && <span>•</span>}
                        <span className="flex items-center gap-1">
                          <Store className="w-3.5 h-3.5" />
                          {t.viaMsStore}
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Footer: Reassurance */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-8 pt-5 mt-5 border-t border-border/50 bg-gradient-to-t from-primary/3 to-transparent dark:from-transparent rounded-b-xl flex-shrink-0"
                >
                  {/* Trust icons with semantic colors (#7) */}
                  <div className="flex items-center gap-2 text-base text-muted-foreground">
                    <Shield className="w-5 h-5 text-success" />
                    <span>{t.safePayment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-muted-foreground">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>{t.instantActivation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-muted-foreground">
                    <HeartHandshake className="w-5 h-5 text-accent" />
                    <span>{t.lifetimeSupport}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Pro Waitlist Modal */}
      <ProWaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        planType={waitlistPlanType}
      />
    </AnimatePresence>
  );
};

export default PricingModal;
