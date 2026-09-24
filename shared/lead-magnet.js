(() => {
  const dialog = document.querySelector('#lead-dialog');
  if (!dialog || dialog.dataset.bound) return;
  dialog.dataset.bound = 'true';
  const form = dialog.querySelector('form');
  const result = dialog.querySelector('[data-lead-result]');
  const status = dialog.querySelector('[data-lead-status]');
  const demo = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  dialog.querySelector('[data-lead-demo]').hidden = !demo;
  let opener;
  document.querySelectorAll('[data-lead-open]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      dialog.showModal();
      window.lenis?.stop?.();
      if (!form.hidden) form.elements.email.focus();
    });
  });
  dialog.querySelector('[data-lead-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    window.lenis?.start?.();
    opener?.focus({ preventScroll: true });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    // Backend intentionally deferred. Never claim submission or reveal a success
    // state on a public host without acknowledgement from an actual handler.
    if (!demo) {
      status.textContent = 'Получение материала через форму временно недоступно. Напишите на mail@ooopdp.ru.';
      return;
    }
    form.reset();
    form.hidden = true;
    result.hidden = false;
    result.querySelector('a').focus();
  });
})();
