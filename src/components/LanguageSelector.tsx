import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mapping: language code → ISO 3166-1 alpha-2 country code for flags
const LANG_TO_COUNTRY: Record<string, string> = {
  it: 'it', en: 'gb', de: 'de', fr: 'fr', es: 'es', pt: 'pt',
  nl: 'nl', pl: 'pl', sv: 'se', no: 'no', da: 'dk', fi: 'fi',
  cs: 'cz', el: 'gr', ro: 'ro', hu: 'hu', bg: 'bg', hr: 'hr',
  sk: 'sk', sr: 'rs', lt: 'lt', lv: 'lv', et: 'ee', sl: 'si',
  uk: 'ua', zh: 'cn', ja: 'jp', ko: 'kr', hi: 'in', th: 'th',
  vi: 'vn', id: 'id', ar: 'sa', he: 'il', tr: 'tr', ru: 'ru',
};

/** Returns flagcdn.com URL for a given language code */
const getFlagUrl = (langCode: string, width: number = 40) => {
  const country = LANG_TO_COUNTRY[langCode] || langCode;
  return `https://flagcdn.com/w${width}/${country}.png`;
};

/** Flag image component with retina support */
const FlagImg: React.FC<{ langCode: string; size?: number; className?: string }> = ({
  langCode,
  size = 20,
  className,
}) => {
  const country = LANG_TO_COUNTRY[langCode] || langCode;
  return (
    <img
      src={`https://flagcdn.com/w40/${country}.png`}
      srcSet={`https://flagcdn.com/w80/${country}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt=""
      className={cn("inline-block rounded-sm object-cover", className)}
      loading="lazy"
    />
  );
};

interface LanguageSelectorProps {
  compact?: boolean;
  variant?: 'default' | 'modal';
  showSearch?: boolean;
  triggerClassName?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  variant = 'default',
  showSearch = false,
  triggerClassName,
}) => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentLang = availableLanguages.find(l => l.code === language);

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return availableLanguages;
    const query = searchQuery.toLowerCase().trim();
    const filtered = availableLanguages.filter(lang =>
      lang.name.toLowerCase().includes(query) ||
      lang.code.toLowerCase().includes(query)
    );
    if (filtered.length === 0) {
      const en = availableLanguages.find(l => l.code === 'en');
      return en ? [en] : [];
    }
    return filtered;
  }, [searchQuery, availableLanguages]);

  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen, showSearch]);

  useEffect(() => {
    if (!isOpen) setSearchQuery('');
  }, [isOpen]);

  const handleLanguageSelect = (langCode: string) => {
    const exists = availableLanguages.some(l => l.code === langCode);
    if (exists) {
      setLanguage(langCode as typeof language);
    } else {
      console.warn(`[LanguageSelector] Language "${langCode}" not found, falling back to English`);
      setLanguage('en');
    }
    setIsOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setIsOpen(false);
    else if (e.key === 'Enter' && filteredLanguages.length > 0) {
      handleLanguageSelect(filteredLanguages[0].code);
    }
  };

  const getTriggerStyles = () => {
    if (variant === 'modal') {
      return cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        "bg-muted hover:bg-accent/10 text-foreground",
        "transition-all duration-200 border border-border",
        "hover:scale-110 active:scale-95",
        triggerClassName
      );
    }
    return cn(
      compact ? "w-9 h-9" : "gap-2 min-w-[120px]",
      triggerClassName
    );
  };

  const getContentStyles = () => {
    if (variant === 'modal') {
      return "min-w-[220px] z-[150] bg-background border border-border shadow-xl";
    }
    return "min-w-[180px] z-50 bg-background border border-border shadow-lg";
  };

  const renderTrigger = () => {
    if (variant === 'modal') {
      return (
        <button className={getTriggerStyles()} aria-label="Change language">
          <Globe className="w-4 h-4" />
        </button>
      );
    }

    return (
      <Button variant="ghost" size={compact ? "icon" : "sm"} className={getTriggerStyles()}>
        {compact ? (
          <FlagImg langCode={language} size={18} />
        ) : (
          <span className="flex items-center gap-2">
            <FlagImg langCode={language} size={18} />
            <span className="truncate">{currentLang?.name}</span>
          </span>
        )}
      </Button>
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {renderTrigger()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={getContentStyles()}>
        {showSearch && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search language..."
                className={cn(
                  "w-full pl-8 pr-3 py-2 text-sm rounded-md",
                  "bg-muted/50 border border-border",
                  "placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                  "transition-colors"
                )}
              />
            </div>
          </div>
        )}

        <div className={cn(showSearch && "max-h-[240px] overflow-y-auto", "py-1")}>
          {filteredLanguages.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground text-center">
              No languages found
            </div>
          ) : (
            filteredLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={cn(
                  "flex items-center justify-between gap-2 cursor-pointer mx-1 rounded-md",
                  language === lang.code && "bg-accent/10"
                )}
              >
                <span className="flex items-center gap-2">
                  <FlagImg langCode={lang.code} size={18} />
                  <span>{lang.name}</span>
                </span>
                {language === lang.code && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </DropdownMenuItem>
            ))
          )}
        </div>

        {showSearch && (
          <div className="px-3 py-2 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              {searchQuery
                ? `${filteredLanguages.length} result${filteredLanguages.length !== 1 ? 's' : ''}`
                : `${availableLanguages.length} languages available`
              }
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
