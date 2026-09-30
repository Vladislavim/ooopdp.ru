(() => {
  'use strict';

  const progress = document.querySelector('[data-contact-progress]');
  const runner = progress?.querySelector('[data-contact-runner]');
  const steps = progress ? [...progress.querySelectorAll('[data-contact-step]')] : [];
  const nodes = progress ? [...progress.querySelectorAll('[data-contact-node]')] : [];
  if (!progress || !runner || steps.length !== 3 || nodes.length !== 3) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let stopped = false;
  let running = false;

  const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
  const positionFor = (node) => {
    const progressRect = progress.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    return {
      x: nodeRect.left - progressRect.left + (nodeRect.width - runner.offsetWidth) / 2,
      y: nodeRect.top - progressRect.top + (nodeRect.height - runner.offsetHeight) / 2
    };
  };
  const transformFor = ({ x, y }) => `translate3d(${x}px, ${y}px, 0)`;
  const activateThrough = (index) => {
    steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex <= index));
  };
  const reset = () => {
    runner.getAnimations().forEach((animation) => animation.cancel());
    activateThrough(0);
    runner.style.transform = transformFor(positionFor(nodes[0]));
  };
  const travel = async (from, to, index) => {
    const animation = runner.animate(
      [{ transform: transformFor(positionFor(from)) }, { transform: transformFor(positionFor(to)) }],
      { duration: 1500, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'forwards' }
    );
    await animation.finished.catch(() => {});
    if (stopped) return;
    runner.style.transform = transformFor(positionFor(to));
    animation.cancel();
    activateThrough(index);
  };
  const run = async () => {
    if (running || stopped || reducedMotion.matches) return;
    running = true;
    while (!stopped && !reducedMotion.matches) {
      reset();
      await wait(350);
      await travel(nodes[0], nodes[1], 1);
      await wait(400);
      await travel(nodes[1], nodes[2], 2);
      await wait(700);
    }
    running = false;
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) run();
  }, { threshold: .25 });

  reset();
  if (!reducedMotion.matches) observer.observe(progress);
  window.addEventListener('resize', reset, { passive: true });
  window.addEventListener('pagehide', () => {
    stopped = true;
    observer.disconnect();
    runner.getAnimations().forEach((animation) => animation.cancel());
  }, { once: true });
})();
