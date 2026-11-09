// İnternetsiz hızlı ön kontrol: OCR (Tesseract) + mürekkep rengi analizi + göreli konum.
// Yapay zekâ kadar kapsamlı değildir; kaba hataları (eksik yazı, yanlış renk, yer değiştirmiş yazı) yakalamak içindir.
import { cropCanvas } from "./images.js";

const OCR_SIDE = 2000;
let workerPromise = null;

function getWorker() {
  if (!workerPromise) {
    workerPromise = window.Tesseract.createWorker(["tur", "eng"], 1, {
      workerPath: new URL("vendor/worker.min.js", location.href).href,
      corePath: new URL("vendor/core/", location.href).href,
      langPath: new URL("vendor/lang", location.href).href,
      gzip: true,
    });
  }
  return workerPromise;
}

const COLOR_WORDS = ["SİYAH", "YEŞİL", "KIRMIZI", "MAVİ", "SARI", "TURUNCU", "MOR", "PEMBE", "LACİVERT", "BEYAZ", "GRİ", "KAHVERENGİ", "BORDO", "TURKUAZ"];

export const norm = (s) =>
  s.toLocaleUpperCase("tr").replace(/[^0-9A-ZÇĞİÖŞÜ]/g, "");
// OCR Türkçe işaretleri sık karıştırır; eşleştirmede işaretsiz hali kullanılır.
export const fold = (s) => s.replace(/İ/g, "I").replace(/Ş/g, "S").replace(/Ğ/g, "G").replace(/Ü/g, "U").replace(/Ö/g, "O").replace(/Ç/g, "C");

function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

function upscale(canvas, minSide = 1800) {
  const k = minSide / Math.max(canvas.width, canvas.height);
  if (k <= 1.05) return canvas;
  const c = document.createElement("canvas");
  c.width = Math.round(canvas.width * k);
  c.height = Math.round(canvas.height * k);
  const ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(canvas, 0, 0, c.width, c.height);
  return c;
}

async function ocrWords(canvas, offset = { x: 0, y: 0, w: 1, h: 1 }) {
  const worker = await getWorker();
  canvas = upscale(canvas);
  const { data } = await worker.recognize(canvas);
  const W = canvas.width, H = canvas.height;
  return (data.words || [])
    .map((w) => ({
      raw: w.text,
      text: norm(w.text),
      key: fold(norm(w.text)),
      conf: w.confidence,
      // tam görsele göre normalize merkez
      cx: offset.x + (((w.bbox.x0 + w.bbox.x1) / 2) / W) * offset.w,
      cy: offset.y + (((w.bbox.y0 + w.bbox.y1) / 2) / H) * offset.h,
    }))
    .filter((w) => w.text.length >= 2 && w.conf >= 45);
}

/** Mürekkep renklerini bulur: zemin rengini (medyan) çıkarıp kalan pikselleri renk adlarına göre sınıflar. */
export function inkColors(canvas) {
  const c = cropCanvas(canvas, null, 500);
  const { data } = c.getContext("2d").getImageData(0, 0, c.width, c.height);
  const rs = [], gs = [], bs = [];
  for (let i = 0; i < data.length; i += 16) { rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]); }
  const med = (a) => a.sort((x, y) => x - y)[a.length >> 1];
  const bg = [med(rs), med(gs), med(bs)];
  const bgLum = (bg[0] + bg[1] + bg[2]) / 3;

  const buckets = {};
  let ink = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const d = Math.hypot(r - bg[0], g - bg[1], b - bg[2]);
    if (d < 70) continue;
    const [h, s, v] = hsv(r, g, b);
    let name;
    if (v < 0.3 || (s < 0.3 && v < 0.5)) name = "Siyah";
    else if (s < 0.35) continue; // gri / parlama / gölge
    else if (h < 15 || h >= 340) name = "Kırmızı";
    else if (h < 45) {
      // Kraft zemine yakın kahverengi gölgeleri atla
      if (Math.abs(v * 255 - bgLum) < 60 && s < 0.6) continue;
      name = "Turuncu/Kahve";
    } else if (h < 70) name = "Sarı";
    else if (h < 165) name = "Yeşil";
    else if (h < 200) name = "Turkuaz";
    else if (h < 260) name = "Mavi";
    else name = "Mor/Pembe";
    const k = (buckets[name] ||= { n: 0, r: 0, g: 0, b: 0 });
    k.n++; k.r += r; k.g += g; k.b += b;
    ink++;
  }
  const out = Object.entries(buckets)
    .map(([name, k]) => ({ name, share: k.n / Math.max(1, ink), rgb: [k.r / k.n, k.g / k.n, k.b / k.n].map(Math.round) }))
    .filter((x) => x.share >= (x.name === "Siyah" ? 0.03 : 0.008))
    .sort((a, b) => b.share - a.share);
  return { bg, colors: out, inkRatio: ink / (data.length / 4) };
}

function hsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, max ? d / max : 0, max];
}

const inside = (w, r) => !r || (w.cx >= r.x && w.cx <= r.x + r.w && w.cy >= r.y && w.cy <= r.y + r.h);

/** Aynı kelime birden fazla geçiyorsa soldan sağa, yukarıdan aşağıya sırayla eşleştirir. */
function sortPos(a, b) { return Math.abs(a.cy - b.cy) > 0.08 ? a.cy - b.cy : a.cx - b.cx; }

function normalizeBox(points) {
  const xs = points.map((p) => p.cx), ys = points.map((p) => p.cy);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  return (p) => ({ x: (p.cx - x0) / Math.max(1e-6, x1 - x0), y: (p.cy - y0) / Math.max(1e-6, y1 - y0) });
}

export async function runLocalCheck({ form, general, detail, onProgress }) {
  const kontroller = [];
  const eksik = [], fazla = [];
  const step = (p, t) => onProgress?.(p, t);

  // 1) Form OCR (tam sayfa: baskı rengi alanını okumak için), sonra seçili alana filtrele
  step(5, "OCR motoru yükleniyor…");
  await getWorker();
  const f = form[0];
  step(15, "Baskı formu okunuyor…");
  const formAll = await ocrWords(cropCanvas(f.canvas, null, OCR_SIDE));
  const formKeys = new Set(formAll.map((w) => w.key));
  const expectedColors = COLOR_WORDS.filter((c) => formKeys.has(fold(norm(c))));
  let formWords = formAll.filter((w) => inside(w, f.crop));
  formWords = formWords.filter((w) => !/^\d*(MM)?$/.test(w.text));

  // 2) Koli OCR
  const boxWordsByPhoto = [];
  const photos = [...general.map((g) => ({ ...g, kind: "genel" })), ...detail.map((d) => ({ ...d, kind: "yakın" }))];
  for (let i = 0; i < photos.length; i++) {
    step(25 + (i / photos.length) * 50, `Koli fotoğrafı okunuyor (${i + 1}/${photos.length})…`);
    const p = photos[i];
    const off = p.crop || { x: 0, y: 0, w: 1, h: 1 };
    boxWordsByPhoto.push({ kind: p.kind, words: await ocrWords(cropCanvas(p.canvas, p.crop, OCR_SIDE), off) });
  }
  const allBox = boxWordsByPhoto.flatMap((b) => b.words);
  const generalWords = boxWordsByPhoto.filter((b) => b.kind === "genel").flatMap((b) => b.words);

  step(80, "Yazılar karşılaştırılıyor…");
  // 3) Yazı kontrolü
  const used = new Set();
  const pairs = [];
  const groups = {};
  formWords.forEach((w) => (groups[w.key] ||= []).push(w));
  for (const [text, inst] of Object.entries(groups)) {
    inst.sort(sortPos);
    const tol = text.length >= 7 ? 2 : text.length >= 4 ? 1 : 0;
    const exact = allBox.filter((b) => b.key === text);
    const fuzzy = exact.length ? [] : allBox.filter((b) => lev(b.key, text) <= tol);
    const raw = inst[0].raw;
    if (exact.length) {
      exact.forEach((b) => used.add(b));
      const genExact = generalWords.filter((b) => b.key === text).sort(sortPos);
      inst.forEach((fw, i) => { if (genExact[i]) pairs.push({ text: raw, f: fw, b: genExact[i] }); });
      const enough = exact.length >= inst.length || genExact.length >= inst.length;
      kontroller.push({
        kategori: "yazi", oge: raw, beklenen: `${inst.length} adet "${raw}"`,
        bulunan: `${Math.max(genExact.length, Math.min(exact.length, inst.length))} adet bulundu`,
        durum: enough ? "UYGUN" : "BELIRSIZ",
        aciklama: enough ? "Yazı kolide okunuyor." : "Formdakinden az sayıda okundu; diğer yüzlerin yakın çekimini ekleyin.",
      });
    } else if (fuzzy.length) {
      fuzzy.forEach((b) => used.add(b));
      kontroller.push({
        kategori: "yazi", oge: raw, beklenen: raw, bulunan: fuzzy[0].raw, durum: "HATALI",
        aciklama: "Kolide benzer ama farklı yazılmış bir kelime okundu. Yazım hatası olabilir; yakından kontrol edin.",
      });
    } else {
      eksik.push(raw);
      kontroller.push({
        kategori: "yazi", oge: raw, beklenen: raw, bulunan: "okunamadı", durum: "BELIRSIZ",
        aciklama: "Kolide bulunamadı. Eksik basılmış olabilir ya da fotoğrafta okunmuyor — yakın çekim ekleyin.",
      });
    }
  }
  allBox.filter((b) => !used.has(b) && b.text.length >= 2 && b.conf >= 70)
    .forEach((b) => { if (!fazla.includes(b.raw)) fazla.push(b.raw); });

  // 4) Göreli konum kontrolü
  if (pairs.length >= 3) {
    const nf = normalizeBox(pairs.map((p) => p.f));
    const nb = normalizeBox(pairs.map((p) => p.b));
    for (const p of pairs) {
      const a = nf(p.f), b = nb(p.b);
      const dx = b.x - a.x, dy = b.y - a.y;
      const off = Math.hypot(dx, dy) > 0.2;
      const dir = (v, pos, neg) => (Math.abs(v) < 0.1 ? "" : v > 0 ? pos : neg);
      kontroller.push({
        kategori: "konum", oge: p.text,
        beklenen: posLabel(a), bulunan: posLabel(b),
        durum: off ? "HATALI" : "UYGUN",
        aciklama: off ? `Formdaki yerinden kaymış görünüyor (${[dir(dx, "sağa", "sola"), dir(dy, "aşağı", "yukarı")].filter(Boolean).join(", ")}).` : "Diğer yazılara göre konumu formla uyumlu.",
      });
    }
  } else {
    kontroller.push({
      kategori: "konum", oge: "Yazı yerleşimi", beklenen: "-", bulunan: "-", durum: "BELIRSIZ",
      aciklama: "Konum karşılaştırması için genel fotoğrafta en az 3 eşleşen yazı gerekli.",
    });
  }

  // 5) Renk kontrolü
  step(90, "Renkler karşılaştırılıyor…");
  const fc = inkColors(cropCanvas(f.canvas, f.crop, 1200));
  const bcs = general.map((g) => inkColors(cropCanvas(g.canvas, g.crop, 1200)));
  const boxColorNames = new Set(bcs.flatMap((b) => b.colors.map((c) => c.name)));
  const formColorNames = new Set(fc.colors.map((c) => c.name));
  for (const name of formColorNames) {
    const ok = boxColorNames.has(name);
    const small = (fc.colors.find((c) => c.name === name)?.share ?? 0) < 0.08;
    kontroller.push({
      kategori: "renk", oge: `${name} mürekkep`, beklenen: "Formda var", bulunan: ok ? "Kolide var" : "Kolide bulunamadı",
      durum: ok ? "UYGUN" : small ? "BELIRSIZ" : "HATALI",
      aciklama: ok ? "Renk kolide de kullanılmış." : small
        ? "Bu renk formda küçük bir alanda (ör. logo detayı). Fotoğrafta seçilemedi; o bölgeyi yakından çekin."
        : "Formdaki bu renk kolide görünmüyor. Mürekkep eksik ya da yanlış olabilir.",
      _swatch: fc.colors.find((c) => c.name === name)?.rgb,
    });
  }
  for (const name of boxColorNames) {
    if (!formColorNames.has(name) && name !== "Turuncu/Kahve") {
      kontroller.push({
        kategori: "renk", oge: `${name} mürekkep`, beklenen: "Formda yok", bulunan: "Kolide var", durum: "BELIRSIZ",
        aciklama: "Kolide formda olmayan bir renk görüldü (ışık/gölge kaynaklı olabilir).",
      });
    }
  }

  const bad = kontroller.filter((k) => k.durum === "HATALI").length;
  const unk = kontroller.filter((k) => k.durum === "BELIRSIZ").length;
  step(100, "Tamamlandı");
  return {
    genel_sonuc: bad ? "SORUNLU" : unk ? "KONTROL_GEREKLI" : "UYGUN",
    ozet: `Hızlı ön kontrol: ${formWords.length} yazı parçası formdan okundu, ${kontroller.filter((k) => k.kategori === "yazi" && k.durum === "UYGUN").length} tanesi kolide doğrulandı. ` +
      (bad ? `${bad} olası hata bulundu.` : "Belirgin hata bulunamadı.") +
      " Kesin sonuç için yapay zekâ kontrolünü kullanın.",
    formdaki_baski_renkleri: expectedColors.length ? expectedColors.join(" / ") : "Formdan okunamadı",
    kontroller,
    eksik_ogeler: eksik,
    fazladan_ogeler: fazla.slice(0, 20),
    fotograf_kalitesi_notu: generalWords.length < 3 ? "Genel fotoğrafta çok az yazı okunabildi. Daha yakından, düz açıyla ve iyi ışıkta çekin." : "",
    _meta: { mode: "local", formColors: fc.colors, boxColors: bcs.map((b) => b.colors) },
  };
}

function posLabel(p) {
  const v = p.y < 0.33 ? "üst" : p.y > 0.66 ? "alt" : "orta";
  const h = p.x < 0.33 ? "sol" : p.x > 0.66 ? "sağ" : "orta";
  return v === "orta" && h === "orta" ? "orta" : `${v}-${h}`;
}
