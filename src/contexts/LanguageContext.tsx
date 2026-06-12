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

// Get browser language or default to Italian
const getBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
    return browserLang as SupportedLanguage;
  }
  return 'it'; // Default to Italian
};

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // Use initialLanguage if provided (for standalone modal)
    if (initialLanguage) return initialLanguage;
    
    // First check URL
    const urlLang = getLanguageFromPath(location.pathname);
    if (urlLang) return urlLang;
    
    // Then check localStorage
    const savedLang = localStorage.getItem('cv-app-language') as SupportedLanguage;
    if (savedLang && SUPPORTED_LANGUAGES.some(l => l.code === savedLang)) {
      return savedLang;
    }
    
    // Finally use browser language
    return getBrowserLanguage();
  });

  // Update URL when language changes
  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    localStorage.setItem('cv-app-language', newLang);
    
    // Update URL path
    const currentPath = location.pathname;
    const existingLang = getLanguageFromPath(currentPath);
    
    let newPath: string;
    if (existingLang) {
      // Replace existing language in path
      newPath = currentPath.replace(/^\/[a-z]{2}(\/|$)/, `/${newLang}$1`);
    } else {
      // Add language prefix
      newPath = `/${newLang}${currentPath}`;
    }
    
    navigate(newPath, { replace: true });
  }, [location.pathname, navigate]);

  // Sync language from URL on navigation
  useEffect(() => {
    const urlLang = getLanguageFromPath(location.pathname);
    if (urlLang && urlLang !== language) {
      setLanguageState(urlLang);
      localStorage.setItem('cv-app-language', urlLang);
    }
  }, [location.pathname, language]);

  // Translation function
  const t = useCallback((key: TranslationKey): string => {
    const langTranslations = translations[language];
    return langTranslations[key] || translations['en'][key] || key;
  }, [language]);

  // Get localized path
  const getLocalizedPath = useCallback((path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${language}${cleanPath}`;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages: SUPPORTED_LANGUAGES,
    getLocalizedPath,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
