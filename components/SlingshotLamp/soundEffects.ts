/**
 * Procedural Web Audio API Sound Synthesizer
 * Zero audio assets needed - 100% synthesized in real time.
 */

class LampAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  public muted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      this.ctx = new AudioCtx();
      this.noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  private burst(
    t: number,
    dur: number,
    type: BiquadFilterType,
    freq: number,
    gain: number,
    q: number = 1
  ) {
    if (!this.ctx || !this.noiseBuffer) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(this.ctx.destination);
    s.start(t, Math.random() * 0.5);
    s.stop(t + dur + 0.02);
  }

  private tone(
    t: number,
    f0: number,
    f1: number,
    dur: number,
    gain: number,
    type: OscillatorType = "sine"
  ) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  public play(name: "squeak" | "stretch" | "on" | "off" | "twang" | "clank" | "tap" | "pop", amt: number = 1) {
    if (this.muted) return;
    const ac = this.getAudioContext();
    if (!ac || (name === "squeak" && ac.state !== "running")) return;

    const t = ac.currentTime + 0.005;

    if (name === "squeak") {
      const g = Math.max(0, Math.min(1, amt));
      const dur = 0.14 + g * 0.16;
      const base = 1400 + Math.random() * 350;
      const o = ac.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(base * 0.8, t);
      o.frequency.linearRampToValueAtTime(base * 1.15, t + dur * 0.4);
      o.frequency.linearRampToValueAtTime(base * 0.9, t + dur);

      const lfo = ac.createOscillator();
      const depth = ac.createGain();
      lfo.frequency.value = 26 + Math.random() * 12;
      depth.gain.value = base * 0.07;
      lfo.connect(depth).connect(o.frequency);

      const f = ac.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = base * 1.2;
      f.Q.value = 4;

      const v = ac.createGain();
      v.gain.setValueAtTime(0.0001, t);
      v.gain.exponentialRampToValueAtTime(0.04 + 0.09 * g, t + 0.03);
      v.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      o.connect(f).connect(v).connect(ac.destination);
      o.start(t);
      lfo.start(t);
      o.stop(t + dur + 0.02);
      lfo.stop(t + dur + 0.02);
      return;
    }

    if (name === "stretch") {
      const f0 = 80 + amt * 240;
      const o = ac.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(f0, t);
      o.frequency.linearRampToValueAtTime(f0 * 1.1, t + 0.05);

      const f = ac.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = f0 * 4;
      f.Q.value = 3;

      const v = ac.createGain();
      v.gain.setValueAtTime(0.05 + amt * 0.05, t);
      v.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

      o.connect(f).connect(v).connect(ac.destination);
      o.start(t);
      o.stop(t + 0.07);
      this.burst(t, 0.02, "bandpass", 1200 + amt * 1600, 0.05, 2);
      return;
    }

    if (name === "on" || name === "off") {
      this.burst(t, 0.012, "highpass", 2600, 0.5);
      this.burst(t + 0.025, 0.014, "bandpass", name === "on" ? 1900 : 1300, 0.4, 2);
      this.tone(t, 150, 60, 0.06, 0.22);
      return;
    }

    if (name === "twang") {
      this.burst(t, 0.03, "bandpass", 900, 0.35, 3);
      this.tone(t, 190, 110, 0.16, 0.18, "triangle");
      return;
    }

    if (name === "clank") {
      const g = Math.max(0.15, Math.min(1, amt));
      [1320, 2210, 3470].forEach((f, i) =>
        this.tone(t, f, f * 0.98, 0.35 - i * 0.08, 0.09 * g, "triangle")
      );
      this.burst(t, 0.02, "highpass", 3000, 0.4 * g);
      return;
    }

    if (name === "tap") {
      this.burst(t, 0.03, "lowpass", 500, Math.max(0.05, Math.min(0.5, amt)));
      return;
    }

    if (name === "pop") {
      this.burst(t, 0.14, "lowpass", 900, 0.9);
      this.tone(t, 220, 40, 0.12, 0.3);
      for (let i = 0; i < 16; i++) {
        this.burst(
          t + 0.02 + Math.random() * 0.7,
          0.02 + Math.random() * 0.06,
          "bandpass",
          3000 + Math.random() * 5000,
          0.12 + Math.random() * 0.2,
          9
        );
      }
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public destroy() {
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}

export const lampAudio = new LampAudioSynthesizer();
