
const $=s=>document.querySelector(s),B='০১২৩৪৫৬৭৮৯',bn=n=>String(n).replace(/\d/g,d=>B[d]);
const key=d=>d.toISOString().slice(0,10),today=()=>key(new Date());
let S=JSON.parse(localStorage.getItem('pg')||'null')||{days:{},sess:[],goal:180,name:'তুমি',theme:'dark'};
const save=()=>localStorage.setItem('pg',JSON.stringify(S));
document.documentElement.dataset.t=S.theme;
let tab='timer',st='idle',sess=0,brk=300,lp='all';
const tabs=[['timer','📖','পড়া'],['live','🌍','এখন'],['room','🪑','দল'],['board','🏅','র‍্যাংক'],['me','🌱','আমার পড়া']];
const fmt=s=>{const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return (h?bn(h)+' ঘণ্টা ':'')+bn(m)+' মিনিট'};
const clk=s=>{s=Math.max(0,s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),c=s%60,p=n=>bn(String(n).padStart(2,'0'));return (h?p(h)+':':'')+p(m)+':'+p(c)};
const day=d=>S.days[d]||0,sumDays=n=>{let t=0;for(let i=0;i<n;i++){const d=new Date();d.setDate(d.getDate()-i);t+=day(key(d))}return t};
const month=()=>Object.entries(S.days).filter(([k])=>k.slice(0,7)==today().slice(0,7)).reduce((a,[,v])=>a+v,0);
const total=()=>Object.values(S.days).reduce((a,b)=>a+b,0);
const streak=()=>{let n=0,d=new Date();if(day(key(d))<60)d.setDate(d.getDate()-1);while(day(key(d))>=60){n++;d.setDate(d.getDate()-1)}return n};
const col=n=>['#14b8a6','#fb7185','#f59e0b','#22c55e','#06b6d4','#ef4444','#6366f1'][[...n].reduce((a,c)=>a+c.charCodeAt(0),0)%7];
const av=(n,ex='')=>`<div class="av" style="background:${col(n)};${ex}">${[...n][0].toUpperCase()}</div>`;
const owl=`<svg class="mascot" viewBox="0 0 120 120"><ellipse cx="60" cy="68" rx="40" ry="38" fill="#5eead4"/><path d="M42 34l6-14 6 12 6-16 6 16 6-12 6 14z" fill="#0d9488"/><ellipse cx="60" cy="82" rx="26" ry="20" fill="#ecfeff"/><circle cx="34" cy="74" r="7" fill="#f9a8b8" opacity=".8"/><circle cx="86" cy="74" r="7" fill="#f9a8b8" opacity=".8"/><path d="M44 62q6-8 12 0M64 62q6-8 12 0" stroke="#0f3d3a" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M55 72l5 6 5-6z" fill="#0d9488"/><path d="M20 70q-6 14 4 24M100 70q6 14-4 24" stroke="#134e4a" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M88 92h22v10a11 11 0 01-22 0z" fill="#fb7185"/><g fill="none" stroke="#0f3d3a" stroke-width="2.5"><circle cx="48" cy="62" r="9"/><circle cx="72" cy="62" r="9"/><path d="M57 62h6"/></g></svg>`;
const msgs=['একটু হাঁটো, দূরে তাকাও — স্ক্রিন থেকে চোখকে ছুটি দাও 🌿','এক গ্লাস পানি খেয়ে নাও 💧','কাঁধ আর ঘাড় একটু ঘুরিয়ে নাও','গভীর শ্বাস নাও, আবার ফিরে এসো ✨'];
function head(){const t=day(today()),p=Math.min(100,Math.round(t/(S.goal*60)*100)),left=Math.max(0,S.goal*60-t),c=2*Math.PI*20;
return `<div class="card row"><svg class="mini" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="#223052" stroke-width="5"/><circle id="mr" cx="24" cy="24" r="20" fill="none" stroke="#14b8a6" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}" transform="rotate(-90 24 24)"/><text id="mp" x="24" y="28" text-anchor="middle">${bn(p)}%</text></svg><div><b class="big" id="ht">আজ ${fmt(t)}</b><div class="mu" id="hl">লক্ষ্য ${fmt(S.goal*60)} · আর ${fmt(left)}</div></div><span class="fire sp">🔥 ${bn(streak())}</span></div>`}
function timer(){const t=day(today()),p=Math.min(1,t/(S.goal*60)),C=2*Math.PI*128;
const b=st==='idle'?`<button class="btn main" data-a="go">📖 পড়া শুরু</button><button class="btn" data-a="end">শেষ করো</button>`:st==='study'?`<button class="btn main" data-a="brk">☕ বিরতি নাও</button><button class="btn" data-a="end">শেষ করো</button>`:`<button class="btn main" data-a="go">📖 আবার পড়া শুরু</button><button class="btn" data-a="end">শেষ করো</button>`;
return head()+`<div class="banner" data-g="room">🏃 পড়ার রুম · ${clk(5400)} বাকি <span class="sp">›</span></div>
<div class="ringbox"><svg class="ring" viewBox="0 0 270 270"><circle cx="135" cy="135" r="128" fill="none" stroke="#1a2745" stroke-width="12" stroke-dasharray="2 10"/><circle id="rg" cx="135" cy="135" r="128" fill="none" stroke="url(#g)" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-p)}"/><defs><linearGradient id="g"><stop stop-color="#f59e0b"/><stop offset="1" stop-color="#fb7185"/></linearGradient></defs></svg>${owl}</div>
<div class="bubble" id="bb">${msgs[0]}</div><div class="time" id="tm"></div><div class="sub" id="sb"></div>
<div class="btns">${b}</div>${st==='break'?`<button class="btn sm" data-a="plus">+৫ মিনিট</button>`:''}<p class="tip">টিপস: <kbd>Space</kbd> চাপলেও শুরু / থামানো যায়</p>`}
function paintT(){const tm=$('#tm');if(!tm)return;
if(st==='break'){tm.textContent=clk(brk);$('#sb').textContent='বাকি · ব্রেকে আছো'}else{tm.textContent=clk(sess);$('#sb').textContent=st==='study'?'পড়ছো · মনোযোগ ধরে রাখো':'শুরু করতে বাটন চাপো'}
const t=day(today()),g=S.goal*60,p=Math.min(1,t/g),C=2*Math.PI*128;$('#rg').style.strokeDashoffset=C*(1-p);
$('#ht').textContent='আজ '+fmt(t);$('#hl').textContent='লক্ষ্য '+fmt(g)+' · আর '+fmt(Math.max(0,g-t));$('#mp').textContent=bn(Math.round(p*100))+'%';$('#mr').style.strokeDashoffset=2*Math.PI*20*(1-p)}
const demo=[['Mahathir',870,'p'],['Tanha',830,'p'],['Rakib',827,'p'],['Abir',788,'b'],['Toma',719,'p'],['Nihal',658,'p'],['Saimah',489,'o'],['Razia',402,'b'],['Sakib',350,'p'],['Anika',277,'p']];
const stText={p:'📖 পড়ছে',b:'☕ ব্রেকে',o:'📚 অন্য টপিক'};
function live(){const meS=st==='study'?'p':st==='break'?'b':null;
return `<div class="card"><b class="big"><span class="live"></span>এখন যারা পড়ছে</b><p class="mu">কে কী করছে এক নজরে</p></div>`+
[...(meS?[[S.name,Math.floor(sess/60),meS]]:[]),...demo.slice(3)].map(([n,m,s])=>`<div class="li">${av(n,'border-color:'+(s==='p'?'#22c55e':'#f59e0b'))}<div><b>${n}</b><div class="mu">${stText[s]} · ${bn(m)} মি</div></div></div>`).join('')+`<p class="note">নমুনা ডেটা — আসল লাইভ ব্যবহারকারী দেখাতে ব্যাকএন্ড লাগবে।</p>`}
function room(){const ms=[['SAIMOOM',28,'p'],['Nihal',58,'p'],[S.name,Math.floor(sess/60),st==='break'?'b':'p'],['Saimah',89,'o'],['Razia',12,'b'],['Fardin',40,'p']];
const pos=[[50,6],[84,20],[93,50],[84,80],[50,95],[16,80],[7,50],[16,20]];
return `<div class="row" style="margin-top:16px"><div><b class="big">🏃 পড়ার রুম</b><div class="mu">৬ ঘণ্টা · ${bn(ms.length)}/৬০ জন</div></div><button class="chip sp" id="cp">🔗 লিংক</button><span class="chip">ZGCAVE</span></div>
<div class="stage"><div class="orb"><b>${clk(5400-(Math.floor(Date.now()/1000)%5400))}</b><span style="color:#fff;opacity:.8">বাকি</span><span style="color:#fff;font-size:.8rem;margin-top:6px">📖 ${bn(ms.filter(m=>m[2]==='p').length)}/${bn(ms.length)} জন পড়ছে</span></div>
${pos.map((p,i)=>`<div class="seat" style="left:${p[0]}%;top:${p[1]}%">${ms[i]?av(ms[i][0],'border-color:'+(ms[i][2]==='p'?'#22c55e':'#f59e0b'))+`<b>${ms[i][0]}</b><br><span class="mu">${stText[ms[i][2]]} ${bn(ms[i][1])}মি</span>`:`<div class="av empty">+</div><span class="mu">খালি</span>`}</div>`).join('')}</div><p class="note">নমুনা রুম — বন্ধুদের সাথে আসল রুমের জন্য ব্যাকএন্ড লাগবে।</p>`}
function board(){const k={d:1,w:5,m:20,a:60},v={d:day(today())/60,w:sumDays(7)/60,m:month()/60,a:total()/60};
const sc=lp==='a'?'a':lp,rows=[...demo.map(([n,m])=>[n,m*k[sc]]),[S.name,v[sc]]].sort((a,b)=>b[1]-a[1]);
const f=m=>fmt(Math.round(m*60)),pd=(r,c,h)=>r?`<div>${av(r[0])}<p>${r[0]}</p><span class="mu">${f(r[1])}</span><div class="step ${c}" style="${''}">${['','🥇','🥈','🥉'][h]}</div></div>`:'<div></div>';
return `<div class="seg">${[['d','আজ'],['w','এই সপ্তাহ'],['m','এই মাস'],['a','সব সময়']].map(([x,t])=>`<button data-l="${x}" class="${lp===x?'on':''}">${t}</button>`).join('')}</div>
<p class="mu" style="margin-top:10px">🛡️ শুধু যাচাই হওয়া পড়ার সময় গোনা হয়। দিন শুরু ভোর ৪টায়।</p>
<div class="pod">${pd(rows[1],'s2',2)}${pd(rows[0],'s1',1)}${pd(rows[2],'s3',3)}</div>
${rows.slice(3).map((r,i)=>`<div class="li ${r[0]===S.name?'me':''}"><span class="mu">${bn(i+4)}</span>${av(r[0])}<b>${r[0]}</b><b class="sp">${f(r[1])}</b></div>`).join('')}<p class="note">নমুনা র‍্যাংকিং — শুধু "তুমি" লাইনটি তোমার আসল সময়।</p>`}
function me(){const days=[];for(let i=139;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(day(key(d)))}
const lv=s=>{const m=s/60;return m<1?'':m<30?'l1':m<60?'l2':m<120?'l3':'l4'};
const act=Object.values(S.days).filter(x=>x>=60).length,lg=Math.max(0,...S.sess.map(x=>x.s));
const c=(i,t,v,s)=>`<div class="card"><div class="mu">${i} ${t}</div><div class="stat">${v}</div><div class="mu">${s}</div></div>`;
return `<div class="card" style="margin-top:12px"><div class="mu">☀ আজ পড়া</div><div class="hero">${fmt(day(today()))}</div><div class="mu">লক্ষ্যের ${bn(Math.min(100,Math.round(day(today())/(S.goal*60)*100)))}%</div></div>
<div class="grid2" style="margin-top:12px">${c('📅','এই সপ্তাহ',fmt(sumDays(7)),'গত ৭ দিন')}${c('🗓','এই মাস',fmt(month()),'চলতি মাস')}${c('🔥','টানা দিন',bn(streak())+' দিন','প্রতিদিন কমপক্ষে ১ মিনিট')}${c('📈','গড় (পড়ার দিনে)',fmt(act?Math.round(total()/act):0),bn(act)+' দিন পড়েছো')}${c('⏱','সবচেয়ে লম্বা সেশন',bn(Math.floor(lg/60))+' মিনিট',bn(S.sess.length)+'টি সেশন')}${c('∞','সব মিলিয়ে',bn(Math.floor(total()/3600))+' ঘণ্টা',bn(S.sess.length)+'টি সেশন')}</div>
<div class="card"><div class="row"><b>গত ২০ সপ্তাহ</b><span class="mu sp">কম ▫ ▪ বেশি</span></div><div class="heat">${days.map(s=>`<i class="${lv(s)}"></i>`).join('')}</div></div><p class="note">সব তথ্য শুধু এই ব্রাউজারেই সেভ থাকে।</p>`}
function render(){$('#nav').innerHTML=tabs.map(([k,i,t])=>`<button data-t="${k}" class="${tab===k?'on':''}">${i} ${t}${k==='live'?'<span class="badge">৯৯+</span>':''}</button>`).join('');
$('#v').innerHTML={timer,live,room,board,me}[tab]();paintT()}
document.addEventListener('click',e=>{const t=e.target.closest('button,.banner');if(!t)return;
if(t.dataset.t){tab=t.dataset.t;render()}else if(t.dataset.g){tab=t.dataset.g;render()}else if(t.dataset.l){lp=t.dataset.l;render()}
else if(t.dataset.a){const a=t.dataset.a;if(a==='go'){st='study'}else if(a==='brk'){st='break';brk=300;$('#bb')&&0}else if(a==='plus')brk+=300;else if(a==='end'){if(sess>=60){S.sess.push({d:today(),s:sess});save()}st='idle';sess=0}render()}
else if(t.id==='th'){S.theme=S.theme==='dark'?'light':'dark';document.documentElement.dataset.t=S.theme;save()}
else if(t.id==='set'){const g=prompt('দৈনিক লক্ষ্য (মিনিটে):',S.goal);if(g&&+g>0)S.goal=+g;const n=prompt('তোমার নাম:',S.name);if(n)S.name=n.trim()||S.name;save();render()}
else if(t.id==='cp'){navigator.clipboard&&navigator.clipboard.writeText(location.href);t.textContent='✔ কপি হয়েছে'}});
document.addEventListener('keydown',e=>{if(e.code==='Space'&&tab==='timer'&&!/INPUT|TEXTAREA/.test(e.target.tagName)){e.preventDefault();st=st==='study'?'break':'study';if(st==='break')brk=300;render()}});
let last=Date.now(),n=0;setInterval(()=>{const now=Date.now(),d=Math.round((now-last)/1000);last=now;if(d<1)return;
if(st==='study'){sess+=d;S.days[today()]=day(today())+d;if(++n%10===0)save()}
else if(st==='break'){brk-=d;if(brk<=0){st='study';brk=300;if(tab==='timer')render()}}
if(tab==='timer'){paintT();if(n%30===0){const b=$('#bb');if(b)b.textContent=msgs[Math.floor(Math.random()*msgs.length)]}}},1000);
addEventListener('beforeunload',save);render();
