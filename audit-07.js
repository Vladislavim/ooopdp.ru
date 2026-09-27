const { chromium } = require('C:/Users/viman/AppData/Roaming/npm/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://127.0.0.1:4173/pages/07-news-articles.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Full page screenshot
  await page.screenshot({ path: 'screenshots/audit_07_full.png', fullPage: true });
  console.log('Saved screenshots/audit_07_full.png');

  await browser.close();
})();
