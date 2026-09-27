const lockPageForDialog = () => {
  const existing = window.__pdpDialogScrollLock;
  if (existing) {
    existing.depth += 1;
    return;
  }

  const body = document.body;
  const scrollY = window.scrollY;
  const lenis = window.__pdpLenis;
  window.__pdpDialogScrollLock = {
    depth: 1,
    scrollY,
    lenis,
    bodyStyle: {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow
    }
  };

  lenis?.stop?.();
  document.documentElement.classList.add('pdp-dialog-scroll-locked');
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  body.style.overflow = 'hidden';
};

const unlockPageAfterDialog = () => {
  const state = window.__pdpDialogScrollLock;
  if (!state) return;
  state.depth -= 1;
  if (state.depth > 0) return;

  const body = document.body;
  document.documentElement.classList.remove('pdp-dialog-scroll-locked');
  Object.assign(body.style, state.bodyStyle);
  window.scrollTo(0, state.scrollY);
  state.lenis?.start?.();
  delete window.__pdpDialogScrollLock;
};

(() => {
  const dialog = document.querySelector('#lead-dialog');
  if (!dialog || dialog.dataset.bound) return;
  dialog.dataset.bound = 'true';
  const form = dialog.querySelector('form');
  const result = dialog.querySelector('[data-lead-result]');
  const status = dialog.querySelector('[data-lead-status]');
  const demo = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  let opener;
  document.querySelectorAll('[data-lead-open]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      lockPageForDialog();
      dialog.showModal();
      if (!form.hidden) form.elements.email.focus();
    });
  });
  dialog.querySelector('[data-lead-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    unlockPageAfterDialog();
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
(() => {
  const dialog = document.querySelector('#request-dialog');
  if (!dialog) return;
  let opener;
  document.querySelectorAll('[data-request-open]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    opener = button;
    lockPageForDialog();
    dialog.showModal();
  }));
  dialog.querySelector('[data-request-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { unlockPageAfterDialog(); opener?.focus({preventScroll:true}); });
  dialog.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    dialog.querySelector('[data-request-status]').textContent = 'Форма заполнена. Это предварительный просмотр: заявка не отправлена.';
  });
})();
