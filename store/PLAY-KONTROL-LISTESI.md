# Play Store'a çıkış kontrol listesi

Sıra önemli: Google, ürün tanımlamadan önce faturalama kitaplığı içeren bir paketin yüklenmiş olmasını ister.

## 1. Hesap
- [ ] Google Play geliştirici hesabı aç (tek seferlik 25 USD): https://play.google.com/console/signup
- [ ] Kimlik doğrulamasını tamamla
- [ ] Satış yapacaksan ödeme profili ve banka hesabı ekle (Console → Ödeme profili)

## 2. Uygulamayı oluştur
- [ ] Console → Uygulama oluştur → ad: Stêrk Arena, tür: Oyun, ücretsiz
- [ ] Paket adı AAB'den gelir: `com.sterkarena.game` (ilk yüklemeden sonra değiştirilemez)

## 3. Gizlilik politikası
- [ ] `docs/privacy.html` içindeki `[E-POSTA ADRESİNİ BURAYA YAZ]` yerine iletişim e-postanı yaz
- [ ] Sayfayı yayınla: GitHub → depo → Settings → Pages → Branch: ana dal, klasör: `/docs`
- [ ] Çıkan adresi (…github.io/gffrokuyan/privacy.html) Console → Uygulama içeriği → Gizlilik politikası alanına yapıştır

## 4. Uygulama içeriği formları (Console → Uygulama içeriği)
| Form | Yanıt |
|---|---|
| Reklamlar | Hayır, reklam içermiyor |
| Uygulama erişimi | Tüm işlevler kısıtlama olmadan kullanılabilir |
| Hedef kitle | 13 yaş ve üzeri |
| Veri güvenliği | Veri toplanmıyor, veri paylaşılmıyor |
| Haber uygulaması | Hayır |
| İçerik derecelendirmesi | Anketi doldur: kategori Oyun; şiddet: çizgi film/fantastik şiddet var; kan, cinsellik, kumar, uyuşturucu, küfür yok; kullanıcılar arası iletişim yok; dijital ürün satın alma var |

Veri güvenliği yanıtı oyunun şu anki hâline göre doğrudur: hesap yok, sunucu yok, reklam ve analiz yok; ilerleme yalnızca cihazda saklanır.

## 5. Mağaza girişi (Console → Ana mağaza girişi)
- [ ] Metinler: `store/metinler.md`
- [ ] Uygulama simgesi: `store/gorseller/ikon-512.png`
- [ ] Özellik grafiği: `store/gorseller/ozellik-grafigi-1024x500.png`
- [ ] Telefon ekran görüntüleri: `store/gorseller/1-…4-….png` (1920×1080, en az 2 gerekli)
- [ ] Kategori: Oyun → Strateji (ya da Aksiyon); iletişim e-postası

## 6. Paketi yükle
- [ ] Console → Test → Dahili test → Yeni sürüm oluştur
- [ ] Play Uygulama İmzalama'yı kabul et (önerilir); `sterk-upload.jks` yükleme anahtarın olur
- [ ] `sterk-arena-v1.1.aab` dosyasını yükle
- [ ] Test kullanıcısı olarak kendi Google hesabını ekle, katılım bağlantısından oyunu telefona kur

## 7. Uygulama içi ürünler (gerçek satın alma)
Console → Para kazanma → Ürünler → Uygulama içi ürünler. Dört ürünü şu kimliklerle oluştur ve etkinleştir:

| Ürün kimliği | Verdiği elmas | Önerilen fiyat |
|---|---|---|
| `gems_80` | 80 | 0,99 USD |
| `gems_450` | 500 (450 + 50 bonus) | 4,99 USD |
| `gems_1000` | 1200 (1000 + 200 bonus) | 9,99 USD |
| `gems_2800` | 3500 (2800 + 700 bonus) | 24,99 USD |

- [ ] Kimlikler tam olarak yukarıdaki gibi olmalı; oyun bunları arıyor
- [ ] Console → Ayarlar → Lisans testi: kendi hesabını ekle (test alımlarında para çekilmez)
- [ ] Dahili test sürümünde mağazayı aç: DEMO rozeti kaybolmalı, fiyatlar Play'den gelmeli
- [ ] Bir paket satın al, elmasların geldiğini doğrula

Ürünler tanımlı değilse yayın sürümünde mağaza "şu an kullanılamıyor" der ve hiçbir şey vermez; test APK'sında demo olarak çalışır.

## 8. Yayın
- [ ] Dahili testte her şey çalışıyorsa: Kapalı test → (yeni kişisel hesaplarda Google en az 12 test kullanıcısı ve 14 gün ister) → Üretim
- [ ] Ülkeleri seç, incelemeye gönder

## Bilinen sınırlar
- Satın almalar cihazda doğrulanır, sunucu doğrulaması yoktur. Küçük ölçekte yeterli; gelir büyürse sunucu tarafı doğrulama eklenmeli.
- İlerleme cihazda saklanır; telefon değişince taşınmaz (bulut kaydı yok).
- Sonraki her yüklemede `android/app/build.gradle` içindeki `versionCode` bir artırılmalı.
