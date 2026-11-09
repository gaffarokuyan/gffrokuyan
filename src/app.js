import { fileToCanvases, thumbUrl, openCropDialog } from "./images.js";
import { runAiCheck, describeApiError, runSampleCheck, describeSampleError } from "./ai-check.js";
import { runLocalCheck } from "./local-check.js";
import { renderReport, reportAsText } from "./report.js";

const state = { form: [], general: [], detail: [] };
let lastReport = null;
// Claude içinde (artifact) açıldıysa: kullanıcının Claude hesabıyla kontrol, API anahtarı gerekmez.
const inClaude = typeof window.claude?.use === "function";
// Android uygulaması (APK) içinde mi?
const inApp = typeof window.AndroidApp?.shareText === "function";
if (inApp) {
  document.documentElement.classList.add("in-app");
  document.getElementById("btnShare").textContent = "📤 Raporu paylaş (WhatsApp)";
}
let sample = null;
if (inClaude) {
  document.documentElement.classList.add("in-claude");
  // Claude uygulaması doğrudan kamera açmayı engelleyebiliyor; sistem seçicisi "Fotoğraf çek" seçeneğini sunar.
  document.querySelectorAll("input[capture]").forEach((i) => i.removeAttribute("capture"));
  window.claude.use("sample").then((s) => { sample = s; updateModeHint(); }).catch(() => {});
}

const $ = (s) => document.querySelector(s);
const store = {
  get(k, d = "") { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

// ---------- Dosya ekleme ----------
async function addFiles(slot, files) {
  for (const file of files) {
    try {
      const canvases = await fileToCanvases(file);
      if (slot === "form") state.form = [];
      canvases.forEach((canvas, i) =>
        state[slot].push({ canvas, crop: null, name: canvases.length > 1 ? `${file.name} s.${i + 1}` : file.name || "fotoğraf" })
      );
    } catch (e) {
      toast(`"${file.name}" açılamadı: ${e.message}`);
    }
  }
  render();
}

document.querySelectorAll("input[type=file][data-slot]").forEach((inp) => {
  inp.addEventListener("change", async () => {
    const files = [...inp.files];
    inp.value = "";
    if (files.length) await addFiles(inp.dataset.slot, files);
  });
});

function render() {
  for (const slot of ["form", "general", "detail"]) {
    const list = document.querySelector(`[data-list="${slot}"]`);
    list.innerHTML = "";
    state[slot].forEach((item, idx) => {
      const el = document.createElement("div");
      el.className = "thumb";
      el.innerHTML = `
        ${item.crop ? '<span class="tag">alan seçili</span>' : ""}
        <img alt="${escapeHtml(item.name)}" src="${thumbUrl(item.canvas, item.crop)}">
        <div class="meta">
          <button data-act="crop">✂︎ Alan seç</button>
          <button data-act="del" aria-label="Sil">🗑</button>
        </div>`;
      el.querySelector('[data-act="crop"]').onclick = async () => {
        const r = await openCropDialog(item.canvas, item.crop);
        if (r !== undefined) { item.crop = r; render(); }
      };
      el.querySelector('[data-act="del"]').onclick = () => { state[slot].splice(idx, 1); render(); };
      list.appendChild(el);
    });
  }
  $("#btnRun").disabled = !(state.form.length && state.general.length);
  updateModeHint();
}

function mode() { return document.querySelector("input[name=mode]:checked").value; }

function updateModeHint() {
  const h = $("#modeHint");
  if (!state.form.length || !state.general.length) {
    h.textContent = "Önce baskı formunu ve en az bir koli fotoğrafını ekleyin.";
  } else if (mode() === "ai" && sample) {
    h.textContent = "Claude hesabınızla karşılaştırılacak: yazılar, konumlar, renkler ve semboller.";
  } else if (mode() === "ai" && !store.get("apiKey")) {
    h.innerHTML = 'Yapay zekâ kontrolü için <a href="#" id="lnkSettings">Ayarlar</a>\'dan API anahtarı girin ya da hızlı ön kontrolü seçin.';
    $("#lnkSettings").onclick = (e) => { e.preventDefault(); openSettings(); };
  } else {
    h.textContent = mode() === "ai"
      ? "Yazılar, konumlar, renkler ve semboller tek tek karşılaştırılacak."
      : "Cihaz üzerinde OCR ve renk analizi yapılır; kaba hataları yakalar.";
  }
}
document.querySelectorAll("input[name=mode]").forEach((r) => r.addEventListener("change", updateModeHint));

// ---------- Kontrol ----------
function setProgress(p, text) {
  $("#progress").hidden = false;
  $("#progress .fill").style.width = `${Math.round(p)}%`;
  $("#progress .progress-text").textContent = text;
}

$("#btnRun").onclick = async () => {
  const m = mode();
  if (m === "ai" && !sample && !store.get("apiKey")) { openSettings(); return; }
  $("#btnRun").disabled = true;
  $("#secReport").hidden = true;
  try {
    const args = { form: state.form, general: state.general, detail: state.detail, onProgress: setProgress };
    lastReport = m === "ai" && sample
      ? await runSampleCheck({ ...args, sample })
      : m === "ai"
      ? await runAiCheck({ ...args, apiKey: store.get("apiKey"), model: store.get("model", "claude-opus-5-5"), effort: store.get("effort", "high") })
      : await runLocalCheck(args);
    lastReport._meta.date = new Date().toLocaleString("tr-TR");
    $("#report").innerHTML = renderReport(lastReport);
    $("#secReport").hidden = false;
    $("#secReport").scrollIntoView({ behavior: "smooth" });
    $("#progress").hidden = true;
  } catch (e) {
    console.error(e);
    setProgress(0, "Hata: " + (m === "ai" ? (sample ? describeSampleError(e) : describeApiError(e)) : e.message));
  } finally {
    $("#btnRun").disabled = false;
  }
};

$("#btnPrint").onclick = () => window.print();
$("#btnShare").onclick = async () => {
  if (!lastReport) return;
  const text = reportAsText(lastReport);
  try {
    if (inApp) window.AndroidApp.shareText(text);
    else if (navigator.share && !inClaude) await navigator.share({ title: "Koli baskı kontrol raporu", text });
    else { await navigator.clipboard.writeText(text); toast("Rapor kopyalandı. WhatsApp'a yapıştırabilirsiniz."); }
  } catch { toast("Kopyalanamadı."); }
};
$("#btnReset").onclick = () => {
  state.form = []; state.general = []; state.detail = [];
  $("#secReport").hidden = true;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ---------- Ayarlar ----------
function openSettings() {
  $("#apiKey").value = store.get("apiKey");
  $("#model").value = store.get("model", "claude-opus-5-5");
  $("#effort").value = store.get("effort", "high");
  $("#dlgSettings").showModal();
}
$("#btnSettings").onclick = openSettings;
$("#dlgSettings").addEventListener("close", () => {
  if ($("#dlgSettings").returnValue !== "save") return;
  store.set("apiKey", $("#apiKey").value.trim());
  store.set("model", $("#model").value);
  store.set("effort", $("#effort").value);
  updateModeHint();
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ---------- WhatsApp vb. uygulamalardan paylaşılan dosyalar ----------
async function consumeSharedFiles() {
  const params = new URLSearchParams(location.search);
  if (!params.has("shared") || !("caches" in window)) return;
  try {
    const cache = await caches.open("shared-files");
    const keys = await cache.keys();
    const files = [];
    for (const req of keys) {
      const res = await cache.match(req);
      const blob = await res.blob();
      const name = decodeURIComponent(res.headers.get("x-file-name") || "paylasilan");
      files.push(new File([blob], name, { type: blob.type }));
      await cache.delete(req);
    }
    history.replaceState(null, "", location.pathname);
    await distributeShared(files);
  } catch (e) {
    console.warn("Paylaşılan dosyalar alınamadı", e);
  }
}

function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, 3500);
}

// APK: paylaşımla gelen dosyalar (MainActivity bu fonksiyonu çağırır)
window.__receiveShared = async (list) => {
  const files = [];
  for (const f of list) {
    try {
      const blob = await (await fetch(f.url)).blob();
      files.push(new File([blob], f.name, { type: f.type || blob.type }));
    } catch (e) { console.warn("Paylaşılan dosya okunamadı", e); }
  }
  await distributeShared(files);
};

async function distributeShared(files) {
  if (!files.length) return;
  // PDF veya (form yoksa) ilk görsel baskı formu olur; geri kalanlar koli fotoğrafı.
  const pdfs = files.filter((f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name));
  const imgs = files.filter((f) => !pdfs.includes(f));
  if (pdfs.length) await addFiles("form", pdfs.slice(0, 1));
  else if (!state.form.length && imgs.length) await addFiles("form", [imgs.shift()]);
  if (imgs.length) await addFiles("general", imgs);
  toast(`${files.length} dosya eklendi`);
}

if ("serviceWorker" in navigator && !inClaude && !inApp) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
render();
consumeSharedFiles();
