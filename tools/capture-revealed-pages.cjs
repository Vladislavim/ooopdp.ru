const { chromium } = require('C:/Users/viman/AppData/Roaming/npm/node_modules/playwright');
const path = require('path');
const fs = require('fs');

async function autoScrollAndReveal(page) {
  await page.evaluate(async () => {
    // 1. Reveal all sections immediately
    document.querySelectorAll('[data-reveal], [data-reveal-item], section, footer').forEach(el => {
      el.classList.add('is-visible');
      if (el.style) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }
    });

    // 2. Scroll through page to trigger lazy loads and observers
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // scroll back to top
          resolve();
        }
      }, 50);
    });

    // Ensure all revealed again after scroll reset
    document.querySelectorAll('[data-reveal], [data-reveal-item], section, footer').forEach(el => {
      el.classList.add('is-visible');
    });
  });
  await page.waitForTimeout(600);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  const pagesToCapture = [
    { name: '00-home', url: 'http://127.0.0.1:4173/index.html', title: 'Главная' },
    { name: '02-services', url: 'http://127.0.0.1:4173/pages/02-services.html', title: 'Услуги' },
    { name: '04-projects-clients', url: 'http://127.0.0.1:4173/pages/04-projects-clients.html', title: 'Кейсы и проекты' },
    { name: '10-contacts', url: 'http://127.0.0.1:4173/pages/10-contacts.html', title: 'Контакты' },
    { name: '07-articles', url: 'http://127.0.0.1:4173/pages/07-news-articles.html', title: 'Статьи' }
  ];

  const outputDir = path.resolve('screenshots/nav_pages_revealed');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const item of pagesToCapture) {
    const page = await context.newPage();
    console.log(`Navigating to ${item.title}: ${item.url}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle', timeout: 15000 });
      await autoScrollAndReveal(page);
      const outPath = path.join(outputDir, `${item.name}_1440.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Saved ${outPath}`);
    } catch (err) {
      console.error(`Error capturing ${item.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Capture finished.');
})();
