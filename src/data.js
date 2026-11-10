// Static game data: heroes, abilities, items, skins, store packs.
// Ability types: proj | aoe | dash | buff | heal
// dmg: [base, perLevel, attackRatio]

export const HEROES = {
  rubar: {
    name: 'Rûbar', role: 'fighter', weapon: 'sword', melee: true, cost: 0,
    hp: 760, mp: 280, atk: 64, def: 30, spd: 7.6, range: 2.7, as: 1.05, hpG: 98, atkG: 4.4,
    color: 0x2f8fff, accent: 0x9be7ff, fx: 0x55c8ff,
    abil: [
      { key: 'q', type: 'dash', name: { en: 'Torrent Rush', tr: 'Sel Hücumu', ku: 'Êrîşa Lehiyê' }, cd: 6, mana: 40, range: 8, radius: 3, dmg: [70, 18, 0.7] },
      { key: 'w', type: 'buff', name: { en: 'River Guard', tr: 'Nehir Kalkanı', ku: 'Mertalê Çem' }, cd: 12, mana: 50, dur: 4, shield: [120, 30], spd: 1.2 },
      { key: 'e', type: 'aoe', name: { en: 'Whirlpool', tr: 'Girdap', ku: 'Gerînek' }, cd: 8, mana: 45, range: 0, radius: 4.6, delay: 0.15, dmg: [80, 20, 0.8], slow: 0.35 },
      { key: 'r', type: 'dash', ult: true, name: { en: 'Tidal Verdict', tr: 'Gelgit Hükmü', ku: 'Biryara Pêlan' }, cd: 55, mana: 100, range: 12, radius: 5.5, dmg: [220, 40, 1.2], stun: 1.2 },
    ],
  },
  zerya: {
    name: 'Zerya', role: 'mage', weapon: 'staff', melee: false, cost: 0,
    hp: 560, mp: 420, atk: 50, def: 18, spd: 7.0, range: 9.5, as: 0.85, hpG: 72, atkG: 3.2,
    color: 0xff6a2b, accent: 0xffd27a, fx: 0xff8a3c,
    abil: [
      { key: 'q', type: 'proj', name: { en: 'Ember Orb', tr: 'Kor Küresi', ku: 'Gogê Pêtê' }, cd: 4.5, mana: 45, range: 15, speed: 26, width: 1.1, dmg: [95, 24, 0.5] },
      { key: 'w', type: 'aoe', name: { en: 'Sunburst', tr: 'Güneş Patlaması', ku: 'Teqîna Rojê' }, cd: 9, mana: 70, range: 11, radius: 4, delay: 0.7, dmg: [120, 28, 0.6], stun: 0.8 },
      { key: 'e', type: 'dash', blink: true, name: { en: 'Cinder Step', tr: 'Kül Adımı', ku: 'Gava Xweliyê' }, cd: 13, mana: 60, range: 8, radius: 0, dmg: [0, 0, 0] },
      { key: 'r', type: 'aoe', ult: true, name: { en: 'Falling Star', tr: 'Düşen Yıldız', ku: 'Stêrka Ketî' }, cd: 60, mana: 120, range: 14, radius: 7, delay: 1.1, dmg: [300, 55, 0.9], meteor: true },
    ],
  },
  bahoz: {
    name: 'Bahoz', role: 'marksman', weapon: 'bow', melee: false, cost: 0,
    hp: 580, mp: 300, atk: 60, def: 20, spd: 7.3, range: 10.5, as: 1.1, hpG: 76, atkG: 4.6,
    color: 0x2fd67a, accent: 0xe8ff8a, fx: 0x7dffb0,
    abil: [
      { key: 'q', type: 'proj', name: { en: 'Gale Arrow', tr: 'Bora Oku', ku: 'Tîra Bagerê' }, cd: 5, mana: 40, range: 18, speed: 34, width: 0.9, pierce: true, dmg: [80, 20, 0.9] },
      { key: 'w', type: 'buff', name: { en: 'Stormpulse', tr: 'Fırtına Nabzı', ku: 'Lêdana Bahozê' }, cd: 13, mana: 50, dur: 5, as: 1.7 },
      { key: 'e', type: 'dash', name: { en: 'Windroll', tr: 'Rüzgâr Taklası', ku: 'Gindirîna Bayê' }, cd: 9, mana: 35, range: 7, radius: 0, dmg: [0, 0, 0] },
      { key: 'r', type: 'proj', ult: true, name: { en: 'Thunderline', tr: 'Yıldırım Hattı', ku: 'Xeta Birûskê' }, cd: 50, mana: 100, range: 40, speed: 48, width: 1.6, pierce: true, dmg: [240, 45, 1.3], slow: 0.4 },
    ],
  },
  ciya: {
    name: 'Çiya', role: 'tank', weapon: 'hammer', melee: true, cost: 900,
    hp: 920, mp: 260, atk: 56, def: 42, spd: 7.0, range: 2.8, as: 0.85, hpG: 120, atkG: 3.4,
    color: 0x9a7b4f, accent: 0xffe2a8, fx: 0xe0b060,
    abil: [
      { key: 'q', type: 'aoe', name: { en: 'Stonebreak', tr: 'Taş Kıran', ku: 'Kevirşikên' }, cd: 6, mana: 40, range: 0, radius: 4.5, delay: 0.3, dmg: [75, 18, 0.7], slow: 0.4 },
      { key: 'w', type: 'buff', name: { en: 'Bedrock', tr: 'Ana Kaya', ku: 'Zinarê Bingehîn' }, cd: 14, mana: 55, dur: 5, shield: [200, 45], def: 30 },
      { key: 'e', type: 'dash', name: { en: 'Avalanche', tr: 'Çığ', ku: 'Aşît' }, cd: 10, mana: 50, range: 9, radius: 3.2, dmg: [70, 16, 0.5], stun: 1.0 },
      { key: 'r', type: 'aoe', ult: true, name: { en: 'Mountain\'s Wrath', tr: 'Dağın Gazabı', ku: 'Xezeba Çiyê' }, cd: 65, mana: 100, range: 0, radius: 8, delay: 0.6, dmg: [240, 45, 0.8], stun: 1.5 },
    ],
  },
  hevi: {
    name: 'Hêvî', role: 'support', weapon: 'wand', melee: false, cost: 900,
    hp: 600, mp: 460, atk: 46, def: 20, spd: 7.2, range: 9, as: 0.9, hpG: 78, atkG: 2.8,
    color: 0xf2c94c, accent: 0xffffff, fx: 0xfff0a0,
    abil: [
      { key: 'q', type: 'proj', name: { en: 'Dawn Bolt', tr: 'Şafak Oku', ku: 'Tîra Berbangê' }, cd: 5, mana: 40, range: 14, speed: 28, width: 1.1, dmg: [80, 20, 0.5], slow: 0.4 },
      { key: 'w', type: 'heal', name: { en: 'Mending Light', tr: 'Şifa Işığı', ku: 'Ronahiya Dermanê' }, cd: 9, mana: 70, radius: 7, heal: [110, 28] },
      { key: 'e', type: 'buff', name: { en: 'Swift Blessing', tr: 'Çevik Kutsama', ku: 'Pîrozkirina Lezê' }, cd: 14, mana: 50, dur: 4, spd: 1.35, team: 8 },
      { key: 'r', type: 'heal', ult: true, name: { en: 'Sanctuary', tr: 'Sığınak', ku: 'Stargeh' }, cd: 70, mana: 120, radius: 10, heal: [280, 50], shield: [150, 30] },
    ],
  },
  sevin: {
    name: 'Şevîn', role: 'assassin', weapon: 'daggers', melee: true, cost: 1400,
    hp: 620, mp: 300, atk: 70, def: 22, spd: 8.0, range: 2.5, as: 1.2, hpG: 80, atkG: 5.0,
    color: 0x8a4dff, accent: 0xff7ae0, fx: 0xc07bff,
    abil: [
      { key: 'q', type: 'proj', name: { en: 'Night Fang', tr: 'Gece Dişi', ku: 'Diranê Şevê' }, cd: 4.5, mana: 35, range: 12, speed: 32, width: 0.9, dmg: [75, 20, 0.8], slow: 0.3 },
      { key: 'w', type: 'buff', name: { en: 'Moonveil', tr: 'Ay Peçesi', ku: 'Perdeya Heyvê' }, cd: 12, mana: 45, dur: 4, spd: 1.4, atk: 30 },
      { key: 'e', type: 'dash', blink: true, name: { en: 'Shadowstep', tr: 'Gölge Adımı', ku: 'Gava Siyê' }, cd: 8, mana: 45, range: 9, radius: 2.8, dmg: [60, 16, 0.6] },
      { key: 'r', type: 'dash', ult: true, name: { en: 'Eclipse', tr: 'Tutulma', ku: 'Rojgirtin' }, cd: 45, mana: 90, range: 10, radius: 5, dmg: [260, 50, 1.5] },
    ],
  },
  baran: {
    name: 'Baran', role: 'mage', weapon: 'staff', melee: false, cost: 1400,
    hp: 570, mp: 440, atk: 48, def: 18, spd: 7.0, range: 9.5, as: 0.85, hpG: 74, atkG: 3.0,
    color: 0x2a6f9c, accent: 0xbfe9ff, fx: 0x4fd0ff,
    abil: [
      { key: 'q', type: 'proj', name: { en: 'Raindrop Lance', tr: 'Damla Mızrağı', ku: 'Rimê Dilopê' }, cd: 5, mana: 45, range: 15, speed: 27, width: 1.1, dmg: [85, 22, 0.5], slow: 0.35 },
      { key: 'w', type: 'aoe', name: { en: 'Cloudburst', tr: 'Sağanak', ku: 'Tavî' }, cd: 10, mana: 70, range: 11, radius: 3.6, delay: 0.8, dmg: [100, 26, 0.5], stun: 1.0 },
      { key: 'e', type: 'buff', name: { en: 'Mist Cloak', tr: 'Sis Pelerini', ku: 'Ebayê Mijê' }, cd: 14, mana: 55, dur: 3.5, shield: [110, 28], spd: 1.3 },
      { key: 'r', type: 'aoe', ult: true, name: { en: 'Deluge', tr: 'Tufan', ku: 'Tofan' }, cd: 65, mana: 120, range: 13, radius: 8, delay: 1.0, dmg: [240, 50, 0.8], slow: 0.6 },
    ],
  },
  ser: {
    name: 'Şêr', role: 'fighter', weapon: 'sword', melee: true, cost: 1400,
    hp: 780, mp: 270, atk: 66, def: 30, spd: 7.5, range: 2.7, as: 1.0, hpG: 100, atkG: 4.6,
    color: 0xc9892a, accent: 0xfff0c0, fx: 0xffb84a,
    abil: [
      { key: 'q', type: 'aoe', name: { en: 'Mane Sweep', tr: 'Yele Savuruşu', ku: 'Hejandina Yalê' }, cd: 5.5, mana: 35, range: 0, radius: 4.2, delay: 0.2, dmg: [75, 20, 0.8] },
      { key: 'w', type: 'buff', name: { en: 'Roar', tr: 'Kükreme', ku: 'Qîrîn' }, cd: 13, mana: 45, dur: 5, as: 1.45, atk: 20 },
      { key: 'e', type: 'dash', name: { en: 'Pounce', tr: 'Sıçrayış', ku: 'Xwe Avêtin' }, cd: 10, mana: 45, range: 8.5, radius: 2.8, dmg: [65, 16, 0.6], stun: 0.9 },
      { key: 'r', type: 'buff', ult: true, name: { en: 'Lionheart', tr: 'Aslan Yürek', ku: 'Dilê Şêr' }, cd: 60, mana: 100, dur: 7, shield: [260, 45], atk: 45, spd: 1.3 },
    ],
  },
  tirej: {
    name: 'Tîrêj', role: 'marksman', weapon: 'bow', melee: false, cost: 1400,
    hp: 570, mp: 310, atk: 62, def: 19, spd: 7.3, range: 11, as: 1.05, hpG: 74, atkG: 4.8,
    color: 0xd94f8a, accent: 0xffe0f0, fx: 0xff8ac0,
    abil: [
      { key: 'q', type: 'proj', name: { en: 'Sunray Shot', tr: 'Işın Atışı', ku: 'Avêtina Tîrêjê' }, cd: 4.5, mana: 40, range: 17, speed: 36, width: 0.9, dmg: [85, 22, 1.0] },
      { key: 'w', type: 'aoe', name: { en: 'Arrowfall', tr: 'Ok Yağmuru', ku: 'Barana Tîran' }, cd: 11, mana: 60, range: 12, radius: 4.2, delay: 0.6, dmg: [90, 22, 0.6], slow: 0.45 },
      { key: 'e', type: 'dash', name: { en: 'Quickstep', tr: 'Çevik Adım', ku: 'Gava Sivik' }, cd: 9, mana: 35, range: 7, radius: 0, dmg: [0, 0, 0] },
      { key: 'r', type: 'aoe', ult: true, name: { en: 'Daybreak Volley', tr: 'Şafak Salvosu', ku: 'Gulebarana Berbangê' }, cd: 55, mana: 100, range: 16, radius: 6.5, delay: 0.9, dmg: [260, 50, 1.2], meteor: true },
    ],
  },
  zinar: {
    name: 'Zinar', role: 'tank', weapon: 'hammer', melee: true, cost: 1400,
    hp: 900, mp: 280, atk: 54, def: 44, spd: 7.0, range: 2.8, as: 0.85, hpG: 118, atkG: 3.2,
    color: 0x5a6b7a, accent: 0xb8f0e0, fx: 0x7af0d0,
    abil: [
      { key: 'q', type: 'dash', name: { en: 'Boulder Charge', tr: 'Kaya Hücumu', ku: 'Êrîşa Zinar' }, cd: 9, mana: 45, range: 8, radius: 3, dmg: [65, 16, 0.5], stun: 0.8 },
      { key: 'w', type: 'heal', name: { en: 'Deep Roots', tr: 'Derin Kökler', ku: 'Rehên Kûr' }, cd: 12, mana: 60, radius: 4, heal: [90, 24] },
      { key: 'e', type: 'aoe', name: { en: 'Tremor', tr: 'Sarsıntı', ku: 'Lerz' }, cd: 7, mana: 40, range: 0, radius: 4.6, delay: 0.3, dmg: [70, 18, 0.6], slow: 0.45 },
      { key: 'r', type: 'buff', ult: true, name: { en: 'Bulwark', tr: 'Siper', ku: 'Senger' }, cd: 70, mana: 110, dur: 6, shield: [220, 40], def: 35, team: 10 },
    ],
  },
};

export const HERO_IDS = Object.keys(HEROES);

// In-match items (bought with match gold)
export const ITEMS = [
  { id: 'blade', icon: '🗡️', cost: 500, atk: 25, name: { en: 'Ember Blade', tr: 'Kor Kılıç', ku: 'Şûrê Pêtê' } },
  { id: 'boots', icon: '🥾', cost: 650, spd: 1.1, name: { en: 'Wind Boots', tr: 'Rüzgâr Çizmesi', ku: 'Pêlavên Bayê' } },
  { id: 'vest', icon: '🧥', cost: 900, hp: 320, name: { en: 'Shepherd\'s Vest', tr: 'Çoban Yeleği', ku: 'Êlekê Şivan' } },
  { id: 'tome', icon: '📜', cost: 450, ap: 0.22, mp: 150, name: { en: 'Star Scroll', tr: 'Yıldız Tomarı', ku: 'Tomara Stêrkê' } },
  { id: 'quiver', icon: '🏹', cost: 600, as: 0.3, name: { en: 'Storm Quiver', tr: 'Fırtına Sadağı', ku: 'Tîrdanka Bahozê' } },
  { id: 'crystal', icon: '💠', cost: 1200, cdr: 0.2, mp: 200, name: { en: 'Clear Crystal', tr: 'Berrak Kristal', ku: 'Krîstala Zelal' } },
  { id: 'fang', icon: '🦷', cost: 1050, atk: 18, ls: 0.14, name: { en: 'Wolf Fang', tr: 'Kurt Dişi', ku: 'Diranê Gur' } },
  { id: 'plate', icon: '🛡️', cost: 800, def: 40, hp: 260, name: { en: 'Mountain Plate', tr: 'Dağ Zırhı', ku: 'Zirxê Çiyê' } },
  { id: 'great', icon: '⚔️', cost: 1450, atk: 62, name: { en: 'Sunforged Edge', tr: 'Güneş Dövmesi', ku: 'Tîxa Rojê' } },
  { id: 'staff', icon: '🔮', cost: 1500, ap: 0.48, name: { en: 'Orb of Dawn', tr: 'Şafak Küresi', ku: 'Goga Berbangê' } },
];

// Skins: palette swaps bought with gems (demo store)
export const SKINS = {
  rubar: [{ id: 'default', cost: 0 }, { id: 'crimson', cost: 120, color: 0xd63a3a, accent: 0xffc27a, fx: 0xff6a4a }, { id: 'frost', cost: 200, color: 0xdff4ff, accent: 0x7ad8ff, fx: 0xbdf0ff }],
  zerya: [{ id: 'default', cost: 0 }, { id: 'azure', cost: 120, color: 0x3a6cff, accent: 0x9fe8ff, fx: 0x5ab0ff }, { id: 'jade', cost: 200, color: 0x1fb58a, accent: 0xd8ffb0, fx: 0x60ffc0 }],
  bahoz: [{ id: 'default', cost: 0 }, { id: 'dusk', cost: 120, color: 0x7a4dff, accent: 0xffb0f0, fx: 0xb08aff }, { id: 'gold', cost: 200, color: 0xe0a82a, accent: 0xfff2b0, fx: 0xffd860 }],
  ciya: [{ id: 'default', cost: 0 }, { id: 'obsidian', cost: 120, color: 0x3a3a48, accent: 0xff5a3a, fx: 0xff7040 }, { id: 'frost', cost: 200, color: 0xbfe6ff, accent: 0xffffff, fx: 0xa0e0ff }],
  hevi: [{ id: 'default', cost: 0 }, { id: 'rose', cost: 120, color: 0xff7aa8, accent: 0xfff0f5, fx: 0xffa8c8 }, { id: 'azure', cost: 200, color: 0x4a9aff, accent: 0xe8f6ff, fx: 0x8ac8ff }],
  baran: [{ id: 'default', cost: 0 }, { id: 'dusk', cost: 120, color: 0x6a4dff, accent: 0xe0d0ff, fx: 0xa08aff }, { id: 'jade', cost: 200, color: 0x1fa58a, accent: 0xd8ffe8, fx: 0x60ffc0 }],
  ser: [{ id: 'default', cost: 0 }, { id: 'crimson', cost: 120, color: 0xc8322e, accent: 0xffd27a, fx: 0xff6040 }, { id: 'frost', cost: 200, color: 0xe6f4ff, accent: 0x8ad0ff, fx: 0xbdeaff }],
  tirej: [{ id: 'default', cost: 0 }, { id: 'azure', cost: 120, color: 0x3a7cff, accent: 0xd8ecff, fx: 0x6ab8ff }, { id: 'gold', cost: 200, color: 0xe0a82a, accent: 0xfff2b0, fx: 0xffd860 }],
  zinar: [{ id: 'default', cost: 0 }, { id: 'obsidian', cost: 120, color: 0x2e2e3a, accent: 0xff6a3a, fx: 0xff7040 }, { id: 'rose', cost: 200, color: 0xd87a9a, accent: 0xfff0f5, fx: 0xffa8c8 }],
  sevin: [{ id: 'default', cost: 0 }, { id: 'crimson', cost: 120, color: 0xc0283a, accent: 0xffd27a, fx: 0xff5060 }, { id: 'jade', cost: 200, color: 0x18a878, accent: 0xb0ffe0, fx: 0x50ffc0 }],
};

// Demo gem packs. No real payment is made anywhere in this build.
export const GEM_PACKS = [
  { id: 'g1', gems: 80, price: '$0.99' },
  { id: 'g2', gems: 450, price: '$4.99', bonus: 50 },
  { id: 'g3', gems: 1000, price: '$9.99', bonus: 200 },
  { id: 'g4', gems: 2800, price: '$24.99', bonus: 700 },
];

export function skinPalette(heroId, skinId) {
  const h = HEROES[heroId];
  const s = (SKINS[heroId] || []).find((x) => x.id === skinId);
  if (!s || s.id === 'default') return { color: h.color, accent: h.accent, fx: h.fx };
  return { color: s.color, accent: s.accent, fx: s.fx };
}
