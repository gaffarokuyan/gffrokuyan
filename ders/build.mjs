// Ders videosu üretir:
//   node build.mjs <ders>              → out/<ders>.mp4 (1920×1080) + out/<ders>-kapak.png (1280×720)
//   node build.mjs <ders> --shots 3,20 → out/<ders>-shot-*.png
import { createRequire } from 'node:module';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const DIR = path.dirname(fileURLToPath(import.meta.url));
const NAME = process.argv[2];
const LDIR = path.join(DIR, 'lessons', NAME || '');
if (!NAME || !fs.existsSync(path.join(LDIR, 'lesson.js'))) { console.error('kullanım: node build.mjs <ders>'); process.exit(1); }
const OUT = path.join(DIR, 'out');
fs.mkdirSync(OUT, { recursive: true });
const FPS = 30, SR = 44100;

// 1) Ses süreleri → timing.js
const voices = {}, dur = {};
for (const f of fs.readdirSync(path.join(LDIR, 'audio')).filter(f => f.endsWith('.mp3')).sort()) {
  const id = f.replace('.mp3', '');
  const buf = execFileSync('ffmpeg', ['-v', 'error', '-i', path.join(LDIR, 'audio', f), '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
  voices[id] = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
  dur[id] = +(voices[id].length / SR).toFixed(2);
}
fs.writeFileSync(path.join(LDIR, 'timing.js'), '// build.mjs tarafından üretilir\nwindow.DUR=' + JSON.stringify(dur) + ';\n');

const browser = await chromium.launch();
const url = pathToFileURL(path.join(DIR, 'index.html')).href + '?lesson=' + NAME;
async function newPage() {
  const p = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.error('SAYFA HATASI:', e.message));
  await p.goto(url);
  await p.evaluate(async () => { await document.fonts.ready; await Promise.all([document.fonts.load('900 40px Cinzel', 'ŞÊÎÛ'), document.fonts.load('700 40px Cinzel', 'ŞÊÎÛ'), document.fonts.load('800 40px Inter', 'şçğı')]); });
  return p;
}
const page0 = await newPage();
const TL = await page0.evaluate(() => JSON.parse(JSON.stringify(window.TL)));
console.log(NAME, 'süre', TL.dur, 'sn');

await page0.evaluate(() => window.renderCover());
const big = path.join(OUT, NAME + '-kapak-1920.png');
await page0.screenshot({ path: big });
spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', big, '-vf', 'scale=1280:720:flags=lanczos', path.join(OUT, NAME + '-kapak.png')]);
fs.rmSync(big);

const shotsArg = process.argv.indexOf('--shots');
if (shotsArg > 0) {
  let k = 0;
  for (const a of process.argv[shotsArg + 1].split(',')) { await page0.evaluate(t => window.renderAt(t), a === 'end' ? TL.dur - .5 : Number(a)); await page0.screenshot({ path: path.join(OUT, `${NAME}-shot-${String(k++).padStart(2, '0')}.png`) }); }
  await browser.close(); process.exit(0);
}

// 2) Kareler
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ders-'));
const total = Math.round(TL.dur * FPS);
let next = 0;
await Promise.all([page0, await newPage(), await newPage(), await newPage()].map(async p => {
  for (;;) {
    const f = next++; if (f >= total) break;
    await p.evaluate(t => window.renderAt(t), f / FPS);
    await p.screenshot({ path: path.join(TMP, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 95 });
  }
}));
await browser.close();

// 3) Ses
const mix = new Float32Array(Math.ceil(TL.dur * SR));
const add = (pcm, at, gain = 1) => { const o = Math.floor(at * SR); for (let i = 0; i < pcm.length && o + i < mix.length; i++) mix[o + i] += pcm[i] * gain; };
for (const c of TL.clips) {
  const pcm = voices[c.id]; if (!pcm) { console.warn('ses yok:', c.id); continue; }
  let sq = 0, pk = 0; for (const v of pcm) { sq += v * v; pk = Math.max(pk, Math.abs(v)); }
  add(pcm, c.at, Math.min(0.1 / Math.sqrt(sq / pcm.length), 0.9 / pk));
}
const tone = (f, d, vol, decay) => { const n = Math.floor(d * SR), o = new Float32Array(n); for (let i = 0; i < n; i++) { const u = i / n; o[i] = Math.sin(2 * Math.PI * f * i / SR) * vol * Math.exp(-decay * u) * Math.min(1, i / 300); } return o; };
for (const at of TL.chimes) { add(tone(880, .5, .07, 6), at); add(tone(1320, .6, .05, 5), at + .07); }
for (let i = 0; i < mix.length; i++) mix[i] = Math.tanh(mix[i] * 1.15);
const raw = path.join(TMP, 'mix.f32');
fs.writeFileSync(raw, Buffer.from(mix.buffer));

// 4) Birleştir
const out = path.join(OUT, NAME + '.mp4');
const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', String(FPS), '-i', path.join(TMP, 'f%05d.jpg'),
  '-f', 'f32le', '-ar', String(SR), '-ac', '1', '-i', raw,
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-ac', '2',
  '-movflags', '+faststart', '-shortest', out], { stdio: 'inherit' });
fs.rmSync(TMP, { recursive: true, force: true });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log('bitti →', out);
