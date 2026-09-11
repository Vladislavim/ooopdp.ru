import { innerOptimizedAssets } from './asset-variants.js';

const sharedBlocks = Object.freeze({
  header: 'blocks/header/template.html',
  contact: 'blocks/contact-form/template.html',
  footer: 'blocks/footer/template.html',
});

/**
 * Single source of truth for page-level content and paths.
 *
 * Visual styles and behavior remain in the existing production files during
 * this migration so the rendered site keeps the approved PDP appearance.
 */
export const siteData = Object.freeze({
  id: 'pdp-orig-test-v2',
  brand: {
    name: 'ПДП — Поволжское деловое партнёрство',
    accent: '#F45116',
  },
  sourceOfTruth: 'orig_test_v2/src/',
  innerOptimizedAssets,
  generatedOutputs: Object.freeze([
    'orig_test_v2/index.html',
    'orig_test_v2/pages/*.html',
  ]),
  routes: Object.freeze({
    home: 'index.html',
    services: 'pages/02-services.html',
    cases: 'pages/06-completed-works.html',
    projects: 'pages/04-projects-clients.html',
    articles: 'pages/07-news-articles.html',
    contacts: 'pages/10-contacts.html',
    privacy: 'pages/12-privacy-policy.html',
  }),
  sharedBlocks,
  pageIds: Object.freeze([
    'home',
    'page-index',
    'about-company',
    'services',
    'service-detail',
    'projects-clients',
    'project-red-october',
    'completed-works',
    'news-articles',
    'article-detail',
    'documents-materials',
    'contacts',
    'not-found',
    'privacy-policy',
    'article-construction-control',
    'article-executive-documentation',
  ]),
  // Canonical block sources. A manifest can override a key explicitly, but
  // shared and homepage sections resolve from this registry first.
  canonicalBlocks: Object.freeze({
    home: Object.freeze({
      header: sharedBlocks.header,
      'header-2': 'content/home/parts/002-header-2.html',
      services: 'content/home/parts/003-services.html',
      directions: 'content/home/parts/004-directions.html',
      projects: 'content/home/parts/005-projects.html',
      documents: 'content/home/parts/006-documents.html',
      'clients-trust-title': 'content/home/parts/007-clients-trust-title.html',
      about: 'content/home/parts/008-about.html',
      articles: 'content/home/parts/009-articles.html',
      contacts: sharedBlocks.contact,
      footer: sharedBlocks.footer,
    }),
  }),
});

export const motionTokens = Object.freeze({
  fast: '180ms',
  ui: '280ms',
  base: '420ms',
  content: '480ms',
  image: '600ms',
  slow: '650ms',
  stagger: '45ms',
  easing: 'cubic-bezier(.22, 1, .36, 1)',
  mediaEasing: 'cubic-bezier(.22, .72, .18, 1)',
});
