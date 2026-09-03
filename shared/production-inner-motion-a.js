(() => {
  'use strict';

  const page = document.body;
  if (!page?.classList.contains('production-page')) return;

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [...new Set([
    ...document.querySelectorAll(
      'main > section:not(.prod-hero):not(.svc-hero):not(.pcp-hero):not(.articles-index-hero):not(.prod-contact-reference__hero):not(.contact-form-section):not(.shared-contact-form-section)'
    )
  ])];
  const cleanupTasks = [];
  let observer = null;
  let disposed = false;

  root.classList.add('inner-motion-a-ready');

  const reveal = (target) => target.classList.add('is-inner-motion-a-visible');

  targets.forEach((target, index) => {
    target.classList.add('inner-motion-a-reveal');
    target.style.setProperty('--inner-motion-a-delay', `${Math.min(index, 2) * 40}ms`);
  });

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(reveal);
  } else {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer?.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((target) => observer.observe(target));
    cleanupTasks.push(() => observer?.disconnect());
  }

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cleanupTasks.splice(0).forEach((cleanup) => cleanup());
  };

  window.addEventListener('pagehide', dispose, { once: true });
})();
