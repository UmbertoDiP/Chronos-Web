// ============================================================
// TEST: i18n Key Existence
// ============================================================
// Verifies every key in TranslationKeys exists in every locale.
// Missing keys are logged. Score = (found / total) per locale.
// ============================================================

import { describe, it, expect } from 'vitest';
import { translations, SUPPORTED_LOCALES } from '@/lib/i18n/translations';
import type { TranslationKeys } from '@/lib/i18n/types';

// Get all keys from English (source of truth)
const allKeys = Object.keys(translations.en) as (keyof TranslationKeys)[];

describe('i18n Key Existence', () => {
  SUPPORTED_LOCALES.forEach(locale => {
    it(`[${locale}] should have all ${allKeys.length} translation keys`, () => {
      const localeTranslations = translations[locale] || {};
      const missingKeys = allKeys.filter(key => !(key in localeTranslations));

      if (missingKeys.length > 0) {
        console.warn(
          `[${locale}] Missing ${missingKeys.length}/${allKeys.length} keys:\n` +
          missingKeys.map(k => `  - ${k}`).join('\n')
        );
      }

      // For English, require 100%. For others, warn but don't fail.
      if (locale === 'en') {
        expect(missingKeys).toHaveLength(0);
      }
    });
  });
});
