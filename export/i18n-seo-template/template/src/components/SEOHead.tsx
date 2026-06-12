// ============================================================
// SEO Head Component — TEMPLATE
// ============================================================
// Dynamic meta tags via react-helmet-async
// Features:
//   - Per-language title, description, keywords
//   - Canonical URL with language prefix
//   - Hreflang tags for all 36 languages + x-default
//   - Open Graph + Twitter Cards
//   - RTL support (dir attribute)
// ============================================================

import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSEOConfig, getCanonicalUrl, getOGLocale, getAllHreflangEntries, BASE_URL } from '@/lib/seo/config';
import { isRTL } from '@/lib/i18n/config';

interface SEOHeadProps {
  pageType?: 'home' | 'privacy' | 'terms';
  title?: string;
  description?: string;
  noIndex?: boolean;
}

export const SEOHead = ({
  pageType = 'home',
  title: customTitle,
  description: customDescription,
  noIndex = false,
}: SEOHeadProps) => {
  const { language } = useLanguage();
  const seoConfig = getSEOConfig(language);

  const title = customTitle || seoConfig.title;
  const description = customDescription || seoConfig.description;
  const canonicalUrl = getCanonicalUrl(language);
  const ogLocale = getOGLocale(language);
  const hreflangEntries = getAllHreflangEntries();
  const imageUrl = `${BASE_URL}/og-image.png`;

  return (
    <Helmet>
      {/* Language & Direction */}
      <html lang={language} dir={isRTL(language) ? 'rtl' : 'ltr'} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoConfig.keywords.join(', ')} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/`} />
      {hreflangEntries.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="[Your App Name]" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* PWA */}
      <meta name="theme-color" content="#00E5FF" />
    </Helmet>
  );
};

export default SEOHead;
