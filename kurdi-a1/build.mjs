// Bir bölümü videoya çevirir:
//   node build.mjs <bölüm>                 → out/<bölüm>.mp4
//   node build.mjs <bölüm> --shots 3,13    → out/<bölüm>-shot-*.png (saniye; "f:l05:.5" = replik içi oran)
import { createRequire } from 'node:module';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const DIR = path.dirname(fileURLToPath(import.meta.url));
const EPN = process.argv[2];
const EPDIR = path.join(DIR, 'episodes', EPN || '');
if (!EPN || !fs.existsSync(path.join(EPDIR, 'episode.js'))) { console.error('kullanım: node build.mjs <bölüm>'); process.exit(1); }
const OUT = path.join(DIR, 'out');
fs.mkdirSync(OUT, { recursive: true });
const FPS = 30, SR = 44100;

// 1) Replik süreleri + dudak senkronu zarfı → timing.js
const voices = {}, env = {}, dur = {};
for (const f of fs.readdirSync(path.join(EPDIR, 'audio')).filter(f => f.endsWith('.mp3')).sort()) {
  const id = f.replace('.mp3', '');
  const buf = execFileSync('ffmpeg', ['-v', 'error', '-i', path.join(EPDIR, 'audio', f), '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
  const pcm = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
  voices[id] = pcm; dur[id] = +(pcm.length / SR).toFixed(2);
  const hop = SR / FPS, n = Math.ceil(pcm.length / hop), rms = [];
  for (let i = 0; i < n; i++) { let s = 0, c = 0; for (let j = Math.floor(i * hop); j < Math.min(pcm.length, (i + 1) * hop); j++) { s += pcm[j] * pcm[j]; c++; } rms.push(Math.sqrt(s / Math.max(1, c))); }
  const ref = [...rms].sort((a, b) => a - b)[Math.floor(n * .9)] || 1;
  env[id] = rms.map((v, i) => { const sm = (v + (rms[i - 1] ?? v) + (rms[i + 1] ?? v)) / 3; const e = +Math.min(1, Math.pow(sm / ref, .8)).toFixed(2); return e < .12 ? 0 : e; });
}
fs.writeFileSync(path.join(EPDIR, 'timing.js'), '// build.mjs tarafından üretilir\nwindow.DUR=' + JSON.stringify(dur) + ';\nwindow.ENV=' + JSON.stringify(env) + ';\n');

const browser = await chromium.launch();
const LAND = process.argv.includes('--land'), SUF = LAND ? '-yatay' : '';
const url = pathToFileURL(path.join(DIR, 'index.html')).href + '?ep=' + EPN + (LAND ? '&land=1' : '');
async function newPage() {
  const p = await browser.newPage({ viewport: LAND ? { width: 1920, height: 1080 } : { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => { console.error('SAYFA HATASI:', e.message); });
  await p.goto(url); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { await Promise.all([document.fonts.load('800 40px Baloo', 'şêîû'), document.fonts.load('600 40px Baloo', 'şêîû')]); });
  return p;
}
const page0 = await newPage();
const TL = await page0.evaluate(() => JSON.parse(JSON.stringify(window.TL)));
console.log(EPN, 'süre', TL.dur, 'sn');
if (LAND) { // yatay kapak (1920×1080 + 1280×720 küçük resim)
  const cp = await newPage(); await cp.evaluate(() => window.renderCover());
  const big = path.join(OUT, `kapak-${EPN}-yatay.png`); await cp.screenshot({ path: big }); await cp.close();
  spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', big, '-vf', 'scale=1280:720:flags=lanczos', path.join(OUT, `kapak-${EPN}-yatay-1280.png`)]);
}

const shotsArg = process.argv.indexOf('--shots');
if (shotsArg > 0) {
  let k = 0;
  for (const a of process.argv[shotsArg + 1].split(',')) {
    let t = Number(a);
    if (a.startsWith('f:')) { const [, id, f] = a.split(':'); t = await page0.evaluate(([id, f]) => window.H.T(id, f), [id, Number(f)]); }
    if (a === 'end') t = TL.dur - .3;
    await page0.evaluate(t => window.renderAt(t), t);
    await page0.screenshot({ path: path.join(OUT, `${EPN}${SUF}-shot-${String(k++).padStart(2, '0')}.png`) });
  }
  await browser.close(); process.exit(0);
}

// 2) Kareler
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'kurdi-a1-'));
// --from <sn>: sadece o saniyeden sonrasını render et (önizleme)
const fromArg = process.argv.indexOf('--from'), FROM = fromArg > 0 ? Number(process.argv[fromArg + 1]) : 0, F0 = Math.round(FROM * FPS);
const total = Math.round(TL.dur * FPS);
let next = F0;
await Promise.all([page0, await newPage(), await newPage(), await newPage()].map(async p => {
  for (;;) {
    const f = next++; if (f >= total) break;
    await p.evaluate(t => window.renderAt(t), f / FPS);
    await p.screenshot({ path: path.join(TMP, `f${String(f - F0).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 95 });
  }
}));
await browser.close();

// 3) Ses: replikler + sentez efektler
const mix = new Float32Array(Math.ceil(TL.dur * SR));
const add = (pcm, at, gain = 1) => { const o = Math.floor(at * SR); for (let i = 0; i < pcm.length && o + i < mix.length; i++) if (o + i >= 0) mix[o + i] += pcm[i] * gain; };
for (const l of TL.lines) {
  const pcm = voices[l.id]; let sq = 0, pk = 0;
  for (const v of pcm) { sq += v * v; pk = Math.max(pk, Math.abs(v)); }
  add(pcm, l.start, Math.min(0.1 / Math.sqrt(sq / pcm.length), 0.9 / pk));
}
const tone = (f0, f1, d, vol, decay = 6, noise = 0) => { const n = Math.floor(d * SR), o = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const u = i / n; ph += 2 * Math.PI * (f0 + (f1 - f0) * u) / SR; o[i] = (Math.sin(ph) * (1 - noise) + (Math.random() * 2 - 1) * noise) * vol * Math.exp(-decay * u) * Math.min(1, i / 200); } return o; };
const SFX = {
  title: e => add(tone(700, 1100, .16, .2, 3), e.at),
  chime: e => { add(tone(660, 660, .5, .16, 5), e.at); add(tone(990, 990, .7, .16, 4), e.at + .15); },
  pop: e => add(tone(520, 980, .09, .16, 4), e.at),
  row: e => add(tone(600 + e.i * 60, 900 + e.i * 60, .1, .14, 4), e.at),
  rise: e => add(tone(300, 900, .18, .2, 3), e.at),
  whoosh: e => add(tone(400, 1400, .3, .12, 1.5, .7), e.at),
  bonk: e => { add(tone(190, 70, .35, .7, 7), e.at); add(tone(900, 300, .12, .35, 6, .8), e.at); },
  boing: e => add(tone(260, 620, .22, .22, 2.5), e.at),
  splash: e => { add(tone(500, 180, .3, .3, 5, .85), e.at); add(tone(900, 1500, .08, .12, 4), e.at + .03); },
  cross: e => add(tone(330, 200, .16, .22, 5, .25), e.at),
  ding: e => { add(tone(1320, 1320, .5, .16, 6), e.at); add(tone(1760, 1760, .6, .1, 5), e.at + .08); },
  sweep: e => add(tone(700, 500, .28, .1, 2, .95), e.at),
  thud: e => add(tone(120, 50, .3, .6, 8), e.at),
  dum: e => { add(tone(95, 55, .28, .7, 7), e.at); add(tone(160, 80, .08, .2, 9, .5), e.at); },
  tek: e => add(tone(1800, 900, .05, .16, 9, .85), e.at),
  // arka plan ses dokusu: e.f taban frekans, e.d süre, e.v ses; yumuşak giriş/çıkış
  pad: e => { const n = Math.floor(e.d * SR), o = new Float32Array(n), fs = [e.f, e.f * 1.5, e.f * 2.005]; for (let i = 0; i < n; i++) { const tt = i / SR, env = Math.min(1, tt / 1.2) * Math.min(1, (e.d - tt) / 1.2); let v = 0; for (const f of fs) v += Math.sin(2 * Math.PI * f * tt + Math.sin(tt * .7) * .5); o[i] = v / 3 * (e.v || .03) * env; } add(o, e.at); },
  heart: e => { add(tone(70, 45, .16, .6, 9), e.at); add(tone(65, 42, .14, .45, 9), e.at + .22); },
  stamp: e => { add(tone(140, 50, .3, .8, 8), e.at); add(tone(600, 200, .1, .3, 7, .9), e.at); },
  cricket: e => { for (let k = 0; k < 3; k++) add(tone(4200, 4400, .045, .07, 3), e.at + k * .07); },
  wind: e => add(tone(260, 140, 1.6, .07, .5, .97), e.at),
  crack: e => { add(tone(1800, 600, .12, .25, 6, .9), e.at); add(tone(2600, 2600, .25, .08, 5), e.at + .05); },
  shatter: e => { add(tone(900, 300, .3, .35, 6, .9), e.at); for (let k = 0; k < 6; k++) add(tone(2000 + k * 350, 1500 + k * 300, .15, .1, 6, .4), e.at + k * .04); },
};
for (const e of TL.sfx) (SFX[e.type] || (() => console.warn('bilinmeyen efekt', e.type)))(e);
for (let i = 0; i < mix.length; i++) mix[i] = Math.tanh(mix[i] * 1.15);
const raw = path.join(TMP, 'mix.f32');
fs.writeFileSync(raw, Buffer.from(mix.slice(Math.floor(FROM * SR)).buffer));

// 4) Birleştir
const out = path.join(OUT, EPN + SUF + (FROM ? '-son' : '') + '.mp4');
const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', String(FPS), '-i', path.join(TMP, 'f%05d.jpg'),
  '-f', 'f32le', '-ar', String(SR), '-ac', '1', '-i', raw,
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-ac', '2',
  '-movflags', '+faststart', '-shortest', out], { stdio: 'inherit' });
fs.rmSync(TMP, { recursive: true, force: true });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log('bitti →', out);
