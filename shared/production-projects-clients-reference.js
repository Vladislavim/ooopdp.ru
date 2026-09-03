(() => {
  'use strict';

  const page = document.body;
  if (!page?.classList.contains('production-projects')) return;

  const projects = [
    {
      number: '01',
      client: 'ALAN KZ',
      type: 'Спортивный объект',
      title: 'Футбольные поля ALAN KZ',
      copy: 'Проект предусматривает строительство и реконструкцию 20 футбольных полей в течение трёх лет.',
      image: '../assets/inner-optimized/cases-astana-arena.webp',
      alt: 'Спортивный объект ALAN KZ',
      facts: [['Направление', 'Спортивная инфраструктура'], ['Регион', 'Казахстан']],
      href: '06-completed-works.html',
      stamp: 'PDP / CASE 01'
    },
    {
      number: '02',
      client: 'Красный Октябрь',
      type: 'Промышленный объект',
      title: 'Модернизация травильного отделения',
      copy: 'Разработка проектной документации на модернизацию травильного отделения АО «Корпорация Красный Октябрь».',
      image: '../assets/archive-optimized/PDP-OBJ-006.jpg',
      alt: 'Производственный объект Красного Октября',
      facts: [['Направление', 'Промышленная реконструкция'], ['Статус', 'Реализован']],
      href: '05-project-red-october.html',
      stamp: 'PDP / CASE 02'
    },
    {
      number: '03',
      client: 'Северсталь',
      type: 'Промышленный объект',
      title: 'Инженерные решения для производства',
      copy: 'Комплексная работа с промышленной инфраструктурой и инженерными системами действующего объекта.',
      image: '../assets/archive-optimized/PDP-OBJ-004.jpg',
      alt: 'Производственный объект Северстали',
      facts: [['Направление', 'Промышленное производство'], ['Статус', 'Реализован']],
      href: '06-completed-works.html',
      stamp: 'PDP / CASE 03'
    },
    {
      number: '04',
      client: 'ЕвроХим-Волгакалий',
      type: 'Офисный объект',
      title: 'Офисные помещения ЕвроХим',
      copy: 'Дизайн-проект офисных помещений и рабочая документация для действующего предприятия.',
      image: '../assets/cases/eurochem-office.jpg',
      alt: 'Офисные помещения ЕвроХим-Волгакалий',
      facts: [['Направление', 'Дизайн-проект'], ['Объект', 'Офисные помещения']],
      href: '06-completed-works.html',
      stamp: 'PDP / CASE 04'
    }
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopMotion = window.matchMedia('(min-width: 701px)');
  const interactionController = new AbortController();
  const motionEase = 'cubic-bezier(.22,.72,.18,1)';
  const featureImage = document.querySelector('[data-feature-image]');
  const featureIndex = document.querySelector('[data-feature-index]');
  const featureType = document.querySelector('[data-feature-type]');
  const featureClient = document.querySelector('[data-feature-client]');
  const featureTitle = document.querySelector('[data-feature-title]');
  const featureCopy = document.querySelector('[data-feature-copy]');
  const featureFacts = document.querySelector('[data-feature-facts]');
  const featureLink = document.querySelector('[data-feature-link]');
  const featureStamp = document.querySelector('.pcp-featured__stamp');
  const controls = [...document.querySelectorAll('.pcp-project-nav [data-project-index]')];
  const previous = document.querySelector('[data-project-prev]');
  const next = document.querySelector('[data-project-next]');
  const heroPhoto = document.querySelector('.pcp-hero__photo');
  const heroWireframe = document.querySelector('.pcp-hero__wireframe');
  const heroMark = document.querySelector('.pcp-hero__mark');
  let activeIndex = 0;
  let transitionToken = 0;
  let activeAnimations = [];
  let parallaxFrame = 0;

  const stopAnimations = () => {
    activeAnimations.forEach((animation) => animation.cancel());
    activeAnimations = [];
  };

  const preload = (src) => new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

  const setSelectedState = (index) => {
    controls.forEach((control) => {
      const selected = Number(control.dataset.projectIndex) === index;
      control.classList.toggle('is-active', selected);
      control.setAttribute('aria-selected', String(selected));
    });
  };

  const renderFacts = (facts) => {
    if (!featureFacts) return;
    featureFacts.innerHTML = facts.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('');
  };

  const renderProject = (project) => {
    if (!featureImage) return;
    featureImage.alt = project.alt;
    featureImage.src = project.image;
    featureImage.dataset.projectImage = project.image;
    if (featureIndex) featureIndex.textContent = `${project.number} / 04`;
    if (featureType) featureType.textContent = project.type;
    if (featureClient) featureClient.textContent = project.client;
    if (featureTitle) featureTitle.textContent = project.title;
    if (featureCopy) featureCopy.textContent = project.copy;
    if (featureLink) featureLink.href = project.href;
    if (featureStamp) featureStamp.textContent = project.stamp;
    renderFacts(project.facts);
  };

  const transitionTo = async (requestedIndex, {focus = false} = {}) => {
    const index = (requestedIndex + projects.length) % projects.length;
    if (index === activeIndex && featureImage?.dataset.projectImage) {
      if (focus) controls.find((control) => Number(control.dataset.projectIndex) === index)?.focus({preventScroll: true});
      return;
    }

    const token = ++transitionToken;
    const project = projects[index];
    stopAnimations();
    setSelectedState(index);
    activeIndex = index;

    if (!featureImage || prefersReducedMotion.matches || !desktopMotion.matches) {
      renderProject(project);
      if (focus) controls.find((control) => Number(control.dataset.projectIndex) === index)?.focus({preventScroll: true});
      return;
    }

    const loaded = await preload(project.image);
    if (token !== transitionToken) return;
    if (!loaded) {
      renderProject(project);
      return;
    }

    featureImage.style.opacity = '0';
    renderProject(project);
    const animation = featureImage.animate([
      { clipPath: 'inset(0 100% 0 0)', transform: 'scale(1.02)', filter: 'brightness(1.12)' },
      { clipPath: 'inset(0 0 0 0)', transform: 'scale(1)', filter: 'brightness(1)' }
    ], {duration: 600, easing: motionEase, fill: 'both'});
    activeAnimations.push(animation);
    featureImage.style.opacity = '1';
    animation.finished.catch(() => {}).finally(() => {
      if (token === transitionToken) {
        featureImage.style.clipPath = 'inset(0)';
        featureImage.style.transform = 'none';
        featureImage.style.filter = 'none';
      }
    });
    if (focus) controls.find((control) => Number(control.dataset.projectIndex) === index)?.focus({preventScroll: true});
  };

  controls.forEach((control) => {
    const options = { signal: interactionController.signal };
    control.addEventListener('click', () => transitionTo(Number(control.dataset.projectIndex), {focus: true}), options);
    control.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      transitionTo(activeIndex + direction, {focus: true});
    }, options);
  });

  previous?.addEventListener('click', () => transitionTo(activeIndex - 1), { signal: interactionController.signal });
  next?.addEventListener('click', () => transitionTo(activeIndex + 1), { signal: interactionController.signal });

  const runHeroMotion = () => {
    if (!heroPhoto || !desktopMotion.matches || prefersReducedMotion.matches) return;
    page.classList.add('pcp-has-motion');
    stopAnimations();
    activeAnimations = [
      heroPhoto.animate([
        { clipPath: 'inset(0 0 0 100%)', transform: 'scale(1.02)', filter: 'brightness(1.08) saturate(.92)' },
        { clipPath: 'inset(0)', transform: 'scale(1)', filter: 'brightness(1) saturate(.95)' }
      ], {duration: 620, easing: motionEase, fill: 'both'}),
      heroWireframe?.animate([
        { opacity: 0, transform: 'translate3d(28px, 20px, 0)' },
        { opacity: .12, transform: 'translate3d(0, 0, 0)' }
      ], {duration: 600, delay: 180, easing: motionEase, fill: 'both'}),
      heroMark?.animate([
        { opacity: 0, transform: 'translate3d(20px, 24px, 0)' },
        { opacity: .085, transform: 'translate3d(0, 0, 0)' }
      ], {duration: 480, delay: 260, easing: motionEase, fill: 'both'}),
      document.querySelector('.pcp-hero__copy')?.animate([
        { opacity: .2, transform: 'translate3d(-12px, 0, 0)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0)' }
      ], {duration: 480, delay: 80, easing: motionEase, fill: 'both'})
    ].filter(Boolean);
  };

  const updateParallax = () => {
    parallaxFrame = 0;
    if (!heroWireframe || !desktopMotion.matches || prefersReducedMotion.matches) return;
    const rect = document.querySelector('.pcp-hero__media')?.getBoundingClientRect();
    if (!rect) return;
    const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight + rect.height)));
    const offset = Math.round(progress * -34);
    heroWireframe.style.transform = `translate3d(0, ${offset}px, 0)`;
    if (heroMark) heroMark.style.transform = `translate3d(0, ${Math.round(offset * .62)}px, 0)`;
  };

  const onScroll = () => {
    if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateParallax);
  };
  window.addEventListener('scroll', onScroll, {passive: true, signal: interactionController.signal});
  window.addEventListener('resize', updateParallax, {passive: true, signal: interactionController.signal});

  renderProject(projects[0]);
  setSelectedState(0);
  runHeroMotion();
  updateParallax();

  window.addEventListener('pagehide', () => {
    interactionController.abort();
    stopAnimations();
    if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
  }, { once: true });
})();
