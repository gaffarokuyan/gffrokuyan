// Claude ile baskı formu ↔ basılan koli karşılaştırması.
import Anthropic from "@anthropic-ai/sdk";
import { cropCanvas, canvasToBase64Jpeg } from "./images.js";

const AI_MAX_SIDE = 1568;

const STATUS = ["UYGUN", "HATALI", "BELIRSIZ"];

export const REPORT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["genel_sonuc", "ozet", "formdaki_baski_renkleri", "kontroller", "eksik_ogeler", "fazladan_ogeler", "fotograf_kalitesi_notu"],
  properties: {
    genel_sonuc: { type: "string", enum: ["UYGUN", "SORUNLU", "KONTROL_GEREKLI"] },
    ozet: { type: "string" },
    formdaki_baski_renkleri: { type: "string" },
    kontroller: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["kategori", "oge", "beklenen", "bulunan", "durum", "aciklama"],
        properties: {
          kategori: { type: "string", enum: ["yazi", "konum", "renk", "logo_sembol", "yon", "baski_kalitesi", "diger"] },
          oge: { type: "string" },
          beklenen: { type: "string" },
          bulunan: { type: "string" },
          durum: { type: "string", enum: STATUS },
          aciklama: { type: "string" },
        },
      },
    },
    eksik_ogeler: { type: "array", items: { type: "string" } },
    fazladan_ogeler: { type: "array", items: { type: "string" } },
    fotograf_kalitesi_notu: { type: "string" },
  },
};

const SYSTEM = `Sen oluklu mukavva koli matbaasında çalışan deneyimli bir kalite kontrol uzmanısın.
Görevin: müşterinin onayladığı BASKI FORMU (imalat formu / baskı onay görseli) ile makineden çıkan GERÇEK KOLİNİN fotoğraflarını karşılaştırıp baskı hatalarını bulmak.

Neye bakacaksın:
1. YAZI: Formdaki koli üzerine basılacak her yazı kolide var mı, harfi harfine aynı mı (Türkçe karakterler İ/I, Ş/S, Ğ/G, Ü/U, Ö/O, Ç/C dahil)? Eksik, fazla, yanlış harf, yanlış rakam var mı?
2. KONUM: Her öğe doğru panelde (yüzde) mi? Panel içinde üstte/ortada/altta, solda/sağda aynı yerde mi? Öğelerin birbirine göre sırası ve hizası aynı mı? Örn. formda üst kapakta olan bir yazı kolide alt kapakta olmamalı.
3. RENK: Formun "BASKI RENGİ" alanında yazan renkler ve görseldeki renkler kolide doğru öğelerde kullanılmış mı (örn. logo yaprağı yeşil, yazılar siyah)? Bir renk eksik ya da yanlış öğede mi?
4. LOGO / SEMBOL: Logolar ve uyarı sembolleri (bu taraf yukarı, kırılır, nemden koruyun vb.) var mı, sayıları ve sıraları aynı mı?
5. YÖN: Ters ya da yan basılmış öğe var mı?
6. BASKI KALİTESİ: Okunamayan, silik, bulaşmış, kaymış, çift basılmış yerler var mı?

Önemli kurallar:
- Formun üstündeki teknik tablo (firma logosu, müşteri, ürün adı, ebat, kalite, tarih, onay kutuları), alt bilgi şeridi (klişeci firma bilgileri) ve ölçü etiketleri (ör. "460 mm") koliye BASILMAZ; bunları kolide arama. Sadece koli açınım çizimindeki baskı öğelerini karşılaştır. Teknik tablodaki bilgileri (ebat, baskı rengi) sadece referans olarak kullan.
- Formdaki beyaz zemin ile kolinin kraft (kahverengi) zemini arasındaki fark normaldir, hata sayma.
- Kolide olup formda olmayan öğeleri (ör. dalga/kalite kodu "C3" gibi) "fazladan_ogeler" listesine yaz ve kontrollerde BELIRSIZ olarak işaretle; bunun bilinçli bir ekleme olup olmadığına operatör karar verir.
- Fotoğraf açısı, perspektif ve ışık farklarını tolere et. Fotoğraftan emin olamadığın şeylerde tahmin yürütme: BELIRSIZ de ve hangi yakın çekimin gerektiğini açıklamada söyle.
- Yakın çekim fotoğrafları küçük yazıları doğrulamak içindir; genel fotoğrafla birlikte değerlendir.
- Her baskı öğesi için en az bir kontrol satırı yaz (aynı öğe birden fazla panelde varsa her biri için ayrı). Konum ve renk kontrollerini ayrı satırlar olarak ekle.
- genel_sonuc: Hiç HATALI yoksa ve BELIRSIZ önemsizse UYGUN; en az bir HATALI varsa SORUNLU; HATALI yok ama önemli BELIRSIZ varsa KONTROL_GEREKLI.
- Tüm metinleri kısa ve net Türkçe yaz; operatör telefondan okuyacak.`;

export async function runAiCheck({ apiKey, model, effort, form, general, detail, onProgress }) {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 2 });

  onProgress?.(10, "Görseller hazırlanıyor…");
  const content = [];
  const addImage = (label, item) => {
    content.push({ type: "text", text: label });
    content.push({
      type: "image",
      source: { type: "base64", media_type: "image/jpeg", data: canvasToBase64Jpeg(cropCanvas(item.canvas, item.crop, AI_MAX_SIDE)) },
    });
  };

  // Formun tamamı (teknik tablo bilgileri için) + seçilmiş alan varsa ayrıca yakın görünüm
  form.forEach((f, i) => {
    addImage(`BASKI FORMU${form.length > 1 ? ` — sayfa ${i + 1}` : ""} (referans, tamamı):`, { canvas: f.canvas, crop: null });
    if (f.crop) addImage(`BASKI FORMU — operatörün seçtiği koli çizimi alanı (yakın görünüm):`, f);
  });
  general.forEach((g, i) => addImage(`BASILAN KOLİ — genel fotoğraf ${i + 1}:`, g));
  detail.forEach((d, i) => addImage(`BASILAN KOLİ — küçük yazılar için yakın çekim ${i + 1}:`, d));

  content.push({
    type: "text",
    text: "Baskı formu ile basılan koliyi yukarıdaki kurallara göre karşılaştır ve raporu JSON şemasına uygun ver.",
  });

  onProgress?.(30, "Yapay zekâ karşılaştırıyor… (1-2 dakika sürebilir)");

  const stream = client.beta.messages.stream({
    model,
    max_tokens: 32000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    thinking: { type: "adaptive" },
    output_config: {
      effort,
      format: { type: "json_schema", schema: REPORT_SCHEMA },
    },
    system: SYSTEM,
    messages: [{ role: "user", content }],
  });

  let chars = 0;
  stream.on("text", (t) => {
    chars += t.length;
    onProgress?.(Math.min(95, 40 + chars / 80), "Rapor yazılıyor…");
  });

  const msg = await stream.finalMessage();

  if (msg.stop_reason === "refusal") {
    throw new Error("Model bu isteği yanıtlamadı" + (msg.stop_details?.explanation ? `: ${msg.stop_details.explanation}` : "."));
  }
  if (msg.stop_reason === "max_tokens") {
    throw new Error("Rapor çok uzun oldu ve yarıda kesildi. Daha az fotoğrafla tekrar deneyin.");
  }
  const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  let report;
  try {
    report = JSON.parse(text);
  } catch {
    throw new Error("Yapay zekâ yanıtı okunamadı. Lütfen tekrar deneyin.");
  }
  report._meta = { mode: "ai", model: msg.model, usage: msg.usage };
  onProgress?.(100, "Tamamlandı");
  return report;
}

export function describeApiError(err) {
  const s = err?.status;
  if (s === 401) return "API anahtarı geçersiz. Ayarlar'dan kontrol edin.";
  if (s === 403) return "Bu API anahtarının bu modele erişimi yok.";
  if (s === 429) return "Çok fazla istek / kredi sınırı. Biraz bekleyip tekrar deneyin.";
  if (s === 413) return "Fotoğraflar çok büyük. Daha az fotoğrafla deneyin.";
  if (s >= 500) return "Anthropic sunucusunda geçici sorun. Tekrar deneyin.";
  if (err?.name === "APIConnectionError" || /fetch|network/i.test(String(err?.message))) return "İnternet bağlantısı yok ya da kesildi.";
  return err?.message || String(err);
}

// ---- Claude içinde (artifact) çalışırken: API anahtarı yerine kullanıcının kendi Claude hesabı ----
const canvasToBlob = (c) => new Promise((res) => c.toBlob(res, "image/jpeg", 0.9));

export async function runSampleCheck({ sample, form, general, detail, onProgress }) {
  onProgress?.(10, "Görseller hazırlanıyor…");
  const limits = await sample.limits().catch(() => null);
  const max = limits?.images?.maxCount ?? 8;

  const items = [];
  form.forEach((f, i) => {
    if (f.crop) items.push({ label: `BASKI FORMU — koli çizimi alanı (yakın görünüm)${form.length > 1 ? `, sayfa ${i + 1}` : ""}`, canvas: f.canvas, crop: f.crop, prio: 0 });
    items.push({ label: `BASKI FORMU — sayfanın tamamı (teknik tablo için)${form.length > 1 ? `, sayfa ${i + 1}` : ""}`, canvas: f.canvas, crop: null, prio: f.crop ? 3 : 0 });
  });
  general.forEach((g, i) => items.push({ label: `BASILAN KOLİ — genel fotoğraf ${i + 1}`, ...g, prio: 1 }));
  detail.forEach((d, i) => items.push({ label: `BASILAN KOLİ — küçük yazılar için yakın çekim ${i + 1}`, ...d, prio: 2 }));

  // Sınırı aşarsa önce formun tam sayfa görüntüsü, sonra son yakın çekimler çıkarılır.
  let chosen = items;
  if (items.length > max) {
    const order = [...items].sort((a, b) => a.prio - b.prio).slice(0, max);
    chosen = items.filter((x) => order.includes(x));
  }
  const images = [];
  for (const it of chosen) images.push(await canvasToBlob(cropCanvas(it.canvas, it.crop, AI_MAX_SIDE)));

  const prompt = `${SYSTEM}

Ekli görseller bu sırayla:
${chosen.map((it, i) => `${i + 1}. ${it.label}`).join("\n")}
${chosen.length < items.length ? `(Sınır nedeniyle ${items.length - chosen.length} görsel gönderilemedi.)\n` : ""}
Baskı formu ile basılan koliyi bu kurallara göre karşılaştır.
Yalnızca şu yapıda TEK bir JSON nesnesi döndür, başka metin yazma:
{"genel_sonuc":"UYGUN|SORUNLU|KONTROL_GEREKLI","ozet":"...","formdaki_baski_renkleri":"...","kontroller":[{"kategori":"yazi|konum|renk|logo_sembol|yon|baski_kalitesi|diger","oge":"...","beklenen":"...","bulunan":"...","durum":"UYGUN|HATALI|BELIRSIZ","aciklama":"..."}],"eksik_ogeler":["..."],"fazladan_ogeler":["..."],"fotograf_kalitesi_notu":"..."}`;

  onProgress?.(30, "Claude karşılaştırıyor… (1-2 dakika sürebilir)");
  let chars = 0;
  const report = await sample.json(prompt, {
    images,
    modelTier: "complex",
    onText: ({ text }) => { chars = text.length; onProgress?.(Math.min(95, 40 + chars / 80), "Rapor yazılıyor…"); },
  });
  if (!report || !Array.isArray(report.kontroller)) throw new Error("Claude'un yanıtı okunamadı. Tekrar deneyin.");
  for (const k of ["eksik_ogeler", "fazladan_ogeler"]) if (!Array.isArray(report[k])) report[k] = [];
  report.kontroller = report.kontroller.map((c) => ({ ...c, durum: STATUS.includes(c.durum) ? c.durum : "BELIRSIZ" }));
  if (!["UYGUN", "SORUNLU", "KONTROL_GEREKLI"].includes(report.genel_sonuc)) report.genel_sonuc = "KONTROL_GEREKLI";
  report._meta = { mode: "ai", model: "Claude hesabınız" };
  onProgress?.(100, "Tamamlandı");
  return report;
}

export function describeSampleError(e) {
  switch (e?.code) {
    case "not_granted": return "Claude kullanımına izin verilmedi. Sayfayı yenileyip izin verin ya da hızlı ön kontrolü kullanın.";
    case "sampling_disabled": return "Bu hesapta Claude kullanılamıyor.";
    case "rate_limited": return "Kullanım sınırına ulaşıldı. Biraz sonra tekrar deneyin.";
    case "image_rejected": return "Bir fotoğraf kabul edilmedi (çok büyük ya da bozuk). Başka fotoğraf deneyin.";
    case "images_unavailable": return "Bu görünümde fotoğraf gönderilemiyor.";
    case "invalid_json": return "Claude'un yanıtı okunamadı. Tekrar deneyin.";
    case "refused": return "Claude bu isteği yanıtlamadı. Farklı fotoğraflarla deneyin.";
    case "session_expired": return "Oturum süresi doldu, tekrar giriş yapın.";
    default: return e?.message || "Bağlantı sorunu. Tekrar deneyin.";
  }
}
