const { chromium } = require('C:/Users/viman/AppData/Roaming/npm/node_modules/playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });

  const pages = [
    { url: 'http://127.0.0.1:4173/pages/07-news-articles.html', name: '07-news-articles' },
    { url: 'http://127.0.0.1:4173/pages/08-article-detail.html', name: '08-article-detail' },
    { url: 'http://127.0.0.1:4173/pages/13-article-construction-control.html', name: '13-article-construction-control' },
    { url: 'http://127.0.0.1:4173/pages/14-article-executive-documentation.html', name: '14-article-executive-documentation' }
  ];

  for (const p of pages) {
    // Desktop 1440
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pageDesktop.goto(p.url, { waitUntil: 'networkidle' });
    await pageDesktop.waitForTimeout(600);
    await pageDesktop.screenshot({ path: `screenshots/audit_${p.name}_1440.png`, fullPage: true });
    console.log(`Saved screenshots/audit_${p.name}_1440.png`);
    await pageDesktop.close();

    // Mobile 390
    const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageMobile.goto(p.url, { waitUntil: 'networkidle' });
    await pageMobile.waitForTimeout(600);
    await pageMobile.screenshot({ path: `screenshots/audit_${p.name}_390.png`, fullPage: true });
    console.log(`Saved screenshots/audit_${p.name}_390.png`);
    await pageMobile.close();
  }

  await browser.close();
  console.log('All article audits captured successfully.');
})();
