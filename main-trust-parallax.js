(() => {
  const section = document.querySelector('.projects');
  const pattern = document.querySelector('.projects-parallax-logo');
  const trustSection = document.querySelector('.clients-trust');
  const trustPattern = document.querySelector('.clients-trust-parallax-logo');
  const materialsSection = document.querySelector('.home-materials');
  const materialsPattern = document.querySelector('.home-materials__parallax-logo');
  const articlesSection = document.querySelector('.articles');
  const articlesDrawing = document.querySelector('.articles-parallax-drawing');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ((!section || !pattern) && (!trustSection || !trustPattern) && (!materialsSection || !materialsPattern) && (!articlesSection || !articlesDrawing)) return;

  let frame = 0;
  let position = null;
  let trustPosition = null;
  let materialsPosition = null;
  let articlesPosition = null;
  let lastTime = 0;
  const render = (time = performance.now()) => {
    frame = 0;
    let needsNextFrame = false;
    if (reduceMotion.matches || window.innerWidth <= 700) {
      pattern?.style.setProperty('--projects-pattern-y', '0px');
      trustPattern?.style.setProperty('--trust-pattern-y', '0px');
      materialsPattern?.style.setProperty('--materials-pattern-y', '0px');
      articlesDrawing?.style.setProperty('--articles-pattern-y', '0px');
      position = null;
      trustPosition = null;
      materialsPosition = null;
      articlesPosition = null;
      lastTime = 0;
      return;
    }

    // Phase 1: Batch all DOM Reads
    const innerH = window.innerHeight;
    const bounds = section ? section.getBoundingClientRect() : null;
    const trustBounds = (trustSection && trustPattern) ? trustSection.getBoundingClientRect() : null;
    const materialsBounds = (materialsSection && (materialsPattern || materialsSection.querySelector('.home-materials__parallax-drawing'))) ? materialsSection.getBoundingClientRect() : null;
    const articlesBounds = (articlesSection && articlesDrawing) ? articlesSection.getBoundingClientRect() : null;

    // Phase 2: Compute Offsets & Positions
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
    lastTime = time;

    const offset = bounds ? Math.max(-140, Math.min(80, (bounds.top - innerH * .48) * .22)) : 0;
    position = position === null ? offset : position + (offset - position) * (1 - Math.exp(-elapsed / 160));
    if (Math.abs(offset - position) < .1) position = offset;

    let trustOffset = 0;
    if (trustBounds) {
      trustOffset = Math.max(-105, Math.min(105, (trustBounds.top - innerH * .52) * .18));
      trustPosition = trustPosition === null ? trustOffset : trustPosition + (trustOffset - trustPosition) * (1 - Math.exp(-elapsed / 180));
      if (Math.abs(trustOffset - trustPosition) < .1) trustPosition = trustOffset;
      if (trustPosition !== trustOffset) needsNextFrame = true;
    }

    let materialsOffset = 0;
    if (materialsBounds) {
      materialsOffset = Math.max(-105, Math.min(105, (materialsBounds.top - innerH * .52) * .18));
      materialsPosition = materialsPosition === null ? materialsOffset : materialsPosition + (materialsOffset - materialsPosition) * (1 - Math.exp(-elapsed / 180));
      if (Math.abs(materialsOffset - materialsPosition) < .1) materialsPosition = materialsOffset;
      if (materialsPosition !== materialsOffset) needsNextFrame = true;
    }

    let articlesOffset = 0;
    if (articlesBounds) {
      articlesOffset = Math.max(-105, Math.min(105, (articlesBounds.top - innerH * .52) * .18));
      articlesPosition = articlesPosition === null ? articlesOffset : articlesPosition + (articlesOffset - articlesPosition) * (1 - Math.exp(-elapsed / 180));
      if (Math.abs(articlesOffset - articlesPosition) < .1) articlesPosition = articlesOffset;
      if (articlesPosition !== articlesOffset) needsNextFrame = true;
    }

    if (position !== offset) needsNextFrame = true;

    // Phase 3: Batch all DOM Writes
    pattern?.style.setProperty('--projects-pattern-y', `${position.toFixed(2)}px`);
    if (trustPattern && trustBounds) {
      trustPattern.style.setProperty('--trust-pattern-y', `${trustPosition.toFixed(2)}px`);
    }
    if (materialsBounds) {
      materialsSection?.style.setProperty('--materials-pattern-y', `${materialsPosition.toFixed(2)}px`);
      materialsPattern?.style.setProperty('--materials-pattern-y', `${materialsPosition.toFixed(2)}px`);
    }
    if (articlesDrawing && articlesBounds) {
      articlesDrawing.style.setProperty('--articles-pattern-y', `${articlesPosition.toFixed(2)}px`);
    }
    if (needsNextFrame) frame = window.requestAnimationFrame(render);
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender, { passive: true });
  reduceMotion.addEventListener?.('change', requestRender);
  requestRender();

  document.querySelectorAll('[data-direction-route]').forEach((card) => {
    const route = card.getAttribute('data-direction-route');
    if (!route) return;
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => { window.location.href = route; });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.location.href = route;
      }
    });
  });
})();
