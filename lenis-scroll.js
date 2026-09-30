(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis;

  const canStart = () => !reducedMotion.matches
    && typeof window.Lenis === 'function';

  const handleAnchorClick = (event) => {
    if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || anchor.target === '_blank') return;
    const hash = anchor.getAttribute('href');
    if (!hash) return;
    const target = hash === '#' ? 0 : document.querySelector(hash);
    if (target === null) return;
    event.preventDefault();
    lenis.scrollTo(target, {
      offset: -10,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });
    if (location.hash !== hash) history.pushState(null, '', hash);
  };

  const start = () => {
    if (lenis || !canStart()) return;
    lenis = new window.Lenis({
      autoRaf: true,
      anchors: false,
      // Continuous, frame-rate-independent smoothing for successive wheel events.
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      syncTouch: false,
      autoResize: true
    });
    document.addEventListener('click', handleAnchorClick);
    window.__pdpLenis = lenis;
  };

  const stop = () => {
    document.removeEventListener('click', handleAnchorClick);
    lenis?.destroy();
    lenis = undefined;
    delete window.__pdpLenis;
  };

  const sync = () => {
    if (canStart()) start();
    else stop();
  };

  reducedMotion.addEventListener?.('change', sync);
  window.addEventListener('pageshow', sync);
  window.addEventListener('pagehide', stop);
  sync();
})();
