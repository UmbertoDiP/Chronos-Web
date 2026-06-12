# Cloudflare Pages Deployment Instructions for folder2text.com

## Prerequisites
- Cloudflare account (same as umbertodipuorto.it)
- Domain folder2text.com registered and ready
- GitHub repository: https://github.com/UmbertoDiP/folder2text.git

## Step 1: Create GitHub Repository
```bash
# If repository doesn't exist yet, create it on GitHub first
# Then push:
cd C:\Users\umber\Documents\MyProjects\Folder2TextLovable
git push -u origin main
```

## Step 2: Create Cloudflare Pages Project

1. Go to https://dash.cloudflare.com/
2. Select your account
3. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Select repository: **UmbertoDiP/folder2text**
5. Configure build settings:
   - **Project name**: `folder2text`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave default)

6. Click **Save and Deploy**

## Step 3: Get Cloudflare Pages URL

After first deployment completes, you'll get a URL like:
```
https://folder2text.pages.dev
```

## Step 4: Configure Custom Domain folder2text.com

### A. On Cloudflare Pages Project:

1. Go to your **folder2text** project
2. Navigate to **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `folder2text.com`
5. Also add: `www.folder2text.com`
6. Cloudflare will automatically configure DNS

### B. Cloudflare Nameservers (if not already configured):

Check your domain registrar and ensure nameservers are set to:
```
alba.ns.cloudflare.com
dane.ns.cloudflare.com
```

**Note**: These are the SAME nameservers used for umbertodipuorto.it, so if folder2text.com is in the same Cloudflare account, DNS is already managed correctly.

## Step 5: Verify DNS Configuration

DNS records will be automatically created by Cloudflare Pages:

```
Type: CNAME
Name: folder2text.com
Target: folder2text.pages.dev
Proxy: Enabled (orange cloud)

Type: CNAME
Name: www
Target: folder2text.pages.dev
Proxy: Enabled (orange cloud)
```

## Step 6: Enable HTTPS and Security

Cloudflare Pages automatically provides:
- ✅ Free SSL certificate
- ✅ Automatic HTTPS redirect
- ✅ DDoS protection
- ✅ CDN global distribution

No additional configuration needed!

## Step 7: Test Deployment

1. Visit https://folder2text.com
2. Verify:
   - ✅ Site loads correctly
   - ✅ HTTPS is enabled
   - ✅ Meta tags show folder2text branding
   - ✅ PWA manifest is accessible at /manifest.json
   - ✅ Sitemap available at /sitemap.xml
   - ✅ Robots.txt available at /robots.txt

## Continuous Deployment

Every push to `main` branch triggers automatic rebuild and deployment on Cloudflare Pages.

## Environment Variables (if needed)

If you need to configure environment variables:
1. Go to **Settings** → **Environment variables**
2. Add any needed variables for production

Current project doesn't require any environment variables.

## Build Configuration Summary

```json
{
  "production_branch": "main",
  "build_command": "npm run build",
  "build_output_directory": "dist",
  "preview_deployment_setting": "all",
  "preview_branch_includes": ["*"],
  "preview_branch_excludes": []
}
```

## Troubleshooting

### Build fails on Cloudflare Pages:
- Check build logs in Cloudflare dashboard
- Verify package.json dependencies
- Ensure Node.js version compatibility (18.x recommended)

### Custom domain doesn't work:
- Wait 24-48h for DNS propagation
- Verify nameservers are correctly set
- Check SSL/TLS encryption mode is set to "Full" or "Full (strict)"

### Performance issues:
- Cloudflare Pages uses global CDN
- Check Cloudflare Analytics for performance metrics
- Enable additional performance features in Cloudflare dashboard

## Access Info

- **Cloudflare Account**: Same as umbertodipuorto.it
- **Account ID**: 3b6245b263d581a0eddebc30df4797d6
- **Zone ID** (folder2text.com): Will be assigned after domain is added
- **API Token**: (stored in ~/.claude/cloudflare-api-token.txt)

## Next Steps After Deployment

1. Submit sitemap to Google Search Console: https://folder2text.com/sitemap.xml
2. Verify meta tags with Facebook Debugger: https://developers.facebook.com/tools/debug/
3. Test PWA installation on mobile devices
4. Monitor Cloudflare Analytics for traffic insights
5. (Optional) Set up Cloudflare Web Analytics for privacy-friendly tracking

## Support

For issues:
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Cloudflare Community: https://community.cloudflare.com/
