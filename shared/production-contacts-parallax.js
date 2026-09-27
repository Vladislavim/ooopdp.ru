(() => {
  'use strict';

  const section = document.querySelector(
    'body.production-contacts .shared-contact-form-section, body:not(.production-page) .contact-form-section#contacts'
  );
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileViewport = window.matchMedia('(max-width: 700px)');

  if (!section || reducedMotion.matches || mobileViewport.matches) return;

  let frame = 0;
  let active = false;
  let disposed = false;
  const isHome = !document.body.classList.contains('production-page');
  let position = null;
  let lastTime = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const render = (time = performance.now()) => {
    frame = 0;
    if (disposed || !active) return;
    if (reducedMotion.matches || mobileViewport.matches) {
      section.style.removeProperty('--contacts-cta-parallax-y');
      section.style.removeProperty('--contact-p-mark-y');
      position = null;
      lastTime = 0;
      return;
    }

    const rect = section.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const offset = clamp((progress - 0.5) * -36, -18, 18);
    section.style.setProperty('--contacts-cta-parallax-y', `${offset.toFixed(2)}px`);
    const target = isHome ? clamp((rect.top - window.innerHeight * .48) * .22, -140, 80) : offset * 1.75;
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
    lastTime = time;
    position = position === null || !isHome ? target : position + (target - position) * (1 - Math.exp(-elapsed / 160));
    if (Math.abs(target - position) < .1) position = target;
    section.style.setProperty('--contact-p-mark-y', `${position.toFixed(2)}px`);
    if (position !== target) frame = window.requestAnimationFrame(render);
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  const observer = new IntersectionObserver((entries) => {
    active = entries.some((entry) => entry.isIntersecting);
    if (active) requestRender();
  }, { rootMargin: '24% 0px' });

  observer.observe(section);
  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender, { passive: true });
  reducedMotion.addEventListener('change', requestRender);
  mobileViewport.addEventListener('change', requestRender);

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    window.removeEventListener('scroll', requestRender);
    window.removeEventListener('resize', requestRender);
    reducedMotion.removeEventListener('change', requestRender);
    mobileViewport.removeEventListener('change', requestRender);
    if (frame) window.cancelAnimationFrame(frame);
    section.style.removeProperty('--contacts-cta-parallax-y');
    section.style.removeProperty('--contact-p-mark-y');
  };

  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) dispose();
  });
})();
