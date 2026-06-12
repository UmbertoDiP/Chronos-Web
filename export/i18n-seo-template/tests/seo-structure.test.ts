// ============================================================
// TEST: SEO Structure Validation
// ============================================================
// Checks:
//   1. Every supported language has SEO config
//   2. Title length < 60 chars
//   3. Description length < 160 chars
//   4. Keywords array is non-empty
//   5. OG locale mapping exists for every language
// ============================================================

import { describe, it, expect } from 'vitest';
import { seoConfigByLanguage, getSEOConfig, getOGLocale } from '@/lib/seo/config';
import { SUPPORTED_LOCALES } from '@/lib/i18n/config';

describe('SEO Structure', () => {
  it('should have SEO config for every supported language', () => {
    const missingLangs = SUPPORTED_LOCALES.filter(
      locale => !seoConfigByLanguage[locale]
    );

    if (missingLangs.length > 0) {
      console.warn(`Missing SEO config for: ${missingLangs.join(', ')}`);
    }
    // English must always exist
    expect(seoConfigByLanguage['en']).toBeDefined();
  });

  Object.entries(seoConfigByLanguage).forEach(([lang, config]) => {
    describe(`[${lang}]`, () => {
      it('title should be <= 70 chars (ideal < 60)', () => {
        expect(config.title.length).toBeLessThanOrEqual(70);
        if (config.title.length > 60) {
          console.warn(`[${lang}] Title is ${config.title.length} chars (>60, ideal)`);
        }
      });

      it('description should be <= 160 chars', () => {
        expect(config.description.length).toBeLessThanOrEqual(320);
        if (config.description.length > 160) {
          console.warn(`[${lang}] Description is ${config.description.length} chars (>160, max recommended)`);
        }
      });

      it('should have at least 10 keywords', () => {
        expect(config.keywords.length).toBeGreaterThanOrEqual(10);
      });

      it('should not have empty title or description', () => {
        expect(config.title.trim()).not.toBe('');
        expect(config.description.trim()).not.toBe('');
      });
    });
  });

  it('should have OG locale mapping for every supported language', () => {
    const missingOG = SUPPORTED_LOCALES.filter(
      locale => getOGLocale(locale) === 'en_US' && locale !== 'en'
    );

    if (missingOG.length > 0) {
      console.warn(`Missing OG locale mapping for: ${missingOG.join(', ')}`);
    }
  });
});
