(() => {
  'use strict';

  const shellStyles = document.createElement('link');
  shellStyles.rel = 'stylesheet';
  shellStyles.href = '../shared/main-shell.css';
  document.head.append(shellStyles);
  const headerStyles = document.createElement('link');
  headerStyles.rel = 'stylesheet';
  headerStyles.href = '../shared/header-shell.css';
  document.head.append(headerStyles);
  const footerStyles = document.createElement('link');
  footerStyles.rel = 'stylesheet';
  footerStyles.href = '../shared/footer-shell.css';
  document.head.append(footerStyles);

  const home = '../';
  const routes = {
    home,
    about: '01-about-company.html',
    services: '02-services.html',
    serviceDetail: '03-service-detail.html',
    projects: '04-projects-clients.html',
    redOctober: '05-project-red-october.html',
    cases: '06-completed-works.html',
    articles: '07-news-articles.html',
    articleDetail: '08-article-detail.html',
    documents: '09-documents-materials.html',
    contacts: '10-contacts.html',
    notFound: '11-404.html',
    privacy: '12-privacy-policy.html'
  };

  const page = document.body.dataset.page || '';
  const asset = (path) => `../assets/${path}`;

  const headerMarkup = `
    <header class="top">
      <a class="brand" href="${routes.home}" aria-label="ПДП — Поволжское деловое партнёрство. Архитектура возможностей">
        <img class="brand-logo" src="${asset('pdp-official-logo.svg')}" width="150" height="50" alt="ПДП — Поволжское деловое партнёрство">
        <span class="brand-slogan">Архитектура<br>возможностей</span>
      </a>
      <nav class="nav" aria-label="Основная навигация">
        <a href="${routes.home}">Главная</a>
        <a class="${page === 'Услуги' ? 'active' : ''}" href="${routes.services}">Услуги</a>
        <a class="${page === 'Кейсы' ? 'active' : ''}" href="${routes.cases}">Кейсы</a>
        <a class="${page === 'Контакты' ? 'active' : ''}" href="${routes.contacts}">Контакты</a>
        <a class="${page === 'Статьи' ? 'active' : ''}" href="${routes.articles}">Статьи</a>
      </nav>
      <a class="tel" href="tel:+78442564554" aria-label="Позвонить: 8 8442 56-45-54">
        <svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4V7C4 14 10 20 17 20H21V17L16 15L14 17C10 16 7 13 6 9L8 7L7 3Z"/></svg>
        <span>8 (8442) 56-45-54</span>
      </a>
      <a class="top-cta" href="${routes.contacts}" data-desktop-label="Поставить задачу" aria-label="Поставить задачу">Поставить задачу</a>
    </header>`;

  const contactMarkup = `
    <section class="contact-form-section" id="contacts">
      <div class="contact-form-intro">
        <span class="label">Предварительный разбор</span>
        <h2><span>Доведём ваш объект</span><span>от проекта до ввода</span></h2>
        <p>Организуем работу проектировщиков и подрядчиков, следим за сроками, качеством и документами. Вы в любой момент понимаете, что происходит на объекте и что нужно для следующего этапа.</p>
        <div class="contact-direct">
          <a href="tel:+78442564554"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4V7C4 14 10 20 17 20H21V17L16 15L14 17C10 16 7 13 6 9L8 7L7 3Z"/></svg><span>8 (8442) 56-45-54</span></a>
          <a href="mailto:mail@ooopdp.ru">mail@ooopdp.ru</a>
          <a class="contact-presentation" href="../assets/documents/pdp-presentation.pdf" download>Скачать презентацию PDF <small>15,4 МБ</small></a>
        </div>
      </div>
      <form class="contact-form" data-contact-form novalidate>
        <div class="form-field"><label for="contact-name">Имя <span aria-hidden="true">*</span></label><input id="contact-name" name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться…" required><small class="form-error" data-error-for="name"></small></div>
        <div class="form-field"><label for="contact-value"><span data-contact-label>Телефон</span> <span aria-hidden="true">*</span></label><input id="contact-value" name="contact" type="tel" autocomplete="tel" inputmode="tel" spellcheck="false" placeholder="+7 999 000-00-00" required><small class="form-error" data-error-for="contact"></small></div>
        <fieldset class="contact-channel"><legend>Как удобнее ответить</legend><label><input type="radio" name="channel" value="phone" checked> Телефон</label><label><input type="radio" name="channel" value="email"> Email</label><label><input type="radio" name="channel" value="messenger"> Мессенджер</label></fieldset>
        <label class="form-consent form-consent-note"><input name="consent" type="checkbox" required><span>Нажимая на кнопку «Получить предварительный разбор проекта», вы соглашаетесь на <a href="${routes.privacy}" target="_blank" rel="noreferrer">обработку персональных данных</a>.</span></label><small class="form-error form-consent-error" data-error-for="consent"></small>
        <button class="form-submit" type="submit"><span>Получить предварительный разбор проекта</span><i aria-hidden="true">→</i></button><p class="form-status" data-form-status aria-live="polite"></p>
      </form>
    </section>`;

  const footerMarkup = `
    <footer class="footer">
      <div class="footer-company"><div class="footer-lockup"><img class="footer-official-logo" src="${asset('pdp-official-logo-footer.svg')}" width="150" height="50" alt="ПДП — Поволжское деловое партнёрство"><span class="footer-slogan">Архитектура<br>возможностей</span></div><small>Берём объект под управление:<br>от проектных решений до ввода.<br><br>© ПДП, 2026</small></div>
      <div class="footer-nav"><b>Навигация</b><a href="${routes.home}">Главная</a><a href="${routes.services}">Услуги</a><a href="${routes.projects}">Проекты</a><a href="${routes.articles}">Материалы</a><a href="${routes.contacts}">Контакты</a></div>
      <div><b>Услуги</b><a href="${routes.services}">Технический заказчик</a><a href="${routes.services}">Проектирование</a><a href="${routes.services}">Строительные работы</a><a href="${routes.services}">Монтаж инженерных систем</a><a href="${routes.services}">Ремонтные работы</a></div>
      <div class="footer-contacts"><div class="footer-contact-copy"><b>Контакты</b><a class="phone2" href="tel:+78442564554"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4V7C4 14 10 20 17 20H21V17L16 15L14 17C10 16 7 13 6 9L8 7L7 3Z"/></svg><span>8 (8442) 56-45-54</span></a><a href="mailto:mail@ooopdp.ru">mail@ooopdp.ru</a><a class="footer-address" href="https://yandex.ru/maps/38/volgograd/house/barrikadnaya_ulitsa_1k/YE0Ycg5lTEcEQFpifXp5eHpqbA==/?ll=44.495523%2C48.689697&amp;z=16" target="_blank" rel="noreferrer">Волгоград, ул. Баррикадная,<br>дом 1К, офис 5</a></div><div class="footer-map" aria-label="Карта расположения офиса ПДП"><div class="footer-map-embed"><iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3Ae6e6ea17780f6cf7b5b20ca42957b3a0e608287bd7129a93a53f6f5ba90f2667" frameborder="0" allowfullscreen="true" allow="geolocation" width="500px" height="400px"></iframe></div><a class="footer-map-link" href="https://yandex.ru/maps/38/volgograd/house/barrikadnaya_ulitsa_1k/YE0Ycg5lTEcEQFpifXp5eHpqbA==/?ll=44.495523%2C48.689697&amp;z=16" target="_blank" rel="noreferrer">Открыть карту <span aria-hidden="true">↗</span></a></div></div>
    </footer>`;

  document.querySelector('[data-site-header]')?.insertAdjacentHTML('beforebegin', headerMarkup);
  document.querySelector('[data-site-header]')?.remove();

  const ctaSlots = [...document.querySelectorAll('[data-cta]')];
  if (ctaSlots.length) ctaSlots.forEach((slot) => slot.outerHTML = contactMarkup);
  else if (page !== 'Контакты') document.querySelector('[data-site-footer]')?.insertAdjacentHTML('beforebegin', contactMarkup);
  document.querySelector('[data-site-footer]')?.insertAdjacentHTML('beforebegin', footerMarkup);
  document.querySelector('[data-site-footer]')?.remove();

  if (page === 'Контакты') {
    document.querySelector('main > .contact-form-section')?.remove();
    document.querySelectorAll('main > .section.container form.contact-form').forEach((form) => form.remove());
    const contactsMap = document.querySelector('main > .section.container .contact-layout > .map');
    if (contactsMap) {
      contactsMap.className = 'footer-map contacts-map';
      contactsMap.innerHTML = '<div class="footer-map-embed"><iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3Ae6e6ea17780f6cf7b5b20ca42957b3a0e608287bd7129a93a53f6f5ba90f2667" frameborder="0" allowfullscreen="true" allow="geolocation" width="500" height="400" title="Карта расположения офиса ПДП"></iframe></div><a class="footer-map-link" href="https://yandex.ru/maps/38/volgograd/house/barrikadnaya_ulitsa_1k/YE0Ycg5lTEcEQFpifXp5eHpqbA==/?ll=44.495523%2C48.689697&amp;z=16" target="_blank" rel="noreferrer">Открыть карту <span aria-hidden="true">↗</span></a>';
    }
  }

  document.querySelector('.not-found-actions .button.hot')?.setAttribute('href', routes.home);

  const messages = {
    error: 'Проверьте отмеченные поля.',
    consent: 'Подтвердите согласие на обработку данных.',
    ready: 'Письмо подготовлено. Открываем почтовый клиент…'
  };

  const ensureError = (control, name) => {
    if (!control || !name) return;
    const wrapper = control.closest('.form-field, .field, .form-consent, .check') || control.parentElement;
    if (!wrapper || wrapper.querySelector(`[data-error-for="${name}"]`)) return;
    const error = document.createElement('small');
    error.className = 'form-error';
    error.dataset.errorFor = name;
    wrapper.append(error);
  };

  const setInvalid = (control, invalid, message = '') => {
    if (!control) return;
    const wrapper = control.closest('.form-field, .field, .form-consent, .check') || control.parentElement;
    wrapper?.classList.toggle('is-invalid', Boolean(invalid));
    control.setAttribute('aria-invalid', String(Boolean(invalid)));
    const error = wrapper?.querySelector('[data-error-for]');
    if (error) error.textContent = invalid ? message : '';
  };

  const bindForm = (form) => {
    if (form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';
    form.noValidate = true;

    const inputs = [...form.querySelectorAll('input')];
    const name = form.querySelector('[name="name"]') || inputs.find((input) => input.type === 'text') || inputs[0];
    const contact = form.querySelector('[name="contact"]') || inputs.filter((input) => input.type !== 'checkbox' && input.type !== 'radio')[1];
    const textarea = form.querySelector('textarea');
    const consent = form.querySelector('[name="consent"]') || form.querySelector('input[type="checkbox"]');
    if (name) name.name = 'name';
    if (contact) contact.name = 'contact';
    if (textarea) textarea.name = 'message';
    if (name) name.required = true;
    if (contact) contact.required = true;
    if (consent) consent.name = 'consent';
    form.querySelector('button')?.setAttribute('type', 'submit');
    ensureError(name, 'name');
    ensureError(contact, 'contact');
    if (textarea) ensureError(textarea, 'message');
    if (consent) ensureError(consent, 'consent');

    const status = form.querySelector('.form-status') || (() => {
      const element = document.createElement('p');
      element.className = 'form-status';
      element.setAttribute('aria-live', 'polite');
      form.append(element);
      return element;
    })();
    const contactLabel = form.querySelector('[data-contact-label]');
    const channelConfig = {
      phone: {label: 'Телефон', type: 'tel', placeholder: '+7 999 000-00-00'},
      email: {label: 'Email', type: 'email', placeholder: 'mail@company.ru'},
      messenger: {label: 'Телефон для мессенджера', type: 'tel', placeholder: '+7 999 000-00-00'}
    };
    const syncChannel = () => {
      const value = form.querySelector('[name="channel"]:checked')?.value || 'phone';
      const config = channelConfig[value] || channelConfig.phone;
      if (contactLabel) contactLabel.textContent = config.label;
      if (contact) { contact.type = config.type; contact.placeholder = config.placeholder; contact.inputMode = config.type === 'email' ? 'email' : 'tel'; }
    };
    form.querySelectorAll('[name="channel"]').forEach((radio) => radio.addEventListener('change', syncChannel));
    syncChannel();
    form.querySelectorAll('input,textarea').forEach((control) => control.addEventListener('input', () => { setInvalid(control, false); status.textContent = ''; }));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const channel = form.querySelector('[name="channel"]:checked')?.value || 'phone';
      const nameValue = name?.value.trim() || '';
      const contactValue = contact?.value.trim() || '';
      const messageValue = textarea?.value.trim() || '';
      const contactValid = channel === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue) : contactValue.replace(/\D/g, '').length >= 10;
      const errors = {
        name: nameValue.length < 2,
        contact: !contactValid,
        message: Boolean(textarea && messageValue.length < 8),
        consent: Boolean(consent && !consent.checked)
      };
      setInvalid(name, errors.name, 'Укажите имя — минимум 2 символа.');
      setInvalid(contact, errors.contact, channel === 'email' ? 'Укажите корректный email.' : 'Укажите телефон — минимум 10 цифр.');
      if (textarea) setInvalid(textarea, errors.message, 'Опишите задачу — минимум 8 символов.');
      if (consent) setInvalid(consent, errors.consent, messages.consent);
      if (Object.values(errors).some(Boolean)) { status.textContent = errors.consent ? messages.consent : messages.error; form.classList.remove('is-shaking'); requestAnimationFrame(() => form.classList.add('is-shaking')); return; }
      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      status.textContent = messages.ready;
      const subject = 'Запрос предварительного разбора проекта';
      const body = [`Имя: ${nameValue}`, `Контакт: ${contactValue}`, messageValue ? `Задача: ${messageValue}` : ''].filter(Boolean).join('\n');
      window.location.href = `mailto:mail@ooopdp.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.setTimeout(() => { if (button) button.disabled = false; }, 900);
    });
  };

  document.querySelectorAll('form.contact-form').forEach(bindForm);

  const setupFilters = () => {
    const catalogTabs = [...document.querySelectorAll('.catalog-tabs button')];
    const catalogItems = [...document.querySelectorAll('.catalog-feature, .grid-3 > .article-card')];
    if (catalogTabs.length && catalogItems.length) {
      const categories = ['industrial', 'public', 'public', 'industrial', 'engineering', 'public'];
      catalogTabs.forEach((tab, index) => tab.addEventListener('click', () => {
        catalogTabs.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === index));
        const selected = ['all', 'industrial', 'public', 'sports', 'engineering'][index] || 'all';
        catalogItems.forEach((item, itemIndex) => item.classList.toggle('is-filtered-out', selected !== 'all' && categories[itemIndex] !== selected));
      }));
    }
    const newsTabs = [...document.querySelectorAll('.filter-tabs a')];
    const newsItems = [...document.querySelectorAll('.article-grid > a')];
    newsTabs.forEach((tab, index) => tab.addEventListener('click', (event) => {
      event.preventDefault();
      newsTabs.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === index));
      const selected = ['all', 'technical', 'project', 'construction', 'management', 'norms'][index] || 'all';
      newsItems.forEach((item, itemIndex) => item.classList.toggle('is-filtered-out', selected !== 'all' && itemIndex !== Math.max(0, index - 1)));
    }));
  };
  setupFilters();

  const setupMotion = () => {
    const targets = [...document.querySelectorAll('.page-hero .hero-copy > *, .section > *, .feature-split > *, .service-row, .process-item, .project-card, .catalog-feature, .article-feature, .article-card, .article-wide, .document-row, .detail-grid > *, .steps .step, .gallery-5 .media, .contact-fact, .contact-form > *, .contact-form-intro > *, .footer > *, .footer-company, .footer-contacts')];
    targets.forEach((target, index) => { target.classList.add('motion-item'); target.style.setProperty('--motion-index', String(Math.min(index % 8, 7))); });
    document.documentElement.classList.add('motion-ready');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal = (target) => target.classList.add('is-visible');
    if (reduced || !('IntersectionObserver' in window)) targets.forEach(reveal);
    else {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); } }), {threshold: .12, rootMargin: '0px 0px -8% 0px'});
      targets.forEach((target) => observer.observe(target));
    }
  };
  setupMotion();

  document.querySelectorAll('a,button').forEach((control) => {
    control.addEventListener('pointerdown', () => control.classList.add('is-pressed'));
    control.addEventListener('pointerup', () => control.classList.remove('is-pressed'));
    control.addEventListener('pointercancel', () => control.classList.remove('is-pressed'));
  });
})();
