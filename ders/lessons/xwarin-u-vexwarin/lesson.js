// A1 · Ders 11 — Xwarin û vexwarin (yiyecekler ve içecekler)
// Sesler (ElevenLabs v4; Ülgen = kelimeler, Yunus C = cümleler).
// Telaffuz yöntemi: Kürtçe metin sese ARAP HARFLİ Kürtçe yazımla verilir (mazdek transliterate, latin-to-arabic);
// Latin yazımda Türkçe sesler "xw" gibi sesleri bozuyor. Parçalar tek uzun kayıtta üretilir, sonra sessizliklerden bölünür:
//   kelimeler : خوارن. [pause] ڤەخوارن. [pause] نان. [pause] پەنیر. [pause] هێک. [pause] گۆشت. [pause] برنج. [pause] سێڤ. [pause] ئاڤ. [pause] چای. [pause] شیر. [pause] دەو.
//   cümleler  : ئەز نان دخوم. [pause] پەنیر پر خوەشە. [pause] ئەز دو هێکان دخوم. [pause] ئەز گۆشت ناخوم. [pause] برنج گەرمە. [pause] سێڤ سۆرە. [pause] ئەز ئاڤێ ڤەدخوم. [pause] ئەز ژ چایێ هەز دکم. [pause] پسیک شیر ڤەدخوە. [pause] دەو سارە.
//   ifadeler  : ئەز برچی مە. [pause] ئەز تی مە. [pause] نۆشیجان بە!
//   <id>k / <id>a : Kürtçe kelime (videoda iki kez çalınır)   <id>t / <id>m : Türkçe karşılığı   <id>b : Kürtçe örnek cümle
window.LESSON = {
  no: 11,
  title: ['XWARIN', 'Û VEXWARIN'],
  titleTr: 'Yiyecekler ve içecekler',
  pill: 'YİYECEK · İÇECEK',
  sub: 'Kürtçe yiyecek ve içecekler · Xwarin û vexwarin',
  seq: [
    { type: 'intro', id: 'intro', who: 'B', tts: '[warmly] Merhaba! Bugün Kürtçe yiyecek ve içecekleri öğreniyoruz. Haydi başlayalım!' },

    { type: 'section', id: 's1', who: 'B', ku: 'XWARIN', tr: 'Yiyecekler' },
    { type: 'word', id: 'w01', ku: 'nan', tr: 'ekmek', icon: 'bread', sku: 'Ez *nan* dixwim.', str: 'Ekmek yiyorum.' },
    { type: 'word', id: 'w02', ku: 'penîr', tr: 'peynir', icon: 'cheese', sku: '*Penîr* pir xweş e.', str: 'Peynir çok lezzetli.' },
    { type: 'word', id: 'w03', ku: 'hêk', tr: 'yumurta', icon: 'egg', sku: 'Ez du *hêkan* dixwim.', str: 'İki yumurta yiyorum.' },
    { type: 'word', id: 'w04', ku: 'goşt', tr: 'et', icon: 'meat', sku: 'Ez *goşt* naxwim.', str: 'Et yemiyorum.' },
    { type: 'word', id: 'w05', ku: 'birinc', tr: 'pirinç · pilav', icon: 'rice', sku: '*Birinc* germ e.', str: 'Pilav sıcak.' },
    { type: 'word', id: 'w06', ku: 'sêv', tr: 'elma', icon: 'apple', sku: '*Sêv* sor e.', str: 'Elma kırmızı.' },

    { type: 'section', id: 's2', who: 'B', ku: 'VEXWARIN', tr: 'İçecekler' },
    { type: 'word', id: 'w07', ku: 'av', tr: 'su', icon: 'water', sku: 'Ez *avê* vedixwim.', str: 'Su içiyorum.' },
    { type: 'word', id: 'w08', ku: 'çay', tr: 'çay', icon: 'tea', sku: 'Ez ji *çayê* hez dikim.', str: 'Çayı severim.' },
    { type: 'word', id: 'w09', ku: 'şîr', tr: 'süt', icon: 'milk', sku: 'Pisîk *şîr* vedixwe.', str: 'Kedi süt içiyor.' },
    { type: 'word', id: 'w10', ku: 'dew', tr: 'ayran', icon: 'dew', sku: '*Dew* sar e.', str: 'Ayran soğuk.' },

    { type: 'phrases', id: 'ph', title: 'Li ser sifrê', titleTr: 'Sofrada', who: 'B', items: [
      { id: 'p1', ku: 'Ez *birçî* me.', tr: 'Açım.' },
      { id: 'p2', ku: 'Ez *tî* me.', tr: 'Susadım.' },
      { id: 'p3', ku: '*Noşîcan* be!', tr: 'Afiyet olsun!' },
    ] },

    { type: 'recap', id: 'out', who: 'R', tts: '[warmly] Afiyet olsun! Bir sonraki derste görüşürüz.' },
  ],
};
