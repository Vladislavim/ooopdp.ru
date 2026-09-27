const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://127.0.0.1:4173/pages/10-contacts.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const footerContacts = page.locator('footer.footer');
  await footerContacts.screenshot({ path: 'screenshots/restored-footer-contacts.png' });
  console.log('Saved restored-footer-contacts.png');

  await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const footerHome = page.locator('footer.footer');
  await footerHome.screenshot({ path: 'screenshots/restored-footer-home.png' });
  console.log('Saved restored-footer-home.png');

  await browser.close();
})();
