// Videoyu üretir:  node build.mjs            → out/saet-hest.mp4
//                  node build.mjs --shots 3,13,30  → sadece verilen saniyelerin PNG'leri (out/shot-*.png)
import { createRequire } from 'node:module';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, 'out');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'saet-hest-'));
fs.mkdirSync(OUT, { recursive: true });

// timeline.js tarayıcı için yazıldı; burada da aynı dosyayı okuyoruz
const TL = new Function('window', fs.readFileSync(path.join(DIR, 'timeline.js'), 'utf8') + ';return window.TL;')({});
const FPS = TL.fps, SR = 44100;

// 1) Dudak senkronu için her repliğin ses zarfı (kare başına 0..1)
function decode(file) {
  const buf = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
  return new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
}
const voices = {}, env = {};
for (const l of TL.lines) {
  const pcm = decode(path.join(DIR, 'audio', l.id + '.mp3'));
  voices[l.id] = pcm;
  const hop = SR / FPS, n = Math.ceil(pcm.length / hop), rms = [];
  for (let i = 0; i < n; i++) { let s = 0, c = 0; for (let j = Math.floor(i * hop); j < Math.min(pcm.length, (i + 1) * hop); j++) { s += pcm[j] * pcm[j]; c++; } rms.push(Math.sqrt(s / Math.max(1, c))); }
  const ref = [...rms].sort((a, b) => a - b)[Math.floor(n * .9)] || 1;
  env[l.id] = rms.map((v, i) => { const sm = (v + (rms[i - 1] ?? v) + (rms[i + 1] ?? v)) / 3; return +Math.min(1, Math.pow(sm / ref, .8)).toFixed(2); }).map(v => (v < .12 ? 0 : v));
}
fs.writeFileSync(path.join(DIR, 'env.js'), '// build.mjs tarafından üretilir (dudak senkronu)\nwindow.ENV=' + JSON.stringify(env) + ';\n');

const shotsArg = process.argv.indexOf('--shots');
const browser = await chromium.launch();
const url = pathToFileURL(path.join(DIR, 'index.html')).href;
async function newPage() {
  const p = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await p.goto(url); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { await Promise.all([document.fonts.load('800 40px Baloo', 'şêîû'), document.fonts.load('600 40px Baloo', 'şêîû')]); });
  return p;
}

if (shotsArg > 0) {
  const p = await newPage();
  for (const t of process.argv[shotsArg + 1].split(',').map(Number)) {
    await p.evaluate(t => window.renderAt(t), t);
    await p.screenshot({ path: path.join(OUT, `shot-${String(t).padStart(5, '0')}.png`) });
  }
  await browser.close(); process.exit(0);
}

// 2) Kareler (paralel sayfalar)
const total = Math.round(TL.dur * FPS), WORKERS = 4;
let next = 0;
await Promise.all(Array.from({ length: WORKERS }, async () => {
  const p = await newPage();
  for (;;) {
    const f = next++; if (f >= total) break;
    await p.evaluate(t => window.renderAt(t), f / FPS);
    await p.screenshot({ path: path.join(TMP, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 95 });
    if (f % 300 === 0) console.log(`kare ${f}/${total}`);
  }
}));
await browser.close();

// 3) Ses: replikler + basit sentez efektler
const mix = new Float32Array(Math.ceil(TL.dur * SR));
const add = (pcm, at, gain = 1) => { const o = Math.floor(at * SR); for (let i = 0; i < pcm.length && o + i < mix.length; i++) mix[o + i] += pcm[i] * gain; };
for (const l of TL.lines) {
  const pcm = voices[l.id]; let sq = 0, pk = 0;
  for (const v of pcm) { sq += v * v; pk = Math.max(pk, Math.abs(v)); }
  const rms = Math.sqrt(sq / pcm.length);
  add(pcm, l.start, Math.min(0.1 / rms, 0.9 / pk)); // replikleri yaklaşık aynı seviyeye getir
}
const tone = (f0, f1, dur, vol, decay = 6, noise = 0) => { const n = Math.floor(dur * SR), o = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const u = i / n, f = f0 + (f1 - f0) * u; ph += 2 * Math.PI * f / SR; o[i] = (Math.sin(ph) * (1 - noise) + (Math.random() * 2 - 1) * noise) * vol * Math.exp(-decay * u) * Math.min(1, i / 200); } return o; };
const pop = at => add(tone(520, 980, .09, .16, 4), at);
add(tone(700, 1100, .16, .2, 3), .15);                                   // başlık
for (const c of TL.cards) { add(tone(660, 660, .5, .16, 5), c.a + .05); add(tone(990, 990, .7, .16, 4), c.a + .2); } // ara kart
for (const [a, b] of [[15.2, 16.4], [20.3, 21.5]]) for (let t = a; t < b; t += .075) add(tone(1900, 1500, .03, .12, 3), t); // saat ilerliyor
for (const b of TL.bubbles) pop(b.a);
add(tone(300, 900, .18, .2, 3), 25.55);                                   // uyanma
add(tone(400, 1400, .34, .12, 1.5, .7), 51.5);                            // terlik havada
add(tone(190, 70, .35, .7, 7), TL.hitAt); add(tone(900, 300, .12, .35, 6, .8), TL.hitAt); // ŞEQ!
TL.vocab.forEach((_, i) => add(tone(600 + i * 60, 900 + i * 60, .1, .14, 4), TL.endAt + .5 + i * .4));
for (let i = 0; i < mix.length; i++) mix[i] = Math.tanh(mix[i] * 1.15);
const wav = path.join(TMP, 'mix.f32');
fs.writeFileSync(wav, Buffer.from(mix.buffer));

// 4) Birleştir
const out = path.join(OUT, 'saet-hest.mp4');
const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', String(FPS), '-i', path.join(TMP, 'f%05d.jpg'),
  '-f', 'f32le', '-ar', String(SR), '-ac', '1', '-i', wav,
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-ac', '2',
  '-movflags', '+faststart', '-shortest', out], { stdio: 'inherit' });
fs.rmSync(TMP, { recursive: true, force: true });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log('bitti →', out);
