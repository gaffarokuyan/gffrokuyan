# Stêrk Arena

Özgün, 3 koridorlu bir 3D MOBA. Önce web, sonra Android (AAB).

- **Diller:** Kurdî (Kurmancî), Türkçe, English
- **Maç:** 3v3 (sen + 2 bot vs 3 bot), 3 koridor, kuleler, asker dalgaları, orman canavarları, Kadim (takım güçlendirmesi), Yıldız Çekirdeği
- **6 kahraman:** Rûbar, Zerya, Bahoz, Çiya, Hêvî, Şevîn — her birinde Q/W/E + R (ulti), seviye 15'e kadar
- **Maç içi dükkân:** 10 eşya, altınla
- **Mağaza (DEMO):** elmas paketleri ve kostümler. Gerçek ödeme alınmaz; Android sürümünde Google Play Billing bağlanacak.
- **Teknik:** Three.js + Vite, tüm modeller/efektler/sesler kodla üretilir (harici asset yok)

## Çalıştırma

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # dist/index.html — tek dosyalık, her yerde barındırılabilir
```

## Kontroller

- **Masaüstü:** sağ tık yürü/saldır · Q W E R yetenek · B üsse dön · P dükkân · Boşluk en yakına saldır · tekerlek yakınlaştır
- **Mobil:** sol başparmak joystick · yetenek düğmeleri en yakın düşmana nişan alır

## Yol haritası

1. Web sürümünü oynayıp dengeyi/hissi oturtmak
2. Capacitor ile Android sarmalayıcı + Google Play Billing (gerçek satın alma)
3. İmzalı AAB çıktısı
