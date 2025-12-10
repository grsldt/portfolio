/* =================== AUDIO CORE =================== */
let audio, master, globalFilter, isAudioReady = false;
let sustainOn = false;
function ensureAudio() {
  if (!audio) {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    master = audio.createGain(); master.gain.value = 0.85;
    globalFilter = audio.createBiquadFilter(); globalFilter.type = "lowpass"; globalFilter.frequency.value = 12000;
    master.connect(globalFilter); globalFilter.connect(audio.destination);
  }
  if (audio.state === "suspended") audio.resume();
  isAudioReady = true;
}
function setVolume(v){ if(master) master.gain.value = v; }
function noteFreq(n){ return 440 * Math.pow(2, (n - 69) / 12); }

function playTone(freq, dur=0.45, wave="sine"){
  if (!isAudioReady) return {stop:()=>{}};
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const fil = audio.createBiquadFilter(); fil.type="lowpass"; fil.frequency.value = 10000;
  osc.type = wave; osc.frequency.value = freq;
  const now = audio.currentTime;
  // ADSR
  const A=0.01, D=0.08, S=0.75, R=sustainOn? 0.6 : 0.18;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + A);
  gain.gain.linearRampToValueAtTime(S, now + A + D);
  gain.gain.setTargetAtTime(0.0001, now + dur, R);
  osc.connect(gain); gain.connect(fil); fil.connect(master);
  osc.start(now);
  const stopAt = now + dur + R + .03;
  osc.stop(stopAt);
  return { stop: () => { try{ osc.stop(); }catch(_){} } };
}

/* =================== PIANO BUILD =================== */
const NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let OCTAVES = 2;
function buildNotes(octaves=2){ const base=60; return Array.from({length:12*octaves}, (_,i)=>({midi:base+i, name:NAMES[i%12], freq:noteFreq(base+i)})); }
function isBlack(name){ return name.includes("#"); }

const pianoEl = document.getElementById("piano");
function renderPiano(){
  const notes = buildNotes(OCTAVES);
  pianoEl.innerHTML = "";
  const whites = document.createElement("div"); whites.className="white-keys";
  const blacks = document.createElement("div"); blacks.className="black-keys";
  notes.forEach((n, idx) => {
    const b = document.createElement("button");
    b.className = "key " + (isBlack(n.name)?"black":"white");
    b.dataset.index = idx;
    b.setAttribute("aria-label", `Note ${n.name}`);
    b.addEventListener("mousedown", onKeyDown);
    b.addEventListener("touchstart", onKeyDown, {passive:true});
    // labels (blanches seulement)
    if(!isBlack(n.name)){
      const lab = document.createElement("div");
      lab.className = "key-label";
      lab.textContent = n.name;
      b.appendChild(lab);
    }
    (isBlack(n.name)? blacks : whites).appendChild(b);
  });
  pianoEl.appendChild(whites); pianoEl.appendChild(blacks);
}

/* =================== GAME STATE =================== */
const UI = {
  score: document.getElementById("score"),
  combo: document.getElementById("combo"),
  level: document.getElementById("level"),
  lives: document.getElementById("lives"),
  best: document.getElementById("best"),
  progress: document.getElementById("progress"),
  feedback: document.getElementById("feedback"),
  tempoLabel: document.getElementById("tempoLabel"),
  lenLabel: document.getElementById("lenLabel"),
  modeLabel: document.getElementById("modeLabel"),
};

const BTN = {
  audio: document.getElementById("btn-audio"),
  start: document.getElementById("btn-start"),
  repeat: document.getElementById("btn-repeat"),
  stop: document.getElementById("btn-stop"),
  help: document.getElementById("btn-help"),
};
const OPTS = {
  wave: document.getElementById("wave"),
  volume: document.getElementById("volume"),
  sustain: document.getElementById("sustain"),
  metronome: document.getElementById("metronome"),
  freeplay: document.getElementById("freeplay"),
};

let NOTES = buildNotes(2);
let targetSeq = [];     // [{idx, beat}]
let inputSeq = [];      // [{idx, time}]
let score=0, combo=0, lives=3, level=1, best=Number(localStorage.getItem("best-score")||0);
let bpm=90, beats=3, playingBack=false, running=false;
updateHUD();

function updateHUD(){
  UI.score.textContent = score;
  UI.combo.textContent = combo;
  UI.level.textContent = level;
  UI.lives.textContent = "❤️".repeat(Math.max(0,lives)) + (lives<=0?"💀":"");
  UI.best.textContent = best;
  UI.tempoLabel.textContent = bpm;
  UI.lenLabel.textContent = beats;
  UI.modeLabel.textContent = "Mélodie";
}

/* =================== UTILS =================== */
function say(msg, type="info"){ UI.feedback.className = "card " + (type==="ok"?"ok": type==="err"?"err":""); UI.feedback.textContent = msg; }
function clamp(n,a,b){ return Math.max(a, Math.min(b, n)); }
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
function rnd(a,b){ return Math.floor(a + Math.random()*(b-a+1)); }
function flash(idx, cls){
  const el = pianoEl.querySelector(`.key[data-index="${idx}"]`);
  if(!el) return;
  el.classList.remove("hit-ok","hit-bad");
  if(cls) { el.classList.add(cls); setTimeout(()=>el.classList.remove(cls), 180); }
  el.classList.add("active"); setTimeout(()=>el.classList.remove("active"), 120);
}

/* =================== METRONOME =================== */
let clickGain;
function metroClick(){
  if(!isAudioReady || !OPTS.metronome.checked) return;
  const g = audio.createGain(); clickGain = g; g.gain.value=.6;
  const o = audio.createOscillator(); o.type="square"; o.frequency.value=1200;
  o.connect(g); g.connect(master);
  const t=audio.currentTime;
  g.gain.setValueAtTime(.8,t);
  g.gain.exponentialRampToValueAtTime(0.001, t+.05);
  o.start(t); o.stop(t+.06);
}

/* =================== ROUND FLOW =================== */
function makeSequence(){
  targetSeq = [];
  const usable = NOTES.length;
  for(let i=0;i<beats;i++){
    targetSeq.push({ idx: rnd(0, usable-1), beat: i });
  }
}

async function playSequence(){
  playingBack = true; BTN.repeat.disabled = true;
  const beatDur = 60/bpm; // seconds
  const start = audio.currentTime + .2;
  // Count-in 1 bar
  if (OPTS.metronome.checked){
    for(let i=0;i<4;i++){
      setTimeout(metroClick, (start - audio.currentTime + i*beatDur)*1000);
    }
  }
  // schedule notes
  targetSeq.forEach((n,i)=>{
    const when = start + (i+1)*beatDur; // start after count-in
    setTimeout(()=>{ playTone(NOTES[n.idx].freq, beatDur*.85, OPTS.wave.value); flash(n.idx); }, (when - audio.currentTime)*1000);
  });

  // progress bar
  const totalBeats = 4 + targetSeq.length; // count-in + seq
  const totalDur = totalBeats*beatDur*1000;
  const t0 = performance.now();
  const timer = setInterval(()=>{
    const p = clamp((performance.now()-t0)/totalDur*100, 0, 100);
    UI.progress.style.width = p.toFixed(1)+"%";
    if(p>=100){ clearInterval(timer); UI.progress.style.width="0%"; playingBack=false; BTN.repeat.disabled=false; say("À toi de jouer ! 🔥"); }
  }, 30);
}

function startGame(){
  if(!isAudioReady){ ensureAudio(); }
  running = true; inputSeq = []; combo=0; if(lives<=0){ lives=3; score=0; level=1; bpm=90; beats=3; }
  updateHUD();
  makeSequence();
  say("Écoute la séquence… 🎧");
  playSequence();
}

function stopGame(){
  running=false; playingBack=false; inputSeq=[]; say("Partie en pause. ▶️ pour reprendre.");
}

/* =================== INPUT HANDLING =================== */
function onKeyDown(e){
  if (OPTS.freeplay.checked){ // mode libre = juste jouer
    const idx = Number(e.currentTarget?.dataset.index ?? e);
    flash(idx);
    playTone(NOTES[idx].freq, .45, OPTS.wave.value);
    return;
  }
  if(!running || playingBack) return;
  const idx = Number(e.currentTarget?.dataset.index ?? e);
  const now = audio? audio.currentTime : 0;
  const beatDur = 60/bpm;

  // quelle note attendue ? position basée sur le nombre de coups joués
  const pos = inputSeq.length;
  const expected = targetSeq[pos];
  if(!expected){ return; }

  // Vérifie la fenêtre de timing (±25% du beat)
  const idealTime = (pos+1) * beatDur + (4*beatDur); // après le count-in
  const tSinceStart = (now - (now - idealTime)); // simplifié pour la tolérance visuelle
  const delta = Math.abs((now % beatDur) - 0); // non strict, mais on veut tolérance relative au battement courant
  const okPitch = (idx === expected.idx);
  const okTime = true; // simplification rythmique (si tu veux strict : Math.abs(now - startRef - idealTime) < beatDur*0.25)

  inputSeq.push({idx, time: now});
  if (okPitch && okTime){
    flash(idx, "hit-ok");
    playTone(NOTES[idx].freq, .5, OPTS.wave.value);
    combo++;
    const gain = 10 + Math.floor(combo/3)*5; // bonus combo
    score += gain;
    if (navigator.vibrate) navigator.vibrate(25);
    say(`Bien joué ! +${gain} pts • combo x${combo}`);
    if(inputSeq.length === targetSeq.length){
      // manche gagnée
      level++;
      if (level % 2 === 0) beats = clamp(beats+1, 3, 7);
      bpm = clamp(bpm + 6, 80, 160);
      best = Math.max(best, score); localStorage.setItem("best-score", String(best));
      updateHUD();
      setTimeout(startGame, 600);
    }
  } else {
    flash(idx, "hit-bad");
    playTone(NOTES[idx].freq, .25, "square");
    if (navigator.vibrate) navigator.vibrate([30,25,30]);
    combo = 0; lives--;
    say("Aïe ! Mauvaise note 😬");
    if(lives<=0){
      running=false;
      say(`Game over 💀 — Score ${score}. Record ${best}.`);
    }
    updateHUD();
  }
}

/* =================== EVENTS =================== */
document.getElementById("btn-audio").addEventListener("click", ()=>{ ensureAudio(); setVolume(Number(OPTS.volume.value)); BTN.audio.disabled=true; BTN.audio.textContent="Audio OK ✔"; say("Audio activé. ▶️ pour commencer."); });
document.getElementById("btn-start").addEventListener("click", ()=> startGame());
document.getElementById("btn-repeat").addEventListener("click", ()=> { if(!playingBack && targetSeq.length) playSequence(); });
document.getElementById("btn-stop").addEventListener("click", ()=> stopGame());

OPTS.wave.addEventListener("change", ()=> say(`Onde: ${OPTS.wave.value}`));
OPTS.volume.addEventListener("input", ()=> setVolume(Number(OPTS.volume.value)));
OPTS.sustain.addEventListener("change", ()=> sustainOn = OPTS.sustain.checked);
OPTS.metronome.addEventListener("change", ()=> {});
OPTS.freeplay.addEventListener("change", ()=> { if(OPTS.freeplay.checked){ say("Mode libre activé 🎼 — joue ce que tu veux."); } else say("Retour au mode carrière."); });

document.addEventListener("keydown", (e)=>{
  if(e.key === " "){ e.preventDefault(); if(targetSeq.length) BTN.repeat.click(); return; }
  if(e.key === "Enter"){ e.preventDefault(); BTN.start.click(); return; }
  const map = ["a","s","d","f","g","h","j"];
  const i = map.indexOf(e.key.toLowerCase()); if(i === -1) return;
  // map sur les 7 blanches de la 1ère octave
  const whites = NOTES.map((n,idx)=>({n,idx})).filter(x=>!isBlack(x.n.name)).map(x=>x.idx);
  const idx = whites[i]; if (idx != null) onKeyDown(idx);
});

// Empêche scroll tactile pendant jeu
pianoEl.addEventListener("touchmove", (e)=>{ e.preventDefault(); }, {passive:false});

// Tutoriel modal
const modal = document.getElementById("modal");
document.getElementById("btn-help").addEventListener("click", ()=> modal.classList.add("open"));
document.getElementById("closeHelp").addEventListener("click", ()=> modal.classList.remove("open"));
modal.addEventListener("click", (e)=>{ if(e.target===modal) modal.classList.remove("open"); });

// Init
renderPiano();
say("Clique « Activer l’audio », règle tes options, puis ▶️ Commencer.");
document.getElementById("best").textContent = best;



// ===== MENU MOBILE SLIDE =====
(function(){
  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const panel = document.getElementById("mobilePanel");

  if (!openBtn || !closeBtn || !panel) return;

  const open = () => {
    panel.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    panel.classList.remove("open");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  // clic sur le fond sombre = fermer
  panel.addEventListener("click", (e) => {
    if (e.target === panel) close();
  });

  // échap pour fermer
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape") close();
  });

  // fermer si on repasse en desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) close();
  });
})();
