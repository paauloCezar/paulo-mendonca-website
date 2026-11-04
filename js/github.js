// github grid
const gh=document.getElementById('gh');
// real contributions (paauloCezar), one digit per day, week by week
const GH='00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000020000000000000000000000000000000000000000000000100000000001000000000000000000000000000000000000000000000000000000000000000000000010000000100000001000100000000141100000000010000000000402001000000240001001';
const draw=s=>gh.innerHTML=[...s].map(n=>`<i class="${n>0?'l'+n:''}"></i>`).join('');
draw(GH);
// live data: refresh on every page load (falls back to the snapshot above if offline / rate-limited)
fetch('https://github-contributions-api.jogruber.de/v4/paauloCezar?y=last').then(r=>r.ok?r.json():Promise.reject()).then(j=>{
  const days=j.contributions;if(!days||!days.length)return;
  const lead=new Date(days[0].date+'T00:00:00').getDay();
  let s='0'.repeat(lead)+days.map(d=>Math.min(4,d.level)).join('');
  s=s.padEnd(Math.ceil(s.length/7)*7,'0');
  if(s.length>53*7)s=s.slice(s.length-53*7);
  draw(s);ghTotal.textContent=j.total.lastYear;
}).catch(()=>{});
