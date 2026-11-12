// "Ez baş im!" — Silav û nasîn (selamlaşma ve tanışma)
// tts: ElevenLabs v4'e gönderilen metin (B = Ülgen, R = Yunus C)
window.EP = {
  title: 'EZ BAŞ IM!',
  tag: 'Kurdî A1 · Silav û nasîn',
  clockH: 10.17,
  vocabScale: .86,
  seq: [
    { id: 'l01', who: 'B', ku: '*Rojbaş*, Ronî! *Tu çawa yî?*', tr: 'İyi günler Ronî! Nasılsın?', tts: '[happy] Rojbaş, Ronî! Tu çawa yî?',
      s: { pose: 'wave', expr: 'happy' }, l: { pose: 'idle', expr: 'happy' } },
    { id: 'l02', who: 'R', ku: '*Ez baş im*, spas!', tr: 'İyiyim, teşekkürler!', tts: '[happy] Ez baş im, spas!',
      s: { pose: 'cheer', expr: 'happy', hop: 30 } },
    { id: 'l03', who: 'B', ku: 'Pir baş! *Navê te çi ye?*', tr: 'Çok güzel! Adın ne?', tts: '[happy] Pır baş! [curious] Nave te çı ye?',
      s: { pose: 'point', expr: 'happy' } },
    { id: 'l04', who: 'R', ku: '*Ez baş im*, spas!', tr: 'İyiyim, teşekkürler!', tts: '[happy] Ez baş im, spas!',
      s: { pose: 'cheer', expr: 'happy', hop: 30 }, l: { pose: 'idle', expr: 'wide' } },
    { id: 'l05', who: 'B', gap: .6, ku: 'Na, na! *NAVÊ* te çi ye?', tr: 'Hayır, hayır! ADIN ne?', tts: '[frustrated] Na, na! [slowly] NAVÊ te… çi ye?',
      s: { pose: 'up', expr: 'angry', red: .4, shake: 1 }, l: { pose: 'idle', expr: 'normal' } },
    { id: 'l06', who: 'R', ku: 'Aaa! *Navê min*… baş e!', tr: 'Haa! Benim adım… iyi!', tts: '[surprised] Aaa! [happy] Navê min… baş e!',
      s: { pose: 'think', expr: 'wide', tilt: -8 }, then: [{ f: .5, s: { pose: 'cheer', expr: 'happy', hop: 30, tilt: 0 }, l: { pose: 'hips', expr: 'wide' } }] },
    { id: 'l07', who: 'B', gap: .6, ku: '*Tu çend salî yî?*', tr: 'Kaç yaşındasın?', tts: '[sighs] [tired] Tu çend salî yî?',
      s: { pose: 'face', expr: 'sleep', tilt: 8 }, then: [{ f: .45, s: { pose: 'point', expr: 'normal', tilt: 0 } }] },
    { id: 'l08', who: 'R', ku: 'Ez… *bîst* baş im!', tr: 'Ben… yirmi iyiyim!', tts: '[curious] Ez… [happy] bîst baş im!',
      s: { pose: 'think', expr: 'normal', tilt: -8 }, then: [{ f: .45, s: { pose: 'cheer', expr: 'happy', hop: 30, tilt: 0 }, l: { pose: 'hips', expr: 'angry', red: .5 } }] },
    { id: 'l09', who: 'B', gap: .5, ku: 'Ronî! Tu tenê *hevokekê* dizanî?', tr: 'Ronî! Sadece bir cümle mi biliyorsun?', tts: '[angry] Ronî! Tu tenê hevokekê dizanî?',
      s: { pose: 'up', expr: 'angry', red: .85, shake: 1 }, l: { pose: 'idle', expr: 'wide', sweat: true, rot: 5 } },
    { id: 'l10', who: 'R', ku: 'Na! Ez *du hevokan* dizanim!', tr: 'Hayır! İki cümle biliyorum!', tts: '[confident] Na! Ez DU hevokan dizanim!',
      s: { pose: 'shrug', expr: 'smug' }, l: { pose: 'hips', expr: 'angry', red: .4 } },
    { id: 'l11', who: 'B', ku: 'Ya duyem çi ye?', tr: 'İkincisi ne?', tts: '[curious] [slowly] Ya duyem çi ye?',
      s: { pose: 'hips', expr: 'normal', tilt: -8 } },
    { id: 'l12', who: 'R', gap: .7, ku: 'Ez baş im… *SPAS!*', tr: 'İyiyim… TEŞEKKÜRLER!', tts: '[mischievously] Ez baş im… [excited] SPAS!',
      s: { pose: 'think', expr: 'smug' }, then: [{ f: .55, s: { pose: 'cheer', expr: 'happy', hop: 50 }, l: { pose: 'idle', expr: 'wide' } }] },
    { id: 'l13', who: 'B', gap: .6, ku: 'Ay Xwedê…', tr: 'Aman Tanrım…', tts: '[sighs] [tired] Ay Xwedê…',
      s: { pose: 'face', expr: 'sleep', tilt: 12 }, l: { pose: 'cheer', expr: 'happy' } },
  ],
  tail: 1.4,
  bubbles: [
    { line: 'l01', f: .5, who: 'B', icon: 'smile+q', label: 'tu çawa yî?' },
    { line: 'l02', f: .1, who: 'R', icon: 'smile', label: 'ez baş im' },
    { line: 'l03', f: .5, who: 'B', icon: 'name+q', label: 'nav?' },
    { line: 'l04', f: .1, who: 'R', icon: 'smile', label: 'ez baş im ×2' },
    { line: 'l06', f: .55, who: 'R', icon: 'name+no', label: 'nav ≠ baş' },
    { line: 'l07', f: .45, who: 'B', icon: 'cake+q', label: 'çend salî?' },
    { line: 'l08', f: .5, who: 'R', icon: 'txt:20?!', label: 'bîst… baş?' },
    { line: 'l10', f: .3, who: 'R', icon: 'txt:2', label: 'du hevok' },
    { line: 'l12', f: .55, who: 'R', icon: 'heart', label: 'spas!' },
  ],
  vocab: [
    ['rojbaş', 'iyi günler'],
    ['tu çawa yî?', 'nasılsın?'],
    ['ez baş im', 'iyiyim'],
    ['spas', 'teşekkürler'],
    ['navê te çi ye?', 'adın ne?'],
    ['navê min Ronî ye', 'adım Ronî'],
    ['tu çend salî yî?', 'kaç yaşındasın?'],
  ],
  // Sondaki ek hareketler
  tweak(t, P, H) {
    const a = H.T('l13', 1);
    if (t > a + .2) { P.R.expr = 'happy'; P.R.dy -= Math.abs(Math.sin((t - a) * 7)) * 14; }
  },
  // Ronî her "Ez baş im" dediğinde sayaç
  front(t, P, H) {
    const hits = [['l02', .1], ['l04', .1], ['l06', .75], ['l08', .7], ['l12', .2]].map(([id, f]) => H.T(id, f));
    const n = hits.filter(x => t >= x).length; if (!n) return '';
    const last = hits[n - 1], p = H.back(H.seg(t, last, last + .3));
    return `<g transform="translate(900 430) rotate(8) scale(${.8 + .2 * p})"><rect x="-100" y="-44" width="200" height="88" rx="22" fill="#2F7DE1" ${H.S} stroke-width="7"/><text y="-6" text-anchor="middle" font-size="30" font-weight="800" fill="#fff">“baş”</text><text y="32" text-anchor="middle" font-size="40" font-weight="800" fill="#FFD23F">× ${n}</text></g>`;
  },
};
