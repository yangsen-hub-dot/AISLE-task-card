const isDetail = document.body.dataset.page === 'detail';
const app = document.getElementById('app');
const isVideoTask = document.body.dataset.page === 'video-task';
const taskEntries = [
 {title:'Experimental optimisation',description:'Propose formulations and use experimental feedback to match a target colour.',tags:['Colour matching','4D / 8D'],href:'color-matching.html',poster:'suzhou-film-card.webp',media:'SUZHOU · EXPERIMENT FILM',cta:'View experiment and walkthrough'},
 {id:'constraints',title:'Constraint adherence',description:'Match a target colour while staying within the allowed regions throughout the run.',tags:['Colour matching','Constraints'],href:'task-video.html?task=constraints',poster:'safety-disc-card.webp',media:'SIMULATION WALKTHROUGH',video:'safety-disc.mp4',caseTitle:'Safety-constrained colour matching',copy:'Follow an example run from a proposed formulation to the colour measurement and the safety disc.',official:'https://aisle.science/tasks.html#safety',cta:'Watch the case'},
 {id:'robustness',title:'Adaptive robustness',description:'Use physical measurements to adapt to hidden drift and changing transfer conditions.',tags:['Hidden drift','Resin transfer'],href:'task-video.html?task=robustness',poster:'bears-film-card.webp',videoPoster:'pipetting-drift-card.webp',media:'BEARS · EXPERIMENT FILM',film:'https://aisle.science/assets/experiments/bears.mp4',video:'pipetting-drift.mp4',caseTitle:'Resin transfer and pipetting drift',copy:'Watch the BEARS experiment film and explore a separate walkthrough of hidden pipetting drift.',videoTitle:'Hidden pipetting drift',official:'https://aisle.science/tasks.html#robustness',cta:'View experiment and walkthrough'},
 {id:'spectral',title:'Multimodal spectral reasoning',description:'Use spectral observations to guide formulations or infer chemical properties.',tags:['Spectral matching','pKa inference'],href:'task-video.html?task=spectral',poster:'spectral-inference-card.webp',media:'ILLUSTRATED WORKFLOW',video:'spectral-inference.mp4',caseTitle:'Absorption spectra and pKa',copy:'Follow the sequence of pH queries, spectral observations and a final estimate for independent evaluation.',official:'https://aisle.science/tasks.html#multimodal',cta:'Watch the case'},
 {title:'Solid electrolyte prediction',description:'Predict ionic conductivity, XRD pattern group and product grade from historical experimental records.',tags:['PSI-Bench','3D evaluation'],href:'solid-electrolyte.html',poster:'solid-electrolyte-card.webp',media:'INTERACTIVE 3D',cta:'Explore in 3D'}
];
const steps = [
 {nav:'Overview',label:'The complete loop',title:'From a target to the next experiment',copy:'The model proposes a formulation, the robot runs it, and the measured colour informs the next proposal.'},
 {nav:'Propose',label:'Choose a formulation',title:'Choose what to mix',copy:'The model selects volumes of A–D to approach the fixed target colour.'},
 {nav:'Experiment',label:'Dispense and mix',title:'Run the proposed formulation',copy:'The liquid handler collects each component and dispenses it into the sample well.'},
 {nav:'Observe',label:'Read the spectrum',title:'Measure the sample colour',copy:'The instrument reads the sample spectrum and derives its colour for comparison with the fixed target.'},
 {nav:'Adapt',label:'Update the next run',title:'Use the result to choose again',copy:'The observation returns to the model. The evaluation checks the measured colour against the target (ΔE₀₀ ≤ 1) within 12 scored experiments.'}
];
const header = '<header class="header wrap"><a class="brand" href="index.html" aria-label="AISLE task catalogue"><span class="brandmark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><strong>AISLE</strong><span class="brand-sub">AI SCIENTISTS’<br>LAST EXAM</span></a><nav aria-label="Main navigation"><a href="https://aisle.science/" target="_blank" rel="noreferrer">Home</a><a class="active" href="index.html" aria-current="page">Tasks</a><a href="https://aisle.science/leaderboard.html" target="_blank" rel="noreferrer">Leaderboard ↗</a></nav><span class="prototype">DESIGN PREVIEW</span></header>';
const footer = '<footer class="site-footer wrap"><span>AISLE · Nature as the verifier.</span><span>Design preview · Illustrated examples</span><a href="https://aisle.science/tasks.html" target="_blank" rel="noreferrer">AISLE task descriptions ↗</a></footer>';
const dialog = '<dialog class="video-dialog" id="film-dialog" aria-labelledby="film-title"><div class="dialog-head"><strong id="film-title">Suzhou · Colour-matching experiment</strong><button class="close-btn" id="close-film" aria-label="Close film">×</button></div><video id="film" src="assets/suzhou.mp4" poster="assets/suzhou.webp" controls playsinline preload="none"></video><p class="media-error" id="media-error" hidden>The video could not be played. <a href="assets/suzhou.mp4" target="_blank">Open the film ↗</a></p><p class="dialog-caption">Experiment film from AISLE · Experimental setting and operation.</p></dialog>';

function caseMarkup() {
 const hotspots = steps.slice(1).map((step,i) => `<button class="colour-pin colour-pin--${i+1}" type="button" data-phase="${i+1}"><span>0${i+1} ${step.nav}</span><strong>${step.label}</strong></button>`).join('');
 const labels = steps.map((step,i) => `<button type="button" data-phase="${i}" aria-pressed="${i===0}">${step.nav}</button>`).join('');
 return `<div class="case colour-case" id="featured-case">
  <div class="case-top"><span class="case-icon" aria-hidden="true"></span><strong>Experimental optimisation</strong><span class="case-id">COLOUR MATCHING / SUZHOU REAL-4D</span><button class="subtle-btn film-trigger" data-play>▷ Experiment film</button></div>
  <div class="case-body">
   <div class="stage colour-stage" data-current="0">
    <div class="colour-stage-head"><div><span class="eyebrow" id="scene-kicker">Overview</span><h3 id="scene-title">The experimental loop</h3></div><span class="target-tag"><i></i>Fixed target</span></div>
    <canvas id="colour-world" aria-label="Three-dimensional colour-matching workflow"></canvas>
    <img class="colour-fallback" src="assets/colour-matching-workflow.webp" alt="Illustrated colour-matching workflow" hidden>
    <p class="colour-fallback-note" hidden>The interactive scene requires WebGL. The workflow overview is shown above.</p>
    <div class="colour-pins">${hotspots}</div>
    <div class="colour-readout"><span><i></i>Sample 01</span><span><i></i>Fixed target</span></div>
    <div class="colour-stage-foot"><span><i></i>Experiment <i></i>Feedback</span><span>Drag to rotate · Illustrative scene</span></div>
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
   <button class="subtle-btn" id="scene-play" type="button" disabled>▷ Play</button>
   <div class="colour-timeline"><input id="scene-scrub" type="range" min="0" max="4" step="0.01" value="0" aria-label="Workflow stage" aria-valuetext="Overview" disabled><div class="colour-steps" aria-label="Workflow stages">${labels}</div></div>
   <span id="scene-count">01 / 05</span>
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
 const id = new URLSearchParams(location.search).get('task');
 const task = taskEntries.find(entry => entry.id === id && entry.video);
 const back = '<a class="back-link" href="index.html">← Back to task cards</a>';
 if (!task) return '<main class="wrap detail-intro">'+back+'<h1 class="detail-title">Case not found</h1></main>';
 document.title = task.title + ' · AISLE task card';
 const researchFilm = task.film
  ? '<section class="case stage stage--video research-film"><div class="workflow-label"><span>EXPERIMENT FILM · BEARS, SINGAPORE</span><a class="small-link" href="https://aisle.science/#network" target="_blank" rel="noreferrer">AISLE research films ↗</a></div><video controls playsinline preload="none" poster="assets/'+task.poster+'" aria-label="Colour matching and resin transfer at BEARS"><source src="'+task.film+'" type="video/mp4"></video><div class="workflow-caption"><span>Colour matching and resin transfer · experiment footage</span><a href="'+task.film+'" target="_blank" rel="noreferrer">Open source film ↗</a></div></section>'
  : '';
 const walkthroughTitle = task.videoTitle || task.caseTitle;
 return '<main class="wrap"><section class="detail-intro">'+back+'<div class="eyebrow">'+task.title+'</div><h1 class="detail-title">'+task.caseTitle+'</h1><p class="detail-description">'+task.copy+'</p></section>'+researchFilm+'<div class="case stage stage--video task-film"><div class="workflow-label"><span>ILLUSTRATED WORKFLOW · '+walkthroughTitle+'</span><a class="small-link" href="'+task.official+'" target="_blank" rel="noreferrer">Official task ↗</a></div><video controls playsinline preload="metadata" poster="assets/'+(task.videoPoster || task.poster)+'" aria-label="'+walkthroughTitle+'"><source src="assets/'+task.video+'" type="video/mp4"></video><div class="workflow-caption"><span>Illustrative case</span><a href="assets/'+task.video+'" download>Download MP4 ↓</a></div></div></main>';
}
app.innerHTML=header+(isVideoTask?videoTaskMarkup():isDetail?detail:catalog)+footer+(isVideoTask?'':dialog);
if (!isVideoTask) {

const stage = document.querySelector('.colour-stage');
const canvas = document.getElementById('colour-world');
const scrub = document.getElementById('scene-scrub');
const play = document.getElementById('scene-play');
const phaseButtons = [...document.querySelectorAll('.colour-steps [data-phase]')];
const stageLengths = [3300,5700,12600,8000,5700];
let scene, sceneFrame=0, displayedStage=-1, value=0, previousTime=0, stageElapsed=0;

function showStage(position, playing=false) {
 value = position;
 scrub.value = position;
 scene?.seek(position, playing);
 const index = Math.floor(position);
 if(index === displayedStage) return;
 displayedStage = index;
 const step = steps[index];
 stage.dataset.current = index;
 scrub.setAttribute('aria-valuetext',step.nav);
 const label = index ? '0'+index+' / '+step.nav.toUpperCase() : 'OVERVIEW';
 document.getElementById('phase-index').textContent = label;
 document.getElementById('scene-kicker').textContent = label;
 document.getElementById('scene-title').textContent = index ? step.label : 'The experimental loop';
 document.getElementById('phase-title').textContent = step.title;
 document.getElementById('phase-copy').textContent = step.copy;
 document.getElementById('scene-count').textContent = '0'+(index+1)+' / 05';
 phaseButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
}
function pauseScene() {
 cancelAnimationFrame(sceneFrame);
 sceneFrame=0;
 previousTime=0;
 play.textContent='▷ Play';
}
function advanceScene(now) {
 if(previousTime) stageElapsed+=Math.min(70,now-previousTime);
 previousTime=now;
 let index=Math.floor(value);
 if(stageElapsed>=stageLengths[index]){
  stageElapsed-=stageLengths[index];
  index++;
 }
 if(index>=steps.length){pauseScene();return;}
 showStage(Math.min(4,index+Math.min(.99,stageElapsed/stageLengths[index])),true);
 sceneFrame=requestAnimationFrame(advanceScene);
}
function goToStage(position) {
 pauseScene();
 const index=Math.floor(position);
 stageElapsed=(position-index)*stageLengths[index];
 showStage(position);
}
play.addEventListener('click',()=>{
 if(sceneFrame){pauseScene();return;}
 if(value===4){stageElapsed=0;showStage(0);}
 play.textContent='Ⅱ Pause';
 sceneFrame=requestAnimationFrame(advanceScene);
});
scrub.addEventListener('input',()=>goToStage(Number(scrub.value)));
document.querySelectorAll('[data-phase]').forEach(button=>button.addEventListener('click',()=>goToStage(Number(button.dataset.phase))));
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseScene();});
window.disposeAISLEPage = pauseScene;
showStage(0);
import('./assets/colour-scene/scene.js?v=interactive-colour-1').then(({mountColourScene})=>{
 scene=mountColourScene(canvas,()=>{
  stage.dataset.ready='true';
  scrub.disabled=false;
  play.disabled=false;
 });
 scene.seek(value);
}).catch(error=>{
 console.warn('Colour matching scene unavailable',error);
 stage.dataset.ready='fallback';
 canvas.hidden=true;
 stage.querySelector('.colour-fallback').hidden=false;
 stage.querySelector('.colour-fallback-note').hidden=false;
});
if(!isDetail){
 const tabs=[document.getElementById('visual-tab'),document.getElementById('list-tab')];
 function switchView(tab){
  tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected});
  if (tab===tabs[1]) pauseScene();
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
let videoOpener=null;
document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',()=>{
 videoOpener=button;pauseScene();filmDialog.showModal();film.play().catch(()=>{});
}));
document.getElementById('close-film').addEventListener('click',()=>filmDialog.close());
filmDialog.addEventListener('close',()=>{film.pause();videoOpener?.focus()});
filmDialog.addEventListener('click',event=>{
 if(event.target===filmDialog){const rect=filmDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)filmDialog.close()}
});
film.addEventListener('error',()=>document.getElementById('media-error').hidden=false);
}
