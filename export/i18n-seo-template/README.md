# 🚀 i18n + SEO Replication Template for Lovable

> Exported from **Folder2Text** project — structural template only, no editorial content.
> Use this to replicate the full i18n and SEO architecture in any new Lovable project.

## Quick Start

1. Copy the `template/` folder contents into your new Lovable project
2. Run the validation tests to see coverage at 0% (all placeholders)
3. Replace placeholders with your actual content
4. Re-run tests until you reach 100% coverage

## Architecture Overview

```
src/
├── lib/
│   ├── i18n/
│   │   ├── config.ts          # Language registry (36 langs, RTL support)
│   │   ├── types.ts           # TranslationKey type (all keys typed)
│   │   ├── translations.ts    # Aggregator + getTranslation() helper
│   │   └── locales/           # One file per language
│   │       ├── en.ts          # English (source of truth, complete)
│   │       ├── it.ts          # Italian (complete)
│   │       ├── de.ts          # German (Partial<TranslationKeys>)
│   │       └── ...            # 33 more locale files
│   └── seo/
│       └── config.ts          # SEO config per language (title, desc, keywords)
├── components/
│   ├── SEOHead.tsx            # Dynamic meta tags via react-helmet-async
│   └── StructuredData/
│       ├── index.ts           # Barrel export
│       ├── BreadcrumbList.tsx  # JSON-LD BreadcrumbList
│       ├── FAQPage.tsx        # JSON-LD FAQPage
│       ├── WebSite.tsx        # JSON-LD WebSite + SearchAction
│       ├── WebApplication.tsx # JSON-LD WebApplication
│       ├── HowTo.tsx          # JSON-LD HowTo
│       └── Product.tsx        # JSON-LD Product
└── contexts/
    └── LanguageContext.tsx     # React context + URL-based routing
```

## Key Patterns

### i18n
- **Type-safe keys**: All keys defined in `types.ts` as `TranslationKey`
- **Fallback chain**: locale → English → raw key
- **URL routing**: `/:lang/` prefix (e.g., `/it/`, `/de/`)
- **Detection order**: URL → localStorage → browser locale
- **RTL support**: `ar`, `he` auto-set `dir="rtl"` on `<html>`
- **Naming convention**: `namespace.section.element` (e.g., `landing.faq.q1`)

### SEO
- **Dynamic meta tags**: title, description, canonical, og:*, twitter:*
- **Hreflang**: All 36 languages + `x-default`
- **JSON-LD schemas**: 6 structured data types
- **Canonical URLs**: `/{lang}` pattern, English = root `/`
- **OG Locale mapping**: `en` → `en_US`, `it` → `it_IT`, etc.

### Keyword Strategy (8 clusters)
1. Core Product
2. LLM/AI Context (high intent)
3. Competitor alternatives
4. Problem-Based Long-Tail
5. Use Case Specific
6. Platform/Distribution
7. Format/Output
8. Niche/Vertical

## Supported Languages (36)

| Group | Languages |
|-------|-----------|
| European (25) | it, en, de, fr, es, pt, nl, pl, sv, no, da, fi, cs, el, ro, hu, bg, hr, sk, sr, lt, lv, et, sl, uk |
| Asian (7) | zh, ja, ko, hi, th, vi, id |
| Middle Eastern (2) | ar, he |
| Other (2) | tr, ru |

## Test Suite

See `tests/` folder for:
- `i18n-keys.test.ts` — All keys exist in all locales
- `i18n-consistency.test.ts` — Cross-language consistency
- `i18n-fallback.test.ts` — Fallback chain integrity
- `seo-structure.test.ts` — SEO config completeness
- `seo-hreflang.test.ts` — Hreflang + canonical validation
- `coverage-report.test.ts` — Final score 0-100%
