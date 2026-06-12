// ============================================================
// Language Configuration — TEMPLATE
// ============================================================
// Supports 36 languages: 25 European + 7 Asian + 2 Middle Eastern + 2 Other
// To add a language: add entry here + create locale file + add SEO config
// ============================================================

export const SUPPORTED_LANGUAGES = [
  // Tier 1 — Primary languages
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },

  // Tier 2 — European
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },

  // Tier 3 — Asian
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },

  // Tier 4 — Middle Eastern
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },

  // Tier 5 — Other
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];
export type SupportedLocale = SupportedLanguage;
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map(l => l.code);

export const LOCALE_NAMES: Record<SupportedLocale, string> = Object.fromEntries(
  SUPPORTED_LANGUAGES.map(l => [l.code, l.name])
) as Record<SupportedLocale, string>;

// RTL languages — automatically sets dir="rtl" on <html>
export const RTL_LANGUAGES: SupportedLanguage[] = ['ar', 'he'];

export const isRTL = (lang: SupportedLanguage): boolean => RTL_LANGUAGES.includes(lang);
