// ============================================================
// i18n Aggregator — TEMPLATE
// ============================================================
// This file imports all locale files and provides:
//   - translations map
//   - getTranslation() with fallback to English
//
// PATTERN:
//   English locale = TranslationKeys (complete, source of truth)
//   All other locales = Partial<TranslationKeys> (fallback to en)
// ============================================================

import { SUPPORTED_LANGUAGES, SupportedLanguage, SupportedLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES, LOCALE_NAMES, isRTL, RTL_LANGUAGES } from './config';
import { TranslationKey, TranslationKeys } from './types';

// Import all locale files
import { en } from './locales/en';
// TODO: Import other locales as you create them
// import { it } from './locales/it';
// import { de } from './locales/de';
// ... etc for all 36 languages

// Build translations object
type TranslationsMap = {
  en: TranslationKeys;
} & Record<Exclude<SupportedLanguage, 'en'>, Partial<TranslationKeys>>;

export const translations: TranslationsMap = {
  en,
  // TODO: Add other locales here
  // Temporarily fill with empty objects — tests will flag missing keys
  it: {}, de: {}, fr: {}, es: {}, pt: {}, nl: {}, pl: {}, sv: {}, no: {},
  da: {}, fi: {}, cs: {}, el: {}, ro: {}, hu: {}, bg: {}, hr: {}, sk: {},
  sr: {}, lt: {}, lv: {}, et: {}, sl: {}, uk: {},
  zh: {}, ja: {}, ko: {}, hi: {}, th: {}, vi: {}, id: {},
  ar: {}, he: {}, tr: {}, ru: {},
} as TranslationsMap;

// Helper to get translation with fallback to English
export function getTranslation(locale: SupportedLocale, key: TranslationKey): string {
  const localeTranslations = translations[locale] || translations.en;
  return (localeTranslations as any)[key] || translations.en[key] || key;
}

// Re-export everything
export { SUPPORTED_LANGUAGES, DEFAULT_LOCALE, SUPPORTED_LOCALES, LOCALE_NAMES, isRTL, RTL_LANGUAGES };
export type { SupportedLanguage, SupportedLocale };
export type { TranslationKey, TranslationKeys } from './types';
