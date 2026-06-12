import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { translations, getTranslation, SUPPORTED_LOCALES } from '../src/lib/i18n/translations.ts';

const INDEX_HTML_PATH = path.resolve(process.cwd(), 'index.html');
let html = readFileSync(INDEX_HTML_PATH, 'utf-8');

function buildRuntimeFAQPage(locale) {
  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  const faqs = faqKeys.map((key) => ({
    question: getTranslation(locale, `landing.faq.${key}`),
    answer: getTranslation(locale, `landing.faq.${key.replace('q', 'a')}`),
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

// We need to replace the JSON inside <script type="application/ld+json" data-faq-lang="X">...
for (const locale of SUPPORTED_LOCALES) {
    const regex = new RegExp(`(<script type="application\\/ld\\+json" data-faq-lang="${locale}"[^>]*>)([\\s\\S]*?)(<\\/script>)`, 'gi');
    html = html.replace(regex, (match, open, jsonContent, close) => {
        try {
            const parsed = JSON.parse(jsonContent);
            const runtime = buildRuntimeFAQPage(locale);
            
            // Replace the FAQPage object inside the array or object
            let found = false;
            const nodes = Array.isArray(parsed) ? parsed : [parsed];
            for (let i = 0; i < nodes.length; i++) {
                const t = nodes[i]['@type'];
                const isFAQ = Array.isArray(t) ? t.includes('FAQPage') : t === 'FAQPage';
                if (isFAQ) {
                    nodes[i].mainEntity = runtime.mainEntity;
                    found = true;
                }
            }
            if (found) {
                return open + JSON.stringify(Array.isArray(parsed) ? nodes : nodes[0]) + close;
            }
            return match;
        } catch (e) {
            console.error(e);
            return match;
        }
    });
}

writeFileSync(INDEX_HTML_PATH, html);
console.log('index.html JSON-LD updated.');
