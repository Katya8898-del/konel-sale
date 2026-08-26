const PHONE='+7 (985) 946-22-98';
document.querySelectorAll('[data-phone]').forEach(el=>{
  const hasAction=el.textContent.toLowerCase().includes('связаться');
  el.textContent=(hasAction?'Связаться · ':'')+PHONE;
  el.href='tel:+'+PHONE.replace(/\D/g,'');
});
document.querySelectorAll('[data-phone-link]').forEach(el=>el.href='tel:+'+PHONE.replace(/\D/g,''));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('[data-menu-toggle]').forEach(button=>{
  const header=button.closest('[data-header]');
  button.addEventListener('click',()=>{
    const open=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(open));
    header.classList.toggle('menu-open',open);
  });
  header.querySelectorAll('[data-menu] a').forEach(link=>link.addEventListener('click',()=>{
    button.setAttribute('aria-expanded','false');
    header.classList.remove('menu-open');
  }));
});

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion){
  document.body.classList.add('motion-ready');
  const targets=[...new Set([
    ...document.querySelectorAll('main>section:not(.cover)>*'),
    ...document.querySelectorAll('.latest article,.names span,.share-grid article,.debt-copy article,.debt-reason,.team-dark .cards article,.confidentiality,.agent-card')
  ])];
  targets.forEach((element,index)=>{
    element.classList.add('motion-item');
    element.style.setProperty('--motion-delay',`${(index%4)*65}ms`);
  });
  document.querySelectorAll('.share-grid article').forEach(article=>{
    const value=article.querySelector('b');
    value.dataset.target=String(parseInt(value.textContent,10));
    value.textContent='0%';
  });
  const countShare=article=>{
    const value=article.querySelector('b');
    if(!value||value.dataset.counted)return;
    value.dataset.counted='true';
    const target=Number(value.dataset.target);
    const delay=parseInt(article.style.getPropertyValue('--motion-delay'),10)||0;
    window.setTimeout(()=>{
      const started=performance.now();
      const duration=1050;
      const tick=now=>{
        const progress=Math.min((now-started)/duration,1);
        const eased=1-Math.pow(1-progress,3);
        value.textContent=`${Math.round(target*eased)}%`;
        if(progress<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },delay+120);
  };
  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('motion-visible');
        if(entry.target.matches('.share-grid article'))countShare(entry.target);
        reveal.unobserve(entry.target);
      }
    });
  },{threshold:.1,rootMargin:'0px 0px -7% 0px'});
  targets.forEach(element=>reveal.observe(element));
}
