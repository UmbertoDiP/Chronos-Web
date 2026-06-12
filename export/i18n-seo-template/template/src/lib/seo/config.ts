// ============================================================
// SEO Configuration — TEMPLATE
// ============================================================
// Per-language SEO: title, description, keywords
// Follows 8-cluster keyword strategy
//
// PATTERN:
//   - Title: <60 chars, keyword-first
//   - Description: <160 chars, action-oriented
//   - Keywords: 30-60 per language across 8 clusters
//
// KEYWORD CLUSTERS:
//   1. Core Product — brand + generic terms
//   2. LLM/AI Context — high-intent AI-related
//   3. Competitor Alternatives — "X alternative"
//   4. Problem-Based Long-Tail — "how to..." queries
//   5. Use Case Specific — documentation, audit, review
//   6. Platform/Distribution — store, download, OS
//   7. Format/Output — markdown, clipboard, single file
//   8. Niche/Vertical — specific tool integrations
// ============================================================

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
}

// ⚠️ REPLACE with your actual domain
const BASE_URL = 'https://your-app.com';

// Universal keywords (remain English across all languages)
const universalKeywords = [
  // Add competitor/alternative keywords here
  // Add LLM brand keywords here
  // Add platform keywords here
];

export const seoConfigByLanguage: Record<string, SEOConfig> = {
  en: {
    title: '[Your App – Primary Keyword | Free Tool]',
    description: '[Free tool description with keywords, <160 chars]',
    keywords: [
      // Cluster 1 - Core Product
      '[core keyword 1]', '[core keyword 2]',
      // Cluster 2 - LLM/AI Context
      '[ai keyword 1]', '[ai keyword 2]',
      // Cluster 4 - Problem-Based Long-Tail
      '[how to keyword 1]',
      // Cluster 5 - Use Cases
      '[use case 1]',
      // Cluster 6 - Platform
      '[platform keyword 1]',
      // Cluster 7 - Format/Output
      '[format keyword 1]',
      // Cluster 8 - Niche
      '[niche keyword 1]',
      ...universalKeywords,
    ],
  },
  // TODO: Add all 35 other languages following the same pattern
  // Each language needs localized title (<60 chars), description (<160 chars), and keywords
};

// OG:locale mapping
const localeMap: Record<string, string> = {
  en: 'en_US', it: 'it_IT', de: 'de_DE', fr: 'fr_FR', es: 'es_ES',
  pt: 'pt_PT', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', no: 'nb_NO',
  da: 'da_DK', fi: 'fi_FI', cs: 'cs_CZ', el: 'el_GR', ro: 'ro_RO',
  hu: 'hu_HU', bg: 'bg_BG', hr: 'hr_HR', sk: 'sk_SK', sr: 'sr_RS',
  lt: 'lt_LT', lv: 'lv_LV', et: 'et_EE', sl: 'sl_SI', uk: 'uk_UA',
  zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', hi: 'hi_IN', th: 'th_TH',
  vi: 'vi_VN', id: 'id_ID', ar: 'ar_SA', he: 'he_IL', tr: 'tr_TR', ru: 'ru_RU',
};

export function getSEOConfig(language: string): SEOConfig {
  return seoConfigByLanguage[language] || seoConfigByLanguage.en;
}

export function getCanonicalUrl(language: string): string {
  return language === 'en' ? BASE_URL + '/' : `${BASE_URL}/${language}`;
}

export function getOGLocale(language: string): string {
  return localeMap[language] || 'en_US';
}

export function getAllHreflangEntries(): Array<{ lang: string; url: string }> {
  return Object.keys(seoConfigByLanguage).map(lang => ({
    lang,
    url: lang === 'en' ? BASE_URL + '/' : `${BASE_URL}/${lang}`,
  }));
}

export { BASE_URL };
