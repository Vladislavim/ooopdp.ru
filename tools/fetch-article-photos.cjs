const { chromium } = require('C:/Users/viman/AppData/Roaming/npm/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'assets', 'articles');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const queries = [
  { key: 'tech_supervision', query: 'строительный контроль инженер технадзора объект фото' },
  { key: 'stroykontrol', query: 'инженер строительного контроля нивелир каска фото' },
  { key: 'as_built_docs', query: 'исполнительная документация чертежи проект со штампом фото' },
  { key: 'construction_meeting', query: 'совещание на стройке инженеры проект чертеж фото' },
  { key: 'rebar_inspection', query: 'входной контроль материалов арматура стройка фото' },
  { key: 'work_journal', query: 'проектная документация чертежи папка стол фото' }
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  for (const item of queries) {
    try {
      console.log(`Searching for ${item.key}: "${item.query}"`);
      await page.goto('https://yandex.ru/images/search?text=' + encodeURIComponent(item.query), { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1500);

      const urls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.ImagesContentImage-Image'))
          .map(img => img.src)
          .filter(src => src && src.includes('avatars.mds.yandex.net/i?id='))
          .slice(0, 5);
      });

      console.log(`  Found ${urls.length} images for ${item.key}`);
      for (let i = 0; i < urls.length; i++) {
        try {
          const res = await page.request.get(urls[i]);
          const buf = await res.body();
          if (buf.length > 5000) {
            const fileName = `${item.key}_0${i + 1}.jpg`;
            const filePath = path.join(targetDir, fileName);
            fs.writeFileSync(filePath, buf);
            console.log(`  -> Saved ${fileName} (${buf.length} bytes)`);
          }
        } catch (err) {
          console.error(`  -> Failed to fetch ${urls[i]}: ${err.message}`);
        }
      }
    } catch (e) {
      console.error(`  Query failed for ${item.key}:`, e.message);
    }
  }

  await browser.close();
  console.log('Finished downloading all article photos.');
}

main().catch(console.error);
