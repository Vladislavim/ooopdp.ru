(() => {
  'use strict';

  const page = document.body;
  if (!page || !page.classList.contains('production-services')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interactionController = new AbortController();
  const serviceCards = [...document.querySelectorAll('.svc-service-card')];

  const rememberServiceCard = (card) => {
    serviceCards.forEach((item) => item.classList.toggle('is-active', item === card));
  };

  if (serviceCards.length) {
    const initialCard = serviceCards.find((card) => card.classList.contains('is-active')) || serviceCards[0];
    rememberServiceCard(initialCard);
    serviceCards.forEach((card) => {
      card.addEventListener('pointerenter', () => rememberServiceCard(card), { signal: interactionController.signal });
      card.addEventListener('focusin', () => rememberServiceCard(card), { signal: interactionController.signal });
    });
  }

  const projectsData = [
    {
      id: 'red-october',
      tab: 'Красный Октябрь',
      eyebrow: 'Красный Октябрь · проектирование',
      title: '<span>Проект модернизации</span><br><span>травильного отделения</span>',
      role: 'Проектирование<br>и сопровождение<br>реализации',
      outputs: [
        'Технологические решения',
        'Рабочая документация',
        'Увязка инженерных систем',
        '3D-модель и визуализация'
      ],
      services: ['Проектирование', 'Инженерные системы', 'Модернизация производства'],
      caseUrl: '05-project-red-october.html',
      images: [
        { src: '../assets/industrial-pickling-01.png', alt: 'Объёмная 3D-модель травильного отделения', fit: 'contain' },
        { src: '../assets/industrial-pickling-02.png', alt: 'Увязка инженерных систем травильного отделения', fit: 'contain' },
        { src: '../assets/archive-optimized/PDP-OBJ-006.jpg', alt: 'Исходное состояние производственного цеха', fit: 'cover' },
        { src: '../assets/cases/red-october.jpg', alt: 'Промышленный объект Красный Октябрь', fit: 'cover' },
        { src: '../assets/cases/red-october-render-user.jpg', alt: 'Проектное решение Красного Октября', fit: 'contain' }
      ]
    },
    {
      id: 'severstal',
      tab: 'Северсталь',
      eyebrow: 'Северсталь · промышленное производство',
      title: '<span>Инженерные решения</span><br><span>для производства</span>',
      role: 'Инженерные решения<br>для действующего<br>производства',
      outputs: [
        'Решения для промышленной инфраструктуры',
        'Увязка инженерных систем',
        'Материалы по действующему объекту',
        'Реализованное решение'
      ],
      services: ['Проектирование', 'Инженерные системы', 'Модернизация производства'],
      caseUrl: 'project-severstal.html',
      images: [
        { src: '../assets/cases/severstal-after.webp', alt: 'Реализованное инженерное решение Северстали', fit: 'contain' },
        { src: '../assets/archive-optimized/PDP-OBJ-004.jpg', alt: 'Исходное состояние производственного объекта Северстали', fit: 'cover' }
      ]
    },
    {
      id: 'eurochem',
      tab: 'ЕвроХим',
      eyebrow: 'ЕвроХим-Волгакалий · проектирование',
      title: '<span>Дизайн-проект</span><br><span>офисных помещений</span>',
      role: 'Дизайн-проект<br>и рабочая<br>документация',
      outputs: [
        'Планировочные решения',
        'Дизайн-проект помещений',
        'Рабочая документация',
        'Материалы для реализации'
      ],
      services: ['Проектирование', 'Инженерные системы', 'Ремонтные работы'],
      caseUrl: 'project-eurochem.html',
      images: [
        { src: '../assets/cases/eurochem-office.jpg', alt: 'Офисные помещения ЕвроХим-Волгакалий', fit: 'contain' },
        { src: '../assets/documents/eurochem-office-design-preview.jpg', alt: 'Титульный лист дизайн-проекта офисных помещений', fit: 'contain' }
      ]
    },
    {
      id: 'polyclinic',
      tab: 'Поликлиника №31',
      eyebrow: 'Поликлиника №31 · проектирование',
      title: '<span>Проектная документация</span><br><span>реконструкции</span>',
      role: 'Проектная и рабочая<br>документация<br>раздела АР1',
      outputs: [
        'Архитектурные решения',
        'Проектная документация',
        'Рабочая документация',
        'Решения по фасадам'
      ],
      services: ['Проектирование', 'Инженерные системы', 'Реконструкция объекта'],
      caseUrl: 'project-polyclinic-31.html',
      images: [
        { src: '../assets/cases/polyclinic-render-front.jpg', alt: 'Проектное решение поликлиники №31 — главный фасад', fit: 'contain' },
        { src: '../assets/cases/polyclinic-render-side.jpg', alt: 'Проектное решение поликлиники №31 — боковой фасад', fit: 'contain' },
        { src: '../assets/cases/polyclinic-old-front.jpg', alt: 'Исходное состояние поликлиники №31 — главный фасад', fit: 'contain' },
        { src: '../assets/cases/polyclinic-old-side.jpg', alt: 'Исходное состояние поликлиники №31 — боковой фасад', fit: 'contain' }
      ]
    }
  ];

  const projectImage = document.querySelector('[data-project-image]');
  const projectThumbs = document.querySelector('[data-project-thumbs]');
  const projectPrev = document.querySelector('[data-project-prev]');
  const projectNext = document.querySelector('[data-project-next]');
  const projectSelectors = [...document.querySelectorAll('[data-project-select]')];
  const copyEl = document.querySelector('.svc-project__copy');
  const eyebrowEl = document.querySelector('[data-project-eyebrow]');
  const titleEl = document.querySelector('[data-project-title]');
  const roleEl = document.querySelector('[data-project-role]');
  const outputsEl = document.querySelector('[data-project-outputs]');
  const servicesEl = document.querySelector('[data-project-services]');
  const caseBtnEl = document.querySelector('[data-project-case-btn]');

  let activeCaseIndex = 0;
  let projectIndex = 0;
  let projectAnimation = null;
  let isTransitioning = false;

  const getSlides = () => [...document.querySelectorAll('[data-project-slide]')];

  const renderProjectImage = (nextIndex, animate = true) => {
    const slides = getSlides();
    const images = projectsData[activeCaseIndex]?.images || [];
    if (!projectImage || !slides.length || !images.length || isTransitioning) return;
    const targetIndex = (nextIndex + images.length) % images.length;

    projectIndex = targetIndex;
    isTransitioning = true;

    slides.forEach((slide, index) => {
      const active = index === projectIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-selected', String(active));
    });

    const item = images[projectIndex];

    const updateDOM = () => {
      projectImage.src = item.src;
      projectImage.alt = item.alt;
      projectImage.dataset.fit = item.fit || 'cover';
    };

    if (!animate || reduceMotion || !projectImage.animate) {
      updateDOM();
      isTransitioning = false;
      return;
    }

    copyEl?.classList.add('is-transitioning');

    if (projectAnimation) projectAnimation.cancel();
    projectAnimation = projectImage.animate(
      [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0.15, transform: 'scale(1.02)' }],
      { duration: 150, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
    );

    setTimeout(() => {
      updateDOM();
      copyEl?.classList.remove('is-transitioning');

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

  const buildThumbs = (project) => {
    if (!projectThumbs) return;
    projectThumbs.style.setProperty('--thumb-count', String(Math.min(project.images.length, 5)));
    const arrows = projectThumbs.querySelector('.svc-project__arrows');
    projectThumbs.querySelectorAll('[data-project-slide]').forEach((slide) => slide.remove());
    project.images.forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-label', `Показать: ${image.alt}`);
      button.setAttribute('aria-selected', String(index === 0));
      button.dataset.projectSlide = '';
      if (index === 0) button.classList.add('is-active');
      button.innerHTML = `<img src="${image.src}" alt="" width="240" height="140" loading="lazy">`;
      button.addEventListener('click', () => renderProjectImage(index), { signal: interactionController.signal });
      button.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') renderProjectImage(projectIndex + 1);
        if (event.key === 'ArrowLeft') renderProjectImage(projectIndex - 1);
      }, { signal: interactionController.signal });
      projectThumbs.insertBefore(button, arrows);
    });
  };

  const renderCase = (nextCaseIndex) => {
    activeCaseIndex = (nextCaseIndex + projectsData.length) % projectsData.length;
    const project = projectsData[activeCaseIndex];
    projectSelectors.forEach((selector, index) => {
      const active = index === activeCaseIndex;
      selector.classList.toggle('is-active', active);
      selector.setAttribute('aria-selected', String(active));
    });
    if (eyebrowEl) eyebrowEl.textContent = project.eyebrow;
    if (titleEl) titleEl.innerHTML = project.title;
    if (roleEl) roleEl.innerHTML = project.role;
    if (outputsEl) outputsEl.innerHTML = project.outputs.map((output, index) => `<li><b>${String(index + 1).padStart(2, '0')}</b><span>${output}</span></li>`).join('');
    if (servicesEl) servicesEl.innerHTML = project.services.map((service) => `<span>${service}</span>`).join('');
    if (caseBtnEl) caseBtnEl.href = project.caseUrl;
    buildThumbs(project);
    projectIndex = 0;
    isTransitioning = false;
    renderProjectImage(0, false);
  };

  projectSelectors.forEach((selector, index) => selector.addEventListener('click', () => renderCase(index), { signal: interactionController.signal }));
  projectPrev?.addEventListener('click', () => renderProjectImage(projectIndex - 1), { signal: interactionController.signal });
  projectNext?.addEventListener('click', () => renderProjectImage(projectIndex + 1), { signal: interactionController.signal });
  renderCase(0);

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

  const briefProgress = document.querySelector('[data-brief-progress]');
  const briefRunner = briefProgress?.querySelector('[data-brief-runner]');
  const briefSteps = briefProgress ? [...briefProgress.querySelectorAll('[data-brief-step]')] : [];
  const briefNodes = briefProgress ? [...briefProgress.querySelectorAll('[data-brief-node]')] : [];

  if (briefProgress && briefRunner && briefSteps.length === 3 && briefNodes.length === 3) {
    let briefCycleToken = 0;
    let briefVisible = false;
    let briefAnimation = null;

    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
    const setBriefStage = (stage) => {
      briefSteps.forEach((step, index) => step.classList.toggle('is-active', index <= stage));
    };
    const nodeTransform = (index) => {
      const listRect = briefProgress.getBoundingClientRect();
      const nodeRect = briefNodes[index].getBoundingClientRect();
      const runnerHalf = briefRunner.offsetWidth / 2;
      return `translate3d(${nodeRect.left + nodeRect.width / 2 - listRect.left - runnerHalf}px, ${nodeRect.top + nodeRect.height / 2 - listRect.top - runnerHalf}px, 0)`;
    };
    const placeRunner = (index) => {
      briefRunner.style.transform = nodeTransform(index);
    };
    const moveRunner = async (from, to, token) => {
      briefAnimation?.cancel();
      briefAnimation = briefRunner.animate(
        [{ transform: nodeTransform(from) }, { transform: nodeTransform(to) }],
        { duration: 1500, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' }
      );
      try { await briefAnimation.finished; } catch (error) { return false; }
      if (token !== briefCycleToken || !briefVisible) return false;
      briefRunner.style.transform = nodeTransform(to);
      briefAnimation.cancel();
      briefAnimation = null;
      return true;
    };
    const runBriefCycle = async (token) => {
      setBriefStage(0);
      placeRunner(0);
      await wait(350);
      if (token !== briefCycleToken || !briefVisible) return;
      if (!await moveRunner(0, 1, token)) return;
      setBriefStage(1);
      await wait(400);
      if (token !== briefCycleToken || !briefVisible) return;
      if (!await moveRunner(1, 2, token)) return;
      setBriefStage(2);
      await wait(700);
      if (token !== briefCycleToken || !briefVisible) return;
      runBriefCycle(token);
    };
    const startBriefCycle = () => {
      briefCycleToken += 1;
      briefAnimation?.cancel();
      briefAnimation = null;
      setBriefStage(0);
      placeRunner(0);
      if (!reduceMotion && briefVisible) runBriefCycle(briefCycleToken);
    };

    const briefObserver = new IntersectionObserver(([entry]) => {
      briefVisible = entry.isIntersecting;
      if (briefVisible) startBriefCycle();
      else {
        briefCycleToken += 1;
        briefAnimation?.cancel();
        briefAnimation = null;
      }
    }, { threshold: 0.2 });
    briefObserver.observe(briefProgress);
    window.addEventListener('resize', startBriefCycle, { passive: true, signal: interactionController.signal });
    interactionController.signal.addEventListener('abort', () => {
      briefCycleToken += 1;
      briefAnimation?.cancel();
      briefObserver.disconnect();
    }, { once: true });
    setBriefStage(0);
    placeRunner(0);
  }

  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    interactionController.abort();
    projectAnimation?.cancel();
  });
})();

(() => {
  const form = document.querySelector('[data-service-request-form]');
  if (!form) return;
  const status = form.querySelector('[data-service-request-status]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = 'Форма заполнена. Сейчас заявка не отправляется автоматически — направьте материалы на sale@ooopdp.ru.';
  });
})();
