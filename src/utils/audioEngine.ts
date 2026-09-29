/**
 * Bollywood & Thematic Web Audio Synthesizer for HP Studio Reels
 * Plays authentic melodic hooks matching the Bollywood songs in the reels.
 */

type SongKey = 'chalka' | 'kudmayi' | 'kesariya' | 'lullaby' | 'dhoom' | 'tummile' | 'kabira' | 'gallan';

interface NoteEvent {
  note: string;
  duration: number; // in seconds
  gain?: number;
}

// Note frequencies in Hz
const NOTE_FREQS: Record<string, number> = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50, 'REST': 0
};

// Melodies for the Bollywood songs
const SONG_SEQUENCES: Record<SongKey, { bpm: number; notes: NoteEvent[]; instrument: 'shehnai' | 'flute' | 'guitar' | 'lullaby' | 'synth' }> = {
  // Chalka Chalka Re (Slowed + Reverb) - Saathiya
  chalka: {
    bpm: 76,
    instrument: 'flute',
    notes: [
      { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'C5', duration: 0.75 },
      { note: 'D5', duration: 0.5 },
      { note: 'C5', duration: 0.5 },
      { note: 'A4', duration: 0.75 },
      { note: 'G4', duration: 0.5 },
      { note: 'E4', duration: 0.75 },
      { note: 'G4', duration: 1.0 },
      { note: 'A4', duration: 0.5 },
      { note: 'C5', duration: 0.75 },
      { note: 'D5', duration: 0.75 },
      { note: 'E5', duration: 0.5 },
      { note: 'D5', duration: 0.5 },
      { note: 'C5', duration: 1.2 },
      { note: 'REST', duration: 0.3 },
    ]
  },
  // Kudmayi - Sangeet Night (Rocky Aur Rani)
  kudmayi: {
    bpm: 80,
    instrument: 'shehnai',
    notes: [
      { note: 'F4', duration: 0.6 },
      { note: 'Bb4', duration: 0.6 },
      { note: 'C5', duration: 0.6 },
      { note: 'D5', duration: 0.9 },
      { note: 'Eb5', duration: 0.45 },
      { note: 'D5', duration: 0.45 },
      { note: 'C5', duration: 0.6 },
      { note: 'Bb4', duration: 0.9 },
      { note: 'A4', duration: 0.45 },
      { note: 'Bb4', duration: 1.2 },
      { note: 'D5', duration: 0.6 },
      { note: 'C5', duration: 0.6 },
      { note: 'Bb4', duration: 0.6 },
      { note: 'F4', duration: 1.2 },
      { note: 'REST', duration: 0.4 },
    ]
  },
  // Kesariya • Acoustic Romance (Brahmāstra)
  kesariya: {
    bpm: 84,
    instrument: 'guitar',
    notes: [
      { note: 'D4', duration: 0.4 },
      { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'B4', duration: 0.7 },
      { note: 'C5', duration: 0.4 },
      { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 0.8 },
      { note: 'A4', duration: 0.6 },
      { note: 'F#4', duration: 0.6 },
      { note: 'G4', duration: 1.4 },
      { note: 'D4', duration: 0.4 },
      { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'B4', duration: 1.0 },
      { note: 'REST', duration: 0.3 },
    ]
  },
  // Warmest Lullaby • Ambient Flute & Bells
  lullaby: {
    bpm: 64,
    instrument: 'lullaby',
    notes: [
      { note: 'C5', duration: 0.8 },
      { note: 'E5', duration: 0.8 },
      { note: 'G5', duration: 1.2 },
      { note: 'A5', duration: 0.8 },
      { note: 'G5', duration: 1.0 },
      { note: 'E5', duration: 0.8 },
      { note: 'D5', duration: 0.8 },
      { note: 'C5', duration: 1.4 },
      { note: 'E5', duration: 0.8 },
      { note: 'G5', duration: 0.8 },
      { note: 'C6', duration: 1.6 },
      { note: 'REST', duration: 0.5 },
    ]
  },
  // Dhoom Machale / Automotive Cinematic
  dhoom: {
    bpm: 96,
    instrument: 'synth',
    notes: [
      { note: 'E4', duration: 0.3 },
      { note: 'E4', duration: 0.3 },
      { note: 'G4', duration: 0.4 },
      { note: 'A4', duration: 0.6 },
      { note: 'G4', duration: 0.3 },
      { note: 'E4', duration: 0.6 },
      { note: 'D4', duration: 0.4 },
      { note: 'E4', duration: 1.0 },
      { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 0.5 },
      { note: 'E4', duration: 1.2 },
      { note: 'REST', duration: 0.4 },
    ]
  },
  // Tum Mile • Lo-Fi Romance
  tummile: {
    bpm: 76,
    instrument: 'flute',
    notes: [
      { note: 'A4', duration: 0.6 },
      { note: 'C5', duration: 0.6 },
      { note: 'B4', duration: 0.6 },
      { note: 'G4', duration: 0.8 },
      { note: 'A4', duration: 0.5 },
      { note: 'F4', duration: 0.5 },
      { note: 'G4', duration: 0.8 },
      { note: 'E4', duration: 1.2 },
      { note: 'REST', duration: 0.3 },
    ]
  },
  // Kabira • Acoustic Folk & Flute
  kabira: {
    bpm: 74,
    instrument: 'guitar',
    notes: [
      { note: 'C5', duration: 0.5 },
      { note: 'D5', duration: 0.5 },
      { note: 'C5', duration: 0.5 },
      { note: 'B4', duration: 0.75 },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 0.75 },
      { note: 'E4', duration: 0.5 },
      { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 1.2 },
      { note: 'REST', duration: 0.4 },
    ]
  },
  // Gallan Goodiyaan • High-Energy Sangeet Dhol
  gallan: {
    bpm: 116,
    instrument: 'shehnai',
    notes: [
      { note: 'D5', duration: 0.3 },
      { note: 'D5', duration: 0.3 },
      { note: 'E5', duration: 0.3 },
      { note: 'D5', duration: 0.3 },
      { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 0.3 },
      { note: 'B4', duration: 0.5 },
      { note: 'D5', duration: 0.8 },
      { note: 'E5', duration: 0.4 },
      { note: 'D5', duration: 0.8 },
      { note: 'REST', duration: 0.3 },
    ]
  }
};

class BollywoodAudioEngine {
  private ctx: AudioContext | null = null;
  private currentSong: SongKey | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private noteIndex: number = 0;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private volume: number = 0.55;
  private isMuted: boolean = false;
  private listeners: Set<(isPlaying: boolean, song: SongKey | null) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (isPlaying: boolean, song: SongKey | null) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.currentSong));
  }

  public getVisualizerData(): number[] {
    if (!this.analyser || !this.isPlaying) {
      return [12, 24, 18, 30, 22, 14, 28];
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    // Sample 7 frequency bands
    const samples: number[] = [];
    const step = Math.floor(dataArray.length / 7) || 1;
    for (let i = 0; i < 7; i++) {
      const val = dataArray[i * step] || 0;
      // map 0..255 to percentage 15..100
      samples.push(Math.max(15, Math.min(100, Math.round((val / 255) * 85 + 15))));
    }
    return samples;
  }

  public play(songKey: SongKey) {
    this.initContext();
    if (this.isPlaying && this.currentSong === songKey) {
      // Toggle pause
      this.stop();
      return;
    }

    this.stop();
    this.currentSong = songKey;
    this.isPlaying = true;
    this.noteIndex = 0;
    this.notify();

    this.scheduleNextNote();
  }

  public togglePlay(songKey: SongKey) {
    if (this.isPlaying && this.currentSong === songKey) {
      this.stop();
    } else {
      this.play(songKey);
    }
  }

  public stop() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentSong(): SongKey | null {
    return this.currentSong;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.currentSong || !this.ctx || !this.masterGain) return;

    const song = SONG_SEQUENCES[this.currentSong];
    if (!song) return;

    const noteEvent = song.notes[this.noteIndex];
    const duration = noteEvent.duration * (60 / song.bpm);

    if (noteEvent.note !== 'REST') {
      const freq = NOTE_FREQS[noteEvent.note];
      if (freq) {
        this.triggerTone(freq, duration, song.instrument);
      }
    }

    // Schedule next
    this.timerId = window.setTimeout(() => {
      this.noteIndex = (this.noteIndex + 1) % song.notes.length;
      this.scheduleNextNote();
    }, duration * 1000);
  }

  private triggerTone(freq: number, duration: number, instrument: string) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Harmonics for rich Bollywood musical timbre
    if (instrument === 'flute') {
      // Warm sine + soft triangle with gentle vibrato
      osc.type = 'sine';
      // Vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(5, now); // 5Hz vibrato
      lfoGain.gain.setValueAtTime(freq * 0.02, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + duration);

      osc.frequency.setValueAtTime(freq, now);
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.35, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.15);
    } else if (instrument === 'shehnai') {
      // Nasal reed saw + triangle with slight slide
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * 0.98, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.06);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, now);
      filter.Q.setValueAtTime(3, now);

      osc.connect(filter);
      filter.connect(noteGain);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.28, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.1);

      osc.start(now);
      osc.stop(now + duration + 0.1);
      noteGain.connect(this.masterGain);
      return;
    } else if (instrument === 'guitar') {
      // Plucked acoustic triangle with fast attack and natural decay
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.4, now + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.2);
    } else if (instrument === 'lullaby') {
      // Gentle chime bell tones with pure sine and soft overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle chime overtone
      const overtone = this.ctx.createOscillator();
      const overGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2, now);
      overGain.gain.setValueAtTime(0.08, now);
      overGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      overtone.connect(overGain);
      overGain.connect(this.masterGain);
      overtone.start(now);
      overtone.stop(now + duration);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.28, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.3);
    } else {
      // Synth punch
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      noteGain.gain.setValueAtTime(0.3, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.3);
  }
}

export const audioEngine = new BollywoodAudioEngine();
