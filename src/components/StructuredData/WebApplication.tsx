import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { BASE_URL, getSEOConfig } from '@/lib/seo/config';

export const WebApplication = () => {
  const { language, t } = useLanguage();
  const seoConfig = getSEOConfig(language);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Chronos',
    alternateName: ['Chronos AI', 'Chronos Auto-Pilot'],
    description: seoConfig.description,
    url: BASE_URL,
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      t('landing.features.export.title'),
      t('landing.features.filtering.title'),
      t('landing.features.output.title'),
      t('landing.features.speed.title'),
      t('landing.features.privacy.title'),
      t('landing.features.saveTime.title'),
    ],
    keywords: seoConfig.keywords.join(', '),
    screenshot: `${BASE_URL}/og-image.png`,
    operatingSystem: 'Windows 10, Windows 11',
    browserRequirements: 'Web Browser',
    softwareVersion: '2.0',
    downloadUrl: 'https://apps.microsoft.com/detail/9n1c2dhqxbpq',
    installUrl: 'https://apps.microsoft.com/detail/9n1c2dhqxbpq',
    inLanguage: language,
    author: {
      '@type': 'Person',
      name: 'Umberto Di Puorto',
      url: 'https://www.umbertodipuorto.it',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default WebApplication;
