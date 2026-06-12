# Test Plan — T103

1) JSON validation:
   - parse all locale files
2) Required keys check:
   - ensure all keys exist for IT/EN
3) Spot-check:
   - 20 random keys per 3 lingue
4) Export repeatability:
   - run export twice, compare outputs (should be identical if no content changed)
