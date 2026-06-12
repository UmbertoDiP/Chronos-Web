import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

export const HowTo = () => {
  const { t } = useLanguage();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('howto.name'),
    description: t('howto.description'),
    step: [
      {
        '@type': 'HowToStep',
        name: t('howto.step1.name'),
        text: t('howto.step1.text'),
      },
      {
        '@type': 'HowToStep',
        name: t('howto.step2.name'),
        text: t('howto.step2.text'),
      },
      {
        '@type': 'HowToStep',
        name: t('howto.step3.name'),
        text: t('howto.step3.text'),
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default HowTo;
