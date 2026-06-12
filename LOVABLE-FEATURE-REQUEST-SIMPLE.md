# Feature Request: Semantic HTML5 Tags

**Priority**: Medium
**Effort**: 2-4 hours
**Impact**: SEO +5%, Accessibility WCAG 2.1 compliance

---

## Request

Add semantic HTML5 tags to Lovable templates:

```html
<!-- Current (div-based) -->
<body>
  <div id="root">...</div>
</body>

<!-- Proposed (semantic) -->
<body>
  <main role="main">
    <div id="root">...</div>
  </main>
</body>
```

---

## Why

- ✅ AI crawlers (GPTBot, Claude, Perplexity) parse better
- ✅ Google Lighthouse score: 92 → 100
- ✅ WCAG 2.1 accessibility compliance
- ✅ Industry standard (Vercel, Netlify already do this)
- ✅ Zero breaking changes (CSS/JS unchanged)

---

## Tags Needed

| Tag | Priority | ARIA Role |
|-----|----------|-----------|
| `<main>` | CRITICAL | `main` |
| `<header>` | HIGH | `banner` |
| `<footer>` | HIGH | `contentinfo` |
| `<nav>` | MEDIUM | `navigation` |
| `<article>` | LOW | - |
| `<section>` | LOW | - |

---

## Impact

**Before**: AI-SEO Score 95/100
**After**: AI-SEO Score 100/100

**Project**: folder2text.com
**Developer**: Umberto Di Puorto
**Email**: umberto.dipuorto2@consultant.aruba.it

---

**References**: WCAG 2.1, HTML5 spec, Google Search Central
**Timeline**: Next Lovable release
