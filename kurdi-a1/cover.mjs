// Kapak görselleri üretir:  node cover.mjs  → out/kapak-<bölüm>.png (1080×1920)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const DIR = path.dirname(fileURLToPath(import.meta.url));
// Bu klasörde bölüm dosyası olmayan videolar için kapak verisi
const EXTRA = { 'saet-hest': { title: 'SAET HEŞT!', words: [['saet', 'saat'], ['heşt', 'sekiz'], ['sibeh', 'sabah'], ['êvar', 'akşam'], ['taştê', 'kahvaltı'], ['şîv', 'akşam yemeği'], ['sibê', 'yarın']] } };
const eps = fs.readdirSync(path.join(DIR, 'episodes'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
for (const name of [...Object.keys(EXTRA), ...eps]) {
  await page.goto(pathToFileURL(path.join(DIR, 'index.html')).href + '?ep=' + (EXTRA[name] ? eps[0] : name));
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([document.fonts.load('800 40px Baloo', 'şêîûİ'), document.fonts.load('600 40px Baloo', 'şêîû')]); });
  await page.evaluate(o => window.renderCover(o || {}), EXTRA[name] || null);
  await page.screenshot({ path: path.join(DIR, 'out', `kapak-${name}.png`) });
  console.log('kapak →', name);
}
await browser.close();
