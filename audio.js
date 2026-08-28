/**
 * SOUMYADIP SARKAR - CINEMATIC PROCEDURAL SOUNDSCAPE ENGINE
 * Hans Zimmer-inspired minimalist acoustic synthesis:
 * - Sub-bass atmospheric cosmic drone (warm sine + resonant chord)
 * - Ultra-minimalist analogue tape ticks
 * - Cinematic sub-swell for relativistic transitions
 * - Subtle resonant organic glass taps for cards
 */

class CinematicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientGain = null;
    this.ambientOscs = [];
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbientDrone();
    } else {
      this.stopAmbientDrone();
    }

    return !this.isMuted;
  }

  /**
   * Deep Atmospheric Drone (Warm, subtle, cinematic)
   */
  startAmbientDrone() {
    if (this.isMuted || !this.ctx || this.ambientOscs.length > 0) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.09, now + 4);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(110, now);

      // Deep Sub Root (48Hz) + Fifth (72Hz)
      const freqs = [48.0, 72.0, 96.0];
      this.ambientOscs = freqs.map((f, i) => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f + (i * 0.15), now); // slight detune
        osc.connect(filter);
        osc.start();
        return osc;
      });

      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);
    } catch (e) {
      console.warn(e);
    }
  }

  stopAmbientDrone() {
    if (!this.ctx || !this.ambientGain) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        this.ambientOscs.forEach(osc => {
          osc.stop();
          osc.disconnect();
        });
        this.ambientOscs = [];
      }, 1300);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Minimalist Analogue Tape Tick (Typewriter)
   */
  playTypewriterClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.025);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {}
  }

  /**
   * Cinematic Sub-Bass Swell & Relativistic Transition Whoosh
   */
  playSupernovaBoom() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // 1. Deep Sub Riser into Impact
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(60, now);
      subOsc.frequency.linearRampToValueAtTime(140, now + 0.5);
      subOsc.frequency.exponentialRampToValueAtTime(28, now + 1.6);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.5, now + 0.5);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(now);
      subOsc.stop(now + 1.9);

      // 2. Atmospheric Filtered White Noise Breath
      const bufferSize = this.ctx.sampleRate * 1.8;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(3200, now + 0.5);
      filter.frequency.exponentialRampToValueAtTime(80, now + 1.7);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.2, now + 0.5);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 1.9);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Resonant Organic Glass Tap (Card Flip)
   */
  playCardFlip() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {}
  }

  playChime(freq = 440, duration = 0.25) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.04);
    } catch (e) {}
  }
}

// Instantiate Cinematic Audio Engine
window.cosmicAudio = new CinematicAudioEngine();
