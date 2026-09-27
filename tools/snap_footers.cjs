const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/pages/10-contacts.html', { waitUntil: 'networkidle' });
  const footerEl = await page.$('.footer');
  await footerEl.screenshot({ path: 'screenshots/footer-contacts-10.png' });

  const contactsEl = await page.$('.footer-contacts');
  await contactsEl.screenshot({ path: 'screenshots/footer-contacts-col-10.png' });

  await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle' });
  const footerHome = await page.$('.footer');
  await footerHome.screenshot({ path: 'screenshots/footer-home.png' });

  await browser.close();
  console.log('Screenshots done');
})();
