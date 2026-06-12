import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { SEOHead } from '@/components/SEOHead';
import { BreadcrumbList, FAQPage, WebSite, WebApplication, HowTo } from '@/components/StructuredData';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Changelog } from '@/components/Changelog';
import { CookieSettingsButton } from '@/components/CookieConsent';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { FAQSection } from '@/components/FAQSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ComparisonTable } from '@/components/ComparisonTable';
import { SupportModal } from '@/components/SupportModal';


import { BackToTopButton } from '@/components/BackToTopButton';
import { ProWaitlistModal } from '@/components/ProWaitlistModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FolderOpen, Moon, Sun, Zap, Download, 
  Shield, ArrowRight, CheckCircle2, Clock, Crown,
  Terminal, FileCode, Layers, Settings,
  Lock, Rocket, SplitSquareVertical, Database,
  Store, ChevronDown, ChevronUp, Menu, X, Bell, Cpu, MousePointer, RefreshCw
} from 'lucide-react';

const Index = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t, language } = useLanguage();
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistPlanType, setWaitlistPlanType] = useState<"monthly" | "annual">("monthly");

  // Microsoft Store placeholder URL
  const STORE_URL = 'https://apps.microsoft.com/store/detail/chronos/PLACEHOLDER';

  const features = [
    { icon: Terminal, title: t('landing.features.export.title'), description: t('landing.features.export.desc') },
    { icon: FileCode, title: t('landing.features.filtering.title'), description: t('landing.features.filtering.desc') },
    { icon: Layers, title: t('landing.features.output.title'), description: t('landing.features.output.desc') },
    { icon: Zap, title: t('landing.features.speed.title'), description: t('landing.features.speed.desc') },
    { icon: Shield, title: t('landing.features.privacy.title'), description: t('landing.features.privacy.desc') },
    { icon: Clock, title: t('landing.features.saveTime.title'), description: t('landing.features.saveTime.desc') },
  ];

  const proFeatures = [
    { icon: Layers, title: t('landing.proFeatures.ext.title'), description: t('landing.proFeatures.ext.desc') },
    { icon: SplitSquareVertical, title: t('landing.proFeatures.split.title'), description: t('landing.proFeatures.split.desc') },
    { icon: Settings, title: t('landing.proFeatures.presets.title'), description: t('landing.proFeatures.presets.desc') },
    { icon: FileCode, title: t('landing.proFeatures.templates.title'), description: t('landing.proFeatures.templates.desc') },
  ];

  const stats = [
    { value: '👨‍💻', label: t('landing.stats.forDevs') },
    { value: '<1s', label: t('landing.stats.avgTime') },
    { value: '100%', label: t('landing.stats.localPrivate') },
    { value: '€14,99', label: t('landing.stats.lifetimeLicense') },
  ];

  const standardFeatures = [
    t('landing.pricing.standard.f1'),
    t('landing.pricing.standard.f2'),
    t('landing.pricing.standard.f3'),
    t('landing.pricing.standard.f4'),
    t('landing.pricing.standard.f5'),
    t('landing.pricing.standard.f6'),
  ];

  const proOnlyFeatures = [
    t('landing.pricing.pro.f1'),
    t('landing.pricing.pro.f2'),
    t('landing.pricing.pro.f3'),
    t('landing.pricing.pro.f4'),
    t('landing.pricing.pro.f5'),
    t('landing.pricing.pro.f6'),
  ];

  const faqs = [
    { question: t('landing.faq.q1'), answer: t('landing.faq.a1') },
    { question: t('landing.faq.q2'), answer: t('landing.faq.a2') },
    { question: t('landing.faq.q3'), answer: t('landing.faq.a3') },
    { question: t('landing.faq.q4'), answer: t('landing.faq.a4') },
    { question: t('landing.faq.q5'), answer: t('landing.faq.a5') },
    { question: t('landing.faq.q6'), answer: t('landing.faq.a6') },
    { question: t('landing.faq.q7'), answer: t('landing.faq.a7') },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead />
      <BreadcrumbList />
      <FAQPage />
      <WebSite />
      <WebApplication />
      <HowTo />
      <ScrollProgressBar />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/chronos-icon.png" alt="Chronos logo" width="36" height="36" className="w-8 h-8 sm:w-9 sm:h-9" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-gradient leading-tight">Chronos</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{t('nav.subtitle')}</span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.features')}
            </button>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.pricing')}
            </button>
            <button 
              onClick={() => setChangelogOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.changelog')}
            </button>
            <button 
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.faq')}
            </button>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector compact showSearch />
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="shrink-0" aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button size="sm" className="gap-1.5 whitespace-nowrap">
                <Store className="w-4 h-4" />
                <span className="hidden md:inline">{t('landing.getFromStore')}</span>
                <span className="md:hidden">{t('nav.store')}</span>
              </Button>
            </a>
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

      </header>

      {/* Mobile Menu - Rendered via Portal at higher z-index with smooth animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                mass: 0.8
              }}
              className="fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-lg lg:hidden"
            >
              <div className="container mx-auto px-4 py-6 pt-20">
                <nav className="flex flex-col gap-3">
                  <motion.button 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                    className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('nav.features')}
                  </motion.button>
                  <motion.button 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                    className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('nav.pricing')}
                  </motion.button>
                  <motion.button 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => { setChangelogOpen(true); setMobileMenuOpen(false); }}
                    className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('nav.changelog')}
                  </motion.button>
                  <motion.button 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    onClick={() => { document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                    className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('nav.faq')}
                  </motion.button>
                  <motion.a 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    href={STORE_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sm:hidden pt-2"
                  >
                    <Button className="w-full gap-2">
                      <Store className="w-4 h-4" />
                      {t('landing.downloadFromStore')}
                    </Button>
                  </motion.a>
                </nav>
                {/* Close button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-md hover:bg-accent transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main id="main-content">
        <article>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <ParticlesBackground />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 sm:mb-6 gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm">
              <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t('landing.storeBadge')}
            </Badge>
            
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              {t('hero.title')}
              <br />
              <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              <span className="inline">
                {t('landing.heroSubtitle1')}
              </span>
              {' '}
              <span className="inline-block">
                {t('landing.heroSubtitle2')}
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="gap-2 text-base sm:text-lg px-6 sm:px-8 w-full">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="truncate">{t('landing.downloadFromStore')}</span>
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                {t('landing.viewPricing')}
              </Button>
            </div>

            {/* Terminal Preview */}
            <div className="mt-8 sm:mt-12 max-w-2xl mx-auto px-2 sm:px-0">
              <div className="terminal rounded-lg overflow-hidden shadow-2xl neon-glow">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[hsl(252,35%,10%)] border-b border-primary/20">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-success/80" />
                  <span className="ml-2 text-[10px] sm:text-xs text-primary/70 font-mono">chronos</span>
                </div>
                <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm text-left overflow-x-auto">
                  <p className="text-primary whitespace-nowrap">$ chronos ./my-project</p>
                  <p className="text-muted-foreground mt-2 whitespace-nowrap">{t('landing.terminal.scanning')}</p>
                  <p className="text-muted-foreground whitespace-nowrap">{t('landing.terminal.processing')}</p>
                  <p className="text-muted-foreground whitespace-nowrap">{t('landing.terminal.generating')}</p>
                  <p className="text-primary mt-2 whitespace-nowrap">{t('landing.terminal.done')}</p>
                  <p className="text-accent/80 text-[10px] sm:text-xs mt-2">{t('landing.terminal.ready')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ScrollReveal>
        <section className="py-8 sm:py-12 border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                {t('landing.howItWorks.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                {t('landing.howItWorks.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <ScrollReveal delay={0}>
              <div className="relative text-center group">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                  <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center text-xs sm:text-sm">
                    1
                  </span>
                </div>
                <h3 className="font-semibold text-lg sm:text-xl mb-2">
                  {t('landing.howItWorks.step1.title')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('landing.howItWorks.step1.desc')}
                </p>
                {/* Connector arrow - hidden on mobile */}
                <div className="hidden md:block absolute top-10 -right-4 w-8 text-primary/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </ScrollReveal>
            
            {/* Step 2 */}
            <ScrollReveal delay={0.15}>
              <div className="relative text-center group">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                  <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center text-xs sm:text-sm">
                    2
                  </span>
                </div>
                <h3 className="font-semibold text-lg sm:text-xl mb-2">
                  {t('landing.howItWorks.step2.title')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('landing.howItWorks.step2.desc')}
                </p>
                {/* Connector arrow - hidden on mobile */}
                <div className="hidden md:block absolute top-10 -right-4 w-8 text-primary/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </ScrollReveal>
            
            {/* Step 3 */}
            <ScrollReveal delay={0.3}>
              <div className="relative text-center group">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                  <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center text-xs sm:text-sm">
                    3
                  </span>
                </div>
                <h3 className="font-semibold text-lg sm:text-xl mb-2">
                  {t('landing.howItWorks.step3.title')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('landing.howItWorks.step3.desc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                {t('landing.features.sectionTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                {t('landing.features.sectionSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <article>
                  <Card className="p-4 sm:p-6 hover:neon-glow transition-all duration-300 border-primary/10 hover:border-primary/30 h-full flex flex-col">
                    <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 shrink-0" />
                    <h3 className="font-semibold text-base sm:text-lg mb-2" style={{ textWrap: 'balance', hyphens: 'none', WebkitHyphens: 'none', wordBreak: 'normal' } as React.CSSProperties}>{feature.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm flex-1" style={{ textWrap: 'pretty', hyphens: 'none', WebkitHyphens: 'none', wordBreak: 'normal', overflowWrap: 'break-word' } as React.CSSProperties}>{feature.description}</p>
                  </Card>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section — links to /use-cases/<slug> landing pages */}
      <section id="use-cases" className="py-12 sm:py-16 lg:py-20" aria-labelledby="use-cases-heading">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="use-cases-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
                {t('useCases.sectionTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                {t('useCases.sectionSubtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {(['file-merge', 'log-analysis', 'data-processing'] as const).map((slug) => {
                const titleKey = `useCases.${slug === 'file-merge' ? 'fileMerge' : slug === 'log-analysis' ? 'logAnalysis' : 'dataProcessing'}.title` as const;
                const subKey = `useCases.${slug === 'file-merge' ? 'fileMerge' : slug === 'log-analysis' ? 'logAnalysis' : 'dataProcessing'}.subtitle` as const;
                return (
                  <article key={slug}>
                    <Link
                      to={`${language === 'en' ? '' : `/${language}`}/use-cases/${slug}`}
                      className="group block p-6 rounded-xl border border-primary/10 bg-card/50 hover:border-primary/40 hover:bg-card transition-all"
                    >
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-balance">
                        {t(titleKey as any)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 text-pretty">
                        {t(subKey as any)}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        {t('useCases.learnMore')} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />


      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                {t('pricing.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                {t('pricing.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Standard - One Time */}
            <Card className="p-4 sm:p-6 lg:p-8 pt-6 sm:pt-8 lg:pt-10 relative overflow-hidden flex flex-col">
              <div className="text-center mb-4 sm:mb-6 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center justify-center gap-2">
                  <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground shrink-0" />
                  <span className="truncate">{t('landing.pricing.standardLicense')}</span>
                </h3>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground line-through opacity-60 whitespace-nowrap">€24,99</span>
                  <span className="whitespace-nowrap">€14,99</span>
                  <span className="px-2 py-0.5 rounded bg-destructive text-destructive-foreground text-xs sm:text-sm font-bold">-40%</span>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">
                  {t('landing.pricing.oneTimePayment')}
                </p>
              </div>
              
              <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 flex-1">
                {standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="block mt-auto">
                <Button variant="outline" className="w-full gap-2 text-xs sm:text-sm">
                  <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  {t('landing.pricing.buyStandard')}
                </Button>
              </a>
            </Card>

            {/* Pro Monthly */}
            <Card className="p-4 sm:p-6 lg:p-8 border-primary/50 relative overflow-visible order-first sm:order-none neon-glow flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-accent to-primary text-white text-[10px] sm:text-xs font-bold tracking-wider whitespace-nowrap shadow-lg flex items-center gap-1.5 overflow-hidden">
                <span className="relative z-10">⭐ {t('landing.pricing.recommended')}</span>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
              
              <div className="text-center mb-4 sm:mb-6 pt-4 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                   {t('pricing.proMonthly.name')}
                </h3>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4">€6,99</div>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">
                  {t('landing.pricing.perMonthCancel')}
                </p>
              </div>
              
              <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 flex-1">
                {proOnlyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full gap-2 text-xs sm:text-sm mt-auto"
                onClick={() => {
                  setWaitlistPlanType("monthly");
                  setWaitlistModalOpen(true);
                }}
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                {t('landing.pricing.subscribeMonthly')}
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </Button>
            </Card>

            {/* Pro Annual */}
            <Card className="p-4 sm:p-6 lg:p-8 border-success/50 relative overflow-visible sm:col-span-2 lg:col-span-1 flex flex-col">
              <div className="absolute -top-3 -right-2 z-10 pointer-events-none">
                <div 
                  className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-accent to-primary text-white text-[9px] sm:text-[10px] font-bold tracking-wider shadow-lg rounded-bl-lg rounded-tr-xl border border-white/20"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8px 100%)' }}
                >
                  {t('landing.pricing.bestValue')}
                </div>
              </div>
              
              <div className="text-center mb-4 sm:mb-6 pt-4 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
                   {t('pricing.proAnnual.name')}
                </h3>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4">€3,99</div>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">
                  {t('landing.pricing.perMonthBilledAnnually')}
                </p>
              </div>
              
              <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 flex-1">
                {proOnlyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full gap-2 border-success text-success hover:bg-success hover:text-success-foreground text-xs sm:text-sm mt-auto"
                onClick={() => {
                  setWaitlistPlanType("annual");
                  setWaitlistModalOpen(true);
                }}
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                {t('landing.pricing.subscribeAnnually')}
              </Button>
            </Card>
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8 max-w-2xl mx-auto px-4">
            {t('landing.pricing.disclaimer')}
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* PRO Features Roadmap */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <Badge variant="secondary" className="mb-3 sm:mb-4 gap-1.5 px-3 py-1 text-xs sm:text-sm">
                <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {t('landing.proFeatures.badge')}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                {t('landing.proFeatures.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                {t('landing.proFeatures.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {proFeatures.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <article>
                  <Card className="p-4 sm:p-6 relative overflow-hidden border-dashed border-accent/30 hover:border-accent/50 transition-colors h-full flex flex-col">
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <Badge variant="outline" className="text-[10px] sm:text-xs bg-accent/10 text-accent border-accent/30">
                        <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                        Pro
                      </Badge>
                    </div>
                    <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-3 sm:mb-4 shrink-0" />
                    <h3 className="font-semibold text-base sm:text-lg mb-2 pr-12" style={{ textWrap: 'balance', hyphens: 'none', WebkitHyphens: 'none', wordBreak: 'normal' } as React.CSSProperties}>{feature.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm flex-1" style={{ textWrap: 'pretty', hyphens: 'none', WebkitHyphens: 'none', wordBreak: 'normal', overflowWrap: 'break-word' } as React.CSSProperties}>{feature.description}</p>
                  </Card>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                {t('landing.faq.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                {t('landing.faq.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <aside className="py-12 sm:py-16 lg:py-20 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              {t('landing.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base hyphenate-none">
              {t('landing.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="gap-2 w-full text-sm sm:text-base">
                  <Store className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="truncate">{t('landing.downloadFromStore')}</span>
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto text-sm sm:text-base"
                onClick={() => setChangelogOpen(true)}
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {t('landing.cta.viewChangelog')}
              </Button>
            </div>
          </div>
        </aside>
      </ScrollReveal>

        </article>
      </main>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 sm:gap-6 items-center">
            <div className="flex items-center gap-2">
              <img src="/chronos-icon.png" alt="Chronos logo" width="20" height="20" className="w-5 h-5 shrink-0" />
              <span className="font-semibold">Chronos</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <button
                onClick={() => setChangelogOpen(true)}
                className="hover:text-foreground transition-colors"
              >
                {t('nav.changelog')}
              </button>
              <CookieSettingsButton />
              <button
                onClick={() => setSupportOpen(true)}
                className="hover:text-foreground transition-colors"
              >
                {t('landing.footer.support')}
              </button>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Chronos. {t('landing.footer.allRights')}
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA storeUrl={STORE_URL} />

      {/* Changelog Modal */}
      <Changelog open={changelogOpen} onOpenChange={setChangelogOpen} />

      {/* Support Modal */}
      <SupportModal open={supportOpen} onOpenChange={setSupportOpen} />

      {/* Pro Waitlist Modal */}
      <ProWaitlistModal 
        isOpen={waitlistModalOpen} 
        onClose={() => setWaitlistModalOpen(false)} 
        planType={waitlistPlanType}
      />
    </div>
  );
};

export default Index;
