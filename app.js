const isDetail = document.body.dataset.page === 'detail';
const app = document.getElementById('app');
const taskEntries = [
 {title:'Experimental optimisation',description:'Propose formulations and use experimental feedback to match a target colour.',tags:['Colour matching','4D / 8D'],href:'color-matching.html',local:true},
 {title:'Constraint adherence',description:'Match a target colour while staying within the allowed regions throughout the run.',tags:['Colour matching','Constraints'],href:'https://aisle.science/tasks.html#safety'},
 {title:'Adaptive robustness',description:'Use physical measurements to adapt to hidden drift and changing transfer conditions.',tags:['Hidden drift','Resin transfer'],href:'https://aisle.science/tasks.html#robustness'},
 {title:'Multimodal spectral reasoning',description:'Use spectral observations to guide formulations or infer chemical properties.',tags:['Spectral matching','pKa inference'],href:'https://aisle.science/tasks.html#multimodal'}
];
const steps = [
 {id:'propose',time:0,nav:'Propose',title:'A target. A formulation.',copy:'The model chooses volumes for four components to match a target colour.'},
 {id:'experiment',time:6.1,nav:'Experiment',title:'Put the formulation to work.',copy:'The experimental setup dispenses and mixes the proposed formulation.'},
 {id:'observe',time:22,nav:'Observe',title:'See what the experiment returns.',copy:'The reader scans the sample spectrum and derives an observed colour to compare with the target.'},
 {id:'adapt',time:30.6,nav:'Adapt',title:'Let feedback guide the next step.',copy:'The model uses the observation to adjust its next formulation.'}
];
const header = '<header class="header wrap"><a class="brand" href="index.html" aria-label="AISLE task catalogue"><span class="brandmark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><strong>AISLE</strong><span class="brand-sub">AI SCIENTISTS’<br>LAST EXAM</span></a><nav aria-label="Main navigation"><a href="https://aisle.science/" target="_blank" rel="noreferrer">Home</a><a class="active" href="index.html" aria-current="page">Tasks</a><a href="https://aisle.science/leaderboard.html" target="_blank" rel="noreferrer">Leaderboard ↗</a></nav><span class="prototype">DESIGN PREVIEW</span></header>';
const footer = '<footer class="site-footer wrap"><span>AISLE · Nature as the verifier.</span><span>Design preview · Illustrated animation</span><a href="https://aisle.science/tasks.html" target="_blank" rel="noreferrer">AISLE task descriptions ↗</a></footer>';
const dialog = '<dialog class="video-dialog" id="film-dialog" aria-labelledby="film-title"><div class="dialog-head"><strong id="film-title">Suzhou · Colour-matching experiment</strong><button class="close-btn" id="close-film" aria-label="Close film">×</button></div><video id="film" src="assets/suzhou.mp4" poster="assets/suzhou.webp" controls playsinline preload="none"></video><p class="media-error" id="media-error" hidden>The video could not be played. <a href="assets/suzhou.mp4" target="_blank">Open the film ↗</a></p><p class="dialog-caption">Experiment film from AISLE · Experimental setting and operation.</p></dialog>';

function caseMarkup() {
 return '<div class="case" id="featured-case"><div class="case-top"><span class="case-icon" aria-hidden="true"></span><strong>Colour matching</strong><span class="case-id">SUZHOU / REAL-4D</span><button class="subtle-btn film-trigger" data-play>▷ Experiment film</button></div><div class="case-body"><div class="stage stage--video"><div class="workflow-label"><span>THE EXPERIMENTAL LOOP</span><span>Illustrated workflow · 36 s</span></div><video id="workflow" controls playsinline preload="metadata" aria-label="Illustrated colour-matching workflow" poster="assets/colour-matching-workflow.webp"><source src="assets/colour-matching-workflow.mp4" type="video/mp4"><a href="assets/colour-matching-workflow.mp4">Download the workflow video</a></video><div class="workflow-caption"><span>Formulation · Experiment · Spectrum · Feedback</span><a href="assets/colour-matching-workflow.mp4" download>Download MP4 ↓</a></div></div><aside class="side"><span class="eyebrow">01 / EXPERIMENTAL OPTIMISATION</span><h3>Can AI match<br> a target colour?</h3><p class="side-copy">Four components. Real experiments.<br>Each observation shapes the next decision.</p><div class="case-stats"><div><strong>4</strong><span>components</span></div><div><strong>12</strong><span>scored experiments</span></div></div><div class="phase-copy"><span class="side-index" id="phase-index">01 / PROPOSE</span><h4 id="phase-title">A target. A formulation.</h4><p id="phase-copy">The model chooses volumes for four components to match a target colour.</p></div><a class="small-link" href="https://aisle.science/tasks.html#optimization" target="_blank" rel="noreferrer">Official task ↗</a></aside></div><div class="case-bottom"><div class="steps" aria-label="Animation stages">'+steps.map((s,i)=>'<button data-step="'+s.id+'" aria-pressed="'+(i===0)+'"><small>0'+(i+1)+'</small>'+s.nav+'</button>').join('')+'</div></div></div>';
}
function taskArt(i) {
 const marks = [
  '<circle cx="76" cy="55" r="24" fill="#b398b8"/><circle cx="115" cy="55" r="24" fill="#d2a7b4" fill-opacity=".9"/><circle cx="153" cy="55" r="24" fill="#99a7bd" fill-opacity=".9"/><path d="M198 55h39m-7-6 7 6-7 6" stroke="#b7cbdc"/><circle cx="283" cy="55" r="25" fill="#ad88af" stroke="#e0c9dc"/>',
  '<rect x="61" y="23" width="246" height="64" rx="8" fill="#b7cbdc08" stroke="#b7cbdc25"/><path d="M76 40h216M76 70h216" stroke="#d2b58b66" stroke-dasharray="4 6"/><path d="M79 61C113 27 134 81 166 54S221 76 249 48 277 50 291 52" fill="none" stroke="#b7cbdc" stroke-width="2"/><circle cx="291" cy="52" r="4" fill="#d2b58b"/>',
  '<path d="M64 56h244" stroke="#b7cbdc33" stroke-dasharray="3 6"/><path d="M67 66C92 69 113 30 144 31S170 72 197 71 234 47 306 54" fill="none" stroke="#d2b58b" stroke-width="2"/><path d="M67 66C103 69 126 59 146 56S239 56 306 56" fill="none" stroke="#b7cbdc" stroke-width="2"/><circle cx="306" cy="54" r="4" fill="#b7cbdc"/>',
  '<path d="M62 86h245M62 22v64" stroke="#b7cbdc33"/><path d="M69 77C85 77 89 28 105 28S120 76 139 74 155 43 168 43 183 73 204 72 225 30 243 30 259 76 301 74" fill="none" stroke="#b7cbdc" stroke-width="2"/><path d="M69 79C88 79 92 37 109 37S125 79 142 76 160 49 172 49 187 77 207 75 229 37 247 37 263 80 301 77" fill="none" stroke="#d2b58b" stroke-width="1.5" opacity=".7"/>'
 ];
 return '<svg viewBox="0 0 370 110" aria-hidden="true">'+marks[i]+'</svg>';
}
function renderCards() {
 return taskEntries.map((task,i)=>'<a class="task-card" href="'+task.href+'"'+(task.local?'':' target="_blank" rel="noreferrer"')+'><div class="card-art">'+taskArt(i)+'</div><div class="card-content"><span class="eyebrow">TASK 0'+(i+1)+'</span><h3>'+task.title+'</h3><p>'+task.description+'</p><div class="card-tags">'+task.tags.map(tag=>'<span>'+tag+'</span>').join('')+'</div><span class="card-cta">'+(task.local?'View animated case →':'View task ↗')+'</span></div></a>').join('');
}
function renderTaskList() {
 return '<div class="list-heading"><h2>All tasks</h2><span>4 task categories</span></div><div class="task-list">'+taskEntries.map((task,i)=>'<a class="list-row" href="'+task.href+'"'+(task.local?'':' target="_blank" rel="noreferrer"')+'><span class="list-number">0'+(i+1)+'</span><div class="list-main"><strong>'+task.title+'</strong><p>'+task.description+'</p></div><div class="list-tags">'+task.tags.map(tag=>'<span>'+tag+'</span>').join('')+'</div><span class="list-arrow" aria-hidden="true">'+(task.local?'→':'↗')+'</span></a>').join('')+'</div>';
}

const catalog = '<main class="wrap"><section class="intro"><div><span class="eyebrow">REAL EXPERIMENTS. SCIENTIFIC DECISIONS.</span><h1>Explore <em>scientific tasks.</em></h1><p>See the experiments. Understand the scientific decisions.</p></div><div class="intro-note">Four task categories.<br>Nature as the verifier.</div></section><div class="view-tabs" role="tablist" aria-label="Task browsing mode"><button id="visual-tab" role="tab" aria-selected="true" aria-controls="visual-panel"><span class="tab-icon" aria-hidden="true">▦</span>Task cards</button><button id="list-tab" role="tab" aria-selected="false" aria-controls="list-panel" tabindex="-1"><span class="tab-icon" aria-hidden="true">☷</span>All tasks <span class="tab-count">4</span></button></div><section id="visual-panel" role="tabpanel" aria-labelledby="visual-tab"><div class="section-heading"><div><span class="eyebrow">FEATURED CASE</span><h2>From a target colour to the next experiment.</h2></div><a class="small-link" href="color-matching.html">View case ↗</a></div>'+caseMarkup()+'<section class="catalog-section"><div class="catalog-head"><h2>Explore the tasks</h2><p>4 task categories</p></div><div class="card-grid">'+renderCards()+'</div></section></section><section id="list-panel" role="tabpanel" aria-labelledby="list-tab" hidden>'+renderTaskList()+'</section></main>';
const detail = '<main class="wrap"><section class="detail-intro"><a class="back-link" href="index.html">← Back to task cards</a><div class="eyebrow">FEATURED CASE / SUZHOU REAL-4D</div><h1 class="detail-title">Colour matching.<br><em>Decisions through experiments.</em></h1><p class="detail-description">Watch the experimental loop, from a proposed formulation to the next decision.</p></section>'+caseMarkup()+'</main>';
app.innerHTML=header+(isDetail?detail:catalog)+footer+dialog;
const workflow = document.getElementById('workflow');
const stageButtons = [...document.querySelectorAll('[data-step]')];
let displayedStep;
function syncWorkflowStage() {
 const step = steps.findLast(step => workflow.currentTime >= step.time);
 if (step === displayedStep) return;
 displayedStep = step;
 document.getElementById('phase-index').textContent = '0'+(steps.indexOf(step)+1)+' / '+step.nav.toUpperCase();
 document.getElementById('phase-title').textContent = step.title;
 document.getElementById('phase-copy').textContent = step.copy;
 stageButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.step === step.id)));
}
workflow.addEventListener('timeupdate',syncWorkflowStage);
workflow.addEventListener('seeked',syncWorkflowStage);
stageButtons.forEach(button => button.addEventListener('click',()=>{
 workflow.currentTime = steps.find(step => step.id === button.dataset.step).time;
 syncWorkflowStage();
 workflow.play().catch(()=>{});
}));
syncWorkflowStage();
window.disposeAISLEPage = () => workflow.pause();
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
let videoOpener=null;
document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',()=>{
 videoOpener=button;workflow.pause();filmDialog.showModal();film.play().catch(()=>{});
}));
document.getElementById('close-film').addEventListener('click',()=>filmDialog.close());
filmDialog.addEventListener('close',()=>{film.pause();videoOpener?.focus()});
filmDialog.addEventListener('click',event=>{
 if(event.target===filmDialog){const rect=filmDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)filmDialog.close()}
});
film.addEventListener('error',()=>document.getElementById('media-error').hidden=false);
