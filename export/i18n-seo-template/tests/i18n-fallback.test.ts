// ============================================================
// TEST: i18n Fallback Integrity
// ============================================================
// Verifies the fallback chain:
//   1. Locale value → used if exists
//   2. English value → used as fallback
//   3. Raw key → last resort, should never happen
// ============================================================

import { describe, it, expect } from 'vitest';
import { getTranslation, SUPPORTED_LOCALES } from '@/lib/i18n/translations';
import type { TranslationKey, TranslationKeys } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';

const allKeys = Object.keys(translations.en) as TranslationKey[];

describe('i18n Fallback', () => {
  it('getTranslation should return English fallback for missing locale keys', () => {
    // Use a locale that is likely incomplete
    const testLocale = 'bg'; // or any non-English locale
    const localeTranslations = translations[testLocale] || {};

    allKeys.forEach(key => {
      const result = getTranslation(testLocale, key);

      if (key in localeTranslations) {
        // Should return locale-specific value
        expect(result).toBe((localeTranslations as any)[key]);
      } else {
        // Should fall back to English
        expect(result).toBe(translations.en[key]);
      }
    });
  });

  it('getTranslation should never return raw key for known keys', () => {
    const rawKeyReturns: string[] = [];

    SUPPORTED_LOCALES.forEach(locale => {
      allKeys.forEach(key => {
        const result = getTranslation(locale, key);
        if (result === key) {
          rawKeyReturns.push(`[${locale}] ${key}`);
        }
      });
    });

    if (rawKeyReturns.length > 0) {
      console.warn(
        `Keys returning raw key (missing in English!):\n` +
        rawKeyReturns.join('\n')
      );
    }
    expect(rawKeyReturns).toHaveLength(0);
  });

  it('getTranslation should handle unknown locale gracefully', () => {
    const result = getTranslation('xx' as any, 'nav.home');
    expect(result).toBe(translations.en['nav.home']);
  });
});
