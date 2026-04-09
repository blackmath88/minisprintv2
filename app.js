
(function(){
  const STORAGE_KEY = 'miniSprintboxState';
  const defaultState = {
    sprint: {
      title: 'Mini Sprintbox Pilot',
      challenge: 'Run a mini design sprint that captures stakeholder input before the session and structures it into a fast facilitator view.',
      goal: 'Arrive at a clear problem framing, 2-3 personas, key tensions, and next experiments by the end of the session.',
      facilitator: 'Achim',
      date: '2026-04-10'
    },
    personas: [
      {name:'Operational Optimizer', role:'Service Owner', goals:['Reduce coordination overhead','Make decisions faster'], frustrations:'Too many fragmented inputs and no clean synthesis.', quote:'I need signal, not noise.', ai_maturity:'Medium'},
      {name:'Skeptical Expert', role:'Domain Expert', goals:['Keep nuance','Challenge assumptions'], frustrations:'Workshop outputs often sound good but stay vague.', quote:'Show me the trade-offs.', ai_maturity:'Low'}
    ],
    interviews: [
      {participant:'Sponsor', role:'Decider', risk:'The sprint produces energy but not a concrete decision path.', success:'Shared direction and first next step.', mustAddress:['Decision criteria','Scope clarity']},
      {participant:'Facilitator', role:'Session Lead', risk:'Too much input arrives too late and becomes hard to structure live.', success:'Pre-input is visible and synthesis is fast.', mustAddress:['Intake before session','Simple summary output']}
    ],
    flow: {
      current_state:['Stakeholder input is scattered across chat, docs and memory.'],
      pain_points:['Important tensions emerge too late in the workshop.'],
      opportunities:['Collect structured input before the sprint.'],
      assumptions:['A lightweight digital layer can support facilitation without killing energy.'],
      ideas:['Use a small static tool with personas, pre-interview and flow board.'],
      experiments:['Test this prototype in tomorrow\'s mini sprint.']
    }
  };

  function loadState(){
    try { return Object.assign({}, defaultState, JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')); }
    catch(e){ return structuredClone ? structuredClone(defaultState) : JSON.parse(JSON.stringify(defaultState)); }
  }
  function saveState(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.miniSprintState));
    renderDashboardStats();
    renderSummaryStats();
  }
  function exportJSON(){
    const blob = new Blob([JSON.stringify(window.miniSprintState, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mini-sprintbox-export.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function bindExport(){
    document.querySelectorAll('[data-export-json]').forEach(btn => btn.addEventListener('click', exportJSON));
  }
  function setActiveNav(){
    const file = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav]').forEach(a => {
      const active = a.getAttribute('href') === file;
      if(active){
        a.classList.add('text-[#4338CA]');
        a.classList.remove('text-[#1b1c1a]/70');
      }
    });
  }
  function renderDashboardStats(){
    const s=window.miniSprintState;
    document.querySelectorAll('[data-bind="sprint-title"]').forEach(el=>el.textContent=s.sprint.title);
    document.querySelectorAll('[data-bind="challenge"]').forEach(el=>el.textContent=s.sprint.challenge);
    document.querySelectorAll('[data-bind="persona-count"]').forEach(el=>el.textContent=String(s.personas.length).padStart(2,'0'));
    document.querySelectorAll('[data-bind="interview-count"]').forEach(el=>el.textContent=String(s.interviews.length).padStart(2,'0'));
    document.querySelectorAll('[data-bind="experiment-count"]').forEach(el=>el.textContent=String(s.flow.experiments.length).padStart(2,'0'));
  }
  function personaCard(p){
    return `<article class="persona-card group relative bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col transition-all hover:scale-[1.01]">
      <div class="h-24 bg-gradient-to-br from-primary to-primary-container relative"></div>
      <div class="px-8 pt-6 pb-8 flex-1 flex flex-col">
        <div class="flex justify-between items-start mb-4">
          <div><h3 class="text-xl font-headline font-bold text-on-surface">${escapeHtml(p.name)}</h3><p class="text-sm text-primary font-medium">${escapeHtml(p.role||'Persona')}</p></div>
          <button class="text-on-surface-variant hover:text-primary transition-colors" data-delete-persona="${escapeAttr(p.name)}"><span class="material-symbols-outlined">delete</span></button>
        </div>
        <div class="space-y-4 flex-1">
          <div><h4 class="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-2 font-label">Key Goals</h4><div class="flex flex-wrap gap-2">${(p.goals||[]).map(g=>`<span class="bg-secondary-container/30 text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold">${escapeHtml(g)}</span>`).join('')}</div></div>
          <div><h4 class="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-2 font-label">Frustrations</h4><p class="text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-outline-variant pl-4">${escapeHtml(p.frustrations||'')}</p></div>
        </div>
      </div>
    </article>`;
  }
  function renderPersonas(){
    const container = document.querySelector('[data-persona-grid]');
    if(!container) return;
    const addCard = container.querySelector('[data-add-persona-card]');
    container.querySelectorAll('[data-generated-persona]').forEach(el=>el.remove());
    window.miniSprintState.personas.forEach(p=>{
      const wrap=document.createElement('div');
      wrap.setAttribute('data-generated-persona','1');
      wrap.innerHTML=personaCard(p);
      container.insertBefore(wrap.firstElementChild, addCard);
    });
    container.querySelectorAll('[data-delete-persona]').forEach(btn=>btn.onclick=()=>{
      const name=btn.getAttribute('data-delete-persona');
      window.miniSprintState.personas = window.miniSprintState.personas.filter(p=>p.name!==name);
      saveState(); renderPersonas();
    });
  }
  function promptAddPersona(){
    const name = prompt('Persona name?'); if(!name) return;
    const role = prompt('Role / function?', 'Stakeholder');
    const goals = (prompt('Goals? Separate with commas', 'Faster decisions, less coordination overhead')||'').split(',').map(s=>s.trim()).filter(Boolean);
    const frustrations = prompt('Main frustration?', 'Too much scattered input.');
    window.miniSprintState.personas.push({name, role, goals, frustrations});
    saveState(); renderPersonas();
  }
  function renderInterviews(){
    const container=document.querySelector('[data-interview-grid]');
    if(!container) return;
    container.querySelectorAll('[data-generated-interview]').forEach(el=>el.remove());
    window.miniSprintState.interviews.forEach(i=>{
      const section=document.createElement('section');
      section.className='canvas-card rounded-xl p-8 border border-outline-variant/10 shadow-[0px_12px_32px_rgba(27,28,26,0.02)]';
      section.setAttribute('data-generated-interview','1');
      section.innerHTML=`<div class="flex items-center gap-4 mb-8"><div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">${escapeHtml((i.participant||'?')[0]||'?')}</div><div><h3 class="font-bold text-on-surface">${escapeHtml(i.participant||'Participant')}</h3><p class="text-xs text-on-surface-variant">${escapeHtml(i.role||'Stakeholder')}</p></div></div><div class="space-y-8"><div><span class="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 block mb-2">Biggest Risk</span><p class="text-sm font-medium leading-relaxed italic text-on-surface">${escapeHtml(i.risk||'')}</p></div><div><span class="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 block mb-2">Success Metric</span><div class="bg-surface-container-low rounded-lg p-3"><p class="text-sm font-bold text-primary">${escapeHtml(i.success||'')}</p></div></div><div><span class="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 block mb-2">Must Address</span><ul class="space-y-2">${(i.mustAddress||[]).map(m=>`<li class="flex items-start gap-2 text-sm text-on-surface-variant"><span class="material-symbols-outlined text-[14px] mt-0.5 text-primary">check_circle</span>${escapeHtml(m)}</li>`).join('')}</ul></div></div>`;
      container.appendChild(section);
    });
  }
  function promptAddInterview(){
    const participant = prompt('Participant?'); if(!participant) return;
    const role = prompt('Role?', 'Stakeholder');
    const risk = prompt('Biggest risk?');
    const success = prompt('Success metric / desired outcome?');
    const mustAddress = (prompt('Must address items? Separate with commas', 'Scope, decision criteria')||'').split(',').map(s=>s.trim()).filter(Boolean);
    window.miniSprintState.interviews.push({participant, role, risk, success, mustAddress});
    saveState(); renderInterviews();
  }
  function renderFlow(){
    const map={
      'current-state':'current_state', 'pain-points':'pain_points','opportunities':'opportunities','assumptions':'assumptions','ideas':'ideas','experiments':'experiments'
    };
    Object.entries(map).forEach(([key, stateKey])=>{
      const col=document.querySelector(`[data-flow-column="${key}"]`); if(!col) return;
      col.querySelectorAll('[data-generated-flow]').forEach(el=>el.remove());
      const addBtn=col.querySelector('[data-add-flow]');
      (window.miniSprintState.flow[stateKey]||[]).forEach(item=>{
        const card=document.createElement('div');
        card.className='bg-surface-container-lowest p-4 rounded-lg shadow-sm';
        card.setAttribute('data-generated-flow','1');
        card.innerHTML=`<p class="text-sm text-on-surface leading-relaxed">${escapeHtml(item)}</p>`;
        col.insertBefore(card, addBtn);
      });
      const count=col.parentElement.querySelector('[data-flow-count]'); if(count) count.textContent=String((window.miniSprintState.flow[stateKey]||[]).length);
    });
  }
  function bindFlowButtons(){
    document.querySelectorAll('[data-add-flow]').forEach(btn=>btn.onclick=()=>{
      const key=btn.getAttribute('data-add-flow');
      const txt=prompt(`Add note for ${key.replace('_',' ')}:`);
      if(!txt) return;
      if(!window.miniSprintState.flow[key]) window.miniSprintState.flow[key]=[];
      window.miniSprintState.flow[key].push(txt);
      saveState(); renderFlow();
    });
  }
  function renderSummaryStats(){
    const s=window.miniSprintState;
    const map = {
      'summary-personas': s.personas.length,
      'summary-interviews': s.interviews.length,
      'summary-experiments': s.flow.experiments.length
    };
    Object.entries(map).forEach(([k,v])=>document.querySelectorAll(`[data-bind="${k}"]`).forEach(el=>el.textContent=String(v).padStart(2,'0')));
    document.querySelectorAll('[data-bind="summary-challenge"]').forEach(el=>el.textContent=s.sprint.challenge);
  }
  function escapeHtml(str){ return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
  function escapeAttr(str){ return escapeHtml(str).replace(/"/g,'&quot;'); }

  window.miniSprintState = loadState();
  window.addEventListener('DOMContentLoaded', ()=>{
    bindExport();
    setActiveNav();
    renderDashboardStats();
    renderPersonas();
    renderInterviews();
    renderFlow();
    renderSummaryStats();
    document.querySelectorAll('[data-add-persona]').forEach(btn=>btn.onclick=promptAddPersona);
    document.querySelectorAll('[data-add-interview]').forEach(btn=>btn.onclick=promptAddInterview);
    bindFlowButtons();
  });
})();
