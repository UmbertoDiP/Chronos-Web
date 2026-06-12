// Cloudflare Pages Function - robots.txt override
// Bypasses Cloudflare Bot Management "Managed Content" injection

export async function onRequest() {
  const robotsTxt = `# Folder2Text - Convert Folders to LLM Context Files
# https://folder2text.com

# Major Search Engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Google-Extended
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Social Media Crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Pinterestbot
Allow: /

User-agent: Slackbot
Allow: /

# AI Training Crawlers (Allowed for indexing - AI-SEO Optimized)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

# Default
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://folder2text.com/sitemap.xml

# Disallow private pages
Disallow: /api/
Disallow: /*?*
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Override': 'cloudflare-function'
    },
    status: 200
  });
}
