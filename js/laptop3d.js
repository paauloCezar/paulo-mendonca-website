// ---- 3D notebook (three.js) driven by scroll (gsap ScrollTrigger) ----
const pw=document.getElementById('pwrap'),nb=document.getElementById('nb'),info=document.querySelector('.info');
let loadP=null,loadShut=0; // loading state drawn ON the laptop screen (null = normal screen)
const shotCache={};
function shotImg(k){ // project screenshot (img/shots.js); redraws the screen once it has loaded
  if(!k||!window.SHOTS||!SHOTS[k])return null;
  if(!shotCache[k]){const i=new Image();i.onload=()=>{i.ok=1;drawScreen()};i.src=SHOTS[k];shotCache[k]=i}
  return shotCache[k].ok?shotCache[k]:null;
}

// "loading" screen drawn on the laptop's own screen: text + 3 blinking dots, progress bar, then a shutter closing
function drawLoader(c,W,H){
  const top=74,cy=(top+H)/2,t=performance.now()/1000;
  c.save();c.beginPath();c.rect(0,top,W,H-top);c.clip();
  c.strokeStyle='rgba(255,61,139,.07)';c.lineWidth=14;
  for(let x=-H;x<W+H;x+=56){c.beginPath();c.moveTo(x,top);c.lineTo(x+H,top+H);c.stroke()}
  c.textBaseline='middle';c.textAlign='left';
  const label='LOADING'; // always in English
  c.font="700 46px 'JetBrains Mono',monospace";if('letterSpacing' in c)c.letterSpacing='8px';
  const tw=c.measureText(label).width,gap=26,dots=3*20+2*14,x0=W/2-(tw+gap+dots)/2;
  c.fillStyle='#F2F2F4';c.fillText(label,x0,cy-34);
  if('letterSpacing' in c)c.letterSpacing='0px';
  for(let i=0;i<3;i++){c.globalAlpha=.2+.8*Math.max(0,Math.sin(t*7-i*1.0));c.fillStyle='#FF3D8B';
    c.beginPath();c.arc(x0+tw+gap+10+i*34,cy-34,10,0,7);c.fill()}
  c.globalAlpha=1;
  const bx=W/2-300,by=cy+22;
  c.fillStyle='rgba(242,242,244,.18)';c.beginPath();c.roundRect?c.roundRect(bx,by,600,18,9):c.rect(bx,by,600,18);c.fill();
  const g=c.createLinearGradient(bx,0,bx+600,0);g.addColorStop(0,'#FFD400');g.addColorStop(1,'#FF3D8B');
  c.fillStyle=g;c.beginPath();c.roundRect?c.roundRect(bx,by,Math.max(18,600*loadP),18,9):c.rect(bx,by,600*loadP,18);c.fill();
  c.fillStyle='#A0A4AE';c.font="500 22px 'JetBrains Mono',monospace";c.textAlign='center';c.fillText(Math.round(loadP*100)+'%',W/2,by+54);
  if(loadShut>0){ // shutter: two halves close from the top and bottom of the screen, pink seam in the middle
    const h=(H-top)/2*loadShut;c.fillStyle='#14161B';c.fillRect(0,top,W,h);c.fillRect(0,H-h,W,h);
    c.fillStyle='#FF3D8B';c.fillRect(W/2*(1-loadShut),cy-2,W*loadShut,4);
  }
  c.restore();
}
function drawScreen(){
  if(!screenCtx)return;
  const c=screenCtx,W=1280,H=800,d=T[lang].projects[cur];
  c.fillStyle='#14161B';c.fillRect(0,0,W,H);
  c.fillStyle='#14161B';c.fillRect(0,0,W,72);
  c.fillStyle='#2B2F38';c.fillRect(0,72,W,2);
  [40,72,104].forEach(x=>{c.fillStyle='#3A3E48';c.beginPath();c.arc(x,36,9,0,7);c.fill()});
  c.fillStyle='#1E2128';c.beginPath();c.roundRect?c.roundRect(140,18,460,38,10):c.rect(140,18,460,38);c.fill();
  c.fillStyle='#A0A4AE';c.font="22px 'JetBrains Mono',monospace";c.textBaseline='middle';c.textAlign='left';
  c.fillText(P[cur].u,160,37);
  if(loadP!==null){drawLoader(c,W,H);tex.needsUpdate=true;return}
  if(P[cur].all){ // last slot: "see all projects" screen, click goes to projetos.html
    c.save();c.beginPath();c.rect(0,74,W,H-74);c.clip();
    c.strokeStyle='rgba(255,61,139,.07)';c.lineWidth=14;
    for(let x=-H;x<W+H;x+=56){c.beginPath();c.moveTo(x,74);c.lineTo(x+H,74+H);c.stroke()}
    c.restore();
    c.textAlign='center';c.fillStyle='#F2F2F4';c.font="700 84px 'Space Grotesk',sans-serif";c.fillText(d[0],W/2,H/2-40);
    c.fillStyle='#A0A4AE';c.font="500 24px 'JetBrains Mono',monospace";c.fillText(lang==='pt'?'tudo o que está no ar na minha VPS':'everything live on my VPS',W/2,H/2+30);
    c.fillStyle='#FFD400';c.beginPath();c.roundRect?c.roundRect(W/2-190,H/2+90,380,84,42):c.rect(W/2-190,H/2+90,380,84);c.fill();
    c.fillStyle='#14161B';c.font="700 30px 'Space Grotesk',sans-serif";c.fillText(T[lang].all,W/2,H/2+133);
    const cv0=document.getElementById('lp');if(cv0)cv0.style.cursor='pointer';
    tex.needsUpdate=true;return;
  }
  {const cv0=document.getElementById('lp');if(cv0)cv0.style.cursor='pointer'}
  c.save();c.beginPath();c.rect(0,74,W,H-74);c.clip();
  c.strokeStyle='rgba(255,61,139,.07)';c.lineWidth=14;
  for(let x=-H;x<W+H;x+=56){c.beginPath();c.moveTo(x,74);c.lineTo(x+H,74+H);c.stroke()}
  c.restore();
  const hint=()=>{const s=T[lang].hint+' ↗';c.font="500 20px 'JetBrains Mono',monospace";c.textAlign='right';const w=c.measureText(s).width+36;
    c.fillStyle='rgba(20,22,27,.85)';c.beginPath();c.roundRect?c.roundRect(W-w-24,H-68,w,44,22):c.rect(W-w-24,H-68,w,44);c.fill();
    c.fillStyle='#FF3D8B';c.textBaseline='middle';c.fillText(s,W-42,H-45)};
  const im=shotImg(P[cur].shot);
  if(im){c.drawImage(im,0,74,W,H-74);hint();tex.needsUpdate=true;return}
  c.textAlign='center';
  c.fillStyle='#F2F2F4';c.font="700 84px 'Space Grotesk',sans-serif";c.fillText(d[0],W/2,H/2+10);
  c.fillStyle='#FF3D8B';c.font="500 24px 'JetBrains Mono',monospace";
  if('letterSpacing' in c)c.letterSpacing='4px';
  c.fillText(T[lang].shot,W/2,H/2+90);
  if('letterSpacing' in c)c.letterSpacing='0px';
  c.fillStyle='#FFD400';c.font="500 22px 'JetBrains Mono',monospace";c.fillText(P[cur].t.join('  ·  '),W/2,H-70);
  hint();
  tex.needsUpdate=true;
}
function setIdx(i){
  if(i===cur)return;
  info.classList.add('sw');
  if(grp&&!reduce)gsap.fromTo(grp.scale,{x:.95,y:.95,z:.95},{x:1,y:1,z:1,duration:.6,ease:'back.out(2.2)',overwrite:true});
  setTimeout(()=>{cur=i;render();info.classList.remove('sw');shakeFn&&shakeFn()},180);
}
function initLaptop(){
  const cv=document.getElementById('lp'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
  R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(32,1,.1,50);
  cam.position.set(0,1.9,7);cam.lookAt(0,.8,0);
  scene.add(new THREE.AmbientLight(0xffffff,.65));
  const key=new THREE.DirectionalLight(0xffffff,.8);key.position.set(2,4,3);scene.add(key);
  const pink=new THREE.PointLight(0xff3d8b,1.3,14);pink.position.set(-3.5,2,3);scene.add(pink);
  const yel=new THREE.PointLight(0xffd400,.9,14);yel.position.set(3.5,1,-2);scene.add(yel);
  const W=3.4,D=2.3,BH=.1,LH=2.15,LT=.07;
  const shakeG=new THREE.Group();scene.add(shakeG);
  grp=new THREE.Group();shakeG.add(grp);
  const metal=new THREE.MeshStandardMaterial({color:0x3a3e48,metalness:.6,roughness:.4});
  const base=new THREE.Mesh(new THREE.BoxGeometry(W,BH,D),metal);base.position.y=BH/2;grp.add(base);
  // keyboard deck texture
  const kc=document.createElement('canvas');kc.width=1024;kc.height=360;const k=kc.getContext('2d');
  k.fillStyle='#2B2F38';k.fillRect(0,0,1024,360);k.fillStyle='#1E2128';
  for(let r=0;r<5;r++)for(let q=0;q<14;q++){k.beginPath();k.roundRect?k.roundRect(12+q*72,14+r*68,62,56,8):k.rect(12+q*72,14+r*68,62,56);k.fill()}
  const kt=new THREE.CanvasTexture(kc);kt.encoding=THREE.sRGBEncoding;
  const deck=new THREE.Mesh(new THREE.PlaneGeometry(3.0,1.05),new THREE.MeshBasicMaterial({map:kt}));
  deck.rotation.x=-Math.PI/2;deck.position.set(0,BH+.002,-.25);grp.add(deck);
  const pad=new THREE.Mesh(new THREE.PlaneGeometry(1,.55),new THREE.MeshStandardMaterial({color:0x4a4f5b,metalness:.3,roughness:.5}));
  pad.rotation.x=-Math.PI/2;pad.position.set(0,BH+.002,.65);grp.add(pad);
  // lid hinged at the back edge
  lid=new THREE.Group();lid.position.set(0,BH,-D/2+.05);grp.add(lid);
  const shell=new THREE.Mesh(new THREE.BoxGeometry(W,LH,LT),new THREE.MeshStandardMaterial({color:0x1e2128,metalness:.5,roughness:.45}));
  shell.position.y=LH/2;lid.add(shell);
  const sc=document.createElement('canvas');sc.width=1280;sc.height=800;screenCtx=sc.getContext('2d');
  tex=new THREE.CanvasTexture(sc);tex.encoding=THREE.sRGBEncoding;tex.anisotropy=8;
  const scr=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.0),new THREE.MeshBasicMaterial({map:tex}));
  scr.position.set(0,LH/2,LT/2+.002);lid.add(scr);
  // tiny "mouse click" nudge when the project changes: a quick press down, then settle back
  shakeFn=()=>{if(reduce)return;gsap.killTweensOf(shakeG.position);gsap.killTweensOf(shakeG.rotation);
    gsap.timeline()
      .to(shakeG.position,{y:-.05,duration:.08,ease:'power2.out'},0).to(shakeG.rotation,{x:.02,duration:.08,ease:'power2.out'},0)
      .to(shakeG.position,{y:0,duration:.3,ease:'back.out(2.5)'},.08).to(shakeG.rotation,{x:0,duration:.3,ease:'back.out(2.5)'},.08)};
  // fly the camera into the screen (canvas grows to full viewport), fade out, then go to the other page
  let leaving=false;
  zoomGo=url=>{
    if(leaving)return;leaving=true;
    if(reduce){location.href=url;return}
    // freeze the scroll-driven motion and the page scroll so nothing fights the zoom
    // killing the ScrollTrigger can rewind the scrubbed timeline (lid closes), so keep the pose and put it back
    const pose={lx:lid.rotation.x,gx:grp.rotation.x,gy:grp.rotation.y,py:grp.position.y};
    if(st)st.kill();
    gsap.killTweensOf(lid.rotation);gsap.killTweensOf(grp.rotation);gsap.killTweensOf(grp.position);gsap.killTweensOf(shakeG.position);gsap.killTweensOf(shakeG.rotation);
    lid.rotation.x=pose.lx;grp.rotation.x=pose.gx;grp.rotation.y=pose.gy;grp.position.y=pose.py;
    shakeG.position.set(0,0,0);shakeG.rotation.set(0,0,0);
    const stop=e=>e.preventDefault();
    ['wheel','touchmove'].forEach(ev=>addEventListener(ev,stop,{passive:false}));
    addEventListener('keydown',e=>{if([' ','ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(e.key))e.preventDefault()});
    scene.updateMatrixWorld(true);
    const target=new THREE.Vector3(),n=new THREE.Vector3();scr.getWorldPosition(target);scr.getWorldDirection(n);
    const end=target.clone().add(n.multiplyScalar(2.9)),from=cam.position.clone(),look0=new THREE.Vector3(0,.8,0),look=new THREE.Vector3();
    const r=cv.getBoundingClientRect(),o={t:0};
    cv.style.cssText+=';position:fixed;z-index:98;left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';
    const ZOOM=2.3;
    loadP=0;loadShut=0;drawScreen();
    const lp={p:0},sh={v:0};
    gsap.to(lp,{p:1,duration:ZOOM,ease:'none',onUpdate:()=>{loadP=lp.p;drawScreen()},onComplete:()=>{
      gsap.to(sh,{v:1,duration:.55,ease:'power2.inOut',onUpdate:()=>{loadShut=sh.v;drawScreen()},onComplete:()=>{location.href=url}})}});
    gsap.to(o,{t:1,duration:ZOOM,ease:'power3.inOut',onUpdate:()=>{
      const k=o.t,L=r.left*(1-k),T=r.top*(1-k),W=r.width+(innerWidth-r.width)*k,H=r.height+(innerHeight-r.height)*k;
      cv.style.left=L+'px';cv.style.top=T+'px';cv.style.width=W+'px';cv.style.height=H+'px';
      R.setSize(W,H,false);cam.aspect=W/H;
      cam.position.lerpVectors(from,end,k);look.lerpVectors(look0,target,k);cam.lookAt(look);cam.updateProjectionMatrix()}});
  };
  // coming back from projetos.html: replay the zoom backwards (1s shorter), loader on the laptop screen
  let tlRef=null;
  function playBack(){
    let flag=null;try{flag=sessionStorage.getItem('zoomback');sessionStorage.removeItem('zoomback')}catch(e){}
    if(flag!=='1'||reduce||!tlRef)return;
    leaving=true;cur=P.length-1;render();
    ScrollTrigger.refresh();
    const pEnd=(P.length-.5)/P.length;
    scrollTo(0,st.start+pEnd*(st.end-st.start));tlRef.progress(pEnd);
    const stop=e=>e.preventDefault();
    ['wheel','touchmove'].forEach(ev=>addEventListener(ev,stop,{passive:false}));
    scene.updateMatrixWorld(true);
    const target=new THREE.Vector3(),n=new THREE.Vector3();scr.getWorldPosition(target);scr.getWorldDirection(n);
    const zoomed=target.clone().add(n.multiplyScalar(2.9)),homeZ=nb.clientWidth/nb.clientHeight<1.1?9:7,home=new THREE.Vector3(0,1.9,homeZ);
    const look0=new THREE.Vector3(0,.8,0),look=new THREE.Vector3(),r=nb.getBoundingClientRect(),o={t:1},lp={p:0},BACK=2.3-1;
    cv.style.cssText+=';position:fixed;z-index:98;left:0;top:0;width:100vw;height:100vh';
    loadP=0;drawScreen();
    gsap.to(lp,{p:1,duration:BACK,ease:'none',onUpdate:()=>{loadP=lp.p;drawScreen()}});
    gsap.to(o,{t:0,duration:BACK,ease:'power3.inOut',onUpdate:()=>{
      const k=o.t,L=r.left*(1-k),T=r.top*(1-k),W=r.width+(innerWidth-r.width)*k,H=r.height+(innerHeight-r.height)*k;
      cv.style.left=L+'px';cv.style.top=T+'px';cv.style.width=W+'px';cv.style.height=H+'px';
      R.setSize(W,H,false);cam.aspect=W/H;
      cam.position.lerpVectors(home,zoomed,k);look.lerpVectors(look0,target,k);cam.lookAt(look);cam.updateProjectionMatrix()},
      onComplete:()=>{
        ['wheel','touchmove'].forEach(ev=>removeEventListener(ev,stop));
        ['position','z-index','left','top','width','height'].forEach(pr=>cv.style.removeProperty(pr));
        loadP=null;loadShut=0;leaving=false;size();cam.position.set(0,1.9,cam.position.z);cam.lookAt(look0);drawScreen()}});
  }
  drawScreen();document.fonts&&document.fonts.ready.then(drawScreen);
  grp.position.y=-.2;
  function size(){if(leaving)return;const w=nb.clientWidth,h=nb.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.position.z=w/h<1.1?9:7;cam.updateProjectionMatrix()}
  new ResizeObserver(size).observe(nb);size();
  let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(nb);
  gsap.ticker.add(()=>{if(vis)R.render(scene,cam)});
  cv.addEventListener('click',()=>{if(P[cur].all)zoomGo('projetos.html');else if(P[cur].repo)window.open(P[cur].repo,'_blank','noopener')});
  gsap.registerPlugin(ScrollTrigger);
  const upd=s=>setIdx(Math.min(P.length-1,Math.floor(s.progress*P.length)));
  if(reduce){
    lid.rotation.x=-.2;grp.rotation.y=-.35;
    st=ScrollTrigger.create({trigger:pw,start:'top 96px',end:'bottom bottom',onUpdate:upd});
  }else{
    lid.rotation.x=Math.PI/2;grp.rotation.y=-.9;grp.rotation.x=.1;
    const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:pw,start:'top 96px',end:'bottom bottom',scrub:.8,onUpdate:upd}});
    tl.to(lid.rotation,{x:-.2,duration:.14,ease:'power2.out'},0)
      .to(grp.rotation,{y:-.3,x:0,duration:.34},0)
      .to(grp.rotation,{y:.2,duration:.33},.34)
      .to(grp.rotation,{y:.55,duration:.33},.67)
      .to(grp.position,{y:.05,duration:.5},0)
      .to(grp.position,{y:-.2,duration:.5},.5);
    st=tl.scrollTrigger;tlRef=tl;
    addEventListener('load',playBack);
  }
}
if(window.THREE&&window.gsap&&window.ScrollTrigger)initLaptop();
