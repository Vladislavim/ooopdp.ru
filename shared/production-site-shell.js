(() => {
  const CACHE_VERSION = '20260911-cache-v10';
  'use strict';

  const pageCleanupTasks = [];
  let pageDisposed = false;
  const registerPageCleanup = (cleanup) => pageCleanupTasks.push(cleanup);
  const disposePage = () => {
    if (pageDisposed) return;
    pageDisposed = true;
    pageCleanupTasks.splice(0).forEach((cleanup) => {
      try { cleanup(); } catch (error) { /* teardown must never block navigation */ }
    });
  };
  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) disposePage();
  });

  const setupSharedScroll = () => {
    if (!document.body?.classList.contains('production-page') || window.__pdpInnerScrollBoot) return;
    window.__pdpInnerScrollBoot = true;

    const scrollStyles = document.createElement('link');
    scrollStyles.rel = 'stylesheet';
    scrollStyles.href = `../lenis-scroll.css?v=${CACHE_VERSION}`;
    scrollStyles.dataset.pdpSharedScroll = 'true';
    document.head.append(scrollStyles);

    let vendorScript;
    let scrollScript;
    const bootScroll = () => {
      if (pageDisposed || scrollScript) return;
      scrollScript = document.createElement('script');
      scrollScript.src = `../lenis-scroll.js?v=${CACHE_VERSION}`;
      scrollScript.dataset.pdpSharedScroll = 'true';
      scrollScript.onerror = () => {
        window.__pdpInnerScrollBoot = false;
      };
      document.body.append(scrollScript);
    };

    if (typeof window.Lenis === 'function') {
      bootScroll();
    } else {
      vendorScript = document.createElement('script');
      vendorScript.src = `../vendor/lenis/lenis.min.js?v=${CACHE_VERSION}`;
      vendorScript.dataset.pdpSharedScrollVendor = 'true';
      vendorScript.onload = bootScroll;
      vendorScript.onerror = () => {
        window.__pdpInnerScrollBoot = false;
      };
      document.head.append(vendorScript);
    }

    registerPageCleanup(() => {
      vendorScript?.remove();
      scrollScript?.remove();
      scrollStyles.remove();
      window.__pdpInnerScrollBoot = false;
    });
  };
  setupSharedScroll();

  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = '../assets/pdp-official-logo.svg';
  document.head.append(favicon);

  const shellStyles = document.createElement('link');
  shellStyles.rel = 'stylesheet';
  shellStyles.href = `../shared/production-main-shell.css?v=${CACHE_VERSION}`;
  document.head.append(shellStyles);
  const headerStyles = document.createElement('link');
  headerStyles.rel = 'stylesheet';
  headerStyles.href = `../shared/header-shell.css?v=${CACHE_VERSION}`;
  document.head.append(headerStyles);
  const footerStyles = document.createElement('link');
  footerStyles.rel = 'stylesheet';
  footerStyles.href = `../shared/production-footer-shell.css?v=${CACHE_VERSION}`;
  document.head.append(footerStyles);
  const artDirectionStyles = document.createElement('link');
  artDirectionStyles.rel = 'stylesheet';
  artDirectionStyles.href = `../shared/production-art-direction.css?v=${CACHE_VERSION}`;
  document.head.append(artDirectionStyles);
  const productionStyles = document.createElement('link');
  productionStyles.rel = 'stylesheet';
  productionStyles.href = `../shared/production-pages.css?v=${CACHE_VERSION}`;
  document.head.append(productionStyles);
  const innerArtStyles = document.createElement('link');
  innerArtStyles.rel = 'stylesheet';
  innerArtStyles.href = `../shared/production-inner-art-direction.css?v=${CACHE_VERSION}`;
  document.head.append(innerArtStyles);
  const ctaSurfaceStyles = document.createElement('link');
  ctaSurfaceStyles.rel = 'stylesheet';
  ctaSurfaceStyles.href = `../shared/production-cta-surface.css?v=20260829-cta-surface-v1`;
  document.head.append(ctaSurfaceStyles);
  const shellHoverStyles = document.createElement('link');
  shellHoverStyles.rel = 'stylesheet';
  shellHoverStyles.href = `../shared/shell-hover-motion.css?v=${CACHE_VERSION}`;
  document.head.append(shellHoverStyles);

  if (document.body?.classList.contains('production-page')) {
    const main = document.querySelector('main');
    if (main && !main.id) main.id = 'main-content';
    document.body.insertAdjacentHTML('afterbegin', '<a class="production-skip-link" href="#main-content">Перейти к содержимому</a>');
  }

  const home = '../';
  const routes = {
    home,
    about: '01-about-company.html',
    services: '02-services.html',
    serviceDetail: '03-service-detail.html',
    projects: '04-projects-clients.html',
    redOctober: '05-project-red-october.html',
    cases: '06-completed-works.html',
    articles: '07-news-articles.html',
    articleDetail: '08-article-detail.html',
    documents: '09-documents-materials.html',
    contacts: '10-contacts.html',
    notFound: '11-404.html',
    privacy: '12-privacy-policy.html'
  };

  const page = document.body.dataset.page || '';
  const innerOptimizedMap = Object.freeze({
    'about-blueprints.png': 'about-blueprints.webp',
    'about-pdp-workers.jpg': 'about-pdp-workers.webp',
    'about-project-planning.png': 'about-project-planning.webp',
    'cases/astana-arena.jpg': 'cases-astana-arena.webp',
    'cases/bombonera.jpg': 'cases-bombonera.webp',
    'cases/contact-sheet.jpg': 'cases-contact-sheet.webp',
    'cases/eurochem-office.jpg': 'cases-eurochem-office.webp',
    'cases/dream-island.jpg': 'cases-dream-island.webp',
    'cases/dream-island-plan.jpg': 'cases-dream-island-plan.webp',
    'cases/fountains.jpg': 'cases-fountains.webp',
    'cases/industrial-production-user.png': 'cases-industrial-production-user.webp',
    'cases/polyclinic.jpg': 'cases-polyclinic.webp',
    'cases/polyclinic-old-front.jpg': 'cases-polyclinic-old-front.webp',
    'cases/polyclinic-old-side.jpg': 'cases-polyclinic-old-side.webp',
    'cases/polyclinic-render-front.jpg': 'cases-polyclinic-render-front.webp',
    'cases/polyclinic-render-side.jpg': 'cases-polyclinic-render-side.webp',
    'cases/red-october.jpg': 'cases-red-october.webp',
    'cases/red-october-render-user.jpg': 'cases-red-october-render-user.webp',
    'documents/crmo-sketch-preview.jpg': 'documents-crmo-sketch-preview.webp',
    'documents/eurochem-office-design-preview.jpg': 'documents-eurochem-office-design-preview.webp',
    'documents/polyclinic-31-ar-preview.jpg': 'documents-polyclinic-31-ar-preview.webp',
    'documents/red-october-11-2023-as-preview.jpg': 'documents-red-october-11-2023-as-preview.webp',
    'industrial-pickling-01.png': 'industrial-pickling-01.webp',
    'industrial-pickling-02.png': 'industrial-pickling-02.webp',
    'patterns/pdp-logo-parallax.png': 'pdp-logo-parallax.webp',
    'projects-clients-hero-generated.png': 'projects-clients-hero-generated.webp',
    'service-detail-hero-wireframe.png': 'service-detail-hero-wireframe.webp',
    'service-wireframe-atlas.png': 'service-wireframe-atlas.webp',
    'service-wireframes/service-wire-01.png': 'service-wireframes-service-wire-01.webp',
    'service-wireframes/service-wire-04.png': 'service-wireframes-service-wire-04.webp',
    'technical-customer-site-v1.png': 'technical-customer-site-v1.webp',
    'wireframe-building.png': 'wireframe-building.webp',
    'web/commons-industrial-facility-interior.jpg': 'web-commons-industrial-facility-interior.webp',
    'web/pexels-architects-plan-8470031.jpg': 'web-pexels-architects-plan-8470031.webp',
    'web/pexels-construction-18078304.jpg': 'web-pexels-construction-18078304.webp',
    'web/pexels-construction-6082416.jpg': 'web-pexels-construction-6082416.webp',
    'web/pexels-engineers-blueprint-6285154.jpg': 'web-pexels-engineers-blueprint-6285154.webp',
    'web/pexels-engineers-plan-8961026.jpg': 'web-pexels-engineers-plan-8961026.webp',
    'web/pexels-factory-15866139.jpg': 'web-pexels-factory-15866139.webp',
    'web/pexels-factory-33944133.jpg': 'web-pexels-factory-33944133.webp',
    'web/pexels-factory-37125625.jpg': 'web-pexels-factory-37125625.webp',
    'web/pexels-steel-36629781.jpg': 'web-pexels-steel-36629781.webp',
    'web/pexels-steel-3818947.jpg': 'web-pexels-steel-3818947.webp',
    'web/pexels-workers-site-10202856.jpg': 'web-pexels-workers-site-10202856.webp',
    'archive/PDP-OBJ-004.jpg': 'archive-PDP-OBJ-004.webp',
    'archive/PDP-OBJ-005.jpg': 'archive-PDP-OBJ-005.webp',
    'archive/PDP-OBJ-006.jpg': 'archive-PDP-OBJ-006.webp',
    'archive/PDP-OBJ-007.jpg': 'archive-PDP-OBJ-007.webp',
    'archive/PDP-OBJ-060.jpg': 'archive-PDP-OBJ-060.webp',
    'archive/PDP-OBJ-068.jpg': 'archive-PDP-OBJ-068.webp',
    'archive/PDP-OBJ-080.jpg': 'archive-PDP-OBJ-080.webp',
    'archive/PDP-OBJ-086.jpg': 'archive-PDP-OBJ-086.webp',
    'archive/PDP-OBJ-087.jpg': 'archive-PDP-OBJ-087.webp',
    'archive/PDP-OBJ-088.jpg': 'archive-PDP-OBJ-088.webp',
    'archive/PDP-OBJ-089.jpg': 'archive-PDP-OBJ-089.webp',
    'archive/PDP-OBJ-094.jpg': 'archive-PDP-OBJ-094.webp',
    'archive/PDP-OBJ-100.jpg': 'archive-PDP-OBJ-100.webp'
  });
  const asset = (path) => {
    const normalized = String(path || '').replace(/^(?:\.\.\/)?assets\//i, '');
    if (innerOptimizedMap[normalized]) return `../assets/inner-optimized/${innerOptimizedMap[normalized]}`;
    return `../assets/${normalized}`;
  };

  /*
     Editorial photography for the inner pages. The approved home page keeps
     its original media; only production-page image references are remapped.
     The files are downloaded into the project so the inner pages stay reliable
     when deployed without third-party image requests.
  */
  const archivePhotoMap = {
    'PDP-OBJ-004.jpg': 'pexels-factory-15866139.jpg',
    'PDP-OBJ-005.jpg': 'pexels-steel-3818947.jpg',
    'PDP-OBJ-006.jpg': 'pexels-factory-37125625.jpg',
    'PDP-OBJ-007.jpg': 'pexels-engineers-blueprint-6285154.jpg',
    'PDP-OBJ-060.jpg': 'pexels-architects-plan-8470031.jpg',
    'PDP-OBJ-100.jpg': 'pexels-workers-site-10202856.jpg',
    'PDP-OBJ-068.jpg': 'pexels-architects-plan-8470031.jpg',
    'PDP-OBJ-080.jpg': 'pexels-engineers-plan-8961026.jpg'
  };
  const editorialPhotoMap = {
    'red-october.jpg': 'pexels-factory-15866139.jpg',
    'polyclinic.jpg': '../cases/polyclinic-render-front.jpg',
    'eurochem-office.jpg': 'pexels-engineers-blueprint-6285154.jpg',
    'industrial-production-user.png': 'pexels-factory-37125625.jpg',
    'about-project-planning.png': 'pexels-engineers-blueprint-6285154.jpg',
    'service-wire-01.png': 'pexels-architects-plan-8470031.jpg',
    'technical-customer-site-v1.png': 'pexels-workers-site-10202856.jpg',
    'service-wireframe-atlas.png': 'pexels-steel-36629781.jpg',
    'wireframe-building.png': 'pexels-construction-18078304.jpg',
    'red-october-render-user.jpg': 'pexels-factory-15866139.jpg',
    'industrial-pickling-01.png': 'commons-industrial-facility-interior.jpg',
    'industrial-pickling-02.png': 'pexels-factory-37125625.jpg',
    'bombonera.jpg': '../documents/red-october-11-2023-as-preview.jpg'
  };
  const pageHeroPhotoMap = {
    'production-about': 'web/pexels-engineers-plan-8961026.jpg',
    'production-services': 'web/pexels-factory-15866139.jpg',
    'production-service-detail': 'web/pexels-workers-site-10202856.jpg',
    'production-projects': 'cases/red-october.jpg',
    'production-case': 'cases/red-october.jpg',
    'production-catalog': 'cases/red-october.jpg',
    'production-documents': 'web/pexels-steel-3818947.jpg',
    'production-contacts': 'about-blueprints.png',
    'production-404-page': 'web/pexels-construction-18078304.jpg',
    'production-privacy': 'web/pexels-steel-36629781.jpg'
  };
  const prepareInnerImage = (image) => {
    if (!image) return;
    if (!image.hasAttribute('alt')) {
      const proofPoint = image.closest('.prod-proof__point');
      const card = image.closest('.prod-card');
      const documentCard = image.closest('.prod-doc');
      if (proofPoint) image.alt = '';
      else if (card) image.alt = card.querySelector('strong, h3')?.textContent?.trim() || 'Проект ПДП';
      else if (documentCard) image.alt = documentCard.querySelector('strong')?.textContent?.trim() || 'Документ ПДП';
      else image.alt = '';
    }
    const isCritical = Boolean(image.closest('.prod-hero, .prod-404'));
    image.loading = isCritical ? 'eager' : 'lazy';
    image.decoding = 'async';
    image.fetchPriority = isCritical ? 'high' : 'auto';
    const setIntrinsicSize = () => {
      if (!image.getAttribute('width') && image.naturalWidth) image.setAttribute('width', String(image.naturalWidth));
      if (!image.getAttribute('height') && image.naturalHeight) image.setAttribute('height', String(image.naturalHeight));
    };
    if (image.complete) setIntrinsicSize();
    else image.addEventListener('load', setIntrinsicSize, { once: true });
  };
  const remapInnerImage = (image) => {
    if (!image) return;
    const source = image.getAttribute('src') || '';
    const match = source.match(/^(?:\.\.\/)?assets\/([^?#]+)([?#].*)?$/i);
    if (!match) return;
    const replacement = innerOptimizedMap[match[1]];
    if (!replacement) return;
    const suffix = match[2] || '';
    const next = `../assets/inner-optimized/${replacement}${suffix}`;
    if (source !== next) image.setAttribute('src', next);
  };
  const applyWebPhotography = () => {
    // Contacts keep the live map shell; project pages keep their source-
    // matched imagery. Editorial photography is only a replacement layer for
    // generic inner-page placeholders, never for a named project asset.
    const keepProjectImagery = document.body.classList.contains('production-case')
      || document.body.classList.contains('production-catalog')
      || document.body.classList.contains('production-projects');
    document.querySelectorAll('img').forEach(prepareInnerImage);
    if (!keepProjectImagery && !document.body.classList.contains('production-contacts')) {
      document.querySelectorAll('img[src]').forEach((image) => {
        const source = image.getAttribute('src') || '';
        // Existing case/document images are the project source of truth. Do
        // not run the editorial placeholder remapper over them.
      if (image.hasAttribute('data-keep-local') || /(?:\/|^)assets\/(?:cases|archive-optimized|documents)\//i.test(source)) return;
        const file = source.match(/([^/]+)$/i)?.[1];
        const replacement = (file && (archivePhotoMap[file] || editorialPhotoMap[file])) || '';
        if (replacement) {
          const replacementPath = replacement.replace(/^\.\.\//, '');
          const resolvedPath = /^(?:cases|documents)\//i.test(replacementPath)
            ? replacementPath
            : `web/${replacementPath}`;
          image.src = asset(resolvedPath);
          image.dataset.photoSource = 'pexels';
        }
      });
    }

    const hero = document.querySelector('.prod-hero');
    const heroPhoto = [...document.body.classList]
      .map((className) => pageHeroPhotoMap[className])
      .find(Boolean);
    if (hero && heroPhoto) {
      hero.style.setProperty('--prod-hero-image', `url('${asset(heroPhoto)}')`, 'important');
      hero.dataset.photoSource = heroPhoto.startsWith('cases/') || heroPhoto.startsWith('archive/') ? 'project-archive' : 'local';
    }

    const notFound = document.querySelector('.prod-404');
    if (notFound) {
      notFound.style.setProperty('--prod-404-image', `url('${asset('web/pexels-construction-18078304.jpg')}')`);
      notFound.dataset.photoSource = 'pexels';
    }
  };
  applyWebPhotography();

  const setEditorialImage = (image, path) => {
    if (!image) return;
    prepareInnerImage(image);
    image.src = asset(path);
    image.dataset.photoSource = path.startsWith('cases/') || path.startsWith('archive/') ? 'project-archive' : 'pexels';
  };
  const setEditorialPhoto = (selector, path) => {
    document.querySelectorAll(selector).forEach((image) => setEditorialImage(image, path));
  };
  const applyPageEditorialOverrides = () => {
    if (document.body.classList.contains('production-case')) {
      const galleryPhotos = [
        'cases/red-october-render-user.jpg',
        'industrial-pickling-01.png',
        'industrial-pickling-02.png',
        'cases/industrial-production-user.png',
        'cases/red-october.jpg'
      ];
      document.querySelectorAll('.prod-gallery img').forEach((image, index) => {
        const photo = galleryPhotos[index];
        if (photo) {
          prepareInnerImage(image);
          image.src = asset(photo);
          image.dataset.photoSource = 'project-archive';
        }
      });
    }
    if (document.body.classList.contains('production-catalog')) {
      const featureThumbs = document.querySelectorAll('.prod-catalog-feature__thumbs');
      const photoSets = [
        [
          'cases/red-october-render-user.jpg',
          'industrial-pickling-01.png',
          'industrial-pickling-02.png'
        ],
        [
          'cases/polyclinic-old-front.jpg',
          'cases/polyclinic-render-side.jpg',
          'cases/polyclinic-old-side.jpg'
        ],
        [
          'cases/eurochem-office.jpg',
          'archive/PDP-OBJ-068.jpg',
          'archive/PDP-OBJ-080.jpg'
        ],
        [
          'cases/dream-island.jpg',
          'cases/dream-island-plan.jpg',
          'cases/bombonera.jpg'
        ]
      ];
      featureThumbs.forEach((group, groupIndex) => {
        (photoSets[groupIndex] || []).forEach((photo, photoIndex) => {
          const image = group.querySelectorAll('img')[photoIndex];
          if (image) {
            prepareInnerImage(image);
            image.src = asset(photo);
            image.dataset.photoSource = photo.startsWith('cases/') || photo.startsWith('archive/') ? 'project-archive' : 'local';
          }
        });
      });
      const featureImages = document.querySelectorAll('.prod-catalog-feature__image img');
      setEditorialImage(featureImages[0], 'cases/red-october-render-user.jpg');
      setEditorialImage(featureImages[2], 'archive/PDP-OBJ-068.jpg');
      setEditorialPhoto('.prod-catalog-card:nth-child(1) img', 'cases/red-october.jpg');
    }
    if (document.body.classList.contains('production-news')) {
      setEditorialPhoto('.prod-news-feature__image img', 'cases/bombonera.jpg');
      setEditorialPhoto('.prod-news-card:nth-child(1) img', 'about-project-planning.png');
      setEditorialPhoto('.prod-news-card:nth-child(2) img', 'cases/astana-arena.jpg');
      setEditorialPhoto('.prod-news-row img', 'cases/eurochem-office.jpg');
    }
    if (document.body.classList.contains('production-article')) {
      const hero = document.querySelector('.prod-hero');
      const heroImage = `url('${asset('about-project-planning.png')}')`;
      hero?.style.setProperty('--prod-hero-image', heroImage, 'important');
      hero?.style.setProperty('--hero-image', heroImage, 'important');
      setEditorialPhoto('.prod-related .prod-card:nth-child(1) img', 'cases/red-october.jpg');
      setEditorialPhoto('.prod-related .prod-card:nth-child(2) img', 'cases/industrial-production-user.png');
    }
  };
  applyPageEditorialOverrides();

  const prepareEditorialHero = () => {
    const hero = document.querySelector('body.production-page .prod-hero');
    if (!hero || document.body.classList.contains('production-404-page') || document.body.classList.contains('production-catalog')) return;
    const heroPhotos = {
      'production-about': 'web/pexels-engineers-plan-8961026.jpg',
      'production-services': 'web/pexels-factory-15866139.jpg',
      'production-service-detail': 'web/pexels-workers-site-10202856.jpg',
      'production-projects': 'cases/red-october.jpg',
      'production-case': 'cases/red-october-render-user.jpg',
      'production-catalog': 'cases/red-october.jpg',
      'production-news': 'cases/bombonera.jpg',
      'production-article': 'about-project-planning.png',
      'production-documents': 'web/pexels-steel-3818947.jpg',
      'production-contacts': 'about-blueprints.png',
      'production-privacy': 'web/pexels-steel-36629781.jpg'
    };
    const pageClass = [...document.body.classList].find((className) => heroPhotos[className]);
    const photo = pageClass ? heroPhotos[pageClass] : '';
    if (!photo || hero.querySelector('.prod-editorial-hero-media')) return;
    hero.classList.add('prod-hero--editorial');
    const figure = document.createElement('figure');
    figure.className = 'prod-editorial-hero-media';
    figure.setAttribute('aria-label', 'Рабочая среда проекта');
    const image = document.createElement('img');
    image.src = asset(photo);
    image.alt = 'Рабочая среда проектирования и строительства';
    image.dataset.photoSource = photo.startsWith('cases/') || photo.startsWith('archive/') ? 'project-archive' : 'local';
    image.loading = 'eager';
    image.fetchPriority = 'high';
    image.decoding = 'async';
    const caption = document.createElement('figcaption');
    caption.innerHTML = '<span>ПРОЕКТНАЯ СРЕДА</span><span>ПДП / 2026</span>';
    figure.append(image, caption);
    hero.querySelector('.prod-hero__inner')?.append(figure);
    hero.style.removeProperty('--prod-hero-image');
  };
  prepareEditorialHero();

  // The source mockups use clickable cards. Browsers repair nested anchors by
  // splitting those cards into detached fragments, so rebuild the two affected
  // editorial groups before the shared shell is mounted.
  const repairSplitAnchorCards = () => {
    const featureSection = [...document.querySelectorAll('main > .section.container')]
      .find((section) => section.querySelector(':scope > .article-copy'));
    if (featureSection) {
      const mediaAnchor = featureSection.querySelector(':scope > .article-feature');
      const copyShell = featureSection.querySelector(':scope > .article-copy');
      const innerFeature = copyShell?.querySelector(':scope > .article-feature');
      if (mediaAnchor && copyShell && innerFeature) {
        const feature = document.createElement('a');
        feature.className = 'article-feature';
        feature.href = mediaAnchor.getAttribute('href') || innerFeature.getAttribute('href') || '#';
        const media = mediaAnchor.querySelector(':scope > .media');
        if (media) feature.append(media);
        const copy = document.createElement('div');
        copy.className = 'article-copy';
        while (innerFeature.firstChild) copy.append(innerFeature.firstChild);
        while (copyShell.firstChild) {
          const node = copyShell.firstChild;
          if (node === innerFeature) {
            node.remove();
            continue;
          }
          if (node.matches?.('a.arrow-link')) {
            const span = document.createElement('span');
            span.className = node.className;
            span.innerHTML = node.innerHTML;
            copy.append(span);
            node.remove();
            continue;
          }
          copy.append(node);
        }
        feature.append(copy);
        mediaAnchor.replaceWith(feature);
        copyShell.remove();
      }
    }

    document.querySelectorAll('.service-list').forEach((list) => {
      const children = [...list.children];
      for (let index = 0; index + 2 < children.length; index += 3) {
        const mediaAnchor = children[index];
        const copyShell = children[index + 1];
        const meta = children[index + 2];
        const innerFeature = copyShell?.querySelector(':scope > .catalog-feature');
        if (!mediaAnchor?.matches('.catalog-feature') || !innerFeature) continue;
        const row = document.createElement('a');
        row.className = 'catalog-feature';
        row.href = mediaAnchor.getAttribute('href') || innerFeature.getAttribute('href') || '#';
        const media = mediaAnchor.querySelector(':scope > .media');
        if (media) row.append(media);
        const copy = document.createElement('div');
        while (innerFeature.firstChild) copy.append(innerFeature.firstChild);
        copyShell.querySelectorAll(':scope > .arrow-link').forEach((link) => {
          const span = document.createElement('span');
          span.className = link.className;
          span.innerHTML = link.innerHTML;
          copy.append(span);
        });
        row.append(copy);
        const metaCopy = document.createElement('div');
        while (meta.firstChild) metaCopy.append(meta.firstChild);
        row.append(metaCopy);
        mediaAnchor.replaceWith(row);
        copyShell.remove();
        meta.remove();
      }
    });
  };
  repairSplitAnchorCards();

  const header = document.querySelector('header.top');
  header?.insertAdjacentHTML('beforeend', '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu"><span>Меню</span><i aria-hidden="true"></i></button>');
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `<div class="mobile-menu__backdrop" data-menu-close></div><div class="mobile-menu__panel"><div class="mobile-menu__head"><span>Навигация</span></div><nav aria-label="Мобильная навигация"><a href="${routes.home}">Главная</a><a href="${routes.services}">Услуги</a><a href="${routes.cases}">Кейсы</a><a href="${routes.contacts}">Контакты</a><a href="${routes.articles}">Статьи</a></nav><a class="mobile-menu__phone" href="tel:+78442564554">8 (8442) 56-45-54</a></div>`;
  document.body.append(mobileMenu);
  const menuToggle = document.querySelector('.menu-toggle');
  const closeMobileMenu = ({ restoreFocus = false } = {}) => {
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.inert = true;
    if (restoreFocus) menuToggle?.focus({ preventScroll: true });
  };
  closeMobileMenu();
  menuToggle?.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.inert = !open;
    if (open) {
      window.setTimeout(() => mobileMenu.querySelector('nav a')?.focus({ preventScroll: true }), 0);
    }
  });
  menuToggle?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    menuToggle.click();
  });
  mobileMenu.querySelectorAll('[data-menu-close]').forEach((control) => control.addEventListener('click', () => closeMobileMenu({ restoreFocus: true })));
  mobileMenu.querySelectorAll('a').forEach((control) => control.addEventListener('click', () => closeMobileMenu()));
  const handleMobileMenuKeys = (event) => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.key === 'Escape') {
      closeMobileMenu({ restoreFocus: true });
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...mobileMenu.querySelectorAll('a[href]')].filter((item) => !item.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  document.addEventListener('keydown', handleMobileMenuKeys);
  registerPageCleanup(() => document.removeEventListener('keydown', handleMobileMenuKeys));

  if (page === 'Контакты') {
    // Mark the authored map before the shared live-map branch below runs.
    const authoredMap = document.querySelector('main > .section.container .contact-layout > .map, main .prod-contact-grid > .prod-contact-map, main .prod-contact-reference__map-wrap > .prod-contact-map');
    authoredMap?.classList.add('contacts-map');
  }

  if (page === 'Контакты') {
    document.querySelector('main > .contact-form-section:not(.shared-contact-form-section)')?.remove();
    document.querySelectorAll('main .prod-contact-form-wrap, main > .section.container form.contact-form, main > .prod-container form.contact-form').forEach((formOrWrap) => formOrWrap.remove());
    const contactsMap = document.querySelector('main > .section.container .contact-layout > .map, main .prod-contact-grid > .prod-contact-map, main .prod-contact-reference__map-wrap > .prod-contact-map');
    if (contactsMap) {
      // Keep the authored technical scene and use the same live Yandex source as
      // the shared footer underneath it. The old branch replaced the whole map
      // and silently removed the route, crosshair and coordinate layer.
      contactsMap.className = 'prod-contact-map contacts-map';
      const mapSource = 'https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=constructor%3Ae6e6ea17780f6cf7b5b20ca42957b3a0e608287bd7129a93a53f6f5ba90f2667';
      let embed = contactsMap.querySelector(':scope > .footer-map-embed');
      if (!embed) {
        embed = document.createElement('div');
        embed.className = 'footer-map-embed';
        const authoredImage = contactsMap.querySelector(':scope > img');
        authoredImage?.replaceWith(embed);
        if (!authoredImage) contactsMap.insertAdjacentElement('afterbegin', embed);
      }
      if (!embed.querySelector('iframe')) {
        embed.innerHTML = `<iframe src="${mapSource}" frameborder="0" allowfullscreen="true" allow="geolocation" title="Карта расположения офиса ПДП" loading="eager"></iframe>`;
      }
    }
  }

  document.querySelectorAll('img').forEach((image) => {
    remapInnerImage(image);
    prepareInnerImage(image);
  });
  // The shared footer is part of the first visual pass of every inner page.
  // Do not let lazy-loading leave its official lockup missing from a full-page
  // capture or from the first viewport after the footer comes into view.
  const footerLogo = document.querySelector('.footer-official-logo');
  if (footerLogo) {
    footerLogo.loading = 'eager';
    footerLogo.fetchPriority = 'high';
  }
  document.querySelectorAll('.footer-map-image').forEach((image) => {
    image.loading = 'eager';
    image.fetchPriority = 'low';
  });
  document.querySelectorAll('.footer-map-embed iframe').forEach((frame) => {
    frame.src = frame.src.replace('a93a53a53f6', 'a93a53f6');
    frame.loading = 'eager';
    frame.title = frame.title || 'Карта расположения офиса ПДП';
  });

  const contactIconMarkup = [
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4V7C4 14 10 20 17 20H21V17L16 15L14 17C10 16 7 13 6 9L8 7L7 3Z"></path></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"></rect><path d="m4 7 8 6 8-6"></path></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.4 7-12A7 7 0 0 0 5 9c0 5.6 7 12 7 12Z"></path><circle cx="12" cy="9" r="2.2"></circle></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7v5l3.5 2"></path></svg>'
  ];
  document.querySelectorAll('.contact-fact .fact-icon').forEach((slot, index) => {
    if (contactIconMarkup[index]) slot.innerHTML = contactIconMarkup[index];
  });

  document.querySelector('.not-found-actions .button.hot')?.setAttribute('href', routes.home);

  const messages = {
    error: 'Проверьте отмеченные поля.',
    consent: 'Подтвердите согласие на обработку данных.',
    ready: 'Письмо подготовлено. Открываем почтовый клиент…'
  };

  const ensureError = (control, name) => {
    if (!control || !name) return;
    const wrapper = control.closest('.form-field, .field, .form-consent, .check') || control.parentElement;
    if (!wrapper || wrapper.querySelector(`[data-error-for="${name}"]`)) return;
    const error = document.createElement('small');
    error.className = 'form-error';
    error.dataset.errorFor = name;
    wrapper.append(error);
  };

  const setInvalid = (control, invalid, message = '') => {
    if (!control) return;
    const wrapper = control.closest('.form-field, .field, .form-consent, .check') || control.parentElement;
    wrapper?.classList.toggle('is-invalid', Boolean(invalid));
    control.setAttribute('aria-invalid', String(Boolean(invalid)));
    const error = wrapper?.querySelector('[data-error-for]');
    if (error) error.textContent = invalid ? message : '';
  };

  const bindForm = (form) => {
    if (form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';
    form.noValidate = true;

    const inputs = [...form.querySelectorAll('input')];
    const name = form.querySelector('[name="name"]') || inputs.find((input) => input.type === 'text') || inputs[0];
    const contact = form.querySelector('[name="contact"]') || inputs.filter((input) => input.type !== 'checkbox' && input.type !== 'radio')[1];
    const textarea = form.querySelector('textarea');
    const consent = form.querySelector('[name="consent"]') || form.querySelector('input[type="checkbox"]');
    if (name) name.name = 'name';
    if (contact) contact.name = 'contact';
    if (textarea) textarea.name = 'message';
    if (name) name.required = true;
    if (contact) contact.required = true;
    if (consent) consent.name = 'consent';
    form.querySelector('button')?.setAttribute('type', 'submit');
    ensureError(name, 'name');
    ensureError(contact, 'contact');
    if (textarea) ensureError(textarea, 'message');
    if (consent) ensureError(consent, 'consent');

    const status = form.querySelector('.form-status') || (() => {
      const element = document.createElement('p');
      element.className = 'form-status';
      element.setAttribute('aria-live', 'polite');
      form.append(element);
      return element;
    })();
    const contactLabel = form.querySelector('[data-contact-label]');
    const channelConfig = {
      phone: {label: 'Телефон', type: 'tel', placeholder: '+7 999 000-00-00'},
      email: {label: 'Email', type: 'email', placeholder: 'mail@company.ru'},
      messenger: {label: 'Телефон для мессенджера', type: 'tel', placeholder: '+7 999 000-00-00'}
    };
    const syncChannel = () => {
      const value = form.querySelector('[name="channel"]:checked')?.value || 'phone';
      const config = channelConfig[value] || channelConfig.phone;
      if (contactLabel) contactLabel.textContent = config.label;
      if (contact) { contact.type = config.type; contact.placeholder = config.placeholder; contact.inputMode = config.type === 'email' ? 'email' : 'tel'; }
    };
    form.querySelectorAll('[name="channel"]').forEach((radio) => radio.addEventListener('change', syncChannel));
    syncChannel();
    form.querySelectorAll('input,textarea').forEach((control) => control.addEventListener('input', () => { setInvalid(control, false); status.textContent = ''; }));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const channel = form.querySelector('[name="channel"]:checked')?.value || 'phone';
      const nameValue = name?.value.trim() || '';
      const contactValue = contact?.value.trim() || '';
      const messageValue = textarea?.value.trim() || '';
      const contactValid = channel === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue) : contactValue.replace(/\D/g, '').length >= 10;
      const errors = {
        name: nameValue.length < 2,
        contact: !contactValid,
        message: Boolean(textarea && messageValue.length < 8),
        consent: Boolean(consent && !consent.checked)
      };
      setInvalid(name, errors.name, 'Укажите имя — минимум 2 символа.');
      setInvalid(contact, errors.contact, channel === 'email' ? 'Укажите корректный email.' : 'Укажите телефон — минимум 10 цифр.');
      if (textarea) setInvalid(textarea, errors.message, 'Опишите задачу — минимум 8 символов.');
      if (consent) setInvalid(consent, errors.consent, messages.consent);
      if (Object.values(errors).some(Boolean)) { status.textContent = errors.consent ? messages.consent : messages.error; form.classList.remove('is-shaking'); requestAnimationFrame(() => form.classList.add('is-shaking')); return; }
      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      status.textContent = messages.ready;
      const subject = 'Запрос предварительного разбора проекта';
      const body = [`Имя: ${nameValue}`, `Контакт: ${contactValue}`, messageValue ? `Задача: ${messageValue}` : ''].filter(Boolean).join('\n');
      window.location.href = `mailto:mail@ooopdp.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.setTimeout(() => { if (button) button.disabled = false; }, 900);
    });
  };

  /* Keep the inner CTA behavior identical to the protected homepage form. */
  const bindHomepageContactForm = (contactForm) => {
    if (contactForm.dataset.bound === 'true') return;
    contactForm.dataset.bound = 'true';
    contactForm.noValidate = true;

    const formStatus = contactForm.querySelector('[data-form-status]');
    const contactInput = contactForm.elements.namedItem('contact');
    const contactLabel = contactForm.querySelector('[data-contact-label]');
    const contactConfigs = {
      phone: { label: 'Телефон', type: 'tel', inputMode: 'tel', autocomplete: 'tel', placeholder: '+7 999 000-00-00' },
      email: { label: 'Email', type: 'email', inputMode: 'email', autocomplete: 'email', placeholder: 'mail@company.ru' },
      messenger: { label: 'Телефон для мессенджера', type: 'tel', inputMode: 'tel', autocomplete: 'tel', placeholder: '+7 999 000-00-00' }
    };
    const contactDrafts = { phone: '', email: '', messenger: '' };
    let activeContactChannel = null;

    const setFormError = (name, message) => {
      const field = contactForm.elements.namedItem(name);
      const error = contactForm.querySelector(`[data-error-for="${name}"]`);
      const element = field instanceof Element ? field : null;
      const wrapper = element?.closest('.form-field') || element?.closest('.form-consent');
      wrapper?.classList.toggle('is-invalid', Boolean(message));
      element?.setAttribute('aria-invalid', String(Boolean(message)));
      if (error) error.textContent = message;
    };

    const syncContactField = () => {
      if (!(contactInput instanceof HTMLInputElement)) return;
      const channel = String(new FormData(contactForm).get('channel') || 'phone');
      if (activeContactChannel && activeContactChannel in contactDrafts) contactDrafts[activeContactChannel] = contactInput.value;
      const config = contactConfigs[channel] || contactConfigs.phone;
      activeContactChannel = channel in contactDrafts ? channel : 'phone';
      contactInput.value = contactDrafts[activeContactChannel];
      contactInput.type = config.type;
      contactInput.inputMode = config.inputMode;
      contactInput.autocomplete = config.autocomplete;
      contactInput.placeholder = config.placeholder;
      if (contactLabel) contactLabel.textContent = config.label;
      contactInput.setCustomValidity('');
      setFormError('contact', '');
    };

    contactForm.addEventListener('input', (event) => {
      if (event.target === contactInput && activeContactChannel) contactDrafts[activeContactChannel] = contactInput.value;
      if (event.target.name && event.target.name !== 'channel') setFormError(event.target.name, '');
      if (formStatus) formStatus.textContent = '';
    });
    contactForm.addEventListener('change', (event) => {
      if (event.target.name && event.target.name !== 'channel') setFormError(event.target.name, '');
      if (event.target.name === 'channel') syncContactField();
    });
    syncContactField();

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const channel = String(formData.get('channel') || 'phone');
      const contact = String(formData.get('contact') || '').trim();
      const validContact = channel === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
        : contact.replace(/\D/g, '').length >= 10;
      const errors = {
        name: name.length < 2 ? 'Укажите имя — минимум 2 символа.' : '',
        contact: validContact ? '' : channel === 'email' ? 'Укажите корректный email.' : 'Укажите телефон — минимум 10 цифр.',
        consent: formData.get('consent') ? '' : 'Подтвердите согласие на обработку данных.'
      };
      Object.entries(errors).forEach(([field, message]) => setFormError(field, message));
      const firstInvalid = Object.keys(errors).find((field) => errors[field]);
      if (firstInvalid) {
        contactForm.elements.namedItem(firstInvalid)?.focus();
        if (formStatus) formStatus.textContent = 'Проверьте отмеченные поля.';
        return;
      }

      const submitButton = contactForm.querySelector('.form-submit');
      submitButton.disabled = true;
      const channelLabel = channel === 'email' ? 'email' : channel === 'messenger' ? 'указанному номеру в мессенджере' : 'телефону';
      if (formStatus) formStatus.textContent = `Письмо подготовлено. После отправки ПДП ответит по ${channelLabel} и согласует следующий шаг.`;
      const subject = `Запрос предварительного разбора проекта — ${name}`;
      const body = [
        `Имя: ${name}`,
        `Предпочтительный способ связи: ${channel === 'email' ? 'Email' : channel === 'messenger' ? 'Мессенджер' : 'Телефон'}`,
        `${channel === 'email' ? 'Email' : channel === 'messenger' ? 'Телефон для мессенджера' : 'Телефон'}: ${contact}`
      ].filter(Boolean).join('\n');
      queueMicrotask(() => {
        window.location.href = `mailto:mail@ooopdp.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
      if (window.PDPMotion?.after) {
        window.PDPMotion.after('formFeedback', () => { submitButton.disabled = false; }, { motion: false });
      } else {
        window.setTimeout(() => { submitButton.disabled = false; }, 900);
      }
    });
  };

  document.querySelectorAll('form.contact-form').forEach((form) => {
    if (form.closest('.shared-contact-form-section')) bindHomepageContactForm(form);
    else bindForm(form);
  });

  document.querySelectorAll('.footer-map-image').forEach((image) => {
    image.width = 500;
    image.height = 400;
  });

  const setupFilters = () => {
    const productionCatalogTabs = [...document.querySelectorAll('.prod-catalog-tabs a')];
    const productionCatalogItems = [...document.querySelectorAll('.prod-catalog-row, .prod-catalog-feature, .prod-catalog-card')];
    if (productionCatalogTabs.length && productionCatalogItems.length) {
      const categories = productionCatalogItems.map((item, index) => item.dataset.category || ['industrial', 'public', 'public', 'sports', 'industrial', 'public', 'engineering'][index]);
      const sections = [...new Set(productionCatalogItems.map((item) => item.closest('section')).filter(Boolean))];
      const applyCatalogFilter = (selected) => {
        productionCatalogItems.forEach((item, itemIndex) => {
          item.classList.toggle('is-filtered-out', selected !== 'all' && categories[itemIndex] !== selected);
        });
        sections.forEach((section) => {
          const hasVisibleItem = section.querySelector('.prod-catalog-row:not(.is-filtered-out), .prod-catalog-feature:not(.is-filtered-out), .prod-catalog-card:not(.is-filtered-out)');
          section.classList.toggle('is-filtered-out', !hasVisibleItem);
        });
        window.dispatchEvent(new CustomEvent('pdp:catalog-filter'));
      };
      const visibleCatalogItems = '.prod-catalog-row:not(.is-filtered-out), .prod-catalog-feature:not(.is-filtered-out), .prod-catalog-card:not(.is-filtered-out)';
      productionCatalogTabs.forEach((tab) => tab.addEventListener('click', (event) => {
        event.preventDefault();
        const update = () => {
          productionCatalogTabs.forEach((item) => item.removeAttribute('aria-current'));
          tab.setAttribute('aria-current', 'page');
          applyCatalogFilter((tab.getAttribute('href') || '#all').slice(1) || 'all');
        };
        const motion = window.Motion;
        const shouldAnimate = event.detail !== 0
          && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          && typeof motion?.animateView === 'function';
        if (!shouldAnimate) {
          update();
          return;
        }
        motion.animateView(update, {
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
          interrupt: 'immediate'
        })
          .add(visibleCatalogItems)
          .layout({ duration: 0.28, ease: [0.22, 1, 0.36, 1] })
          .exit({ opacity: 0, transform: 'translate3d(0, -8px, 0)' }, { duration: 0.16 })
          .enter({ opacity: [0, 1], transform: ['translate3d(0, 8px, 0)', 'translate3d(0, 0, 0)'] }, { duration: 0.24 });
      }));
    }
    const catalogTabs = [...document.querySelectorAll('.catalog-tabs button')];
    const catalogItems = [...document.querySelectorAll('.catalog-feature, .grid-3 > .article-card')];
    if (catalogTabs.length && catalogItems.length) {
      const categories = ['industrial', 'public', 'public', 'industrial', 'engineering', 'public'];
      catalogTabs.forEach((tab, index) => tab.addEventListener('click', () => {
        catalogTabs.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === index));
        const selected = ['all', 'industrial', 'public', 'sports', 'engineering'][index] || 'all';
        catalogItems.forEach((item, itemIndex) => item.classList.toggle('is-filtered-out', selected !== 'all' && categories[itemIndex] !== selected));
      }));
    }
    const newsTabs = [...document.querySelectorAll('.filter-tabs a')];
    const newsItems = [...document.querySelectorAll('.article-grid > a')];
    newsTabs.forEach((tab, index) => tab.addEventListener('click', (event) => {
      event.preventDefault();
      newsTabs.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === index));
      const selected = ['all', 'technical', 'project', 'construction', 'management', 'norms'][index] || 'all';
      newsItems.forEach((item, itemIndex) => item.classList.toggle('is-filtered-out', selected !== 'all' && itemIndex !== Math.max(0, index - 1)));
    }));
  };
  setupFilters();

  const setupV25Services = () => {
    if (!document.body.classList.contains('production-services')) return;
    const board = document.querySelector('.prod-service-board');
    const rows = [...document.querySelectorAll('.prod-service-row')];
    const media = [...document.querySelectorAll('.prod-service-media')];
    if (!board || !rows.length || !media.length) return;
    let hoveredIndex = null;
    const setActive = (index) => {
      const safeIndex = Math.max(0, Math.min(index, Math.min(rows.length, media.length) - 1));
      board.dataset.activeService = String(safeIndex + 1).padStart(2, '0');
      rows.forEach((row, rowIndex) => row.classList.toggle('is-active', rowIndex === safeIndex));
      media.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === safeIndex));
    };
    setActive(0);
    rows.forEach((row, index) => {
      row.dataset.serviceIndex = String(index);
      row.addEventListener('pointerenter', () => { hoveredIndex = index; setActive(index); });
      row.addEventListener('focusin', () => setActive(index));
      row.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
        const rect = row.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - .5) * 14;
        const y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - .5) * 10;
        board.style.setProperty('--service-media-x', `${x.toFixed(2)}px`);
        board.style.setProperty('--service-media-y', `${y.toFixed(2)}px`);
      });
      row.addEventListener('pointerleave', () => {
        hoveredIndex = null;
        board.style.setProperty('--service-media-x', '0px');
        board.style.setProperty('--service-media-y', '0px');
      });
    });
    if ('IntersectionObserver' in window && window.matchMedia('(min-width: 1200px)').matches) {
      const observer = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting && hoveredIndex === null).forEach((entry) => setActive(Number(entry.target.dataset.serviceIndex) || 0));
      }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
      rows.forEach((row) => observer.observe(row));
    }

    const process = document.querySelector('[data-process-track]');
    const processSteps = [...document.querySelectorAll('[data-process-step]')];
    if (!process || !processSteps.length) return;
    const setProcessActive = (index) => {
      const safeIndex = Math.max(0, Math.min(index, processSteps.length - 1));
      process.dataset.activeStep = String(safeIndex + 1).padStart(2, '0');
      processSteps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === safeIndex));
      process.style.setProperty('--process-progress', String(safeIndex / Math.max(processSteps.length - 1, 1)));
    };
    setProcessActive(0);
    if ('IntersectionObserver' in window && window.matchMedia('(min-width: 701px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const processObserver = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => setProcessActive(processSteps.indexOf(entry.target)));
      }, { rootMargin: '-40% 0px -42% 0px', threshold: 0 });
      processSteps.forEach((step) => processObserver.observe(step));
    }
  };

  const setupV25Timeline = () => {
    if (!document.body.classList.contains('production-service-detail')) return;
    const timeline = document.querySelector('.prod-composition');
    const steps = [...document.querySelectorAll('.prod-composition__item')];
    if (!timeline || !steps.length) return;
    timeline.dataset.technicalTimeline = 'true';
    const progress = document.createElement('span');
    progress.className = 'prod-timeline-progress';
    progress.setAttribute('aria-hidden', 'true');
    timeline.append(progress);
    const setActive = (index) => {
      const safeIndex = Math.max(0, Math.min(index, steps.length - 1));
      timeline.dataset.activeStep = String(safeIndex + 1).padStart(2, '0');
      steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === safeIndex));
      progress.style.setProperty('--timeline-progress-scale', String((safeIndex + 1) / steps.length));
    };
    setActive(0);
    const motion = window.Motion;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 701px)').matches;
    if (!reduced && desktop && typeof motion?.animate === 'function' && typeof motion?.scroll === 'function') {
      const progressAnimation = motion.animate(progress, {
        transform: ['scaleX(0)', 'scaleX(1)']
      }, { ease: 'linear' });
      const stopProgress = motion.scroll(progressAnimation, {
        target: timeline,
        offset: ['start 70%', 'end 40%'],
        trackContentSize: true
      });
      window.dispatchEvent(new Event('scroll'));
      registerPageCleanup(() => {
        stopProgress?.();
        progressAnimation?.cancel?.();
      });
    }
    if ('IntersectionObserver' in window && window.matchMedia('(min-width: 701px)').matches) {
      const observer = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => setActive(steps.indexOf(entry.target)));
      }, { rootMargin: '-48% 0px -38% 0px', threshold: 0 });
      steps.forEach((step) => observer.observe(step));
    }
  };

  const setupV25Workflow = () => {
    if (!document.body.classList.contains('production-services')) return;
    const workflow = document.querySelector('.prod-services-reference__workflow');
    const image = workflow?.querySelector('.prod-services-reference__workflow-media img');
    const counter = workflow?.querySelector('.prod-services-reference__workflow-media span');
    const arrows = [...(workflow?.querySelectorAll('.prod-services-reference__arrows button') || [])];
    if (!workflow || !image || !counter || arrows.length < 2) return;

    const slides = [
      ['../assets/cases/polyclinic-render-front.jpg', 'Проект поликлиники №31'],
      ['../assets/cases/red-october-render-user.jpg', 'Красный Октябрь'],
      ['../assets/archive-optimized/PDP-OBJ-006.jpg', 'КЦ-4 Северсталь'],
      ['../assets/archive-optimized/PDP-OBJ-068.jpg', 'ЕвроХим-ВолгаКалий']
    ];
    let activeIndex = 0;
    let swapTimer = 0;
    const formatCounter = (index) => `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

    const render = (nextIndex, direction) => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      workflow.dataset.workflowDirection = direction;
      workflow.classList.add('is-swapping');
      window.clearTimeout(swapTimer);
      swapTimer = window.setTimeout(() => {
        const [source, alt] = slides[activeIndex];
        image.src = source;
        image.alt = alt;
        counter.textContent = formatCounter(activeIndex);
        requestAnimationFrame(() => workflow.classList.remove('is-swapping'));
      }, 120);
    };

    counter.textContent = formatCounter(activeIndex);
    arrows[0].addEventListener('click', () => render(activeIndex - 1, 'prev'));
    arrows[1].addEventListener('click', () => render(activeIndex + 1, 'next'));
  };

  const setupV25CaseStory = () => {
    if (!document.body.classList.contains('production-case')) return;
    const blocks = [...document.querySelectorAll('.prod-two-columns')].filter((block) => block.querySelector('h2'));
    const result = [...document.querySelectorAll('.prod-section h2')].find((heading) => /результат/i.test(heading.textContent || ''));
    if (!blocks.length || !result) return;
    const storyStart = blocks[0];
    const storyEnd = result.closest('.prod-section');
    storyStart.classList.add('prod-case-story-start');
    storyStart.id = 'case-task';
    blocks[1]?.setAttribute('id', 'case-solution');
    storyEnd?.setAttribute('id', 'case-result');
    const rail = document.createElement('nav');
    rail.className = 'prod-case-story-rail';
    rail.setAttribute('aria-label', 'Навигация по кейсу');
    rail.innerHTML = '<a href="#case-task" class="is-active"><span>01</span>Задача</a><a href="#case-solution"><span>02</span>Решение</a><a href="#case-result"><span>03</span>Результат</a>';
    storyStart.parentNode?.insertBefore(rail, storyStart);
    const links = [...rail.querySelectorAll('a')];
    const targets = [storyStart, blocks[1], storyEnd].filter(Boolean);
    const activate = (index) => links.forEach((link, linkIndex) => link.classList.toggle('is-active', linkIndex === index));
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => activate(Math.max(0, targets.indexOf(entry.target))));
      }, { rootMargin: '-35% 0px -52% 0px', threshold: 0 });
      targets.forEach((target) => observer.observe(target));
    }
  };

  const setupV25Clients = () => {
    if (!document.body.classList.contains('production-projects')) return;
    const strip = document.querySelector('.prod-client-strip');
    const clients = [...document.querySelectorAll('.prod-client')];
    if (!strip || !clients.length || strip.nextElementSibling?.classList.contains('prod-client-focus')) return;
    const focus = document.createElement('section');
    focus.className = 'prod-client-focus';
    focus.setAttribute('aria-label', 'Выбранный заказчик');
    focus.innerHTML = '<div class="prod-client-focus__copy"><span class="prod-eyebrow">Клиент / объект</span><strong></strong><small></small></div><div class="prod-client-focus__media"><img alt=""></div>';
    strip.insertAdjacentElement('afterend', focus);
    const title = focus.querySelector('strong');
    const detail = focus.querySelector('small');
    const image = focus.querySelector('img');
    const data = [
      ['ALAN KZ', 'Футбольная инфраструктура', 'cases/astana-arena.jpg'],
      ['Красный Октябрь', 'Промышленное производство', 'archive-optimized/PDP-OBJ-007.jpg'],
      ['Северсталь', 'Металлургическая компания', 'archive-optimized/PDP-OBJ-006.jpg'],
      ['ЕвроХим-ВолгаКалий', 'Горно-химическое производство', 'archive-optimized/PDP-OBJ-068.jpg']
    ];
    const setActive = (index) => {
      const item = data[index] || data[0];
      clients.forEach((client, clientIndex) => client.classList.toggle('is-active', clientIndex === index));
      title.textContent = item[0];
      detail.textContent = item[1];
      image.classList.remove('is-loaded');
      image.src = asset(item[2]);
      image.alt = item[0];
      image.addEventListener('load', () => image.classList.add('is-loaded'), { once: true });
    };
    clients.forEach((client, index) => {
      client.addEventListener('pointerenter', () => setActive(index));
      client.addEventListener('focusin', () => setActive(index));
      client.addEventListener('click', () => setActive(index));
    });
    setActive(0);
  };

  const setupV25Gallery = () => {
    if (!document.body.classList.contains('production-case')) return;
    const figures = [...document.querySelectorAll('.prod-gallery figure')];
    const images = figures.map((figure) => figure.querySelector('img')).filter(Boolean);
    if (!images.length || document.querySelector('.prod-gallery-viewer')) return;
    const viewer = document.createElement('div');
    viewer.className = 'prod-gallery-viewer';
    viewer.hidden = true;
    viewer.innerHTML = '<div class="prod-gallery-viewer__backdrop" data-gallery-close></div><div class="prod-gallery-viewer__panel" role="dialog" aria-modal="true" aria-label="Просмотр галереи"><button type="button" class="prod-gallery-viewer__close" data-gallery-close aria-label="Закрыть">×</button><button type="button" class="prod-gallery-viewer__prev" data-gallery-prev aria-label="Предыдущее изображение">←</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="prod-gallery-viewer__next" data-gallery-next aria-label="Следующее изображение">→</button></div>';
    document.body.append(viewer);
    const viewerImage = viewer.querySelector('img');
    const caption = viewer.querySelector('figcaption');
    let current = 0;
    const render = () => {
      const source = images[current];
      viewerImage.src = source.currentSrc || source.src;
      viewerImage.alt = source.alt || '';
      caption.textContent = `${String(current + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}  ${source.alt || 'Проектная галерея'}`;
    };
    const open = (index) => { current = index; render(); viewer.hidden = false; document.body.classList.add('gallery-viewer-open'); viewer.querySelector('.prod-gallery-viewer__close')?.focus(); };
    const close = () => { viewer.hidden = true; document.body.classList.remove('gallery-viewer-open'); };
    images.forEach((image, index) => { image.tabIndex = 0; image.addEventListener('click', () => open(index)); image.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(index); } }); });
    viewer.querySelector('[data-gallery-close]')?.addEventListener('click', close);
    viewer.querySelector('[data-gallery-prev]')?.addEventListener('click', () => { current = (current - 1 + images.length) % images.length; render(); });
    viewer.querySelector('[data-gallery-next]')?.addEventListener('click', () => { current = (current + 1) % images.length; render(); });
    document.addEventListener('keydown', (event) => { if (viewer.hidden) return; if (event.key === 'Escape') close(); if (event.key === 'ArrowLeft') { current = (current - 1 + images.length) % images.length; render(); } if (event.key === 'ArrowRight') { current = (current + 1) % images.length; render(); } });
    render();
  };

  const setupWorksHoverGrid = () => {
    if (!document.body.classList.contains('production-catalog')) return;
    const desktopHover = window.matchMedia('(min-width: 1200px) and (hover: hover) and (pointer: fine)');
    if (!desktopHover.matches) return;
    const items = [...document.querySelectorAll('.prod-catalog-row')];
    if (!items.length) return;

    const layer = document.createElement('div');
    layer.className = 'prod-hovergrid-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.append(layer);
    document.body.dataset.worksHovergrid = 'ready';
    const interactionController = new AbortController();

    let activeItem = null;
    let activeTiles = [];
    let enterTimer = 0;
    let closeTimer = 0;
    let positionRaf = 0;
    let activeIndex = -1;

    const uniqueSources = (item) => [...new Set(
      [...item.querySelectorAll('[data-hover-image]')]
        .map((image) => image.currentSrc || image.src)
        .filter(Boolean)
    )].slice(0, 4);

    const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));
    const safeMediaRect = (item) => {
      const rect = item.getBoundingClientRect();
      return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    };

    const layouts = [
      { left: .16, top: -1.48, width: .22, height: 1.52, dir: 'left', rotate: '-2deg' },
      { left: .48, top: -.92, width: .18, height: 1.34, dir: 'top', rotate: '1.5deg' },
      { left: .05, top: .88, width: .24, height: 1.45, dir: 'bottom', rotate: '1deg' },
      { left: .68, top: .54, width: .20, height: 1.38, dir: 'right', rotate: '-1.5deg' }
    ];
    const directions = {
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
      top: 'inset(100% 0 0 0)',
      bottom: 'inset(0 0 100% 0)'
    };

    const positionTiles = () => {
      if (!activeItem || !activeTiles.length) return;
      const safe = safeMediaRect(activeItem);
      const headerBottom = document.querySelector('header.top')?.getBoundingClientRect().bottom || 0;
      activeTiles.forEach(({ element, layout }, tileIndex) => {
        const width = Math.min(Math.max(safe.width * layout.width, 214), window.innerWidth * .24);
        const height = Math.min(Math.max(safe.height * layout.height, 148), window.innerHeight * .27);
        const x = clamp(safe.left + safe.width * layout.left, 14, window.innerWidth - width - 14);
        const y = clamp(safe.top + safe.height * layout.top, headerBottom + 16, window.innerHeight - height - 14);
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.setProperty('--rotate', layout.rotate);
        element.style.setProperty('--clip', directions[layout.dir]);
        element.style.setProperty('--offset-x', tileIndex % 2 ? '24px' : '-24px');
        element.style.setProperty('--offset-y', tileIndex % 2 ? '-24px' : '24px');
      });
    };

    const schedulePosition = () => {
      if (positionRaf) return;
      positionRaf = requestAnimationFrame(() => { positionRaf = 0; positionTiles(); });
    };

    const clearLayer = () => {
      layer.replaceChildren();
      layer.classList.remove('is-open', 'is-active', 'is-closing');
      activeTiles = [];
    };

    const close = () => {
      window.clearTimeout(enterTimer);
      if (!activeItem) return;
      window.clearTimeout(closeTimer);
      activeItem = null;
      layer.classList.remove('is-open', 'is-active');
      layer.classList.add('is-closing');
      closeTimer = window.setTimeout(clearLayer, 560);
    };

    const open = (item, index) => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(closeTimer);
      if (activeItem === item || item.classList.contains('is-filtered-out')) return;
      clearLayer();
      activeItem = item;
      activeIndex = index;
      const sources = uniqueSources(item);
      activeTiles = sources.map((source, tileIndex) => {
        const element = document.createElement('figure');
        element.className = 'prod-hovergrid-tile';
        element.style.setProperty('--delay', `${tileIndex * 32}ms`);
        const image = document.createElement('img');
        image.src = source;
        image.alt = item.querySelector('h3')?.textContent?.trim() || 'Проект';
        element.append(image);
        layer.append(element);
        return { element, layout: layouts[tileIndex % layouts.length] };
      });
      positionTiles();
      enterTimer = window.setTimeout(() => {
        layer.classList.add('is-active');
        requestAnimationFrame(() => layer.classList.add('is-open'));
      }, 48);
    };

    items.forEach((trigger, index) => {
      const item = items[index];
      const options = { signal: interactionController.signal };
      trigger.addEventListener('pointerenter', () => open(item, index), options);
      trigger.addEventListener('focusin', () => open(item, index), options);
      trigger.addEventListener('pointerleave', close, options);
      trigger.addEventListener('focusout', (event) => { if (!trigger.contains(event.relatedTarget)) close(); }, options);
    });
    window.addEventListener('scroll', schedulePosition, { passive: true, signal: interactionController.signal });
    window.addEventListener('resize', schedulePosition, { signal: interactionController.signal });
    window.addEventListener('pdp:catalog-filter', () => close(), { signal: interactionController.signal });
    registerPageCleanup(() => {
      interactionController.abort();
      window.clearTimeout(enterTimer);
      window.clearTimeout(closeTimer);
      if (positionRaf) window.cancelAnimationFrame(positionRaf);
      layer.remove();
    });
  };

  const setupContactsMapMotion = () => {
    if (!document.body.classList.contains('production-contacts')) return;
    const map = document.querySelector('.prod-contact-map');
    if (!map) return;
    const reveal = () => map.classList.add('is-visible');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        observer.disconnect();
      }
    }, { threshold: .22, rootMargin: '0px 0px -8% 0px' });
    observer.observe(map);
    registerPageCleanup(() => observer.disconnect());
  };

  const setupNewsEditorial = () => {
    if (!document.body.classList.contains('production-news')) return;
    const grid = document.querySelector('[data-news-grid]');
    const items = [...document.querySelectorAll('[data-news-item]')];
    const tabs = [...document.querySelectorAll('.production-news .prod-catalog-tabs a')];
    if (!grid || !items.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopHover = window.matchMedia('(min-width: 701px) and (hover: hover) and (pointer: fine)').matches;
    const interactionController = new AbortController();
    let newsObserver = null;
    let previewCloseTimer = 0;
    let filterAnimations = [];
    const categoryMatch = (item, selected) => selected === 'all' || (item.dataset.category || '').split(/\s+/).includes(selected);
    const visibleItems = () => items.filter((item) => !item.classList.contains('is-filtered-out'));

    const applyFilter = (selected) => {
      filterAnimations.forEach((animation) => animation.cancel());
      filterAnimations = [];
      const first = new Map(visibleItems().map((item) => [item, item.getBoundingClientRect()]));
      items.forEach((item) => item.classList.toggle('is-filtered-out', !categoryMatch(item, selected)));
      const next = visibleItems();
      if (reduced) return;
      next.forEach((item) => {
        const from = first.get(item);
        const to = item.getBoundingClientRect();
        if (!from) {
          filterAnimations.push(item.animate([
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }));
          return;
        }
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        filterAnimations.push(item.animate([
          { transform: `translate3d(${dx}px, ${dy}px, 0)` },
          { transform: 'translate3d(0, 0, 0)' }
        ], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }));
      });
    };

    tabs.forEach((tab) => tab.addEventListener('click', (event) => {
      event.preventDefault();
      tabs.forEach((item) => item.removeAttribute('aria-current'));
      tab.setAttribute('aria-current', 'page');
      applyFilter((tab.getAttribute('href') || '#all').slice(1) || 'all');
    }, { signal: interactionController.signal }));

    if ('IntersectionObserver' in window && !reduced) {
      newsObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-news-visible');
      }), { threshold: .08, rootMargin: '0px 0px -10% 0px' });
      items.forEach((item) => newsObserver.observe(item));
    } else {
      items.forEach((item) => item.classList.add('is-news-visible'));
    }

    registerPageCleanup(() => {
      filterAnimations.forEach((animation) => animation.cancel());
      newsObserver?.disconnect();
      interactionController.abort();
      window.clearTimeout(previewCloseTimer);
    });

    if (!desktopHover || reduced) return;
    const layer = document.createElement('div');
    layer.className = 'prod-article-preview-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.append(layer);
    let previewImage = null;
    let previewItem = null;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));
    const positionPreview = (event) => {
      if (!previewItem || !previewImage) return;
      const rect = previewItem.getBoundingClientRect();
      const width = 260;
      const height = 174;
      const x = clamp(rect.right - width, 16, window.innerWidth - width - 16);
      const center = rect.top + rect.height / 2;
      const drift = clamp((event.clientY - center) * .14, -18, 18);
      const y = clamp(center - height / 2 + drift, 96, window.innerHeight - height - 18);
      previewImage.style.left = `${x}px`;
      previewImage.style.top = `${y}px`;
    };
    const closePreview = () => {
      previewItem = null;
      layer.classList.remove('is-open');
      window.clearTimeout(previewCloseTimer);
      previewCloseTimer = window.setTimeout(() => { if (!previewItem) layer.replaceChildren(); }, 280);
    };
    const openPreview = (item, event) => {
      const source = item.querySelector('[data-preview-image]');
      if (!source) return;
      previewItem = item;
      layer.replaceChildren();
      previewImage = document.createElement('img');
      previewImage.src = source.currentSrc || source.src;
      previewImage.alt = source.alt || '';
      layer.append(previewImage);
      positionPreview(event);
      requestAnimationFrame(() => layer.classList.add('is-open'));
    };
    items.filter((item) => item.matches('.prod-news-index-row')).forEach((item) => {
      const options = { signal: interactionController.signal };
      item.addEventListener('pointerenter', (event) => openPreview(item, event), options);
      item.addEventListener('pointermove', positionPreview, options);
      item.addEventListener('pointerleave', closePreview, options);
      item.addEventListener('focusin', (event) => openPreview(item, event), options);
      item.addEventListener('focusout', (event) => { if (!item.contains(event.relatedTarget)) closePreview(); }, options);
    });
    registerPageCleanup(() => layer.remove());
  };

  setupV25Services();
  setupV25Workflow();
  setupV25Timeline();
  setupV25CaseStory();
  setupV25Clients();
  setupV25Gallery();
  setupWorksHoverGrid();
  setupContactsMapMotion();
  setupNewsEditorial();

  const setupInnerParallax = () => {
    if (!document.body.classList.contains('production-page')) return;
    if (document.documentElement.dataset.innerParallaxReady === 'true') return;
    document.documentElement.dataset.innerParallaxReady = 'true';
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 701px)');

    const objects = [
      ['body.production-services .prod-service-board', 'logo', .13],
      ['body.production-service-detail .prod-composition', 'wireframe', .11],
      ['body.production-service-detail .prod-step-grid', 'logo', .085],
      ['body.production-case .prod-step-grid', 'wireframe', .12],
      ['body.production-documents .prod-process', 'logo', .075],
      ['body.production-contacts .prod-contact-next', 'wireframe', .085],
      ['body.production-404-page .prod-404', 'logo', .105]
    ];

    const ctaSections = [...document.querySelectorAll('body.production-page .shared-contact-form-section')];
    const availableObjectHost = objects.some(([selector]) => document.querySelector(selector));
    if (!availableObjectHost && !ctaSections.length) {
      delete document.documentElement.dataset.innerParallaxReady;
      return;
    }

    let hosts = [];
    let raf = 0;
    let scrollBound = false;
    const enabled = () => !reducedQuery.matches && desktopQuery.matches;
    const removeHosts = () => {
      hosts.forEach(({ host, object }) => {
        object.remove();
        host.classList.remove('inner-parallax-host');
      });
      hosts = [];
    };
    const ensureHosts = () => {
      if (!enabled()) {
        removeHosts();
        return;
      }
      hosts = objects
        .map(([selector, kind, factor]) => {
          const host = document.querySelector(selector);
          if (!host) return null;
          const existing = host.querySelector(':scope > .inner-parallax-object');
          if (existing) return { host, object: existing, factor };
          host.classList.add('inner-parallax-host');
          const object = document.createElement('span');
          object.className = `inner-parallax-object inner-parallax-object--${kind}`;
          object.dataset.parallaxFactor = String(factor);
          object.setAttribute('aria-hidden', 'true');
          host.append(object);
          return { host, object, factor };
        })
        .filter(Boolean);
    };
    const render = () => {
      raf = 0;
      if (!enabled()) {
        removeHosts();
        ctaSections.forEach((section) => section.style.removeProperty('--contacts-cta-parallax-y'));
        return;
      }
      for (const { host, object, factor } of hosts) {
        const rect = host.getBoundingClientRect();
        const centerDelta = window.innerHeight * .5 - (rect.top + rect.height * .5);
        const y = Math.max(-42, Math.min(42, centerDelta * factor * -1));
        object.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
      for (const section of ctaSections) {
        const rect = section.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const y = Math.max(-36, Math.min(36, (progress - .5) * -72));
        section.style.setProperty('--contacts-cta-parallax-y', `${y.toFixed(2)}px`);
      }
    };
    const requestRender = () => {
      if (enabled() && !raf) raf = window.requestAnimationFrame(render);
    };
    const bindScroll = () => {
      if (scrollBound) return;
      window.addEventListener('scroll', requestRender, { passive: true });
      scrollBound = true;
    };
    const unbindScroll = () => {
      if (!scrollBound) return;
      window.removeEventListener('scroll', requestRender);
      scrollBound = false;
    };
    const syncEnabledState = () => {
      if (enabled()) {
        ensureHosts();
        bindScroll();
        requestRender();
        return;
      }
      unbindScroll();
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      removeHosts();
      ctaSections.forEach((section) => section.style.removeProperty('--contacts-cta-parallax-y'));
    };
    window.addEventListener('resize', syncEnabledState, { passive: true });
    reducedQuery.addEventListener('change', syncEnabledState);
    desktopQuery.addEventListener('change', syncEnabledState);
    syncEnabledState();
    registerPageCleanup(() => {
      unbindScroll();
      window.removeEventListener('resize', syncEnabledState);
      reducedQuery.removeEventListener('change', syncEnabledState);
      desktopQuery.removeEventListener('change', syncEnabledState);
      if (raf) window.cancelAnimationFrame(raf);
      removeHosts();
      ctaSections.forEach((section) => section.style.removeProperty('--contacts-cta-parallax-y'));
      delete document.documentElement.dataset.innerParallaxReady;
    });
  };
  const startInnerParallax = () => setupInnerParallax();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInnerParallax, { once: true });
    registerPageCleanup(() => document.removeEventListener('DOMContentLoaded', startInnerParallax));
  } else {
    startInnerParallax();
  }

})();
