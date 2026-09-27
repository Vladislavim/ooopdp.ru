(()=>{
 const root=document.querySelector('.home-materials');if(!root)return;
 const rows=[...root.querySelectorAll('[data-material-row]')],filters=[...root.querySelectorAll('[data-material-filter]')];
 const image=root.querySelector('[data-material-preview]'),link=root.querySelector('[data-material-preview-link]'),caption=root.querySelector('[data-material-caption]'),download=root.querySelector('[data-material-download]');
 let category='all',request=0,page=1;
 const pageSize=4;
 const pager=document.createElement('nav');pager.className='home-materials__pagination';pager.setAttribute('aria-label','Страницы документов');
 rows[0].parentElement.append(pager);
 const arrow=direction=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="${direction<0?'M19 12H5m6-6-6 6 6 6':'M5 12h14m-6-6 6 6-6 6'}"/></svg>`;
 const renderPager=(total)=>{
  const pages=Math.ceil(total/pageSize);pager.hidden=pages<2;pager.replaceChildren();
  const add=(label,target,content)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',label);button.innerHTML=content;button.disabled=target<1||target>pages;if(target===page&&/^Страница/.test(label))button.setAttribute('aria-current','page');button.addEventListener('click',()=>{page=target;apply(false);pager.querySelector('[aria-current]')?.focus({preventScroll:true})});pager.append(button)};
  add('Предыдущая страница',page-1,arrow(-1));
  for(let i=1;i<=pages;i++)add(`Страница ${i}`,i,String(i).padStart(2,'0'));
  add('Следующая страница',page+1,arrow(1));
  const count=document.createElement('span');count.className='home-materials__page-count';count.setAttribute('aria-live','polite');count.textContent=`${(page-1)*pageSize+1}–${Math.min(page*pageSize,total)} из ${total}`;pager.append(count);
 };
 let ghost=null;
 const select=async(row,scroll=false)=>{
  const token=++request;
  const next=new Image();
  next.src=row.dataset.preview;
  try{await next.decode()}catch{return}
  if(token!==request)return;
  ghost?.remove();ghost=null;
  const previewLink=root.querySelector('[data-material-preview-link]');
  if(previewLink&&image&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&image.src&&image.src!==next.src){
   ghost=image.cloneNode(true);
   ghost.className='home-materials__preview-ghost';
   ghost.setAttribute('aria-hidden','true');
  }
  const title=row.querySelector('strong').textContent;
  const source=row.querySelector('a');
  image.src=next.src;image.alt=title;caption.textContent=title;link.href=source.href;download.href=source.href;download.textContent=`↓ Скачать «${title}»`;download.setAttribute('aria-label',`Скачать документ: ${title}`);
  rows.forEach(r=>{r.classList.toggle('is-active',r===row);r.querySelector('button').setAttribute('aria-pressed',String(r===row))});
  if(ghost&&previewLink){
   const layer=ghost;
   previewLink.append(layer);
   layer.animate([{opacity:1},{opacity:0}],{duration:750,easing:'ease-in-out'}).finished.then(()=>{layer.remove();if(ghost===layer)ghost=null;}).catch(()=>{});
  }
  if(scroll&&matchMedia('(max-width:700px)').matches)image.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
 };
 rows.forEach(row=>row.querySelector('button').addEventListener('click',()=>select(row,true)));
 const apply=(reset=true)=>{if(reset)page=1;const term=root.querySelector('input').value.trim().toLocaleLowerCase('ru');const matches=rows.filter(row=>(category==='all'||row.dataset.type.split(' ').includes(category))&&row.textContent.toLocaleLowerCase('ru').includes(term));page=Math.min(page,Math.max(1,Math.ceil(matches.length/pageSize)));const visible=matches.slice((page-1)*pageSize,page*pageSize);rows.forEach(row=>{row.hidden=!visible.includes(row);row.classList.toggle('is-page-last',row===visible.at(-1))});root.querySelector('.home-materials__empty').hidden=matches.length>0;root.querySelector('.home-materials__preview').hidden=!matches.length;if(visible.length&&!visible.some(r=>r.classList.contains('is-active')))select(visible[0]);renderPager(matches.length);};
 filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.materialFilter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));apply()}));
 root.querySelector('input').addEventListener('input',()=>apply());
 apply();
})();
