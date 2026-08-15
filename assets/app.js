(()=>{
 document.documentElement.classList.add('js-enabled');

 // Keep the Path I topic rail in one canonical sequence. This also repairs
 // older cached/static topic pages without reintroducing fixed numbering.
 const pathOneThemes=[
  ['/physics/book-one/what-do-we-actually-observe/','What Do We Actually Observe?'],
  ['/physics/book-one/universe-as-propagation-channel/','The Universe as a Propagation Channel'],
  ['/physics/book-one/redshift-source-or-signal-history/','Redshift and the Propagation Channel'],
  ['/physics/book-one/supernova-duration-and-signal-shape/','Supernova Duration and the Shape of the Signal'],
  ['/physics/book-one/cmb-propagation-response/','The CMB: Relic Signal or Propagation Response?'],
  ['/physics/book-one/soft-horizon/','The Soft Horizon: The Edge of Knowing']
 ];
 if(location.pathname.startsWith('/physics/book-one/')&&location.pathname!=='/physics/book-one/'){
  const aside=document.querySelector('.topic-aside');
  if(aside){
   const heading=aside.querySelector('h2')||document.createElement('h2');
   heading.textContent='Path I themes';
   aside.replaceChildren(heading);
   pathOneThemes.forEach(([href,label])=>{
    const link=document.createElement('a');
    link.href=href;
    link.textContent=label;
    if(location.pathname===href)link.setAttribute('aria-current','page');
    aside.appendChild(link);
   });
  }
  if(location.pathname==='/physics/book-one/supernova-duration-and-signal-shape/'){
   const next=document.querySelector('.topic-pager .pager-link.next');
   if(next){
    next.href='/physics/book-one/cmb-propagation-response/';
    const strong=next.querySelector('strong');
    if(strong)strong.textContent='The CMB: Relic Signal or Propagation Response? →';
   }
  }
 }

 const pathTwoThemes=[
  ['/physics/book-two/light-speed-and-arrival-speed/','Propagation Speed Is Not Encounter Rate'],
  ['/physics/book-two/einstein-synchronization/','Einstein Synchronization: What Is Measured and What Is Assigned'],
  ['/physics/book-two/train-argument/','What the Train Argument Actually Establishes'],
  ['/physics/book-two/clock-has-not-aged-by-seeing/','The Clock Has Not Aged by Seeing'],
  ['/physics/book-two/wrong-problem/','The Wrong Problem']
 ];
 if(location.pathname.startsWith('/physics/book-two/')&&location.pathname!=='/physics/book-two/'&&location.pathname!=='/physics/book-two/sound-motion-and-perceived-wavelength/'){
  const aside=document.querySelector('.topic-aside');
  if(aside){
   const heading=aside.querySelector('h2')||document.createElement('h2');
   heading.textContent='Path II themes';
   aside.replaceChildren(heading);
   pathTwoThemes.forEach(([href,label])=>{
    const link=document.createElement('a');
    link.href=href;
    link.textContent=label;
    if(location.pathname===href)link.setAttribute('aria-current','page');
    aside.appendChild(link);
   });
  }
  if(location.pathname==='/physics/book-two/light-speed-and-arrival-speed/'){
   const next=document.querySelector('.topic-pager .pager-link.next');
   if(next){
    next.href='/physics/book-two/einstein-synchronization/';
    const strong=next.querySelector('strong');
    if(strong)strong.textContent='Einstein Synchronization: What Is Measured and What Is Assigned →';
   }
  }
  if(location.pathname==='/physics/book-two/einstein-synchronization/'){
   const prev=document.querySelector('.topic-pager .pager-link.prev');
   if(prev){
    prev.href='/physics/book-two/light-speed-and-arrival-speed/';
    const strong=prev.querySelector('strong');
    if(strong)strong.textContent='← Propagation Speed Is Not Encounter Rate';
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
