// ============================================================
// Structured Data Templates — JSON-LD Patterns
// ============================================================
// Copy these into your project's src/components/StructuredData/
// Each component injects a <script type="application/ld+json">
// via react-helmet-async.
//
// All text content uses t() for localization.
// ============================================================

// ─── BreadcrumbList.tsx ─────────────────────────────────────
// Pattern: Dynamic breadcrumbs from URL path
// Dependencies: react-helmet-async, LanguageContext, react-router-dom
/*
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '@/lib/seo/config';

export const BreadcrumbList = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}${language !== 'en' ? `/${language}` : ''}`,
      },
      // Add dynamic breadcrumbs from location.pathname
    ],
  };

  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};
*/

// ─── FAQPage.tsx ────────────────────────────────────────────
// Pattern: FAQ from i18n keys (q1-q7 + a1-a7)
/*
export const FAQPage = () => {
  const { t } = useLanguage();
  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map(key => ({
      '@type': 'Question',
      name: t(`landing.faq.${key}`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`landing.faq.${key.replace('q', 'a')}`),
      },
    })),
  };

  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};
*/

// ─── WebSite.tsx ────────────────────────────────────────────
// Pattern: Site-level schema + SearchAction for sitelinks
/*
const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '[Your App]',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};
*/

// ─── WebApplication.tsx ─────────────────────────────────────
// Pattern: App info with offers, features, download URL
/*
const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '[Your App]',
  description: seoConfig.description,
  url: BASE_URL,
  applicationCategory: 'DeveloperApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [t('feature1'), t('feature2'), ...],
  operatingSystem: 'Windows 10, Windows 11',
};
*/

// ─── HowTo.tsx ──────────────────────────────────────────────
// Pattern: Step-by-step from i18n keys
/*
const schema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: t('howto.name'),
  description: t('howto.description'),
  step: [
    { '@type': 'HowToStep', name: t('howto.step1.name'), text: t('howto.step1.text') },
    { '@type': 'HowToStep', name: t('howto.step2.name'), text: t('howto.step2.text') },
    { '@type': 'HowToStep', name: t('howto.step3.name'), text: t('howto.step3.text') },
  ],
};
*/

// ─── Product.tsx ────────────────────────────────────────────
// Pattern: Pricing plans as Product offers
/*
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: '[Your App]',
  offers: [
    { '@type': 'Offer', name: t('pricing.standard.name'), price: '14.99', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: t('pricing.proMonthly.name'), price: '6.99', priceCurrency: 'EUR' },
  ],
};
*/

export {};
