// ============================================================
// Language Context — TEMPLATE
// ============================================================
// Provides:
//   - language state (reactive)
//   - t(key) translation function with English fallback
//   - URL-based language routing (/:lang/)
//   - Detection: URL → localStorage → browser locale
// ============================================================

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { translations, SupportedLanguage, TranslationKey, SUPPORTED_LANGUAGES } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
  availableLanguages: typeof SUPPORTED_LANGUAGES;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Extract language from URL path
const getLanguageFromPath = (pathname: string): SupportedLanguage | null => {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (match && SUPPORTED_LANGUAGES.some(l => l.code === match[1])) {
    return match[1] as SupportedLanguage;
  }
  return null;
};

// Get browser language — ⚠️ CHANGE default to your primary language
const getBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
    return browserLang as SupportedLanguage;
  }
  return 'en'; // Default fallback
};

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (initialLanguage) return initialLanguage;
    const urlLang = getLanguageFromPath(location.pathname);
    if (urlLang) return urlLang;
    const savedLang = localStorage.getItem('app-language') as SupportedLanguage;
    if (savedLang && SUPPORTED_LANGUAGES.some(l => l.code === savedLang)) return savedLang;
    return getBrowserLanguage();
  });

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    localStorage.setItem('app-language', newLang);
    const currentPath = location.pathname;
    const existingLang = getLanguageFromPath(currentPath);
    let newPath: string;
    if (existingLang) {
      newPath = currentPath.replace(/^\/[a-z]{2}(\/|$)/, `/${newLang}$1`);
    } else {
      newPath = `/${newLang}${currentPath}`;
    }
    navigate(newPath, { replace: true });
  }, [location.pathname, navigate]);

  useEffect(() => {
    const urlLang = getLanguageFromPath(location.pathname);
    if (urlLang && urlLang !== language) {
      setLanguageState(urlLang);
      localStorage.setItem('app-language', urlLang);
    }
  }, [location.pathname, language]);

  const t = useCallback((key: TranslationKey): string => {
    const langTranslations = translations[language];
    return (langTranslations as any)[key] || translations['en'][key] || key;
  }, [language]);

  const getLocalizedPath = useCallback((path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${language}${cleanPath}`;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages: SUPPORTED_LANGUAGES, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
