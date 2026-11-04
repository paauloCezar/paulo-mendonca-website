// Wiring: button/list clicks, back-button reload, scroll reveal.
pl.addEventListener('click',e=>{if(P[cur].all&&zoomGo){e.preventDefault();zoomGo(pl.getAttribute('href'))}});
addEventListener('pageshow',e=>{if(e.persisted)location.reload()}); // coming back via the browser's back button
// clicking the list jumps to that project
plist.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||!st)return;e.stopImmediatePropagation();
  scrollTo({top:st.start+(+b.dataset.p+.5)/P.length*(st.end-st.start),behavior:reduce?'auto':'smooth'});
},true);
// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
