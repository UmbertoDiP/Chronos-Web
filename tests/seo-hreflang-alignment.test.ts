// ============================================================
// TEST: Hreflang ↔ index.html ↔ canonical ↔ sitemap alignment
// ============================================================
// Verifica che dopo ogni build/refactor:
//  1. Ogni lingua di SUPPORTED_LOCALES abbia un hreflang in index.html
//  2. index.html contenga x-default che punta alla root
//  3. Gli hreflang in index.html combacino esattamente con
//     getAllHreflangEntries() (path-based, no query string)
//  4. canonical EN = root, canonical altre lingue = /<lang>
//  5. public/sitemap.xml contenga le stesse URL hreflang
//     (almeno per la homepage principale) e x-default
// ============================================================

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  BASE_URL,
  getAllHreflangEntries,
  getCanonicalUrl,
} from "@/lib/seo/config";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";

const ROOT = resolve(__dirname, "..");
const indexHtml = readFileSync(resolve(ROOT, "index.html"), "utf8");
const sitemapXml = readFileSync(
  resolve(ROOT, "public/sitemap.xml"),
  "utf8"
);

// Estrae tutte le coppie (hreflang, href) da <link rel="alternate"> sia HTML
// (index.html) sia XML sitemap (<xhtml:link rel="alternate" hreflang=... href=...>).
// In sitemaps multi-URL conserviamo la PRIMA occorrenza di ogni lingua
// (la home è la prima <url> ed è quella che deve essere allineata).
function extractHreflangs(source: string): Map<string, string> {
  const tagRe = /<(?:xhtml:)?link\b([^>]*?)\/?>/gi;
  const attr = (s: string, name: string) => {
    const m = s.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
    return m ? m[1] : null;
  };
  const map = new Map<string, string>();
  for (const m of source.matchAll(tagRe)) {
    const attrs = m[1];
    const rel = attr(attrs, "rel");
    if (rel !== "alternate") continue;
    const lang = attr(attrs, "hreflang");
    const href = attr(attrs, "href");
    if (lang && href && !map.has(lang)) map.set(lang, href);
  }
  return map;
}

describe("Hreflang alignment: index.html ↔ config ↔ sitemap", () => {
  const indexHreflangs = extractHreflangs(indexHtml);
  const configEntries = getAllHreflangEntries();
  const configMap = new Map(configEntries.map((e) => [e.lang, e.url]));

  it("index.html declares x-default pointing to root", () => {
    const xDefault = indexHreflangs.get("x-default");
    expect(xDefault).toBeDefined();
    expect(xDefault).toBe(`${BASE_URL}/`);
  });

  it("index.html contains an hreflang for every SUPPORTED_LOCALES", () => {
    const missing = SUPPORTED_LOCALES.filter((l) => !indexHreflangs.has(l));
    expect(missing, `Missing hreflang in index.html: ${missing.join(", ")}`).toEqual([]);
  });

  it("index.html hreflang URLs match getAllHreflangEntries() exactly", () => {
    const mismatches: string[] = [];
    for (const { lang, url } of configEntries) {
      const htmlUrl = indexHreflangs.get(lang);
      if (htmlUrl !== url) {
        mismatches.push(`${lang}: html="${htmlUrl}" vs config="${url}"`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it("hreflang URLs are path-based (no query string ?lang=)", () => {
    const queryBased: string[] = [];
    for (const [lang, url] of indexHreflangs) {
      if (lang === "x-default") continue;
      if (url.includes("?lang=") || /\?[^#]*\blang=/.test(url)) {
        queryBased.push(`${lang} -> ${url}`);
      }
    }
    expect(queryBased).toEqual([]);
  });

  it("English canonical = root, others = /<lang>", () => {
    expect(getCanonicalUrl("en")).toBe(`${BASE_URL}/`);
    for (const lang of SUPPORTED_LOCALES) {
      if (lang === "en") continue;
      expect(getCanonicalUrl(lang)).toBe(`${BASE_URL}/${lang}`);
    }
  });

  it("each hreflang URL in index.html matches its own canonical", () => {
    const mismatches: string[] = [];
    for (const lang of SUPPORTED_LOCALES) {
      const htmlUrl = indexHreflangs.get(lang);
      const canonical = getCanonicalUrl(lang);
      if (htmlUrl !== canonical) {
        mismatches.push(`${lang}: hreflang="${htmlUrl}" vs canonical="${canonical}"`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it("no duplicate hreflang language codes in index.html", () => {
    const codes: string[] = [];
    const re = /hreflang=["']([^"']+)["']/gi;
    for (const m of indexHtml.matchAll(re)) codes.push(m[1]);
    const dupes = codes.filter((c, i) => codes.indexOf(c) !== i);
    expect(dupes).toEqual([]);
  });

  it("public/sitemap.xml contains x-default + all SUPPORTED_LOCALES hreflang", () => {
    const sitemapHreflangs = extractHreflangs(sitemapXml);
    expect(sitemapHreflangs.get("x-default")).toBe(`${BASE_URL}/`);

    const missing = SUPPORTED_LOCALES.filter((l) => !sitemapHreflangs.has(l));
    expect(missing, `Missing in sitemap: ${missing.join(", ")}`).toEqual([]);

    // URLs must equal canonical for each lang
    const mismatches: string[] = [];
    for (const lang of SUPPORTED_LOCALES) {
      const sUrl = sitemapHreflangs.get(lang);
      const canonical = getCanonicalUrl(lang);
      if (sUrl !== canonical) {
        mismatches.push(`${lang}: sitemap="${sUrl}" vs canonical="${canonical}"`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it("BASE_URL is consistent between index.html and config", () => {
    // Each non-x-default hreflang URL must start with BASE_URL
    for (const [lang, url] of indexHreflangs) {
      expect(url.startsWith(BASE_URL), `${lang} -> ${url}`).toBe(true);
    }
  });
});
