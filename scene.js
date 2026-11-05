const AISLEScene = (() => {
 function markup() {
  const colours = ['#b398b8','#d2a7b4','#99a7bd','#d4c3aa'];
  const vials = colours.map((colour,i)=>'<g transform="translate('+(99+i*44)+' 199)"><ellipse cy="63" rx="18" ry="7" fill="#000" opacity=".18"/><path d="M-13 0Q0-6 13 0V50Q0 62-13 50Z" fill="url(#scene-glass)" stroke="#b7cbdc66"/><path d="M-12 26Q0 31 12 26V50Q0 60-12 50Z" fill="'+colour+'" opacity=".82"/><ellipse cy="26" rx="12" ry="4" fill="'+colour+'"/><ellipse rx="13" ry="5" fill="#263746" stroke="#b7cbdc88"/><path d="M-8 9v34" stroke="#fff" stroke-opacity=".3" stroke-width="2"/><text y="82" text-anchor="middle" class="component-label">'+'ABCD'[i]+'</text></g>').join('');
  return '<svg class="scene-svg" viewBox="0 0 720 430" role="img" aria-labelledby="scene-label"><title id="scene-label">Illustrated colour-matching loop: propose a formulation, dispense and mix, observe colour, and adjust the next formulation.</title><defs><linearGradient id="scene-glass"><stop stop-color="#b7cbdc" stop-opacity=".3"/><stop offset=".45" stop-color="#435564" stop-opacity=".08"/><stop offset="1" stop-color="#b7cbdc" stop-opacity=".2"/></linearGradient><linearGradient id="scene-steel"><stop stop-color="#71889b"/><stop offset=".45" stop-color="#d4dce1"/><stop offset="1" stop-color="#64788a"/></linearGradient><radialGradient id="scene-light"><stop stop-color="#92adcc" stop-opacity=".14"/><stop offset="1" stop-color="#92adcc" stop-opacity="0"/></radialGradient><linearGradient id="scene-beam" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b7cbdc" stop-opacity="0"/><stop offset="1" stop-color="#b7cbdc" stop-opacity=".15"/></linearGradient></defs>'+
  '<ellipse cx="355" cy="292" rx="280" ry="119" fill="url(#scene-light)"/><g fill="none" stroke="#92adcc" stroke-opacity=".12"><path d="M39 281L309 172L665 309L395 418Z"/><path d="M103 307L373 198M177 335L447 226M251 363L521 254M325 390L595 282M106 254L462 391M173 227L529 364M240 199L596 336"/></g>'+
  '<path id="feedback-route" d="M603 112V95Q603 77 585 77H167Q143 77 143 101" fill="none" stroke="#d2b58b" stroke-opacity=".22" stroke-dasharray="3 6"/><circle id="feedback-dot" r="4" fill="#d2b58b" opacity="0"/>'+
  '<g id="decision-node"><rect x="80" y="109" width="139" height="48" rx="12" fill="#15202a" stroke="#92adcc55"/><g stroke="#d2b58b" fill="#15202a"><path d="M102 125l12 8-12 8z"/><circle cx="114" cy="133" r="2"/></g><text x="131" y="138" font-size="13">Model decision</text></g><path d="M151 157V177" stroke="#92adcc55" stroke-dasharray="3 5"/>'+
  vials+'<text x="165" y="310" text-anchor="middle" class="scene-label">FOUR COMPONENTS</text>'+
  '<g><path d="M279 301Q386 254 493 301V318Q386 365 279 318Z" fill="#17242f" stroke="#8199ae55"/><ellipse cx="386" cy="301" rx="107" ry="39" fill="#223341" stroke="#8199ae66"/><ellipse cx="386" cy="301" rx="97" ry="32" fill="#111c25" stroke="#8199ae33"/><path d="M339 273V303C339 326 433 326 433 303V273" fill="url(#scene-glass)" stroke="#b7cbdc66"/><g id="sample-liquid"><path d="M340 290C340 312 432 312 432 290V303C432 324 340 324 340 303Z" fill="#a980ac" fill-opacity=".75"/><ellipse id="sample-colour" cx="386" cy="290" rx="46" ry="16" fill="#b18bab"/></g><ellipse cx="386" cy="273" rx="47" ry="17" fill="none" stroke="#d5e0ea88"/><path d="M345 279v19" stroke="#fff" stroke-opacity=".3" stroke-width="2"/><ellipse id="mix-ring" cx="386" cy="291" rx="24" ry="8" fill="none" stroke="#e1c4dd" stroke-width="1.2" opacity="0"/><text x="386" y="370" text-anchor="middle" class="scene-label">DISPENSE & MIX</text></g>'+
  '<g id="pipette" transform="translate(187 112)"><rect x="-8" y="-35" width="16" height="9" rx="3" fill="#b7cbdc"/><rect x="-12" y="-26" width="24" height="53" rx="7" fill="url(#scene-steel)"/><rect x="-6" y="-13" width="12" height="19" rx="3" fill="#233442"/><path d="M-8 27H8L5 43H-5Z" fill="#8399ac"/><path d="M-5 43H5L1 82H-1Z" fill="url(#scene-glass)" stroke="#9eafbe" stroke-width=".8"/></g><path id="droplet" d="M0-7C-8 3-5 7 0 7S8 3 0-7Z" fill="#d2a7b4" opacity="0"/>'+
  '<g id="optical-scan" opacity="0"><path d="M355 211H417L437 308H335Z" fill="url(#scene-beam)"/><ellipse id="scan-line" cx="386" cy="290" rx="52" ry="17" fill="none" stroke="#c0d7ea" stroke-width="1.5"/></g>'+
  '<path d="M439 285H482Q493 285 493 274V244Q493 232 507 232H525" fill="none" stroke="#92adcc55" stroke-dasharray="4 6"/><g id="observation-node"><rect x="525" y="113" width="130" height="202" rx="16" fill="#111b24" stroke="#92adcc44"/><text x="590" y="141" text-anchor="middle" class="scene-label">COLOUR</text><circle cx="562" cy="180" r="18" fill="#b397b8"/><text x="592" y="184" font-size="12">Target</text><path d="M543 213h94" stroke="#b7cbdc22"/><circle id="observed-colour" cx="562" cy="247" r="18" fill="#b18bab"/><text x="590" y="251" font-size="12">Observed</text><text x="590" y="291" text-anchor="middle" font-size="10" fill="#9aa9b7">COMPARE & ADAPT</text></g></svg>';
 }
 function mount(root, {onPhase, onState}) {
  const svg=root.querySelector('.scene-svg');
  const get=id=>root.querySelector('#'+id);
  const pipette=get('pipette'),drop=get('droplet'),liquid=get('sample-liquid');
  const colour=get('sample-colour'),observed=get('observed-colour');
  const scan=get('optical-scan'),scanLine=get('scan-line'),ring=get('mix-ring');
  const dot=get('feedback-dot'),route=get('feedback-route'),decision=get('decision-node');
  const progress=get('animation-progress'),query=matchMedia('(prefers-reduced-motion: reduce)');
  const abort=new AbortController(),blocks=new Set();
  const duration=16000,routeLength=route.getTotalLength();
  let elapsed=0,paused=query.matches,visible=true,last=0,frame=0,phase=-1,destroyed=false;
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
  function draw() {
   const t=elapsed/duration;
   const nextPhase=Math.min(3,Math.floor(t*4));
   if(nextPhase!==phase){phase=nextPhase;onPhase(phase)}
   svg.dataset.phase=String(phase);
   svg.dataset.time=String(Math.round(elapsed));
   let x=231,y=112;
   if(t<.18)y+=Math.sin(clamp((t-.06)/.12)*Math.PI)*10;
   else if(t<.3){const u=ease((t-.18)/.12);x+=155*u;y+=20*u}
   else if(t<.48){x=386;y=132+16*Math.sin(clamp((t-.3)/.18)*Math.PI)}
   else if(t<.8){x=386;y=132-18*ease((t-.48)/.08)}
   else{const u=ease((t-.8)/.17);x=386-155*u;y=114-2*u}
   pipette.setAttribute('transform','translate('+x.toFixed(2)+' '+y.toFixed(2)+')');
   const dispensing=t>=.32&&t<.48;
   const dropT=((t-.32)/.053)%1;
   const fall=clamp(dropT);
   drop.setAttribute('opacity',dispensing?String(clamp(fall*8)):'0');
   drop.setAttribute('transform','translate(386 '+(y+91+(290-y-91)*fall).toFixed(2)+')');
   const filled=ease((t-.32)/.16);
   liquid.setAttribute('opacity',String(.3+.7*filled));
   const sample=filled<.25?'#8d9cae':filled<.65?'#a795b4':'#b18bab';
   colour.setAttribute('fill',sample);
   observed.setAttribute('fill',t>.55?sample:'#8d9cae');
   observed.setAttribute('opacity',t>.55?'1':'.32');
   const mix=t>.42&&t<.59?Math.sin((t-.42)/.17*Math.PI):0;
   ring.setAttribute('opacity',String(mix*.6));
   ring.setAttribute('rx',String(15+(Math.sin(t*160)+1)*14));
   ring.setAttribute('ry',String(5+(Math.sin(t*160)+1)*4));
   const scanning=t>=.52&&t<.73;
   scan.setAttribute('opacity',scanning?String(Math.sin((t-.52)/.21*Math.PI)*.85):'0');
   scanLine.setAttribute('cy',String(275+Math.sin((t-.52)/.21*Math.PI)*24));
   const feedback=t>.77&&t<.96;
   const point=route.getPointAtLength(routeLength*ease((t-.77)/.19));
   dot.setAttribute('cx',String(point.x));dot.setAttribute('cy',String(point.y));
   dot.setAttribute('opacity',feedback?'1':'0');
   decision.firstElementChild.setAttribute('stroke',t<.2||t>.93?'#d2b58b99':'#92adcc55');
   progress.style.transform='scaleX('+t+')';
  }
  function canRun(){return !destroyed&&!paused&&visible&&!document.hidden&&blocks.size===0}
  function tick(now){
   frame=0;if(!canRun())return;
   if(last)elapsed=(elapsed+Math.min(now-last,80))%duration;
   last=now;draw();frame=requestAnimationFrame(tick);
  }
  function refresh(){
   if(frame)cancelAnimationFrame(frame);frame=0;last=0;
   const running=canRun();onState({paused,running});
   if(running)frame=requestAnimationFrame(tick);
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;refresh()},{threshold:.08});
  observer.observe(root);
  document.addEventListener('visibilitychange',refresh,{signal:abort.signal});
  query.addEventListener('change',event=>{if(event.matches){paused=true;refresh()}},{signal:abort.signal});
  draw();refresh();
  return {
   toggle(){paused=!paused;refresh()},
   restart(){elapsed=0;paused=query.matches;draw();refresh()},
   seek(index){elapsed=[1200,6300,10000,14200][index];paused=true;draw();refresh()},
   suspend(reason,value){if(value)blocks.add(reason);else blocks.delete(reason);refresh()},
   destroy(){destroyed=true;cancelAnimationFrame(frame);observer.disconnect();abort.abort()}
  };
 }
 return {markup,mount};
})();
