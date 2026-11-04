// Hero code window: types itself on load.
const lines=[
'<span class="k">const</span> paulo = {',
'  nome: <span class="s">"Paulo Cezar"</span>,',
'  stack: [<span class="s">"Java"</span>],',
'  cafe: <span class="k">true</span>,',
'};','',
'<span class="c">// bora trabalhar juntos?</span>',
'paulo.<span class="f">contratar</span>();'];
const full=lines.join('\n');const el=document.getElementById('code');
(function type(){
  // type visible characters, keeping tags intact
  let i=0,out='',inTag=false;
  function step(){
    if(i>=full.length){el.innerHTML=out+'<span class="cur"></span>';return}
    do{const ch=full[i++];out+=ch;if(ch==='<')inTag=true;if(ch==='>')inTag=false}while(inTag&&i<full.length);
    // close open spans for partial render
    const opens=(out.match(/<span/g)||[]).length,closes=(out.match(/<\/span>/g)||[]).length;
    el.innerHTML=out+'</span>'.repeat(Math.max(0,opens-closes))+'<span class="cur"></span>';
    setTimeout(step,35);
  }
  reduce?(el.innerHTML=full+'<span class="cur"></span>'):setTimeout(step,500);
})();
