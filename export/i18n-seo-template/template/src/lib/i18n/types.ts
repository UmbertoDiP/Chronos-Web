// ============================================================
// i18n Type Definitions — TEMPLATE
// ============================================================
// This file defines ALL translation keys used across the app.
// Every key listed here MUST exist in the English locale (source of truth).
// Other locales use Partial<TranslationKeys> and fall back to English.
//
// NAMING CONVENTION:
//   namespace.section.element
//   Examples:
//     'nav.home'                    — Navigation > Home
//     'landing.hero.title'          — Landing page > Hero section > Title
//     'modal.pricing.cta.standard'  — Modal > Pricing > CTA > Standard plan
//     'landing.faq.q1'              — Landing > FAQ > Question 1
//
// RULES:
//   1. All keys are dot-separated, lowercase, camelCase for multi-word segments
//   2. Questions use .q1, .q2, ...; Answers use .a1, .a2, ...
//   3. Features use .f1, .f2, ... or descriptive names (.export, .filtering)
//   4. Section headers: namespace.section.title / .subtitle
//   5. CTAs: namespace.section.cta or .cta.variant
// ============================================================

export type TranslationKey = keyof TranslationKeys;

export type TranslationKeys = {
  // ─── Navigation ───────────────────────────────────────
  'nav.home': string;
  'nav.features': string;
  'nav.pricing': string;
  'nav.changelog': string;
  'nav.download': string;
  'nav.settings': string;
  'nav.subtitle': string;
  'nav.faq': string;
  'nav.store': string;

  // ─── Hero Section ─────────────────────────────────────
  'hero.badge': string;
  'hero.title': string;
  'hero.titleHighlight': string;
  'hero.subtitle': string;
  'hero.cta': string;
  'hero.ctaSecondary': string;

  // ─── Features (short, used in multiple places) ────────
  'features.title': string;
  'features.oneClick.title': string;
  'features.oneClick.desc': string;
  'features.patterns.title': string;
  'features.patterns.desc': string;
  'features.optimized.title': string;
  'features.optimized.desc': string;
  'features.local.title': string;
  'features.local.desc': string;

  // ─── Pricing ──────────────────────────────────────────
  'pricing.title': string;
  'pricing.subtitle': string;
  'pricing.standard.name': string;
  'pricing.standard.price': string;
  'pricing.standard.period': string;
  'pricing.standard.desc': string;
  'pricing.standard.cta': string;
  'pricing.proMonthly.name': string;
  'pricing.proMonthly.price': string;
  'pricing.proMonthly.period': string;
  'pricing.proMonthly.desc': string;
  'pricing.proMonthly.cta': string;
  'pricing.proAnnual.name': string;
  'pricing.proAnnual.price': string;
  'pricing.proAnnual.period': string;
  'pricing.proAnnual.desc': string;
  'pricing.proAnnual.cta': string;
  'pricing.proAnnual.savings': string;

  // ─── Feature List Items ───────────────────────────────
  'feature.folderScan': string;
  'feature.ignorePatterns': string;
  'feature.fileFilters': string;
  'feature.clipboard': string;
  'feature.download': string;
  'feature.localProcessing': string;
  'feature.customParams': string;
  'feature.advancedConfig': string;
  'feature.prioritySupport': string;
  'feature.futureFeatures': string;

  // ─── FAQ ──────────────────────────────────────────────
  'faq.title': string;
  'faq.trial.q': string;
  'faq.trial.a': string;
  'faq.refund.q': string;
  'faq.refund.a': string;
  'faq.privacy.q': string;
  'faq.privacy.a': string;
  'faq.updates.q': string;
  'faq.updates.a': string;

  // ─── Changelog ────────────────────────────────────────
  'changelog.title': string;
  'changelog.subtitle': string;

  // ─── Referral ─────────────────────────────────────────
  'referral.title': string;
  'referral.desc': string;
  'referral.howItWorks': string;
  'referral.step1': string;
  'referral.step2': string;
  'referral.step3': string;

  // ─── Footer ───────────────────────────────────────────
  'footer.copyright': string;
  'footer.privacy': string;
  'footer.terms': string;

  // ─── Actions ──────────────────────────────────────────
  'action.copy': string;
  'action.download': string;
  'action.learnMore': string;

  // ─── Messages ─────────────────────────────────────────
  'msg.copied': string;
  'msg.downloading': string;
  'msg.error': string;
  'msg.loading': string;

  // ─── Pricing Modal ────────────────────────────────────
  'modal.pricing.title': string;
  'modal.pricing.subtitle': string;
  'modal.pricing.badge.popular': string;
  'modal.pricing.badge.bestValue': string;
  'modal.pricing.badge.comingSoon': string;
  'modal.pricing.features.included': string;
  'modal.pricing.features.excluded': string;
  'modal.pricing.originalPrice': string;
  'modal.pricing.discount': string;
  'modal.pricing.perMonth': string;
  'modal.pricing.perYear': string;
  'modal.pricing.oneTime': string;
  'modal.pricing.lifetime': string;
  'modal.pricing.unlimited': string;
  'modal.pricing.filesLimit': string;
  'modal.pricing.noLimit': string;
  'modal.pricing.section.standard': string;
  'modal.pricing.section.pro': string;
  'modal.pricing.unlocksPro': string;
  'modal.pricing.trialLeft': string;
  'modal.pricing.cta.standard': string;
  'modal.pricing.cta.proMonthly': string;
  'modal.pricing.cta.proAnnual': string;
  'modal.pricing.cta.waitlist': string;
  'modal.pricing.billed.monthly': string;
  'modal.pricing.billed.annually': string;
  'modal.pricing.viaStore': string;
  'modal.pricing.securePayment': string;
  'modal.pricing.instantActivation': string;
  'modal.pricing.lifetimeSupport': string;
  'modal.pricing.saveLabel': string;

  // ─── Landing: Header ─────────────────────────────────
  'landing.getFromStore': string;
  'landing.downloadFromStore': string;

  // ─── Landing: Hero ────────────────────────────────────
  'landing.storeBadge': string;
  'landing.heroSubtitle1': string;
  'landing.heroSubtitle2': string;
  'landing.viewPricing': string;

  // ─── Landing: Terminal ────────────────────────────────
  'landing.terminal.scanning': string;
  'landing.terminal.processing': string;
  'landing.terminal.generating': string;
  'landing.terminal.done': string;
  'landing.terminal.ready': string;

  // ─── Landing: Stats ───────────────────────────────────
  'landing.stats.forDevs': string;
  'landing.stats.avgTime': string;
  'landing.stats.localPrivate': string;
  'landing.stats.lifetimeLicense': string;

  // ─── Landing: How It Works ────────────────────────────
  'landing.howItWorks.title': string;
  'landing.howItWorks.subtitle': string;
  'landing.howItWorks.step1.title': string;
  'landing.howItWorks.step1.desc': string;
  'landing.howItWorks.step2.title': string;
  'landing.howItWorks.step2.desc': string;
  'landing.howItWorks.step3.title': string;
  'landing.howItWorks.step3.desc': string;

  // ─── Landing: Features Grid ───────────────────────────
  'landing.features.sectionTitle': string;
  'landing.features.sectionSubtitle': string;
  'landing.features.export.title': string;
  'landing.features.export.desc': string;
  'landing.features.filtering.title': string;
  'landing.features.filtering.desc': string;
  'landing.features.output.title': string;
  'landing.features.output.desc': string;
  'landing.features.speed.title': string;
  'landing.features.speed.desc': string;
  'landing.features.privacy.title': string;
  'landing.features.privacy.desc': string;
  'landing.features.saveTime.title': string;
  'landing.features.saveTime.desc': string;

  // ─── Landing: Pricing ─────────────────────────────────
  'landing.pricing.standardLicense': string;
  'landing.pricing.oneTimePayment': string;
  'landing.pricing.recommended': string;
  'landing.pricing.bestValue': string;
  'landing.pricing.buyStandard': string;
  'landing.pricing.subscribeMonthly': string;
  'landing.pricing.subscribeAnnually': string;
  'landing.pricing.perMonthCancel': string;
  'landing.pricing.perMonthBilledAnnually': string;
  'landing.pricing.disclaimer': string;
  'landing.pricing.standard.f1': string;
  'landing.pricing.standard.f2': string;
  'landing.pricing.standard.f3': string;
  'landing.pricing.standard.f4': string;
  'landing.pricing.standard.f5': string;
  'landing.pricing.standard.f6': string;
  'landing.pricing.pro.f1': string;
  'landing.pricing.pro.f2': string;
  'landing.pricing.pro.f3': string;
  'landing.pricing.pro.f4': string;
  'landing.pricing.pro.f5': string;
  'landing.pricing.pro.f6': string;

  // ─── Landing: Pro Features ────────────────────────────
  'landing.proFeatures.badge': string;
  'landing.proFeatures.title': string;
  'landing.proFeatures.subtitle': string;
  'landing.proFeatures.ext.title': string;
  'landing.proFeatures.ext.desc': string;
  'landing.proFeatures.split.title': string;
  'landing.proFeatures.split.desc': string;
  'landing.proFeatures.presets.title': string;
  'landing.proFeatures.presets.desc': string;
  'landing.proFeatures.templates.title': string;
  'landing.proFeatures.templates.desc': string;

  // ─── Landing: FAQ ─────────────────────────────────────
  'landing.faq.title': string;
  'landing.faq.subtitle': string;
  'landing.faq.q1': string;
  'landing.faq.a1': string;
  'landing.faq.q2': string;
  'landing.faq.a2': string;
  'landing.faq.q3': string;
  'landing.faq.a3': string;
  'landing.faq.q4': string;
  'landing.faq.a4': string;
  'landing.faq.q5': string;
  'landing.faq.a5': string;
  'landing.faq.q6': string;
  'landing.faq.a6': string;
  'landing.faq.q7': string;
  'landing.faq.a7': string;

  // ─── Landing: CTA ─────────────────────────────────────
  'landing.cta.title': string;
  'landing.cta.subtitle': string;
  'landing.cta.viewChangelog': string;

  // ─── Landing: Footer ──────────────────────────────────
  'landing.footer.termsOfService': string;
  'landing.footer.allRights': string;
  'landing.footer.privacyPolicy': string;
  'landing.footer.support': string;

  // ─── Testimonials ─────────────────────────────────────
  'testimonials.title': string;
  'testimonials.subtitle': string;
  'testimonials.1.content': string;
  'testimonials.2.content': string;
  'testimonials.3.content': string;
  'testimonials.4.content': string;

  // ─── Comparison Table ─────────────────────────────────
  'comparison.title': string;
  'comparison.subtitle': string;
  'comparison.feature': string;
  'comparison.from': string;
  'comparison.f1': string;
  'comparison.f2': string;
  'comparison.f2.standard': string;
  'comparison.f2.pro': string;
  'comparison.f3': string;
  'comparison.f4': string;
  'comparison.f5': string;
  'comparison.f6': string;
  'comparison.f7': string;
  'comparison.f8': string;
  'comparison.f9': string;
  'comparison.f10': string;

  // ─── Cookie Consent ───────────────────────────────────
  'cookie.title': string;
  'cookie.message': string;
  'cookie.essential': string;
  'cookie.essentialDesc': string;
  'cookie.analytics': string;
  'cookie.analyticsDesc': string;
  'cookie.accept': string;
  'cookie.decline': string;
  'cookie.customize': string;
  'cookie.save': string;
  'cookie.privacy': string;
  'cookie.alwaysActive': string;
  'cookie.manage': string;

  // ─── HowTo Schema ────────────────────────────────────
  'howto.name': string;
  'howto.description': string;
  'howto.step1.name': string;
  'howto.step1.text': string;
  'howto.step2.name': string;
  'howto.step2.text': string;
  'howto.step3.name': string;
  'howto.step3.text': string;

  // ─── Support Modal ────────────────────────────────────
  'support.title': string;
  'support.description': string;
  'support.name': string;
  'support.namePlaceholder': string;
  'support.email': string;
  'support.emailPlaceholder': string;
  'support.message': string;
  'support.messagePlaceholder': string;
  'support.send': string;
  'support.sent': string;
  'support.toast.title': string;
  'support.toast.description': string;
};
