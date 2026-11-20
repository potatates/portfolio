/*
  The table. Scrolling is the only control: each scroll step glides the camera to the next
  project, its prints gather by themselves and take turns as the lead image; the last step
  pulls back to show the whole table. Words and images come from projects.js.
*/
(function(){
const P=window.PROJECTS, S=window.SITE;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=id=>document.getElementById(id);
const world=$('world'),drift=$('drift'),card=$('card'),intro=$('intro'),outro=$('outro');
const scroller=$('scroller'),rail=$('rail'),hint=$('hint'),topline=$('topline');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* where things sit on the table (world units) */
const WW=3000,WH=2300,IX=1500,IY=1050;
/* the table: Side A along the top, Side B along the bottom, the words in the middle */
const SPOTS=[[600,470],[1500,220],[2400,470],[600,1560],[1500,1680],[2400,1560]];
const TILT=[-1.5,1,-1,1.5,-1,1];
/* each project is one cover print with its other prints tucked behind it like a small pile */
const COVER=440,PILE=[[0,0,0],[24,-18,3],[-22,-24,-3.5],[30,-34,5],[-30,-40,-5]];
const STEPS=['Intro',...P.map(p=>p.title),'The whole table'];

/* text */
intro.innerHTML=`<div class="name">${esc(S.name)}</div><h1>${S.line}</h1><p>${esc(S.sub)}</p>`;
const contact=S.contact.map(([t,u])=>u?`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':''}>${esc(t)}</a>`:`<span>${esc(t)}</span>`).join('');
outro.innerHTML=`<h2>${esc(S.thanks)}</h2><p>${contact}</p>`;
$('text').innerHTML=`<h1>${esc(S.name)}</h1><p>${S.line.replace(/<[^>]+>/g,'')}</p>`+
  P.map(p=>`<section><h2>${esc(p.title)}</h2><p>${esc(p.kind)}</p><p>${esc(p.idea)}</p>`+
    p.beats.map(b=>`<h3>${esc(b[0])}</h3><p>${esc(b[1])}</p>`).join('')+
    p.credits.map(c=>`<p>${esc(c[0])}: ${esc(c[1])}</p>`).join('')+
    (p.link?`<p><a href="${p.link}">Open ${esc(p.title)}</a></p>`:'')+`</section>`).join('')+
  `<p>${S.contact.map(([t,u])=>u?`<a href="${u}">${esc(t)}</a>`:esc(t)).join(' · ')}</p>`;

/* build the prints */
const prints=[],labels=[];
P.forEach((p,pi)=>{
  const [cx,cy]=SPOTS[pi%SPOTS.length];p._spot=[cx,cy];
  p.images.forEach(([k,alt,kind],i)=>{
    const [dx,dy,dr]=PILE[i%PILE.length],w=COVER,r=TILT[pi%TILT.length]+dr;
    const el=document.createElement('button');el.className='print';el.tabIndex=-1;
    /* a print is a still (img/k.jpg) or, with 'video', a clip (img/k.mp4) that shows k.jpg until it plays */
    const clip=kind==='video'||kind==='sound';
    el.innerHTML=clip
      ?`<video src="img/${k}.mp4" poster="img/${k}.jpg" muted playsinline preload="metadata" aria-label="${esc(alt)}"></video>`
      :`<img src="img/${k}.jpg" alt="${esc(alt)}" decoding="async">`;
    const o={el,p,home:null,ar:1.6,w};
    const img=el.querySelector('img,video');o.video=clip?img:null;o.sound=kind==='sound';
    const setHome=()=>{const ww=o.ar<1.05?Math.min(w,400*o.ar):w;o.home={x:cx+dx-ww/2,y:cy+dy-(ww/o.ar)/2,w:ww,r}};
    setHome();
    img.addEventListener(o.video?'loadedmetadata':'load',()=>{o.ar=o.video?img.videoWidth/img.videoHeight:img.naturalWidth/img.naturalHeight;setHome();placeLabel(pi);if(!active||active!==p){if(dealt)place(o,o.home.x,o.home.y,o.home.w,o.home.r)}});
    if(o.video)img.addEventListener('ended',()=>{if(active===p&&order[0]===o)advance()});
    el.addEventListener('click',()=>goStep(pi+1));
    prints.push(o);
  });
  /* add the pile back to front so the cover sits on top */
  prints.filter(o=>o.p===p).reverse().forEach(o=>world.appendChild(o.el));
  const lab=document.createElement('button');lab.className='label';lab.tabIndex=-1;lab.style.left=cx+'px';lab.style.top=(cy+340)+'px';
  lab.innerHTML=`<div class="mono">${esc(p.side)}</div><h2>${esc(p.title)}</h2><p>${esc(p.idea)}</p>`;
  lab.addEventListener('click',()=>goStep(pi+1));world.appendChild(lab);labels.push(lab);
});
/* each label sits just under its cover print */
function placeLabel(pi){const c=prints.find(o=>o.p===P[pi]);
  labels[pi].style.top=(c.home.y+c.home.w/c.ar+14+28)+'px'}
P.forEach((p,pi)=>placeLabel(pi));
STEPS.forEach((t,i)=>{const s=document.createElement('div');s.className='step';scroller.appendChild(s);
  const b=document.createElement('button');b.innerHTML=`<span>${esc(t)}</span><i></i>`;b.setAttribute('aria-label',t);b.onclick=()=>goStep(i);rail.appendChild(b)});

function place(o,x,y,w,r,delay=0){const s=o.el.style;s.transitionDelay=delay+'ms';s.left=x+'px';s.top=y+'px';s.width=w+'px';s.transform=`rotate(${r}deg)`}

/* camera */
const vw=()=>innerWidth,vh=()=>innerHeight;
function look(x,y,z,instant){const ox=vw()/2-x*z,oy=vh()/2-y*z,t=`translate(${ox}px,${oy}px) scale(${z})`;
  if(instant){world.style.transition='none';world.style.transform=t;world.offsetWidth;world.style.transition=''}else world.style.transform=t}
const zIntro=()=>Math.max(.5,Math.min(.85,vw()/1500));
const zAll=()=>Math.min(vw()/2700,vh()/2150);

/* a project gathered in place; its prints take turns as the lead */
let active=null,order=[],cycle=null;
/* clips marked 'sound' start muted (browsers block autoplay with sound); this button turns it on */
let soundOn=false;
const soundBtn=document.createElement('button');soundBtn.className='sound mono';soundBtn.hidden=true;
const setSoundLabel=()=>{soundBtn.textContent=soundOn?'Sound off':'Sound on';soundBtn.setAttribute('aria-pressed',soundOn)};setSoundLabel();
soundBtn.addEventListener('click',()=>{soundOn=!soundOn;setSoundLabel();const l=order[0];if(l&&l.video&&l.sound){l.video.muted=!soundOn;if(l.video.paused)l.video.play().catch(()=>{})}});
document.body.appendChild(soundBtn);
/* rooms and toys (rooms.js): the page takes on the open project's colours, and a toy sits under its video */
const ROOMS=window.ROOMS||{},TOYS=window.TOYS||{},roomEl=$('room');
const toy=document.createElement('div');toy.className='toy';world.appendChild(toy);
let roomTok=0,toyTok=0;
function setRoom(id){
  const r=id&&ROOMS[id],tok=++roomTok;
  document.body.classList.toggle('dark',!!(r&&r.dark));
  roomEl.style.backgroundColor=r?r.bg:'';
  roomEl.classList.add('fading');
  setTimeout(()=>{if(tok!==roomTok)return;roomEl.innerHTML='';roomEl.className='';if(r&&r.fill&&!reduce)r.fill(roomEl);
    requestAnimationFrame(()=>roomEl.classList.remove('fading'))},reduce?0:450);
}
function buildToy(p){
  ++toyTok;clearInterval(toy._timer);const t=TOYS[p.id];
  toy.className='toy toy-'+p.id;toy.innerHTML='';if(!t)return false;
  toy.innerHTML=`<span class="mono">${esc(t.title)}</span><div class="toy-body"></div>`;
  const body=toy.lastElementChild;t.build(body);toy._timer=body._timer;return true;
}
function closeToy(){toy.classList.remove('on');clearInterval(toy._timer);const tok=++toyTok;setTimeout(()=>{if(tok===toyTok)toy.innerHTML=''},700)}
function layout(p,first){
  const [cx,cy]=p._spot,narrow=vw()<760;
  if(narrow){
    const W=360,x0=cx-W/2,y0=cy-260,h=W/order[0].ar;
    order.forEach((o,k)=>{if(k===0){place(o,x0,y0,W+14,0,first?100:0);o.el.classList.add('lead');o.el.classList.remove('gone')}
      else{place(o,x0+W/2-60+k*6,y0+40+k*6,120,k%2?3:-3);o.el.classList.remove('lead');o.el.classList.add('gone')}});
    card.classList.add('compact');card.style.width=(W+14)+'px';card.style.left=x0+'px';card.style.top=(y0+h+34)+'px';
    let H=h+34+card.offsetHeight;
    if(toy.innerHTML){toy.style.width=(W+14)+'px';toy.style.left=x0+'px';toy.style.top=(y0+H+20)+'px';H+=20+toy.offsetHeight}
    return {cx,cy:y0+H/2,w:W+40,h:H+30};
  }
  card.classList.remove('compact');
  const W=1180,cardW=390,gap=24,L=W-cardW-gap,x0=cx-W/2,y0=cy-300;
  const hasToy=!!toy.innerHTML,cap=hasToy?440:520;
  if(p.gallery){ /* every print side by side, same height: for work where the layouts are the point */
    const n=order.length,gw=14,hh=Math.min(cap,...order.map(o=>((L-(n-1)*gw)/n-14)/o.ar));
    let x=x0+(L-(order.reduce((s,o)=>s+hh*o.ar+14,0)+(n-1)*gw))/2;
    order.forEach((o,k)=>{o.el.classList.remove('gone','lead');place(o,x,y0,hh*o.ar+14,0,first?120+k*70:0);x+=hh*o.ar+14+gw});
    let left=hh+14+gap;
    if(hasToy){const tw2=Math.min(L,600);toy.style.width=tw2+'px';toy.style.left=(x0+(L-tw2)/2)+'px';toy.style.top=(y0+left)+'px';left+=toy.offsetHeight}
    card.style.width=cardW+'px';card.style.left=(x0+L+gap)+'px';card.style.top=y0+'px';
    const H=Math.max(left,card.offsetHeight);return {cx,cy:y0+H/2,w:W+60,h:H+40};
  }
  const lead=order[0];let lw=L,lh=lw/lead.ar;if(lh>cap){lh=cap;lw=lh*lead.ar}
  const rest=order.slice(1),n=Math.max(1,rest.length),tw=Math.min(240,(L-(n-1)*14)/n,...rest.map(o=>150*o.ar)),ry=y0+lh+14+gap;
  order.forEach((o,k)=>{o.el.classList.remove('gone');o.el.classList.toggle('lead',k===0)});
  place(lead,x0+(L-lw)/2,y0,lw+14,0,first?120:0);
  const rowW=n*tw+(n-1)*14,rx=x0+(L-rowW)/2;
  rest.forEach((o,k)=>place(o,rx+k*(tw+14),ry,tw,0,first?200+k*70:k*40));
  const rowH=rest.length?Math.max(...rest.map(o=>tw/o.ar))+14:0;
  card.style.width=cardW+'px';card.style.left=(x0+L+gap)+'px';card.style.top=y0+'px';
  let left=lh+14+gap+(rowH?rowH+gap:0);
  if(hasToy){const tw2=Math.min(L,600);toy.style.width=tw2+'px';toy.style.left=(x0+(L-tw2)/2)+'px';toy.style.top=(y0+left)+'px';left+=toy.offsetHeight}
  const H=Math.max(left,card.offsetHeight);
  return {cx,cy:y0+H/2,w:W+60,h:H+40};
}
function cardHTML(p){return `<div class="mono">${esc(p.side)} · ${esc(p.kind)}</div><h2>${esc(p.title)}</h2><p class="idea">${esc(p.idea)}</p>`+
  p.beats.map(b=>`<div class="beat"><h3>${esc(b[0])}</h3><p>${esc(b[1])}</p></div>`).join('')+
  `<dl>${p.credits.map(c=>`<dt>${esc(c[0])}</dt><dd>${esc(c[1])}</dd>`).join('')}</dl>`+
  (p.link?`<a class="try" href="${p.link}" target="_blank" rel="noopener">Try it ↗</a>`:'')}
function openProject(p){
  closeProject(true);active=p;order=prints.filter(o=>o.p===p);
  card.innerHTML=cardHTML(p);buildToy(p);setRoom(p.id);
  const b=layout(p,true);
  look(b.cx,b.cy,Math.min(1,(vw()-(vw()<760?24:120))/b.w,(vh()-130)/b.h));
  card.classList.add('on');if(toy.innerHTML)toy.classList.add('on');
  prints.forEach(o=>o.el.classList.toggle('dim',o.p!==p));
  labels.forEach(l=>l.classList.add('gone'));intro.classList.add('gone');
  playLead();
}
/* the lead print plays if it is a clip; the next print takes over when the clip ends, or after 3.6s for a still */
function playLead(){
  clearTimeout(cycle);cycle=null;
  order.forEach((o,k)=>{if(o.video&&k>0){o.video.pause();o.video.muted=true}});
  const lead=order[0];
  soundBtn.hidden=!lead.sound;if(lead.video)lead.video.muted=!(lead.sound&&soundOn);
  if(lead.video&&!reduce){lead.video.currentTime=0;lead.video.loop=order.length<2;const pr=lead.video.play();if(pr)pr.catch(()=>{cycle=setTimeout(advance,6000)})}
  else if(!reduce&&order.length>1&&!(active&&active.gallery))cycle=setTimeout(advance,3600);
}
function advance(){
  if(!active)return;if(document.hidden){cycle=setTimeout(advance,1000);return}
  if(order.length<2)return;order.push(order.shift());layout(active,false);playLead();
}
function closeProject(quick){
  clearTimeout(cycle);cycle=null;if(!active)return;const p=active;active=null;
  prints.forEach(o=>{if(o.video){o.video.pause();o.video.muted=true}});soundBtn.hidden=true;
  prints.filter(o=>o.p===p).forEach((o,k)=>{o.el.classList.remove('lead','gone');place(o,o.home.x,o.home.y,o.home.w,o.home.r,quick?0:k*40)});
  card.classList.remove('on');closeToy();setRoom(null);
}
function restore(){prints.forEach(o=>o.el.classList.remove('dim'));labels.forEach(l=>l.classList.remove('gone'));intro.classList.remove('gone')}

/* steps */
let step=-1;
function render(i){
  if(i===step)return;step=i;
  [...rail.children].forEach((b,k)=>{b.classList.toggle('on',k===i);b.toggleAttribute('aria-current',k===i)});
  hint.style.opacity=i===0?1:0;
  if(i===0){closeProject();restore();outro.classList.remove('on');look(IX,IY,zIntro());topline.textContent=S.name+' · Portfolio'}
  else if(i<=P.length){outro.classList.remove('on');openProject(P[i-1]);topline.textContent=P[i-1].side}
  else{closeProject();restore();intro.classList.add('gone');outro.classList.add('on');look(IX,1020,zAll());topline.textContent=S.name+' · Portfolio'}
}
function goStep(i){i=Math.max(0,Math.min(STEPS.length-1,i));scroller.scrollTo({top:i*scroller.clientHeight,behavior:reduce?'auto':'smooth'})}
let raf=0;
scroller.addEventListener('scroll',()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;
  const f=scroller.scrollTop/scroller.clientHeight,i=Math.max(0,Math.min(STEPS.length-1,Math.round(f)));
  if(!reduce)drift.style.transform=`translateY(${-(f-i)*90}px)`; // the table follows your hand a little before it settles
  render(i)})});
addEventListener('keydown',e=>{
  const k={ArrowDown:1,PageDown:1,ArrowRight:1,' ':1,ArrowUp:-1,PageUp:-1,ArrowLeft:-1}[e.key];
  if(k&&!e.target.closest('a')){e.preventDefault();goStep(step+k)}
  if(e.key==='Home'){e.preventDefault();goStep(0)} if(e.key==='End'){e.preventDefault();goStep(STEPS.length-1)}});

/* the scroller sits on top of the table; pass clicks and the pointer cursor through to it */
function under(e){scroller.style.pointerEvents='none';const t=document.elementFromPoint(e.clientX,e.clientY);scroller.style.pointerEvents='';return t&&t.closest('#world a, #world button')}
scroller.addEventListener('click',e=>{const hit=under(e);if(hit)hit.click()});
scroller.addEventListener('mousemove',e=>{scroller.style.cursor=under(e)?'pointer':'default'});

/* opening: prints dealt from one stack, then the table breathes */
let dealt=false;
look(IX,IY,zIntro(),true);
prints.forEach((o,k)=>{place(o,IX-120,IY-80,240,(k*37%14)-7);o.el.style.opacity=0});
render(0);
requestAnimationFrame(()=>requestAnimationFrame(()=>{
  prints.forEach((o,k)=>{o.el.style.opacity='';if(!(active&&o.p===active))place(o,o.home.x,o.home.y,o.home.w,o.home.r,reduce?0:300+k*60)});
  setTimeout(()=>{dealt=true;prints.forEach(o=>{o.el.style.transitionDelay='0ms';if(!(active&&o.p===active))place(o,o.home.x,o.home.y,o.home.w,o.home.r)})},300+prints.length*60+900);
}));
if(!reduce)(function breathe(t){
  if(step===0){const k=t/1000;world.style.translate=`${Math.sin(k*.21)*14}px ${Math.cos(k*.17)*10}px`}else world.style.translate='0 0';
  requestAnimationFrame(breathe)})(0);
addEventListener('resize',()=>{const s=step;step=-1;render(s)});
scroller.focus({preventScroll:true});
})();
