const { chromium } = require('C:/Users/viman/AppData/Roaming/npm/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'assets', 'articles');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const tasks = [
  {
    name: 'photo-stroykontrol-surveyor',
    query: 'инженер строительного контроля нивелир каска'
  },
  {
    name: 'photo-asbuilt-scheme-stamp',
    query: 'исполнительная схема штамп чертеж строительство'
  },
  {
    name: 'photo-docs-blueprints-desk',
    query: 'проектная документация чертежи папка рулоны стол'
  },
  {
    name: 'photo-rebar-inspection',
    query: 'контроль армирования скрытые работы строительный контроль'
  },
  {
    name: 'photo-tech-customer-site',
    query: 'технический заказчик строительство инженеры площадка'
  }
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  for (const t of tasks) {
    console.log(`Searching for: ${t.query}`);
    await page.goto('https://yandex.ru/images/search?text=' + encodeURIComponent(t.query), { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(1500);

    const thumbs = await page.locator('.ImagesContentImage-Image');
    const count = await thumbs.count();
    console.log(`  Found ${count} thumbs`);

    let saved = 0;
    for (let i = 0; i < Math.min(count, 6) && saved < 2; i++) {
      try {
        await thumbs.nth(i).click();
        await page.waitForTimeout(1000);

        const largeUrl = await page.evaluate(() => {
          const origin = document.querySelector('.MMImage-Origin, .MMImageContainer img');
          return origin ? origin.src : null;
        });

        if (largeUrl && largeUrl.includes('avatars.mds.yandex.net')) {
          const res = await page.request.get(largeUrl);
          const buf = await res.body();
          if (buf.length > 30000) {
            const fileName = `${t.name}-0${saved + 1}.jpg`;
            fs.writeFileSync(path.join(targetDir, fileName), buf);
            console.log(`  -> Saved ${fileName} (${buf.length} bytes, large URL: ${largeUrl.slice(0, 70)}...)`);
            saved++;
          }
        }

        // Close viewer if open
        const closeBtn = await page.$('.MMViewerModal-Close');
        if (closeBtn) await closeBtn.click();
        await page.waitForTimeout(400);
      } catch (err) {
        console.log(`  Thumb ${i} failed: ${err.message}`);
      }
    }
  }

  await browser.close();
  console.log('Finished downloading high-res photos.');
}

main().catch(console.error);
