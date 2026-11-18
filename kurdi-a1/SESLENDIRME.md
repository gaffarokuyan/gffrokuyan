# Berfîn & Ronî seslendirme rehberi

Kurdî A1 Pratik videolarında Berfîn ile Ronî'nin seslerinin nasıl üretildiğini adım adım anlatır.
Başka bir Claude oturumuna/hesabına bu dosyayı ve `tools/ses/` klasörünü vermen yeterli.

> ⚠️ API anahtarı bu dosyada **yok** ve hiçbir dosyaya yazılmamalı. Anahtarı sohbete yapıştırma;
> ortam değişkeni (`ELEVENLABS_API_KEY`) ya da ortamın "network secret / credential" özelliğiyle ver.

---

## 1. Araçlar ve sesler

| | |
|---|---|
| Servis | **ElevenLabs** (REST API, `https://api.elevenlabs.io`) |
| Model | **`eleven_v4`** (duygu etiketlerini anlayan model) |
| Çıktı | `mp3_44100_128` |
| **Berfîn** (kız, öğretmen) | ses: **Ülgen** — voice_id `9UoAU5im7Rl44J2IvBHU` |
| **Ronî** (erkek, komik, hep aç, çay sever) | ses: **Yunus C** — voice_id `aB3kjBYXGX3jTKxg1bsE` |
| Doğrulama | ElevenLabs **Scribe** konuşmadan-yazıya (`scribe_v1`, dil `kmr` = Kurmancî) |
| Yazım denetimi | Mazdek AI `mazdek_spellcheck` (dil `kmr`, ücretsiz) |

Seslendirme (TTS) isteği:

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/<VOICE_ID>?output_format=mp3_44100_128" \
  -H "Content-Type: application/json" -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -d '{"text":"[cheerful] Silav Ronî!","model_id":"eleven_v4"}' -o cikti.mp3
```

Yazıya dökme (STT) isteği:

```bash
curl -X POST https://api.elevenlabs.io/v1/speech-to-text -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -F model_id=scribe_v1 -F language_code=kmr -F timestamps_granularity=word -F file=@cikti.mp3
```

**Sınır:** Hesap aynı anda en fazla **5 istek** kabul ediyor. En fazla 3 paralel istek gönder;
fazlası 593 baytlık bir JSON hata dosyasını ".mp3" diye kaydeder (boyutu kontrol et).

---

## 2. Metni nasıl yazıyorum (en önemli kısım)

Model Kurmancîyi "tahmin ederek" okuyor. Telaffuzu düzgün çıkarmak için:

1. **Duygu etiketi İngilizce ve köşeli parantezde**, satırın başında:
   `[cheerful]`, `[sighs, tired]`, `[deadpan]`, `[in pain]`, `[shivering]`, `[furious shout]`,
   `[giggles]`, `[laughing at own joke]`, `[cheeky, playful]`, `[sweetly menacing]`…
2. **Yazı sistemi seçimi:**
   - Genel cümleler çoğu zaman **Arap harfli Kürtçe** ile daha doğru okunuyor
     (ör. `رۆنی، ئیرۆ دەرسا مە`).
   - **Öğretilen örnek cümleler** (ekranda/kelime listesinde geçenler) **Latin harfle** yazılır:
     `Pirtûka min heye.` `Pereyê min tune.`
   - Arap harfi bir kelimeyi bozuyorsa (e→a kayması: "bahar", "paz", "pancara") o satırı **Latin**'e çevir.
   - Cümle sonundaki "… e" (ê değil) Arap harfinde `ەه` / `ە` ile yazılır; birleşik okunması
     istenen yerde ("pantol e" → "pantole") birleşik yaz.
3. Gerekirse kelimeyi heceyle bölerek ipucu ver: `bi-bêje`, `Miyaw-karone`.
4. Kahkaha / gülüşler ayrı üretilir:
   - Ronî kibar: `[short, polite, warm chuckle] Hahaha.`
   - Berfîn kibar: `[short, polite, sweet giggle] Hihihi.`
   - Patlayan kahkaha: `[explodes into laughter, can't hold it in] Pffff... PUAHAHAHAHAHA!`

### Altyazı ile ses metni ayrıdır
`episode.js` içinde her replik şöyle tanımlanır:

```js
B('k04', 'Ronî… ev henek *sar* e.', 'Ronî… bu şaka soğuk.', '[deadpan] Ronî… ev henek sar e.')
//  id     altyazı (Kürtçe, *vurgu*)  Türkçe çeviri          seslendirme metni (tts)
```

`B(...)` Berfîn, `R(...)` Ronî. Altyazı her zaman temiz Latin Kurmancî; `tts` alanı ise yukarıdaki
kurallara göre (etiket + Arap/Latin karışık) yazılır.

---

## 3. İş akışı (adım adım)

Çalışma klasörü olarak geçici bir klasör kullan, betikleri oraya kopyala:

```bash
cp kurdi-a1/tools/ses/* /tmp/ses-<bolum>/ && cd /tmp/ses-<bolum>
```

### 3.1 Grupla — `prep.js`
```bash
node prep.js <bolum>          # ör. node prep.js henek-sar
```
Her **sahne harfi + konuşmacı** için tek bir uzun metin oluşturur. Replikler arasına
`[long pause]` koyar → `prompts.json`. Örneğin `kB` = k sahnesinde Berfîn'in bütün replikleri.
Neden tek kayıt? Aynı kayıtta ses tonu tutarlı kalıyor ve istek sayısı azalıyor.
Kelime listesi (`vocabTts`) varsa `vB` (Berfîn Kürtçe) ve `vR` (Ronî Türkçe) grupları da eklenir.

### 3.2 Seslendir — `gen.py`
```bash
python3 gen.py                 # hepsi → aB1.mp3, aR1.mp3, ...
python3 gen.py kR,aB 2         # sadece bunları, "2." deneme olarak → kR2.mp3, aB2.mp3
```

### 3.3 Doğrula — `stt.sh`
```bash
for k in aB1 aR1 kB1 kR1; do bash stt.sh $k; done
```
Çıkan yazıyı senaryoyla karşılaştır. Örnek:
`kR Çiya min çima xemgîn e? ... şakir tune` → "çaya / şekir" bozuk → **yeniden üret**.
Not: STT tek tek kısa kelimelerde güvenilmez; bağlam içinde kontrol et.
Bozuk satırın metnini `prompts.json` içinde düzelt (Latin/Arap değiştir, heceyle böl), `gen.py <anahtar> 2` ile
tekrar üret, en iyisini `<anahtar>1.mp3` / `.json` olarak kopyala.

> Claude sesi **dinleyemez**; doğrulama yalnızca STT ile yapılır. Şüpheli kelimeleri kullanıcıya
> mutlaka bildir.

### 3.4 Böl — `align.py`
```bash
python3 align.py ../kurdi-a1/episodes/<bolum>/episode.js ../kurdi-a1/episodes/<bolum>/audio aB1 aR1 kB1 kR1 ...
```
Uzun kaydı sessizliklerden böler; hangi sessizliğin replik sınırı olduğunu, her repliğin beklenen
kelime sayısına göre (dinamik programlama) seçer → `audio/<id>.mp3` (ör. `audio/k04.mp3`).
Her parçanın yazısını ekrana basar — **kontrol et**. `cost` değeri yüksekse (≳2) bölme hatalı olabilir.

### 3.5 Elle düzeltme (gerekirse)
Kelime zamanlarına bak:
```bash
python3 -c "import json;print([(w['start'],w['end'],w['text']) for w in json.load(open('fB1.json'))['words'] if w['type']=='word'])"
```
ve ffmpeg ile kes (**`-ss` her zaman `-i`'den önce**, yoksa sessiz çıkar):
```bash
ffmpeg -y -ss 5.60 -i fB1.mp3 -t 1.40 -af "afade=t=in:d=0.02,areverse,afade=t=in:d=0.08,areverse" audio/f02.mp3
```
Kelime listesi kesitlerinde başa ~0,3 sn, sona ~0,4 sn **pay bırak**; sert `silenceremove` kullanma
(kelime başı/sonu kesik duyulur).

### 3.6 Video
`node build.mjs <bolum> --land` → yatay video. Derleyici `audio/` klasöründeki her `<id>.mp3`'ü:
- süresine göre zaman çizelgesine yerleştirir,
- ses seviyesini eşitler (RMS),
- ağız hareketini sesin şiddetinden (lip sync) üretir,
- efekt seslerini sentezleyip karıştırır.

Özel dosyalar: `vNNk.mp3` / `vNNt.mp3` (kelime listesi, Kürtçe/Türkçe), `zz.mp3` (Ronî'nin vedası
"Gundîno, xatirê we hemiyan!"), `zl.mp3` (Ronî + Berfîn birlikte kısa kibar gülüş).

---

## 4. Kullanıcının kalıcı tercihleri (sesle ilgili)

- Cuma = **înî**, 12 = **donzdeh**, vedalaşma = **xatirê te**, peynir = **penîr**, kilit = **qulf**,
  gözlük = **berçavk**; "pantol e" birleşik okunur.
- Berfîn arada tatlı tatlı güler ("hi hi hi"), sonra düzeltir; Ronî komik hatalar yapar.
- Kelime listesinde her satırı **Berfîn Kürtçe**, **Ronî Türkçe** okur.
- Videonun sonunda Ronî köşeden "Gundîno, xatirê we hemiyan!" der, ardından ikisi **kısa ve kibar**
  birlikte güler (abartılı kahkaha istenmiyor).
- Artık yalnızca **yatay** video (+ istenirse ayrıca Shorts).

---

## 5. Başka bir Claude'a verilecek kısa talimat

> Bu depodaki `kurdi-a1/SESLENDIRME.md` dosyasını oku ve `kurdi-a1/tools/ses/` betikleriyle
> seslendirme yap. ElevenLabs anahtarını sohbete yazmayacağım; ortamda `ELEVENLABS_API_KEY`
> olarak tanımlı (ya da ortamın kimlik bilgisi özelliğiyle eklenmiş). Berfîn = Ülgen
> (`9UoAU5im7Rl44J2IvBHU`), Ronî = Yunus C (`aB3kjBYXGX3jTKxg1bsE`), model `eleven_v4`.
> Her satırı Scribe (`kmr`) ile yazıya döküp kontrol et, şüpheli kelimeleri bana bildir.
