  (() => {
  const projectDatabase = [
    {
      id: 'severstal',
      logoHtml: '<div style="display:inline-flex; align-items:center; gap:10px;"><img src="assets/logos/severstal.svg" style="height:32px; width:auto;"><span style="font:800 20px var(--split-font-display, \'Geologica\', sans-serif); color:#0b3560; text-transform:uppercase;">Северсталь</span></div>',
      title: 'Инженерные решения для производства',
      desc: 'Комплексная работа с промышленной инфраструктурой и инженерными системами металлургического объекта.',
      beforeImg: 'assets/inner-optimized/archive-PDP-OBJ-004.webp',
      afterImg: 'assets/cases/severstal-after.webp',
      badgeBefore: 'Исходное состояние (ДО)',
      badgeAfter: 'Реализованное решение (ПОСЛЕ)',
      status: 'ЭКСПЕРТИЗА ПРОЙДЕНА',
      metrics: [
        { val: 'Инженерные решения', label: 'Роль ПДП' },
        { val: 'Реализованное решение', label: 'Результат' }
      ],
      caseUrl: 'pages/project-severstal.html',
      docUrl: 'pages/project-severstal.html',
      docText: 'Материалы объекта (Северсталь)'
    },
    {
      id: 'red-october',
      logoHtml: '<img src="assets/logos/krasny-oktyabr.svg" alt="Красный Октябрь" style="height:36px; width:auto;">',
      title: 'Модернизация травильного отделения',
      desc: 'Разработка архитектурно-строительной части и рабочей документации модернизации листопрокатного цеха.',
      beforeImg: 'assets/inner-optimized/archive-PDP-OBJ-006.webp',
      afterImg: 'assets/inner-optimized/industrial-pickling-01.webp',
      badgeBefore: 'Исходный цех (ДО)',
      badgeAfter: '3D Проект АС (ПОСЛЕ)',
      status: '100% СОГЛАСОВАНО',
      metrics: [
        { val: 'Проектирование', label: 'Роль ПДП' },
        { val: 'Проектная и рабочая документация', label: 'Результат' }
      ],
      caseUrl: 'pages/05-project-red-october.html',
      docUrl: 'assets/documents/red-october-11-2023-as.pdf',
      docText: 'Документация 11-2023-АС (PDF)'
    },
    {
      id: 'polyclinic',
      logoHtml: '<div class="v1-poly-badge"><span>№31</span> Клиническая поликлиника</div>',
      title: 'Реконструкция фасадов поликлиники',
      desc: 'Разработка архитектурных решений фасадов и входных групп городской клинической поликлиники №31.',
      beforeImg: 'assets/inner-optimized/cases-polyclinic-old-front.webp',
      afterImg: 'assets/inner-optimized/cases-polyclinic-render-front.webp',
      badgeBefore: 'Старый фасад (ДО)',
      badgeAfter: 'Новый фасад АР1 (ПОСЛЕ)',
      status: 'ЗАЩИТА В КОМИТЕТЕ',
      metrics: [
        { val: 'Архитектурные решения', label: 'Роль ПДП' },
        { val: 'Проектная и рабочая документация · АР1', label: 'Результат' }
      ],
      caseUrl: 'pages/project-polyclinic-31.html',
      docUrl: 'assets/documents/polyclinic-31-ar.pdf',
      docText: 'Документация АР1 (PDF 14.1 МБ)'
    },
    {
      id: 'eurochem',
      logoHtml: '<img src="assets/logos/eurochem.svg" alt="ЕвроХим" style="height:30px; width:auto;">',
      title: 'Дизайн-проект офисного комплекса ГОК',
      desc: 'Дизайн-проект рабочих зон и рабочей документации инженерных сетей для горно-обогатительного комбината.',
      beforeImg: 'assets/inner-optimized/documents-eurochem-office-design-preview.webp',
      afterImg: 'assets/inner-optimized/cases-eurochem-office.webp',
      badgeBefore: 'Строительный чертеж (ДО)',
      badgeAfter: 'Готовый интерьер (ПОСЛЕ)',
      status: 'В ЭКСПЛУАТАЦИИ',
      metrics: [
        { val: 'Дизайн-проект офисных помещений', label: 'Роль ПДП' },
        { val: 'Рабочая документация', label: 'Результат' }
      ],
      caseUrl: 'pages/project-eurochem.html',
      docUrl: 'assets/documents/eurochem-office-design.pdf',
      docText: 'Дизайн-проект (PDF 10.7 МБ)'
    },
    {
      id: 'alan-kz',
      logoHtml: '<strong class="v1-client-name">ALAN KZ</strong>',
      title: 'Футбольные поля ALAN KZ',
      desc: 'Проект предусматривает строительство и реконструкцию 20 футбольных полей в течение трёх лет в Казахстане.',
      beforeImg: 'assets/cases/alan-field-kff.jpg',
      afterImg: 'assets/cases/alan-field-kff.jpg',
      singleImage: true,
      metrics: [
        { val: 'Генеральный подрядчик', label: 'Роль ПДП' },
        { val: 'Проектные решения для футбольных полей', label: 'Результат' }
      ],
      caseUrl: 'pages/project-alan-kz.html',
      docUrl: 'pages/project-alan-kz.html',
      docText: 'Материалы проекта ALAN KZ'
    }
  ];

  // Helper setup split interaction
  function initHomeSplitter(boxId, beforeLayerId, beforeImgId, handleId) {
    const box = document.getElementById(boxId);
    const layer = document.getElementById(beforeLayerId);
    const img = document.getElementById(beforeImgId);
    const handle = document.getElementById(handleId);
    if (!box || !layer || !img || !handle) return () => {};

    let isDragging = false;
    const setPos = (clientX) => {
      if (box.classList.contains('is-single-image')) return;
      layer.style.transition = 'none';
      handle.style.transition = 'none';
      const rect = box.getBoundingClientRect();
      let p = ((clientX - rect.left) / rect.width) * 100;
      p = Math.max(0, Math.min(100, p));
      layer.style.width = p + '%';
      handle.style.left = p + '%';
      img.style.width = rect.width + 'px';
    };

    const syncWidth = () => {
      img.style.width = box.clientWidth + 'px';
      img.style.maxWidth = 'none';
    };
    window.addEventListener('resize', syncWidth);
    syncWidth();

    box.addEventListener('mousedown', (e) => { isDragging = true; setPos(e.clientX); });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => { if (isDragging) setPos(e.clientX); });

    box.addEventListener('touchstart', (e) => { isDragging = true; setPos(e.touches[0].clientX); });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => { if (isDragging) setPos(e.touches[0].clientX); });

    return syncWidth;
  }

  const syncHomeSplit = initHomeSplitter('homeSplitBox', 'v1-layer-before', 'v1-before', 'v1-handle');

  const preloadImage = (src) => new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

  let homeProjectIndex = 0;
  let transitionToken = 0;
  let activeGhost = null;
  let isInitialized = false;

  const setHomeProject = async (i) => {
    const targetIndex = (i + projectDatabase.length) % projectDatabase.length;
    if (isInitialized && targetIndex === homeProjectIndex) return;

    const token = ++transitionToken;
    const d = projectDatabase[targetIndex];
    const box = document.getElementById('homeSplitBox');
    const layer = document.getElementById('v1-layer-before');
    const beforeEl = document.getElementById('v1-before');
    const afterEl = document.getElementById('v1-after');
    const handle = document.getElementById('v1-handle');
    const logoEl = document.getElementById('v1-logo-container');
    const dynamicEl = document.getElementById('v1-dynamic-content');
    const titleEl = document.getElementById('v1-title');
    const descEl = document.getElementById('v1-desc');
    const btnEl = document.getElementById('v1-btn');
    const docEl = document.getElementById('v1-doc');
    const docTextEl = document.getElementById('v1-doc-text');
    const metricsEl = document.getElementById('v1-metrics');
    const syncMediaMode = () => {
      box?.classList.toggle('is-single-image', Boolean(d.singleImage));
      if (beforeEl) beforeEl.alt = d.singleImage ? '' : 'Исходные материалы — ' + d.title;
      if (afterEl) afterEl.alt = d.title;
    };

    // Immediate tab highlight
    document.querySelectorAll('[data-v1]').forEach((el, index) => {
      el.classList.toggle('is-active', index === targetIndex);
    });

    if (!isInitialized) {
      isInitialized = true;
      homeProjectIndex = targetIndex;
      syncMediaMode();
      if (logoEl) logoEl.innerHTML = d.logoHtml;
      if (titleEl) titleEl.textContent = d.title;
      if (descEl) descEl.textContent = d.desc;
      if (beforeEl) beforeEl.src = d.beforeImg;
      if (afterEl) afterEl.src = d.afterImg;
      if (btnEl) btnEl.href = d.caseUrl;
      if (docEl) docEl.href = d.docUrl;
      if (docTextEl) docTextEl.textContent = d.docText;
      if (metricsEl) {
        metricsEl.innerHTML = d.metrics.map(m => `
          <div>
            <span>${m.label}</span>
            <strong>${m.val}</strong>
          </div>
        `).join('');
      }
      syncHomeSplit();
      return;
    }

    // Preload target images so transition is smooth without blank flicker
    await Promise.all([preloadImage(d.beforeImg), preloadImage(d.afterImg)]);
    if (token !== transitionToken) return;

    // Create ghost snapshot for seamless crossfade
    if (activeGhost) {
      activeGhost.remove();
      activeGhost = null;
    }
    if (box && beforeEl && afterEl && layer && !box.classList.contains('is-single-image')) {
      const ghost = document.createElement('div');
      ghost.className = 'split-box-ghost';
      ghost.innerHTML = `
        <div class="split-layer split-layer--after">
          <img src="${afterEl.src}" alt="" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="split-layer split-layer--before" style="width:${layer.style.width || '50%'}; border-right:2px solid var(--split-accent);">
          <img src="${beforeEl.src}" alt="" style="width:${beforeEl.clientWidth ? beforeEl.clientWidth + 'px' : '100%'}; height:100%; object-fit:cover; max-width:none;">
        </div>
      `;
      box.appendChild(ghost);
      activeGhost = ghost;
    }

    // Start sidebar fade out
    if (dynamicEl) dynamicEl.classList.add('v1-fading');
    if (logoEl) logoEl.classList.add('v1-fading');

    // Smoothly reset handle and divider to 50%
    if (layer && handle) {
      layer.style.transition = 'width 0.38s cubic-bezier(.22,.72,.18,1)';
      handle.style.transition = 'left 0.38s cubic-bezier(.22,.72,.18,1)';
      layer.style.width = '50%';
      handle.style.left = '50%';
      setTimeout(() => {
        layer.style.transition = '';
        handle.style.transition = '';
      }, 400);
    }

    // Switch data after slight fade-out
    setTimeout(() => {
      if (token !== transitionToken) return;
      homeProjectIndex = targetIndex;
      syncMediaMode();

      if (logoEl) logoEl.innerHTML = d.logoHtml;
      if (titleEl) titleEl.textContent = d.title;
      if (descEl) descEl.textContent = d.desc;
      if (beforeEl) beforeEl.src = d.beforeImg;
      if (afterEl) afterEl.src = d.afterImg;
      if (btnEl) btnEl.href = d.caseUrl;
      if (docEl) docEl.href = d.docUrl;
      if (docTextEl) docTextEl.textContent = d.docText;
      if (metricsEl) {
        metricsEl.innerHTML = d.metrics.map(m => `
          <div>
            <span>${m.label}</span>
            <strong>${m.val}</strong>
          </div>
        `).join('');
      }

      syncHomeSplit();

      // Fade sidebar back in
      requestAnimationFrame(() => {
        if (dynamicEl) dynamicEl.classList.remove('v1-fading');
        if (logoEl) logoEl.classList.remove('v1-fading');
      });

      // Animate ghost out (crossfade dissolve)
      if (activeGhost) {
        const g = activeGhost;
        g.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 320, easing: 'cubic-bezier(.22,.72,.18,1)', fill: 'forwards' }
        ).finished.then(() => {
          g.remove();
          if (activeGhost === g) activeGhost = null;
        }).catch(() => {
          g.remove();
          if (activeGhost === g) activeGhost = null;
        });
      }
    }, 110);
  };

  document.querySelectorAll('[data-v1]').forEach(el => el.addEventListener('click', () => setHomeProject(Number(el.dataset.v1))));
  document.getElementById('v1-prev')?.addEventListener('click', () => setHomeProject(homeProjectIndex - 1));
  document.getElementById('v1-next')?.addEventListener('click', () => setHomeProject(homeProjectIndex + 1));

  // Initial render
  setHomeProject(0);
  })();
