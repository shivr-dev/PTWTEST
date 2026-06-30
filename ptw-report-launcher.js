(function(){
  const STORAGE_KEY='ptw2027.currentUser';
  function readUser(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch{return null}}
  function isAdmin(user){
    const role=String((user&&user.role)||'').toLowerCase();
    return ['admin','administrator','super_admin','owner'].includes(role);
  }
  function inExportPage(){return /(?:score-report-export|certificate-export)\.html/i.test(location.pathname)}
  function mount(){
    if(inExportPage())return;
    const user=readUser();
    if(!isAdmin(user))return;
    if(document.getElementById('ptw-report-tools-launcher'))return;
    const wrap=document.createElement('div');
    wrap.id='ptw-report-tools-launcher';
    wrap.style.cssText='position:fixed;right:18px;bottom:18px;z-index:95;display:flex;flex-direction:column;gap:8px;align-items:flex-end;';
    const make=(href,label,sub)=>{
      const a=document.createElement('a');
      a.href=href;a.target='_blank';a.rel='noopener';a.innerHTML='<strong>'+label+'</strong><span>'+sub+'</span>';
      a.style.cssText='display:flex;flex-direction:column;gap:2px;align-items:flex-start;border-radius:18px;border:1px solid rgba(15,23,42,.12);background:#05070d;color:#fff;padding:10px 14px;font:800 12px Inter,system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;box-shadow:0 18px 50px rgba(15,23,42,.24);min-width:174px;';
      const span=a.querySelector('span');span.style.cssText='font:600 10px Inter,system-ui,sans-serif;letter-spacing:.02em;text-transform:none;color:#cbd5e1;';
      return a;
    };
    wrap.appendChild(make('./score-report-export.html','Score Reports','report QR + barcode'));
    wrap.appendChild(make('./certificate-export.html','Certificates','certificate QR + barcode'));
    document.body.appendChild(wrap);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
  window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY)setTimeout(mount,50)});
  setTimeout(mount,1800);
})();
