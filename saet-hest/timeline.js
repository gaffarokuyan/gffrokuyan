// Zaman çizelgesi: replikler, ara kartlar, ikon balonları.
// *yıldız* arasındaki kelimeler altyazıda vurgulanır.
window.TL = {
  fps: 30,
  dur: 58,
  lines: [
    { id: 'l01', who: 'B', start: 1.6, dur: 4.28, ku: 'Ronî! Sibê *saet di heştan de* were. Em ê *taştê* bixwin!', tr: 'Ronî! Yarın saat sekizde gel. Kahvaltı yapacağız!' },
    { id: 'l02', who: 'R', start: 6.2, dur: 3.4, ku: '*Saet di heştan de?* Baş e! Ez ê werim!', tr: 'Saat sekizde mi? Tamam! Geleceğim!' },
    { id: 'l03', who: 'B', start: 12.2, dur: 2.85, ku: '*Saet heşt e.* Ronî li ku ye?', tr: 'Saat sekiz. Ronî nerede?' },
    { id: 'l04', who: 'B', start: 16.5, dur: 3.71, ku: '*Saet deh e!* Çay sar bû!', tr: 'Saat on! Çay soğudu!' },
    { id: 'l05', who: 'R', start: 24.9, dur: 3.79, ku: '*Êvar baş*, Berfîn! Ez hatim! *Saet heşt e!*', tr: 'İyi akşamlar Berfîn! Geldim! Saat sekiz!' },
    { id: 'l06', who: 'B', start: 29.0, dur: 3.87, ku: 'Ronî! Min got heştê *sibehê*! Ne heştê *êvarê*!', tr: 'Ronî! Sabah sekiz dedim! Akşam sekiz değil!' },
    { id: 'l07', who: 'R', start: 33.2, dur: 4.28, ku: 'Te got “heşt”. *Heşt, heşt e!*', tr: '“Sekiz” dedin. Sekiz, sekizdir!' },
    { id: 'l08', who: 'B', start: 37.8, dur: 1.65, ku: '*Taştê* nema!', tr: 'Kahvaltı kalmadı!' },
    { id: 'l09', who: 'R', start: 39.8, dur: 2.35, ku: 'Ne xem e. Em *şîvê* bixwin!', tr: 'Dert değil. Akşam yemeği yiyelim!' },
    { id: 'l10', who: 'B', start: 42.5, dur: 4.99, ku: 'Baş e… Sibê *saet di heftan de* were.', tr: 'Tamam… Yarın saat yedide gel.' },
    { id: 'l11', who: 'R', start: 47.8, dur: 3.08, ku: 'Heftê *sibehê*… an heftê *êvarê*?', tr: 'Sabah yedi mi… akşam yedi mi?' },
    { id: 'l12', who: 'B', start: 51.1, dur: 1.07, ku: 'RONÎ!!!', tr: 'RONÎ!!!' },
  ],
  // Ara kartlar (zaman atlaması)
  cards: [
    { a: 9.9, b: 11.7, ku: 'Roja din…', tr: 'Ertesi gün…' },
    { a: 21.8, b: 23.6, ku: 'Êvar…', tr: 'Akşam oldu…' },
  ],
  // Konuşanın üstünde beliren ikon balonları
  bubbles: [
    { a: 3.0, b: 6.0, who: 'B', slot: 0, icon: 'clock8', label: 'saet 8' },
    { a: 4.6, b: 6.0, who: 'B', slot: 1, icon: 'breakfast', label: 'taştê' },
    { a: 7.6, b: 9.7, who: 'R', slot: 0, icon: 'ok', label: 'baş e!' },
    { a: 30.2, b: 33.0, who: 'B', slot: 0, icon: 'sunOk', label: 'sibeh' },
    { a: 31.6, b: 33.0, who: 'B', slot: 1, icon: 'moonNo', label: 'êvar' },
    { a: 35.5, b: 37.6, who: 'R', slot: 0, icon: 'eq', label: 'heşt = heşt' },
    { a: 37.9, b: 39.6, who: 'B', slot: 0, icon: 'emptyPlate', label: 'taştê nema' },
    { a: 40.7, b: 42.3, who: 'R', slot: 0, icon: 'dinner', label: 'şîv' },
    { a: 45.0, b: 47.6, who: 'B', slot: 0, icon: 'clock7', label: 'saet 7' },
    { a: 48.0, b: 51.0, who: 'R', slot: 0, icon: 'sunQ', label: 'sibeh?' },
    { a: 49.5, b: 51.0, who: 'R', slot: 1, icon: 'moonQ', label: 'êvar?' },
  ],
  // Video sonu kelime kartı
  vocab: [
    ['saet', 'saat'],
    ['heşt', 'sekiz'],
    ['sibeh', 'sabah'],
    ['êvar', 'akşam'],
    ['taştê', 'kahvaltı'],
    ['şîv', 'akşam yemeği'],
    ['sibê', 'yarın'],
  ],
  endAt: 53.4,
  hitAt: 51.85,
};
