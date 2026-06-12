import { describe, it, expect } from "vitest";
import { LOCALIZED_LONG_TAIL, seoConfigByLanguage } from "../src/lib/seo/config";
import { SUPPORTED_LANGUAGES } from "../src/lib/i18n/config";

describe("Localized long-tail keyword coverage", () => {
  it("defines long-tail keywords for every supported language", () => {
    const missing = SUPPORTED_LANGUAGES
      .map(l => l.code)
      .filter(c => !LOCALIZED_LONG_TAIL[c] || LOCALIZED_LONG_TAIL[c].length === 0);
    expect(missing, `Missing long-tail for: ${missing.join(", ")}`).toHaveLength(0);
  });

  for (const { code } of SUPPORTED_LANGUAGES) {
    it(`[${code}] has at least 3 localized long-tail variants`, () => {
      const list = LOCALIZED_LONG_TAIL[code] || [];
      expect(list.length, `[${code}] only ${list.length} long-tail`).toBeGreaterThanOrEqual(3);
    });

    it(`[${code}] long-tail keywords are merged into seo config`, () => {
      const list = LOCALIZED_LONG_TAIL[code] || [];
      const cfgKeywords = (seoConfigByLanguage[code]?.keywords || []).map(k => k.toLowerCase());
      const missing = list.filter(k => !cfgKeywords.includes(k.toLowerCase()));
      expect(missing, `[${code}] missing in seo config: ${missing.join(", ")}`).toHaveLength(0);
    });

    it(`[${code}] long-tail variants are unique`, () => {
      const list = (LOCALIZED_LONG_TAIL[code] || []).map(k => k.toLowerCase());
      const dupes = list.filter((k, i) => list.indexOf(k) !== i);
      expect(dupes, `[${code}] duplicates: ${dupes.join(", ")}`).toHaveLength(0);
    });
  }
});
