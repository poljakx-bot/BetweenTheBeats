(()=>{
 document.documentElement.classList.add('js-enabled');

 // Path II: the former sound control-case essay has been withdrawn.
 // Keep older cached/internal links from exposing a dead topic and keep the
 // remaining Path II sequence contiguous while the static pages are refreshed.
 const withdrawnSoundPath='/physics/book-two/sound-motion-and-perceived-wavelength/';
 if(location.pathname===withdrawnSoundPath){
  location.replace('/physics/book-two/');
  return;
 }
 document.querySelectorAll(`a[href="${withdrawnSoundPath}"]`).forEach(link=>{
  if(link.matches('.pager-link.next')){
   link.href='/physics/book-two/einstein-synchronization/';
   const strong=link.querySelector('strong');
   if(strong)strong.textContent='Einstein Synchronization →';
   return;
  }
  if(link.matches('.pager-link.prev')){
   link.href='/physics/book-two/light-speed-and-arrival-speed/';
   const strong=link.querySelector('strong');
   if(strong)strong.textContent='← Light Speed Is Not Arrival Speed';
   return;
  }
  const removable=link.closest('.topic-card')||link.closest('li');
  if(removable)removable.remove();
  else link.remove();
 });
 document.querySelectorAll('.topic-aside').forEach(aside=>{
  [...aside.querySelectorAll('a')].forEach((link,index)=>{
   link.textContent=link.textContent.replace(/^\d+\.\s*/,`${index+1}. `);
  });
 });
 document.querySelectorAll('.topic-card-list').forEach(list=>{
  [...list.querySelectorAll('.topic-card')].forEach((card,index)=>{
   const number=card.querySelector('.topic-number');
   if(number)number.textContent=String(index+1).padStart(2,'0');
  });
 });
 const pathTwoThemeNumbers={
  '/physics/book-two/light-speed-and-arrival-speed/':1,
  '/physics/book-two/einstein-synchronization/':2,
  '/physics/book-two/train-argument/':3,
  '/physics/book-two/clock-has-not-aged-by-seeing/':4,
  '/physics/book-two/wrong-problem/':5
 };
 const themeNumber=pathTwoThemeNumbers[location.pathname];
 const kicker=document.querySelector('.topic-kicker');
 if(themeNumber&&kicker&&kicker.textContent.includes('Path II'))kicker.textContent=`Path II · Theme ${themeNumber}`;
 if(location.pathname==='/physics/book-two/train-argument/'){
  const argument=document.getElementById('argument');
  if(argument){
   const headings=[...argument.querySelectorAll(':scope > h3')];
   const soundHeading=headings.find(h=>h.textContent.includes('Why sound is a useful control'));
   if(soundHeading){
    let node=soundHeading;
    while(node){
     const next=node.nextElementSibling;
     node.remove();
     if(next&&next.tagName==='H3'){
      next.textContent=next.textContent.replace(/^7\.\s*/,'6. ');
      break;
     }
     node=next;
    }
   }
  }
 }

 const toggle=document.querySelector('.nav-toggle'), links=document.querySelector('.nav-links');
 if(toggle&&links){
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));
 }
 document.querySelectorAll('[data-tabs]').forEach(group=>{
  const tabs=[...group.querySelectorAll('[role=tab]')];
  const readAll=group.querySelector('[data-read-all]');
  const panels=[...group.parentElement.querySelectorAll('[role=tabpanel]')];
  const showAll=(updateHash=true)=>{
   tabs.forEach(t=>{t.classList.remove('is-active');t.setAttribute('aria-selected','false');t.tabIndex=-1});
   if(readAll)readAll.classList.add('is-active');
   panels.forEach(p=>p.hidden=false);
   if(updateHash&&history.replaceState)history.replaceState(null,'','#read-all');
   if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise(panels);
  };
  const activate=(tab,updateHash=true)=>{
   if(readAll)readAll.classList.remove('is-active');
   tabs.forEach(t=>{const on=t===tab;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});
   const id=tab.getAttribute('aria-controls');
   panels.forEach(p=>p.hidden=p.id!==id);
   const panel=document.getElementById(id);
   if(updateHash&&history.replaceState)history.replaceState(null,'',`#${id}`);
   if(window.MathJax?.typesetPromise&&panel)window.MathJax.typesetPromise([panel]);
  };
  tabs.forEach((tab,i)=>{
   tab.addEventListener('click',e=>{e.preventDefault();activate(tab)});
   tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?tabs.length-1:e.key==='ArrowRight'?(i+1)%tabs.length:(i-1+tabs.length)%tabs.length;tabs[n].focus();activate(tabs[n])});
  });
  if(readAll)readAll.addEventListener('click',e=>{e.preventDefault();showAll()});
  const hash=location.hash.replace('#','');
  if(hash==='read-all')showAll(false);
  else {const selected=tabs.find(t=>t.getAttribute('aria-controls')===hash)||tabs[0];if(selected)activate(selected,false)}
 });

 // Netlify Forms: submit asynchronously so an unrecognised form shows a useful
 // message instead of navigating the visitor to a 404 page.
 document.querySelectorAll('form').forEach(form=>{
  const formName=form.querySelector('input[name="form-name"]');
  if(!formName||String(form.method).toLowerCase()!=='post')return;
  form.addEventListener('submit',async event=>{
   event.preventDefault();
   if(!form.reportValidity())return;
   const button=form.querySelector('button[type="submit"]');
   const originalLabel=button?button.textContent:'';
   let status=form.querySelector('.form-status');
   if(!status){
    status=document.createElement('p');
    status.className='form-status';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    form.appendChild(status);
   }
   status.classList.remove('is-error','is-success');
   status.textContent='Sending…';
   form.setAttribute('aria-busy','true');
   if(button){button.disabled=true;button.textContent='Sending…'}
   try{
    const response=await fetch('/',{
     method:'POST',
     headers:{'Content-Type':'application/x-www-form-urlencoded'},
     body:new URLSearchParams(new FormData(form)).toString()
    });
    if(!response.ok)throw new Error(`Form submission returned ${response.status}`);
    status.classList.add('is-success');
    status.textContent='Received. Opening confirmation…';
    const destination=form.getAttribute('action')||'/thanks/';
    window.location.assign(destination);
   }catch(error){
    console.error(error);
    status.classList.add('is-error');
    status.textContent='The form could not be sent. Please try again after form handling is enabled, or use the contact link.';
    form.removeAttribute('aria-busy');
    if(button){button.disabled=false;button.textContent=originalLabel}
   }
  });
 });
})();
