import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Store, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEOHead';
import { BreadcrumbList, WebSite } from '@/components/StructuredData';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { BackToTopButton } from '@/components/BackToTopButton';
import { USE_CASES, USE_CASE_SLUGS, type UseCaseSlug } from '@/data/useCases';
import { BASE_URL } from '@/lib/seo/config';

const STORE_URL = 'https://apps.microsoft.com/detail/9n1c2dhqxbpq';

export default function UseCasePage() {
  const { slug, lang } = useParams<{ slug: string; lang?: string }>();
  const { t, language, getLocalizedPath } = useLanguage();

  if (!slug || !USE_CASE_SLUGS.includes(slug as UseCaseSlug)) {
    return <Navigate to={getLocalizedPath('/')} replace />;
  }

  const useCase = USE_CASES[slug as UseCaseSlug];
  const langPrefix = language === 'en' ? '' : `/${language}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/use-cases/${useCase.slug}`;

  // FAQ JSON-LD (English body, as per design)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: useCase.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  // HowTo JSON-LD
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: useCase.heading,
    description: useCase.intro,
    step: useCase.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  // Breadcrumb JSON-LD with Use Cases level
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}${langPrefix}/` },
      { '@type': 'ListItem', position: 2, name: 'Use Cases', item: `${BASE_URL}${langPrefix}/use-cases/${useCase.slug}` },
      { '@type': 'ListItem', position: 3, name: useCase.heading, item: canonicalUrl },
    ],
  };

  return (
    <>
      <SEOHead
        title={useCase.metaTitle}
        description={useCase.metaDescription}
      />
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <WebSite />

      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
        <ParticlesBackground />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb visible */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={getLocalizedPath('/')} className="hover:text-primary transition-colors">
              {t('useCases.backHome')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{useCase.heading}</span>
          </nav>

          {/* Hero */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
              {t('useCases.sectionTitle')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
              {t(useCase.titleKey)}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
              {t(useCase.subtitleKey)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                  <Store className="w-5 h-5" />
                  {t(useCase.ctaKey)}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={getLocalizedPath('/')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('useCases.backHome')}
                </Link>
              </Button>
            </div>
          </motion.header>

          {/* Intro */}
          <section className="mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto text-center">
              {useCase.intro}
            </p>
          </section>

          {/* Features */}
          <section className="mb-16" aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-center mb-10 text-balance">
              {useCase.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {useCase.features.map((f, i) => (
                <Card key={i} className="p-6 border-primary/10 bg-card/50 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{f.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* HowTo */}
          <section className="mb-16" aria-labelledby="howto-heading">
            <h2 id="howto-heading" className="text-3xl sm:text-4xl font-bold text-center mb-10 text-balance">
              {t('useCases.howTo')}
            </h2>
            <ol className="space-y-4 max-w-3xl mx-auto">
              {useCase.steps.map((step, i) => (
                <li key={i} className="flex gap-4 p-5 rounded-lg bg-card/50 border border-primary/10">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">{step.name}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-16" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-center mb-10 text-balance">
              {t('useCases.faq')}
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {useCase.faq.map((item, i) => (
                <details key={i} className="group p-5 rounded-lg border border-primary/10 bg-card/50">
                  <summary className="cursor-pointer font-semibold flex items-center justify-between">
                    {item.question}
                    <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground text-pretty">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Cross-links to other use cases */}
          <section className="mb-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl sm:text-3xl font-bold text-center mb-8 text-balance">
              {t('useCases.sectionTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {USE_CASE_SLUGS.filter((s) => s !== useCase.slug).map((s) => {
                const uc = USE_CASES[s];
                return (
                  <Link
                    key={s}
                    to={getLocalizedPath(`/use-cases/${s}`)}
                    className="block p-5 rounded-lg border border-primary/10 bg-card/50 hover:border-primary/40 hover:bg-card transition-all group"
                  >
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{t(uc.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground text-pretty mb-3">{t(uc.subtitleKey)}</p>
                    <span className="text-sm text-primary inline-flex items-center gap-1">
                      {t('useCases.learnMore')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center py-12 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-balance">{t(useCase.titleKey)}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">{useCase.intro}</p>
            <Button asChild size="lg" className="gap-2">
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                <Store className="w-5 h-5" />
                {t(useCase.ctaKey)}
              </a>
            </Button>
          </section>
        </div>

        <BackToTopButton />
      </div>
    </>
  );
}
