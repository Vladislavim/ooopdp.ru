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

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const render = () => {
    frame = 0;
    if (disposed || !active) return;

    const rect = section.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const offset = clamp((progress - 0.5) * -36, -18, 18);
    section.style.setProperty('--contacts-cta-parallax-y', `${offset.toFixed(2)}px`);
    section.style.setProperty('--contact-p-mark-y', `${(offset * 1.75).toFixed(2)}px`);
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

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    window.removeEventListener('scroll', requestRender);
    window.removeEventListener('resize', requestRender);
    if (frame) window.cancelAnimationFrame(frame);
    section.style.removeProperty('--contacts-cta-parallax-y');
    section.style.removeProperty('--contact-p-mark-y');
  };

  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) dispose();
  });
})();
