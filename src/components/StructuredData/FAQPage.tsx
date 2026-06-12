import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

export const FAQPage = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useLanguage();

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

  const faqs = faqKeys.map((key) => ({
    question: t(`landing.faq.${key}` as any),
    answer: t(`landing.faq.${key.replace('q', 'a')}` as any),
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
});

FAQPage.displayName = 'FAQPage';

export default FAQPage;
