(() => {
  'use strict';

  const page = document.body;
  if (!page || !page.classList.contains('production-services')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interactionController = new AbortController();

  const projectImage = document.querySelector('[data-project-image]');
  const projectSlides = [...document.querySelectorAll('[data-project-slide]')];
  const projectPrev = document.querySelector('[data-project-prev]');
  const projectNext = document.querySelector('[data-project-next]');
  let projectIndex = 0;
  let projectAnimation = null;

  const renderProject = (nextIndex) => {
    if (!projectImage || !projectSlides.length) return;
    projectIndex = (nextIndex + projectSlides.length) % projectSlides.length;
    projectSlides.forEach((slide, index) => {
      const active = index === projectIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-selected', String(active));
    });

    const slide = projectSlides[projectIndex];
    const src = slide.dataset.src;
    const alt = slide.dataset.alt || '';
    if (!src) return;

    const swap = () => {
      projectImage.src = src;
      projectImage.alt = alt;
    };

    if (reduceMotion || !projectImage.animate) {
      swap();
      return;
    }

    if (projectAnimation) projectAnimation.cancel();
    projectAnimation = projectImage.animate(
      [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0.1, transform: 'scale(1.015)' }],
      { duration: 120, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' },
    );
    projectAnimation.finished.then(() => {
      swap();
      projectAnimation = projectImage.animate(
        [{ opacity: 0.1, transform: 'scale(1.015)' }, { opacity: 1, transform: 'scale(1)' }],
        { duration: 160, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' },
      );
    }).catch(() => {});
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

  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    interactionController.abort();
    projectAnimation?.cancel();
  });
})();
