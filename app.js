const isDetail = document.body.dataset.page === 'detail';
const app = document.getElementById('app');
const isVideoTask = document.body.dataset.page === 'video-task';
const taskEntries = [
 {title:'Experimental optimisation',description:'Propose formulations and use experimental feedback to match a target colour.',tags:['Colour matching','4D / 8D'],href:'color-matching.html',poster:'suzhou-film-card.webp',media:'SUZHOU · EXPERIMENT FILM',cta:'View experiment and walkthrough'},
 {id:'constraints',title:'Constraint adherence',description:'Match a target colour while keeping every executed experiment outside the forbidden band.',tags:['Colour matching','Constraints'],href:'constraint-adherence.html',poster:'constraint-adherence-v15.webp',media:'3D CASE REPLAY · 36 SEC',video:'constraint-adherence-v15.mp4',caseTitle:'Can the agent match a colour safely?',copy:'Follow GPT-5.5 through five experiments: propose a recipe, dispense, read the optical response, and judge each measured result. A target match counts only if the whole run stays safe.',videoTitle:'Safety-constrained colour matching',caption:'36 seconds · GPT-5.5 · Case C',note:'Illustrative replay based on the supplied presentation. Colour-error values are approximately digitized; recipes, actions and the separate spectrum example are illustrative. Additional agent icons are examples. Visual review pending.',official:'https://aisle.science/tasks.html#safety',cta:'Watch the 36-second case'},
 {id:'robustness',title:'Adaptive robustness',description:'Use physical measurements to adapt to hidden drift and changing transfer conditions.',tags:['Hidden drift','Resin transfer'],href:'task-video.html?task=robustness',poster:'bears-film-card.webp',videoPoster:'pipetting-drift-card.webp',media:'BEARS · EXPERIMENT FILM',film:'https://aisle.science/assets/experiments/bears.mp4',video:'pipetting-drift.mp4',caseTitle:'Resin transfer and pipetting drift',copy:'Watch the BEARS experiment film and explore a separate walkthrough of hidden pipetting drift.',videoTitle:'Hidden pipetting drift',official:'https://aisle.science/tasks.html#robustness',cta:'View experiment and walkthrough'},
 {id:'spectral',title:'Multimodal spectral reasoning',description:'Use spectral observations to guide formulations or infer chemical properties.',tags:['Spectral matching','pKa inference'],href:'task-video.html?task=spectral',poster:'spectral-inference-card.webp',media:'ILLUSTRATED WORKFLOW',video:'spectral-inference.mp4',caseTitle:'Absorption spectra and pKa',copy:'Follow the sequence of pH queries, spectral observations and a final estimate for independent evaluation.',official:'https://aisle.science/tasks.html#multimodal',cta:'Watch the case'},
 {title:'Solid electrolyte prediction',description:'Predict ionic conductivity, XRD pattern group and product grade from historical experimental records.',tags:['PSI-Bench','3D evaluation'],href:'solid-electrolyte.html',poster:'solid-electrolyte-card.webp',media:'INTERACTIVE 3D',cta:'Explore in 3D'}
];
const steps = [
 {start:0,end:0,nav:'Overview',title:'From a target to the next experiment',copy:'Follow the model from a fixed target through the experiment and back to its next decision.'},
 {start:0,end:6.1,nav:'Propose',title:'Choose a formulation',copy:'The model selects volumes of A–D and sends formulation 01 to the liquid handler.'},
 {start:6.1,end:22,nav:'Experiment',title:'Dispense and mix',copy:'The liquid handler picks up the four components in turn and mixes them in the sample well.'},
 {start:22,end:30.6,nav:'Observe',title:'Read the spectrum',copy:'The reader scans the sample. Its observed colour is compared with the fixed target and returned to the model.'},
 {start:30.6,end:36,nav:'Adapt',title:'Update the next run',copy:'The model revises the A–D volumes for formulation 02. The task checks for ΔE₀₀ ≤ 1 within 12 scored experiments.'}
];
const workflowStills = [0,3.6,6.1,19.3,22,27,30.6];
const header = '<header class="header wrap"><a class="brand" href="index.html" aria-label="AISLE task catalogue"><span class="brandmark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><strong>AISLE</strong><span class="brand-sub">AI SCIENTISTS’<br>LAST EXAM</span></a><nav aria-label="Main navigation"><a href="https://aisle.science/" target="_blank" rel="noreferrer">Home</a><a class="active" href="index.html" aria-current="page">Tasks</a><a href="https://aisle.science/leaderboard.html" target="_blank" rel="noreferrer">Leaderboard ↗</a></nav><span class="prototype">DESIGN PREVIEW</span></header>';
const footer = '<footer class="site-footer wrap"><span>AISLE · Nature as the verifier.</span><span>Design preview · Illustrated examples</span><a href="https://aisle.science/tasks.html" target="_blank" rel="noreferrer">AISLE task descriptions ↗</a></footer>';
const dialog = `<dialog class="video-dialog" id="film-dialog" aria-labelledby="film-title">
 <div class="dialog-head"><strong id="film-title">Suzhou · Colour-matching experiment</strong><button class="close-btn" id="close-film" aria-label="Close film">×</button></div>
 <video id="film" src="assets/suzhou.mp4" poster="assets/suzhou.webp" controls playsinline preload="none"></video>
 <p class="media-error" id="media-error" hidden>The video could not be played. <a href="assets/suzhou.mp4" target="_blank" rel="noreferrer">Open the film ↗</a></p>
 <p class="dialog-caption">Experiment footage from AISLE · Experimental setting and operation.</p>
</dialog>`;

function caseMarkup() {
 const labels = steps.map((step,i) => `<button type="button" data-phase="${i}" aria-pressed="${i===0}">${step.nav}</button>`).join('');
 const hotspots = steps.slice(1).map((step,i)=>`<button class="workflow-hotspot workflow-hotspot--${i+1}" data-focus="${i+1}" type="button"><span>0${i+1} ${step.nav}</span><strong>${step.title}</strong></button>`).join('');
 return `<div class="case colour-case" id="featured-case">
  <div class="case-top"><span class="case-icon" aria-hidden="true"></span><strong>Experimental optimisation</strong><span class="case-id">COLOUR MATCHING / SUZHOU REAL-4D</span><button class="subtle-btn film-trigger" type="button" data-play>▷ Experiment film</button></div>
  <div class="case-body">
   <div class="stage workflow-stage" data-stage="0">
    <div class="workflow-label"><span>THE EXPERIMENTAL LOOP</span><span class="workflow-target"><i></i>Fixed target</span></div>
    <div class="workflow-frame">
     <img id="workflow-still" src="assets/colour-workflow/stills/0.webp" alt="Illustrated colour-matching workflow, stage 1">
     <iframe id="workflow" src="assets/colour-workflow/index.html?v=guided-1" title="Illustrated colour-matching workflow" hidden></iframe>
     <div class="workflow-hotspots">${hotspots}</div>
    </div>
    <div class="workflow-caption"><span>Formulation · Experiment · Spectrum · Feedback</span><span>Choose a stage to explore</span></div>
   </div>
   <aside class="side">
    <span class="eyebrow">01 / EXPERIMENTAL OPTIMISATION</span><h3>Can AI match a target colour?</h3>
    <p class="side-copy">Four components. Real experiments. Each observation shapes the next decision.</p>
    <div class="case-stats"><div><strong>4</strong><span>components</span></div><div><strong>12</strong><span>scored experiments</span></div></div>
    <div class="phase-copy" aria-live="polite"><span class="side-index" id="phase-index">OVERVIEW</span><h4 id="phase-title">${steps[0].title}</h4><p id="phase-copy">${steps[0].copy}</p></div>
    <a class="small-link" href="https://aisle.science/tasks.html#optimization" target="_blank" rel="noreferrer">Official task ↗</a>
   </aside>
  </div>
  <div class="case-bottom colour-controls">
   <button class="subtle-btn" id="workflow-play" type="button">▷ Play</button>
   <div class="colour-timeline"><input id="workflow-scrub" type="range" min="0" max="4" step="1" value="0" aria-label="Workflow stage" aria-valuetext="Overview"><div class="colour-steps" aria-label="Workflow stages">${labels}</div></div>
   <span id="workflow-count">01 / 05</span>
  </div>
 </div>`;
}
function renderCards() {
 return taskEntries.map((task,i)=>'<a class="task-card" href="'+task.href+'"><div class="card-art"><img src="assets/'+task.poster+'" alt="" loading="lazy" width="760" height="475"><span class="cover-source">'+task.media+'</span></div><div class="card-content"><span class="eyebrow">TASK 0'+(i+1)+'</span><h3>'+task.title+'</h3><p>'+task.description+'</p><div class="card-tags">'+task.tags.map(tag=>'<span>'+tag+'</span>').join('')+'</div><span class="card-cta">'+task.cta+' →</span></div></a>').join('');
}

function renderTaskList() {
 return '<div class="list-heading"><h2>All tasks</h2><span>'+taskEntries.length+' tasks</span></div><div class="task-list">'+taskEntries.map((task,i)=>'<a class="list-row" href="'+task.href+'"><span class="list-number">0'+(i+1)+'</span><div class="list-main"><strong>'+task.title+'</strong><p>'+task.description+'</p></div><div class="list-tags">'+task.tags.map(tag=>'<span>'+tag+'</span>').join('')+'</div><span class="list-arrow" aria-hidden="true">→</span></a>').join('')+'</div>';
}

const catalog = '<main class="wrap"><section class="intro"><div><span class="eyebrow">SCIENTIFIC TASKS AND MODEL EVALUATION</span><h1>Explore <em>scientific tasks.</em></h1><p>Explore experimental workflows and see how model predictions are evaluated.</p></div><div class="intro-note">'+taskEntries.length+' tasks.<br>Nature as the verifier.</div></section><div class="view-tabs" role="tablist" aria-label="Task browsing mode"><button id="visual-tab" role="tab" aria-selected="true" aria-controls="visual-panel"><span class="tab-icon" aria-hidden="true">▦</span>Task cards</button><button id="list-tab" role="tab" aria-selected="false" aria-controls="list-panel" tabindex="-1"><span class="tab-icon" aria-hidden="true">☷</span>All tasks <span class="tab-count">'+taskEntries.length+'</span></button></div><section id="visual-panel" role="tabpanel" aria-labelledby="visual-tab"><div class="section-heading"><div><span class="eyebrow">FEATURED CASE</span><h2>From a target colour to the next experiment.</h2></div><a class="small-link" href="color-matching.html">View case ↗</a></div>'+caseMarkup()+'<section class="catalog-section"><div class="catalog-head"><h2>Explore the tasks</h2><p>'+taskEntries.length+' tasks</p></div><div class="card-grid">'+renderCards()+'</div></section></section><section id="list-panel" role="tabpanel" aria-labelledby="list-tab" hidden>'+renderTaskList()+'</section></main>';
const detail = '<main class="wrap"><section class="detail-intro"><a class="back-link" href="index.html">← Back to task cards</a><div class="eyebrow">FEATURED CASE / SUZHOU REAL-4D</div><h1 class="detail-title">Colour matching.<br><em>Decisions through experiments.</em></h1><p class="detail-description">Watch the experimental loop, from a proposed formulation to the next decision.</p></section>'+caseMarkup()+'</main>';
function videoTaskMarkup() {
 const id = document.body.dataset.task || new URLSearchParams(location.search).get('task');
 const task = taskEntries.find(entry => entry.id === id && entry.video);
 const back = '<a class="back-link" href="index.html">← Back to task cards</a>';
 if (!task) return '<main class="wrap detail-intro">'+back+'<h1 class="detail-title">Case not found</h1></main>';
 document.title = task.title + ' · AISLE task card';
 const researchFilm = task.film
  ? '<section class="case stage stage--video research-film"><div class="workflow-label"><span>EXPERIMENT FILM · BEARS, SINGAPORE</span><a class="small-link" href="https://aisle.science/#network" target="_blank" rel="noreferrer">AISLE research films ↗</a></div><video controls playsinline preload="none" poster="assets/'+task.poster+'" aria-label="Colour matching and resin transfer at BEARS"><source src="'+task.film+'" type="video/mp4"></video><div class="workflow-caption"><span>Colour matching and resin transfer · experiment footage</span><a href="'+task.film+'" target="_blank" rel="noreferrer">Open source film ↗</a></div></section>'
  : '';
 const walkthroughTitle = task.videoTitle || task.caseTitle;
 return '<main class="wrap"><section class="detail-intro">'+back+'<div class="eyebrow">'+task.title+'</div><h1 class="detail-title">'+task.caseTitle+'</h1><p class="detail-description">'+task.copy+'</p></section>'+researchFilm+'<div class="case stage stage--video task-film"><div class="workflow-label"><span>ILLUSTRATED WORKFLOW · '+walkthroughTitle+'</span><a class="small-link" href="'+task.official+'" target="_blank" rel="noreferrer">Official task ↗</a></div><video controls playsinline preload="metadata" poster="assets/'+(task.videoPoster || task.poster)+'" aria-label="'+walkthroughTitle+'"><source src="assets/'+task.video+'" type="video/mp4"></video><div class="workflow-caption"><span>'+(task.caption || 'Illustrative case')+'</span><a href="assets/'+task.video+'" download>Download MP4 ↓</a></div></div></main>';
}
app.innerHTML=header+(isVideoTask?videoTaskMarkup():isDetail?detail:catalog)+footer+(isVideoTask?'':dialog);
if (isVideoTask) {
 const selectedId=document.body.dataset.task || new URLSearchParams(location.search).get('task');
 const note=taskEntries.find(task=>task.id===selectedId)?.note;
 if(note){const p=document.createElement('p');p.className='case-source-note';p.textContent=note;document.querySelector('main').append(p);}
}
if (!isVideoTask) {

const workflow = document.getElementById('workflow');
const workflowStill = document.getElementById('workflow-still');
const stage = document.querySelector('.workflow-stage');
const scrub = document.getElementById('workflow-scrub');
const play = document.getElementById('workflow-play');
const phaseButtons = [...document.querySelectorAll('.colour-steps [data-phase]')];
let workflowReady=false, index=0, time=0, stillIndex=0, animationFrame=0;
let startedAt=0, lastPaint=0, playThrough=false, finished=false;

function renderWorkflow(nextTime){
 time=nextTime;
 if(workflowReady){
  workflow.contentWindow.postMessage({type:'aisle-workflow-seek',index,time},location.origin);
  return;
 }
 const still=workflowStills.findLastIndex(start=>time>=start);
 if(still!==stillIndex){
  stillIndex=still;
  workflowStill.src='assets/colour-workflow/stills/'+still+'.webp';
  workflowStill.alt='Illustrated colour-matching workflow · '+steps[index].title;
 }
}

function showStage(next){
 index=next;
 const step=steps[index];
 scrub.value=index;
 scrub.setAttribute('aria-valuetext',step.nav);
 stage.dataset.stage=index;
 document.getElementById('phase-index').textContent=index?'0'+index+' / '+step.nav.toUpperCase():'OVERVIEW';
 document.getElementById('phase-title').textContent=step.title;
 document.getElementById('phase-copy').textContent=step.copy;
 document.getElementById('workflow-count').textContent='0'+(index+1)+' / 05';
 phaseButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
 renderWorkflow(step.start);
}

function stopPlayback(){
 cancelAnimationFrame(animationFrame);
 animationFrame=0;
 play.textContent='▷ Play';
}
function advanceWorkflow(now){
 const step=steps[index];
 const elapsed=(now-startedAt)/1000;
 const duration=index?step.end-step.start:2.2;
 if(elapsed>=duration){
  renderWorkflow(index?step.end-.001:step.start);
  if(!playThrough||index===steps.length-1){
   finished=true;
   stopPlayback();
   return;
  }
  showStage(index+1);
  startedAt=now;
  lastPaint=now;
 }else if(index&&now-lastPaint>=42){
  renderWorkflow(step.start+elapsed);
  lastPaint=now;
 }
 animationFrame=requestAnimationFrame(advanceWorkflow);
}
function beginPlayback(all,resume=false){
 playThrough=all;
 finished=false;
 startedAt=performance.now()-(resume&&index?(time-steps[index].start)*1000:0);
 lastPaint=0;
 play.textContent='Ⅱ Pause';
 animationFrame=requestAnimationFrame(advanceWorkflow);
}
function chooseStage(next){
 stopPlayback();
 finished=false;
 showStage(next);
 if(index) beginPlayback(false);
}

window.addEventListener('message',event=>{
 if(event.source!==workflow.contentWindow||event.origin!==location.origin||event.data?.type!=='aisle-workflow-ready') return;
 workflowReady=true;
 workflow.hidden=false;
 workflowStill.hidden=true;
 renderWorkflow(time);
});
scrub.addEventListener('input',()=>chooseStage(Number(scrub.value)));
phaseButtons.forEach((button,i)=>button.addEventListener('click',()=>chooseStage(i)));
document.querySelectorAll('[data-focus]').forEach(button=>button.addEventListener('click',()=>chooseStage(Number(button.dataset.focus))));
play.addEventListener('click',()=>{
 if(animationFrame){stopPlayback();return;}
 const resume=!finished;
 if(finished) showStage(index===steps.length-1?0:index);
 beginPlayback(true,resume);
});
document.addEventListener('visibilitychange',()=>{if(document.hidden) stopPlayback();});

if(!isDetail){
 const tabs=[document.getElementById('visual-tab'),document.getElementById('list-tab')];
 function switchView(tab){
  tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected});
  if(tab===tabs[1]) stopPlayback();
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>switchView(tab));
  tab.addEventListener('keydown',event=>{
   if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
    event.preventDefault();const target=event.key==='Home'?tabs[0]:event.key==='End'?tabs[1]:tabs[1-i];switchView(target);target.focus();
   }
  });
 });
}
const filmDialog=document.getElementById('film-dialog'),film=document.getElementById('film');
const filmButton=document.querySelector('[data-play]');
filmButton.addEventListener('click',()=>{
 stopPlayback();
 filmDialog.showModal();
 film.play().catch(()=>{});
});
document.getElementById('close-film').addEventListener('click',()=>filmDialog.close());
filmDialog.addEventListener('close',()=>{film.pause();filmButton.focus()});
filmDialog.addEventListener('click',event=>{
 if(event.target===filmDialog){const rect=filmDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)filmDialog.close()}
});
film.addEventListener('error',()=>document.getElementById('media-error').hidden=false);
}
