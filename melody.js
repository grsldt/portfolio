// ================== AUDIO SETUP ==================
let audio, master, filter, isAudioReady = false;
let loop = false;
let currentTimeouts = [];

// DOM
const btnAudio = document.getElementById("btn-audio");
const btnPlay  = document.getElementById("btn-play");
const btnStop  = document.getElementById("btn-stop");
const btnLoop  = document.getElementById("btn-loop");
const loopState = document.getElementById("loopState");
const waveSel = document.getElementById("wave");
const moodSel = document.getElementById("mood");
const tempoRange = document.getElementById("tempo");
const tempoVal = document.getElementById("tempoVal");
const feedback = document.getElementById("feedback");

function ensureAudio(){
  if (!audio) {
    audio  = new (window.AudioContext || window.webkitAudioContext)();
    master = audio.createGain();
    master.gain.value = 0.8;
    filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 9000;
    master.connect(filter);
    filter.connect(audio.destination);
  }
  if (audio.state === "suspended") audio.resume();
  isAudioReady = true;
}

function noteFreq(midi){ return 440 * Math.pow(2, (midi - 69) / 12); }

// jolis paramètres d'enveloppe
function playNote(midi, startTime, dur, wave="triangle"){
  if (!isAudioReady) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = wave;
  osc.frequency.value = noteFreq(midi);

  const A = 0.01, D = 0.12, S = 0.75, R = 0.35;
  const t0 = startTime;

  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(1, t0 + A);
  gain.gain.linearRampToValueAtTime(S, t0 + A + D);
  gain.gain.setTargetAtTime(0.0001, t0 + dur, R);

  osc.connect(gain);
  gain.connect(master);

  osc.start(t0);
  osc.stop(t0 + dur + R + 0.05);
}

function setMoodFilter(){
  if (!filter) return;
  switch(moodSel.value){
    case "chill":
      filter.frequency.value = 6500;
      filter.Q.value = 0.7;
      break;
    case "bright":
      filter.frequency.value = 12000;
      filter.Q.value = 0.2;
      break;
    case "soft":
      filter.frequency.value = 4000;
      filter.Q.value = 0.9;
      break;
  }
}

// ================== MELODIE ==================
// Progression d'accords : Cmaj7 – Am7 – Fmaj7 – Gsus4 – G7
// Chaque accord est une liste de numéros MIDI
const chords = [
  [60, 64, 67, 71], // C E G B
  [57, 60, 64, 69], // A C E G
  [53, 57, 60, 65], // F A C F
  [55, 60, 65, 67], // Gsus4 (G C F G)
  [55, 59, 62, 67], // G7 (G B D F)
];

// On fabrique une mélodie en arpeggios + notes de passage
function buildMelody(){
  const melody = [];
  const beatsPerChord = 2; // 2 temps par accord
  const baseOctaveShift = 12; // joue plutôt dans l'aigu

  chords.forEach((chord, ci) => {
    const baseBeat = ci * beatsPerChord;
    const arpeggio = [...chord].map(m => m + baseOctaveShift);

    // Arp montant
    melody.push({ midi: arpeggio[0], beat: baseBeat + 0 });
    melody.push({ midi: arpeggio[1], beat: baseBeat + 0.5 });
    melody.push({ midi: arpeggio[2], beat: baseBeat + 1.0 });
    melody.push({ midi: arpeggio[3], beat: baseBeat + 1.5 });

    // Petite note de passage dans la gamme pentatonique
    const passing = arpeggio[0] + [2,3,5][ci % 3];
    melody.push({ midi: passing, beat: baseBeat + 1.75 });
  });

  // petite cadence finale
  melody.push({ midi: 72, beat: chords.length * beatsPerChord + 0.0 }); // C
  melody.push({ midi: 76, beat: chords.length * beatsPerChord + 0.5 }); // E
  melody.push({ midi: 79, beat: chords.length * beatsPerChord + 1.0 }); // G
  melody.push({ midi: 84, beat: chords.length * beatsPerChord + 1.5 }); // C aigu

  return melody;
}

// joue la mélodie complète
function playMelody(){
  if (!isAudioReady) ensureAudio();
  clearScheduled();

  const bpm = Number(tempoRange.value);
  const secPerBeat = 60 / bpm;
  const wave = waveSel.value;
  setMoodFilter();

  const melody = buildMelody();
  const start = audio.currentTime + 0.2;
  const totalBeats = melody[melody.length - 1].beat + 2;
  const totalDur = totalBeats * secPerBeat;

  melody.forEach(note => {
    const t = start + note.beat * secPerBeat;
    const handle = setTimeout(() => {
      playNote(note.midi, t, secPerBeat * 0.9, wave);
    }, (t - audio.currentTime) * 1000);
    currentTimeouts.push(handle);
  });

  feedback.className = "card ok";
  feedback.textContent = `Mélodie en cours… (${bpm} BPM, onde ${wave})`;

  // relance si loop activée
  const endHandle = setTimeout(() => {
    if (loop) {
      playMelody();
    } else {
      feedback.className = "card";
      feedback.textContent = "Mélodie terminée. Relance avec « Jouer la mélodie » 🎶";
    }
  }, totalDur * 1000);
  currentTimeouts.push(endHandle);
}

function clearScheduled(){
  currentTimeouts.forEach(t => clearTimeout(t));
  currentTimeouts = [];
}

// ================== UI / EVENTS ==================
btnAudio.addEventListener("click", () => {
  ensureAudio();
  setMoodFilter();
  btnAudio.disabled = true;
  btnAudio.textContent = "Audio OK ✔";
  feedback.textContent = "Audio activé. Tu peux lancer la mélodie !";
});

btnPlay.addEventListener("click", () => {
  if (!isAudioReady) ensureAudio();
  playMelody();
});

btnStop.addEventListener("click", () => {
  clearScheduled();
  feedback.className = "card";
  feedback.textContent = "Lecture arrêtée. Clique à nouveau sur « Jouer la mélodie » pour relancer.";
});

btnLoop.addEventListener("click", () => {
  loop = !loop;
  loopState.textContent = loop ? "On" : "Off";
  btnLoop.classList.toggle("primary", loop);
});

tempoRange.addEventListener("input", () => {
  tempoVal.textContent = tempoRange.value + " BPM";
});

moodSel.addEventListener("change", () => {
  setMoodFilter();
  feedback.textContent = "Ambiance ajustée : " + moodSel.options[moodSel.selectedIndex].text;
});

waveSel.addEventListener("change", () => {
  feedback.textContent = "Onde sélectionnée : " + waveSel.value;
});

// touche espace = play
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    btnPlay.click();
  }
});

// init texte tempo
tempoVal.textContent = tempoRange.value + " BPM";


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
