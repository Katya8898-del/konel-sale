const PHONE='+7 (000) 000-00-00'; // ЗАГЛУШКА: заменить номер здесь
document.querySelectorAll('[data-phone]').forEach(el=>{
  const hasAction=el.textContent.toLowerCase().includes('связаться');
  el.textContent=(hasAction?'Связаться · ':'')+PHONE;
  el.href='tel:+'+PHONE.replace(/\D/g,'');
});
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
