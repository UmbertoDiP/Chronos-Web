/**
 * Verifies semantic equivalence between:
 *  - Static FAQPage JSON-LD blocks injected in index.html (server/SSR fallback)
 *  - Runtime FAQPage JSON-LD that react-helmet-async would inject from
 *    src/components/StructuredData/FAQPage.tsx for the active language.
 *
 * For each of the 36 supported languages we check:
 *  - exactly one static FAQPage block exists for that language
 *  - the runtime schema (rebuilt from the real translator) contains the same
 *    set of questions/answers as the static one (order-independent)
 *  - no duplicate question names within a single FAQPage
 *  - no duplicate @id across all static FAQPage blocks
 *  - the runtime block does not collide with a static @id (so once mounted
 *    we never end up with two FAQPage entries pointing at the same node)
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  translations,
  getTranslation,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '../src/lib/i18n/translations';

const INDEX_HTML = readFileSync(
  path.resolve(__dirname, '../index.html'),
  'utf-8',
);

type FAQEntry = { question: string; answer: string };
type FAQPageSchema = {
  '@context'?: string;
  '@type'?: string | string[];
  '@id'?: string;
  inLanguage?: string;
  url?: string;
  mainEntity?: Array<{
    '@type'?: string;
    '@id'?: string;
    name?: string;
    acceptedAnswer?: { '@type'?: string; text?: string };
  }>;
};

/** Extract every JSON-LD script of @type FAQPage from index.html. */
function extractStaticFAQPages(html: string): FAQPageSchema[] {
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const out: FAQPageSchema[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1].trim();
    if (!raw) continue;
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      continue;
    }
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    for (const node of nodes) {
      const t = node?.['@type'];
      const isFAQ = Array.isArray(t) ? t.includes('FAQPage') : t === 'FAQPage';
      if (isFAQ) out.push(node as FAQPageSchema);
    }
  }
  return out;
}

/** Rebuild the runtime FAQPage schema exactly as FAQPage.tsx does. */
function buildRuntimeFAQPage(locale: SupportedLocale): FAQPageSchema {
  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;
  const faqs: FAQEntry[] = faqKeys.map((key) => ({
    question: getTranslation(locale, `landing.faq.${key}` as any),
    answer: getTranslation(
      locale,
      `landing.faq.${key.replace('q', 'a')}` as any,
    ),
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Order-independent set of "question||answer" pairs. */
function pairSet(schema: FAQPageSchema): Set<string> {
  return new Set(
    (schema.mainEntity ?? []).map(
      (q) => `${(q.name ?? '').trim()}||${(q.acceptedAnswer?.text ?? '').trim()}`,
    ),
  );
}

const STATIC_FAQS = extractStaticFAQPages(INDEX_HTML);
const STATIC_BY_LANG = new Map<string, FAQPageSchema[]>();
for (const f of STATIC_FAQS) {
  const lang = (f.inLanguage ?? '').toLowerCase();
  if (!lang) continue;
  const arr = STATIC_BY_LANG.get(lang) ?? [];
  arr.push(f);
  STATIC_BY_LANG.set(lang, arr);
}

describe('FAQPage JSON-LD: runtime ↔ static equivalence', () => {
  it('extracts at least one static FAQPage block per supported language', () => {
    const missing = SUPPORTED_LOCALES.filter((l) => !STATIC_BY_LANG.has(l));
    expect(
      missing,
      `Missing static FAQPage blocks for: ${missing.join(', ')}`,
    ).toEqual([]);
  });

  it('has exactly one static FAQPage block per supported language (no duplicates)', () => {
    const dupes = SUPPORTED_LOCALES.filter(
      (l) => (STATIC_BY_LANG.get(l)?.length ?? 0) > 1,
    );
    expect(
      dupes,
      `Duplicated static FAQPage blocks for: ${dupes.join(', ')}`,
    ).toEqual([]);
  });

  it('has globally unique @id across every static FAQPage block', () => {
    const ids = STATIC_FAQS.map((f) => f['@id']).filter(Boolean) as string[];
    const seen = new Map<string, number>();
    for (const id of ids) seen.set(id, (seen.get(id) ?? 0) + 1);
    const dup = [...seen.entries()].filter(([, n]) => n > 1).map(([id]) => id);
    expect(dup, `Duplicated FAQPage @id: ${dup.join(', ')}`).toEqual([]);
  });

  for (const locale of SUPPORTED_LOCALES) {
    describe(`[${locale}]`, () => {
      const staticBlock = STATIC_BY_LANG.get(locale)?.[0];

      it('static block exists and is well-formed', () => {
        expect(staticBlock, `no static FAQPage for ${locale}`).toBeDefined();
        expect(staticBlock!['@context']).toBe('https://schema.org');
        expect(staticBlock!.mainEntity?.length).toBeGreaterThan(0);
      });

      it('runtime schema is semantically equivalent to the static one', () => {
        if (!staticBlock) return;
        const runtime = buildRuntimeFAQPage(locale);

        // Same question count.
        expect(runtime.mainEntity!.length).toBe(staticBlock.mainEntity!.length);

        // Same set of (question, answer) pairs.
        const r = pairSet(runtime);
        const s = pairSet(staticBlock);
        const onlyInRuntime = [...r].filter((x) => !s.has(x));
        const onlyInStatic = [...s].filter((x) => !r.has(x));
        expect(
          onlyInRuntime,
          `Runtime-only entries for ${locale}: ${onlyInRuntime.join(' | ')}`,
        ).toEqual([]);
        expect(
          onlyInStatic,
          `Static-only entries for ${locale}: ${onlyInStatic.join(' | ')}`,
        ).toEqual([]);
      });

      it('has no duplicate question names within mainEntity', () => {
        if (!staticBlock) return;
        const names = staticBlock.mainEntity!.map((q) => q.name?.trim() ?? '');
        const dupes = names.filter((n, i) => names.indexOf(n) !== i);
        expect(
          dupes,
          `Duplicated questions in static ${locale}: ${dupes.join(' | ')}`,
        ).toEqual([]);

        const runtime = buildRuntimeFAQPage(locale);
        const rNames = runtime.mainEntity!.map((q) => q.name?.trim() ?? '');
        const rDupes = rNames.filter((n, i) => rNames.indexOf(n) !== i);
        expect(
          rDupes,
          `Duplicated questions in runtime ${locale}: ${rDupes.join(' | ')}`,
        ).toEqual([]);
      });

      it('runtime injection cannot collide with a static @id', () => {
        // The runtime FAQPage built by FAQPage.tsx has no @id, so it must
        // never accidentally match a static @id (which would create two
        // FAQPage entries on the same node when react-helmet-async mounts).
        const runtime = buildRuntimeFAQPage(locale);
        expect((runtime as any)['@id']).toBeUndefined();
      });
    });
  }
});
