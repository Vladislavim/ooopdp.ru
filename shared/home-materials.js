(()=>{
 const root=document.querySelector('.home-materials');if(!root)return;
 const rows=[...root.querySelectorAll('[data-material-row]')],filters=[...root.querySelectorAll('[data-material-filter]')];
 const image=root.querySelector('[data-material-preview]'),link=root.querySelector('[data-material-preview-link]'),caption=root.querySelector('[data-material-caption]');
 let category='all',request=0;
 const select=async(row,scroll=false)=>{const token=++request;const next=new Image();next.src=row.dataset.preview;try{await next.decode()}catch{return}if(token!==request)return;image.src=next.src;image.alt=row.querySelector('strong').textContent;caption.textContent=image.alt;link.href=row.querySelector('a').href;rows.forEach(r=>{r.classList.toggle('is-active',r===row);r.querySelector('button').setAttribute('aria-pressed',String(r===row))});if(scroll&&matchMedia('(max-width:700px)').matches)image.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});};
 rows.forEach(row=>row.querySelector('button').addEventListener('click',()=>select(row,true)));
 const apply=()=>{const term=root.querySelector('input').value.trim().toLocaleLowerCase('ru');rows.forEach(row=>row.hidden=!((category==='all'||row.dataset.type.split(' ').includes(category))&&row.textContent.toLocaleLowerCase('ru').includes(term)));const visible=rows.filter(r=>!r.hidden);root.querySelector('.home-materials__empty').hidden=visible.length>0;root.querySelector('.home-materials__preview').hidden=!visible.length;if(visible.length&&!visible.some(r=>r.classList.contains('is-active')))select(visible[0]);};
 filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.materialFilter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));apply()}));
 root.querySelector('input').addEventListener('input',apply);
})();
