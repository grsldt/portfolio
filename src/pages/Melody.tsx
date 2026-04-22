import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Repeat, Music, Volume2, Waves, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';

type WaveType = 'triangle' | 'sine' | 'square' | 'sawtooth';
type Mood = 'chill' | 'bright' | 'soft';

const CHORDS = [
  [60, 64, 67, 71],
  [57, 60, 64, 69],
  [53, 57, 60, 65],
  [55, 60, 65, 67],
  [55, 59, 62, 67],
];

function noteFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function buildMelody() {
  const melody: { midi: number; beat: number }[] = [];
  const beatsPerChord = 2;
  const baseOctaveShift = 12;

  CHORDS.forEach((chord, ci) => {
    const baseBeat = ci * beatsPerChord;
    const arpeggio = chord.map((m) => m + baseOctaveShift);
    melody.push({ midi: arpeggio[0], beat: baseBeat });
    melody.push({ midi: arpeggio[1], beat: baseBeat + 0.5 });
    melody.push({ midi: arpeggio[2], beat: baseBeat + 1.0 });
    melody.push({ midi: arpeggio[3], beat: baseBeat + 1.5 });
    const passing = arpeggio[0] + [2, 3, 5][ci % 3];
    melody.push({ midi: passing, beat: baseBeat + 1.75 });
  });

  melody.push({ midi: 72, beat: CHORDS.length * beatsPerChord });
  melody.push({ midi: 76, beat: CHORDS.length * beatsPerChord + 0.5 });
  melody.push({ midi: 79, beat: CHORDS.length * beatsPerChord + 1.0 });
  melody.push({ midi: 84, beat: CHORDS.length * beatsPerChord + 1.5 });

  return melody;
}

const WAVE_OPTIONS: { value: WaveType; label: string }[] = [
  { value: 'triangle', label: 'Triangle' },
  { value: 'sine', label: 'Sine' },
  { value: 'square', label: 'Square' },
  { value: 'sawtooth', label: 'Sawtooth' },
];

const MOOD_OPTIONS: { value: Mood; label: string; emoji: string }[] = [
  { value: 'chill', label: 'Chill', emoji: '🌊' },
  { value: 'bright', label: 'Bright', emoji: '✨' },
  { value: 'soft', label: 'Soft', emoji: '🌙' },
];

export default function MelodyPage() {
  const audioRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const loopRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [wave, setWave] = useState<WaveType>('triangle');
  const [mood, setMood] = useState<Mood>('chill');
  const [bpm, setBpm] = useState(90);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('Appuie sur Play pour lancer la mélodie 🎶');

  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gain = ctx.createGain();
      gain.gain.value = 0.8;
      const filt = ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = 9000;
      gain.connect(filt);
      filt.connect(ctx.destination);
      audioRef.current = ctx;
      masterRef.current = gain;
      filterRef.current = filt;
    }
    if (audioRef.current.state === 'suspended') audioRef.current.resume();
  }, []);

  const applyMoodFilter = useCallback((m: Mood) => {
    const f = filterRef.current;
    if (!f) return;
    switch (m) {
      case 'chill': f.frequency.value = 6500; f.Q.value = 0.7; break;
      case 'bright': f.frequency.value = 12000; f.Q.value = 0.2; break;
      case 'soft': f.frequency.value = 4000; f.Q.value = 0.9; break;
    }
  }, []);

  const playNote = useCallback((midi: number, startTime: number, dur: number, w: WaveType) => {
    const ctx = audioRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = w;
    osc.frequency.value = noteFreq(midi);
    const A = 0.01, D = 0.12, S = 0.75, R = 0.35;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(1, startTime + A);
    gain.gain.linearRampToValueAtTime(S, startTime + A + D);
    gain.gain.setTargetAtTime(0.0001, startTime + dur, R);
    osc.connect(gain);
    gain.connect(masterRef.current!);
    osc.start(startTime);
    osc.stop(startTime + dur + R + 0.05);
  }, []);

  const clearScheduled = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const playMelody = useCallback(() => {
    ensureAudio();
    clearScheduled();
    applyMoodFilter(mood);

    const melody = buildMelody();
    const secPerBeat = 60 / bpm;
    const start = audioRef.current!.currentTime + 0.2;
    const totalBeats = melody[melody.length - 1].beat + 2;
    const totalDur = totalBeats * secPerBeat;

    setIsPlaying(true);
    setFeedback(`Mélodie en cours… (${bpm} BPM, onde ${wave})`);

    melody.forEach((note) => {
      const t = start + note.beat * secPerBeat;
      const delay = (t - audioRef.current!.currentTime) * 1000;
      const handle = window.setTimeout(() => {
        playNote(note.midi, t, secPerBeat * 0.9, wave);
        setActiveNote(note.midi);
        window.setTimeout(() => setActiveNote(null), 200);
      }, Math.max(0, delay));
      timeoutsRef.current.push(handle);
    });

    const endHandle = window.setTimeout(() => {
      if (loopRef.current) {
        playMelody();
      } else {
        setIsPlaying(false);
        setFeedback('Mélodie terminée. Relance avec Play 🎶');
      }
    }, totalDur * 1000);
    timeoutsRef.current.push(endHandle);
  }, [bpm, wave, mood, ensureAudio, clearScheduled, applyMoodFilter, playNote]);

  const stopMelody = useCallback(() => {
    clearScheduled();
    setIsPlaying(false);
    setActiveNote(null);
    setFeedback('Lecture arrêtée.');
  }, [clearScheduled]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); isPlaying ? stopMelody() : playMelody(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isPlaying, playMelody, stopMelody]);

  useEffect(() => () => clearScheduled(), [clearScheduled]);

  return (
    <div className="relative min-h-screen noise bg-background overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Animated note pulses */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            key={activeNote}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-primary/30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-2 glass rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Retour
        </Link>
      </motion.div>

      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={isPlaying ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6"
          >
            <Music className="text-primary" size={36} />
          </motion.div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Melody <span className="text-gradient">Lab</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Une mélodie composée en code — arpeggios, accords jazz et Web Audio API.
            Passion musique × passion code.
          </p>
        </motion.div>

        {/* Main controls */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Player card */}
          <div className="glass rounded-2xl p-8 mb-6">
            {/* Visualizer bar */}
            <div className="flex items-end justify-center gap-1 h-16 mb-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? {
                    height: [8, 20 + Math.random() * 40, 8],
                    backgroundColor: activeNote
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground) / 0.3)',
                  } : { height: 8 }}
                  transition={isPlaying ? {
                    repeat: Infinity,
                    duration: 0.4 + Math.random() * 0.6,
                    delay: i * 0.05,
                  } : { duration: 0.5 }}
                  className="w-1.5 rounded-full bg-muted-foreground/20"
                  style={{ minHeight: 4 }}
                />
              ))}
            </div>

            {/* Transport controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isPlaying ? stopMelody : playMelody}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-heading font-semibold text-lg transition-all ${
                  isPlaying
                    ? 'bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20'
                    : 'bg-primary text-primary-foreground hover:opacity-90 glow-primary'
                }`}
              >
                {isPlaying ? <Square size={22} /> : <Play size={22} />}
                {isPlaying ? 'Stop' : 'Play'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLoop(!loop)}
                className={`flex items-center gap-2 px-5 py-4 rounded-xl border transition-all ${
                  loop
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : 'border-border/50 bg-secondary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Repeat size={18} />
                <span className="text-sm font-medium">{loop ? 'On' : 'Off'}</span>
              </motion.button>
            </div>

            {/* Feedback */}
            <motion.div
              key={feedback}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-muted-foreground mb-8 h-5"
            >
              {feedback}
            </motion.div>

            {/* BPM slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Volume2 size={14} /> Tempo
                </span>
                <span className="font-heading font-semibold text-primary">{bpm} BPM</span>
              </div>
              <Slider
                value={[bpm]}
                onValueChange={([v]) => setBpm(v)}
                min={40}
                max={180}
                step={1}
              />
            </div>
          </div>

          {/* Sound settings */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Wave type */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Waves size={16} className="text-primary" />
                <span className="font-heading font-semibold text-sm">Type d'onde</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {WAVE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setWave(opt.value); setFeedback(`Onde : ${opt.label}`); }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      wave === opt.value
                        ? 'bg-primary/15 border border-primary/30 text-primary'
                        : 'bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Music size={16} className="text-accent" />
                <span className="font-heading font-semibold text-sm">Ambiance</span>
              </div>
              <div className="flex flex-col gap-2">
                {MOOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setMood(opt.value); applyMoodFilter(opt.value); setFeedback(`Ambiance : ${opt.label}`); }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      mood === opt.value
                        ? 'bg-accent/15 border border-accent/30 text-accent'
                        : 'bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-muted-foreground/50 mt-8"
          >
            Appuie sur Espace pour play/stop • Cmaj7 – Am7 – Fmaj7 – Gsus4 – G7
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
