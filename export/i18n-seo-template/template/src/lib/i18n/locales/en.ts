// ============================================================
// English Locale — TEMPLATE (Source of Truth)
// ============================================================
// This is the ONLY locale that must implement TranslationKeys fully.
// All values below are PLACEHOLDERS — replace with your real content.
// ============================================================

import type { TranslationKeys } from '../types';

export const en: TranslationKeys = {
  // Navigation
  'nav.home': '[Home]',
  'nav.features': '[Features]',
  'nav.pricing': '[Pricing]',
  'nav.changelog': '[Changelog]',
  'nav.download': '[Download]',
  'nav.settings': '[Settings]',
  'nav.subtitle': '[Your app tagline]',
  'nav.faq': '[FAQ]',
  'nav.store': '[Store]',

  // Hero
  'hero.badge': '[Badge text]',
  'hero.title': '[Main headline]',
  'hero.titleHighlight': '[Highlighted part]',
  'hero.subtitle': '[Hero subtitle describing your product]',
  'hero.cta': '[Primary CTA]',
  'hero.ctaSecondary': '[Secondary CTA]',

  // Features
  'features.title': '[Features section title]',
  'features.oneClick.title': '[Feature 1 title]',
  'features.oneClick.desc': '[Feature 1 description]',
  'features.patterns.title': '[Feature 2 title]',
  'features.patterns.desc': '[Feature 2 description]',
  'features.optimized.title': '[Feature 3 title]',
  'features.optimized.desc': '[Feature 3 description]',
  'features.local.title': '[Feature 4 title]',
  'features.local.desc': '[Feature 4 description]',

  // Pricing
  'pricing.title': '[Pricing title]',
  'pricing.subtitle': '[Pricing subtitle]',
  'pricing.standard.name': '[Standard plan name]',
  'pricing.standard.price': '[€0.00]',
  'pricing.standard.period': '[one-time]',
  'pricing.standard.desc': '[Standard plan description]',
  'pricing.standard.cta': '[Buy Standard]',
  'pricing.proMonthly.name': '[Pro Monthly]',
  'pricing.proMonthly.price': '[€0.00]',
  'pricing.proMonthly.period': '[/month]',
  'pricing.proMonthly.desc': '[Pro monthly description]',
  'pricing.proMonthly.cta': '[Subscribe]',
  'pricing.proAnnual.name': '[Pro Annual]',
  'pricing.proAnnual.price': '[€0.00]',
  'pricing.proAnnual.period': '[/year]',
  'pricing.proAnnual.desc': '[Pro annual description]',
  'pricing.proAnnual.cta': '[Subscribe & Save]',
  'pricing.proAnnual.savings': '[Save ~X%]',

  // Feature list
  'feature.folderScan': '[Feature list item 1]',
  'feature.ignorePatterns': '[Feature list item 2]',
  'feature.fileFilters': '[Feature list item 3]',
  'feature.clipboard': '[Feature list item 4]',
  'feature.download': '[Feature list item 5]',
  'feature.localProcessing': '[Feature list item 6]',
  'feature.customParams': '[Feature list item 7]',
  'feature.advancedConfig': '[Feature list item 8]',
  'feature.prioritySupport': '[Feature list item 9]',
  'feature.futureFeatures': '[Feature list item 10]',

  // FAQ
  'faq.title': '[FAQ Title]',
  'faq.trial.q': '[Trial question]',
  'faq.trial.a': '[Trial answer]',
  'faq.refund.q': '[Refund question]',
  'faq.refund.a': '[Refund answer]',
  'faq.privacy.q': '[Privacy question]',
  'faq.privacy.a': '[Privacy answer]',
  'faq.updates.q': '[Updates question]',
  'faq.updates.a': '[Updates answer]',

  // Changelog
  'changelog.title': '[Changelog]',
  'changelog.subtitle': '[What\'s new]',

  // Referral
  'referral.title': '[Referral title]',
  'referral.desc': '[Referral description]',
  'referral.howItWorks': '[How it works]',
  'referral.step1': '[Step 1]',
  'referral.step2': '[Step 2]',
  'referral.step3': '[Step 3]',

  // Footer
  'footer.copyright': '[© {year} Your App. All rights reserved.]',
  'footer.privacy': '[Privacy Policy]',
  'footer.terms': '[Terms of Service]',

  // Actions
  'action.copy': '[Copy]',
  'action.download': '[Download]',
  'action.learnMore': '[Learn More]',

  // Messages
  'msg.copied': '[Copied!]',
  'msg.downloading': '[Downloading...]',
  'msg.error': '[Error]',
  'msg.loading': '[Loading...]',

  // Pricing Modal
  'modal.pricing.title': '[Choose Your Plan]',
  'modal.pricing.subtitle': '[Pricing modal subtitle]',
  'modal.pricing.badge.popular': '[Most Popular]',
  'modal.pricing.badge.bestValue': '[Best Value]',
  'modal.pricing.badge.comingSoon': '[Coming Soon]',
  'modal.pricing.features.included': '[Included]',
  'modal.pricing.features.excluded': '[Not included]',
  'modal.pricing.originalPrice': '[Originally]',
  'modal.pricing.discount': '[off]',
  'modal.pricing.perMonth': '[/month]',
  'modal.pricing.perYear': '[/year]',
  'modal.pricing.oneTime': '[one-time]',
  'modal.pricing.lifetime': '[Lifetime]',
  'modal.pricing.unlimited': '[Unlimited]',
  'modal.pricing.filesLimit': '[files per extraction]',
  'modal.pricing.noLimit': '[No limit]',
  'modal.pricing.section.standard': '[STANDARD FEATURES]',
  'modal.pricing.section.pro': '[PRO FEATURES]',
  'modal.pricing.unlocksPro': '[Unlocks PRO]',
  'modal.pricing.trialLeft': '[free left]',
  'modal.pricing.cta.standard': '[GET STANDARD]',
  'modal.pricing.cta.proMonthly': '[GET PRO MONTHLY]',
  'modal.pricing.cta.proAnnual': '[GET PRO ANNUAL]',
  'modal.pricing.cta.waitlist': '[JOIN WAITLIST]',
  'modal.pricing.billed.monthly': '[Billed monthly]',
  'modal.pricing.billed.annually': '[Billed annually]',
  'modal.pricing.viaStore': '[via Store]',
  'modal.pricing.securePayment': '[Safe Payment]',
  'modal.pricing.instantActivation': '[Instant Activation]',
  'modal.pricing.lifetimeSupport': '[Lifetime Support]',
  'modal.pricing.saveLabel': '[SAVE X%]',

  // Landing: Header
  'landing.getFromStore': '[Get from Store]',
  'landing.downloadFromStore': '[Download from Store]',

  // Landing: Hero
  'landing.storeBadge': '[Available on Store]',
  'landing.heroSubtitle1': '[Hero subtitle line 1]',
  'landing.heroSubtitle2': '[Hero subtitle line 2]',
  'landing.viewPricing': '[View Pricing]',

  // Landing: Terminal
  'landing.terminal.scanning': '[Scanning...]',
  'landing.terminal.processing': '[Processing...]',
  'landing.terminal.generating': '[Generating...]',
  'landing.terminal.done': '[Done!]',
  'landing.terminal.ready': '[Ready to use]',

  // Landing: Stats
  'landing.stats.forDevs': '[For developers and teams]',
  'landing.stats.avgTime': '[Average Processing]',
  'landing.stats.localPrivate': '[Local & Private]',
  'landing.stats.lifetimeLicense': '[Lifetime License]',

  // Landing: How It Works
  'landing.howItWorks.title': '[How It Works]',
  'landing.howItWorks.subtitle': '[Steps subtitle]',
  'landing.howItWorks.step1.title': '[Step 1 title]',
  'landing.howItWorks.step1.desc': '[Step 1 description]',
  'landing.howItWorks.step2.title': '[Step 2 title]',
  'landing.howItWorks.step2.desc': '[Step 2 description]',
  'landing.howItWorks.step3.title': '[Step 3 title]',
  'landing.howItWorks.step3.desc': '[Step 3 description]',

  // Landing: Features Grid
  'landing.features.sectionTitle': '[Features title]',
  'landing.features.sectionSubtitle': '[Features subtitle]',
  'landing.features.export.title': '[Export title]',
  'landing.features.export.desc': '[Export description]',
  'landing.features.filtering.title': '[Filtering title]',
  'landing.features.filtering.desc': '[Filtering description]',
  'landing.features.output.title': '[Output title]',
  'landing.features.output.desc': '[Output description]',
  'landing.features.speed.title': '[Speed title]',
  'landing.features.speed.desc': '[Speed description]',
  'landing.features.privacy.title': '[Privacy title]',
  'landing.features.privacy.desc': '[Privacy description]',
  'landing.features.saveTime.title': '[Save Time title]',
  'landing.features.saveTime.desc': '[Save Time description]',

  // Landing: Pricing
  'landing.pricing.standardLicense': '[Standard License]',
  'landing.pricing.oneTimePayment': '[One-time payment]',
  'landing.pricing.recommended': '[RECOMMENDED]',
  'landing.pricing.bestValue': '[BEST VALUE]',
  'landing.pricing.buyStandard': '[Buy Standard]',
  'landing.pricing.subscribeMonthly': '[Subscribe Monthly]',
  'landing.pricing.subscribeAnnually': '[Subscribe Annually]',
  'landing.pricing.perMonthCancel': '[per month, cancel anytime]',
  'landing.pricing.perMonthBilledAnnually': '[per month, billed annually]',
  'landing.pricing.disclaimer': '[Pricing disclaimer text]',
  'landing.pricing.standard.f1': '[Standard feature 1]',
  'landing.pricing.standard.f2': '[Standard feature 2]',
  'landing.pricing.standard.f3': '[Standard feature 3]',
  'landing.pricing.standard.f4': '[Standard feature 4]',
  'landing.pricing.standard.f5': '[Standard feature 5]',
  'landing.pricing.standard.f6': '[Standard feature 6]',
  'landing.pricing.pro.f1': '[Pro feature 1]',
  'landing.pricing.pro.f2': '[Pro feature 2]',
  'landing.pricing.pro.f3': '[Pro feature 3]',
  'landing.pricing.pro.f4': '[Pro feature 4]',
  'landing.pricing.pro.f5': '[Pro feature 5]',
  'landing.pricing.pro.f6': '[Pro feature 6]',

  // Landing: Pro Features
  'landing.proFeatures.badge': '[Pro Features]',
  'landing.proFeatures.title': '[Pro title]',
  'landing.proFeatures.subtitle': '[Pro subtitle]',
  'landing.proFeatures.ext.title': '[Extension title]',
  'landing.proFeatures.ext.desc': '[Extension description]',
  'landing.proFeatures.split.title': '[Split title]',
  'landing.proFeatures.split.desc': '[Split description]',
  'landing.proFeatures.presets.title': '[Presets title]',
  'landing.proFeatures.presets.desc': '[Presets description]',
  'landing.proFeatures.templates.title': '[Templates title]',
  'landing.proFeatures.templates.desc': '[Templates description]',

  // Landing: FAQ
  'landing.faq.title': '[FAQ]',
  'landing.faq.subtitle': '[FAQ subtitle]',
  'landing.faq.q1': '[Question 1]',
  'landing.faq.a1': '[Answer 1]',
  'landing.faq.q2': '[Question 2]',
  'landing.faq.a2': '[Answer 2]',
  'landing.faq.q3': '[Question 3]',
  'landing.faq.a3': '[Answer 3]',
  'landing.faq.q4': '[Question 4]',
  'landing.faq.a4': '[Answer 4]',
  'landing.faq.q5': '[Question 5]',
  'landing.faq.a5': '[Answer 5]',
  'landing.faq.q6': '[Question 6]',
  'landing.faq.a6': '[Answer 6]',
  'landing.faq.q7': '[Question 7]',
  'landing.faq.a7': '[Answer 7]',

  // Landing: CTA
  'landing.cta.title': '[CTA title]',
  'landing.cta.subtitle': '[CTA subtitle]',
  'landing.cta.viewChangelog': '[View Changelog]',

  // Landing: Footer
  'landing.footer.termsOfService': '[Terms of Service]',
  'landing.footer.allRights': '[All rights reserved.]',
  'landing.footer.privacyPolicy': '[Privacy Policy]',
  'landing.footer.support': '[Support]',

  // Testimonials
  'testimonials.title': '[Testimonials title]',
  'testimonials.subtitle': '[Testimonials subtitle]',
  'testimonials.1.content': '[Testimonial 1]',
  'testimonials.2.content': '[Testimonial 2]',
  'testimonials.3.content': '[Testimonial 3]',
  'testimonials.4.content': '[Testimonial 4]',

  // Comparison Table
  'comparison.title': '[Compare Plans]',
  'comparison.subtitle': '[Comparison subtitle]',
  'comparison.feature': '[Feature]',
  'comparison.from': '[From]',
  'comparison.f1': '[Comparison feature 1]',
  'comparison.f2': '[Comparison feature 2]',
  'comparison.f2.standard': '[Standard value]',
  'comparison.f2.pro': '[Pro value]',
  'comparison.f3': '[Comparison feature 3]',
  'comparison.f4': '[Comparison feature 4]',
  'comparison.f5': '[Comparison feature 5]',
  'comparison.f6': '[Comparison feature 6]',
  'comparison.f7': '[Comparison feature 7]',
  'comparison.f8': '[Comparison feature 8]',
  'comparison.f9': '[Comparison feature 9]',
  'comparison.f10': '[Comparison feature 10]',

  // Cookie Consent
  'cookie.title': '[Cookies & Privacy]',
  'cookie.message': '[Cookie consent message]',
  'cookie.essential': '[Essential]',
  'cookie.essentialDesc': '[Essential description]',
  'cookie.analytics': '[Analytics]',
  'cookie.analyticsDesc': '[Analytics description]',
  'cookie.accept': '[Accept all]',
  'cookie.decline': '[Essential only]',
  'cookie.customize': '[Customize]',
  'cookie.save': '[Save preferences]',
  'cookie.privacy': '[Privacy Policy]',
  'cookie.alwaysActive': '[Always active]',
  'cookie.manage': '[Manage Cookies]',

  // HowTo Schema
  'howto.name': '[How to use your product]',
  'howto.description': '[HowTo schema description]',
  'howto.step1.name': '[Step 1 name]',
  'howto.step1.text': '[Step 1 text]',
  'howto.step2.name': '[Step 2 name]',
  'howto.step2.text': '[Step 2 text]',
  'howto.step3.name': '[Step 3 name]',
  'howto.step3.text': '[Step 3 text]',

  // Support Modal
  'support.title': '[Contact Support]',
  'support.description': '[Support description]',
  'support.name': '[Your Name]',
  'support.namePlaceholder': '[John Doe]',
  'support.email': '[Your Email]',
  'support.emailPlaceholder': '[john@example.com]',
  'support.message': '[Message]',
  'support.messagePlaceholder': '[Describe your issue...]',
  'support.send': '[Send Message]',
  'support.sent': '[Message sent]',
  'support.toast.title': '[Message Prepared]',
  'support.toast.description': '[Your email client should open.]',
};
