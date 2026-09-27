const { chromium } = require('C:/Users/viman/AppData/Roaming/npm/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:4173/pages/07-news-articles.html', { waitUntil: 'networkidle' });
  const el = await page.$('.articles-index-card:nth-child(6)');
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: 'screenshots/card6_only.png' });
  console.log('Saved screenshots/card6_only.png');
  await browser.close();
})();
