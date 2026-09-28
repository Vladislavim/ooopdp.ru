(() => {
  'use strict';

  const page = document.body;
  if (!page || !page.classList.contains('production-services')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interactionController = new AbortController();

  const projectsData = [
    {
      id: 'red-october',
      eyebrow: 'Красный Октябрь · проектирование',
      title: '<span>Проект модернизации</span><br><span>травильного отделения</span>',
      client: '<img src="../assets/logos/krasny-oktyabr.svg" alt="Красный Октябрь" width="148" height="42" loading="lazy">',
      desc: 'Разработка проекта модернизации травильного отделения листопрокатного цеха АО «Корпорация Красный Октябрь».',
      metrics: [
        { val: '2023', label: 'Год выпуска' },
        { val: 'АС', label: 'Раздел чертежей' },
        { val: '05', label: 'Материалов объекта' },
        { val: '100%', label: 'Согласование' }
      ],
      caseUrl: '05-project-red-october.html',
      docUrl: '../assets/documents/red-october-11-2023-as.pdf',
      docText: 'Документация 11-2023-АС (PDF)',
      imageSrc: '../assets/inner-optimized/industrial-pickling-01.webp',
      imageAlt: 'Проект модернизации травильного отделения Красный Октябрь',
      caption: 'ПРОЕКТНЫЕ МАТЕРИАЛЫ'
    },
    {
      id: 'severstal',
      eyebrow: 'Северсталь · инженерия и производство',
      title: '<span>Инженерные решения</span><br><span>для производства</span>',
      client: '<div class="svc-project__client-severstal"><img src="../assets/logos/severstal.svg" width="34" height="34" alt=""><span>Северсталь</span></div>',
      desc: 'Комплексная работа с промышленной инфраструктурой и инженерными системами действующего металлургического объекта.',
      metrics: [
        { val: '2024', label: 'Год реализации' },
        { val: 'ЭС', label: 'Инженерные сети' },
        { val: '02', label: 'Производственных цеха' },
        { val: '100%', label: 'Безопасность систем' }
      ],
      caseUrl: 'project-severstal.html',
      docUrl: 'project-severstal.html',
      docText: 'Материалы объекта (ПАО Северсталь)',
      imageSrc: '../assets/cases/severstal-after.webp',
      imageAlt: 'Инженерные решения для производства Северсталь',
      caption: 'ДЕЙСТВУЮЩИЙ ОБЪЕКТ'
    },
    {
      id: 'eurochem',
      eyebrow: 'ЕвроХим · промышленный комплекс',
      title: '<span>Дизайн-проект</span><br><span>офисных помещений</span>',
      client: '<img src="../assets/logos/eurochem.svg" alt="ЕвроХим" width="156" height="32" loading="lazy">',
      desc: 'Дизайн-проект офисных помещений и рабочая документация для действующего горно-обогатительного предприятия.',
      metrics: [
        { val: '2024', label: 'Год проекта' },
        { val: 'ЭОМ', label: 'Интерьеры и сети' },
        { val: '10.7 МБ', label: 'Рабочий проект' },
        { val: '4 этаж', label: 'Площадь комплекса' }
      ],
      caseUrl: 'project-eurochem.html',
      docUrl: '../assets/documents/eurochem-office-design.pdf',
      docText: 'Дизайн-проект (PDF 10.7 МБ)',
      imageSrc: '../assets/inner-optimized/cases-eurochem-office.webp',
      imageAlt: 'Офисные помещения ЕвроХим',
      caption: 'ДИЗАЙН-ПРОЕКТ'
    },
    {
      id: 'polyclinic',
      eyebrow: 'Поликлиника №31 · общественный объект',
      title: '<span>Проектная документация</span><br><span>реконструкции</span>',
      client: '<div class="svc-project__client-polyclinic"><span class="svc-project__client-badge-icon">№31</span><span>Клиническая поликлиника</span></div>',
      desc: 'Разработка проектной и рабочей документации, архитектурные решения раздела АР1 для городской клинической поликлиники.',
      metrics: [
        { val: '2023', label: 'Год выпуска' },
        { val: 'АР1', label: 'Раздел проекта' },
        { val: '04', label: 'Фасадных решения' },
        { val: '14.1 МБ', label: 'Объем документации' }
      ],
      caseUrl: 'project-polyclinic-31.html',
      docUrl: '../assets/documents/polyclinic-31-ar.pdf',
      docText: 'Документация АР1 (PDF 14.1 МБ)',
      imageSrc: '../assets/inner-optimized/cases-polyclinic-render-front.webp',
      imageAlt: 'Городская поликлиника №31 проектная документация',
      caption: 'РЕКОНСТРУКЦИЯ ОБЪЕКТА'
    }
  ];

  const projectImage = document.querySelector('[data-project-image]');
  const projectSlides = [...document.querySelectorAll('[data-project-slide]')];
  const projectPrev = document.querySelector('[data-project-prev]');
  const projectNext = document.querySelector('[data-project-next]');
  const copyEl = document.querySelector('.svc-project__copy');
  const introInner = document.querySelector('.svc-project .svc-section-intro > div');
  const eyebrowEl = document.querySelector('[data-project-eyebrow]');
  const titleEl = document.querySelector('[data-project-title]');
  const clientEl = document.querySelector('[data-project-client]');
  const descEl = document.querySelector('[data-project-desc]');
  const metricsEl = document.querySelector('[data-project-metrics]');
  const caseBtnEl = document.querySelector('[data-project-case-btn]');
  const docLinkEl = document.querySelector('[data-project-doc-link]');
  const docTextEl = document.querySelector('[data-project-doc-text]');
  const captionEl = document.querySelector('[data-project-caption]');

  let projectIndex = 0;
  let projectAnimation = null;
  let isTransitioning = false;

  const renderProject = (nextIndex) => {
    if (!projectImage || !projectSlides.length || isTransitioning) return;
    const targetIndex = (nextIndex + projectsData.length) % projectsData.length;
    if (targetIndex === projectIndex && projectAnimation) return;

    projectIndex = targetIndex;
    isTransitioning = true;

    projectSlides.forEach((slide, index) => {
      const active = index === projectIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-selected', String(active));
    });

    const item = projectsData[projectIndex];

    const updateDOM = () => {
      if (eyebrowEl) eyebrowEl.textContent = item.eyebrow;
      if (titleEl) titleEl.innerHTML = item.title;
      if (clientEl) clientEl.innerHTML = item.client;
      if (descEl) descEl.textContent = item.desc;
      if (metricsEl) {
        metricsEl.innerHTML = item.metrics.map(m => `
          <div>
            <strong>${m.val}</strong>
            <span>${m.label}</span>
          </div>
        `).join('');
      }
      if (caseBtnEl) caseBtnEl.href = item.caseUrl;
      if (docLinkEl) docLinkEl.href = item.docUrl;
      if (docTextEl) docTextEl.textContent = item.docText;
      if (captionEl) captionEl.textContent = item.caption;

      projectImage.src = item.imageSrc;
      projectImage.alt = item.imageAlt;
    };

    if (reduceMotion || !projectImage.animate) {
      updateDOM();
      isTransitioning = false;
      return;
    }

    copyEl?.classList.add('is-transitioning');
    introInner?.classList.add('is-transitioning');

    if (projectAnimation) projectAnimation.cancel();
    projectAnimation = projectImage.animate(
      [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0.15, transform: 'scale(1.02)' }],
      { duration: 150, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
    );

    setTimeout(() => {
      updateDOM();
      copyEl?.classList.remove('is-transitioning');
      introInner?.classList.remove('is-transitioning');

      projectAnimation = projectImage.animate(
        [{ opacity: 0.15, transform: 'scale(1.02)' }, { opacity: 1, transform: 'scale(1)' }],
        { duration: 200, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
      );
      projectAnimation.finished.then(() => {
        isTransitioning = false;
      }).catch(() => {
        isTransitioning = false;
      });
    }, 150);
  };

  projectSlides.forEach((slide, index) => {
    const options = { signal: interactionController.signal };
    slide.addEventListener('click', () => renderProject(index), options);
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') renderProject(projectIndex + 1);
      if (event.key === 'ArrowLeft') renderProject(projectIndex - 1);
    }, options);
  });
  projectPrev?.addEventListener('click', () => renderProject(projectIndex - 1), { signal: interactionController.signal });
  projectNext?.addEventListener('click', () => renderProject(projectIndex + 1), { signal: interactionController.signal });

  // Parallax motion for hero pattern and grid logo
  const heroSection = document.querySelector('.svc-hero');
  const heroDrawingWrap = document.querySelector('.svc-hero__drawing-wrap');
  const servicesSection = document.querySelector('.svc-services');
  const gridLogoInner = document.querySelector('.svc-service-grid__logo-inner');

  if (heroDrawingWrap || gridLogoInner) {
    let heroPos = null;
    let gridPos = null;
    let lastTime = 0;
    let rafId = 0;

    const renderParallax = (time = performance.now()) => {
      rafId = 0;
      if (reduceMotion || window.innerWidth <= 760) {
        heroDrawingWrap?.style.setProperty('--svc-hero-drawing-y', '0px');
        gridLogoInner?.style.setProperty('--svc-grid-logo-y', '0px');
        heroPos = null;
        gridPos = null;
        lastTime = 0;
        return;
      }

      const innerH = window.innerHeight;
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      let needsNext = false;

      if (heroSection && heroDrawingWrap) {
        const hBounds = heroSection.getBoundingClientRect();
        const hTarget = Math.max(-65, Math.min(65, (hBounds.top - innerH * 0.15) * 0.16));
        heroPos = heroPos === null ? hTarget : heroPos + (hTarget - heroPos) * (1 - Math.exp(-elapsed / 180));
        if (Math.abs(hTarget - heroPos) < 0.1) heroPos = hTarget;
        if (heroPos !== hTarget) needsNext = true;
        heroDrawingWrap.style.setProperty('--svc-hero-drawing-y', `${heroPos.toFixed(2)}px`);
      }

      if (servicesSection && gridLogoInner) {
        const gBounds = servicesSection.getBoundingClientRect();
        // Speed factor 0.18 with exponential smoothing, matching PDP mark behavior
        const gTarget = Math.max(-80, Math.min(80, (gBounds.top - innerH * 0.42) * 0.18));
        gridPos = gridPos === null ? gTarget : gridPos + (gTarget - gridPos) * (1 - Math.exp(-elapsed / 180));
        if (Math.abs(gTarget - gridPos) < 0.1) gridPos = gTarget;
        if (gridPos !== gTarget) needsNext = true;
        gridLogoInner.style.setProperty('--svc-grid-logo-y', `${gridPos.toFixed(2)}px`);
      }

      if (needsNext) rafId = window.requestAnimationFrame(renderParallax);
    };

    const requestParallax = () => {
      if (!rafId) rafId = window.requestAnimationFrame(renderParallax);
    };

    window.addEventListener('scroll', requestParallax, { passive: true, signal: interactionController.signal });
    window.addEventListener('resize', requestParallax, { passive: true, signal: interactionController.signal });
    requestParallax();
  }

  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    interactionController.abort();
    projectAnimation?.cancel();
  });
})();
