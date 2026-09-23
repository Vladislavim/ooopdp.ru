import { casePages } from '../../data/case-pages.js';
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
export function renderGallery(project, id) {
  const count=project.media.length;
  return `<section class="prod-container pdp-case-workspace">
    <div class="pdp-case-gallery-heading"><h2 class="pdp-case-section-title">Объект и решения</h2><span>${String(count).padStart(2,'0')} ${count===1?'материал':'материалов'}</span></div>
    <div class="pdp-evidence pdp-gallery" data-evidence data-evidence-initial="${project.initial||0}" aria-label="Материалы проекта ${escape(project.name)}">
      <div class="pdp-gallery__stage" data-evidence-stage>
      ${project.media.map(([src,title],i)=>`<figure class="pdp-evidence__panel" id="${id}-evidence-${i}" data-evidence-panel><img src="../assets/${src}" alt="${escape(title)}" loading="lazy"><figcaption>${escape(title)}</figcaption></figure>`).join('')}
      </div>
      <div class="pdp-gallery__toolbar" data-evidence-toolbar hidden><div class="pdp-gallery__position" aria-live="polite" aria-atomic="true"><b data-evidence-count>01 / ${String(count).padStart(2,'0')}</b><span data-evidence-caption></span></div><div class="pdp-gallery__actions"><button type="button" data-evidence-expand aria-label="Открыть изображение на весь экран"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"/></svg></button>${count>1?`<button type="button" data-evidence-prev aria-label="Предыдущий материал">${arrow}</button><button type="button" data-evidence-next aria-label="Следующий материал">${arrow}</button>`:''}</div></div>
      <div class="pdp-evidence__controls" data-evidence-controls hidden aria-label="Выбрать материал">${count>1?project.media.map(([src,title],i)=>`<button type="button" aria-controls="${id}-evidence-${i}" aria-pressed="${i===0}" aria-label="${escape(title)}" data-evidence-select="${i}"><img src="../assets/${src}" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></button>`).join(''):''}</div>
    </div>
    ${project.steps?`<div class="pdp-case-workflow"><h3>Пять шагов до передачи</h3><ol>${project.steps.map(x=>`<li>${escape(x)}</li>`).join('')}</ol></div>`:''}
    </section><script src="../shared/production-evidence.js?v=20260922-gallery" defer></script>`;
}
export function renderCase(project,id) {
  const doc=project.document;
  const detailHero=project.detailHero||project.hero;
  const links=Object.values(casePages).filter(p=>p!==project).slice(0,3);
  return `<header class="prod-container pdp-case-masthead"><nav class="prod-breadcrumb" aria-label="Хлебные крошки"><a href="../index.html">Главная</a> / <a href="06-completed-works.html">Кейсы</a> / <span>${escape(project.name)}</span></nav><h1>${escape(project.name)}</h1></header>
  <section class="prod-container pdp-case-spread pdp-case-intro ${detailHero.startsWith('documents/')?'pdp-case-intro--document':''}"><figure class="pdp-case-intro__image"><img src="../assets/${detailHero}" alt="${escape(project.title)}" fetchpriority="high"></figure><div class="pdp-case-intro__copy"><h2>${escape(project.title)}</h2><p>${escape(project.description)}</p><dl class="pdp-case-facts">${project.facts.map(([label,value])=>`<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>${doc?`<a class="pdp-case-file-link" href="../assets/documents/${doc[0]}.pdf">Открыть документацию ${arrow}</a>`:''}</div></section>
  ${project.media.length>1?renderGallery(project,id):''}
  ${doc&&!project.hero.startsWith('documents/')?`<section class="prod-container pdp-case-spread pdp-case-delivery"><a class="pdp-case-delivery__document" href="../assets/documents/${doc[0]}.pdf"><img src="../assets/documents/${doc[0]}-preview.jpg" alt="${escape(doc[1])}" width="420" height="594" loading="lazy"></a><div class="pdp-case-delivery__copy"><h2>Материалы проекта</h2><p>${escape(doc[1])}</p><div class="pdp-case-delivery__meta">${escape(doc[2])}</div><a class="pdp-case-file-link" href="../assets/documents/${doc[0]}.pdf">Открыть PDF ${arrow}</a></div></section>`:''}
  <nav class="prod-container pdp-case-related" aria-label="Другие проекты"><h2>Другие проекты</h2>${links.map(p=>`<a href="${p.href}">${escape(p.name)} ${arrow}</a>`).join('')}</nav>`;
}
export function renderCaseArchive() {
  return '<section class="pcp-archive pcp-container" aria-labelledby="pcp-archive-title"><div class="pcp-section-heading"><div><h2 id="pcp-archive-title">Архитектура и документация</h2></div></div><div class="pcp-archive__grid">'+['polyclinic-31','crmo'].map(id=>{
    const p=casePages[id];
    return `<a class="pcp-project-card" href="${p.href}"><div class="pcp-project-card__media"><img src="../assets/${p.hero}" alt="${escape(p.name)}" loading="lazy"></div><div class="pcp-project-card__meta"><span>${escape(p.facts[0][1])}</span><strong>${escape(p.name)}</strong><i aria-hidden="true"></i></div></a>`;
  }).join('')+'</div></section>';
}

export function renderCaseCatalogue() {
 const entries = [
  {...casePages.severstal, id:'severstal', category:'industrial'},
  {...casePages['red-october'], id:'red-october', category:'industrial', title:'Модернизация травильного отделения', description:'Разработка проектной документации на модернизацию травильного отделения АО «Корпорация Красный Октябрь».', hero:'archive-optimized/PDP-OBJ-006.jpg', after:'industrial-pickling-01.png', facts:[['Тип объекта','Промышленный объект']]},
  {...casePages['polyclinic-31'], id:'polyclinic-31', category:'public', hero:'cases/polyclinic-old-front.jpg', after:'cases/polyclinic-render-front.jpg'},
  {...casePages.crmo, id:'crmo', category:'industrial'},
  {...casePages.eurochem, id:'eurochem', category:'public'},
  {...casePages['alan-kz'], id:'alan-kz', category:'sport'}
 ];
 const asset = x => '../assets/'+x;
 const logos = {'red-october':'krasny-oktyabr.svg',eurochem:'eurochem.svg',severstal:'severstal.svg'};
 const p=entries[0];
 return `<div class="case-catalogue" data-case-catalogue>
 <header class="case-catalogue__intro"><div><nav aria-label="Хлебные крошки"><a href="../index.html">Главная</a><span aria-hidden="true">/</span><span aria-current="page">Проекты</span></nav><h1>Проекты и партнёры</h1><p>Реализуем сложные объекты — от проектных решений до результата.</p></div><p class="case-catalogue__note">Проектирование, строительство и модернизация. Решения для реальных задач.</p></header>
 <div class="case-catalogue__filters" aria-label="Направление проекта">${[['all','Все проекты'],['industrial','Промышленное производство'],['public','Общественные объекты'],['sport','Спортивные сооружения']].map(([id,title],i)=>`<button type="button" data-case-filter="${id}" aria-pressed="${i===0}">${title}</button>`).join('')}</div>
 <section class="case-catalogue__feature" aria-label="Выбранный проект">
 <div class="case-catalogue__copy" aria-live="polite" aria-atomic="true"><span class="case-catalogue__index" data-case-count>01 / 06</span><h2 data-case-name>${escape(p.name)}</h2><p class="case-catalogue__subtitle" data-case-title>${escape(p.title)}</p><dl data-case-facts>${p.facts.map(([k,v])=>`<div><dt>${escape(k)}</dt><dd>${escape(v)}</dd></div>`).join('')}</dl><p class="case-catalogue__description" data-case-description>${escape(p.description)}</p><a class="case-catalogue__link" data-case-link href="${p.href}">Смотреть проект ${arrow}</a></div>
 <div class="case-catalogue__visual"><div class="case-compare" data-case-compare style="--split:46%"><img class="case-compare__base" data-case-after src="${asset(p.after)}" alt="Проектное решение ${escape(p.name)}" fetchpriority="high"><img class="case-compare__before" data-case-before src="${asset(p.hero)}" alt="Исходное состояние ${escape(p.name)}" fetchpriority="high"><span class="case-compare__label case-compare__label--before" data-case-before-label>Исходное состояние</span><span class="case-compare__label case-compare__label--after" data-case-after-label>Проектное решение</span><span class="case-compare__divider" data-case-divider aria-hidden="true"><span>‹ ›</span></span><input data-case-range type="range" min="0" max="100" value="46" aria-label="Сравнение исходного состояния и проектного решения" aria-valuetext="Исходное состояние: 46 процентов"></div><div class="case-catalogue__caption"><span data-case-hint>Перетащите линию, чтобы сравнить</span><div><button type="button" data-case-prev aria-label="Предыдущий проект">←</button><button type="button" data-case-next aria-label="Следующий проект">→</button></div></div></div>
 </section>
 <div class="case-catalogue__rail case-catalogue__rail--logos" aria-label="Выбор проекта">${entries.map((p,i)=>`<button type="button" data-case-select="${i}" data-case-category="${p.category}" aria-label="Показать проект ${escape(p.name)}" aria-pressed="${i===0}"><span>${String(i+1).padStart(2,'0')} / 06</span><div class="case-catalogue__brand">${logos[p.id]?`<img src="../assets/logos/${logos[p.id]}" alt="${escape(p.name)}" loading="lazy">`:`<strong>${escape(p.name)}</strong>`}</div></button>`).join('')}</div>
 <section class="case-catalogue__archive" id="case-archive"><div class="case-catalogue__archive-head"><h2>Другие проекты</h2><span data-case-total>5 проектов</span></div><div class="case-catalogue__grid">${entries.map((p,i)=>`<a class="case-catalogue__card" data-case-card="${i}" data-case-category="${p.category}" href="${p.href}" ${i===0?'hidden':''}><div><img src="${asset(p.after||p.hero)}" alt="${escape(p.title)}" loading="lazy"></div><span>${String(i+1).padStart(2,'0')} / 06</span><h3>${escape(p.name)}</h3><p>${escape(p.title)}</p></a>`).join('')}</div></section>
 <script type="application/json" data-case-data>${JSON.stringify(entries).replaceAll('<','\u003c')}</script></div>`;
}
