// ============================================================
// TEST: Coverage Report — Final Score 0-100%
// ============================================================
// Aggregates all checks into a single score:
//   - i18n key coverage (40% weight)
//   - i18n consistency (15% weight)
//   - SEO config coverage (20% weight)
//   - Hreflang coverage (15% weight)
//   - Placeholder detection (10% weight)
//
// Target: 100% before production deployment
// ============================================================

import { describe, it, expect } from 'vitest';
import { translations, SUPPORTED_LOCALES } from '@/lib/i18n/translations';
import { seoConfigByLanguage, getAllHreflangEntries } from '@/lib/seo/config';
import type { TranslationKeys } from '@/lib/i18n/types';

const allKeys = Object.keys(translations.en) as (keyof TranslationKeys)[];
const totalLocales = SUPPORTED_LOCALES.length;

describe('Coverage Report', () => {
  it('should generate final i18n + SEO coverage score', () => {
    // ─── 1. i18n Key Coverage (40%) ───
    let totalFound = 0;
    let totalExpected = 0;

    SUPPORTED_LOCALES.forEach(locale => {
      const localeTranslations = translations[locale] || {};
      totalExpected += allKeys.length;
      totalFound += allKeys.filter(key => key in localeTranslations).length;
    });

    const i18nCoverage = totalExpected > 0 ? totalFound / totalExpected : 0;

    // ─── 2. i18n Consistency (15%) ───
    let consistentLocales = 0;
    SUPPORTED_LOCALES.forEach(locale => {
      const localeTranslations = translations[locale] || {};
      const unknownKeys = Object.keys(localeTranslations).filter(
        key => !allKeys.includes(key as keyof TranslationKeys)
      );
      const emptyValues = Object.values(localeTranslations).filter(v => v === '');
      if (unknownKeys.length === 0 && emptyValues.length === 0) {
        consistentLocales++;
      }
    });
    const consistencyScore = consistentLocales / totalLocales;

    // ─── 3. SEO Config Coverage (20%) ───
    const seoLocales = SUPPORTED_LOCALES.filter(l => seoConfigByLanguage[l]);
    const seoCoverage = seoLocales.length / totalLocales;

    // ─── 4. Hreflang Coverage (15%) ───
    const hreflangLangs = getAllHreflangEntries().map(e => e.lang);
    const hreflangCoverage = SUPPORTED_LOCALES.filter(l => hreflangLangs.includes(l)).length / totalLocales;

    // ─── 5. Placeholder Detection (10%) ───
    const placeholderPattern = /^\[.*\]$/;
    let totalStrings = 0;
    let placeholderStrings = 0;

    SUPPORTED_LOCALES.forEach(locale => {
      const localeTranslations = translations[locale] || {};
      Object.values(localeTranslations).forEach(value => {
        if (typeof value === 'string') {
          totalStrings++;
          if (placeholderPattern.test(value)) {
            placeholderStrings++;
          }
        }
      });
    });

    const noPlaceholderScore = totalStrings > 0
      ? 1 - (placeholderStrings / totalStrings)
      : 0;

    // ─── Final Score ───
    const finalScore = Math.round(
      (i18nCoverage * 40 +
       consistencyScore * 15 +
       seoCoverage * 20 +
       hreflangCoverage * 15 +
       noPlaceholderScore * 10)
    );

    // ─── Report ───
    console.log('\n');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║        i18n + SEO COVERAGE REPORT           ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║  i18n Key Coverage  (40%):  ${(i18nCoverage * 100).toFixed(1).padStart(6)}%        ║`);
    console.log(`║  i18n Consistency   (15%):  ${(consistencyScore * 100).toFixed(1).padStart(6)}%        ║`);
    console.log(`║  SEO Config Coverage(20%):  ${(seoCoverage * 100).toFixed(1).padStart(6)}%        ║`);
    console.log(`║  Hreflang Coverage  (15%):  ${(hreflangCoverage * 100).toFixed(1).padStart(6)}%        ║`);
    console.log(`║  No Placeholders    (10%):  ${(noPlaceholderScore * 100).toFixed(1).padStart(6)}%        ║`);
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║  FINAL SCORE:               ${String(finalScore).padStart(4)}/100        ║`);
    console.log('╚══════════════════════════════════════════════╝');
    console.log('\n');

    // Details
    console.log(`Locales: ${totalLocales}`);
    console.log(`i18n Keys: ${allKeys.length} per locale`);
    console.log(`i18n Total: ${totalFound}/${totalExpected} keys translated`);
    console.log(`SEO: ${seoLocales.length}/${totalLocales} languages configured`);
    console.log(`Hreflang: ${hreflangLangs.length}/${totalLocales} entries`);
    console.log(`Placeholders: ${placeholderStrings}/${totalStrings} strings still placeholder`);

    // Only enforce 100% for production readiness check
    // Uncomment the line below when ready to enforce:
    // expect(finalScore).toBe(100);
  });
});
