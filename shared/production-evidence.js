(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-evidence]').forEach(root => {
    const panels = [...root.querySelectorAll('[data-evidence-panel]')];
    const buttons = [...root.querySelectorAll('[data-evidence-select]')];
    const controls = root.querySelector('[data-evidence-controls]');
    const stage = root.querySelector('[data-evidence-stage]');
    if (!panels.length || !controls) return;
    let current = 0, animation, pointer;
    const dialog = document.createElement('dialog');
    dialog.className = 'pdp-gallery-dialog';
    dialog.setAttribute('aria-label','Полноэкранный просмотр материалов проекта');
    dialog.innerHTML = '<button class="pdp-gallery-dialog__close" type="button" aria-label="Закрыть просмотр">Закрыть ×</button><figure><img alt=""><figcaption></figcaption></figure><div class="pdp-gallery-dialog__nav"><button type="button" data-dialog-prev aria-label="Предыдущий материал">←</button><span></span><button type="button" data-dialog-next aria-label="Следующий материал">→</button></div>';
    root.append(dialog);
    const syncDialog = () => {
      const source = panels[current].querySelector('img');
      dialog.querySelector('img').src = source.currentSrc || source.src;
      dialog.querySelector('img').alt = source.alt;
      dialog.querySelector('figcaption').textContent = panels[current].querySelector('figcaption').textContent;
      dialog.querySelector('.pdp-gallery-dialog__nav span').textContent = (current+1)+' / '+panels.length;
    };
    const select = (index, focus = false, animate = true) => {
      current = (index + panels.length) % panels.length;
      animation?.cancel();
      panels.forEach((panel, i) => { panel.hidden = i !== current; });
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
      root.querySelector('[data-evidence-count]').textContent = String(current+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');
      root.querySelector('[data-evidence-caption]').textContent = panels[current].querySelector('figcaption').textContent;
      const active = buttons[current];
      if (active) {
        controls.scrollTo({left:Math.max(0,active.offsetLeft-controls.offsetLeft-controls.clientWidth/2+active.clientWidth/2),behavior:reduced.matches?'instant':'smooth'});
        if (focus) active.focus({preventScroll:true});
      }
      if (animate && !reduced.matches) animation = panels[current].animate([{opacity:.3,transform:'translateX(10px)'},{opacity:1,transform:'translateX(0)'}],{duration:260,easing:'ease-out'});
      if (dialog.open) syncDialog();
    };
    controls.hidden = buttons.length < 2;
    root.querySelector('[data-evidence-toolbar]').hidden = false;
    root.classList.add('is-enhanced');
    buttons.forEach((button, index) => button.addEventListener('click',()=>select(index)));
    const keySelect = event => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const index = event.key==='Home'?0:event.key==='End'?panels.length-1:current+(event.key==='ArrowRight'?1:-1);
      select(index, !dialog.open && buttons.includes(document.activeElement));
    };
    root.addEventListener('keydown',keySelect);
    root.querySelector('[data-evidence-prev]')?.addEventListener('click',()=>select(current-1));
    root.querySelector('[data-evidence-next]')?.addEventListener('click',()=>select(current+1));
    dialog.querySelector('[data-dialog-prev]').addEventListener('click',()=>select(current-1));
    dialog.querySelector('[data-dialog-next]').addEventListener('click',()=>select(current+1));
    dialog.querySelector('.pdp-gallery-dialog__close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
    root.querySelector('[data-evidence-expand]').addEventListener('click',()=>{syncDialog();dialog.showModal();});
    stage.addEventListener('pointerdown',event=>{if(event.isPrimary)pointer={x:event.clientX,y:event.clientY};});
    stage.addEventListener('pointerup',event=>{
      if (!pointer) return;
      const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
      if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.4) select(current+(dx<0?1:-1));
      pointer=null;
    });
    stage.addEventListener('pointercancel',()=>{pointer=null;});
    stage.addEventListener('dragstart',event=>event.preventDefault());
    select(Number(root.dataset.evidenceInitial)||0,false,false);
  });
  document.querySelectorAll('[data-document-register]').forEach(root => {
    const preview = root.querySelector('[data-register-image]');
    const title = root.querySelector('[data-register-title]');
    const open = root.querySelector('[data-register-open]');
    const rows = [...root.querySelectorAll('[data-register-row]')];
    let request = 0;
    const select = async row => {
      const token = ++request;
      const image = row.querySelector('img');
      const link = row.querySelector('a');
      const next = new Image();
      next.src = image.currentSrc || image.src;
      try { await next.decode(); } catch { return; }
      if (token !== request) return;
      preview.src = next.src;
      preview.alt = row.querySelector('strong').textContent;
      title.textContent = preview.alt;
      open.href = link.href;
      rows.forEach(item => {
        item.classList.toggle('is-active', item === row);
        item.querySelector('button').setAttribute('aria-pressed', String(item === row));
      });
    };
    rows.forEach(row => {
      row.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') select(row); });
      row.addEventListener('focusin', () => select(row));
      row.querySelector('button').addEventListener('click', async () => {
        await select(row);
        if (matchMedia('(max-width: 1100px)').matches) preview.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'center' });
      });
    });
    root.classList.add('is-enhanced');
  });
})();
