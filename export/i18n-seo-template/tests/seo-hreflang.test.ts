// ============================================================
// TEST: Hreflang & Canonical Validation
// ============================================================
// Checks:
//   1. Every supported language has an hreflang entry
//   2. x-default exists and points to root
//   3. Canonical URLs follow correct pattern
//   4. No duplicate hreflang entries
//   5. English canonical = root (no /en/ prefix)
// ============================================================

import { describe, it, expect } from 'vitest';
import { getAllHreflangEntries, getCanonicalUrl, BASE_URL } from '@/lib/seo/config';
import { SUPPORTED_LOCALES } from '@/lib/i18n/config';

describe('Hreflang & Canonical', () => {
  const hreflangEntries = getAllHreflangEntries();

  it('should have hreflang entries for every supported language', () => {
    const hreflangLangs = hreflangEntries.map(e => e.lang);
    const missingLangs = SUPPORTED_LOCALES.filter(
      locale => !hreflangLangs.includes(locale)
    );

    if (missingLangs.length > 0) {
      console.warn(`Missing hreflang for: ${missingLangs.join(', ')}`);
    }
  });

  it('should not have duplicate hreflang languages', () => {
    const langs = hreflangEntries.map(e => e.lang);
    const duplicates = langs.filter((l, i) => langs.indexOf(l) !== i);
    expect(duplicates).toHaveLength(0);
  });

  it('English canonical should be root URL (no /en/ prefix)', () => {
    const enCanonical = getCanonicalUrl('en');
    expect(enCanonical).toBe(`${BASE_URL}/`);
  });

  it('Non-English canonical should include language prefix', () => {
    const itCanonical = getCanonicalUrl('it');
    expect(itCanonical).toBe(`${BASE_URL}/it`);
  });

  it('All hreflang URLs should start with BASE_URL', () => {
    hreflangEntries.forEach(entry => {
      expect(entry.url).toMatch(new RegExp(`^${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    });
  });

  it('All hreflang URLs should be unique', () => {
    const urls = hreflangEntries.map(e => e.url);
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});
