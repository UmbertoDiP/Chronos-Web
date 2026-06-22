import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { FolderCode, Moon, Sun, ChevronLeft } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

const TermsOfService = () => {
  const { language, getLocalizedPath } = useLanguage();
  const { resolvedTheme, toggleTheme } = useTheme();

  const content: Record<string, { title: string; lastUpdated: string; sections: { heading: string; content: string }[] }> = {
    it: {
      title: 'Termini di Servizio',
      lastUpdated: 'Ultimo aggiornamento: 16 Gennaio 2026',
      sections: [
        {
          heading: '1. Accettazione dei Termini',
          content: 'Utilizzando Chronos, accetti integralmente questi Termini di Servizio. Se non sei d\'accordo con qualsiasi parte dei termini, non puoi utilizzare il servizio.'
        },
        {
          heading: '2. Descrizione del Servizio',
          content: 'Chronos è un\'applicazione desktop per Windows che converte strutture di cartelle in file di testo ottimizzati per modelli linguistici (LLM) come ChatGPT e Claude. Il servizio include:\n• Scansione e conversione di strutture di cartelle\n• Configurazione di pattern di esclusione\n• Filtraggio per estensione file\n• Output ottimizzato per context window degli LLM'
        },
        {
          heading: '3. Piani e Tariffe',
          content: 'Chronos offre:\n\n• Licenza Standard (€14,99 una tantum): Processing multi-thread, notifiche desktop e tutti gli aggiornamenti futuri.\n\n• Piano Pro Mensile (€6,99/mese): Tutte le funzionalità Standard più: preset personalizzati, template avanzati, selezione manuale file, split output e menu contestuale Windows.\n\n• Piano Pro Annuale (€59/anno = ~€4,92/mese): Stesso contenuto del Pro Mensile con risparmio del ~30%.\n\nTutti i pagamenti sono gestiti esclusivamente tramite Microsoft Store.'
        },
        {
          heading: '4. Acquisti e Rimborsi',
          content: 'Tutti gli acquisti avvengono tramite Microsoft Store:\n• Nessuna versione di prova: il pagamento avviene al primo acquisto\n• I rimborsi sono soggetti alle policy del Microsoft Store\n• Lo sviluppatore non gestisce rimborsi direttamente\n• Per richieste di rimborso, contattare il supporto Microsoft Store'
        },
        {
          heading: '5. Licenza d\'Uso',
          content: 'Con l\'acquisto di Chronos, ottieni una licenza personale non esclusiva per:\n• Utilizzare il software su dispositivi associati al tuo account Microsoft\n• Aggiornamenti gratuiti inclusi nella versione acquistata\n\nNon è consentito:\n• Redistribuire o rivendere il software\n• Decompilare o reverse-engineering\n• Utilizzare per scopi illegali'
        },
        {
          heading: '6. Privacy e Dati',
          content: 'Chronos elabora i file localmente sul tuo dispositivo:\n• Nessun contenuto dei file viene trasmesso a server esterni\n• Le configurazioni sono salvate localmente\n• Nessun tracking del contenuto elaborato\n\nPer maggiori dettagli, consulta la nostra Informativa sulla Privacy.'
        },
        {
          heading: '7. Proprietà Intellettuale',
          content: 'Chronos e i suoi contenuti (logo, design, codice) sono di proprietà di Chronos. I file elaborati dall\'utente rimangono di proprietà dell\'utente.'
        },
        {
          heading: '8. Limitazione di Responsabilità',
          content: 'Chronos è fornito "così com\'è". Non garantiamo che il servizio sarà sempre disponibile o privo di errori. Non siamo responsabili per:\n• Perdita di dati durante l\'elaborazione\n• Danni indiretti o consequenziali\n• Problemi derivanti da uso improprio del software'
        },
        {
          heading: '9. Modifiche ai Termini',
          content: 'Ci riserviamo il diritto di modificare questi termini. Le modifiche saranno comunicate sul sito. L\'uso continuato del servizio dopo le modifiche implica l\'accettazione dei nuovi termini.'
        },
        {
          heading: '10. Legge Applicabile',
          content: 'Questi termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente il Foro di Roma.'
        },
        {
          heading: '11. Contatti',
          content: 'Per domande sui Termini di Servizio:\nEmail: legal@chronos.app\nWebsite: https://chronos.app'
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: January 16, 2026',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          content: 'By using Chronos, you fully accept these Terms of Service. If you disagree with any part of the terms, you may not use the service.'
        },
        {
          heading: '2. Service Description',
          content: 'Chronos is a Windows desktop application that automates AI interactions by handling security popups and cooldowns like ChatGPT and Claude. The service includes:\n• Background vision and OCR detection\n• Auto-clicker for AI agents\n• Profile and workspace management\n• Automated workflow execution'
        },
        {
          heading: '3. Plans and Pricing',
          content: 'Chronos offers:\n\n• Standard License (€14.99 one-time): Multi-thread processing, desktop notifications and all future updates.\n\n• Pro Monthly (€6.99/month): All Standard features plus: custom presets, advanced templates, manual file selection, split output and Windows context menu.\n\n• Pro Annual (€59/year = ~€4.92/month): Same as Pro Monthly with ~30% savings.\n\nAll payments are handled exclusively through Microsoft Store.'
        },
        {
          heading: '4. Purchases and Refunds',
          content: 'All purchases are made through Microsoft Store:\n• No trial version: payment occurs on first purchase\n• Refunds are subject to Microsoft Store policies\n• Developer does not handle refunds directly\n• For refund requests, contact Microsoft Store support'
        },
        {
          heading: '5. License',
          content: 'By purchasing Chronos, you receive a personal non-exclusive license to:\n• Use the software on devices associated with your Microsoft account\n• Free updates included in the purchased version\n\nNot permitted:\n• Redistribute or resell the software\n• Decompile or reverse-engineer\n• Use for illegal purposes'
        },
        {
          heading: '6. Privacy and Data',
          content: 'Chronos processes files locally on your device:\n• No file content is transmitted to external servers\n• Configurations are saved locally\n• No tracking of processed content\n\nFor more details, see our Privacy Policy.'
        },
        {
          heading: '7. Intellectual Property',
          content: 'Chronos and its contents (logo, design, code) are owned by Chronos. Files processed by the user remain the user\'s property.'
        },
        {
          heading: '8. Limitation of Liability',
          content: 'Chronos is provided "as is". We do not guarantee the service will always be available or error-free. We are not liable for:\n• Data loss during processing\n• Indirect or consequential damages\n• Issues from improper software use'
        },
        {
          heading: '9. Terms Modifications',
          content: 'We reserve the right to modify these terms. Changes will be communicated on the website. Continued use after modifications implies acceptance of new terms.'
        },
        {
          heading: '10. Governing Law',
          content: 'These terms are governed by Italian law. The Court of Rome has jurisdiction for any disputes.'
        },
        {
          heading: '11. Contact',
          content: 'For Terms of Service questions:\nEmail: legal@chronos.app\nWebsite: https://chronos.app'
        }
      ]
    },
    de: {
      title: 'Nutzungsbedingungen',
      lastUpdated: 'Letzte Aktualisierung: 16. Januar 2026',
      sections: [
        {
          heading: '1. Annahme der Bedingungen',
          content: 'Durch die Nutzung von Chronos akzeptieren Sie diese Nutzungsbedingungen vollständig.'
        },
        {
          heading: '2. Servicebeschreibung',
          content: 'Chronos ist eine Windows-Desktop-Anwendung zur Konvertierung von Ordnerstrukturen in Textdateien für LLMs.'
        },
        {
          heading: '3. Pläne und Preise',
          content: 'Standardlizenz: €14,99 einmalig (Multi-Thread, Desktop-Benachrichtigungen). Pro Monatlich: €6,99/Monat (erweiterte Funktionen). Pro Jährlich: €59/Jahr (~30% Ersparnis). Alle Zahlungen über Microsoft Store.'
        }
      ]
    },
    fr: {
      title: 'Conditions d\'Utilisation',
      lastUpdated: 'Dernière mise à jour: 16 janvier 2026',
      sections: [
        {
          heading: '1. Acceptation des Conditions',
          content: 'En utilisant Chronos, vous acceptez intégralement ces Conditions d\'Utilisation.'
        },
        {
          heading: '2. Description du Service',
          content: 'Chronos est une application de bureau Windows pour convertir des structures de dossiers en fichiers texte pour les LLMs.'
        },
        {
          heading: '3. Plans et Tarifs',
          content: 'Licence Standard: €14,99 unique (multi-thread, notifications). Pro Mensuel: €6,99/mois (fonctionnalités avancées). Pro Annuel: €59/an (~30% économie). Tous les paiements via Microsoft Store.'
        }
      ]
    },
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: 16 de enero de 2026',
      sections: [
        {
          heading: '1. Aceptación de Términos',
          content: 'Al usar Chronos, aceptas completamente estos Términos de Servicio.'
        },
        {
          heading: '2. Descripción del Servicio',
          content: 'Chronos es una aplicación de escritorio Windows para convertir estructuras de carpetas en archivos de texto para LLMs.'
        },
        {
          heading: '3. Planes y Precios',
          content: 'Licencia Estándar: €14,99 único (multi-hilo, notificaciones). Pro Mensual: €6,99/mes (funciones avanzadas). Pro Anual: €59/año (~30% ahorro). Todos los pagos a través de Microsoft Store.'
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${currentContent.title} | Chronos`}
        description="Terms of Service for Chronos - Understand your rights and responsibilities"
      />
      
      {/* Navbar */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to={getLocalizedPath('/')} className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <FolderCode className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-gradient">Chronos</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">{currentContent.title}</h1>
        <p className="text-muted-foreground mb-8">{currentContent.lastUpdated}</p>
        
        <div className="space-y-8">
          {currentContent.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2026 Chronos. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
