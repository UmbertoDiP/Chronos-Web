// ============================================================
// TEST: i18n Cross-Language Consistency
// ============================================================
// Checks:
//   1. No locale has keys that don't exist in English
//   2. No empty string values
//   3. Placeholder markers [xxx] are flagged (not real content)
//   4. Keys with {variables} have same variables across locales
// ============================================================

import { describe, it, expect } from 'vitest';
import { translations, SUPPORTED_LOCALES } from '@/lib/i18n/translations';
import type { TranslationKeys } from '@/lib/i18n/types';

const allKeys = Object.keys(translations.en) as (keyof TranslationKeys)[];

describe('i18n Consistency', () => {
  SUPPORTED_LOCALES.forEach(locale => {
    if (locale === 'en') return;

    it(`[${locale}] should not have unknown keys (not in English)`, () => {
      const localeTranslations = translations[locale] || {};
      const unknownKeys = Object.keys(localeTranslations).filter(
        key => !allKeys.includes(key as keyof TranslationKeys)
      );
      expect(unknownKeys).toHaveLength(0);
    });

    it(`[${locale}] should not have empty string values`, () => {
      const localeTranslations = translations[locale] || {};
      const emptyKeys = Object.entries(localeTranslations)
        .filter(([_, value]) => value === '')
        .map(([key]) => key);

      if (emptyKeys.length > 0) {
        console.warn(`[${locale}] Empty values: ${emptyKeys.join(', ')}`);
      }
      expect(emptyKeys).toHaveLength(0);
    });
  });

  it('should detect placeholder markers [xxx] in all locales', () => {
    const placeholderPattern = /^\[.*\]$/;
    const placeholders: { locale: string; key: string }[] = [];

    SUPPORTED_LOCALES.forEach(locale => {
      const localeTranslations = translations[locale] || {};
      Object.entries(localeTranslations).forEach(([key, value]) => {
        if (typeof value === 'string' && placeholderPattern.test(value)) {
          placeholders.push({ locale, key });
        }
      });
    });

    if (placeholders.length > 0) {
      console.warn(
        `Found ${placeholders.length} placeholder values:\n` +
        placeholders.map(p => `  [${p.locale}] ${p.key}`).join('\n')
      );
    }
  });

  it('should have consistent {variable} patterns across locales', () => {
    const variablePattern = /\{(\w+)\}/g;
    const inconsistencies: string[] = [];

    allKeys.forEach(key => {
      const enValue = translations.en[key] || '';
      const enVars = [...enValue.matchAll(variablePattern)].map(m => m[1]).sort();

      if (enVars.length === 0) return;

      SUPPORTED_LOCALES.forEach(locale => {
        if (locale === 'en') return;
        const localeValue = (translations[locale] as any)?.[key];
        if (!localeValue) return;

        const localeVars = [...localeValue.matchAll(variablePattern)].map((m: any) => m[1]).sort();

        if (JSON.stringify(enVars) !== JSON.stringify(localeVars)) {
          inconsistencies.push(
            `[${locale}] ${key}: expected {${enVars.join(', ')}} got {${localeVars.join(', ')}}`
          );
        }
      });
    });

    if (inconsistencies.length > 0) {
      console.warn(`Variable inconsistencies:\n${inconsistencies.join('\n')}`);
    }
    expect(inconsistencies).toHaveLength(0);
  });
});
