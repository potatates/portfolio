/*
  Rooms and toys.
  When a project opens, the whole page becomes its room (colour plus a quiet moving backdrop),
  and a small toy under the video lets you try the project's main idea.
  Everything a toy needs to be clicked is a <button>: the scroller passes clicks through to buttons only.
*/
(function(){
const R=(n)=>Math.random()*n;
const h=(html)=>{const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild};

/* ---------- rooms ---------- */
const ROOMS={
  zx:{bg:'#eeece4',dark:false,fill(el){
    const g='永字相楷宋圆黑书';
    for(let i=0;i<9;i++){const s=h(`<span class="glyph">${g[i%g.length]}</span>`);
      s.style.cssText=`left:${R(100)}%;top:${R(100)}%;font-size:${160+R(260)}px;animation-delay:-${R(40)}s;animation-duration:${38+R(30)}s;font-family:${i%2?'"Noto Serif SC",serif':'"Noto Sans SC",sans-serif'}`;el.appendChild(s)}}},
  st:{bg:'#070a14',dark:true,fill(el){
    for(let i=0;i<46;i++){const s=h('<i class="mote"></i>');const z=2+R(5);
      s.style.cssText=`left:${R(100)}%;top:${R(100)}%;width:${z}px;height:${z}px;animation-delay:-${R(9)}s;animation-duration:${5+R(7)}s`;el.appendChild(s)}}},
  en:{bg:'#f0e9d9',dark:false,fill(el){el.appendChild(h(`<svg class="ennea" viewBox="-110 -110 220 220" aria-hidden="true">${enneaLines('rgba(80,60,30,.08)',.8)}</svg>`))}},
  h5:{bg:'#17121c',dark:true,fill(el){
    ['#ff4d2e','#8a3cff','#ff2d7a'].forEach((c,i)=>{const b=h('<i class="blob"></i>');b.style.cssText=`background:${c};left:${15+i*30}%;top:${20+(i%2)*45}%;animation-delay:-${i*7}s`;el.appendChild(b)})}},
  fc:{bg:'#030303',dark:true,fill(el){
    const ring=h('<div class="orbits"></div>');
    ['#f8f35e','#2f6bff','#2fe0a8','#e46cff','#ff3b2f','#55d6c8'].forEach((c,i)=>{const o=h('<i class="orb"></i>');const z=60+R(120);
      o.style.cssText=`--c:${c};width:${z}px;height:${z}px;--r:${18+i*6}vmin;animation-delay:-${i*9}s;animation-duration:${50+i*8}s`;ring.appendChild(o)});
    el.appendChild(ring)}},
  cc:{bg:'#f6ead0',dark:false,fill(el){el.classList.add('checker')}}
};

/* the enneagram: a circle, a triangle (3-6-9) and the hexad (1-4-2-8-5-7) */
function pt(n,r=90){const a=(n%9)*40*Math.PI/180;return [Math.sin(a)*r,-Math.cos(a)*r]}
function enneaLines(stroke,w){
  const path=ns=>ns.map((n,i)=>(i?'L':'M')+pt(n).map(v=>v.toFixed(1)).join(' ')).join(' ')+'Z';
  return `<circle r="90" fill="none" stroke="${stroke}" stroke-width="${w}"/>`+
    `<path d="${path([9,3,6])}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`+
    `<path d="${path([1,4,2,8,5,7])}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`;
}

/* ---------- toys ---------- */
const TOYS={
  /* Zixiang: step one character rounder, bolder or more handwritten */
  zx:{title:'Try it: find this 永, but…',build(el){
    const F={start:['Noto Serif SC',400],round:[['Noto Sans SC',400],['ZCOOL KuaiLe',400]],
      bold:[['Noto Serif SC',700],['Noto Serif SC',900],['Noto Sans SC',900]],hand:[['LXGW WenKai TC',400],['Zhi Mang Xing',400],['Ma Shan Zheng',400],['Long Cang',400]]};
    el.innerHTML=`<div class="zx-row"><div class="zx-glyph" aria-live="polite">永</div><div class="zx-side">
      <div class="zx-name mono"></div><div class="zx-btns">
      <button data-a="round">更圆 rounder</button><button data-a="bold">更粗 bolder</button><button data-a="hand">更手写 more handwritten</button><button data-a="reset" class="ghost">↺</button>
      </div><p class="toy-note">A toy version of Zixiang’s steerable “similar fonts”, with a few Google fonts.</p></div></div>`;
    const g=el.querySelector('.zx-glyph'),nm=el.querySelector('.zx-name');const step={round:0,bold:0,hand:0};
    const set=([f,w])=>{g.style.fontFamily=`"${f}"`;g.style.fontWeight=w;nm.textContent=f+(w>400?' '+w:'')};
    set(F.start);
    el.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.a;
      if(a==='reset'){for(const k in step)step[k]=0;set(F.start);return}
      const list=F[a];set(list[step[a]%list.length]);step[a]++;
      g.animate([{transform:'scale(.92)',opacity:.4},{transform:'none',opacity:1}],{duration:260,easing:'ease-out'})}));
  }},

  /* The Structural Trap: catch lights to build a tower, then pull the cracked one */
  st:{title:'Try it: catch the lights',build(el){
    el.innerHTML=`<div class="st-sky"></div><div class="st-foot"><span class="toy-note st-msg">Catch four lights.</span><button class="ghost st-reset" hidden>↺ again</button></div>`;
    const sky=el.querySelector('.st-sky'),msg=el.querySelector('.st-msg'),reset=el.querySelector('.st-reset');
    let stack=[],free=[],cracked=null;
    function spawn(){const b=h('<button class="light" aria-label="Catch this light"></button>');
      b.style.left=(8+R(70))+'%';b.style.top=(10+R(45))+'%';b.style.animationDelay='-'+R(6)+'s';
      b.addEventListener('click',()=>catchIt(b));sky.appendChild(b);free.push(b)}
    function towerPos(i){return {left:'calc(88% - 9px)',top:`calc(100% - ${30+i*26}px)`}}
    function catchIt(b){
      if(b===cracked){pull();return}
      if(!free.includes(b))return;free=free.filter(x=>x!==b);
      b.classList.add('caught');Object.assign(b.style,towerPos(stack.length));stack.push(b);
      if(stack.length<4){spawn();msg.textContent=`${stack.length} caught. The tower lights the dark.`}
      else{free.forEach(f=>f.remove());free=[];cracked=stack[1];cracked.classList.add('cracked');cracked.setAttribute('aria-label','Pull the cracked light');
        msg.textContent='One light cracked. Everything above it rests on it. Pull it out?'}
    }
    function pull(){const i=stack.indexOf(cracked);cracked.classList.add('gone-light');
      stack.slice(i+1).forEach((b,k)=>{b.classList.add('fall');b.style.transitionDelay=(k*90)+'ms'});
      msg.textContent='Everything resting on it fell. “The more we build on something, the more it costs to let it go.”';
      cracked=null;reset.hidden=false}
    reset.addEventListener('click',()=>{sky.innerHTML='';stack=[];free=[];cracked=null;reset.hidden=true;msg.textContent='Catch four lights.';spawn();spawn()});
    spawn();spawn();
  }},

  /* The Wisdom of the Enneagram: tap a number to see where it grows */
  en:{title:'Try it: tap a type to see where it grows',build(el){
    const grow={1:7,2:4,3:6,4:1,5:8,6:9,7:5,8:2,9:3};
    let svg=`<svg class="en-sym" viewBox="-120 -120 240 240">${enneaLines('#b9ab8e',1.4)}<path class="en-arrow" d="" fill="none" stroke="#7a4b1f" stroke-width="3" marker-end="url(#ah)"/>
      <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#7a4b1f"/></marker></defs></svg>`;
    el.innerHTML=`<div class="en-row"><div class="en-wrap">${svg}${[1,2,3,4,5,6,7,8,9].map(n=>{const [x,y]=pt(n,90);return `<button class="en-n" data-n="${n}" style="left:${50+x/2.4}%;top:${50+y/2.4}%">${n}</button>`}).join('')}</div>
      <p class="en-msg toy-note" aria-live="polite">Each type has a direction of growth. Tap a number.</p></div>`;
    const arrow=el.querySelector('.en-arrow'),msg=el.querySelector('.en-msg');
    el.querySelectorAll('.en-n').forEach(b=>b.addEventListener('click',()=>{const n=+b.dataset.n,t=grow[n];
      el.querySelectorAll('.en-n').forEach(x=>x.classList.toggle('on',x===b||+x.dataset.n===t));
      const [x1,y1]=pt(n),[x2,y2]=pt(t);const k=.84;
      arrow.setAttribute('d',`M${x1} ${y1}L${x1+(x2-x1)*k} ${y1+(y2-y1)*k}`);
      arrow.animate([{strokeDasharray:'0 400'},{strokeDasharray:'400 0'}],{duration:500,easing:'ease-out'});
      msg.textContent=`Type ${n} grows toward type ${t}.`}));
  }},

  /* Four sites: two of the choices, in a pocket phone */
  h5:{title:'Try it: two choices from the sites',build(el){
    el.innerHTML=`<div class="h5-row"><div class="h5-phone"><div class="h5-screen">
      <div class="h5-feed"><div class="ep" style="--c:#7a1f2b">EP.01</div><div class="ep" style="--c:#2b3b7a">EP.02</div><div class="ep" style="--c:#1f6a55">EP.03</div><div class="ep" style="--c:#6a4a1f">EP.04</div></div>
      <div class="h5-empty" hidden><b>Your shelf is empty</b><span>Nothing saved yet.</span><button class="h5-go">Discover books</button></div>
      </div></div><div class="h5-side">
      <button class="h5-next">Next episode ↑</button><button class="h5-lib ghost">Open an empty library</button>
      <p class="toy-note h5-msg" aria-live="polite">Episodes slide straight into the next one, no loading screen in between.</p></div></div>`;
    const feed=el.querySelector('.h5-feed'),empty=el.querySelector('.h5-empty'),msg=el.querySelector('.h5-msg');let i=0;
    el.querySelector('.h5-next').addEventListener('click',()=>{empty.hidden=true;i=(i+1)%4;feed.style.transform=`translateY(${-i*100}%)`;msg.textContent='Episodes slide straight into the next one, no loading screen in between.'});
    el.querySelector('.h5-lib').addEventListener('click',()=>{empty.hidden=false;msg.textContent='An empty page never dead-ends: it hands you a way to keep browsing.'});
    el.querySelector('.h5-go').addEventListener('click',()=>{empty.hidden=true;msg.textContent='Back to browsing.'});
  }},

  /* Friend Clock: the time now, friends on rings; tap a friend to change the colours */
  fc:{title:'Try it: tap a friend',build(el){
    const themes=[['#000','#9fe4f7'],['#000','#ffb2dd'],['linear-gradient(135deg,#f5a6d8,#a8e2f5)','#e8358f'],['#fff6c9','#e0a400'],['#dff7ea','#159a66']];
    el.innerHTML=`<div class="fc-face"><div class="fc-rings"><i></i><i></i><i></i></div><div class="fc-time" aria-live="off"></div></div><p class="toy-note">Rings show time-zone distance; a bigger circle means you talked more this week.</p>`;
    const face=el.querySelector('.fc-face'),rings=el.querySelector('.fc-rings'),time=el.querySelector('.fc-time');
    const friends=[['#f8f35e',24,3,0],['#2f6bff',18,3,290],['#2fe0a8',26,2,250],['#e46cff',20,2,60],['#ff3b2f',24,3,140],['#55d6c8',14,1,200]];
    let t=0;const paint=()=>{const [bg,ink]=themes[t%themes.length];face.style.background=bg;time.style.color=ink};
    friends.forEach(([c,z,ring,deg])=>{const b=h('<button class="fc-f" aria-label="A friend"></button>');const r=ring*23;
      b.style.cssText=`width:${z}px;height:${z}px;background:radial-gradient(circle at 40% 40%,#fff8,${c} 60%);left:${75+Math.sin(deg*Math.PI/180)*r-z/2}px;top:${75-Math.cos(deg*Math.PI/180)*r-z/2}px`;
      b.addEventListener('click',()=>{t++;paint();b.animate([{transform:'scale(1.3)'},{transform:'none'}],{duration:300})});rings.appendChild(b)});
    const tick=()=>{const d=new Date();time.textContent=d.getHours()%12||12;time.textContent+=':'+String(d.getMinutes()).padStart(2,'0')};tick();el._timer=setInterval(tick,10000);
    paint();
  }},

  /* The Coffee Cats: bake, merge, serve */
  cc:{title:'Try it: bake, merge, serve',build(el){
    el.innerHTML=`<div class="cc-row"><div class="cc-board"></div><div class="cc-side"><div class="cc-order">Order: <b>1 pain au chocolat</b></div><div class="cc-coins mono">coins <b>1339</b></div>
      <p class="toy-note cc-msg" aria-live="polite">Tap the oven to bake a croissant.</p></div></div>`;
    const board=el.querySelector('.cc-board'),msg=el.querySelector('.cc-msg'),coins=el.querySelector('.cc-coins b');let sel=null,served=0;
    const tiles=[];for(let i=0;i<8;i++){const b=h('<button class="tile"></button>');board.appendChild(b);tiles.push(b);b.addEventListener('click',()=>tap(b))}
    const oven=tiles[0];oven.classList.add('oven');oven.innerHTML='<span>🔥</span><small>oven</small>';
    const set=(b,k)=>{b.dataset.k=k||'';b.innerHTML=k==='c'?'<span>🥐</span>':k==='p'?'<span>🥐</span><em>🍫</em>':''};
    function tap(b){
      if(b===oven){const e=tiles.find(x=>x!==oven&&!x.dataset.k);if(!e){msg.textContent='The board is full: merge something.';return}
        set(e,'c');e.animate([{transform:'scale(.3)'},{transform:'none'}],{duration:260,easing:'ease-out'});msg.textContent='Tap a croissant, then another one to merge them.';return}
      const k=b.dataset.k;if(!k){if(sel){sel.classList.remove('sel');sel=null}return}
      if(k==='p'){set(b,'');served++;coins.textContent=1339+150*served;msg.textContent='Served! +150 coins. The cat is happy.';return}
      if(!sel){sel=b;b.classList.add('sel');return}
      if(sel===b){b.classList.remove('sel');sel=null;return}
      if(sel.dataset.k==='c'&&k==='c'){set(sel,'');sel.classList.remove('sel');sel=null;set(b,'p');b.animate([{transform:'scale(1.25)'},{transform:'none'}],{duration:300});msg.textContent='A pain au chocolat! Tap it to serve the order.'}
      else{sel.classList.remove('sel');sel=b;b.classList.add('sel')}
    }
  }}
};

window.ROOMS=ROOMS;window.TOYS=TOYS;
})();
