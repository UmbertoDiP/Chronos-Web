# Notes / Log — T101

## Findings
- Initial modal width (75vw) was too narrow for small Windows wrappers (e.g. 400px width).
- Plan cards had fixed width causing rigid layout on resize.

## Changes
- Updated `PricingModal.tsx`:
  - Changed main container width to `w-[95vw] md:w-[85vw] lg:w-[75vw]` for better small screen usage.
  - Made PlanCard width flexible: `w-full max-w-[240px] md:w-[210px]`.

## Verification evidence
- Static analysis confirms classes are now responsive.
- Should be tested in actual wrapper.
