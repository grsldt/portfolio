import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function MiniMelodyPlayer() {
  const audioRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState<number | null>(null);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gain = ctx.createGain();
      gain.gain.value = 0.8;
      const filt = ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = 6500;
      filt.Q.value = 0.7;
      gain.connect(filt);
      filt.connect(ctx.destination);
      audioRef.current = ctx;
      masterRef.current = gain;
      filterRef.current = filt;
    }
    if (audioRef.current.state === 'suspended') audioRef.current.resume();
  }, []);

  const playNote = useCallback((midi: number, startTime: number, dur: number) => {
    const ctx = audioRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = noteFreq(midi);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(1, startTime + 0.01);
    gain.gain.linearRampToValueAtTime(0.75, startTime + 0.13);
    gain.gain.setTargetAtTime(0.0001, startTime + dur, 0.35);
    osc.connect(gain);
    gain.connect(masterRef.current!);
    osc.start(startTime);
    osc.stop(startTime + dur + 0.4);
  }, []);

  const clearScheduled = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  const playMelody = useCallback(() => {
    ensureAudio();
    clearScheduled();
    const melody = buildMelody();
    const secPerBeat = 60 / 90;
    const start = audioRef.current!.currentTime + 0.2;
    const totalBeats = melody[melody.length - 1].beat + 2;
    const totalDur = totalBeats * secPerBeat;

    setIsPlaying(true);

    melody.forEach((note) => {
      const t = start + note.beat * secPerBeat;
      const delay = (t - audioRef.current!.currentTime) * 1000;
      const handle = window.setTimeout(() => {
        playNote(note.midi, t, secPerBeat * 0.9);
        setActiveNote(note.midi);
        window.setTimeout(() => setActiveNote(null), 200);
      }, Math.max(0, delay));
      timeoutsRef.current.push(handle);
    });

    const endHandle = window.setTimeout(() => {
      setIsPlaying(false);
      setActiveNote(null);
    }, totalDur * 1000);
    timeoutsRef.current.push(endHandle);
  }, [ensureAudio, clearScheduled, playNote]);

  const stopMelody = useCallback(() => {
    clearScheduled();
    setIsPlaying(false);
    setActiveNote(null);
  }, [clearScheduled]);

  useEffect(() => () => clearScheduled(), [clearScheduled]);

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Pulse ring */}
      <div className="relative">
        <AnimatePresence>
          {isPlaying && activeNote && (
            <motion.div
              key={activeNote}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 rounded-full border-2 border-accent/30 pointer-events-none"
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={isPlaying ? { rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
        >
          <Music size={28} className="text-primary" />
        </motion.div>
      </div>

      <h3 className="font-heading text-2xl font-bold">
        {isPlaying ? 'Écoute en cours…' : 'Petite musique avant de démarrer ?'}
      </h3>

      {/* Mini visualizer */}
      <div className="flex items-end justify-center gap-0.5 h-8">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            animate={isPlaying ? {
              height: [4, 12 + Math.random() * 20, 4],
            } : { height: 4 }}
            transition={isPlaying ? {
              repeat: Infinity,
              duration: 0.3 + Math.random() * 0.5,
              delay: i * 0.04,
            } : { duration: 0.4 }}
            className="w-1 rounded-full bg-accent/50"
            style={{ minHeight: 3 }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isPlaying ? stopMelody : playMelody}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isPlaying
              ? 'bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20'
              : 'bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20'
          }`}
        >
          {isPlaying ? <Square size={16} /> : <Play size={16} />}
          {isPlaying ? 'Stop' : 'Écouter'}
        </motion.button>

        <Link
          to="/melody"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary"
        >
          <Music size={16} />
          Melody Lab
        </Link>
      </div>

      <p className="text-xs text-muted-foreground/50">
        Composée en code — Web Audio API
      </p>
    </div>
  );
}
