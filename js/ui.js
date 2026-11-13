// Language switch + rendering of texts / project info (render() runs once at the end).
function render(){
  const d=T[lang];document.documentElement.lang=lang==='pt'?'pt-BR':'en';
  document.querySelectorAll('[data-i]').forEach(e=>e.textContent=d[e.dataset.i]);
  document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===lang));
  const p=d.projects[cur];
  pn.textContent=p[0];pd.textContent=p[1];drawScreen();pl.href=P[cur].l;
  if(P[cur].all){pl.textContent=d.all;pl.target='_self'}else pl.target='_blank';
  pr.href=P[cur].repo||'#';pr.style.display=(P[cur].all||!P[cur].repo)?'none':'';
  try{localStorage.setItem('lang',lang)}catch(e){}
  pt.innerHTML=P[cur].t.map(t=>`<span>${t}</span>`).join('');
  cnt.textContent=`0${cur+1} / 0${P.length}`;prog.style.width=((cur+1)/P.length*100)+'%';
  plist.innerHTML=d.projects.map((x,i)=>`<button class="${i===cur?'on':''}" data-p="${i}">${x[0]}</button>`).join('');
  plist.querySelectorAll('button').forEach(b=>b.onclick=()=>{cur=+b.dataset.p;render()});
}
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>{lang=b.dataset.l;render()});
render();
