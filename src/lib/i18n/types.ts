// Translation key types for type-safe translations

export type TranslationKey = keyof TranslationKeys;

export type TranslationKeys = {
  // Navigation
  'nav.home': string;
  'nav.features': string;
  'nav.pricing': string;
  'nav.changelog': string;
  'nav.download': string;
  'nav.settings': string;
  
  // Hero
  'hero.badge': string;
  'hero.title': string;
  'hero.titleHighlight': string;
  'hero.subtitle': string;
  'hero.cta': string;
  'hero.ctaSecondary': string;
  
  // Features
  'features.title': string;
  'features.oneClick.title': string;
  'features.oneClick.desc': string;
  'features.patterns.title': string;
  'features.patterns.desc': string;
  'features.optimized.title': string;
  'features.optimized.desc': string;
  'features.local.title': string;
  'features.local.desc': string;
  
  // Pricing
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
  
  // Features list
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
  
  // FAQ
  'faq.title': string;
  'faq.trial.q': string;
  'faq.trial.a': string;
  'faq.refund.q': string;
  'faq.refund.a': string;
  'faq.privacy.q': string;
  'faq.privacy.a': string;
  'faq.updates.q': string;
  'faq.updates.a': string;
  
  // Changelog
  'changelog.title': string;
  'changelog.subtitle': string;
  
  // Referral
  'referral.title': string;
  'referral.desc': string;
  'referral.howItWorks': string;
  'referral.step1': string;
  'referral.step2': string;
  'referral.step3': string;
  
  // Footer
  'footer.copyright': string;
  'footer.privacy': string;
  'footer.terms': string;
  
  // Actions
  'action.copy': string;
  'action.download': string;
  'action.learnMore': string;
  
  // Messages
  'msg.copied': string;
  'msg.downloading': string;
  'msg.error': string;
  'msg.loading': string;
  
  // Pricing Modal specific
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

  // Landing page - Header
  'landing.getFromStore': string;
  'landing.downloadFromStore': string;

  // Landing page - Hero
  'landing.storeBadge': string;
  'landing.heroSubtitle1': string;
  'landing.heroSubtitle2': string;
  'landing.viewPricing': string;

  // Landing page - Terminal
  'landing.terminal.scanning': string;
  'landing.terminal.processing': string;
  'landing.terminal.generating': string;
  'landing.terminal.done': string;
  'landing.terminal.ready': string;

  // Landing page - Stats
  'landing.stats.forDevs': string;
  'landing.stats.avgTime': string;
  'landing.stats.localPrivate': string;
  'landing.stats.lifetimeLicense': string;

  // Landing page - How It Works
  'landing.howItWorks.title': string;
  'landing.howItWorks.subtitle': string;
  'landing.howItWorks.step1.title': string;
  'landing.howItWorks.step1.desc': string;
  'landing.howItWorks.step2.title': string;
  'landing.howItWorks.step2.desc': string;
  'landing.howItWorks.step3.title': string;
  'landing.howItWorks.step3.desc': string;

  // Landing page - Features Grid
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

  // Landing page - Pricing
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

  // Landing page - Pro Features
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

  // Landing page - FAQ
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

  // Landing page - CTA
  'landing.cta.title': string;
  'landing.cta.subtitle': string;
  'landing.cta.viewChangelog': string;

  // Landing page - Footer
  'landing.footer.termsOfService': string;
  'landing.footer.allRights': string;
  'landing.footer.privacyPolicy': string;
  'landing.footer.support': string;

  // Navbar extras
  'nav.subtitle': string;
  'nav.faq': string;
  'nav.store': string;

  // Testimonials
  'testimonials.title': string;
  'testimonials.subtitle': string;
  'testimonials.1.content': string;
  'testimonials.2.content': string;
  'testimonials.3.content': string;
  'testimonials.4.content': string;

  // Comparison Table
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

  // Cookie Consent
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

  // HowTo Schema
  'howto.name': string;
  'howto.description': string;
  'howto.step1.name': string;
  'howto.step1.text': string;
  'howto.step2.name': string;
  'howto.step2.text': string;
  'howto.step3.name': string;
  'howto.step3.text': string;

  // Support Modal
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

  // File Forge - Header
  'forge.title': string;
  'forge.badge': string;
  'forge.info': string;
  'forge.restartTour': string;
  'forge.darkMode': string;
  'forge.lightMode': string;
  'forge.close': string;

  // File Forge - Footer
  'forge.footer.import': string;
  'forge.footer.reset': string;
  'forge.footer.download': string;
  'forge.footer.downloadToast.title': string;
  'forge.footer.downloadToast.desc': string;
  'forge.footer.importToast.title': string;
  'forge.footer.importToast.desc': string;
  'forge.footer.importError.title': string;
  'forge.footer.importError.desc': string;
  'forge.footer.resetToast.title': string;
  'forge.footer.resetToast.desc': string;

  // File Forge - Stats Bar
  'forge.stats.extensions': string;
  'forge.stats.excludedDirs': string;
  'forge.stats.maxSize': string;
  'forge.stats.textThreshold': string;
  'forge.stats.clickToGo': string;
  'forge.stats.profiles': string;
  'forge.stats.savedConfigs': string;
  'forge.stats.noProfiles': string;
  'forge.stats.saveProfile': string;
  'forge.stats.saveProfileTitle': string;
  'forge.stats.saveProfileDesc': string;
  'forge.stats.profileName': string;
  'forge.stats.cancel': string;
  'forge.stats.save': string;
  'forge.stats.profileSaved': string;
  'forge.stats.profileLoaded': string;
  'forge.stats.profileDeleted': string;
  'forge.stats.enterName': string;

  // File Forge - Extensions Card
  'forge.ext.title': string;
  'forge.ext.desc': string;
  'forge.ext.search': string;
  'forge.ext.selectAll': string;
  'forge.ext.selectNone': string;
  'forge.ext.custom': string;
  'forge.ext.addPlaceholder': string;
  'forge.ext.add': string;
  'forge.ext.catText': string;
  'forge.ext.catMarkup': string;
  'forge.ext.catCode': string;
  'forge.ext.catScripts': string;
  'forge.ext.catConfig': string;

  // File Forge - Excluded Dirs Card
  'forge.dirs.title': string;
  'forge.dirs.desc': string;
  'forge.dirs.placeholder': string;
  'forge.dirs.add': string;

  // File Forge - Settings Cards
  'forge.fileSize.title': string;
  'forge.fileSize.desc': string;
  'forge.textThreshold.title': string;
  'forge.textThreshold.desc': string;
  'forge.textThreshold.tooltip': string;
  'forge.outputName.title': string;
  'forge.outputName.desc': string;
  'forge.outputName.auto': string;
  'forge.outputName.autoDesc': string;
  'forge.outputName.custom': string;
  'forge.outputName.customDesc': string;
  'forge.outputName.customPlaceholder': string;
  'forge.outputName.prompt': string;
  'forge.outputName.promptDesc': string;

  // File Forge - Presets Card
  'forge.presets.title': string;
  'forge.presets.desc': string;
  'forge.presets.savePreset': string;
  'forge.presets.saveTitle': string;
  'forge.presets.saveDesc': string;
  'forge.presets.namePlaceholder': string;
  'forge.presets.currentExts': string;
  'forge.presets.cancel': string;
  'forge.presets.save': string;
  'forge.presets.yourPresets': string;
  'forge.presets.extensions': string;
  'forge.presets.applied': string;
  'forge.presets.saved': string;
  'forge.presets.deleted': string;
  'forge.presets.enterName': string;
  'forge.presets.maxChars': string;
  'forge.presets.full': string;
  'forge.presets.fullDesc': string;
  'forge.presets.code': string;
  'forge.presets.codeDesc': string;
  'forge.presets.docs': string;
  'forge.presets.docsDesc': string;
  'forge.presets.web': string;
  'forge.presets.webDesc': string;

  // File Forge - Split File Card
  'forge.split.title': string;
  'forge.split.hint': string;
  'forge.split.enable': string;
  'forge.split.enableDesc': string;
  'forge.split.mode': string;
  'forge.split.bySize': string;
  'forge.split.byFiles': string;
  'forge.split.maxSize': string;
  'forge.split.maxSizeDesc': string;
  'forge.split.maxFiles': string;
  'forge.split.maxFilesDesc': string;

  // File Forge - File Preview Card
  'forge.preview.title': string;
  'forge.preview.desc': string;
  'forge.preview.included': string;
  'forge.preview.excluded': string;
  'forge.preview.noFiles': string;
  'forge.preview.excludedDir': string;
  'forge.preview.noExt': string;
  'forge.preview.allowedExt': string;
  'forge.preview.notIncluded': string;

  // File Forge - Template Gallery
  'forge.templates.title': string;
  'forge.templates.desc': string;
  'forge.templates.apply': string;
  'forge.templates.cancel': string;
  'forge.templates.extsIncluded': string;
  'forge.templates.dirsExcluded': string;
  'forge.templates.applied': string;
  'forge.templates.allInclusive': string;
  'forge.templates.allInclusiveDesc': string;
  'forge.templates.webFrontend': string;
  'forge.templates.webFrontendDesc': string;
  'forge.templates.pythonDS': string;
  'forge.templates.pythonDSDesc': string;
  'forge.templates.backendAPI': string;
  'forge.templates.backendAPIDesc': string;
  'forge.templates.mobileDev': string;
  'forge.templates.mobileDevDesc': string;
  'forge.templates.fullStack': string;
  'forge.templates.fullStackDesc': string;
  'forge.templates.docsOnly': string;
  'forge.templates.docsOnlyDesc': string;
  'forge.templates.devops': string;
  'forge.templates.devopsDesc': string;

  // File Forge - Onboarding Tour
  'forge.tour.welcome': string;
  'forge.tour.welcomeDesc': string;
  'forge.tour.templates': string;
  'forge.tour.templatesDesc': string;
  'forge.tour.presets': string;
  'forge.tour.presetsDesc': string;
  'forge.tour.profiles': string;
  'forge.tour.profilesDesc': string;
  'forge.tour.split': string;
  'forge.tour.splitDesc': string;
  'forge.tour.actions': string;
  'forge.tour.actionsDesc': string;
  'forge.tour.skip': string;
  'forge.tour.back': string;
  'forge.tour.next': string;
  'forge.tour.start': string;

  // File Forge - Drag & Drop
  'forge.drag.title': string;
  'forge.drag.desc': string;
  'forge.drag.invalidFile': string;
  'forge.drag.invalidFileDesc': string;
  'forge.drag.imported': string;
  'forge.drag.importError': string;
  'forge.drag.importErrorDesc': string;

  // File Forge - Keyboard Shortcuts
  'forge.shortcuts.title': string;
  'forge.shortcuts.export': string;
  'forge.shortcuts.reset': string;

  // File Forge - About Tab
  'forge.about.subtitle': string;
  'forge.about.version': string;
  'forge.about.copyright': string;
  'forge.about.support': string;
  'forge.about.docs': string;
  'forge.about.bugReport': string;
  'forge.about.legal': string;
  'forge.about.privacy': string;
  'forge.about.terms': string;
  'forge.about.cookies': string;
  'forge.about.licenses': string;

  // About - Bug Report Form
  'forge.about.bug.fillRequired': string;
  'forge.about.bug.sent': string;
  'forge.about.bug.sentDesc': string;
  'forge.about.bug.helpImprove': string;
  'forge.about.bug.emailLabel': string;
  'forge.about.bug.emailPlaceholder': string;
  'forge.about.bug.subjectLabel': string;
  'forge.about.bug.subjectPlaceholder': string;
  'forge.about.bug.descLabel': string;
  'forge.about.bug.descPlaceholder': string;
  'forge.about.bug.cancel': string;
  'forge.about.bug.submit': string;

  // About - Docs Modal
  'forge.about.docs.guideTitle': string;
  'forge.about.docs.introTitle': string;
  'forge.about.docs.introText': string;
  'forge.about.docs.extTitle': string;
  'forge.about.docs.extText': string;
  'forge.about.docs.dirsTitle': string;
  'forge.about.docs.dirsText': string;
  'forge.about.docs.advTitle': string;
  'forge.about.docs.advText': string;
  'forge.about.docs.profilesTitle': string;
  'forge.about.docs.profilesText': string;
  'forge.about.docs.exportTitle': string;
  'forge.about.docs.exportText': string;

  // About - Privacy Modal
  'forge.about.privacy.lastUpdate': string;
  'forge.about.privacy.s1title': string;
  'forge.about.privacy.s1text': string;
  'forge.about.privacy.s2title': string;
  'forge.about.privacy.s2text': string;
  'forge.about.privacy.s2li1': string;
  'forge.about.privacy.s2li2': string;
  'forge.about.privacy.s2li3': string;
  'forge.about.privacy.s3title': string;
  'forge.about.privacy.s3text': string;
  'forge.about.privacy.s4title': string;
  'forge.about.privacy.s4text': string;
  'forge.about.privacy.s5title': string;
  'forge.about.privacy.s5text': string;
  'forge.about.privacy.s6title': string;
  'forge.about.privacy.s6text': string;
  'forge.about.privacy.s7title': string;
  'forge.about.privacy.s7text': string;

  // About - Terms Modal
  'forge.about.terms.lastUpdate': string;
  'forge.about.terms.s1title': string;
  'forge.about.terms.s1text': string;
  'forge.about.terms.s2title': string;
  'forge.about.terms.s2text': string;
  'forge.about.terms.s3title': string;
  'forge.about.terms.s3text': string;
  'forge.about.terms.s3li1': string;
  'forge.about.terms.s3li2': string;
  'forge.about.terms.s3li3': string;
  'forge.about.terms.s3li4': string;
  'forge.about.terms.s3li5': string;
  'forge.about.terms.s4title': string;
  'forge.about.terms.s4text': string;
  'forge.about.terms.s5title': string;
  'forge.about.terms.s5text': string;
  'forge.about.terms.s6title': string;
  'forge.about.terms.s6text': string;
  'forge.about.terms.s7title': string;
  'forge.about.terms.s7text': string;
  'forge.about.terms.s8title': string;
  'forge.about.terms.s8text': string;

  // About - Cookie Modal
  'forge.about.cookie.lastUpdate': string;
  'forge.about.cookie.s1title': string;
  'forge.about.cookie.s1text': string;
  'forge.about.cookie.s2title': string;
  'forge.about.cookie.s2text': string;
  'forge.about.cookie.s2li1': string;
  'forge.about.cookie.s2li2': string;
  'forge.about.cookie.s2li3': string;
  'forge.about.cookie.s2li4': string;
  'forge.about.cookie.s3title': string;
  'forge.about.cookie.s3text': string;
  'forge.about.cookie.s4title': string;
  'forge.about.cookie.s4text': string;
  'forge.about.cookie.s4li1': string;
  'forge.about.cookie.s4li2': string;
  'forge.about.cookie.s4li3': string;
  'forge.about.cookie.s5title': string;
  'forge.about.cookie.s5text': string;

  // About - Licenses Modal
  'forge.about.licenses.desc': string;
  'forge.about.licenses.intro': string;
  'forge.about.licenses.reactDesc': string;
  'forge.about.licenses.tailwindDesc': string;
  'forge.about.licenses.radixDesc': string;
  'forge.about.licenses.lucideDesc': string;
  'forge.about.licenses.shadcnDesc': string;
  'forge.about.licenses.sonnerDesc': string;
  'forge.about.licenses.routerDesc': string;
  'forge.about.licenses.viteDesc': string;
  'forge.about.licenses.disclaimer': string;

  // Use Cases (landing pages)
  'useCases.sectionTitle': string;
  'useCases.sectionSubtitle': string;
  'useCases.learnMore': string;
  'useCases.backHome': string;
  'useCases.howTo': string;
  'useCases.faq': string;
  'useCases.fileMerge.title': string;
  'useCases.fileMerge.subtitle': string;
  'useCases.fileMerge.cta': string;
  'useCases.logAnalysis.title': string;
  'useCases.logAnalysis.subtitle': string;
  'useCases.logAnalysis.cta': string;
  'useCases.dataProcessing.title': string;
  'useCases.dataProcessing.subtitle': string;
  'useCases.dataProcessing.cta': string;
};
