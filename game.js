// ===== Web Audio =====
let audio, master, isAudioReady = false;

function ensureAudio() {
  if (!audio) {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    master = audio.createGain();
    master.gain.value = 0.85;
    master.connect(audio.destination);
  }
  if (audio.state === "suspended") audio.resume();
  isAudioReady = true;
}

function noteFreq(noteNumber) { return 440 * Math.pow(2, (noteNumber - 69) / 12); }

function envPlay(freq = 440, duration = 0.5, type = "sine") {
  if (!isAudioReady) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type; osc.frequency.value = freq;

  const now = audio.currentTime;
  const attack = 0.01, decay = 0.08, sustain = 0.7, release = 0.15;

  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1.0, now + attack);
  gain.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  gain.gain.setTargetAtTime(0.0001, now + duration, release);

  osc.connect(gain); gain.connect(master);
  osc.start(now); osc.stop(now + duration + release + 0.02);
}

// ===== Piano & mapping =====
const KEYBOARD_ROW = ["a","s","d","f","g","h","j"]; // blanches base
function buildNotes(octaves = 2) {
  const base = 60; const count = 12 * octaves; const notes = [];
  const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  for (let i=0;i<count;i++) { const num = base + i; notes.push({ midi: num, name: names[i%12], freq: noteFreq(num) }); }
  return notes;
}
function isBlack(name){ return name.includes("#"); }

// ===== DOM =====
const pianoEl = document.getElementById("piano");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const attemptEl = document.getElementById("attempt");
const progressEl = document.getElementById("progress");
const feedbackEl = document.getElementById("feedback");

const btnAudio = document.getElementById("btn-audio");
const btnPlay = document.getElementById("btn-play");
const btnRepeat = document.getElementById("btn-repeat");
const btnReset = document.getElementById("btn-reset");
const selMode = document.getElementById("mode");
const selLevel = document.getElementById("level");
const selOctaves = document.getElementById("octaves");

// ===== État =====
let NOTES = buildNotes(2);
let target = [];
let inputSeq = [];
let score = 0;
let lives = 3;
let attempt = 1;
let isPlayingBack = false;

// ===== UI helpers =====
function setLives(n){ lives = n; livesEl.textContent = "❤️".repeat(Math.max(0,n)) + (n<=0 ? "💀" : ""); }
function setScore(n){ score = n; scoreEl.textContent = score; }
function setAttempt(n){ attempt = n; attemptEl.textContent = attempt; }
function setProgress(len, current = 0){ progressEl.textContent = Array.from({length: len}, (_,i)=> i<current? "●":"○").join(" "); }
function say(msg, type="info"){ feedbackEl.textContent = msg; feedbackEl.className = "card " + (type==="ok"?"ok": type==="err"?"err":""); }
function lockKeys(lock=true){ if (lock) pianoEl.classList.add("locked"); else pianoEl.classList.remove("locked"); }

// ===== Piano DOM =====
function renderPiano(){
  pianoEl.innerHTML = "";
  const whites = document.createElement("div"); whites.className = "white-keys";
  const blacks = document.createElement("div"); blacks.className = "black-keys";

  NOTES.forEach((n, idx) => {
    const key = document.createElement("button");
    key.className = "key " + (isBlack(n.name) ? "black":"white");
    key.dataset.index = String(idx);
    key.setAttribute("aria-label", `Note ${n.name}`);
    key.addEventListener("mousedown", onKeyClick);
    key.addEventListener("touchstart", onKeyClick, {passive:true});
    (isBlack(n.name) ? blacks : whites).appendChild(key);
  });

  pianoEl.appendChild(whites); pianoEl.appendChild(blacks);
}
function onKeyClick(e){
  const el = e.currentTarget; const idx = Number(el.dataset.index);
  playKey(idx); handleInput(idx);
}
function flashKey(idx){
  const el = pianoEl.querySelector(`.key[data-index="${idx}"]`);
  if (!el) return; el.classList.add("active"); setTimeout(()=> el.classList.remove("active"), 140);
}
function playKey(idx, dur=0.5){ envPlay(NOTES[idx].freq, dur, "sine"); flashKey(idx); }

// ===== Séquence =====
function randInt(a,b){ return Math.floor(a + Math.random()*(b-a+1)); }
function makeTarget(){
  const mode = selMode.value; const level = selLevel.value;
  let len = 1;
  if (mode === "melody") { len = level==="easy"?3 : level==="medium"?4 : 5; }
  const seq = []; const usable = NOTES.length;
  for (let i=0;i<len;i++) seq.push(randInt(0, usable-1));
  return seq;
}
const sleep = (ms)=>new Promise(r=>setTimeout(r, ms));
async function playSequence(seq){
  isPlayingBack = true; lockKeys(true); btnRepeat.disabled = true;
  for (let i=0;i<seq.length;i++){ playKey(seq[i], 0.55); await sleep(520); }
  isPlayingBack = false; lockKeys(false); btnRepeat.disabled = false;
}
function startRound(){
  inputSeq = []; target = makeTarget();
  setAttempt(attempt); setProgress(target.length, 0);
  say("Écoute attentivement… puis rejoue ! 🎧", "info");
  playSequence(target);
}
function handleInput(idx){
  if (isPlayingBack || target.length === 0) return;
  inputSeq.push(idx); setProgress(target.length, inputSeq.length);

  const pos = inputSeq.length - 1;
  if (target[pos] !== idx) {
    say("Oups, ce n’était pas la bonne note. Réessaie !", "err");
    if (navigator.vibrate) navigator.vibrate([40,40,40]);
    setLives(lives - 1);
    inputSeq = []; setProgress(target.length, 0);
    if (lives <= 0) { say("Partie terminée 💀 — clique Réinitialiser pour recommencer.", "err"); lockKeys(true); }
    return;
  }

  if (inputSeq.length === target.length) {
    const gain = 10 * target.length;
    setScore(score + gain);
    say(`Bravo ✨ +${gain} points !`, "ok");
    if (navigator.vibrate) navigator.vibrate(40);
    setAttempt(attempt + 1);
    setTimeout(startRound, 800);
  }
}

// ===== Events =====
btnAudio.addEventListener("click", () => {
  ensureAudio(); btnAudio.textContent = "Audio OK ✔"; btnAudio.disabled = true;
  say("Audio activé. Clique « Jouer le son ». 🎶");
});
btnPlay.addEventListener("click", () => {
  if (!isAudioReady) ensureAudio();
  if (target.length === 0) startRound(); else playSequence(target);
});
btnRepeat.addEventListener("click", () => { if (target.length) playSequence(target); });
btnReset.addEventListener("click", () => {
  setScore(0); setLives(3); setAttempt(1); inputSeq = []; target = [];
  say("Nouvelle partie ! Choisis tes options puis « Jouer le son »."); setProgress(1,0); lockKeys(false);
});
selOctaves.addEventListener("change", () => {
  NOTES = buildNotes(Number(selOctaves.value)); renderPiano(); inputSeq=[]; target=[]; setProgress(1,0);
});
selMode.addEventListener("change", () => { inputSeq=[]; target=[]; setProgress(1,0); });
selLevel.addEventListener("change", () => { inputSeq=[]; target=[]; setProgress(1,0); });

// Empêche le scroll pendant le jeu (mobile)
pianoEl.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: false });

// Clavier ordinateur -> touches blanches de la 1ère octave
document.addEventListener("keydown", (e) => {
  if (!/^[a-z]$/i.test(e.key)) return;
  const i = KEYBOARD_ROW.indexOf(e.key.toLowerCase());
  if (i === -1) return;

  const firstC = NOTES.findIndex(n=>n.name==="C");
  const whiteIndices = [];
  for (let k=firstC; k<firstC + NOTES.length; k++){
    const wrap = k % NOTES.length;
    if (!isBlack(NOTES[wrap].name)) whiteIndices.push(wrap);
    if (whiteIndices.length >= KEYBOARD_ROW.length) break;
  }
  const idx = whiteIndices[i];
  if (idx != null){ playKey(idx); handleInput(idx); }
});

// Orientation tip
function updateOrientationTip(){
  const tip = document.getElementById("orientTip");
  if (!tip) return;
  const isTinyPortrait = window.innerWidth < 420 && window.innerHeight > window.innerWidth;
  tip.style.display = isTinyPortrait ? "block" : "none";
}
window.addEventListener("resize", updateOrientationTip);
window.addEventListener("orientationchange", updateOrientationTip);
updateOrientationTip();

// Init
renderPiano();
say("Clique « Activer l’audio », choisis un mode puis « Jouer le son ». 🎵");
setLives(3); setScore(0); setAttempt(1); setProgress(1,0);
