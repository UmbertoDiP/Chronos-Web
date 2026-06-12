---
description: Build, deploy to Cloudflare Pages, and purge cache for folder2text.com
---

// turbo-all

## Deploy Workflow - Folder2TextLovable

**Project directory**: `C:\Users\umber\Documents\MyProjects\Folder2TextLovable`

### 1. Build the project
```powershell
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"; npm run build
```

### 2. Deploy to Cloudflare Pages (production)
```powershell
cd "C:\Users\umber\Documents\MyProjects\Folder2TextLovable"; npx wrangler pages deploy dist --project-name=folder2text --branch=main --commit-dirty=true
```

### 3. Purge Cloudflare Cache (CRITICAL)

Open the Cloudflare dashboard and purge everything:
- URL: https://dash.cloudflare.com/3b6245b263d581a0eddebc30df4797d6/pages/view/folder2text
- Navigate to: **Caching → Purge Everything**

Alternatively, purge via Cloudflare API (if API token is configured):
```powershell
$headers = @{ "Authorization" = "Bearer $env:CF_API_TOKEN"; "Content-Type" = "application/json" }
Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$(npx wrangler pages project list 2>$null)" -Method Post -Headers $headers -Body '{"purge_everything":true}'
```

> **Note**: After purge, do a hard refresh in browser (`Ctrl+Shift+R`) before testing.

### 4. Verify deployment

Check these URLs after every deploy:
- https://folder2text.com (homepage)
- https://folder2text.com/privacy
- https://folder2text.com/terms

### Reference Docs
- Build: `C:\Users\umber\Documents\MyProjects\Folder2TextLovable\build.md`
- Deploy details: `C:\Users\umber\Documents\MyProjects\Folder2TextLovable\WRANGLER-DEPLOY-GUIDE.md`
