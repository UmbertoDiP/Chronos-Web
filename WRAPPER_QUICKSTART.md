# Wrapper Quick Start - 5 Minutes Setup

**Target**: Integrate ProWaitlistModal into FolderTextMerger or any Electron/PyQt6 app

---

## ⚡ Ultra Fast Setup

### Step 1: Copy Files (30 seconds)

```bash
# From Folder2TextLovable project
cd Folder2TextLovable

# Build React app
npm run build

# Copy wrapper to FolderTextMerger
mkdir -p ../FolderTextMerger/lovable_modal
cp wrapper-config.js ../FolderTextMerger/lovable_modal/
cp pro-modal-standalone.html ../FolderTextMerger/lovable_modal/
cp -r dist ../FolderTextMerger/lovable_modal/
```

**Result**:
```
FolderTextMerger/
└── lovable_modal/
    ├── wrapper-config.js
    ├── pro-modal-standalone.html
    └── dist/
        ├── assets/
        └── index.html
```

### Step 2: Test in Browser (30 seconds)

```bash
cd ../FolderTextMerger/lovable_modal
npx serve .

# Open browser:
# http://localhost:3000/pro-modal-standalone.html?language=it&trial=3&plan=monthly
```

**Expected**: Modal opens automatically in Italian, Annual plan selected, trial=3

### Step 3: Integrate in PyQt6 (2 minutes)

Replace existing modal code in `popup_ui.py`:

```python
# OLD (if you have old modal code):
# url = "https://lovable.dev/..."

# NEW:
from PyQt6.QtCore import QUrl
import os

# Get path to wrapper
wrapper_path = os.path.join(
    os.path.dirname(__file__),
    'lovable_modal',
    'pro-modal-standalone.html'
)

# Build URL with parameters
url = QUrl.fromLocalFile(wrapper_path)
query_params = f"language={self.language}&trial={self.trial_remaining}&plan={plan_type}"
url.setQuery(query_params)

# Load in QWebEngineView
self.web_view.setUrl(url)
```

### Step 4: Test in App (1 minute)

```bash
cd ../FolderTextMerger
python -m pytest tests/test_pro_modal.py -v
```

**Expected**: All tests pass ✅

---

## ✅ Verification Checklist

- [ ] `lovable_modal/` folder exists in FolderTextMerger
- [ ] `wrapper-config.js` has correct Supabase URL (check line 6)
- [ ] `pro-modal-standalone.html` loads without errors (check browser console)
- [ ] Modal opens automatically after 1-2 seconds
- [ ] Submitting email triggers Supabase edge function (check Network tab)
- [ ] PyQt6 test passes

---

## 🔧 Troubleshooting (30 seconds each)

### Issue: "Modal not found"

```bash
# Check file exists
ls -la FolderTextMerger/lovable_modal/pro-modal-standalone.html

# If not, repeat Step 1
```

### Issue: "Blank page"

```bash
# Check bundle hashes match
ls -la FolderTextMerger/lovable_modal/dist/assets/index-*.js

# Output example: index-Ccfk1djt.js
# Compare with line 211 in pro-modal-standalone.html:
# <script type="module" src="./dist/assets/index-Ccfk1djt.js"></script>
# Must match exactly
```

### Issue: "CORS error"

**Solution**: Already fixed ✅ - Edge function has `Access-Control-Allow-Origin: *`

If still seeing errors:
```bash
# Verify Supabase config in wrapper-config.js line 6
# Should be: https://qbgzanikdtuynsipwkkl.supabase.co
```

---

## 📚 Full Documentation

For advanced integration, security details, API reference:
- Read `WRAPPER_INTEGRATION.md` (30 pages, comprehensive)

---

## 🎯 Summary

**What You Get**:
- ✅ ProWaitlistModal working in Electron/PyQt6
- ✅ All backend improvements (timezone, UPSERT, security)
- ✅ No modifications to Lovable (safe from updates)
- ✅ Bridge API for Python/JavaScript communication

**Total Setup Time**: 5 minutes
**Maintenance**: Zero (backend auto-updates)

---

**Questions?** Check console logs or read full docs.
