// EDIT HERE: one entry per project. shot = key in img/shots.js (preview image).
// live = true when the project is online at `url`; otherwise only the repo link is shown.
const PROJECTS=[
  {name:'WestSystem',shot:'westsystem',live:true,url:'https://2cca42af.westsystem.pages.dev',repo:'https://github.com/paauloCezar/westsystem',label:'2cca42af.westsystem.pages.dev',tags:['HTML','CSS','JavaScript'],
   d:{pt:'Landing page da minha empresa de soluções digitais sob medida, com contato direto pelo WhatsApp.',en:'Landing page for my custom digital solutions company, with direct WhatsApp contact.'}},
  {name:'Acervo',shot:'acervo',live:true,url:'https://p26-2b-a8e8-1049-96b9-da17.pages.dev',repo:'',label:'p26-2b-a8e8-1049-96b9-da17.pages.dev',tags:['JavaScript','Discord OAuth','Cloudflare'],
   d:{pt:'Acervo de citações e notas de leitura: guarde trechos de livros, artigos e palestras e escreva sua reflexão na margem. Login com Discord e dados na Cloudflare.',en:'Quotes and reading-notes library: save passages from books, articles and talks and write your reflection in the margin. Discord login and data on Cloudflare.'}},
  {name:'ERP Controle de Estoque',shot:'erp',live:false,url:'',repo:'https://github.com/paauloCezar/ERP-controle-de-estoque',label:'github.com/paauloCezar/ERP-controle-de-estoque',tags:['HTML','CSS','JavaScript'],
   d:{pt:'Sistema de ERP e estoque automotivo feito para a faculdade: login, cadastro sem duplicidade, código sequencial e consulta de estoque.',en:'Automotive ERP and stock system built for college: login, duplicate-free registration, sequential codes and stock lookup.'}},
  {name:'OAuth Login Lab',shot:'oauth',live:true,url:'https://oauth-login-lab.pages.dev',repo:'https://github.com/paauloCezar/oauth-login-lab',label:'oauth-login-lab.pages.dev',tags:['JavaScript','HTML','Cloudflare'],
   d:{pt:'Laboratório de login federado (Google e GitHub OAuth/OIDC) no Cloudflare Pages, com Functions, banco D1 e CI no GitHub Actions.',en:'Federated login lab (Google and GitHub OAuth/OIDC) on Cloudflare Pages, with Functions, a D1 database and CI on GitHub Actions.'}}
];
const T={
 pt:{back:'← Voltar',title:'Todos os projetos',sub:'Tudo o que eu já fiz e coloquei no ar na minha VPS, num só lugar.',live:'no ar',repoOnly:'código aberto',open:'Abrir projeto ↗',code:'Ver código ↗'},
 en:{back:'← Back',title:'All projects',sub:'Everything I have built and deployed on my VPS, in one place.',live:'live',repoOnly:'open source',open:'Open project ↗',code:'View code ↗'}};
let lang='pt';try{lang=localStorage.getItem('lang')==='en'?'en':'pt'}catch(e){}
function render(){
  const d=T[lang];document.documentElement.lang=lang==='pt'?'pt-BR':'en';
  document.querySelectorAll('[data-i]').forEach(e=>e.textContent=d[e.dataset.i]);
  document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===lang));
  document.getElementById('grid').innerHTML=PROJECTS.map(p=>`<article class="card">
    <a class="thumb" href="${p.repo||p.url}" target="_blank" rel="noopener" title="${p.repo?d.code:d.open}">${window.SHOTS&&SHOTS[p.shot]?`<img src="${SHOTS[p.shot]}" alt="${p.name}">`:''}</a>
    <div class="top"><span>${p.label}</span>${p.live?`<span class="live">${d.live}</span>`:`<span>${d.repoOnly}</span>`}</div>
    <h2>${p.name}</h2><p>${p.d[lang]}</p>
    <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
    <div class="acts">${p.live?`<a class="open" href="${p.url}" target="_blank" rel="noopener">${d.open}</a>`:''}${p.repo?`<a class="${p.live?'ghost':'open'}" href="${p.repo}" target="_blank" rel="noopener">${d.code}</a>`:''}</div></article>`).join('');
}
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>{lang=b.dataset.l;try{localStorage.setItem('lang',lang)}catch(e){}render()});
render();
// back to the site: index.html replays the laptop zoom backwards (1s shorter than the way in)
document.querySelector('.back').addEventListener('click',e=>{e.preventDefault();try{sessionStorage.setItem('zoomback','1')}catch(err){}location.href='index.html#projetos'});
