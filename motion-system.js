(() => {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 1200px)');
  const timers = new Set();

  const heroVideo = document.querySelector('.hero-video');
  let waitingForHeroMetadata = false;
  const syncHeroVideoMotion = () => {
    if (!heroVideo) return;

    if (reducedMotion.matches) {
      heroVideo.pause();
      if (heroVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
        try {
          heroVideo.currentTime = 0;
        } catch {
          // The existing poster remains visible if the browser blocks seeking.
        }
      } else if (!waitingForHeroMetadata) {
        waitingForHeroMetadata = true;
        heroVideo.addEventListener('loadedmetadata', () => {
          waitingForHeroMetadata = false;
          syncHeroVideoMotion();
        }, { once: true });
      }
      return;
    }

    heroVideo.play().catch(() => {
      // Autoplay policy may require a user gesture; the poster remains available.
    });
  };

  syncHeroVideoMotion();
  reducedMotion.addEventListener?.('change', syncHeroVideoMotion);

  const readTime = (name, fallback) => {
    const raw = styles.getPropertyValue(name).trim();
    if (!raw) return fallback;
    if (raw.endsWith('ms')) return Number.parseFloat(raw);
    if (raw.endsWith('s')) return Number.parseFloat(raw) * 1000;
    return fallback;
  };

  const durations = Object.freeze({
    fast: readTime('--motion-duration-fast', 180),
    base: readTime('--motion-duration-base', 420),
    slow: readTime('--motion-duration-slow', 650),
    sliderTransition: readTime('--motion-slider-transition', 460),
    sliderInterval: readTime('--motion-slider-interval', 7000),
    formFeedback: readTime('--motion-form-feedback', 1200)
  });

  const legacyDurations = Object.freeze({ serviceTransition: 140, trustTransition: 150 });
  const resolveDuration = (name) => {
    if (name === 'serviceTransition' || name === 'trustTransition') {
      return desktop.matches ? durations.fast : legacyDurations[name];
    }
    return durations[name];
  };

  const after = (name, callback, options = {}) => {
    const delay = reducedMotion.matches && options.motion !== false ? 0 : resolveDuration(name);
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
    return timer;
  };

  const cancel = (timer) => {
    if (timer === undefined) return;
    window.clearTimeout(timer);
    timers.delete(timer);
  };

  window.addEventListener('pagehide', () => {
    [...timers].forEach(cancel);
    reducedMotion.removeEventListener?.('change', syncHeroVideoMotion);
  }, { once: true });

  const createAutoplayController = ({ element, onAdvance, threshold = .18 }) => {
    if (!element) return null;
    let timer;
    let visible = false;
    let hovering = false;
    let focused = false;
    let destroyed = false;
    let observer;

    const debug = {
      enabled: false,
      activeTimers: 0,
      interval: durations.sliderInterval,
      visible: false,
      hovering: false,
      focused: false,
      reduced: reducedMotion.matches,
      documentHidden: document.hidden
    };
    window.__pdpMotionDebug = window.__pdpMotionDebug || {};
    window.__pdpMotionDebug.autoplay = debug;

    const syncDebug = () => {
      debug.enabled = Boolean(timer);
      debug.activeTimers = timer ? 1 : 0;
      debug.visible = visible;
      debug.hovering = hovering;
      debug.focused = focused;
      debug.reduced = reducedMotion.matches;
      debug.documentHidden = document.hidden;
    };

    const clear = () => {
      cancel(timer);
      timer = undefined;
      syncDebug();
    };

    const canRun = () => desktop.matches && visible && !hovering && !focused && !document.hidden && !reducedMotion.matches && !destroyed;

    const schedule = () => {
      clear();
      if (!canRun()) return;
      timer = after('sliderInterval', () => {
        timer = undefined;
        onAdvance();
        schedule();
      });
      syncDebug();
    };

    const restartAfterManual = () => schedule();
    const handleEnter = () => { hovering = true; clear(); };
    const handleLeave = () => { hovering = false; schedule(); };
    const handleFocusIn = () => { focused = true; clear(); };
    const handleFocusOut = (event) => {
      if (element.contains(event.relatedTarget)) return;
      focused = false;
      schedule();
    };
    const handleEnvironment = () => schedule();

    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('mouseleave', handleLeave);
    element.addEventListener('focusin', handleFocusIn);
    element.addEventListener('focusout', handleFocusOut);
    document.addEventListener('visibilitychange', handleEnvironment);
    reducedMotion.addEventListener?.('change', handleEnvironment);
    desktop.addEventListener?.('change', handleEnvironment);

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= threshold);
        schedule();
      }, { threshold });
      observer.observe(element);
    } else {
      visible = true;
      schedule();
    }

    const destroy = () => {
      destroyed = true;
      clear();
      observer?.disconnect();
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('mouseleave', handleLeave);
      element.removeEventListener('focusin', handleFocusIn);
      element.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('visibilitychange', handleEnvironment);
      reducedMotion.removeEventListener?.('change', handleEnvironment);
      desktop.removeEventListener?.('change', handleEnvironment);
    };

    return { clear, schedule, restartAfterManual, destroy, debug };
  };

  window.PDPMotion = Object.freeze({ durations, reducedMotion, desktop, after, cancel, createAutoplayController });
})();
