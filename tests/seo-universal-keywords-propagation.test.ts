import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { seoConfigByLanguage } from "../src/lib/seo/config";
import { SUPPORTED_LANGUAGES } from "../src/lib/i18n/config";

// Keywords that MUST appear in every language (Microsoft Store synced + long-tail)
const REQUIRED_UNIVERSAL = [
  "file merge",
  "text consolidation",
  "folder aggregation",
  "developer tools",
  "log analysis",
  "data processing",
  "file management",
  "merge files into one",
  "aggregate folder contents",
  "log file analysis tool",
];

describe("Universal keywords propagation", () => {
  it("covers all 36 supported languages in seoConfigByLanguage", () => {
    const configured = Object.keys(seoConfigByLanguage);
    const missing = SUPPORTED_LANGUAGES.map(l => l.code).filter(c => !configured.includes(c));
    expect(missing, `Missing locales: ${missing.join(", ")}`).toHaveLength(0);
    expect(configured.length).toBeGreaterThanOrEqual(36);
  });

  for (const { code } of SUPPORTED_LANGUAGES) {
    it(`[${code}] includes all required universal keywords`, () => {
      const cfg = seoConfigByLanguage[code];
      expect(cfg, `Missing SEO config for ${code}`).toBeDefined();
      const kw = cfg.keywords.map(k => k.toLowerCase());
      const missing = REQUIRED_UNIVERSAL.filter(req => !kw.includes(req.toLowerCase()));
      expect(missing, `[${code}] missing universal keywords: ${missing.join(", ")}`).toHaveLength(0);
    });

    it(`[${code}] has no duplicate keywords`, () => {
      const kw = seoConfigByLanguage[code].keywords.map(k => k.toLowerCase());
      const dupes = kw.filter((k, i) => kw.indexOf(k) !== i);
      expect(dupes, `[${code}] duplicates: ${[...new Set(dupes)].join(", ")}`).toHaveLength(0);
    });
  }

  it("English runtime SEOHead emits universal keywords in meta tag content", () => {
    // SEOHead joins seoConfig.keywords with ", " into <meta name="keywords">.
    // Verify the EN config (used as fallback for any locale) yields a meta-ready
    // string containing all required universal keywords.
    const metaContent = seoConfigByLanguage.en.keywords.join(", ").toLowerCase();
    const missing = REQUIRED_UNIVERSAL.filter(k => !metaContent.includes(k.toLowerCase()));
    expect(missing, `EN meta keywords string missing: ${missing.join(", ")}`).toHaveLength(0);
    // Sanity: meta keywords stay under reasonable size (Google ignores >1000 chars but bloat is bad)
    expect(metaContent.length).toBeLessThan(8000);
  });
});
