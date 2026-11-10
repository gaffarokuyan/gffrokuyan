# Stêrk Arena

Özgün, 3 koridorlu bir 3D MOBA. Önce web, sonra Android (AAB).

- **Diller:** Kurdî (Kurmancî), Türkçe, English
- **Maç:** 5v5 (sen + 4 bot vs 5 bot), 3 koridor, kuleler, asker dalgaları (kuşatma ve şampiyon askerler), orman canavarları, Kadim ve Nehir Ruhu hedefleri, Yıldız Çekirdeği
- **Derinlik:** yetenek puanı/kademe sistemi, savaş sisi ve çalılar, iki büyü (D/F), asist ve çoklu öldürme, skor tablosu
- **12 kahraman:** Rûbar, Zerya, Bahoz, Çiya, Hêvî, Şevîn, Baran, Şêr, Tîrêj, Zinar, Agir, Befrîn — her birinde Q/W/E + R (ulti), seviye 15'e kadar
- **Maç içi dükkân:** 17 eşya; 8 temel parça birleşerek 9 gelişmiş eşyaya dönüşür
- **Hasar türleri:** fiziksel ve büyü hasarı, zırh ve büyü direnci
- **Botlar:** her takımda bir ormancı, gözcü diken botlar, "yardım çağır" pingine gelen takım arkadaşları
- **Pasifler ve kritik vuruş:** her kahramanın bir pasifi var
- **Orman:** Kor Damgası ve Dalga Arması güçlendirme kampları, Kadim, Nehir Ruhu
- **Görüş:** gözcü taşı (2 hak, 45 sn'de yenilenir), kule kendi kahramanına saldıranı hedef alır
- **Maç dışı:** tılsım seçimi, zorluk (kolay/normal/zor), sıralama puanı ve 6 kademe, maç öncesi kadro ve maç sonu istatistik tablosu + MVP
- **Mağaza (DEMO):** elmas paketleri ve kostümler. Gerçek ödeme alınmaz; Android sürümünde Google Play Billing bağlanacak.
- **Teknik:** Three.js + Vite, tüm modeller/efektler/sesler kodla üretilir (harici asset yok)

## Çalıştırma

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # dist/index.html — tek dosyalık, her yerde barındırılabilir
```

## Kontroller

- **Masaüstü:** sağ tık yürü/saldır · Q W E R yetenek (Shift+tuş kademe artırır) · D F büyü · Tab skor tablosu · B üsse dön · P dükkân · Boşluk en yakına saldır · tekerlek yakınlaştır
- **Mobil:** sol başparmak joystick · yetenek düğmeleri en yakın düşmana nişan alır

## Android

Capacitor ile sarmalanır (`android/`). Yatay ve tam ekran açılır.

```bash
export ANDROID_HOME=/yol/android-sdk
npm run android:apk   # test için kurulabilir APK  -> android/app/build/outputs/apk/debug/
npm run android:aab   # Play Store paketi (AAB)   -> android/app/build/outputs/bundle/release/
```

AAB imzası için `android/keystore.properties` gerekir (git'e girmez):

```
storeFile=sterk-upload.jks
storePassword=...
keyAlias=sterk
keyPassword=...
```

Uygulama kimliği `com.sterkarena.game` (`capacitor.config.json` ve `android/app/build.gradle`). Play'e ilk yüklemeden önce değiştirilebilir, sonra değiştirilemez.

## Yol haritası

1. Gerçek cihazda oynayıp performansı ve dokunmatik hissi oturtmak
2. Google Play Billing ile gerçek satın alma (şu an mağaza demo)
3. Play Console'a yükleme: mağaza görselleri, gizlilik politikası, içerik derecelendirmesi
