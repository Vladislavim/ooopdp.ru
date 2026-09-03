import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = path.resolve(srcDir, '..');

const pages = [
  { id: 'home', source: 'index.html', output: 'index.html', kind: 'home' },
  { id: 'page-index', source: 'pages/index.html', output: 'pages/index.html', kind: 'index' },
  { id: 'about-company', source: 'pages/01-about-company.html', output: 'pages/01-about-company.html', kind: 'inner' },
  { id: 'services', source: 'pages/02-services.html', output: 'pages/02-services.html', kind: 'inner' },
  { id: 'service-detail', source: 'pages/03-service-detail.html', output: 'pages/03-service-detail.html', kind: 'inner' },
  { id: 'projects-clients', source: 'pages/04-projects-clients.html', output: 'pages/04-projects-clients.html', kind: 'inner' },
  { id: 'project-red-october', source: 'pages/05-project-red-october.html', output: 'pages/05-project-red-october.html', kind: 'inner' },
  { id: 'completed-works', source: 'pages/06-completed-works.html', output: 'pages/06-completed-works.html', kind: 'inner' },
  { id: 'news-articles', source: 'pages/07-news-articles.html', output: 'pages/07-news-articles.html', kind: 'inner' },
  { id: 'article-detail', source: 'pages/08-article-detail.html', output: 'pages/08-article-detail.html', kind: 'inner' },
  { id: 'documents-materials', source: 'pages/09-documents-materials.html', output: 'pages/09-documents-materials.html', kind: 'inner' },
  { id: 'contacts', source: 'pages/10-contacts.html', output: 'pages/10-contacts.html', kind: 'inner' },
  { id: 'not-found', source: 'pages/11-404.html', output: 'pages/11-404.html', kind: 'inner' },
  { id: 'privacy-policy', source: 'pages/12-privacy-policy.html', output: 'pages/12-privacy-policy.html', kind: 'inner' },
  { id: 'article-construction-control', source: 'pages/13-article-construction-control.html', output: 'pages/13-article-construction-control.html', kind: 'inner' },
  { id: 'article-executive-documentation', source: 'pages/14-article-executive-documentation.html', output: 'pages/14-article-executive-documentation.html', kind: 'inner' },
];

const aliases = new Map([
  ['top', 'header'],
  ['hero', 'hero'],
  ['services', 'services'],
  ['directions', 'directions'],
  ['projects', 'projects'],
  ['documents', 'documents'],
  ['reviews', 'trust'],
  ['clients-trust', 'trust'],
  ['about', 'about'],
  ['articles', 'articles'],
  ['contact-form-section', 'contact-form'],
  ['footer', 'footer'],
]);

function scanTagEnd(text, start) {
  let quote = '';
  for (let index = start + 1; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === '>') return index + 1;
  }
  throw new Error(`Unclosed HTML tag at offset ${start}`);
}

function readMarkupToken(text, start) {
  if (text.startsWith('<!--', start)) {
    const end = text.indexOf('-->', start + 4);
    if (end === -1) throw new Error(`Unclosed HTML comment at offset ${start}`);
    return { type: 'comment', start, end: end + 3, tagName: null, closing: false, void: false };
  }

  const end = scanTagEnd(text, start);
  const raw = text.slice(start, end);
  const match = raw.match(/^<\s*(\/?)\s*([A-Za-z][\w:-]*)/);
  if (!match) return { type: 'other', start, end, tagName: null, closing: false, void: false };
  const tagName = match[2].toLowerCase();
  const closing = Boolean(match[1]);
  const voidTag = /\/\s*>$/.test(raw) || new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']).has(tagName);
  return { type: 'tag', start, end, tagName, closing, void: voidTag };
}

function nextMarkupToken(text, start) {
  const next = text.indexOf('<', start);
  if (next === -1) return null;
  return readMarkupToken(text, next);
}

function findMatchingElement(text, openingStart) {
  const opening = readMarkupToken(text, openingStart);
  if (opening.type !== 'tag' || opening.closing) throw new Error(`Expected opening tag at ${openingStart}`);
  if (opening.void) return { end: opening.end, closeStart: opening.end };

  let depth = 1;
  let cursor = opening.end;
  while (cursor < text.length) {
    const token = nextMarkupToken(text, cursor);
    if (!token) break;
    cursor = token.end;
    if (token.type !== 'tag') continue;
    if (token.tagName === 'script' || token.tagName === 'style') {
      const close = text.slice(cursor).search(new RegExp(`<\\/\\s*${token.tagName}\\s*>`, 'i'));
      if (close >= 0) {
        const closeStart = cursor + close;
        const closeToken = readMarkupToken(text, closeStart);
        cursor = closeToken.end;
        if (token.tagName === opening.tagName) {
          depth -= 1;
          if (depth === 0) return { end: cursor, closeStart };
        }
      }
      continue;
    }
    if (token.tagName !== opening.tagName) continue;
    if (!token.closing && !token.void) depth += 1;
    if (token.closing) {
      depth -= 1;
      if (depth === 0) return { end: token.end, closeStart: token.start };
    }
  }
  throw new Error(`Could not find closing </${opening.tagName}> for offset ${openingStart}`);
}

function findOpening(text, tagName, from = 0) {
  const pattern = new RegExp(`<${tagName}(?=\\s|>)`, 'ig');
  pattern.lastIndex = from;
  const match = pattern.exec(text);
  if (!match) throw new Error(`Could not find <${tagName}>`);
  const token = readMarkupToken(text, match.index);
  return { ...token, start: match.index };
}

function getAttribute(raw, name) {
  const match = raw.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? '';
}

function keyForElement(raw, tagName, index) {
  const id = getAttribute(raw, 'id');
  const classes = getAttribute(raw, 'class').split(/\s+/).filter(Boolean);
  const direct = id || classes.find((name) => aliases.has(name)) || classes[0] || tagName;
  return aliases.get(direct) ?? (direct.replace(/[^a-z0-9_-]+/gi, '-').toLowerCase() || `${tagName}-${index + 1}`);
}

function splitDirectChildren(inner) {
  const parts = [];
  let cursor = 0;
  let index = 0;
  while (cursor < inner.length) {
    const token = nextMarkupToken(inner, cursor);
    if (!token) break;
    if (token.type === 'comment') {
      cursor = token.end;
      continue;
    }
    if (token.type !== 'tag' || token.closing || token.void) {
      cursor = token.end;
      continue;
    }
    const match = findMatchingElement(inner, token.start);
    const raw = inner.slice(cursor, match.end);
    const baseKey = keyForElement(raw, token.tagName, index);
    let key = baseKey;
    let duplicate = 2;
    while (parts.some((part) => part.key === key)) key = `${baseKey}-${duplicate++}`;
    parts.push({ key, raw, tagName: token.tagName, sourceIndex: index });
    index += 1;
    cursor = match.end;
  }
  return { parts, trailing: inner.slice(cursor) };
}

function parseDocument(html, page) {
  if (html.includes('GENERATED BY orig_test_v2/src/build.mjs')) {
    throw new Error(`${page.source} is already generated; migration only accepts the pre-architecture source.`);
  }

  const htmlOpen = findOpening(html, 'html');
  const headOpen = findOpening(html, 'head', htmlOpen.end);
  const headCloseStart = html.toLowerCase().indexOf('</head', headOpen.end);
  const headClose = readMarkupToken(html, headCloseStart);
  const bodyOpen = findOpening(html, 'body', headClose.end);
  const bodyCloseStart = html.toLowerCase().lastIndexOf('</body');
  const bodyClose = readMarkupToken(html, bodyCloseStart);
  const mainOpen = findOpening(html, 'main', bodyOpen.end);
  const mainMatch = findMatchingElement(html, mainOpen.start);
  const mainInner = html.slice(mainOpen.end, mainMatch.closeStart);
  const split = splitDirectChildren(mainInner);
  const htmlCloseStart = html.toLowerCase().lastIndexOf('</html');
  const htmlClose = readMarkupToken(html, htmlCloseStart);

  return {
    ...page,
    doctype: html.slice(0, htmlOpen.start),
    htmlOpen: html.slice(htmlOpen.start, htmlOpen.end),
    headOpen: html.slice(headOpen.start, headOpen.end),
    headInner: html.slice(headOpen.end, headCloseStart),
    headClose: html.slice(headClose.start, headClose.end),
    bodyOpen: html.slice(bodyOpen.start, bodyOpen.end),
    bodyBeforeMain: html.slice(bodyOpen.end, mainOpen.start),
    mainOpen: html.slice(mainOpen.start, mainOpen.end),
    mainInnerTrailing: split.trailing,
    mainClose: html.slice(mainMatch.closeStart, mainMatch.end),
    bodyAfterMain: html.slice(mainMatch.end, bodyCloseStart),
    bodyClose: html.slice(bodyClose.start, bodyClose.end),
    htmlClose: html.slice(htmlClose.start, htmlClose.end),
    parts: split.parts.map(({ key, tagName, sourceIndex }) => ({ key, tagName, sourceIndex })),
    rawParts: split.parts,
  };
}

function relativeFromSrc(filePath) {
  return path.relative(srcDir, filePath).replaceAll(path.sep, '/');
}

async function savePage(parsed) {
  const contentDir = path.join(srcDir, 'content', parsed.id);
  const partsDir = path.join(contentDir, 'parts');
  await mkdir(partsDir, { recursive: true });

  const parts = [];
  for (const part of parsed.rawParts) {
    const file = path.join(partsDir, `${String(part.sourceIndex + 1).padStart(3, '0')}-${part.key}.html`);
    await writeFile(file, part.raw, 'utf8');
    parts.push({ key: part.key, tagName: part.tagName, sourceIndex: part.sourceIndex, file: relativeFromSrc(file) });
  }

  const document = {
    id: parsed.id,
    source: parsed.source,
    output: parsed.output,
    kind: parsed.kind,
    doctype: parsed.doctype,
    htmlOpen: parsed.htmlOpen,
    headOpen: parsed.headOpen,
    headInner: parsed.headInner,
    headClose: parsed.headClose,
    bodyOpen: parsed.bodyOpen,
    bodyBeforeMain: parsed.bodyBeforeMain,
    mainOpen: parsed.mainOpen,
    mainInnerTrailing: parsed.mainInnerTrailing,
    mainClose: parsed.mainClose,
    bodyAfterMain: parsed.bodyAfterMain,
    bodyClose: parsed.bodyClose,
    htmlClose: parsed.htmlClose,
    parts,
  };
  await writeFile(path.join(contentDir, 'document.json'), `${JSON.stringify(document, null, 2)}\n`, 'utf8');

  const manifest = `export default ${JSON.stringify({
    id: parsed.id,
    output: parsed.output,
    sourceDir: `content/${parsed.id}`,
    kind: parsed.kind,
    order: parts.map((part) => part.key),
  }, null, 2)};\n`;
  await writeFile(path.join(srcDir, 'pages', `${parsed.id}.page.js`), manifest, 'utf8');
  return { ...parsed, parts };
}

async function saveCanonicalBlocks(home) {
  const findPart = (predicate) => home.rawParts.find((part) => predicate(part.raw, part.key));
  const blocks = [
    ['header', (raw, key) => key === 'header' || /<header\b[^>]*\bclass=["'][^"']*\btop\b/i.test(raw)],
    ['footer', (raw, key) => key === 'footer'],
    ['contact-form', (raw, key) => key === 'contact-form' || /contact-form-section/i.test(raw)],
  ];
  for (const [name, predicate] of blocks) {
    const part = findPart(predicate);
    if (!part) continue;
    const dir = path.join(srcDir, 'blocks', name);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'template.html'), part.raw, 'utf8');
  }
}

async function main() {
  await mkdir(path.join(srcDir, 'pages'), { recursive: true });
  const parsedPages = [];
  for (const page of pages) {
    const html = await readFile(path.join(siteDir, page.source), 'utf8');
    parsedPages.push(await savePage(parseDocument(html, page)));
  }
  await saveCanonicalBlocks(parsedPages[0]);
  console.log(`Migrated ${parsedPages.length} documents into orig_test_v2/src.`);
  for (const page of parsedPages) console.log(`- ${page.id}: ${page.parts.length} top-level main blocks`);
}

await main();
