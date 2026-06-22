import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '@/lib/seo/config';

export const WebSite = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Chronos',
    url: BASE_URL,
    description:
      'AI Auto-Pilot and Autoclicker for Windows, designed for AI tools like Cursor, Claude and Windsurf',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: ['https://github.com/nicosapp/Chronos-public'],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default WebSite;
