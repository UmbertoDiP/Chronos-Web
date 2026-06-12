# Test Plan — T101

## Manual UI tests
1) Open pricing modal on desktop size (>= 900px width)
   - Expected: No overflow, CTA visible
2) Open pricing modal on small window (380x600)
   - Expected: internal scroll appears, no clipped buttons
3) Keyboard navigation
   - TAB cycles through interactive controls
   - Expected: focus visible, CTA reachable
4) Long language strings simulation (de-DE)
   - Expected: cards expand or wrap without overlap
5) Links/CTA
   - Expected: click triggers correct action (open store flow or internal handler)
6) Dark mode (if supported)
   - Expected: contrast acceptable, text readable
