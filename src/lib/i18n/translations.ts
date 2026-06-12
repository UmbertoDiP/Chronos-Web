// Main i18n exports - Chronos: IT/EN/ES only
import { SUPPORTED_LANGUAGES, SupportedLanguage, SupportedLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES, LOCALE_NAMES, isRTL, RTL_LANGUAGES } from './config';
import { TranslationKey, TranslationKeys } from './types';

import { en } from './locales/en';
import { it } from './locales/it';
import { es } from './locales/es';

type TranslationsMap = {
  en: TranslationKeys;
} & Record<Exclude<SupportedLanguage, 'en'>, Partial<TranslationKeys>>;

export const translations: TranslationsMap = { en, it, es };

export function getTranslation(locale: SupportedLocale, key: TranslationKey): string {
  const localeTranslations = translations[locale] || translations.en;
  return (localeTranslations as any)[key] || translations.en[key] || key;
}

export { SUPPORTED_LANGUAGES, DEFAULT_LOCALE, SUPPORTED_LOCALES, LOCALE_NAMES, isRTL, RTL_LANGUAGES };
export type { SupportedLanguage, SupportedLocale };
export type { TranslationKey, TranslationKeys } from './types';
