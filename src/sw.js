// Service worker: çevrimdışı çalışma + WhatsApp vb. uygulamalardan "Paylaş" ile dosya alma.
const VERSION = "koli-v1";
const CORE = [
  "./", "index.html", "styles.css", "app.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png",
  "vendor/tesseract.min.js", "vendor/pdf.worker.min.mjs",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== "shared-files").map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Android paylaşım hedefi (manifest share_target)
  if (e.request.method === "POST" && url.pathname.endsWith("/share-target")) {
    e.respondWith((async () => {
      const data = await e.request.formData();
      const cache = await caches.open("shared-files");
      let i = 0;
      for (const f of data.getAll("files")) {
        if (!(f instanceof File)) continue;
        await cache.put(`shared/${Date.now()}-${i++}`, new Response(f, {
          headers: { "content-type": f.type, "x-file-name": encodeURIComponent(f.name) },
        }));
      }
      return Response.redirect(new URL("./?shared=1", self.registration.scope).href, 303);
    })());
    return;
  }

  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  // Önce önbellek, sonra ağ; büyük OCR dosyalarını ilk kullanımda önbelleğe al
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
      }
      return res;
    }))
  );
});
