(()=>{
 document.documentElement.classList.add('js-enabled');

 // Runtime UX refinements. These intentionally change presentation and reading
 // order only; the underlying scientific content remains unchanged.
 const uxStyle=document.createElement('style');
 uxStyle.textContent=`
  @media(max-width:900px){
   .topic-aside{display:flex!important;position:static!important;order:-1;align-items:center;gap:.45rem;overflow-x:auto;padding:.65rem;margin:0 0 .25rem;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;overscroll-behavior-inline:contain}
   .topic-aside::before{content:'Path';flex:0 0 auto;color:var(--faint);font-size:.66rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;padding:0 .15rem}
   .topic-aside h2{display:none}
   .topic-aside a{display:inline-flex;flex:0 0 auto;align-items:center;max-width:260px;padding:.5rem .72rem;border:1px solid var(--line);border-radius:999px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;scroll-snap-align:start}
   .topic-aside a[aria-current=page]{color:var(--text);border-color:var(--cyan);background:rgba(121,224,228,.09)}
  }
  @media(max-width:720px){
   html{scroll-padding-top:132px}
   .section{padding:3.1rem 0}
   .topic-layout{padding-top:1rem}
   .breadcrumb>span{display:none}
   .reading-framework{width:100%;margin:0 0 1rem;padding:1rem}
   .depth-tabs{position:sticky;top:66px;z-index:30;flex-wrap:nowrap;overflow-x:auto;margin:0 -14px 1.3rem;padding:.55rem 14px;background:rgba(5,11,21,.96);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);scrollbar-width:none;-webkit-overflow-scrolling:touch}
   .depth-tabs::-webkit-scrollbar{display:none}
   .depth-tab{flex:0 0 auto!important;white-space:nowrap}
   .depth-panel{scroll-margin-top:132px}
   .depth-choice{min-height:0}
   .reading-depths .utility-card{min-height:0}
  }
  @media(max-width:440px){
   .cover-stack{height:250px;width:260px}
   .cover-stack img{width:125px}
   .cover-stack .cover-one{top:34px}
   .cover-stack .cover-two{left:68px}
   .cover-stack .cover-three{top:42px}
  }
 `;
 document.head.appendChild(uxStyle);

 // On the landing page answer "what is this?" before asking visitors to read
 // the project's origin story. This is especially important on a narrow screen.
 if(location.pathname==='/'){
  const why=document.querySelector('#why');
  const central=document.querySelector('.central-question');
  const depthSection=central?.nextElementSibling;
  if(why&&depthSection&&why.parentElement===depthSection.parentElement)depthSection.after(why);
 }

 // "Published essay" can sound like a journal-publication claim to a first-time
 // reader. These are essays published inside the companion, so label them that way.
 document.querySelectorAll('.status-badge').forEach(badge=>{
  if(badge.textContent.trim().toLowerCase()==='published essay')badge.textContent='Companion essay';
 });

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
  ['/physics/book-two/what-doppler-cancellation-leaves-behind/','What Doppler Cancellation Leaves Behind'],
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
  if(location.pathname==='/physics/book-two/clock-has-not-aged-by-seeing/'){
   const next=document.querySelector('.topic-pager .pager-link.next');
   if(next){
    next.href='/physics/book-two/what-doppler-cancellation-leaves-behind/';
    const strong=next.querySelector('strong');
    if(strong)strong.textContent='What Doppler Cancellation Leaves Behind →';
   }
  }
  if(location.pathname==='/physics/book-two/wrong-problem/'){
   const prev=document.querySelector('.topic-pager .pager-link.prev');
   if(prev){
    prev.href='/physics/book-two/what-doppler-cancellation-leaves-behind/';
    const strong=prev.querySelector('strong');
    if(strong)strong.textContent='← What Doppler Cancellation Leaves Behind';
   }
  }
 }

 const pathThreeThemes=[
  ['/physics/book-three/one-spectrum-many-nouns/','One Spectrum, Many Nouns'],
  ['/physics/book-three/electron-as-receiver/','The Electron as Receiver'],
  ['/physics/book-three/no-electron-responds-alone/','No Electron Responds Alone'],
  ['/physics/book-three/photoelectric-without-impact-picture/','The Photoelectric Effect Without the Impact Picture'],
  ['/physics/book-three/absorption-emission-and-escape/','Absorption, Emission and Escape'],
  ['/physics/book-three/what-is-titraj/','What Is Titraj?'],
  ['/physics/book-three/receiver-scale-across-spectrum/','Prediction: Receiver Scale Across the Spectrum']
 ];
 if(location.pathname.startsWith('/physics/book-three/')&&location.pathname!=='/physics/book-three/'){
  const aside=document.querySelector('.topic-aside');
  if(aside){
   const heading=aside.querySelector('h2')||document.createElement('h2');
   heading.textContent='Path III themes';
   aside.replaceChildren(heading);
   pathThreeThemes.forEach(([href,label])=>{
    const link=document.createElement('a');
    link.href=href;
    link.textContent=label;
    if(location.pathname===href)link.setAttribute('aria-current','page');
    aside.appendChild(link);
   });
  }
  if(location.pathname==='/physics/book-three/what-is-titraj/'){
   const next=document.querySelector('.topic-pager .pager-link.next');
   if(next){
    next.href='/physics/book-three/receiver-scale-across-spectrum/';
    const small=next.querySelector('small');
    const strong=next.querySelector('strong');
    if(small)small.textContent='Next: phenomenon & prediction';
    if(strong)strong.textContent='Receiver Scale Across the Spectrum →';
   }
  }
 }

 // Keep the active topic visible in the mobile horizontal path rail.
 const pathRail=document.querySelector('.topic-aside');
 const currentTopic=pathRail?.querySelector('[aria-current=page]');
 if(pathRail&&currentTopic&&matchMedia('(max-width:900px)').matches){
  requestAnimationFrame(()=>{pathRail.scrollLeft=Math.max(0,currentTopic.offsetLeft-(pathRail.clientWidth-currentTopic.clientWidth)/2)});
 }

 const toggle=document.querySelector('.nav-toggle'), links=document.querySelector('.nav-links');
 if(toggle&&links){
  const closeNav=()=>{links.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')};
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeNav()});
  document.addEventListener('click',event=>{if(links.classList.contains('is-open')&&!links.contains(event.target)&&!toggle.contains(event.target))closeNav()});
 }
 document.querySelectorAll('[data-tabs]').forEach(group=>{
  const tabs=[...group.querySelectorAll('[role=tab]')];
  const readAll=group.querySelector('[data-read-all]');
  const panels=[...group.parentElement.querySelectorAll('[role=tabpanel]')];
  const keepTabVisible=tab=>{
   if(!tab||!matchMedia('(max-width:720px)').matches)return;
   requestAnimationFrame(()=>{group.scrollLeft=Math.max(0,tab.offsetLeft-(group.clientWidth-tab.clientWidth)/2)});
  };
  const showAll=(updateHash=true)=>{
   tabs.forEach(t=>{t.classList.remove('is-active');t.setAttribute('aria-selected','false');t.tabIndex=-1});
   if(readAll){readAll.classList.add('is-active');keepTabVisible(readAll)}
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
   keepTabVisible(tab);
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
