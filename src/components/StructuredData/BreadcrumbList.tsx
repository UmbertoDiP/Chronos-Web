import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '@/lib/seo/config';
import React from 'react';

const BreadcrumbListComponent = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const buildBreadcrumbs = () => {
    const items: { position: number; name: string; url: string }[] = [
      {
        position: 1,
        name: 'Home',
        url: `${BASE_URL}${language !== 'en' ? `/${language}` : ''}`,
      },
    ];

    const pathParts = location.pathname.split('/').filter(Boolean);
    const pagePart =
      pathParts.length > 0 && pathParts[0] !== language
        ? pathParts[0]
        : pathParts.length > 1
          ? pathParts[1]
          : null;

    if (pagePart) {
      const pageNames: Record<string, string> = {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      };

      items.push({
        position: 2,
        name: pageNames[pagePart] || pagePart,
        url: `${BASE_URL}${language !== 'en' ? `/${language}` : ''}/${pagePart}`,
      });
    }

    return items;
  };

  const breadcrumbs = buildBreadcrumbs();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const BreadcrumbList = React.memo(BreadcrumbListComponent);
BreadcrumbList.displayName = 'BreadcrumbList';

export default BreadcrumbList;
