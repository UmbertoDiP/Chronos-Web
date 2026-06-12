// Test se FAQPage appare client-side in browser
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Loading https://folder2text.com/ ...');
  await page.goto('https://folder2text.com/', { waitUntil: 'networkidle0' });

  // Wait for React to mount
  await page.waitForTimeout(2000);

  // Check for FAQPage schema
  const faqSchemaCount = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    return scripts.filter(s => s.textContent.includes('"@type":"FAQPage"')).length;
  });

  console.log(`FAQPage schema count: ${faqSchemaCount}`);

  if (faqSchemaCount === 1) {
    console.log('✅ SUCCESS: FAQPage present (single instance)');
  } else if (faqSchemaCount === 0) {
    console.log('❌ ERROR: FAQPage missing (React not injecting)');
  } else {
    console.log(`⚠️  WARNING: FAQPage duplicated (${faqSchemaCount} instances)`);
  }

  // Extract FAQPage schema
  const faqSchema = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const faqScript = scripts.find(s => s.textContent.includes('"@type":"FAQPage"'));
    return faqScript ? JSON.parse(faqScript.textContent) : null;
  });

  if (faqSchema) {
    console.log(`\nFAQPage schema found:`);
    console.log(`- Questions count: ${faqSchema.mainEntity?.length || 0}`);
    console.log(`- First question: ${faqSchema.mainEntity?.[0]?.name || 'N/A'}`);
  }

  await browser.close();
})();
