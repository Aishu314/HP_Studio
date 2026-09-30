/**
 * Bollywood Audio Engine for HP Studio Reels
 * Plays actual high-fidelity audio tracks with Web Audio visualizer integration.
 */

export type SongKey = 'chalka' | 'kudmayi' | 'kesariya' | 'lullaby' | 'dhoom' | 'tummile' | 'kabira' | 'gallan';

export interface AudioTrackMeta {
  key: SongKey;
  title: string;
  artist: string;
  bpm: number;
  mood: string;
  duration: string;
  audioSrc: string;
}

export const AUDIO_TRACKS: Record<SongKey, AudioTrackMeta> = {
  chalka: {
    key: 'chalka',
    title: 'Chalka Chalka Re',
    artist: 'Saathiya • A.R. Rahman, Richa Sharma',
    bpm: 78,
    mood: 'Original Bridal Entry Classic',
    duration: '0:35',
    audioSrc: '/audio/chalka.mp3',
  },
  kabira: {
    key: 'kabira',
    title: 'Kabira',
    artist: 'Yeh Jawaani Hai Deewani • Pritam, Arijit Singh',
    bpm: 76,
    mood: 'Original Varmala & Heritage Emotion',
    duration: '0:35',
    audioSrc: '/audio/kabira.mp3',
  },
  kesariya: {
    key: 'kesariya',
    title: 'Kesariya',
    artist: 'Brahmāstra • Pritam, Arijit Singh',
    bpm: 84,
    mood: 'Original Golden Hour Romance',
    duration: '0:35',
    audioSrc: '/audio/kesariya.mp3',
  },
  kudmayi: {
    key: 'kudmayi',
    title: 'Kudmayi (Film Version)',
    artist: 'Rocky Aur Rani Kii Prem Kahaani • Pritam, Shahid Mallya',
    bpm: 82,
    mood: 'Original Grand Sangeet & Shehnai',
    duration: '0:35',
    audioSrc: '/audio/kudmayi.mp3',
  },
  gallan: {
    key: 'gallan',
    title: 'Gallan Goodiyaan',
    artist: 'Dil Dhadakne Do • Shankar-Ehsaan-Loy, Yashita Sharma',
    bpm: 118,
    mood: 'Original High-Energy Haldi & Dhol',
    duration: '0:35',
    audioSrc: '/audio/gallan.mp3',
  },
  tummile: {
    key: 'tummile',
    title: 'Tu Hi Haqeeqat / Tum Mile',
    artist: 'Tum Mile • Pritam, Javed Ali',
    bpm: 74,
    mood: 'Original Sunset Coastal Romance',
    duration: '0:35',
    audioSrc: '/audio/tummile.mp3',
  },
  lullaby: {
    key: 'lullaby',
    title: 'Dhaagon Se Baandhaa (Lullaby)',
    artist: 'Raksha Bandhan • Arijit Singh, Shreya Ghoshal',
    bpm: 64,
    mood: 'Original Tender Baby Milestone',
    duration: '0:35',
    audioSrc: '/audio/lullaby.mp3',
  },
  dhoom: {
    key: 'dhoom',
    title: 'Dhoom Again',
    artist: 'Dhoom 2 • Pritam, Vishal Dadlani, Sunidhi Chauhan',
    bpm: 100,
    mood: 'Original High-Octane Automotive Adrenaline',
    duration: '0:35',
    audioSrc: '/audio/dhoom.mp3',
  },
};

class BollywoodAudioEngine {
  private currentSong: SongKey | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.75;
  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private isConnectedToContext: boolean = false;
  private listeners: Set<(isPlaying: boolean, song: SongKey | null) => void> = new Set();

  private initAudio() {
    if (!this.audioElement && typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.loop = true;

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('ended', () => {
        if (!this.audioElement?.loop) {
          this.isPlaying = false;
          this.notify();
        }
      });

      this.audioElement.addEventListener('error', (err) => {
        console.warn('Audio playback notice:', err);
      });
    }
  }

  private initContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 64;

          if (this.audioElement && !this.isConnectedToContext) {
            try {
              this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
              this.sourceNode.connect(this.analyser);
              this.analyser.connect(this.audioContext.destination);
              this.isConnectedToContext = true;
            } catch (e) {
              // Ignore if already connected
            }
          }
        }
      } catch (e) {
        // Fallback gracefully without context
      }
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
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
    if (!this.analyser || !this.isPlaying || this.isMuted) {
      if (this.isPlaying && !this.isMuted) {
        // Simulated responsive dancing bars if AudioContext is pending
        const time = Date.now() / 150;
        return [
          Math.sin(time) * 30 + 50,
          Math.cos(time * 1.2) * 35 + 55,
          Math.sin(time * 0.8) * 25 + 60,
          Math.cos(time * 1.5) * 40 + 50,
          Math.sin(time * 1.1) * 30 + 55,
          Math.cos(time * 0.9) * 20 + 45,
          Math.sin(time * 1.3) * 35 + 50,
        ];
      }
      return [15, 15, 15, 15, 15, 15, 15];
    }

    try {
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      const samples: number[] = [];
      const step = Math.floor(dataArray.length / 7) || 1;
      for (let i = 0; i < 7; i++) {
        const val = dataArray[i * step] || 0;
        samples.push(Math.max(15, Math.min(100, Math.round((val / 255) * 85 + 15))));
      }
      return samples;
    } catch {
      return [30, 60, 45, 80, 50, 65, 40];
    }
  }

  public play(songKey: SongKey) {
    this.initAudio();
    this.initContext();

    if (!this.audioElement) return;

    const track = AUDIO_TRACKS[songKey];
    if (!track) return;

    const targetSrc = track.audioSrc;

    // Check if same song is already playing
    if (this.currentSong === songKey && this.isPlaying) {
      return;
    }

    this.currentSong = songKey;

    // Change source if needed
    if (!this.audioElement.src.includes(targetSrc)) {
      this.audioElement.src = targetSrc;
      this.audioElement.load();
    }

    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    this.audioElement.currentTime = 0;

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch((err) => {
          console.log('Audio autoplay prevented or user gesture needed:', err);
        });
    }
  }

  public togglePlay(songKey: SongKey) {
    if (this.isPlaying && this.currentSong === songKey) {
      this.stop();
    } else {
      this.play(songKey);
    }
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.isPlaying = false;
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement && !this.isMuted) {
      this.audioElement.volume = this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
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
}

export const audioEngine = new BollywoodAudioEngine();
