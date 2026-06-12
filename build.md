# Build Guide - Folder2Text

## Quick Build

```powershell
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"
npm run build
```

Output directory: `dist/`

## Requirements

- Node.js (>=18)
- npm packages installed: `npm install`

## Build Output

After build, `dist/` will contain:
- `index.html` — entry point
- `assets/` — hashed JS/CSS bundles
- `_redirects` — Cloudflare SPA routing rules
- `_headers` — Cloudflare cache/security headers

## Full Cycle: Build + Deploy + Purge Cache

See [`WRANGLER-DEPLOY-GUIDE.md`](./WRANGLER-DEPLOY-GUIDE.md) for the complete deploy workflow.

### One-liner (build + deploy production):
```powershell
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"; npm run build; npx wrangler pages deploy dist --project-name=folder2text --branch=main --commit-dirty=true
```

### After every deploy:
1. **Purge cache Cloudflare** (CRITICAL — otherwise changes won't be visible)
   - Dashboard: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text
   - Caching → Purge Everything
2. Hard refresh browser: `Ctrl+Shift+R`
3. Verify: https://folder2text.com

## Notes

- `functions/_middleware.js` is executed server-side on Cloudflare Pages (injects SEO tags)
- No environment variables required
- Lovable source syncs automatically; manual edits require `--commit-dirty=true`
