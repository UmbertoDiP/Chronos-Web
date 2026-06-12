// Language configuration for i18n system
// Supports 32 languages as specified in languages_data.py

export const SUPPORTED_LANGUAGES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English',  flag: '🇬🇧' },
  { code: 'es', name: 'Español',  flag: '🇪🇸' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];
export type SupportedLocale = SupportedLanguage;
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map(l => l.code);

export const LOCALE_NAMES: Record<SupportedLocale, string> = Object.fromEntries(
  SUPPORTED_LANGUAGES.map(l => [l.code, l.name])
) as Record<SupportedLocale, string>;

// RTL languages
// RTL languages (none active in current set)
export const RTL_LANGUAGES: SupportedLanguage[] = [];

export const isRTL = (lang: SupportedLanguage): boolean => RTL_LANGUAGES.includes(lang);
