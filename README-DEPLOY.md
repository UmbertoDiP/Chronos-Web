# Folder2Text Lovable - Wrapper & Deploy Documentation

## Architecture Overview

```
Folder2TextLovable/          ← Wrapper (deployment config + SEO)
├── index.html               ← WRAPPED by us (Google Analytics, meta tags)
├── public/                  ← WRAPPED by us (favicon, robots.txt, sitemap.xml)
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── src/                     ← LOVABLE CODE (DO NOT TOUCH)
│   ├── App.tsx
│   ├── components/
│   └── pages/
├── vite.config.ts
├── package.json
├── dist/                    ← Build output (deploy this)
└── deploy.sh                ← Automated deployment script
```

## Separation of Concerns

**Wrapper Layer** (what we modify):
- `index.html` - Google Analytics, meta tags, favicon links
- `public/robots.txt` - SEO configuration
- `public/sitemap.xml` - SEO multilingual sitemap (9 URLs)
- `public/manifest.json` - PWA theme color
- `public/favicon.*` - Branding assets
- `vite.config.ts` - Build configuration (if needed)

**Lovable Layer** (mostly read-only):
- `src/` - All React/TypeScript UI code from Lovable export
- Exception: `src/pages/PrivacyPolicy.tsx` and `src/pages/TermsOfService.tsx` are managed by master templates

**Master Templates** (source of truth):
- Located in: `../FolderTextMerger/lovable-templates/`
- `PrivacyPolicy.tsx` - Privacy policy content (synced automatically)
- `TermsOfService.tsx` - Terms of service content (synced automatically)
- These templates are copied to Lovable on every deployment

## Deployment Workflow

### Manual Deployment

```bash
# Step 1: Build the project
npm run build

# Step 2: Deploy to production
npx wrangler pages deploy dist/ --project-name=folder2text --branch=folder2text --commit-dirty=true
```

### Automated Deployment with Template Sync

Use the comprehensive sync & deploy script:

```bash
./sync-and-deploy.sh
```

Or on Windows (Git Bash):

```bash
bash sync-and-deploy.sh
```

This script automatically:
1. Syncs PrivacyPolicy.tsx and TermsOfService.tsx from master templates
2. Builds the project
3. Deploys to production (Cloudflare Pages)
4. Commits and pushes template changes to GitHub (if any)

### Quick Deployment (no sync)

If you only need to deploy without syncing templates:

```bash
./deploy.sh
```

## Understanding Cloudflare Pages Deployments

### Branch Strategy

Cloudflare Pages has two environments:

1. **Production Environment** (branch: `folder2text`)
   - URL: https://folder2text.com (custom domain)
   - URL: https://www.folder2text.com (custom domain with redirect)
   - Deployment trigger: `--branch=folder2text`

2. **Preview Environment** (branch: `main`)
   - URL: https://main.folder2text.pages.dev
   - URL: https://<hash>.folder2text.pages.dev
   - Deployment trigger: Default (no `--branch` flag)

### IMPORTANT: Always Deploy to Production Branch

**WRONG** (deploys to preview only):
```bash
npx wrangler pages deploy dist/ --project-name=folder2text
```

**CORRECT** (deploys to production):
```bash
npx wrangler pages deploy dist/ --project-name=folder2text --branch=folder2text
```

### Cache Behavior

- **Production** (folder2text.com): CDN cache enabled, may take 1-2 minutes to update
- **Preview** (*.pages.dev): Minimal cache, updates immediately

Cloudflare Pages automatically invalidates cache on new deployment, but browser cache may persist.

**Force browser refresh**: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

## Integrating Lovable Updates

When Lovable releases a new export:

1. Download export from Lovable dashboard
2. Replace `src/` folder with new export
3. Verify wrapper files are intact:
   ```bash
   git status
   # Should show changes only in src/
   ```
4. Run deployment:
   ```bash
   ./deploy.sh
   ```

## Google Analytics Configuration

GA4 ID: `G-P29XH6Z3VX`

Privacy-friendly configuration in `index.html`:
- IP anonymization: enabled
- Ad personalization: disabled
- Google signals: disabled
- Cookie flags: `SameSite=None;Secure`

## SEO Configuration

### Sitemap (public/sitemap.xml)

9 URLs indexed with multilingual hreflang alternates:
- `/` (root - 6 languages)
- `/privacy` (2 languages: en, it)
- `/terms` (2 languages: en, it)

Languages: en, it, es, fr, de, pt

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://folder2text.com/sitemap.xml
```

## Deployment Verification

After deployment, verify:

1. **Production site**: https://folder2text.com
   - Google Analytics loaded (check Network tab for gtag.js)
   - Sitemap accessible: https://folder2text.com/sitemap.xml
   - Favicon displays correctly
   - No console errors

2. **WWW redirect**: https://www.folder2text.com
   - Redirects to apex domain
   - Same content as folder2text.com

3. **Preview deployment**: https://main.folder2text.pages.dev
   - Shows latest commit (may differ from production if not deployed to folder2text branch)

## Troubleshooting

### "Changes not visible on folder2text.com"

**Cause**: Deployed to preview instead of production branch

**Solution**:
```bash
npx wrangler pages deploy dist/ --project-name=folder2text --branch=folder2text
```

### "Browser shows old version after deploy"

**Cause**: Browser cache or CDN propagation delay

**Solution**:
1. Wait 2-3 minutes
2. Hard refresh: `Ctrl + F5`
3. Check in incognito/private window
4. Verify deployment ID matches latest:
   ```bash
   npx wrangler pages deployment list --project-name=folder2text
   ```

### "Uncommitted changes warning"

**Cause**: Git working directory has unstaged changes (normal during development)

**Solution**: Add `--commit-dirty=true` flag:
```bash
npx wrangler pages deploy dist/ --project-name=folder2text --branch=folder2text --commit-dirty=true
```

## Project URLs

- **Production**: https://folder2text.com
- **WWW**: https://www.folder2text.com (redirect)
- **Preview**: https://main.folder2text.pages.dev
- **GitHub**: https://github.com/UmbertoDiP/folder2text
- **Cloudflare Dashboard**: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text

## Version History

- 2026-01-23: Added Google Analytics 4 (G-P29XH6Z3VX)
- 2026-01-XX: Initial wrapper setup with SEO optimization
- 2026-01-XX: Cloudflare Pages deployment configured

## Maintenance Notes

### What to Monitor

- Google Analytics data (ensure tracking works)
- Sitemap indexing in Google Search Console
- Page load performance (Cloudflare Analytics)
- Build success/failure (Cloudflare Pages dashboard)

### What to Update Regularly

- `src/` folder when Lovable releases updates
- `sitemap.xml` if new routes added in Lovable
- `robots.txt` if SEO strategy changes
- GA4 configuration if privacy requirements change

## Build Configuration

Build is handled by Vite (configured in `vite.config.ts`):

- Output: `dist/`
- Forced copy: `sitemap.xml` (overrides Lovable auto-generated)
- Asset optimization: CSS minification, JS bundling
- Static file handling: `public/` → `dist/` root

## Custom Domain Configuration

Configured in Cloudflare Dashboard:

- **Apex domain**: folder2text.com → folder2text.pages.dev
- **WWW subdomain**: www.folder2text.com → folder2text.com (redirect)
- **DNS**: Managed by Cloudflare
- **SSL**: Automatic (Cloudflare Universal SSL)

## Support

For issues:
1. Check Cloudflare Pages dashboard logs
2. Verify build output in `dist/`
3. Test preview deployment first before production
4. Review this README for common issues

---

**Last Updated**: 2026-01-23
**Maintainer**: Umberto Di Puorto
