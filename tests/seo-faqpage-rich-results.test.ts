// ============================================================
// TEST: FAQPage JSON-LD ↔ Google Rich Results requirements
// ============================================================
// Estrae tutti i <script type="application/ld+json" data-faq-lang="xx">
// da index.html e valida ogni blocco contro i requisiti di Google
// per il rich result FAQ:
//   https://developers.google.com/search/docs/appearance/structured-data/faqpage
//
// Regole controllate:
//  - @context = https://schema.org
//  - @type    = FAQPage
//  - mainEntity = array non vuoto
//  - ogni elemento è Question con name e acceptedAnswer.Answer.text
//  - name e text non vuoti, name < 300 char, text >= 10 char
//  - nessun duplicato di name (case-insensitive) nello stesso blocco
//  - opzionali raccomandati: inLanguage, @id, url, dateModified ISO 8601
// ============================================================

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(__dirname, "..");
const html = readFileSync(resolve(ROOT, "index.html"), "utf8");

type Severity = "error" | "warning";
type Issue = { severity: Severity; path: string; message: string };
type Block = { lang: string; raw: string; parsed: any | null; parseError: string | null };

const tagRe =
  /<script type="application\/ld\+json"([^>]*)>(\{[\s\S]*?\})<\/script>/g;

function extractFaqBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  for (const m of source.matchAll(tagRe)) {
    const attrs = m[1];
    const langMatch = attrs.match(/data-faq-lang="([a-z]{2})"/);
    if (!langMatch) continue;
    const lang = langMatch[1];
    const raw = m[2];
    try {
      blocks.push({ lang, raw, parsed: JSON.parse(raw), parseError: null });
    } catch (e: any) {
      blocks.push({ lang, raw, parsed: null, parseError: e?.message ?? "Invalid JSON" });
    }
  }
  return blocks;
}

function validate(block: Block): Issue[] {
  const issues: Issue[] = [];
  const push = (severity: Severity, path: string, message: string) =>
    issues.push({ severity, path, message });

  if (block.parseError) {
    push("error", "(root)", `Invalid JSON: ${block.parseError}`);
    return issues;
  }
  const d = block.parsed;
  if (!d || typeof d !== "object") {
    push("error", "(root)", "Parsed value is not an object");
    return issues;
  }

  if (d["@context"] !== "https://schema.org" && d["@context"] !== "http://schema.org")
    push("error", "@context", `Must be "https://schema.org" (got ${JSON.stringify(d["@context"])})`);
  if (d["@type"] !== "FAQPage")
    push("error", "@type", `Must be "FAQPage" (got ${JSON.stringify(d["@type"])})`);

  if (!d.inLanguage) push("warning", "inLanguage", "Missing inLanguage");
  if (!d["@id"]) push("warning", "@id", "Missing @id");
  if (!d.url) push("warning", "url", "Missing url");
  if (d.dateModified && !/^\d{4}-\d{2}-\d{2}/.test(d.dateModified))
    push("warning", "dateModified", `Should be ISO 8601 (got ${d.dateModified})`);

  const me = d.mainEntity;
  if (!Array.isArray(me) || me.length === 0) {
    push("error", "mainEntity", "Must be a non-empty array of Question");
    return issues;
  }

  const seen = new Set<string>();
  me.forEach((q: any, i: number) => {
    const base = `mainEntity[${i}]`;
    if (!q || typeof q !== "object") {
      push("error", base, "Question is not an object");
      return;
    }
    if (q["@type"] !== "Question")
      push("error", `${base}.@type`, `Must be "Question" (got ${JSON.stringify(q["@type"])})`);
    if (typeof q.name !== "string" || !q.name.trim()) {
      push("error", `${base}.name`, "Missing or empty name");
    } else {
      if (q.name.length > 300)
        push("warning", `${base}.name`, `Name very long (${q.name.length} chars).`);
      const key = q.name.trim().toLowerCase();
      if (seen.has(key)) push("warning", `${base}.name`, "Duplicate question name");
      seen.add(key);
    }
    const ans = q.acceptedAnswer;
    if (!ans || typeof ans !== "object") {
      push("error", `${base}.acceptedAnswer`, "Missing acceptedAnswer");
    } else {
      if (ans["@type"] !== "Answer")
        push("error", `${base}.acceptedAnswer.@type`, `Must be "Answer" (got ${JSON.stringify(ans["@type"])})`);
      if (typeof ans.text !== "string" || !ans.text.trim())
        push("error", `${base}.acceptedAnswer.text`, "Missing or empty text");
      else if (ans.text.length < 10)
        push("warning", `${base}.acceptedAnswer.text`, `Answer very short (${ans.text.length} chars).`);
    }
  });

  return issues;
}

const blocks = extractFaqBlocks(html);

describe("FAQPage Rich Results compliance (index.html)", () => {
  it("at least one FAQPage block is present", () => {
    expect(blocks.length, "No FAQPage blocks found in index.html").toBeGreaterThan(0);
  });

  it("every block parses as valid JSON", () => {
    const broken = blocks
      .filter((b) => b.parseError)
      .map((b) => `${b.lang}: ${b.parseError}`);
    expect(broken, broken.join("\n")).toEqual([]);
  });

  it("no block has Google Rich Results errors (warnings allowed)", () => {
    const failing: string[] = [];
    for (const b of blocks) {
      const issues = validate(b);
      const errors = issues.filter((x) => x.severity === "error");
      if (errors.length > 0) {
        failing.push(
          `[${b.lang}]\n` +
            errors.map((e) => `  ✗ ${e.path} — ${e.message}`).join("\n")
        );
      }
    }
    if (failing.length > 0) {
      // eslint-disable-next-line no-console
      console.error("\nFAQPage validation errors:\n" + failing.join("\n\n"));
    }
    expect(failing, `${failing.length} block(s) failed Rich Results validation`).toEqual([]);
  });

  it("warning summary (non-blocking)", () => {
    let total = 0;
    const perLang: Record<string, number> = {};
    for (const b of blocks) {
      const w = validate(b).filter((x) => x.severity === "warning").length;
      if (w) {
        perLang[b.lang] = w;
        total += w;
      }
    }
    if (total > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `[FAQPage] ${total} warning(s) across ${Object.keys(perLang).length} block(s):`,
        perLang
      );
    }
    expect(total).toBeGreaterThanOrEqual(0); // informational only
  });

  // ─────────────────────────────────────────────────────────────
  // Speakable coherence: every block must declare a SpeakableSpecification
  // whose cssSelector points to nodes actually rendered by the app
  // (FAQSection.tsx) and includes a universal fallback (#faq).
  // ─────────────────────────────────────────────────────────────
  it("speakable selectors exist in the rendered FAQ section", () => {
    const faqSource = readFileSync(
      resolve(ROOT, "src/components/FAQSection.tsx"),
      "utf8"
    );
    const indexSource = readFileSync(
      resolve(ROOT, "src/pages/Index.tsx"),
      "utf8"
    );
    const domHooks: Record<string, boolean> = {
      "#faq": /id=["']faq["']/.test(indexSource),
      "data-faq-question": /data-faq-question/.test(faqSource),
      "data-faq-answer": /data-faq-answer/.test(faqSource),
    };

    const FALLBACK = "#faq";
    const failures: string[] = [];

    for (const b of blocks) {
      const sp = b.parsed?.speakable;
      if (!sp || sp["@type"] !== "SpeakableSpecification") {
        failures.push(`[${b.lang}] missing SpeakableSpecification`);
        continue;
      }
      const selectors: string[] = Array.isArray(sp.cssSelector)
        ? sp.cssSelector
        : sp.cssSelector
          ? [sp.cssSelector]
          : [];
      if (selectors.length === 0) {
        failures.push(`[${b.lang}] empty cssSelector`);
        continue;
      }
      const orphan = selectors.filter(
        (sel) =>
          !Object.entries(domHooks).some(
            ([hook, present]) => present && sel.includes(hook)
          )
      );
      if (orphan.length) {
        failures.push(`[${b.lang}] orphan selectors: ${orphan.join(", ")}`);
      }
      if (!selectors.some((s) => s.includes(FALLBACK))) {
        failures.push(`[${b.lang}] missing fallback "${FALLBACK}"`);
      }
    }

    if (failures.length) {
      // eslint-disable-next-line no-console
      console.error("\nSpeakable coherence failures:\n" + failures.join("\n"));
    }
    expect(failures).toEqual([]);
  });
});
