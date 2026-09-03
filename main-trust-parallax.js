(() => {
  const section = document.querySelector('.projects');
  const pattern = document.querySelector('.projects-parallax-logo');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!section || !pattern) return;

  let frame = 0;
  const render = () => {
    frame = 0;
    if (reduceMotion.matches) {
      pattern.style.setProperty('--projects-pattern-y', '0px');
      return;
    }

    const bounds = section.getBoundingClientRect();
    const travel = Math.max(window.innerHeight + bounds.height, 1);
    const progress = (window.innerHeight - bounds.top) / travel;
    const offset = Math.max(-78, Math.min(78, (progress - .5) * -156));
    pattern.style.setProperty('--projects-pattern-y', `${offset.toFixed(2)}px`);
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
