// A1 · Ders 11 — Xwarin û vexwarin (yiyecekler ve içecekler)
// tts: ElevenLabs v4 metni. Kürtçe kısımlar Türkçe seslere göre yazılır: i → ı, î → i, ê → e, û → u, x → h, q → k
// B = Ülgen, R = Yunus C
window.LESSON = {
  no: 11,
  title: ['XWARIN', 'Û VEXWARIN'],
  titleTr: 'Yiyecekler ve içecekler',
  pill: 'YİYECEK · İÇECEK',
  sub: 'Kürtçe yiyecek ve içecekler · Xwarin û vexwarin',
  seq: [
    { type: 'intro', id: 'intro', who: 'B', tts: '[warmly] Merhaba! Bugün Kürtçe yiyecek ve içecekleri öğreniyoruz. Haydi başlayalım!' },

    { type: 'section', id: 's1', who: 'B', ku: 'XWARIN', tr: 'Yiyecekler', tts: 'Hwarın. [short pause] Yiyecekler.' },
    { type: 'word', id: 'w01', ku: 'nan', tr: 'ekmek', icon: 'bread', sku: 'Ez *nan* dixwim.', str: 'Ekmek yiyorum.', ttsA: 'Nan. [short pause] Ekmek.', ttsB: 'Ez nan dıhwım.' },
    { type: 'word', id: 'w02', ku: 'penêr', tr: 'peynir', icon: 'cheese', sku: '*Penêr* pir xweş e.', str: 'Peynir çok lezzetli.', ttsA: 'Pener. [short pause] Peynir.', ttsB: 'Pener pır hweş e.' },
    { type: 'word', id: 'w03', ku: 'hêk', tr: 'yumurta', icon: 'egg', sku: 'Ez du *hêkan* dixwim.', str: 'İki yumurta yiyorum.', ttsA: 'Hek. [short pause] Yumurta.', ttsB: 'Ez du hekan dıhwım.' },
    { type: 'word', id: 'w04', ku: 'goşt', tr: 'et', icon: 'meat', sku: 'Ez *goşt* naxwim.', str: 'Et yemiyorum.', ttsA: 'Goşt. [short pause] Et.', ttsB: 'Ez goşt nahwım.' },
    { type: 'word', id: 'w05', ku: 'birinc', tr: 'pirinç · pilav', icon: 'rice', sku: '*Birinc* germ e.', str: 'Pilav sıcak.', ttsA: 'Bırınc. [short pause] Pirinç, pilav.', ttsB: 'Bırınc germ e.' },
    { type: 'word', id: 'w06', ku: 'sêv', tr: 'elma', icon: 'apple', sku: '*Sêv* sor e.', str: 'Elma kırmızı.', ttsA: 'Sev. [short pause] Elma.', ttsB: 'Sev sor e.' },

    { type: 'section', id: 's2', who: 'B', ku: 'VEXWARIN', tr: 'İçecekler', tts: 'Vehwarın. [short pause] İçecekler.' },
    { type: 'word', id: 'w07', ku: 'av', tr: 'su', icon: 'water', sku: 'Ez *avê* vedixwim.', str: 'Su içiyorum.', ttsA: 'Av. [short pause] Su.', ttsB: 'Ez ave vedıhwım.' },
    { type: 'word', id: 'w08', ku: 'çay', tr: 'çay', icon: 'tea', sku: 'Ez ji *çayê* hez dikim.', str: 'Çayı severim.', ttsA: 'Çay. [short pause] Çay.', ttsB: 'Ez jı çaye hez dıkım.' },
    { type: 'word', id: 'w09', ku: 'şîr', tr: 'süt', icon: 'milk', sku: 'Pisîk *şîr* vedixwe.', str: 'Kedi süt içiyor.', ttsA: 'Şir. [short pause] Süt.', ttsB: 'Pısik şir vedıhwe.' },
    { type: 'word', id: 'w10', ku: 'dew', tr: 'ayran', icon: 'dew', sku: '*Dew* sar e.', str: 'Ayran soğuk.', ttsA: 'Dew. [short pause] Ayran.', ttsB: 'Dew sar e.' },

    { type: 'phrases', id: 'ph', title: 'Li ser sifrê', titleTr: 'Sofrada', who: 'B', items: [
      { id: 'p1', ku: 'Ez *birçî* me.', tr: 'Açım.', tts: 'Ez bırçi me. [short pause] Açım.' },
      { id: 'p2', ku: 'Ez *tî* me.', tr: 'Susadım.', tts: 'Ez ti me. [short pause] Susadım.' },
      { id: 'p3', ku: '*Noşîcan* be!', tr: 'Afiyet olsun!', tts: 'Noşican be! [short pause] Afiyet olsun!' },
    ] },

    { type: 'recap', id: 'out', who: 'R', tts: '[warmly] Noşican be! Bir sonraki derste görüşürüz.' },
  ],
};
