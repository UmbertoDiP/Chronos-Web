import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Settings2, Cookie } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CONSENT_KEY = 'chronos_cookie_consent';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
    
    const handleReopen = () => {
      localStorage.removeItem(CONSENT_KEY);
      setShow(true);
    };
    
    window.addEventListener('reopenCookieConsent', handleReopen);
    return () => window.removeEventListener('reopenCookieConsent', handleReopen);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
    setShow(false);
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: prefs }));
  };

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const handleDecline = () => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    savePreferences({ essential: true, analytics: analyticsEnabled, marketing: false });
  };

  if (!show) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t shadow-lg animate-in slide-in-from-bottom-5 duration-300"
      role="dialog"
      aria-label={t('cookie.title')}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-foreground flex-1">
              {t('cookie.message')}{' '}
              <a href="/privacy" className="text-primary hover:underline">
                {t('cookie.privacy')}
              </a>
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleDecline}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {showDetails && (
            <div className="space-y-2 py-2 border-t border-b">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">{t('cookie.essential')}</span>
                  <p className="text-xs text-muted-foreground">{t('cookie.essentialDesc')}</p>
                </div>
                <span className="text-xs text-muted-foreground">{t('cookie.alwaysActive')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">{t('cookie.analytics')}</span>
                  <p className="text-xs text-muted-foreground">{t('cookie.analyticsDesc')}</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="rounded" 
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {showDetails ? (
              <Button size="sm" onClick={handleSaveCustom}>
                {t('cookie.save')}
              </Button>
            ) : (
              <>
                <Button size="sm" onClick={handleAcceptAll}>
                  {t('cookie.accept')}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDecline}>
                  {t('cookie.decline')}
                </Button>
              </>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="gap-1"
            >
              <Settings2 className="h-3 w-3" />
              {t('cookie.customize')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const hasConsent = (type: 'analytics' | 'marketing' = 'analytics'): boolean => {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (!consent) return false;
  try {
    const prefs = JSON.parse(consent);
    return prefs[type] === true;
  } catch {
    return consent === 'accepted';
  }
};

export const openCookieSettings = (): void => {
  localStorage.removeItem(CONSENT_KEY);
  window.location.reload();
};

// Cookie Settings Button Component
export const CookieSettingsButton = () => {
  const { t } = useLanguage();
  
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('reopenCookieConsent'));
  };
  
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
    >
      <Cookie className="w-3.5 h-3.5" />
      {t('cookie.manage')}
    </button>
  );
};

export default CookieConsent;
