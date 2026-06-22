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
    stdFeat1: "Base AI Automation", stdFeat1Desc: "Hands-free coding",
    stdFeat2: "Limited Timer", stdFeat2Desc: "Try it out",
    stdFeat3: "Single Profile", stdFeat3Desc: "One IDE at a time",
    stdFeat4: "Community Support", stdFeat4Desc: "Help from peers",
    stdFeat5: "Background Vision", stdFeat5Desc: "Basic OCR detection",
    stdFeat6: "Desktop notifications", stdFeat6Desc: "Process alerts",
    proFeat1: "Unlimited Timer", proFeat1Desc: "No duration limits",
    proFeat2: "Unlimited Profiles", proFeat2Desc: "All your IDEs supported",
    proFeat3: "Priority Support", proFeat3Desc: "Direct line to team",
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
    stdFeat1: "Automazione base", stdFeat1Desc: "Codice senza interruzioni",
    stdFeat2: "Timer limitato", stdFeat2Desc: "Provalo ora",
    stdFeat3: "Singolo Profilo", stdFeat3Desc: "Un solo IDE alla volta",
    stdFeat4: "Supporto community", stdFeat4Desc: "Aiuto dalla community",
    stdFeat5: "Visione in background", stdFeat5Desc: "Rilevamento OCR base",
    stdFeat6: "Notifiche desktop", stdFeat6Desc: "Avvisi completamento",
    proFeat1: "Timer ILLIMITATO", proFeat1Desc: "Nessun limite di durata",
    proFeat2: "Profili ILLIMITATI", proFeat2Desc: "Supporta tutti gli IDE",
    proFeat3: "Supporto prioritario", proFeat3Desc: "Linea diretta col team",
    proFeat4: "Preset salvabili", proFeat4Desc: "Configurazioni riutilizzabili",
    proFeat5: "Aggiornamenti inclusi", proFeat5Desc: "Sempre all\'ultima versione",
    proFeat6: "Tutte le funzioni Standard", proFeat6Desc: "Tutto dalla licenza base",
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
    stdFeat1: "3 kostenlose Versuche", stdFeat1Desc: "Freihändiges Codieren",
    stdFeat2: "Begrenzter Timer", stdFeat2Desc: "Probieren Sie es aus",
    stdFeat3: "Einzelprofil", stdFeat3Desc: "Eine IDE nach der anderen",
    stdFeat4: "Community-Unterstützung", stdFeat4Desc: "Hilfe von Gleichgesinnten",
    stdFeat5: "Hintergrundvision", stdFeat5Desc: "Grundlegende OCR-Erkennung",
    stdFeat6: "Desktop-Benachrichtigungen", stdFeat6Desc: "Prozesswarnungen",
    proFeat1: "Unbegrenzter Timer", proFeat1Desc: "Keine zeitliche Begrenzung",
    proFeat2: "Unbegrenzte Profile", proFeat2Desc: "Alle Ihre IDEs werden unterstützt",
    proFeat3: "Vorrangiger Support", proFeat3Desc: "Direkter Draht zum Team",
    proFeat4: "Speicherbare benutzerdefinierte Voreinstellungen", proFeat4Desc: "Wiederverwendbare Konfigurationen",
    proFeat5: "Erweiterte Vorlagen", proFeat5Desc: "Reagieren, Python, DevOps...",
    proFeat6: "Alle Standardfunktionen enthalten", proFeat6Desc: "Alles von der Standardlizenz",
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
    stdFeat2: "Minuterie limitée", stdFeat2Desc: "Essayez-le"à 500 fichiers par extraction",
    stdFeat3: "Profil unique", stdFeat3Desc: "Un IDE à la fois",
    stdFeat4: "Soutien communautaire", stdFeat4Desc: "Aide des pairs",
    stdFeat5: "Vision d\'arrière-plan", stdFeat5Desc: "Détection OCR de base",
    stdFeat6: "Notifications sur le bureau", stdFeat6Desc: "Alertes de processus",
    proFeat1: "Minuterie illimitée", proFeat1Desc: "Aucune limite de durée",
    proFeat2: "Profils illimités", proFeat2Desc: "Tous vos IDE pris en charge",
    proFeat3: "Assistance prioritaire", proFeat3Desc: "Ligne directe avec l\'équipe",
    proFeat4: "Préréglages personnalisés enregistrables", proFeat4Desc: "Configurations réutilisables",
    proFeat5: "Modèles avancés", proFeat5Desc: "Réagir, Python, DevOps...",
    proFeat6: "Toutes les fonctionnalités standard incluses", proFeat6Desc: "Tout depuis la licence Standard",
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
    stdFeat1: "Automatisation de l\'IA de base", stdFeat1Desc: "Codage mains libres",
    stdFeat2: "Extracciones ilimitadas", stdFeat2Desc: "Hasta 500 archivos por extracción",
    stdFeat3: "Perfil único", stdFeat3Desc: "Un IDE a la vez",
    stdFeat4: "Apoyo comunitario", stdFeat4Desc: "Ayuda de compañeros",
    stdFeat5: "Visión de fondo", stdFeat5Desc: "Detección OCR básica",
    stdFeat6: "Notificaciones de escritorio", stdFeat6Desc: "Alertas de proceso",
    proFeat1: "Temporizador ilimitado", proFeat1Desc: "Sin límites de duración",
    proFeat2: "Perfiles ilimitados", proFeat2Desc: "Todos sus IDE compatibles",
    proFeat3: "Soporte prioritario", proFeat3Desc: "Línea directa al equipo",
    proFeat4: "Ajustes preestablecidos personalizados guardables", proFeat4Desc: "Configuraciones reutilizables",
    proFeat5: "Plantillas avanzadas", proFeat5Desc: "Reaccionar, Python, DevOps...",
    proFeat6: "Todas las características estándar incluidas", proFeat6Desc: "Todo desde licencia estándar",
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
    stdFeat1: "Automatización básica de IA", stdFeat1Desc: "Codificación manos libres",
    stdFeat2: "Temporizador limitado", stdFeat2Desc: "Até 500 arquivos por extração",
    stdFeat3: "Licença Standard vitalícia", stdFeat3Desc: "Compra única, seu para sempre",
    stdFeat4: "Apoio Comunitário", stdFeat4Desc: "Ajuda dos colegas",
    stdFeat5: "Visão de fundo", stdFeat5Desc: "Detecção básica de OCR",
    stdFeat6: "Notificações na área de trabalho", stdFeat6Desc: "Alertas de processo",
    proFeat1: "Temporizador ilimitado", proFeat1Desc: "Sem limites de duração",
    proFeat2: "Perfis Ilimitados", proFeat2Desc: "Todos os seus IDEs são suportados",
    proFeat3: "Suporte Prioritário", proFeat3Desc: "Linha direta com a equipe",
    proFeat4: "Predefinições personalizadas salváveis", proFeat4Desc: "Configurações reutilizáveis",
    proFeat5: "Modelos avançados", proFeat5Desc: "Reagir, Python, DevOps...",
    proFeat6: "Todos os recursos padrão incluídos", proFeat6Desc: "Tudo da licença Standard",
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
    stdFeat1: "Automação básica de IA", stdFeat1Desc: "Codificação mãos-livres",
    stdFeat2: "Temporizador limitado", stdFeat2Desc: "Experimente",
    stdFeat3: "Perfil único", stdFeat3Desc: "Eenmalige aankoop, voor altijd van u",
    stdFeat4: "Windows contextmenu", stdFeat4Desc: "Rechtsklik om te extraheren",
    stdFeat5: "Achtergrondvisie", stdFeat5Desc: "Basis OCR-detectie",
    stdFeat6: "Bureaubladmeldingen", stdFeat6Desc: "Verwerk waarschuwingen",
    proFeat1: "Onbeperkte timer", proFeat1Desc: "Geen duurlimieten",
    proFeat2: "Onbeperkte profielen", proFeat2Desc: "Al uw IDE\'s worden ondersteund",
    proFeat3: "Prioritaire ondersteuning", proFeat3Desc: "Directe lijn naar team",
    proFeat4: "Op te slaan aangepaste voorinstellingen", proFeat4Desc: "Herbruikbare configuraties",
    proFeat5: "Geavanceerde sjablonen", proFeat5Desc: "Reageren, Python, DevOps...",
    proFeat6: "Alle standaardfuncties inbegrepen", proFeat6Desc: "Alles vanaf Standaardlicentie",
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
    stdFeat1: "Basis AI-automatisering", stdFeat1Desc: "Handsfree coderen",
    stdFeat2: "Beperkte timer", stdFeat2Desc: "Probeer het eens",
    stdFeat3: "Enkel profiel", stdFeat3Desc: "Eén IDE tegelijk",
    stdFeat4: "Gemeenschapsondersteuning", stdFeat4Desc: "Prawy przycisk do ekstrakcji",
    stdFeat5: "Przetwarzanie wielowątkowe", stdFeat5Desc: "Wykonywanie równoległe",
    stdFeat6: "Powiadomienia na pulpicie", stdFeat6Desc: "Alerty procesowe",
    proFeat1: "Nieograniczony timer", proFeat1Desc: "Brak ograniczeń czasowych",
    proFeat2: "Nieograniczone profile", proFeat2Desc: "Obsługiwane są wszystkie Twoje IDE",
    proFeat3: "Wsparcie priorytetowe", proFeat3Desc: "Bezpośrednia linia do zespołu",
    proFeat4: "Możliwość zapisania niestandardowych ustawień wstępnych", proFeat4Desc: "Konfiguracje wielokrotnego użytku",
    proFeat5: "Zaawansowane szablony", proFeat5Desc: "Reaguj, Python, DevOps...",
    proFeat6: "Zawiera wszystkie funkcje standardowe", proFeat6Desc: "Wszystko z licencji Standard",
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
    stdFeat1: "Podstawowa automatyzacja sztucznej inteligencji", stdFeat1Desc: "Kodowanie bez użycia rąk",
    stdFeat2: "Ograniczony timer", stdFeat2Desc: "Wypróbuj",
    stdFeat3: "Pojedynczy profil", stdFeat3Desc: "Jedno IDE na raz",
    stdFeat4: "Wsparcie społeczności", stdFeat4Desc: "Pomoc rówieśników",
    stdFeat5: "Wizja tła", stdFeat5Desc: "Parallell exekvering",
    stdFeat6: "Skrivbordsnotifikationer", stdFeat6Desc: "Avslutningsmeddelanden",
    proFeat1: "Obegränsad timer", proFeat1Desc: "Inga varaktighetsgränser",
    proFeat2: "Obegränsade profiler", proFeat2Desc: "Alla dina IDE:er stöds",
    proFeat3: "Prioriterad support", proFeat3Desc: "Direkt linje till teamet",
    proFeat4: "Sparbara anpassade förinställningar", proFeat4Desc: "Återanvändbara konfigurationer",
    proFeat5: "Avancerade mallar", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alla standardfunktioner ingår", proFeat6Desc: "Allt från standardlicens",
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
    stdFeat1: "Base AI Automation", stdFeat1Desc: "Handsfree-kodning",
    stdFeat2: "Begränsad timer", stdFeat2Desc: "Prova det",
    stdFeat3: "Enskild profil", stdFeat3Desc: "En IDE i taget",
    stdFeat4: "Samhällsstöd", stdFeat4Desc: "Hjälp från kamrater",
    stdFeat5: "Bakgrundsvision", stdFeat5Desc: "Grundläggande OCR-detektion",
    stdFeat6: "Skrivbordsmeddelanden", stdFeat6Desc: "Fullføringsvarslinger",
    proFeat1: "Ubegrensede filer per ekstraksjon", proFeat1Desc: "Ingen filbegrensninger",
    proFeat2: "Utvidelse- & katalogadministrasjon", proFeat2Desc: "Alle IDE-ene dine støttes",
    proFeat3: "Prioritert støtte", proFeat3Desc: "Direkte linje til teamet",
    proFeat4: "Lagre tilpassede forhåndsinnstillinger", proFeat4Desc: "Gjenbrukbare konfigurasjoner",
    proFeat5: "Avanserte maler", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alle standardfunksjoner inkludert", proFeat6Desc: "Alt fra standardlisens",
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
    stdFeat1: "Base AI-automatisering", stdFeat1Desc: "Håndfri koding",
    stdFeat2: "Begrenset timer", stdFeat2Desc: "Prøv det",
    stdFeat3: "Enkel profil", stdFeat3Desc: "En IDE om gangen",
    stdFeat4: "Fellesskapsstøtte", stdFeat4Desc: "Hjelp fra jevnaldrende",
    stdFeat5: "Bakgrunnssyn", stdFeat5Desc: "Grunnleggende OCR-deteksjon",
    stdFeat6: "Skrivebordsvarsler", stdFeat6Desc: "Behandle varsler",
    proFeat1: "Ubegrenset timer", proFeat1Desc: "Ingen filbegrænsninger",
    proFeat2: "Udvidelse- & katalogadministration", proFeat2Desc: "Avanceret inkluder/ekskluder",
    proFeat3: "Konfigurerbar auto-opdeling", proFeat3Desc: "Direkte linje til team",
    proFeat4: "Brugerdefinerede forudindstillinger, der kan gemmes", proFeat4Desc: "Genanvendelige konfigurationer",
    proFeat5: "Avancerede skabeloner", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Alle standardfunktioner inkluderet", proFeat6Desc: "Alt fra Standard licens",
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
    stdFeat1: "Base AI Automation", stdFeat1Desc: "Håndfri kodning",
    stdFeat2: "Begrænset timer", stdFeat2Desc: "Prøv det",
    stdFeat3: "Enkelt profil", stdFeat3Desc: "En IDE ad gangen",
    stdFeat4: "Fællesskabsstøtte", stdFeat4Desc: "Hjælp fra jævnaldrende",
    stdFeat5: "Baggrundssyn", stdFeat5Desc: "Grundlæggende OCR-detektion",
    stdFeat6: "Skrivebordsmeddelelser", stdFeat6Desc: "Behandle advarsler",
    proFeat1: "Ubegrænset timer", proFeat1Desc: "Ingen varighedsgrænser",
    proFeat2: "Ubegrænsede profiler", proFeat2Desc: "Edistynyt sisällytä/poista",
    proFeat3: "Konfiguroitava automaattijako", proFeat3Desc: "Koon tai tiedostomäärän mukaan",
    proFeat4: "Tallennettavat mukautetut esiasetukset", proFeat4Desc: "Uudelleenkäytettävät kokoonpanot",
    proFeat5: "Kehittyneet mallit", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Mukana kaikki vakio-ominaisuudet", proFeat6Desc: "Kaikki Standard-lisenssistä",
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
    stdFeat1: "Tekoälyn perusautomaatio", stdFeat1Desc: "Handsfree-koodaus",
    stdFeat2: "Rajoitettu ajastin", stdFeat2Desc: "Kokeile sitä",
    stdFeat3: "Yksittäinen profiili", stdFeat3Desc: "Yksi IDE kerrallaan",
    stdFeat4: "Yhteisön tuki", stdFeat4Desc: "Apua kavereilta",
    stdFeat5: "Tausta visio", stdFeat5Desc: "Perus OCR-tunnistus",
    stdFeat6: "Työpöydän ilmoitukset", stdFeat6Desc: "Käsittele hälytykset",
    proFeat1: "Rajoittamaton ajastin", proFeat1Desc: "Ei kestorajoituksia",
    proFeat2: "Rajoittamaton määrä profiileja", proFeat2Desc: "Kaikki IDE:si tuetut",
    proFeat3: "Ensisijainen tuki", proFeat3Desc: "Suora linja joukkueeseen",
    proFeat4: "Uložitelná vlastní přednastavení", proFeat4Desc: "Opakovaně použitelné konfigurace",
    proFeat5: "Pokročilé šablony", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Zahrnuty všechny standardní funkce", proFeat6Desc: "Vše ze standardní licence",
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
    stdFeat1: "Základní automatizace AI", stdFeat1Desc: "Hands-free kódování",
    stdFeat2: "Omezený časovač", stdFeat2Desc: "Vyzkoušejte to",
    stdFeat3: "Jediný profil", stdFeat3Desc: "Jedno IDE najednou",
    stdFeat4: "Podpora komunity", stdFeat4Desc: "Pomoc od vrstevníků",
    stdFeat5: "Vize na pozadí", stdFeat5Desc: "Základní OCR detekce",
    stdFeat6: "Oznámení na ploše", stdFeat6Desc: "Zpracovat upozornění",
    proFeat1: "Neomezený časovač", proFeat1Desc: "Bez omezení trvání",
    proFeat2: "Neomezené profily", proFeat2Desc: "Všechna vaše IDE podporována",
    proFeat3: "Prioritní podpora", proFeat3Desc: "Přímá linka k týmu",
    proFeat4: "Uložitelné vlastní předvolby", proFeat4Desc: "Επαναχρησιμοποιήσιμες διαμορφώσεις",
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
    stdFeat1: "Βασικός αυτοματισμός AI", stdFeat1Desc: "Κωδικοποίηση hands-free",
    stdFeat2: "Περιορισμένος χρονοδιακόπτης", stdFeat2Desc: "Δοκιμάστε το",
    stdFeat3: "Ενιαίο Προφίλ", stdFeat3Desc: "Ένα IDE τη φορά",
    stdFeat4: "Κοινοτική υποστήριξη", stdFeat4Desc: "Βοήθεια από συνομηλίκους",
    stdFeat5: "Όραμα φόντου", stdFeat5Desc: "Βασική ανίχνευση OCR",
    stdFeat6: "Ειδοποιήσεις επιφάνειας εργασίας", stdFeat6Desc: "Ειδοποιήσεις διαδικασίας",
    proFeat1: "Απεριόριστο χρονόμετρο", proFeat1Desc: "Χωρίς περιορισμούς διάρκειας",
    proFeat2: "Απεριόριστα Προφίλ", proFeat2Desc: "Υποστηρίζονται όλα τα IDE σας",
    proFeat3: "Υποστήριξη προτεραιότητας", proFeat3Desc: "Απευθείας γραμμή στην ομάδα",
    proFeat4: "Προσαρμοσμένες προεπιλογές με δυνατότητα αποθήκευσης", proFeat4Desc: "Επαναχρησιμοποιήσιμες διαμορφώσεις",
    proFeat5: "Προηγμένα πρότυπα", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Περιλαμβάνονται όλα τα τυπικά χαρακτηριστικά", proFeat6Desc: "Τα πάντα από την τυπική άδεια",
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
    stdFeat1: "Automatizare AI de bază", stdFeat1Desc: "Codare hands-free",
    stdFeat2: "Temporizator limitat", stdFeat2Desc: "Încearcă-l",
    stdFeat3: "Profil unic", stdFeat3Desc: "Un IDE la un moment dat",
    stdFeat4: "Sprijin comunitar", stdFeat4Desc: "Ajutor de la semeni",
    stdFeat5: "Viziune de fundal", stdFeat5Desc: "Detectare OCR de bază",
    stdFeat6: "Notificări de pe desktop", stdFeat6Desc: "Procesează alertele",
    proFeat1: "Cronometru nelimitat", proFeat1Desc: "Fără limite de durată",
    proFeat2: "Profiluri nelimitate", proFeat2Desc: "Toate IDE-urile dvs. sunt acceptate",
    proFeat3: "Suport prioritar", proFeat3Desc: "Linie directă către echipă",
    proFeat4: "Presetări personalizate care pot fi salvate", proFeat4Desc: "Configurații reutilizabile",
    proFeat5: "Șabloane avansate", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Toate caracteristicile standard incluse", proFeat6Desc: "Totul de la licență standard",
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
    stdFeat1: "Alap AI automatizálás", stdFeat1Desc: "Kihangosított kódolás",
    stdFeat2: "Korlátozott időzítő", stdFeat2Desc: "Próbáld ki",
    stdFeat3: "Egyetlen profil", stdFeat3Desc: "One IDE at a time",
    stdFeat4: "Közösségi támogatás", stdFeat4Desc: "Segítség a társaktól",
    stdFeat5: "Háttérlátás", stdFeat5Desc: "Alapvető OCR észlelés",
    stdFeat6: "Asztali értesítések", stdFeat6Desc: "Riasztások feldolgozása",
    proFeat1: "Korlátlan időzítő", proFeat1Desc: "Nincs időtartam korlátozás",
    proFeat2: "Korlátlan profilok", proFeat2Desc: "Minden IDE támogatott",
    proFeat3: "Kiemelt támogatás", proFeat3Desc: "Közvetlen vonal a csapathoz",
    proFeat4: "Menthető egyéni előbeállítások", proFeat4Desc: "Újrafelhasználható konfigurációk",
    proFeat5: "Speciális sablonok", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Minden standard funkció benne van", proFeat6Desc: "Minden a Standard licencből",
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
    stdFeat1: "Основна AI автоматизация", stdFeat1Desc: "Кодиране без ръце",
    stdFeat2: "Ограничен таймер", stdFeat2Desc: "Опитайте го",
    stdFeat3: "Единичен профил", stdFeat3Desc: "Една IDE наведнъж",
    stdFeat4: "Подкрепа от общността", stdFeat4Desc: "Помощ от връстници",
    stdFeat5: "Визия на фона", stdFeat5Desc: "Основно разпознаване на OCR",
    stdFeat6: "Известия на работния плот", stdFeat6Desc: "Обработвайте сигнали",
    proFeat1: "Неограничен таймер", proFeat1Desc: "Без ограничения на продължителността",
    proFeat2: "Неограничени профили", proFeat2Desc: "Всички ваши IDE се поддържат",
    proFeat3: "Приоритетна поддръжка", proFeat3Desc: "Директна връзка с екипа",
    proFeat4: "Персонализирани предварително зададени настройки с възможност за запазване", proFeat4Desc: "Конфигурации за многократна употреба",
    proFeat5: "Разширени шаблони", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Включени са всички стандартни функции", proFeat6Desc: "Всичко от стандартния лиценз",
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
    stdFeat1: "Osnovna automatizacija umjetne inteligencije", stdFeat1Desc: "Kodiranje bez ruku",
    stdFeat2: "Ograničeni mjerač vremena", stdFeat2Desc: "Isprobajte ga",
    stdFeat3: "Jedan profil", stdFeat3Desc: "Jedan po jedan IDE",
    stdFeat4: "Podrška zajednice", stdFeat4Desc: "Pomoć vršnjaka",
    stdFeat5: "Pozadinski vid", stdFeat5Desc: "Osnovna OCR detekcija",
    stdFeat6: "Obavijesti na radnoj površini", stdFeat6Desc: "Procesna upozorenja",
    proFeat1: "Neograničeno vrijeme", proFeat1Desc: "Nema ograničenja trajanja",
    proFeat2: "Neograničeni profili", proFeat2Desc: "Podržani su svi vaši IDE-ovi",
    proFeat3: "Prioritetna podrška", proFeat3Desc: "Izravna linija za tim",
    proFeat4: "Prilagođene postavke koje se mogu spremiti", proFeat4Desc: "Konfiguracije za višekratnu upotrebu",
    proFeat5: "Napredni predlošci", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Sve standardne značajke uključene", proFeat6Desc: "Everything from Standard license",
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
    stdFeat1: "Základná automatizácia AI", stdFeat1Desc: "Hands-free kódovanie",
    stdFeat2: "Obmedzený časovač", stdFeat2Desc: "Vyskúšajte to",
    stdFeat3: "Jediný profil", stdFeat3Desc: "Jedno IDE naraz",
    stdFeat4: "Podpora komunity", stdFeat4Desc: "Pomoc od rovesníkov",
    stdFeat5: "Vízia na pozadí", stdFeat5Desc: "Základná detekcia OCR",
    stdFeat6: "Upozornenia na pracovnej ploche", stdFeat6Desc: "Spracovať upozornenia",
    proFeat1: "Neobmedzený časovač", proFeat1Desc: "Žiadne obmedzenia trvania",
    proFeat2: "Neobmedzené profily", proFeat2Desc: "Všetky vaše IDE sú podporované",
    proFeat3: "Prioritná podpora", proFeat3Desc: "Priama linka k tímu",
    proFeat4: "Uložiteľné vlastné predvoľby", proFeat4Desc: "Opätovne použiteľné konfigurácie",
    proFeat5: "Pokročilé šablóny", proFeat5Desc: "Reagovať, Python, DevOps...",
    proFeat6: "Všetky štandardné funkcie zahrnuté", proFeat6Desc: "Všetko zo štandardnej licencie",
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
    stdFeat1: "Основна АИ аутоматизација", stdFeat1Desc: "Кодирање без употребе руку",
    stdFeat2: "Ограничени тајмер", stdFeat2Desc: "Испробај",
    stdFeat3: "Сингле Профиле", stdFeat3Desc: "Један по један ИДЕ",
    stdFeat4: "Подршка заједнице", stdFeat4Desc: "Помоћ од вршњака",
    stdFeat5: "Бацкгроунд Висион", stdFeat5Desc: "Основна детекција ОЦР",
    stdFeat6: "Обавештења на радној површини", stdFeat6Desc: "Процесна упозорења",
    proFeat1: "Неограничен тајмер", proFeat1Desc: "Нема ограничења трајања",
    proFeat2: "Неограничени профили", proFeat2Desc: "Сви ваши ИДЕ су подржани",
    proFeat3: "Приоритетна подршка", proFeat3Desc: "Директна линија са тимом",
    proFeat4: "Прилагођена подешавања која се могу сачувати", proFeat4Desc: "Конфигурације за вишекратну употребу",
    proFeat5: "Напредни шаблони", proFeat5Desc: "Реаговање, Пајтон, ДевОпс...",
    proFeat6: "Укључене су све стандардне функције", proFeat6Desc: "Све из Стандардне лиценце",
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
    stdFeat1: "Pagrindinė AI automatika", stdFeat1Desc: "Kodavimas laisvų rankų įranga",
    stdFeat2: "Ribotas laikmatis", stdFeat2Desc: "Išbandykite",
    stdFeat3: "Vienas profilis", stdFeat3Desc: "Viena IDE vienu metu",
    stdFeat4: "Bendruomenės parama", stdFeat4Desc: "Pagalba iš bendraamžių",
    stdFeat5: "Fono vizija", stdFeat5Desc: "Pagrindinis OCR aptikimas",
    stdFeat6: "Darbalaukio pranešimai", stdFeat6Desc: "Proceso įspėjimai",
    proFeat1: "Neribotas laikmatis", proFeat1Desc: "Jokių trukmės apribojimų",
    proFeat2: "Unlimited Profiles", proFeat2Desc: "All your IDEs supported",
    proFeat3: "Prioritetinis palaikymas", proFeat3Desc: "Tiesioginė linija į komandą",
    proFeat4: "Išsaugomi pasirinktiniai išankstiniai nustatymai", proFeat4Desc: "Daugkartinio naudojimo konfigūracijos",
    proFeat5: "Išplėstiniai šablonai", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Įtrauktos visos standartinės funkcijos", proFeat6Desc: "Viskas iš standartinės licencijos",
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
    stdFeat1: "Bāzes AI automatizācija", stdFeat1Desc: "Kodēšana brīvroku režīmā",
    stdFeat2: "Ierobežots taimeris", stdFeat2Desc: "Izmēģiniet to",
    stdFeat3: "Viens profils", stdFeat3Desc: "Viena IDE vienlaikus",
    stdFeat4: "Kopienas atbalsts", stdFeat4Desc: "Palīdzība no vienaudžiem",
    stdFeat5: "Fona redzējums", stdFeat5Desc: "Pamata OCR noteikšana",
    stdFeat6: "Darbvirsmas paziņojumi", stdFeat6Desc: "Procesa brīdinājumi",
    proFeat1: "Neierobežots taimeris", proFeat1Desc: "Nav ilguma ierobežojumu",
    proFeat2: "Neierobežots profils", proFeat2Desc: "Tiek atbalstīti visi jūsu IDE",
    proFeat3: "Prioritārais atbalsts", proFeat3Desc: "Tiešā līnija uz komandu",
    proFeat4: "Saglabājami pielāgoti sākotnējie iestatījumi", proFeat4Desc: "Atkārtoti lietojamas konfigurācijas",
    proFeat5: "Uzlabotas veidnes", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Iekļautas visas standarta funkcijas", proFeat6Desc: "Viss no standarta licences",
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
    stdFeat1: "AI põhiautomaatika", stdFeat1Desc: "Käed-vabad kodeerimine",
    stdFeat2: "Piiratud taimer", stdFeat2Desc: "Proovige järele",
    stdFeat3: "Üks profiil", stdFeat3Desc: "Üks IDE korraga",
    stdFeat4: "Kogukonna tugi", stdFeat4Desc: "Abi kaaslastelt",
    stdFeat5: "Taustnägemus", stdFeat5Desc: "Põhiline OCR-tuvastus",
    stdFeat6: "Töölaua märguanded", stdFeat6Desc: "Töötle märguandeid",
    proFeat1: "Piiramatu taimer", proFeat1Desc: "Kestuspiiranguid pole",
    proFeat2: "Piiramatu arv profiile", proFeat2Desc: "Kõik teie IDE-d on toetatud",
    proFeat3: "Prioriteetne tugi", proFeat3Desc: "Otseliin meeskonnale",
    proFeat4: "Salvestatavad kohandatud eelseaded", proFeat4Desc: "Korduvkasutatavad konfiguratsioonid",
    proFeat5: "Täpsemad mallid", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Kaasas kõik standardfunktsioonid", proFeat6Desc: "Kõik standardlitsentsist",
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
    stdFeat2: "Omejen časovnik", stdFeat2Desc: "Preizkusite ga",
    stdFeat3: "Enotni profil", stdFeat3Desc: "En IDE naenkrat",
    stdFeat4: "Podpora skupnosti", stdFeat4Desc: "Pomoč vrstnikov",
    stdFeat5: "Vid v ozadju", stdFeat5Desc: "Osnovno zaznavanje OCR",
    stdFeat6: "Obvestila na namizju", stdFeat6Desc: "Obdelajte opozorila",
    proFeat1: "Neomejen časovnik", proFeat1Desc: "Brez omejitev trajanja",
    proFeat2: "Neomejeno število profilov", proFeat2Desc: "Podprti so vsi vaši IDE-ji",
    proFeat3: "Prednostna podpora", proFeat3Desc: "Direktna linija do ekipe",
    proFeat4: "Prednastavitve po meri, ki jih je mogoče shraniti", proFeat4Desc: "Konfiguracije za večkratno uporabo",
    proFeat5: "Napredne predloge", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Vključene so vse standardne funkcije", proFeat6Desc: "Vse od standardne licence",
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
    stdFeat1: "Osnovna avtomatizacija AI", stdFeat1Desc: "Prostoročno kodiranje",
    stdFeat2: "Omejen časovnik", stdFeat2Desc: "每次提取最多 500 个文件",
    stdFeat3: "终身标准许可证", stdFeat3Desc: "一次购买，永久拥有",
    stdFeat4: "Підтримка спільноти", stdFeat4Desc: "Допомога однолітків",
    stdFeat5: "Фонове бачення", stdFeat5Desc: "Базове розпізнавання OCR",
    stdFeat6: "Сповіщення на робочому столі", stdFeat6Desc: "Обробляти сповіщення",
    proFeat1: "Необмежений таймер", proFeat1Desc: "Немає обмежень по тривалості",
    proFeat2: "Необмежена кількість профілів", proFeat2Desc: "Підтримуються всі ваші IDE",
    proFeat3: "Пріоритетна підтримка", proFeat3Desc: "Пряма лінія до команди",
    proFeat4: "Користувацькі пресети, які можна зберегти", proFeat4Desc: "Багаторазові конфігурації",
    proFeat5: "Розширені шаблони", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Включені всі стандартні функції", proFeat6Desc: "Все, починаючи зі стандартної ліцензії",
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
    stdFeat1: "База автоматизації ШІ", stdFeat1Desc: "Кодування без використання рук",
    stdFeat2: "Обмежений таймер", stdFeat2Desc: "Спробуй це",
    stdFeat3: "Єдиний профіль", stdFeat3Desc: "Одна IDE за раз",
    stdFeat4: "Підтримка спільноти", stdFeat4Desc: "Допомога однолітків",
    stdFeat5: "Фонове бачення", stdFeat5Desc: "Базове розпізнавання OCR",
    stdFeat6: "Сповіщення на робочому столі", stdFeat6Desc: "Обробляти сповіщення",
    proFeat1: "Необмежений таймер", proFeat1Desc: "Немає обмежень по тривалості",
    proFeat2: "Необмежена кількість профілів", proFeat2Desc: "Підтримуються всі ваші IDE",
    proFeat3: "Priority Support", proFeat3Desc: "Direct line to team",
    proFeat4: "Saveable custom presets", proFeat4Desc: "Reusable configurations",
    proFeat5: "Advanced templates", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "All Standard features included", proFeat6Desc: "Everything from Standard license",
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
    stdFeat1: "Base AI Automation", stdFeat1Desc: "Hands-free coding",
    stdFeat2: "Limited Timer", stdFeat2Desc: "Try it out",
    stdFeat3: "Single Profile", stdFeat3Desc: "One IDE at a time",
    stdFeat4: "Windows 컨텍스트 메뉴", stdFeat4Desc: "우클릭으로 추출",
    stdFeat5: "背景のビジョン", stdFeat5Desc: "基本的な OCR 検出",
    stdFeat6: "デスクトップ通知", stdFeat6Desc: "プロセスアラート",
    proFeat1: "無制限のタイマー", proFeat1Desc: "期間制限なし",
    proFeat2: "無制限のプロファイル", proFeat2Desc: "すべての IDE がサポートされています",
    proFeat3: "優先サポート", proFeat3Desc: "チームへの直通ライン",
    proFeat4: "保存可能なカスタムプリセット", proFeat4Desc: "再利用可能な構成",
    proFeat5: "高度なテンプレート", proFeat5Desc: "React、Python、DevOps...",
    proFeat6: "すべての標準機能が含まれています", proFeat6Desc: "標準ライセンスからすべて",
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
    stdFeat1: "ベースAI自動化", stdFeat1Desc: "ハンズフリーコーディング",
    stdFeat2: "リミテッドタイマー", stdFeat2Desc: "प्रति निष्कर्षण 500 फ़ाइलें तक",
    stdFeat3: "आजीवन स्टैंडर्ड लाइसेंस", stdFeat3Desc: "한 번에 하나의 IDE",
    stdFeat4: "커뮤니티 지원", stdFeat4Desc: "동료의 도움",
    stdFeat5: "배경 비전", stdFeat5Desc: "기본 OCR 감지",
    stdFeat6: "데스크톱 알림", stdFeat6Desc: "프로세스 알림",
    proFeat1: "무제한 타이머", proFeat1Desc: "기간 제한 없음",
    proFeat2: "무제한 프로필", proFeat2Desc: "모든 IDE 지원",
    proFeat3: "우선 지원", proFeat3Desc: "팀에 직접 연결",
    proFeat4: "저장 가능한 사용자 정의 사전 설정", proFeat4Desc: "재사용 가능한 구성",
    proFeat5: "고급 템플릿", proFeat5Desc: "리액트, 파이썬, 데브옵스...",
    proFeat6: "모든 표준 기능 포함", proFeat6Desc: "표준 라이센스의 모든 것",
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
    stdFeat1: "बेस एआई ऑटोमेशन", stdFeat1Desc: "हैंड्स-फ़्री कोडिंग",
    stdFeat2: "सीमित टाइमर", stdFeat2Desc: "कोशिश करके देखो",
    stdFeat3: "एकल प्रोफ़ाइल", stdFeat3Desc: "एक समय में एक आईडीई",
    stdFeat4: "समुदाय का समर्थन", stdFeat4Desc: "साथियों से मदद मिलेगी",
    stdFeat5: "पृष्ठभूमि दृष्टि", stdFeat5Desc: "बुनियादी ओसीआर का पता लगाना",
    stdFeat6: "डेस्कटॉप सूचनाएं", stdFeat6Desc: "प्रक्रिया अलर्ट",
    proFeat1: "असीमित टाइमर", proFeat1Desc: "कोई अवधि सीमा नहीं",
    proFeat2: "असीमित प्रोफाइल", proFeat2Desc: "आपके सभी IDE समर्थित हैं",
    proFeat3: "प्राथमिकता समर्थन", proFeat3Desc: "टीम के लिए सीधी लाइन",
    proFeat4: "सहेजने योग्य कस्टम प्रीसेट", proFeat4Desc: "पुन: प्रयोज्य विन्यास",
    proFeat5: "उन्नत टेम्पलेट्स", proFeat5Desc: "रिएक्ट, पायथन, डेवऑप्स...",
    proFeat6: "सभी मानक सुविधाएँ शामिल हैं", proFeat6Desc: "मानक लाइसेंस से सब कुछ",
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
    stdFeat1: "बेस एआई ऑटोमेशन", stdFeat1Desc: "Dùng thử trước khi mua",
    stdFeat2: "Trích xuất không giới hạn", stdFeat2Desc: "ลองมันดู",
    stdFeat3: "โปรไฟล์เดียว", stdFeat3Desc: "IDE ครั้งละหนึ่งรายการ",
    stdFeat4: "การสนับสนุนชุมชน", stdFeat4Desc: "ความช่วยเหลือจากเพื่อนร่วมงาน",
    stdFeat5: "วิสัยทัศน์เบื้องหลัง", stdFeat5Desc: "การตรวจจับ OCR ขั้นพื้นฐาน",
    stdFeat6: "การแจ้งเตือนบนเดสก์ท็อป", stdFeat6Desc: "การแจ้งเตือนกระบวนการ",
    proFeat1: "จับเวลาได้ไม่จำกัด", proFeat1Desc: "ไม่มีการจำกัดระยะเวลา",
    proFeat2: "ไม่จำกัดโปรไฟล์", proFeat2Desc: "รองรับ IDE ทั้งหมดของคุณ",
    proFeat3: "การสนับสนุนลำดับความสำคัญ", proFeat3Desc: "สายตรงถึงทีมงาน",
    proFeat4: "ค่าที่ตั้งล่วงหน้าแบบกำหนดเองที่บันทึกได้", proFeat4Desc: "การกำหนดค่าที่ใช้ซ้ำได้",
    proFeat5: "เทมเพลตขั้นสูง", proFeat5Desc: "ตอบสนอง, Python, DevOps...",
    proFeat6: "รวมคุณสมบัติมาตรฐานทั้งหมดแล้ว", proFeat6Desc: "ทุกอย่างจากใบอนุญาตมาตรฐาน",
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
    stdFeat1: "3 percobaan gratis", stdFeat1Desc: "Mã hóa rảnh tay",
    stdFeat2: "Hẹn giờ có giới hạn", stdFeat2Desc: "Hãy thử nó",
    stdFeat3: "Hồ sơ đơn", stdFeat3Desc: "Mỗi lần một IDE",
    stdFeat4: "Hỗ trợ cộng đồng", stdFeat4Desc: "Sự giúp đỡ từ đồng nghiệp",
    stdFeat5: "Tầm nhìn nền", stdFeat5Desc: "Phát hiện OCR cơ bản",
    stdFeat6: "Thông báo trên màn hình", stdFeat6Desc: "Cảnh báo quá trình",
    proFeat1: "Hẹn giờ không giới hạn", proFeat1Desc: "Không giới hạn thời lượng",
    proFeat2: "Hồ sơ không giới hạn", proFeat2Desc: "Tất cả các IDE của bạn đều được hỗ trợ",
    proFeat3: "Hỗ trợ ưu tiên", proFeat3Desc: "Đường dây trực tiếp đến nhóm",
    proFeat4: "Cài đặt trước tùy chỉnh có thể lưu", proFeat4Desc: "Cấu hình có thể tái sử dụng",
    proFeat5: "Mẫu nâng cao", proFeat5Desc: "Phản ứng, Python, DevOps...",
    proFeat6: "Bao gồm tất cả các tính năng tiêu chuẩn", proFeat6Desc: "Mọi thứ từ giấy phép tiêu chuẩn",
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
    stdFeat3: "Profil Tunggal", stdFeat3Desc: "Satu IDE pada satu waktu",
    stdFeat4: "Dukungan Komunitas", stdFeat4Desc: "Bantuan dari rekan-rekan",
    stdFeat5: "Latar Belakang Visi", stdFeat5Desc: "Deteksi OCR dasar",
    stdFeat6: "Pemberitahuan desktop", stdFeat6Desc: "Peringatan proses",
    proFeat1: "Pengatur Waktu Tidak Terbatas", proFeat1Desc: "Tidak ada batasan durasi",
    proFeat2: "Profil Tidak Terbatas", proFeat2Desc: "Semua IDE Anda didukung",
    proFeat3: "Dukungan Prioritas", proFeat3Desc: "Jalur langsung ke tim",
    proFeat4: "Preset khusus yang dapat disimpan", proFeat4Desc: "Konfigurasi yang dapat digunakan kembali",
    proFeat5: "Templat tingkat lanjut", proFeat5Desc: "Bereaksi, Python, DevOps...",
    proFeat6: "Semua fitur Standar disertakan", proFeat6Desc: "Semuanya dari lisensi Standar",
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
    stdFeat1: "Otomatisasi AI Dasar", stdFeat1Desc: "Pengodean bebas genggam",
    stdFeat2: "Waktu Terbatas", stdFeat2Desc: "Cobalah",
    stdFeat3: "Profil Tunggal", stdFeat3Desc: "Satu IDE pada satu waktu",
    stdFeat4: "Dukungan Komunitas", stdFeat4Desc: "Bantuan dari rekan-rekan",
    stdFeat5: "رؤية الخلفية", stdFeat5Desc: "كشف التعرف الضوئي على الحروف الأساسي",
    stdFeat6: "إشعارات سطح المكتب", stdFeat6Desc: "تنبيهات العملية",
    proFeat1: "توقيت غير محدود", proFeat1Desc: "لا حدود للمدة",
    proFeat2: "ملفات تعريف غير محدودة", proFeat2Desc: "كل ما تبذلونه من IDEs مدعومة",
    proFeat3: "دعم الأولوية", proFeat3Desc: "خط مباشر للفريق",
    proFeat4: "الإعدادات المسبقة المخصصة القابلة للحفظ", proFeat4Desc: "تكوينات قابلة لإعادة الاستخدام",
    proFeat5: "قوالب متقدمة", proFeat5Desc: "رد فعل، بايثون، DevOps ...",
    proFeat6: "تم تضمين كافة الميزات القياسية", proFeat6Desc: "كل شيء من الترخيص القياسي",
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
    stdFeat1: "أتمتة الذكاء الاصطناعي الأساسي", stdFeat1Desc: "الترميز بدون استخدام اليدين",
    stdFeat2: "مؤقت محدود", stdFeat2Desc: "جربه",
    stdFeat3: "ملف تعريف واحد", stdFeat3Desc: "IDE واحد في كل مرة",
    stdFeat4: "دعم المجتمع", stdFeat4Desc: "Sağ tıklayarak çıkarın",
    stdFeat5: "Çok iş parçacıklı işleme", stdFeat5Desc: "Basic OCR detection",
    stdFeat6: "Desktop notifications", stdFeat6Desc: "Process alerts",
    proFeat1: "Unlimited Timer", proFeat1Desc: "No duration limits",
    proFeat2: "Unlimited Profiles", proFeat2Desc: "All your IDEs supported",
    proFeat3: "Priority Support", proFeat3Desc: "Direct line to team",
    proFeat4: "Saveable custom presets", proFeat4Desc: "Reusable configurations",
    proFeat5: "Advanced templates", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "All Standard features included", proFeat6Desc: "Everything from Standard license",
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
    stdFeat1: "Base AI Automation", stdFeat1Desc: "Hands-free coding",
    stdFeat2: "Limited Timer", stdFeat2Desc: "До 500 файлов за извлечение",
    stdFeat3: "Пожизненная Standard лицензия", stdFeat3Desc: "Разовая покупка, навсегда ваша",
    stdFeat4: "Topluluk Desteği", stdFeat4Desc: "Akranlardan yardım",
    stdFeat5: "Arka Plan Vizyonu", stdFeat5Desc: "Temel OCR algılama",
    stdFeat6: "Masaüstü bildirimleri", stdFeat6Desc: "İşlem uyarıları",
    proFeat1: "Sınırsız Zamanlayıcı", proFeat1Desc: "Süre sınırlaması yok",
    proFeat2: "Sınırsız Profil", proFeat2Desc: "Tüm IDE\'leriniz desteklenir",
    proFeat3: "Öncelikli Destek", proFeat3Desc: "Takıma direkt hat",
    proFeat4: "Kaydedilebilir özel ön ayarlar", proFeat4Desc: "Yeniden kullanılabilir konfigürasyonlar",
    proFeat5: "Gelişmiş şablonlar", proFeat5Desc: "React, Python, DevOps...",
    proFeat6: "Tüm Standart özellikler dahildir", proFeat6Desc: "Standart lisanstan her şey",
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
