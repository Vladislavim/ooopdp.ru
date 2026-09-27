const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const projectRoot = path.resolve('.');
const pagesDir = path.join(projectRoot, 'pages');

const htmlFiles = [
  path.join(projectRoot, 'index.html'),
  ...fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(pagesDir, f))
];

console.log(`Starting forensic SEO and technical audit across ${htmlFiles.length} pages...\n`);

const report = {
  totalPages: htmlFiles.length,
  missingTitle: [],
  shortTitle: [],
  longTitle: [],
  missingDesc: [],
  shortDesc: [],
  longDesc: [],
  missingCanonical: [],
  missingH1: [],
  multipleH1: [],
  missingOG: [],
  missingSchema: [],
  imagesWithoutAlt: [],
  brokenInternalLinks: [],
  commercialAudit: {},
  schemaBreakdown: {}
};

const allFilesRelative = new Set([
  'index.html',
  ...fs.readdirSync(pagesDir).map(f => `pages/${f}`)
]);

htmlFiles.forEach(file => {
  const relPath = path.relative(projectRoot, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);

  // 1. Title
  const title = $('title').text().trim();
  if (!title) report.missingTitle.push(relPath);
  else if (title.length < 30) report.shortTitle.push({ file: relPath, title, len: title.length });
  else if (title.length > 80) report.longTitle.push({ file: relPath, title, len: title.length });

  // 2. Meta description
  const desc = $('meta[name="description"]').attr('content') || '';
  if (!desc) report.missingDesc.push(relPath);
  else if (desc.length < 70) report.shortDesc.push({ file: relPath, desc, len: desc.length });
  else if (desc.length > 200) report.longDesc.push({ file: relPath, desc, len: desc.length });

  // 3. Canonical
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  if (!canonical) report.missingCanonical.push(relPath);

  // 4. H1
  const h1s = $('h1');
  if (h1s.length === 0) report.missingH1.push(relPath);
  else if (h1s.length > 1) report.multipleH1.push({ file: relPath, count: h1s.length, texts: h1s.map((i, el) => $(el).text().trim()).get() });

  // 5. OpenGraph
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (!ogTitle || !ogDesc || !ogImage) {
    report.missingOG.push({ file: relPath, missing: { ogTitle: !ogTitle, ogDesc: !ogDesc, ogImage: !ogImage } });
  }

  // 6. Schema.org JSON-LD
  const schemas = [];
  $('script[type="application/ld+json"]').each((i, el) => {
    try {
      const json = JSON.parse($(el).html());
      schemas.push(json['@type'] || (Array.isArray(json['@graph']) ? json['@graph'].map(g => g['@type']) : 'Unknown'));
    } catch (e) {
      schemas.push('INVALID_JSON');
    }
  });
  if (schemas.length === 0) report.missingSchema.push(relPath);
  report.schemaBreakdown[relPath] = schemas;

  // 7. Images without alt
  $('img').each((i, el) => {
    const alt = $(el).attr('alt');
    const src = $(el).attr('src');
    if (typeof alt === 'undefined') {
      report.imagesWithoutAlt.push({ file: relPath, src });
    }
  });

  // 8. Internal links checking
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href');
    if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) return;
    
    // Resolve relative path
    const fileDir = path.dirname(relPath);
    let resolved = path.normalize(path.join(fileDir, href.split('#')[0].split('?')[0])).replace(/\\/g, '/');
    if (!fs.existsSync(path.join(projectRoot, resolved))) {
      report.brokenInternalLinks.push({ file: relPath, href, resolved });
    }
  });
});

// 9. Commercial Factors scan on index.html and contacts
const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const contactsHtml = fs.readFileSync(path.join(pagesDir, '10-contacts.html'), 'utf8');
const servicesHtml = fs.readFileSync(path.join(pagesDir, '02-services.html'), 'utf8');

const checkRegex = (text, regex) => regex.test(text);

report.commercialAudit = {
  innFound: checkRegex(contactsHtml + indexHtml, /ИНН|ОГРН/i),
  sroFound: checkRegex(contactsHtml + servicesHtml + indexHtml, /СРО|выписка\s+СРО|НОПРИЗ|НОСТРОЙ/i),
  calculatorFound: checkRegex(servicesHtml + indexHtml, /калькулятор|рассчитать\s+стоимость/i),
  guaranteeClause: checkRegex(servicesHtml + indexHtml, /гаранти/i),
  priceTransparent: checkRegex(servicesHtml + indexHtml, /от\s+\d+[\s\d]*\s*₽|стоимость\s+от/i),
  clientLetters: checkRegex(indexHtml + contactsHtml, /отзыв|благодарственн/i),
  requisitesBank: checkRegex(contactsHtml, /р\/с|банк|бик|корр/i)
};

console.log(JSON.stringify(report, null, 2));
fs.writeFileSync('tools/audit-report.json', JSON.stringify(report, null, 2), 'utf8');
