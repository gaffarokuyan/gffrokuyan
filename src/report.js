const CAT = {
  yazi: "Yazı", konum: "Konum", renk: "Renk", logo_sembol: "Logo / sembol",
  yon: "Yön", baski_kalitesi: "Baskı kalitesi", diger: "Diğer",
};
const ST = {
  UYGUN: { cls: "ok", label: "✓ Uygun" },
  HATALI: { cls: "bad", label: "✗ Hatalı" },
  BELIRSIZ: { cls: "warn", label: "? Kontrol et" },
};
const VERDICT = {
  UYGUN: { cls: "v-ok", title: "✓ Baskı forma uygun" },
  SORUNLU: { cls: "v-bad", title: "✗ Baskıda hata var" },
  KONTROL_GEREKLI: { cls: "v-warn", title: "? Elle kontrol gerekli" },
};

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function renderReport(r) {
  const v = VERDICT[r.genel_sonuc] || VERDICT.KONTROL_GEREKLI;
  const order = { HATALI: 0, BELIRSIZ: 1, UYGUN: 2 };
  const checks = [...(r.kontroller || [])].sort((a, b) => order[a.durum] - order[b.durum]);
  const n = (s) => checks.filter((c) => c.durum === s).length;

  const swatches = (cols) => (cols || []).map((c) =>
    `<span class="sw"><i style="background:rgb(${c.rgb.join(",")})"></i>${esc(c.name)} %${Math.round(c.share * 100)}</span>`).join("");

  return `
  <div class="verdict ${v.cls}">
    <h2>${v.title}</h2>
    <p>${esc(r.ozet)}</p>
  </div>
  <div class="counts">
    <span class="chip c-bad">${n("HATALI")} hatalı</span>
    <span class="chip c-warn">${n("BELIRSIZ")} kontrol et</span>
    <span class="chip c-ok">${n("UYGUN")} uygun</span>
  </div>
  ${r.formdaki_baski_renkleri ? `<p class="note"><b>Formdaki baskı rengi:</b> ${esc(r.formdaki_baski_renkleri)}</p>` : ""}
  ${r._meta?.mode === "local" ? `
    <div class="note"><b>Formdaki mürekkepler:</b><div class="swatches">${swatches(r._meta.formColors)}</div></div>
    ${(r._meta.boxColors || []).map((b, i) => `<div class="note"><b>Koli fotoğrafı ${i + 1}:</b><div class="swatches">${swatches(b)}</div></div>`).join("")}
  ` : ""}
  <ul class="checks" style="margin-top:12px">
    ${checks.map((c) => {
      const s = ST[c.durum] || ST.BELIRSIZ;
      return `<li class="check ${s.cls}">
        <div class="check-top"><span class="check-title">${esc(c.oge)}</span><span class="chip c-${s.cls}">${s.label}</span></div>
        <div class="cat">${esc(CAT[c.kategori] || c.kategori)}</div>
        <dl class="kv"><dt>Formda</dt><dd>${esc(c.beklenen)}</dd><dt>Kolide</dt><dd>${esc(c.bulunan)}</dd></dl>
        ${c.aciklama ? `<p class="note">${esc(c.aciklama)}</p>` : ""}
      </li>`;
    }).join("")}
  </ul>
  ${listBlock("Kolide eksik olanlar", r.eksik_ogeler)}
  ${listBlock("Kolide olup formda olmayanlar", r.fazladan_ogeler)}
  ${r.fotograf_kalitesi_notu ? `<div class="list-block"><h3>Fotoğraf notu</h3><p class="note">${esc(r.fotograf_kalitesi_notu)}</p></div>` : ""}
  <p class="meta-line">${esc(r._meta?.date || "")} · ${r._meta?.mode === "ai" ? `Yapay zekâ kontrolü (${esc(r._meta.model)})` : "Hızlı ön kontrol (cihaz üzerinde)"}</p>`;
}

function listBlock(title, items) {
  if (!items || !items.length) return "";
  return `<div class="list-block"><h3>${esc(title)}</h3><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`;
}

export function reportAsText(r) {
  const v = { UYGUN: "✅ UYGUN", SORUNLU: "❌ HATALI BASKI", KONTROL_GEREKLI: "⚠️ KONTROL GEREKLİ" }[r.genel_sonuc];
  const lines = [`KOLİ BASKI KONTROLÜ — ${v}`, r._meta?.date || "", "", r.ozet, ""];
  for (const c of r.kontroller.filter((k) => k.durum !== "UYGUN")) {
    lines.push(`${c.durum === "HATALI" ? "❌" : "⚠️"} ${c.oge}: formda "${c.beklenen}", kolide "${c.bulunan}". ${c.aciklama}`);
  }
  if (r.eksik_ogeler?.length) lines.push("", "Eksik: " + r.eksik_ogeler.join(", "));
  if (r.fazladan_ogeler?.length) lines.push("Formda olmayan: " + r.fazladan_ogeler.join(", "));
  return lines.join("\n");
}
