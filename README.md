# Koli Baskı Kontrol

Baskı formu (imalat formu / baskı onay görseli) ile makineden çıkan koliyi telefondan fotoğrafla karşılaştıran uygulama.

## Ne yapar?

1. **Baskı formu**: kamerayla çekilir **veya** PDF / görsel olarak yüklenir (galeri, dosyalar, WhatsApp).
2. **Basılan koli**: koli serilmiş halde çekilir. Küçük yazılar uzaktan okunmuyorsa ayrıca **yakın çekim** eklenir.
3. **Kontrol et**: uygulama şunları karşılaştırır ve madde madde rapor verir:
   - **Yazılar** — eksik / fazla / yanlış harf (Türkçe karakterler dahil)
   - **Konum** — her öğe doğru panelde ve doğru yerde mi (üst / alt, sol / sağ, sıra)
   - **Renk** — formdaki baskı renkleri (ör. SİYAH / YEŞİL) doğru öğelerde mi
   - **Logo ve semboller**, ters basılmış öğeler, silik / bulaşmış baskı
   - Kolide olup formda olmayanlar (ör. `C3` kodu)

Rapor yazdırılabilir / PDF kaydedilebilir veya WhatsApp'a metin olarak paylaşılabilir.

### İki kontrol modu

| Mod | Nasıl çalışır | Ne zaman |
|---|---|---|
| **Yapay zekâ ile (detaylı)** | Fotoğraflar Claude'a gönderilir; yazı, konum, renk ve sembolleri tek tek karşılaştırır. Anthropic API anahtarı gerekir (⚙︎ Ayarlar). | Asıl kontrol |
| **Hızlı ön kontrol (internetsiz)** | Telefonda OCR (Tesseract) + mürekkep rengi analizi + göreli konum karşılaştırması. | İnternet yoksa, kaba hatalar için |

İpucu: Her görselde **✂︎ Alan seç** ile sadece koli çizimini / koliyi işaretlemek, formun üstündeki tablo yazılarının karışmasını engeller.

## Hangi telefonda çalışır? APK gerekir mi?

Uygulama bir **PWA (web uygulaması)**dır; tek bir APK'ya bağlı değildir:

- Android (Chrome) ve iPhone (Safari) dahil her telefonda ve bilgisayarda tarayıcıdan açılır.
- Tarayıcı menüsünden **"Ana ekrana ekle / Uygulamayı yükle"** denince normal uygulama gibi simgesi olur, tam ekran açılır.
- Android'de yüklendikten sonra WhatsApp'ta bir PDF ya da fotoğrafa **Paylaş → Koli Kontrol** denebilir; dosya doğrudan uygulamaya gelir.
- Mağazaya koymak ya da APK dağıtmak istenirse aynı kod Capacitor / TWA ile APK'ya sarılabilir.

## Android uygulaması (APK)

Hazır APK: [`release/KoliKontrol.apk`](release/KoliKontrol.apk)

Telefona kurmak: APK'yı telefona indirin, açın, "Bilinmeyen kaynaklardan yüklemeye izin ver" sorulursa izin verin.

- "Kamera ile çek" doğrudan kamerayı açar; "Galeri / Dosya" seçicisinde PDF de seçilebilir.
- WhatsApp'ta bir PDF'e veya fotoğrafa **Paylaş → Koli Kontrol** denince dosya uygulamaya gelir (PDF → baskı formu, fotoğraflar → koli).
- Rapor "Raporu paylaş" ile WhatsApp'a gönderilir.
- Yapay zekâ kontrolü için ⚙︎ Ayarlar'a Anthropic API anahtarı girilir; internetsiz hızlı kontrol anahtarsız çalışır.

Yeniden derlemek (Ubuntu, Gradle gerekmez):

```bash
sudo apt-get install -y android-sdk-platform-23 aapt dalvik-exchange zipalign apksigner
android/build.sh          # → release/KoliKontrol.apk
```

İmza anahtarı (`android/koli-kontrol.keystore`) depoya konmaz. Güncellemeler aynı anahtarla imzalanmalı; anahtar değişirse telefonda eski uygulama silinip yenisi kurulur.

## Geliştirme

```bash
npm install
npm run build     # dist/ klasörünü üretir
npm start         # http://localhost:8080
```

Kamera ve "ana ekrana ekle" telefonda yalnızca **HTTPS** üzerinden çalışır. `netlify.toml` hazır: depo Netlify'a bağlanınca otomatik yayınlanır (GitHub Pages veya başka bir statik sunucu da olur, `dist/` klasörünü yayınlamanız yeterli).

### Dosyalar

- `src/index.html`, `src/styles.css` — ekran
- `src/app.js` — akış, ayarlar, WhatsApp paylaşımıyla gelen dosyalar
- `src/images.js` — kamera / galeri / PDF okuma, alan seçme
- `src/ai-check.js` — Claude ile karşılaştırma (yapılandırılmış JSON rapor)
- `src/local-check.js` — internetsiz OCR + renk + konum kontrolü
- `src/report.js` — rapor ekranı ve paylaşım metni
- `src/sw.js`, `src/manifest.webmanifest` — çevrimdışı çalışma, kurulum, paylaşım hedefi

### API anahtarı hakkında

Anahtar yalnızca telefonun tarayıcısında saklanır ve istekler doğrudan Anthropic'e gider. Uygulamayı birçok kişiye açacaksanız anahtarı herkese dağıtmak yerine küçük bir sunucu (proxy) üzerinden kullanmanız önerilir.
