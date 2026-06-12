# Quick Deploy Guide - AI-SEO Fixes

**Score**: 42 → 85+ 🟢

---

## 🚀 Deploy (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Login Cloudflare
```bash
npm run cf:login
```

### 3. Deploy
```bash
# Windows
.\deploy-fix-seo.ps1

# Linux/Mac
bash deploy-fix-seo.sh

# Or simple
npm run deploy
```

---

## ⚠️ Manual Steps (Cloudflare Dashboard)

Login: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text

### 1. Disable Bot Fight
**Security → Bot Management** → Set to **OFF**

### 2. Delete Redirect Rules
**Functions → Page Rules** → Delete all
**Transform Rules → Redirect Rules** → Delete all

### 3. Purge Cache
**Caching → Configuration** → Purge Everything

---

## ✅ Verify

```bash
# Test SPA routing
curl -I https://folder2text.com/privacy
# Expect: HTTP/2 200

# Test AI crawler
curl -A "GPTBot" https://folder2text.com/
# Expect: HTML (not 403)

# Re-audit
/verify-seo https://folder2text.com
# Expect: 85+/100 🟢
```

---

## 📂 Files Created

- `functions/_middleware.ts` - HTML rewriter
- `public/_headers` - AI crawler headers
- `wrangler.toml` - Cloudflare config
- `deploy-fix-seo.sh` - Deploy script (Bash)
- `deploy-fix-seo.ps1` - Deploy script (PowerShell)

---

## 🔧 What Gets Fixed

1. ✅ AI crawlers allowed (GPTBot, ClaudeBot, etc.)
2. ✅ SPA routes return 200 (not 308)
3. ✅ H1 tag injected
4. ✅ Semantic HTML5 (`<main>` wrapper)
5. ✅ Organization schema injected

---

## 🆘 Troubleshooting

**Still 308 redirects?** → Delete dashboard rules, purge cache
**AI crawlers blocked?** → Disable Bot Fight Mode
**Functions not working?** → Check `functions/` folder deployed

---

**Full docs**: `AI-SEO-FIX-IMPLEMENTATION.md`
