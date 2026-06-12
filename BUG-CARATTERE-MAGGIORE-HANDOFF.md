# Bug Carattere ">" - Handoff per Nuova Sessione

## Problema Critico

**Status**: 🔴 NON RISOLTO - Bug persiste in produzione

Un carattere `>` appare visibilmente nell'interfaccia utente in alto a sinistra della pagina, prima di tutto il contenuto.

### Screenshot del Bug

L'utente ha fornito screenshot che mostrano il carattere ">" visibile nell'interfaccia.

**Location del bug**: Top-left della pagina, prima del contenuto principale

**Production URL**: https://folder2text.com

**Preview URL**: https://8813d8e3.folder2text.pages.dev

---

## Timeline Investigazione (03/01/2026)

### 1. Tentativo 1: Rimozione FolderCode Icon
- **Azione**: Rimosso `FolderCode` icon da `PrivacyPolicy.tsx` e `TermsOfService.tsx`
- **Commit**: "Remove FolderCode icon from Privacy Policy and Terms of Service pages"
- **Risultato**: ❌ Bug persiste

### 2. Tentativo 2: Disabilitazione SkipToContent
- **Azione**: Commentato `<SkipToContent />` in `App.tsx`
- **Commit**: "Temporarily disable SkipToContent component to debug > character issue"
- **Risultato**: ❌ Bug persiste

### 3. Tentativo 3: Git Regression Analysis
- **Azione**: Analizzato diff tra `v1.3.0` (ultima versione funzionante) e `HEAD`
- **Finding**: Trovato cambio in `SkipToContent.tsx`:
  - v1.3.0: hardcoded `"Salta al contenuto principale"`
  - HEAD: dynamic `{label}` con `useLanguage()` hook
- **Ipotesi**: Il cambio a label dinamica causa il rendering del ">"

### 4. Tentativo 4: Revert a v1.3.0
- **Azione**: Revertito `SkipToContent.tsx` a versione v1.3.0
  - Rimosso `useLanguage` import
  - Rimosso `const label = ...`
  - Ripristinato hardcoded string
  - Re-abilitato component in `App.tsx`
- **Commit**: "Fix regression: revert SkipToContent to v1.3.0 (remove dynamic label causing > character bug)"
- **Deploy**: Completato su production
- **Risultato**: ❌ **BUG ANCORA PRESENTE** (confermato da utente con screenshot)

---

## File Modificati nella Sessione

### src/components/SkipToContent.tsx
```tsx
// VERSIONE CORRENTE (post-revert)
import { useEffect } from 'react';

export const SkipToContent = ({ targetId = 'main-content' }: { targetId?: string }) => {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (target && !target.getAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
  }, [targetId]);

  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999]
                 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md
                 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Salta al contenuto principale
    </a>
  );
};
```

### src/App.tsx
```tsx
// SkipToContent è ABILITATO (linea 86)
<TooltipProvider>
  <SkipToContent />
  <Toaster />
```

### src/pages/PrivacyPolicy.tsx & TermsOfService.tsx
- Rimosso `FolderCode` icon dal navbar
- Mantiene solo `ChevronLeft` + testo "Folder2Text"

---

## Git Tags & Versioni

- **v1.0.0**: 2026-01-17
- **v1.1.0**: 2026-02-12
- **v1.3.0**: 2026-02-12 (ultima versione nota funzionante?)
- **v1.2.0**: 2026-03-01 (creato durante questa sessione)

**Nota**: L'utente ha detto "prima non c'era questo bug, è successo questa settimana"

---

## Ipotesi Non Confermate

1. ❌ **FolderCode icon**: Non era la causa
2. ❌ **SkipToContent dynamic label**: Revert non ha risolto
3. ❓ **SkipToContent component stesso**: Anche disabilitandolo il bug persisteva

---

## Prossimi Step da Investigare

### 1. Verifica Build Output
- Controllare `dist/index.html` per caratteri spuri
- Verificare se il ">" è hardcoded nel build output
- File corrente: `dist/assets/index-CNkqNlqi.js`

### 2. Analisi Componenti React Upstream
Il ">" potrebbe provenire da:
- `<BreadcrumbList />` component
- `<SEOHead />` component
- `<CookieConsent />` component
- `<FounderFloatingButton />` component

### 3. Confronto con Repository Lovable Originale
- Verificare se il template Lovable aggiornato ha introdotto il bug
- L'utente ha detto "ho aggiornato lovable" all'inizio della sessione
- Potrebbe essere un bug upstream dal template

### 4. Analisi CSS/Tailwind
- Verificare se `className="sr-only focus:not-sr-only"` causa rendering issues
- Controllare se Tailwind ha un bug con `sr-only`

### 5. Browser DevTools Inspection
- Usare browser inspector per trovare esattamente quale elemento HTML contiene il ">"
- Verificare nel DOM tree quale component lo genera
- Controllare computed styles

### 6. Git Bisect
- Usare `git bisect` per trovare esattamente quale commit ha introdotto il bug
- Range: v1.3.0 (funzionante) → HEAD (rotto)

### 7. Test Disabilitazione Componenti Sistematica
Disabilitare uno alla volta:
```tsx
// In App.tsx, provare a commentare:
<BreadcrumbList />
<SEOHead />
<CookieConsent />
<FounderFloatingButton />
```

### 8. Verifica Lovable Sync
- L'utente ha menzionato sync con template Lovable
- Verificare file `lovable-templates/` in FolderTextMerger project
- Controllare se Privacy/Terms wrapper hanno il bug

---

## File da Leggere per Continuare Investigazione

1. `src/components/StructuredData/BreadcrumbList.tsx`
2. `src/components/SEOHead.tsx`
3. `src/components/CookieConsent.tsx`
4. `src/components/FounderFloatingButton.tsx`
5. `dist/index.html` (build output)
6. `dist/assets/index-CNkqNlqi.js` (JavaScript bundle)

---

## Comandi Git Utili

```bash
# Git bisect per trovare commit esatto
git bisect start
git bisect bad HEAD
git bisect good v1.3.0

# Confronto con versioni precedenti
git diff v1.3.0..HEAD

# Lista tutti i commit dalla v1.3.0
git log v1.3.0..HEAD --oneline

# Visualizza file specifico in v1.3.0
git show v1.3.0:src/components/SkipToContent.tsx
```

---

## Deploy & Build Info

**Ultima build**: 2026-03-01
**Bundle size**: 1,492.79 kB (index-CNkqNlqi.js)
**CSS size**: 96.81 kB (index-CWPxEMGB.css)
**Deploy method**: Cloudflare Pages via `npx wrangler pages deploy`

---

## Nota Importante

Il bug è **visibile in produzione** e **confermato dall'utente con screenshot**.

Tutti i tentativi finora (rimozione icon, disabilitazione SkipToContent, revert a v1.3.0) **non hanno risolto il problema**.

Il bug potrebbe essere:
- Nel template Lovable aggiornato dall'utente
- In un component diverso da SkipToContent
- Nel build output stesso (Vite/Rollup)
- In un component wrapper esterno (Privacy/Terms template da FolderTextMerger)

---

## Contesto Progetto

**Progetto**: Folder2Text Lovable Wrapper
**Repo GitHub**: https://github.com/UmbertoDiP/folder2text
**Path locale**: `C:\Users\umber\Documents\MyProjects\Folder2TextLovable`

**Progetto collegato**: FolderTextMerger
**Path**: `C:\Users\umber\Documents\MyProjects\FolderTextMerger`
**Template master**: `lovable-templates/` (Privacy/Terms content)

---

## Azioni Immediate per Nuova Sessione

1. **Leggere questo file** per contesto completo
2. **Aprire browser DevTools** su https://folder2text.com
3. **Ispezionare DOM** per trovare elemento con ">"
4. **Identificare component esatto** che genera il carattere
5. **Applicare fix targetizzato** solo al component identificato
6. **Test & deploy**

---

**Creato**: 2026-03-01 02:30 UTC
**Status**: Bug in produzione, investigazione in corso
**Priorità**: 🔴 ALTA - User-facing bug visibile
