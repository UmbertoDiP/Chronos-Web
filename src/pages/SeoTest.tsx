// ============================================================
// SEO Test Page — /seo-test
// Compares static JSON-LD fallback (index.html) vs dynamic
// JSON-LD injected at runtime by react-helmet-async.
// Internal/dev tool: noindex.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FAQPage } from "@/components/StructuredData/FAQPage";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

type Block = {
  source: "static" | "dynamic";
  lang: string | null;
  raw: string;
  parsed: any | null;
  error: string | null;
};

const safeParse = (raw: string) => {
  try {
    return { parsed: JSON.parse(raw), error: null };
  } catch (e: any) {
    return { parsed: null, error: e?.message ?? "Invalid JSON" };
  }
};

// ─────────────────────────────────────────────────────────────
// FAQPage validator (schema.org + Google Rich Results rules)
// ─────────────────────────────────────────────────────────────
type Severity = "error" | "warning";
type Issue = { severity: Severity; path: string; message: string };
type ValidationReport = {
  lang: string | null;
  source: "static" | "dynamic";
  issues: Issue[];
  ok: boolean;
};

const validateFAQPage = (block: Block): ValidationReport => {
  const issues: Issue[] = [];
  const push = (severity: Severity, path: string, message: string) =>
    issues.push({ severity, path, message });

  if (block.error) {
    push("error", "(root)", `Invalid JSON: ${block.error}`);
    return { lang: block.lang, source: block.source, issues, ok: false };
  }
  const d = block.parsed;
  if (!d || typeof d !== "object") {
    push("error", "(root)", "Parsed value is not an object");
    return { lang: block.lang, source: block.source, issues, ok: false };
  }

  if (d["@context"] !== "https://schema.org" && d["@context"] !== "http://schema.org")
    push("error", "@context", `Must be "https://schema.org" (got ${JSON.stringify(d["@context"])})`);
  if (d["@type"] !== "FAQPage")
    push("error", "@type", `Must be "FAQPage" (got ${JSON.stringify(d["@type"])})`);

  if (!d.inLanguage) push("warning", "inLanguage", "Missing inLanguage");
  if (!d["@id"]) push("warning", "@id", "Missing @id (recommended for de-duplication)");
  if (!d.url) push("warning", "url", "Missing url");
  if (d.dateModified && !/^\d{4}-\d{2}-\d{2}/.test(d.dateModified))
    push("warning", "dateModified", `Should be ISO 8601 (got ${d.dateModified})`);

  const me = d.mainEntity;
  if (!Array.isArray(me) || me.length === 0) {
    push("error", "mainEntity", "Must be a non-empty array of Question");
    return { lang: block.lang, source: block.source, issues, ok: false };
  }

  const seenNames = new Set<string>();
  me.forEach((q: any, i: number) => {
    const base = `mainEntity[${i}]`;
    if (!q || typeof q !== "object") {
      push("error", base, "Question is not an object");
      return;
    }
    if (q["@type"] !== "Question")
      push("error", `${base}.@type`, `Must be "Question" (got ${JSON.stringify(q["@type"])})`);
    if (typeof q.name !== "string" || !q.name.trim())
      push("error", `${base}.name`, "Missing or empty name");
    else {
      if (q.name.length > 300)
        push("warning", `${base}.name`, `Name very long (${q.name.length} chars). Google recommends < 300.`);
      const key = q.name.trim().toLowerCase();
      if (seenNames.has(key)) push("warning", `${base}.name`, "Duplicate question name");
      seenNames.add(key);
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

  return {
    lang: block.lang,
    source: block.source,
    issues,
    ok: issues.every((x) => x.severity !== "error"),
  };
};

const collectBlocks = (): Block[] => {
  const scripts = Array.from(
    document.head.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"]'
    )
  );
  return scripts.map((el) => {
    const raw = el.textContent ?? "";
    const dataLang = el.getAttribute("data-faq-lang");
    const helmetAttr = el.getAttribute("data-react-helmet");
    const { parsed, error } = safeParse(raw);
    return {
      source: helmetAttr ? "dynamic" : "static",
      lang: dataLang ?? parsed?.inLanguage ?? null,
      raw,
      parsed,
      error,
    };
  });
};

const Section = ({
  title,
  count,
  blocks,
  emptyHint,
}: {
  title: string;
  count: number;
  blocks: Block[];
  emptyHint: string;
}) => (
  <section className="space-y-3">
    <header className="flex items-baseline gap-3">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <span className="text-sm text-muted-foreground">
        ({count} {count === 1 ? "block" : "blocks"})
      </span>
    </header>
    {blocks.length === 0 ? (
      <p className="text-sm text-muted-foreground italic">{emptyHint}</p>
    ) : (
      <div className="space-y-2">
        {blocks.map((b, i) => (
          <details
            key={`${b.source}-${b.lang}-${i}`}
            className="rounded-md border border-border bg-card"
          >
            <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  b.error ? "bg-destructive" : "bg-primary"
                }`}
              />
              <span className="font-mono">
                {b.parsed?.["@type"] ?? "(unknown)"}
              </span>
              {b.lang && (
                <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  {b.lang}
                </span>
              )}
              {b.parsed?.mainEntity && (
                <span className="text-xs text-muted-foreground">
                  {b.parsed.mainEntity.length} questions
                </span>
              )}
              {b.error && (
                <span className="text-xs text-destructive">
                  ⚠ {b.error}
                </span>
              )}
            </summary>
            <pre className="text-[11px] leading-snug p-3 overflow-x-auto bg-muted/30 border-t border-border max-h-96">
              {b.parsed
                ? JSON.stringify(b.parsed, null, 2)
                : b.raw}
            </pre>
          </details>
        ))}
      </div>
    )}
  </section>
);

const SeoTest = () => {
  const { language } = useLanguage();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [tick, setTick] = useState(0);
  const [reports, setReports] = useState<ValidationReport[] | null>(null);

  // Re-collect after Helmet flushes (microtask + small delay for safety)
  useEffect(() => {
    const t1 = setTimeout(() => setBlocks(collectBlocks()), 50);
    const t2 = setTimeout(() => setBlocks(collectBlocks()), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [language, tick]);

  const stats = useMemo(() => {
    const staticBlocks = blocks.filter((b) => b.source === "static");
    const dynamicBlocks = blocks.filter((b) => b.source === "dynamic");
    const staticLangs = new Set(
      staticBlocks.map((b) => b.lang).filter(Boolean) as string[]
    );
    const errors = blocks.filter((b) => b.error).length;
    return { staticBlocks, dynamicBlocks, staticLangs, errors };
  }, [blocks]);

  const dynamicForCurrent = stats.dynamicBlocks.find(
    (b) => b.parsed?.["@type"] === "FAQPage"
  );
  const staticForCurrent = stats.staticBlocks.find(
    (b) => b.lang === language && b.parsed?.["@type"] === "FAQPage"
  );

  const diffMatch =
    dynamicForCurrent &&
    staticForCurrent &&
    dynamicForCurrent.parsed?.mainEntity?.length ===
      staticForCurrent.parsed?.mainEntity?.length;

  return (
    <>
      <Helmet>
        <title>SEO JSON-LD Test · Chronos</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Render the dynamic FAQPage so we can compare it against the static fallback */}
      <FAQPage />

      <div className="min-h-screen bg-background text-foreground p-6 max-w-5xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">SEO JSON-LD Test</h1>
          <p className="text-sm text-muted-foreground">
            Compare the static fallback in <code>index.html</code> with the
            dynamic JSON-LD injected by react-helmet-async at runtime. Switch
            language to see the dynamic block follow.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg border border-border bg-card">
          <div>
            <div className="text-xs uppercase text-muted-foreground">
              Current language
            </div>
            <div className="font-mono text-lg">{language}</div>
          </div>
          <LanguageSelector />
          <button
            onClick={() => setTick((t) => t + 1)}
            className="ml-auto px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            Re-scan DOM
          </button>
          <button
            onClick={() => {
              const faqBlocks = blocks.filter(
                (b) => b.parsed?.["@type"] === "FAQPage" || b.error
              );
              setReports(faqBlocks.map(validateFAQPage));
            }}
            className="px-3 py-1.5 text-sm rounded-md bg-secondary text-secondary-foreground hover:opacity-90 border border-border"
          >
            Validate FAQPage schemas
          </button>
        </div>

        {reports && (
          <ValidationReportSection
            reports={reports}
            onClear={() => setReports(null)}
          />
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Total blocks" value={blocks.length} />
          <Stat label="Static (index.html)" value={stats.staticBlocks.length} />
          <Stat label="Dynamic (Helmet)" value={stats.dynamicBlocks.length} />
          <Stat
            label="Parse errors"
            value={stats.errors}
            tone={stats.errors ? "bad" : "good"}
          />
        </div>

        <section className="p-4 rounded-lg border border-border bg-card space-y-2">
          <h2 className="text-lg font-bold">
            Match for current language: <code>{language}</code>
          </h2>
          <ul className="text-sm space-y-1">
            <li>
              Static fallback present:{" "}
              <strong className={staticForCurrent ? "text-primary" : "text-destructive"}>
                {staticForCurrent ? "yes" : "no"}
              </strong>
            </li>
            <li>
              Dynamic Helmet present:{" "}
              <strong className={dynamicForCurrent ? "text-primary" : "text-destructive"}>
                {dynamicForCurrent ? "yes" : "no"}
              </strong>
            </li>
            {staticForCurrent && dynamicForCurrent && (
              <li>
                Question count match:{" "}
                <strong className={diffMatch ? "text-primary" : "text-destructive"}>
                  {diffMatch
                    ? `yes (${dynamicForCurrent.parsed.mainEntity.length})`
                    : `no (static=${staticForCurrent.parsed.mainEntity.length}, dynamic=${dynamicForCurrent.parsed.mainEntity.length})`}
                </strong>
              </li>
            )}
          </ul>
          <p className="text-xs text-muted-foreground">
            Static languages covered ({stats.staticLangs.size}):{" "}
            <span className="font-mono">
              {[...stats.staticLangs].sort().join(", ") || "—"}
            </span>
          </p>
        </section>

        <Section
          title="Dynamic JSON-LD (react-helmet-async)"
          count={stats.dynamicBlocks.length}
          blocks={stats.dynamicBlocks}
          emptyHint="No Helmet-managed JSON-LD blocks found yet. Wait a moment and click Re-scan."
        />

        <Section
          title="Static JSON-LD fallback (index.html)"
          count={stats.staticBlocks.length}
          blocks={stats.staticBlocks}
          emptyHint="No static JSON-LD blocks detected in <head>."
        />
      </div>
    </>
  );
};

const Stat = ({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "good" | "bad" | "neutral";
}) => (
  <div className="p-3 rounded-md border border-border bg-card">
    <div className="text-xs uppercase text-muted-foreground">{label}</div>
    <div
      className={`text-2xl font-bold ${
        tone === "bad"
          ? "text-destructive"
          : tone === "good"
            ? "text-primary"
            : "text-foreground"
      }`}
    >
      {value}
    </div>
  </div>
);

const ValidationReportSection = ({
  reports,
  onClear,
}: {
  reports: ValidationReport[];
  onClear: () => void;
}) => {
  const totalErrors = reports.reduce(
    (n, r) => n + r.issues.filter((i) => i.severity === "error").length,
    0
  );
  const totalWarnings = reports.reduce(
    (n, r) => n + r.issues.filter((i) => i.severity === "warning").length,
    0
  );
  const okCount = reports.filter((r) => r.ok).length;

  return (
    <section className="p-4 rounded-lg border border-border bg-card space-y-3">
      <header className="flex items-center gap-3 flex-wrap">
        <h2 className="text-lg font-bold">FAQPage validation report</h2>
        <span className="text-sm text-muted-foreground">
          {reports.length} block{reports.length === 1 ? "" : "s"} ·{" "}
          <span className="text-primary font-medium">{okCount} OK</span> ·{" "}
          <span className={totalErrors ? "text-destructive font-medium" : ""}>
            {totalErrors} error{totalErrors === 1 ? "" : "s"}
          </span>{" "}
          ·{" "}
          <span className={totalWarnings ? "text-yellow-500 font-medium" : ""}>
            {totalWarnings} warning{totalWarnings === 1 ? "" : "s"}
          </span>
        </span>
        <button
          onClick={onClear}
          className="ml-auto text-xs px-2 py-1 rounded border border-border hover:bg-muted"
        >
          Clear
        </button>
      </header>

      <div className="space-y-2">
        {reports.map((r, i) => {
          const errors = r.issues.filter((x) => x.severity === "error");
          const warnings = r.issues.filter((x) => x.severity === "warning");
          return (
            <details
              key={`${r.source}-${r.lang}-${i}`}
              className="rounded-md border border-border bg-background"
              open={!r.ok}
            >
              <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    !r.ok
                      ? "bg-destructive"
                      : warnings.length
                        ? "bg-yellow-500"
                        : "bg-primary"
                  }`}
                />
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted">
                  {r.source}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted">
                  {r.lang ?? "—"}
                </span>
                <span className={r.ok ? "text-primary" : "text-destructive"}>
                  {r.ok ? "valid" : `${errors.length} error${errors.length === 1 ? "" : "s"}`}
                </span>
                {warnings.length > 0 && (
                  <span className="text-yellow-500">
                    {warnings.length} warning{warnings.length === 1 ? "" : "s"}
                  </span>
                )}
              </summary>
              {r.issues.length === 0 ? (
                <p className="px-3 py-2 text-xs text-muted-foreground">
                  No issues found.
                </p>
              ) : (
                <ul className="px-3 py-2 space-y-1 text-xs border-t border-border">
                  {r.issues.map((iss, k) => (
                    <li
                      key={k}
                      className="flex items-start gap-2 font-mono leading-snug"
                    >
                      <span
                        className={
                          iss.severity === "error"
                            ? "text-destructive"
                            : "text-yellow-500"
                        }
                      >
                        {iss.severity === "error" ? "✗" : "⚠"}
                      </span>
                      <span className="text-muted-foreground">{iss.path}</span>
                      <span className="text-foreground">— {iss.message}</span>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          );
        })}
      </div>
    </section>
  );
};

export default SeoTest;
