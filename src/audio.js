// Tiny WebAudio synth for effects and a soft generative soundtrack. No audio files.
let ctx = null, master = null, musicGain = null, enabled = true, musicTimer = null;

function ensure() {
  if (ctx) return true;
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = enabled ? 0.5 : 0; master.connect(ctx.destination);
    musicGain = ctx.createGain(); musicGain.gain.value = 0.16; musicGain.connect(master);
  } catch (e) { ctx = null; }
  return !!ctx;
}

function tone(freq, dur, type = 'sine', vol = 0.3, slide = 0, dest = master, delay = 0) {
  const t0 = ctx.currentTime + delay;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * slide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(dest); o.start(t0); o.stop(t0 + dur + 0.05);
}
function noise(dur, vol = 0.3, freq = 1200, q = 1) {
  const n = ctx.sampleRate * dur, buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = ctx.createBufferSource(); s.buffer = buf;
  const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
  const g = ctx.createGain(); g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(master); s.start();
}

const SFX = {
  click: () => tone(660, 0.07, 'triangle', 0.2, 1.4),
  hit: (v) => { noise(0.08, 0.25 * v, 900, 0.8); tone(160, 0.08, 'square', 0.1 * v, 0.6); },
  shot: (v) => tone(820, 0.1, 'triangle', 0.12 * v, 0.5),
  cast: (v) => { tone(380, 0.25, 'sawtooth', 0.12 * v, 2.2); tone(760, 0.3, 'sine', 0.12 * v, 1.5); },
  boom: (v) => { noise(0.5, 0.5 * v, 220, 0.6); tone(90, 0.5, 'sine', 0.4 * v, 0.4); },
  heal: (v) => [523, 659, 784].forEach((f, i) => tone(f, 0.3, 'sine', 0.14 * v, 1, master, i * 0.07)),
  level: () => [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, 'triangle', 0.2, 1, master, i * 0.07)),
  coin: () => { tone(1320, 0.08, 'square', 0.1); tone(1760, 0.14, 'square', 0.1, 1, master, 0.07); },
  death: () => { tone(300, 0.7, 'sawtooth', 0.25, 0.25); noise(0.5, 0.2, 300); },
  tower: () => { noise(1.1, 0.6, 140, 0.5); tone(70, 1, 'sine', 0.5, 0.5); tone(220, 0.8, 'sawtooth', 0.15, 0.3); },
  win: () => [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, 0.6, 'triangle', 0.22, 1, master, i * 0.13)),
  lose: () => [440, 392, 330, 262, 196].forEach((f, i) => tone(f, 0.7, 'sawtooth', 0.14, 1, master, i * 0.2)),
  error: () => tone(160, 0.15, 'square', 0.15, 0.8),
};

export const audio = {
  unlock() { if (ensure() && ctx.state === 'suspended') ctx.resume(); },
  setEnabled(on) { enabled = on; if (master) master.gain.value = on ? 0.5 : 0; },
  play(name, vol = 1) { if (!enabled || !ctx || ctx.state !== 'running' || vol <= 0.02) return; try { SFX[name]?.(Math.min(1, vol)); } catch (e) { /* ignore */ } },
  // slow modal arpeggio over a drone
  music(on) {
    clearInterval(musicTimer); musicTimer = null;
    if (!on || !ensure()) return;
    const scale = [146.83, 164.81, 174.61, 220, 246.94, 293.66, 329.63, 349.23, 440];
    let step = 0;
    const tick = () => {
      if (!enabled || ctx.state !== 'running') return;
      const root = [0, 0, 3, 2][(step >> 3) & 3];
      if (step % 8 === 0) { tone(scale[root] / 2, 3.6, 'sine', 0.5, 1, musicGain); tone(scale[root] * 0.75, 3.6, 'triangle', 0.12, 1, musicGain); }
      const pat = [0, 2, 4, 5, 4, 2, 6, 4];
      if (step % 2 === 0 || Math.random() < 0.3) tone(scale[Math.min(8, root + pat[step & 7])] * 2, 0.9, 'sine', 0.22, 1, musicGain);
      step++;
    };
    musicTimer = setInterval(tick, 430);
  },
};
