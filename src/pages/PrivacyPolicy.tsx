import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { FolderCode, Moon, Sun, ChevronLeft } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

const PrivacyPolicy = () => {
  const { language, getLocalizedPath } = useLanguage();
  const { resolvedTheme, toggleTheme } = useTheme();

  const content: Record<string, { title: string; lastUpdated: string; intro?: string; sections: { heading: string; content: string }[] }> = {
    it: {
      title: 'Informativa sulla Privacy',
      lastUpdated: 'Ultimo aggiornamento: 24 Gennaio 2026',
      intro: '**In breve**: Chronos funziona interamente sul tuo computer. Non raccogliamo, archiviamo o trasmettiamo alcun dato personale. Tutto rimane privato e offline.',
      sections: [
        {
          heading: '1. Panoramica',
          content: 'Chronos è un\'applicazione desktop per Windows che funziona interamente sul tuo computer locale. Prendiamo seriamente la tua privacy e abbiamo progettato l\'app per operare completamente offline senza raccogliere, trasmettere o archiviare alcun dato personale.'
        },
        {
          heading: '2. Raccolta Dati',
          content: '• **Nessuna raccolta dati**: Chronos non raccoglie alcun dato utente, informazione personale o statistica d\'uso\n• **Funzionamento offline**: Tutta l\'elaborazione dei file avviene localmente sul tuo computer\n• **Nessun analytics**: Non utilizziamo servizi di analytics, tracking o telemetria\n• **Nessun servizio di terze parti**: Nessuna connessione a server esterni o servizi cloud\n• **Nessun account richiesto**: Non è necessaria registrazione, login o account online'
        },
        {
          heading: '3. Accesso e Elaborazione File',
          content: '• Chronos accede ai file **solo quando lo richiedi esplicitamente** tramite il menu contestuale\n• I dati dei file sono elaborati localmente e **mai trasmessi** via internet\n• I file di output vengono salvati **solo sul tuo computer locale**\n• Nessun file viene caricato, salvato in backup o archiviato da noi\n• Hai il controllo completo su quali cartelle e file elaborare'
        },
        {
          heading: '4. Permessi Windows',
          content: 'Chronos richiede i seguenti permessi Windows per funzionare:\n\n• **Accesso al file system**: Per leggere strutture di cartelle e contenuti di file quando scegli di elaborarli\n• **Integrazione menu contestuale**: Per apparire nel menu di Windows Explorer accessibile con il tasto destro\n\nQuesti permessi sono utilizzati esclusivamente per la funzionalità dell\'app e non per raccogliere o trasmettere dati.'
        },
        {
          heading: '5. Impostazioni e Preferenze Locali',
          content: 'Chronos memorizza le tue preferenze (come formato di output, tema e impostazioni filtri) localmente sul tuo computer. Queste impostazioni sono archiviate nel registro di Windows o nella cartella dati applicazione locale e non vengono mai trasmesse o condivise.'
        },
        {
          heading: '6. Connettività Internet',
          content: 'Chronos **non richiede** una connessione internet per funzionare. L\'app opera interamente offline. Nessun dato viene inviato o ricevuto da server esterni.'
        },
        {
          heading: '7. Versione Pro e Licenze',
          content: 'Se acquisti la versione Pro di Chronos tramite Microsoft Store, la transazione è gestita interamente da Microsoft. Non abbiamo accesso alle tue informazioni di pagamento. Microsoft potrebbe raccogliere dati secondo la propria politica sulla privacy.'
        },
        {
          heading: '8. Aggiornamenti',
          content: 'Gli aggiornamenti dell\'app vengono distribuiti tramite Microsoft Store. Microsoft potrebbe raccogliere dati anonimi sull\'uso riguardo installazioni e aggiornamenti delle app secondo la loro politica sulla privacy, ma non abbiamo accesso a questi dati.'
        },
        {
          heading: '9. Privacy dei Minori',
          content: 'Chronos non raccoglie alcuna informazione personale da nessuno, inclusi minori di 13 anni. L\'app è progettata per uso generale e può essere utilizzata in sicurezza da utenti di tutte le età.'
        },
        {
          heading: '10. Modifiche a Questa Informativa',
          content: 'Potremmo aggiornare questa informativa sulla privacy di tanto in tanto per riflettere modifiche nell\'app o requisiti legali. Eventuali modifiche saranno pubblicate su questa pagina con una data "Ultimo aggiornamento" aggiornata. Ti incoraggiamo a rivedere periodicamente questa politica.'
        },
        {
          heading: '11. I Tuoi Diritti',
          content: 'Poiché Chronos non raccoglie alcun dato personale, non ci sono dati per noi da accedere, modificare o eliminare. Tutti i dati rimangono sotto il tuo completo controllo sul tuo computer locale.'
        },
        {
          heading: '12. Contattaci',
          content: 'Se hai domande o dubbi su questa informativa sulla privacy o sulle pratiche sui dati di Chronos, contattaci:\n\n• **Email**: umberto.dipuorto@gmail.com\n• **Sito web**: https://chronos.dev'
        },
        {
          heading: '13. Conformità',
          content: 'Questa informativa sulla privacy è progettata per essere conforme a:\n\n• Politiche Microsoft Store\n• Regolamento Generale sulla Protezione dei Dati dell\'UE (GDPR)\n• California Consumer Privacy Act (CCPA)\n\nPoiché Chronos non raccoglie dati personali, la maggior parte dei requisiti sulla protezione dei dati non si applica.'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 24, 2026',
      intro: '**Simple Summary**: Chronos runs entirely on your computer. We don\'t collect, store, or transmit any of your data. Everything stays private and offline.',
      sections: [
        {
          heading: '1. Overview',
          content: 'Chronos is a desktop application for Windows that runs entirely on your local computer. We take your privacy seriously and have designed the app to operate completely offline without collecting, transmitting, or storing any personal data.'
        },
        {
          heading: '2. Data Collection',
          content: '• **No data collection**: Chronos does not collect any user data, personal information, or usage statistics\n• **Offline operation**: All file processing happens locally on your computer\n• **No analytics**: We do not use any analytics, tracking, or telemetry services\n• **No third-party services**: No connections to external servers or cloud services\n• **No account required**: No registration, login, or online account needed'
        },
        {
          heading: '3. File Access and Processing',
          content: '• Chronos accesses files **only when you explicitly request it** via the context menu\n• File data is processed locally and **never transmitted** over the internet\n• Output files are saved **only to your local computer**\n• No files are uploaded, backed up, or stored by us\n• You have complete control over which folders and files to process'
        },
        {
          heading: '4. Windows Permissions',
          content: 'Chronos requires the following Windows permissions to function:\n\n• **File system access**: To read folder structures and file contents when you choose to process them\n• **Context menu integration**: To appear in Windows Explorer right-click menu for easy access\n\nThese permissions are used solely for app functionality and are not used to collect or transmit data.'
        },
        {
          heading: '5. Local Settings and Preferences',
          content: 'Chronos stores your preferences (such as output format, theme, and filter settings) locally on your computer. These settings are stored in the Windows registry or local application data folder and are never transmitted or shared.'
        },
        {
          heading: '6. Internet Connectivity',
          content: 'Chronos does **not require** an internet connection to function. The app operates entirely offline. No data is sent to or received from any external servers.'
        },
        {
          heading: '7. Pro Version and Licensing',
          content: 'If you purchase the Pro version of Chronos through the Microsoft Store, the transaction is handled entirely by Microsoft. We do not have access to your payment information. Microsoft may collect data according to their own privacy policy.'
        },
        {
          heading: '8. Updates',
          content: 'App updates are delivered through the Microsoft Store. Microsoft may collect anonymous usage data about app installations and updates according to their privacy policy, but we do not have access to this data.'
        },
        {
          heading: '9. Children\'s Privacy',
          content: 'Chronos does not collect any personal information from anyone, including children under 13. The app is designed for general use and can be safely used by users of all ages.'
        },
        {
          heading: '10. Changes to This Privacy Policy',
          content: 'We may update this privacy policy from time to time to reflect changes in the app or legal requirements. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.'
        },
        {
          heading: '11. Your Rights',
          content: 'Since Chronos does not collect any personal data, there is no data for us to access, modify, or delete. All data remains under your complete control on your local computer.'
        },
        {
          heading: '12. Contact Us',
          content: 'If you have any questions or concerns about this privacy policy or Chronos\'s data practices, please contact us:\n\n• **Email**: umberto.dipuorto@gmail.com\n• **Website**: https://chronos.dev'
        },
        {
          heading: '13. Compliance',
          content: 'This privacy policy is designed to be compliant with:\n\n• Microsoft Store policies\n• EU General Data Protection Regulation (GDPR)\n• California Consumer Privacy Act (CCPA)\n\nSince Chronos does not collect personal data, most data protection requirements do not apply.'
        }
      ]
    },
    de: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Letzte Aktualisierung: 16. Januar 2026',
      sections: [
        {
          heading: '1. Verantwortlicher',
          content: 'Der Verantwortliche für die Datenverarbeitung ist Chronos. Bei Datenschutzanfragen kontaktieren Sie uns unter: privacy@chronos.app'
        },
        {
          heading: '2. Erhobene Daten',
          content: 'Wir erheben folgende Datenarten:\n• Identifikationsdaten: E-Mail (optional, nur für registrierte Benutzer)\n• Technische Daten: IP-Adresse, Browsertyp, verwendetes Gerät\n• Nutzungsdaten: verwendete Funktionen, gespeicherte Konfigurationen\n\nHINWEIS: Chronos sammelt oder überträgt nicht den Inhalt verarbeiteter Dateien.'
        },
        {
          heading: '3. Zweck der Verarbeitung',
          content: 'Ihre Daten werden verarbeitet für:\n• Bereitstellung des Dateikonvertierungsdienstes\n• Lizenzverwaltung über Microsoft Store\n• Serviceverbesserung\n• Servicebezogene Kommunikation\n• Gesetzliche Anforderungen'
        }
      ]
    },
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour: 16 janvier 2026',
      sections: [
        {
          heading: '1. Responsable du Traitement',
          content: 'Le responsable du traitement des données est Chronos. Pour toute demande relative à la confidentialité, contactez-nous à: privacy@chronos.app'
        },
        {
          heading: '2. Données Collectées',
          content: 'Nous collectons les types de données suivants:\n• Données d\'identification: email (optionnel)\n• Données techniques: adresse IP, type de navigateur\n• Données d\'utilisation: fonctionnalités utilisées\n\nNOTE: Chronos ne collecte pas le contenu des fichiers traités.'
        }
      ]
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: 16 de enero de 2026',
      sections: [
        {
          heading: '1. Responsable del Tratamiento',
          content: 'El responsable del tratamiento de datos es Chronos. Para solicitudes de privacidad, contáctenos en: privacy@chronos.app'
        },
        {
          heading: '2. Datos Recopilados',
          content: 'Recopilamos los siguientes tipos de datos:\n• Datos de identificación: email (opcional)\n• Datos técnicos: dirección IP, tipo de navegador\n• Datos de uso: funciones utilizadas\n\nNOTA: Chronos no recopila el contenido de los archivos procesados.'
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${currentContent.title} | Chronos`}
        description="Privacy Policy for Chronos - Learn how we protect your personal data"
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

export default PrivacyPolicy;
