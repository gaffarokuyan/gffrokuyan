// Görsel yükleme, PDF'i görsele çevirme ve kırpma yardımcıları.
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.mjs";

const MAX_SIDE = 2400; // işleme için saklanan azami kenar

/** Bir dosyayı (görsel ya da PDF) canvas listesine çevirir. PDF'te her sayfa ayrı canvas. */
export async function fileToCanvases(file) {
  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
  if (isPdf) return pdfToCanvases(file);
  return [await imageToCanvas(file)];
}

async function imageToCanvas(file) {
  let bmp;
  try {
    bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    bmp = await new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => rej(new Error("Görsel açılamadı: " + file.name));
      img.src = URL.createObjectURL(file);
    });
  }
  const w = bmp.width, h = bmp.height;
  const s = Math.min(1, MAX_SIDE / Math.max(w, h));
  const c = document.createElement("canvas");
  c.width = Math.round(w * s);
  c.height = Math.round(h * s);
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(bmp, 0, 0, c.width, c.height);
  return c;
}

async function pdfToCanvases(file) {
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const out = [];
  const pages = Math.min(pdf.numPages, 4);
  for (let i = 1; i <= pages; i++) {
    const page = await pdf.getPage(i);
    const v1 = page.getViewport({ scale: 1 });
    const scale = MAX_SIDE / Math.max(v1.width, v1.height);
    const vp = page.getViewport({ scale });
    const c = document.createElement("canvas");
    c.width = Math.round(vp.width);
    c.height = Math.round(vp.height);
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    out.push(c);
  }
  return out;
}

/** crop: {x,y,w,h} 0..1 aralığında; yoksa tamamı. maxSide ile küçültür. */
export function cropCanvas(src, crop, maxSide = MAX_SIDE) {
  const r = crop || { x: 0, y: 0, w: 1, h: 1 };
  const sx = Math.round(r.x * src.width), sy = Math.round(r.y * src.height);
  const sw = Math.max(1, Math.round(r.w * src.width)), sh = Math.max(1, Math.round(r.h * src.height));
  const s = Math.min(1, maxSide / Math.max(sw, sh));
  const c = document.createElement("canvas");
  c.width = Math.round(sw * s);
  c.height = Math.round(sh * s);
  c.getContext("2d").drawImage(src, sx, sy, sw, sh, 0, 0, c.width, c.height);
  return c;
}

export function canvasToBase64Jpeg(canvas, quality = 0.88) {
  return canvas.toDataURL("image/jpeg", quality).split(",")[1];
}

export function thumbUrl(canvas, crop) {
  return cropCanvas(canvas, crop, 360).toDataURL("image/jpeg", 0.8);
}

/** Kırpma diyaloğu: kullanıcı dikdörtgen çizer, normalize edilmiş crop döner (veya null / undefined). */
export function openCropDialog(srcCanvas, current) {
  const dlg = document.getElementById("dlgCrop");
  const cv = document.getElementById("cropCanvas");
  const view = cropCanvas(srcCanvas, null, 1400);
  cv.width = view.width;
  cv.height = view.height;
  const ctx = cv.getContext("2d");
  let rect = current ? { ...current } : null;
  let start = null;

  const draw = () => {
    ctx.drawImage(view, 0, 0);
    if (!rect) return;
    const x = rect.x * cv.width, y = rect.y * cv.height, w = rect.w * cv.width, h = rect.h * cv.height;
    ctx.fillStyle = "rgba(0,0,0,.45)";
    ctx.fillRect(0, 0, cv.width, y);
    ctx.fillRect(0, y + h, cv.width, cv.height - y - h);
    ctx.fillRect(0, y, x, h);
    ctx.fillRect(x + w, y, cv.width - x - w, h);
    ctx.strokeStyle = "#22d17f";
    ctx.lineWidth = Math.max(3, cv.width / 300);
    ctx.strokeRect(x, y, w, h);
  };
  const pos = (e) => {
    const b = cv.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - b.left) / b.width)),
      y: Math.min(1, Math.max(0, (e.clientY - b.top) / b.height)),
    };
  };
  const down = (e) => { start = pos(e); cv.setPointerCapture(e.pointerId); };
  const move = (e) => {
    if (!start) return;
    const p = pos(e);
    rect = { x: Math.min(start.x, p.x), y: Math.min(start.y, p.y), w: Math.abs(p.x - start.x), h: Math.abs(p.y - start.y) };
    draw();
  };
  const up = () => { start = null; };
  cv.addEventListener("pointerdown", down);
  cv.addEventListener("pointermove", move);
  cv.addEventListener("pointerup", up);
  draw();
  dlg.showModal();

  return new Promise((resolve) => {
    const done = (val) => {
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      dlg.close();
      resolve(val);
    };
    document.getElementById("cropSave").onclick = () => done(rect && rect.w > 0.02 && rect.h > 0.02 ? rect : null);
    document.getElementById("cropClear").onclick = () => done(null);
    document.getElementById("cropCancel").onclick = () => done(undefined);
  });
}
