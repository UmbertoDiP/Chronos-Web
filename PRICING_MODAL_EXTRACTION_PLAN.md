# Piano di Estrazione e Integrazione Modale Pricing

## Panoramica del Progetto

**Obiettivo**: Estrarre la modale pricing da Folder2TextLovable (React/TypeScript) e integrarla in FolderTextMerger (PyQt6), mantenendo un sistema di aggiornamento continuo.

**Sfida Principale**: I due progetti usano tecnologie completamente diverse:
- **Lovable**: React + TypeScript + Tailwind CSS + Framer Motion
- **FolderTextMerger**: Python + PyQt6 + Custom UI Components

---

## Analisi Situazione Attuale

### File Lovable Identificati (React/TypeScript)

1. **PricingModal.tsx** (`src/components/PricingModal.tsx`)
   - Modale principale pricing con 3 piani (Standard, Monthly Pro, Annual Pro)
   - 792 righe di codice
   - Dipendenze:
     - Framer Motion (animazioni)
     - Lucide React (icone)
     - Radix UI (switch, checkbox)
     - Tailwind CSS (styling)
     - ProWaitlistModal (modale secondaria)
   - Features:
     - Plan cards selezionabili
     - Animazioni entry/exit
     - Focus trap
     - Scroll lock
     - Theme toggle (light/dark)
     - Language selector
     - Trial badge (es. "🎁 2/3 free left")

2. **ProWaitlistModal.tsx** (`src/components/ProWaitlistModal.tsx`)
   - Modale secondaria per waitlist Pro subscriptions
   - 244 righe di codice
   - Dipendenze:
     - Framer Motion
     - Supabase (backend integration)
     - Form validation

### File FolderTextMerger Attuali (PyQt6)

1. **popup_ui.py** (`C:\Users\umber\Documents\MyProjects\FolderTextMerger\popup_ui.py`)
   - 616 righe di codice
   - Pure UI class con:
     - Custom components (SmoothCloseButton, AntimatterButton, PlanCard, FeatureItem)
     - Custom painting e animazioni PyQt6
     - Stile Antimatter design system

2. **popup.py** (`C:\Users\umber\Documents\MyProjects\FolderTextMerger\popup.py`)
   - 147 righe di codice
   - Controller/Business Logic layer
   - Eredita da AntimatterDialogUI
   - Gestisce purchase flow e segnali Qt

---

## Problema di Compatibilità Tecnologica

### IMPORTANTE: Conversione Impossibile Diretta

**NON è possibile** portare direttamente il codice React in PyQt6 perché:

1. **Framework differenti**: React (web) vs PyQt6 (desktop native)
2. **Paradigmi UI**: JSX/Virtual DOM vs QPainter/QWidget hierarchy
3. **Animazioni**: Framer Motion (CSS-based) vs QPropertyAnimation (Qt)
4. **Styling**: Tailwind CSS classes vs QSS (Qt Style Sheets) o custom painting
5. **Dipendenze**: Librerie npm/React vs librerie Python/Qt

### Approcci Possibili

#### Opzione A: Conversione Manuale (Consigliata)

**Pro**:
- Mantiene performance native desktop
- Full control su UI e comportamento
- No overhead browser engine

**Contro**:
- Richiede riscrittura completa UI logic
- Animazioni PyQt6 diverse da Framer Motion
- Manutenzione doppia (Lovable vs FolderTextMerger)

**Processo**:
1. Estrai design specs da Lovable (layout, colori, dimensioni, testi)
2. Documenta comportamento interattivo (animazioni, transizioni, stati)
3. Ricrea componenti equivalenti in PyQt6
4. Mantieni file Lovable separato come "design source of truth"

#### Opzione B: Embedded WebView (NON consigliata per questo caso)

**Pro**:
- Riuso diretto codice React
- Sincronizzazione automatica con Lovable

**Contro**:
- Overhead memoria significativo (browser engine completo)
- Comunicazione Python-JS complicata
- User experience non nativa
- Problemi di integrazione theme OS

---

## Piano Dettagliato (Opzione A - Conversione Manuale)

### FASE 1: Backup e Setup Repository

**Step 1.1**: Creare backup dei file esistenti
```bash
# Directory backup
mkdir -p C:\Users\umber\Documents\MyProjects\FolderTextMerger\backups\$(date +%Y%m%d)

# Backup popup_ui.py
cp C:\Users\umber\Documents\MyProjects\FolderTextMerger\popup_ui.py \
   C:\Users\umber\Documents\MyProjects\FolderTextMerger\backups\20260131\popup_ui_ORIGINAL.py

# Backup popup.py
cp C:\Users\umber\Documents\MyProjects\FolderTextMerger\popup.py \
   C:\Users\umber\Documents\MyProjects\FolderTextMerger\backups\20260131\popup_ORIGINAL.py
```

**Step 1.2**: Creare directory condivisa design specs
```bash
mkdir -p C:\Users\umber\Documents\MyProjects\Shared\PricingModalDesign
```

**Step 1.3**: Git commit stato attuale (se in git)
```bash
cd C:\Users\umber\Documents\MyProjects\FolderTextMerger
git add popup_ui.py popup.py
git commit -m "Backup: Pre pricing modal redesign from Lovable"
```

---

### FASE 2: Estrazione Design Specs da Lovable

**Step 2.1**: Copiare file sorgenti Lovable in directory condivisa
```bash
# Copia file React come reference
cp C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\PricingModal.tsx \
   C:\Users\umber\Documents\MyProjects\Shared\PricingModalDesign\PricingModal.tsx

cp C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\ProWaitlistModal.tsx \
   C:\Users\umber\Documents\MyProjects\Shared\PricingModalDesign\ProWaitlistModal.tsx
```

**Step 2.2**: Creare documento design specs dettagliato
```
File: C:\Users\umber\Documents\MyProjects\Shared\PricingModalDesign\DESIGN_SPECS.md
```

**Contenuto DESIGN_SPECS.md**:

```markdown
# Pricing Modal Design Specifications

## Layout Structure

### Modal Dimensions
- Desktop: 56vw width, max 850px
- Height: 90vh
- Border radius: 2xl (18-20px)
- Shadow: Heavy (0 25px 60px rgba(0,0,0,0.25))

### Header (Fixed Top)
- Height: ~60px
- Padding: px-5 py-3
- Elements:
  - Left: Logo + App name + tagline
  - Right: Language selector + Theme toggle + Close button
- Border bottom: 1px border-border

### Content (Scrollable)
- Padding: px-6 py-5

#### Hero Section
- Title: text-3xl font-bold (30px ExtraBold)
- Subtitle: text-lg font-medium (14px DemiBold)
- Margin bottom: 24px

#### Features Grid (Side by Side)
- 2 columns on desktop (lg:grid-cols-2)
- Gap: 20px
- Cards:
  - Standard: bg-muted/30, no border
  - Pro: bg-accent/5, border-accent/20

#### Plan Cards (Horizontal)
- 3 cards in row (flex-wrap on mobile)
- Dimensions per card: 200px width x 200px height
- Gap: 16px
- Border radius: xl (14-16px)
- Hover scale: 1.02
- Selected: 2px border gradient (accent to primary)

#### CTA Section (Bottom Fixed)
- Button: max-w-320px, h-12
- Gradient: from-accent to-primary
- Subtext: text-sm below button
- Margin top: auto (flex-1 spacer above)

#### Footer Reassurance
- 3 items horizontal
- Gap: 32px
- Icons: 20px (w-5 h-5)
- Text: text-sm muted-foreground

## Color Palette (LOVABLE DESIGN)

### Light Theme
```css
--background: hsl(0 0% 100%)          /* #FFFFFF */
--foreground: hsl(222.2 84% 4.9%)     /* ~#020817 */
--card: hsl(0 0% 100%)                /* #FFFFFF */
--border: hsl(214.3 31.8% 91.4%)      /* ~#E2E8F0 */
--muted: hsl(210 40% 96.1%)           /* ~#F1F5F9 */
--muted-foreground: hsl(215.4 16.3% 46.9%)  /* ~#64748B */
--primary: hsl(221.2 83.2% 53.3%)     /* ~#2563EB (Blue) */
--accent: hsl(262.1 83.3% 57.8%)      /* ~#7C3AED (Purple) */
--success: hsl(142.1 76.2% 36.3%)     /* ~#059669 (Green) */
--destructive: hsl(0 84.2% 60.2%)     /* ~#EF4444 (Red) */
```

### Dark Theme
```css
/* Inverted, same hue shift */
```

## Typography (Lovable)

### Font Family
- Primary: System font stack (Segoe UI Variable Display / Inter / SF Pro)
- Fallback: -apple-system, BlinkMacSystemFont, sans-serif

### Font Sizes & Weights
```
Hero Title:       30px / ExtraBold (font-weight: 800)
Hero Subtitle:    14px / DemiBold (font-weight: 600)
Section Headers:  11px / ExtraBold (font-weight: 800) UPPERCASE
Feature Text:     12px / Bold (font-weight: 700)
Feature Desc:     11px / Medium (font-weight: 500)
Plan Card Title:  9px / Bold (font-weight: 700) UPPERCASE
Plan Card Price:  26px / Black (font-weight: 900)
Plan Card Sub:    11px / DemiBold (font-weight: 600)
CTA Button:       13px / Black (font-weight: 900) UPPERCASE
Reassurance:      10px / Regular (font-weight: 400)
```

## Animations & Interactions

### Modal Entry/Exit
- Framer Motion equivalent:
  - Initial: opacity: 0, scale: 0.95, y: 20
  - Animate: opacity: 1, scale: 1, y: 0
  - Transition: spring (damping: 25, stiffness: 300)
- Duration: ~400-600ms

### Plan Card Hover
- Scale: 1.02
- Transition: duration-300 ease

### Plan Card Select
- 2px border gradient (accent → primary)
- Checkmark animation: scale 0 → 1 (spring)
- Glow effect: pulsing shadow (2s loop)

### CTA Button Hover
- Scale: 1.02
- Tap: 0.98
- Shadow expand

### Feature Items Stagger
- Each item delays 50ms from previous
- Fade in + slide from left (x: -10 → 0)

## Content Structure

### Standard Features (5 items)
1. Unlimited extractions | Once activated, no limits [Icon: Zap]
2. Single text file output | From folders and files [Icon: FolderOpen]
3. Windows context menu | Right-click to extract [Icon: MousePointer]
4. Multi-thread processing | Parallel execution [Icon: Cpu]
5. Desktop notifications | Process completion alerts [Icon: Bell]

### Pro Features (5 items)
1. Extension & directory management | Advanced include/exclude [Icon: FolderMinus]
2. Configurable auto-split | By size or file count [Icon: SplitSquareVertical]
3. Saveable custom presets | Reusable configurations [Icon: Settings]
4. Advanced templates | React, Python, DevOps... [Icon: FileCode]
5. All Standard features included | Everything from Standard license [Icon: Check]

### Plan Cards

#### Standard
- Title: STANDARD
- Price: €14.99
- Original Price: €24.99 (strikethrough)
- Discount Badge: -40% (red)
- Subtitle: Lifetime license
- Trial Badge: 🎁 X/3 free left (accent color, border)

#### Pro Monthly
- Title: PRO MONTHLY
- Price: €6.99
- Subtitle: /month
- Badge Top: Unlocks PRO (accent bg)
- CTA: JOIN WAITLIST (if not available)

#### Pro Annual (BEST VALUE)
- Title: PRO ANNUAL
- Price: €3.99
- Subtitle: /month
- Badge Top: BEST VALUE (gradient accent-primary)
- Savings Badge: SAVE 43% (green)
- CTA: JOIN WAITLIST (if not available)

### CTA Variations

**Standard Selected**:
- Text: GET STANDARD
- Subtext: One-time payment • via Microsoft Store
- Icon: Store

**Pro Monthly/Annual Selected (Not Available)**:
- Text: JOIN WAITLIST
- Subtext: (empty or billing info if available)
- Icon: Bell

### Reassurance Footer
1. Shield icon + "Safe Payment"
2. Zap icon + "Instant Activation"
3. HeartHandshake icon + "Lifetime Support"

## Behavioral Specs

### Interactions
1. Click Plan Card → Select plan
2. Backdrop click → Close modal
3. Close button → Close modal
4. Escape key → Close modal
5. Tab key → Focus trap (cycles through interactive elements)
6. Theme toggle → Switch light/dark
7. Language selector → Change language

### State Management
- Selected plan: "standard" | "pro_monthly" | "pro_annual"
- Trial remaining: number (0-3)
- Waitlist modal: open/closed state
- Waitlist plan type: "monthly" | "annual"

### Scroll Behavior
- Body scroll lock when open
- Smooth scroll in content area
- No horizontal scroll

### Focus Management
- Auto-focus first interactive element on open
- Tab trap (loops focus)
- Restore focus on close

## Translation Keys (EN/IT)

### English (default)
```yaml
heroTitle: "Choose Your Plan"
heroSub: "Unlock the full power of Folder2Text"
standardIncludes: "STANDARD FEATURES"
proAdds: "PRO FEATURES"
comingSoon: "COMING SOON"
bestValue: "BEST VALUE"
unlocksPro: "Unlocks PRO"
standard: "STANDARD"
monthly: "PRO MONTHLY"
annual: "PRO ANNUAL"
lifetimeLicense: "Lifetime license"
perMonth: "/month"
save50: "SAVE 43%"
trialLeft: "free left"
originalPrice: "€24.99"
getStandard: "GET STANDARD"
getProMonthly: "GET PRO MONTHLY"
getProAnnual: "GET PRO ANNUAL"
joinWaitlist: "JOIN WAITLIST"
oneTimePayment: "One-time payment"
billedMonthly: "Billed monthly"
billedAnnually: "Billed annually at €47.88"
viaMsStore: "via Microsoft Store"
safePayment: "Safe Payment"
instantActivation: "Instant Activation"
lifetimeSupport: "Lifetime Support"
```

### Italian
```yaml
heroTitle: "Scegli il Tuo Piano"
heroSub: "Sblocca tutta la potenza di Folder2Text"
standardIncludes: "FUNZIONALITÀ STANDARD"
proAdds: "FUNZIONALITÀ PRO"
comingSoon: "PROSSIMAMENTE"
bestValue: "MIGLIOR VALORE"
unlocksPro: "Sblocca PRO"
# ... (stesso pattern)
```

## Accessibility Requirements

1. **ARIA Labels**:
   - Modal: role="dialog", aria-modal="true", aria-labelledby="pricing-modal-title"
   - Close button: aria-label="Close modal"
   - Theme toggle: aria-label="Toggle dark mode"

2. **Keyboard Navigation**:
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order

3. **Screen Reader**:
   - Plan card selection announced
   - Price changes announced
   - Modal open/close announced

4. **Color Contrast**:
   - Text on background: 4.5:1 minimum
   - Interactive elements: 3:1 minimum

---

## PyQt6 Conversion Notes

### Components Mapping

| React Component | PyQt6 Equivalent |
|-----------------|------------------|
| `<motion.div>` | QWidget + QPropertyAnimation |
| Framer Motion backdrop | QWidget overlay with fade animation |
| Plan Card | QFrame + custom paintEvent |
| Feature Item | QWidget + QHBoxLayout |
| CTA Button | QPushButton + gradient paintEvent |
| Theme Switch | QSwitch (custom or from Qt6) |
| Language Selector | QComboBox custom styled |
| Icon (Lucide) | QIcon from SVG or custom paint |

### Animation System

**Framer Motion → PyQt6 Animations**:

```python
# Modal entry animation
self.entry_anim = QPropertyAnimation(self, b"pos")
self.entry_anim.setDuration(600)
self.entry_anim.setEasingCurve(QEasingCurve.Type.OutCubic)
self.entry_anim.setStartValue(QPoint(x, screen_height))
self.entry_anim.setEndValue(QPoint(x, target_y))

# Glow effect for selected card
self.glow_anim = QPropertyAnimation(self, b"glow")
self.glow_anim.setDuration(2000)
self.glow_anim.setLoopCount(-1)  # Infinite
self.glow_anim.setKeyValueAt(0.0, 0.3)
self.glow_anim.setKeyValueAt(0.5, 0.6)
self.glow_anim.setKeyValueAt(1.0, 0.3)
```

### Styling Strategy

**Tailwind CSS → PyQt6 Styling**:

1. **Option 1**: QSS (Qt Style Sheets) - CSS-like syntax
```python
qss = """
    QFrame#planCard {
        background-color: #FFFFFF;
        border: 2px solid #E2E8F0;
        border-radius: 16px;
    }
    QFrame#planCard:hover {
        border-color: #2563EB;
    }
"""
```

2. **Option 2**: Custom `paintEvent()` - Full control (current approach)
```python
def paintEvent(self, e):
    painter = QPainter(self)
    painter.setRenderHint(QPainter.RenderHint.Antialiasing)

    # Draw rounded rect with gradient border
    rect = QRectF(self.rect()).adjusted(2, 2, -2, -2)
    path = QPainterPath()
    path.addRoundedRect(rect, 18, 18)

    # Border gradient
    if self.is_selected:
        grad = QLinearGradient(rect.topLeft(), rect.bottomRight())
        grad.setColorAt(0, QColor("#7C3AED"))  # accent
        grad.setColorAt(1, QColor("#2563EB"))  # primary
        painter.setPen(QPen(QBrush(grad), 2))

    painter.drawPath(path)
```

### Font Loading

```python
from PyQt6.QtGui import QFontDatabase

# Load custom font if available
font_id = QFontDatabase.addApplicationFont("assets/fonts/InterVariable.ttf")
if font_id != -1:
    families = QFontDatabase.applicationFontFamilies(font_id)
    font_family = families[0]
else:
    font_family = "Segoe UI Variable Display"  # Fallback

def resolve_font(size: int, weight: QFont.Weight) -> QFont:
    font = QFont(font_family, size)
    font.setWeight(weight)
    font.setHintingPreference(QFont.HintingPreference.PreferFullHinting)
    return font
```

### Icon System

**Option 1**: Convert Lucide icons to SVG, load via QSvgRenderer
```python
from PyQt6.QtSvg import QSvgRenderer
from PyQt6.QtGui import QPixmap, QImage, QPainter

def load_icon(name: str, size: int, color: QColor) -> QPixmap:
    svg_path = f"assets/icons/{name}.svg"
    renderer = QSvgRenderer(svg_path)
    image = QImage(size, size, QImage.Format.Format_ARGB32)
    image.fill(Qt.GlobalColor.transparent)
    painter = QPainter(image)
    renderer.render(painter)
    painter.end()
    # Apply color tint if needed
    return QPixmap.fromImage(image)
```

**Option 2**: Unicode symbols or custom paths
```python
# Simple check icon
CHECK_ICON = "✓"
SPARKLE_ICON = "✦"
```

---

## IMPLEMENTATION_CHECKLIST.md

### Step-by-Step Implementation for PyQt6

**Pre-Implementation**:
- [ ] Backup existing popup_ui.py and popup.py
- [ ] Create Shared/PricingModalDesign/ directory
- [ ] Copy Lovable files to design reference folder
- [ ] Complete DESIGN_SPECS.md from analysis

**Phase 1: Core UI Components**:
- [ ] Update color constants from Lovable design
- [ ] Create/update font resolution function
- [ ] Implement icon loading system
- [ ] Create PlanCard widget with:
  - [ ] Rounded corners with gradient border
  - [ ] Hover/select states
  - [ ] Best Value badge
  - [ ] Trial info badge
  - [ ] Discount badge
  - [ ] Coming Soon badge
- [ ] Create FeatureItem widget with:
  - [ ] Icon container (rounded bg)
  - [ ] Text + description layout
  - [ ] Standard vs Pro styling

**Phase 2: Modal Layout**:
- [ ] Create modal container with fixed dimensions
- [ ] Implement header with:
  - [ ] App logo/name
  - [ ] Language selector (integration with existing)
  - [ ] Theme toggle switch
  - [ ] Close button with hover animation
- [ ] Create scrollable content area
- [ ] Implement hero section (title + subtitle)
- [ ] Create features grid (2 columns)
- [ ] Add plan cards row (3 cards)
- [ ] Add CTA button with gradient
- [ ] Add reassurance footer

**Phase 3: Animations**:
- [ ] Modal entry animation (slide up + fade)
- [ ] Modal exit animation (slide down + fade)
- [ ] Plan card hover scale
- [ ] Plan card glow effect (selected)
- [ ] Checkmark scale animation (selected)
- [ ] Feature items stagger fade-in
- [ ] CTA button pulse/glow

**Phase 4: Interactions**:
- [ ] Plan card click selection
- [ ] Backdrop click to close
- [ ] Close button click
- [ ] Escape key to close
- [ ] Focus trap implementation
- [ ] Theme toggle functionality
- [ ] Language change handling
- [ ] CTA button click (purchase/waitlist)

**Phase 5: State Management**:
- [ ] Selected plan state
- [ ] Trial remaining tracking
- [ ] Update trial badge dynamically
- [ ] Waitlist modal trigger (if Pro selected)

**Phase 6: Translations**:
- [ ] Load translations from locales module
- [ ] Update all UI text to use translation keys
- [ ] Test language switching

**Phase 7: Accessibility**:
- [ ] ARIA labels (via Qt accessibility)
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Screen reader support

**Phase 8: Testing**:
- [ ] Visual comparison with Lovable version
- [ ] Test all interactions
- [ ] Test animations smoothness
- [ ] Test on different screen sizes
- [ ] Test light/dark theme
- [ ] Test language switching
- [ ] Test trial badge updates
- [ ] Test waitlist flow (if implemented)

**Phase 9: Integration**:
- [ ] Update popup.py controller if needed
- [ ] Connect purchase signals
- [ ] Connect close signals
- [ ] Test integration with main app

**Phase 10: Documentation**:
- [ ] Update comments in popup_ui.py
- [ ] Document any deviations from Lovable design
- [ ] Create update process documentation

---

## Maintenance Workflow

### When Lovable Pricing Modal Changes

1. **Pull latest Lovable changes**:
```bash
cd C:\Users\umber\Documents\MyProjects\Folder2TextLovable
git pull origin main
```

2. **Copy updated files to design reference**:
```bash
cp src/components/PricingModal.tsx \
   C:\Users\umber\Documents\MyProjects\Shared\PricingModalDesign\PricingModal_$(date +%Y%m%d).tsx

# Keep old version for diff
```

3. **Review changes**:
```bash
cd C:\Users\umber\Documents\MyProjects\Shared\PricingModalDesign
code --diff PricingModal.tsx PricingModal_20260131.tsx
```

4. **Update DESIGN_SPECS.md** if layout/colors/text changed

5. **Apply changes to PyQt6 version**:
- Identify changed elements (colors, text, layout)
- Update popup_ui.py accordingly
- Test visually

6. **Git commit**:
```bash
cd C:\Users\umber\Documents\MyProjects\FolderTextMerger
git add popup_ui.py
git commit -m "Update pricing modal: sync with Lovable changes (2026-01-31)"
```

---

## Directory Structure (Final)

```
C:\Users\umber\Documents\MyProjects\
│
├── Folder2TextLovable\                    # Lovable app (React/TypeScript)
│   ├── src\
│   │   └── components\
│   │       ├── PricingModal.tsx          # SOURCE OF TRUTH (UI Design)
│   │       └── ProWaitlistModal.tsx      # Waitlist modal
│   └── ...
│
├── FolderTextMerger\                      # Python PyQt6 app
│   ├── popup_ui.py                        # PyQt6 converted modal UI
│   ├── popup.py                           # Controller/Business Logic
│   ├── backups\
│   │   └── 20260131\
│   │       ├── popup_ui_ORIGINAL.py       # Backup pre-redesign
│   │       └── popup_ORIGINAL.py          # Backup pre-redesign
│   └── ...
│
└── Shared\                                # Design sync folder
    └── PricingModalDesign\
        ├── PricingModal.tsx               # Latest Lovable version (copy)
        ├── ProWaitlistModal.tsx           # Latest Lovable version (copy)
        ├── DESIGN_SPECS.md                # Design documentation
        ├── IMPLEMENTATION_CHECKLIST.md    # PyQt6 conversion checklist
        ├── UPDATE_WORKFLOW.md             # How to sync changes
        └── versions\                      # Historical versions
            ├── PricingModal_20260131.tsx
            └── ...
```

---

## Decisioni Chiave

### 1. Conversione Manuale vs Embedded WebView

**DECISIONE**: Conversione Manuale

**RATIONALE**:
- App desktop nativa con performance migliori
- Esperienza utente più coerente con OS
- No overhead browser engine
- Pieno controllo su animazioni e comportamento

### 2. Lovable come "Source of Truth" del Design

**DECISIONE**: Lovable rimane la reference per design visivo

**RATIONALE**:
- Lovable è aggiornato frequentemente (auto-sync da Lovable.dev)
- Design system coerente e moderno
- Facilita iterazioni future
- PyQt6 version è "port" fedele del design

### 3. Separazione UI/Logic (MVC Pattern)

**DECISIONE**: Mantenere separazione popup_ui.py (View) e popup.py (Controller)

**RATIONALE**:
- Già presente nell'architettura attuale
- Facilita testing
- Logica business indipendente da UI
- Permette future sostituzioni UI senza toccare logic

### 4. Theme System

**DECISIONE**: Implementare light/dark theme come Lovable

**RATIONALE**:
- User experience moderna
- Lovable ha già palette definita
- Relativamente semplice in PyQt6 con QSS o custom painting

---

## Risorse e Riferimenti

### Lovable Files
- `C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\PricingModal.tsx`
- `C:\Users\umber\Documents\MyProjects\Folder2TextLovable\src\components\ProWaitlistModal.tsx`

### FolderTextMerger Files
- `C:\Users\umber\Documents\MyProjects\FolderTextMerger\popup_ui.py`
- `C:\Users\umber\Documents\MyProjects\FolderTextMerger\popup.py`

### Design Reference
- `C:\Users\umber\Documents\MyProjects\Shared\PricingModalDesign\`

### Documentation
- PyQt6 Official Docs: https://doc.qt.io/qtforpython-6/
- QPropertyAnimation: https://doc.qt.io/qt-6/qpropertyanimation.html
- QPainter: https://doc.qt.io/qt-6/qpainter.html

---

## Timeline Estimate

**Phase 1-2 (Core UI + Layout)**: 6-8 hours
**Phase 3 (Animations)**: 3-4 hours
**Phase 4-5 (Interactions + State)**: 2-3 hours
**Phase 6 (Translations)**: 1 hour
**Phase 7 (Accessibility)**: 2 hours
**Phase 8-9 (Testing + Integration)**: 3-4 hours

**Total Estimate**: 17-22 hours of development

---

## Next Actions (Immediate)

1. **USER APPROVAL**: Review this plan and approve approach
2. **Create backups**: Execute FASE 1 (backup existing files)
3. **Setup directories**: Create Shared/PricingModalDesign/
4. **Copy Lovable files**: Copy PricingModal.tsx and ProWaitlistModal.tsx
5. **Complete DESIGN_SPECS.md**: Fill in all specs from Lovable analysis
6. **Start Phase 1**: Begin PyQt6 component conversion

---

## Notes

- This plan assumes FolderTextMerger will NOT have Supabase integration for waitlist (Pro subscriptions "COMING SOON" badge only)
- If MS Store integration is needed, add separate task for that API
- Consider creating a "preview mode" script that shows Lovable modal side-by-side with PyQt6 version for visual comparison during development
- Trial badge should be dynamically updated when user consumes a trial (already in current implementation)

---

**Document Version**: 1.0
**Date**: 2026-01-31
**Author**: Claude (via user request)
**Status**: PENDING USER APPROVAL
