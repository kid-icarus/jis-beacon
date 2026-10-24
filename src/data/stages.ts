import type { Drill, Stage, WordInfo } from '../types'
import { K, kanaKeys } from './keyMap'

// One key-pair (or group) per stage, in touch-typing reach order.
export const STAGES: Stage[] = [
  { t: 'は・ま（F / J）', k: ['KeyF', 'KeyJ'] },
  { t: 'し・の（D / K）', k: ['KeyD', 'KeyK'] },
  { t: 'と・り（S / L）', k: ['KeyS', 'KeyL'] },
  { t: 'ち・れ（A / ;）', k: ['KeyA', 'Semicolon'] },
  { t: 'き・く（G / H）', k: ['KeyG', 'KeyH'] },
  { t: 'す・な（R / U）', k: ['KeyR', 'KeyU'] },
  { t: 'か・ん（T / Y）', k: ['KeyT', 'KeyY'] },
  { t: 'い・に（E / I）', k: ['KeyE', 'KeyI'] },
  { t: 'て・ら（W / O）', k: ['KeyW', 'KeyO'] },
  { t: 'た・せ（Q / P）', k: ['KeyQ', 'KeyP'] },
  { t: 'ひ・も（V / M）', k: ['KeyV', 'KeyM'] },
  { t: 'こ・み（B / N）', k: ['KeyB', 'KeyN'] },
  { t: 'そ・ね（C / ,）', k: ['KeyC', 'Comma'] },
  { t: 'さ・る（X / .）', k: ['KeyX', 'Period'] },
  { t: 'つ・め（Z / /）', k: ['KeyZ', 'Slash'] },
  { t: '数字の段', k: ['Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Digit1', 'Digit2', 'Minus'] },
  { t: '濁音・半濁音・長音', k: ['BracketLeft', 'BracketRight', 'IntlYen', 'IntlRo', 'Equal', 'Backslash'] },
]

// Base-kana-only words (no voiced); voiced words added once stage 16+ is reached.
// Each entry has the hiragana reading (what you type), an optional kanji + a meaning.
const WORDS: WordInfo[] = [
  { kana: 'はし', kanji: '箸', en: 'chopsticks' }, { kana: 'くま', kanji: '熊', en: 'bear' },
  { kana: 'ひと', kanji: '人', en: 'person' }, { kana: 'いえ', kanji: '家', en: 'house' },
  { kana: 'うみ', kanji: '海', en: 'sea' }, { kana: 'かさ', kanji: '傘', en: 'umbrella' },
  { kana: 'すし', kanji: '寿司', en: 'sushi' }, { kana: 'て', kanji: '手', en: 'hand' },
  { kana: 'とけい', kanji: '時計', en: 'watch / clock' }, { kana: 'なつ', kanji: '夏', en: 'summer' },
  { kana: 'ねこ', kanji: '猫', en: 'cat' }, { kana: 'のり', kanji: '海苔', en: 'nori (seaweed)' },
  { kana: 'はな', kanji: '花', en: 'flower' }, { kana: 'ふね', kanji: '船', en: 'ship / boat' },
  { kana: 'へや', kanji: '部屋', en: 'room' }, { kana: 'ほし', kanji: '星', en: 'star' },
  { kana: 'まち', kanji: '町', en: 'town' }, { kana: 'やま', kanji: '山', en: 'mountain' },
  { kana: 'ゆき', kanji: '雪', en: 'snow' }, { kana: 'よる', kanji: '夜', en: 'night' },
  { kana: 'そら', kanji: '空', en: 'sky' }, { kana: 'たこ', kanji: '凧', en: 'kite' },
  { kana: 'つき', kanji: '月', en: 'moon' }, { kana: 'みみ', kanji: '耳', en: 'ear' },
  { kana: 'むし', kanji: '虫', en: 'insect' }, { kana: 'もり', kanji: '森', en: 'forest' },
  { kana: 'さかな', kanji: '魚', en: 'fish' }, { kana: 'しお', kanji: '塩', en: 'salt' },
  { kana: 'あさ', kanji: '朝', en: 'morning' }, { kana: 'あめ', kanji: '雨', en: 'rain' },
  { kana: 'いぬ', kanji: '犬', en: 'dog' }, { kana: 'うま', kanji: '馬', en: 'horse' },
  { kana: 'えき', kanji: '駅', en: 'station' }, { kana: 'こえ', kanji: '声', en: 'voice' },
  { kana: 'わたし', kanji: '私', en: 'I / me' }, { kana: 'あなた', kanji: '貴方', en: 'you' },
  { kana: 'もも', kanji: '桃', en: 'peach' }, { kana: 'つくえ', kanji: '机', en: 'desk' },
  { kana: 'ひみつ', kanji: '秘密', en: 'secret' }, { kana: 'もち', kanji: '餅', en: 'mochi (rice cake)' },
  { kana: 'りんご', kanji: '林檎', en: 'apple' }, { kana: 'おか', kanji: '丘', en: 'hill' },
  { kana: 'にわ', kanji: '庭', en: 'garden' },
  { kana: 'にく', kanji: '肉', en: 'meat' }, { kana: 'かに', kanji: '蟹', en: 'crab' },
  { kana: 'きく', kanji: '菊', en: 'chrysanthemum' }, { kana: 'くに', kanji: '国', en: 'country' },
  { kana: 'ちしき', kanji: '知識', en: 'knowledge' }, { kana: 'りす', kanji: '栗鼠', en: 'squirrel' },
  { kana: 'すき', kanji: '好き', en: 'like / favorite' }, { kana: 'かな', kanji: '仮名', en: 'kana' },
  { kana: 'かん', kanji: '缶', en: 'can' }, { kana: 'なし', kanji: '梨', en: 'pear' },
  { kana: 'かき', kanji: '柿', en: 'persimmon' }, { kana: 'いけ', kanji: '池', en: 'pond' },
  { kana: 'すな', kanji: '砂', en: 'sand' }, { kana: 'いす', kanji: '椅子', en: 'chair' },
  { kana: 'くち', kanji: '口', en: 'mouth' }, { kana: 'は', kanji: '歯', en: 'tooth' },
  { kana: 'ち', kanji: '血', en: 'blood' }, { kana: 'と', kanji: '戸', en: 'door' },
  { kana: 'なか', kanji: '中', en: 'inside' }, { kana: 'みち', kanji: '道', en: 'road' },
  { kana: 'かわ', kanji: '川', en: 'river' }, { kana: 'いも', kanji: '芋', en: 'potato' },
  { kana: 'たけ', kanji: '竹', en: 'bamboo' }, { kana: 'そと', kanji: '外', en: 'outside' },
  { kana: 'とり', kanji: '鳥', en: 'bird' }, { kana: 'うし', kanji: '牛', en: 'cow' },
  { kana: 'き', kanji: '木', en: 'tree' }, { kana: 'かみ', kanji: '紙', en: 'paper' },
  { kana: 'ちち', kanji: '父', en: 'father' }, { kana: 'はは', kanji: '母', en: 'mother' },
  { kana: 'みそ', kanji: '味噌', en: 'miso' }, { kana: 'かお', kanji: '顔', en: 'face' },
  { kana: 'ちく', kanji: '地区', en: 'district' },
]
const VOICEDWORDS: WordInfo[] = [
  { kana: 'ありがとう', kanji: '有難う', en: 'thank you' }, { kana: 'かぞく', kanji: '家族', en: 'family' },
  { kana: 'かぎ', kanji: '鍵', en: 'key' }, { kana: 'ごはん', kanji: '御飯', en: 'meal / rice' },
  { kana: 'じぶん', kanji: '自分', en: 'oneself' }, { kana: 'でんしゃ', kanji: '電車', en: 'train' },
  { kana: 'びょういん', kanji: '病院', en: 'hospital' }, { kana: 'ぺん', en: 'pen' },
  { kana: 'こくばん', kanji: '黒板', en: 'blackboard' }, { kana: 'うでどけい', kanji: '腕時計', en: 'wristwatch' },
  { kana: 'すこし', kanji: '少し', en: 'a little' },
  { kana: 'ぎん', kanji: '銀', en: 'silver' }, { kana: 'ともだち', kanji: '友達', en: 'friend' },
  { kana: 'こども', kanji: '子供', en: 'child' }, { kana: 'みず', kanji: '水', en: 'water' },
  { kana: 'おかね', kanji: 'お金', en: 'money' }, { kana: 'くるま', kanji: '車', en: 'car' },
  { kana: 'しごと', kanji: '仕事', en: 'work / job' }, { kana: 'てがみ', kanji: '手紙', en: 'letter' },
  { kana: 'えんぴつ', kanji: '鉛筆', en: 'pencil' },
]

function learnedSet(stageIdx: number): Set<string> {
  const s = new Set<string>()
  for (let i = 0; i <= stageIdx; i++) for (const c of STAGES[i].k) s.add(K[c].kana)
  return s
}

function stageKana(stageIdx: number): string[] {
  return STAGES[stageIdx].k.map((c) => K[c].kana)
}

function availWords(stageIdx: number, useVoiced: boolean): WordInfo[] {
  const learned = learnedSet(stageIdx)
  const pool = useVoiced ? WORDS.concat(VOICEDWORDS) : WORDS
  return pool.filter((w) => {
    for (const ch of w.kana) {
      const ks = kanaKeys(ch)
      if (!ks) return false
      for (const kk of ks) {
        if (kk.code === 'BracketLeft' || kk.code === 'BracketRight') continue // modifier allowed
        const ki = K[kk.code] ? K[kk.code].kana : null
        if (!ki || !learned.has(ki)) return false
      }
    }
    return true
  })
}

export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice()
  let s = seed
  const r = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// mulberry32 PRNG for fresh randomization per attempt
function mulberry32(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s += 0x6d2b79f5
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a fresh, randomized drill for a stage + type. Random seed => can't memorize the pattern.
export function makeDrill(stageIdx: number, name: string, seed: number): Drill {
  const useVoiced = stageIdx >= 16
  const rng = mulberry32(seed)
  let kanaStr = ''
  let words: WordInfo[] | undefined
  if (name === '新キー') {
    const order = shuffle(stageKana(stageIdx), rng)
    let s = ''
    for (let pass = 0; pass < 4; pass++) for (const k of order) s += k
    kanaStr = s
  } else if (name === '混ぜる') {
    const learned = [...learnedSet(stageIdx)]
    const seq: string[] = []
    for (let i = 0; i < 30; i++) seq.push(learned[Math.floor(rng() * learned.length)])
    kanaStr = seq.join('')
  } else {
    const avail = availWords(stageIdx, useVoiced)
    const sel = shuffle(avail, rng).slice(0, 8)
    words = sel
    kanaStr = sel.map((w) => w.kana).join('')
  }
  return { name, kana: kanaStr, words }
}

export function drillNames(stageIdx: number): string[] {
  const names = ['新キー', '混ぜる']
  if (availWords(stageIdx, stageIdx >= 16).length) names.push('単語')
  return names
}

// Representative drills for the chooser labels (fixed seed => stable lengths).
export function buildDrills(stageIdx: number): Drill[] {
  return drillNames(stageIdx).map((n) => makeDrill(stageIdx, n, 123456))
}

export function stageKanaLabel(stageIdx: number): string {
  return STAGES[stageIdx].k.map((c) => K[c].kana).join(' ')
}

// Time-decayed weak-key weights: a miss fades by half-life (3 days) once you stop missing a key.
export function effectiveWeak(weak: Record<string, number | { n: number; t: number }>): Record<string, number> {
  const now = Date.now()
  const HALF = 3 * 86400000
  const out: Record<string, number> = {}
  for (const [code, e] of Object.entries(weak)) {
    const n = typeof e === 'number' ? e : (e?.n ?? 0)
    const t = typeof e === 'number' ? now : (e?.t ?? now)
    const v = n * Math.pow(0.5, Math.max(0, now - t) / HALF)
    if (v >= 0.5) out[code] = v
  }
  return out
}

// Ranked list of the learner's most-missed keys (decayed).
export function weakList(weak: Record<string, number | { n: number; t: number }>): { kana: string; latin: string; n: number }[] {
  const eff = effectiveWeak(weak)
  return Object.entries(eff)
    .map(([code, n]) => ({ kana: K[code]?.kana ?? '', latin: K[code]?.latin ?? '', n: Math.round(n) }))
    .filter((x) => x.kana && x.n > 0)
    .sort((a, b) => b.n - a.n)
}

// Build a practice drill weighted toward the weakest keys, with a few easy ones mixed in for relief.
export function buildWeakDrill(weak: Record<string, number | { n: number; t: number }>): string | null {
  const eff = effectiveWeak(weak)
  const entries = Object.entries(eff)
    .map(([code, n]) => ({ code, n, kana: K[code]?.kana }))
    .filter((e) => e.kana && e.n > 0)
    .sort((a, b) => b.n - a.n)
  if (!entries.length) return null
  const top = entries.slice(0, 6)
  let s = ''
  for (let r = 0; r < 3; r++) for (const e of top) s += e.kana
  const weakSet = new Set(top.map((e) => e.code))
  const home = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL']
  const easy = home.filter((c) => !weakSet.has(c)).slice(0, 3).map((c) => K[c].kana)
  s += easy.join('').repeat(2)
  return s
}

// Placement test content
export const PLACE = 'はましのとりちれきくすなかんいに'
