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
 {time:0,nav:'Propose',title:'Choose what to mix',copy:'The model selects volumes of A–D to approach the fixed target colour.'},
 {time:6.1,nav:'Experiment',title:'Run the proposed formulation',copy:'The liquid handler collects each component and dispenses it into the sample well.'},
 {time:22,nav:'Observe',title:'Measure the sample colour',copy:'The instrument reads the sample spectrum and derives its colour for comparison with the fixed target.'},
 {time:30.6,nav:'Adapt',title:'Use the result to choose again',copy:'The observation returns to the model. The evaluation checks the measured colour against the target (ΔE₀₀ ≤ 1) within 12 scored experiments.'}
];
const header = '<header class="header wrap"><a class="brand" href="index.html" aria-label="AISLE task catalogue"><span class="brandmark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><strong>AISLE</strong><span class="brand-sub">AI SCIENTISTS’<br>LAST EXAM</span></a><nav aria-label="Main navigation"><a href="https://aisle.science/" target="_blank" rel="noreferrer">Home</a><a class="active" href="index.html" aria-current="page">Tasks</a><a href="https://aisle.science/leaderboard.html" target="_blank" rel="noreferrer">Leaderboard ↗</a></nav><span class="prototype">DESIGN PREVIEW</span></header>';
const footer = '<footer class="site-footer wrap"><span>AISLE · Nature as the verifier.</span><span>Design preview · Illustrated examples</span><a href="https://aisle.science/tasks.html" target="_blank" rel="noreferrer">AISLE task descriptions ↗</a></footer>';
const dialog = `<dialog class="video-dialog" id="film-dialog" aria-labelledby="film-title">
 <div class="dialog-head"><strong id="film-title">Suzhou · Colour-matching experiment</strong><button class="close-btn" id="close-film" aria-label="Close film">×</button></div>
 <video id="film" src="assets/suzhou.mp4" poster="assets/suzhou.webp" controls playsinline preload="none"></video>
 <p class="media-error" id="media-error" hidden>The video could not be played. <a href="assets/suzhou.mp4" target="_blank" rel="noreferrer">Open the film ↗</a></p>
 <p class="dialog-caption">Experiment footage from AISLE · Experimental setting and operation.</p>
</dialog>`;

function caseMarkup() {
 const labels = steps.map((step,i) => `<button type="button" data-phase="${i}" aria-pressed="${i===0}" disabled>${step.nav}</button>`).join('');
 return `<div class="case colour-case" id="featured-case">
  <div class="case-top"><span class="case-icon" aria-hidden="true"></span><strong>Experimental optimisation</strong><span class="case-id">COLOUR MATCHING / SUZHOU REAL-4D</span><button class="subtle-btn film-trigger" type="button" data-play>▷ Experiment film</button></div>
  <div class="case-body">
   <div class="stage stage--video">
    <div class="workflow-label"><span>THE EXPERIMENTAL LOOP</span><span>Illustrated workflow · 36 s</span></div>
    <video id="workflow" src="assets/colour-matching-workflow.mp4" poster="assets/colour-matching-workflow.webp" controls playsinline preload="metadata" aria-label="Original colour-matching animation"></video>
    <div class="workflow-caption"><span>Formulation · Experiment · Spectrum · Feedback</span><a href="assets/colour-matching-workflow.mp4" download>Download MP4 ↓</a></div>
   </div>
   <aside class="side">
    <span class="eyebrow">01 / EXPERIMENTAL OPTIMISATION</span><h3>Can AI match a target colour?</h3>
    <p class="side-copy">Four components. Real experiments. Each observation shapes the next decision.</p>
    <div class="case-stats"><div><strong>4</strong><span>components</span></div><div><strong>12</strong><span>scored experiments</span></div></div>
    <div class="phase-copy" aria-live="polite"><span class="side-index" id="phase-index">01 / PROPOSE</span><h4 id="phase-title">${steps[0].title}</h4><p id="phase-copy">${steps[0].copy}</p></div>
    <a class="small-link" href="https://aisle.science/tasks.html#optimization" target="_blank" rel="noreferrer">Official task ↗</a>
   </aside>
  </div>
  <div class="case-bottom colour-controls">
   <button class="subtle-btn" id="workflow-play" type="button" disabled>▷ Play</button>
   <div class="colour-timeline"><input id="workflow-scrub" type="range" min="0" max="36" step="0.01" value="0" aria-label="Animation progress" aria-valuetext="0 seconds · Propose" disabled><div class="colour-steps" aria-label="Animation stages">${labels}</div></div>
   <span id="workflow-count">01 / 04</span>
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

const workflow = document.getElementById('workflow');
const scrub = document.getElementById('workflow-scrub');
const play = document.getElementById('workflow-play');
const phaseButtons = [...document.querySelectorAll('.colour-steps [data-phase]')];
let displayedStage = -1;

function syncWorkflow() {
 const time = workflow.currentTime;
 const step = steps.findLast(entry => time >= entry.time);
 const index = steps.indexOf(step);
 scrub.value = time;
 scrub.setAttribute('aria-valuetext',Math.floor(time)+' seconds · '+step.nav);
 if(index===displayedStage) return;
 displayedStage=index;
 document.getElementById('phase-index').textContent='0'+(index+1)+' / '+step.nav.toUpperCase();
 document.getElementById('phase-title').textContent=step.title;
 document.getElementById('phase-copy').textContent=step.copy;
 document.getElementById('workflow-count').textContent='0'+(index+1)+' / 04';
 phaseButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
}
function enableTimeline() {
 scrub.max=workflow.duration;
 scrub.disabled=false;
 play.disabled=false;
 phaseButtons.forEach(button=>button.disabled=false);
 syncWorkflow();
}
workflow.addEventListener('loadedmetadata',enableTimeline);
if(workflow.readyState>=1) enableTimeline();
for(const event of ['timeupdate','seeked']) workflow.addEventListener(event,syncWorkflow);
for(const event of ['play','pause','ended']) workflow.addEventListener(event,()=>{
 play.textContent=workflow.paused||workflow.ended?'▷ Play':'Ⅱ Pause';
});
play.addEventListener('click',()=>{
 if(workflow.paused) workflow.play().catch(()=>{});
 else workflow.pause();
});
function seekWorkflow(time) {
 workflow.currentTime=time;
 syncWorkflow();
}
scrub.addEventListener('input',()=>seekWorkflow(Number(scrub.value)));
phaseButtons.forEach((button,i)=>button.addEventListener('click',()=>seekWorkflow(steps[i].time)));
window.disposeAISLEPage=()=>workflow.pause();

if(!isDetail){
 const tabs=[document.getElementById('visual-tab'),document.getElementById('list-tab')];
 function switchView(tab){
  tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected});
  if (tab===tabs[1]) workflow.pause();
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
 workflow.pause();
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
