import type { Finger, KeyInfo, Keystroke } from '../types'

// Physical JIS key -> info. Detection uses event.code (IME/layout independent).
export const K: Record<string, KeyInfo> = {
  // HOME ROW
  KeyA: { latin: 'A', kana: 'ち', f: 'LP', home: true },
  KeyS: { latin: 'S', kana: 'と', f: 'LR', home: true },
  KeyD: { latin: 'D', kana: 'し', f: 'LM', home: true },
  KeyF: { latin: 'F', kana: 'は', f: 'LI', home: true },
  KeyG: { latin: 'G', kana: 'き', f: 'LI', home: true },
  KeyH: { latin: 'H', kana: 'く', f: 'RI', home: true },
  KeyJ: { latin: 'J', kana: 'ま', f: 'RI', home: true },
  KeyK: { latin: 'K', kana: 'の', f: 'RM', home: true },
  KeyL: { latin: 'L', kana: 'り', f: 'RR', home: true },
  Semicolon: { latin: ';', kana: 'れ', f: 'RP', home: true },
  Quote: { latin: ':', kana: 'け', f: 'RP', home: true },
  // TOP ROW
  KeyQ: { latin: 'Q', kana: 'た', f: 'LP' },
  KeyW: { latin: 'W', kana: 'て', f: 'LR' },
  KeyE: { latin: 'E', kana: 'い', f: 'LM' },
  KeyR: { latin: 'R', kana: 'す', f: 'LI' },
  KeyT: { latin: 'T', kana: 'か', f: 'LI' },
  KeyY: { latin: 'Y', kana: 'ん', f: 'RI' },
  KeyU: { latin: 'U', kana: 'な', f: 'RI' },
  KeyI: { latin: 'I', kana: 'に', f: 'RM' },
  KeyO: { latin: 'O', kana: 'ら', f: 'RR' },
  KeyP: { latin: 'P', kana: 'せ', f: 'RP' },
  BracketLeft: { latin: '@', kana: '゛', f: 'RP' },
  BracketRight: { latin: '[', kana: '゜', f: 'RP' },
  Backslash: { latin: ']', kana: 'む', f: 'RP' },
  // BOTTOM ROW
  KeyZ: { latin: 'Z', kana: 'つ', f: 'LP' },
  KeyX: { latin: 'X', kana: 'さ', f: 'LR' },
  KeyC: { latin: 'C', kana: 'そ', f: 'LM' },
  KeyV: { latin: 'V', kana: 'ひ', f: 'LI' },
  KeyB: { latin: 'B', kana: 'こ', f: 'LI' },
  KeyN: { latin: 'N', kana: 'み', f: 'RI' },
  KeyM: { latin: 'M', kana: 'も', f: 'RI' },
  Comma: { latin: ',', kana: 'ね', f: 'RM' },
  Period: { latin: '.', kana: 'る', f: 'RR' },
  Slash: { latin: '/', kana: 'め', f: 'RP' },
  IntlRo: { latin: '\\', kana: 'ろ', f: 'RP' },
  // NUMBER ROW
  Digit1: { latin: '1', kana: 'ぬ', f: 'LP' },
  Digit2: { latin: '2', kana: 'ふ', f: 'LR' },
  Digit3: { latin: '3', kana: 'あ', f: 'LM' },
  Digit4: { latin: '4', kana: 'う', f: 'LI' },
  Digit5: { latin: '5', kana: 'え', f: 'LI' },
  Digit6: { latin: '6', kana: 'お', f: 'RI' },
  Digit7: { latin: '7', kana: 'や', f: 'RI' },
  Digit8: { latin: '8', kana: 'ゆ', f: 'RM' },
  Digit9: { latin: '9', kana: 'よ', f: 'RR' },
  Digit0: { latin: '0', kana: 'わ', f: 'RP' },
  Minus: { latin: '-', kana: 'ほ', f: 'RP' },
  Equal: { latin: '^', kana: 'へ', f: 'RP' },
  IntlYen: { latin: '¥', kana: 'ー', f: 'RP' },
}

export const FC: Record<Finger, string> = {
  LP: '#c94f3d', LR: '#d98a3a', LM: '#c9a63a', LI: '#3a9a5e',
  RI: '#3a7ea6', RM: '#5a5aa8', RR: '#8a4aa8', RP: '#b04a86',
}

export const FN: Record<Finger, string> = {
  LP: '左小指', LR: '左薬指', LM: '左中指', LI: '左人指',
  RI: '右人指', RM: '右中指', RR: '右薬指', RP: '右小指',
}

export const DAK = 'BracketLeft'
export const HAN = 'BracketRight'
export const LONG = 'IntlYen'

export function codeOf(kana: string): string | null {
  for (const c of Object.keys(K)) if (K[c].kana === kana) return c
  return null
}

// kana -> sequence of physical keystrokes (handles voiced/handakuten/long-mark)
export function kanaKeys(ch: string): Keystroke[] | null {
  if (!ch) return null
  if (ch === 'ー') return [{ code: LONG, kana: 'ー' }]
  const vo: Record<string, string> = {
    'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
    'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
    'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
    'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
  }
  const ha: Record<string, string> = { 'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ' }
  const sm: Record<string, string> = { 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ', 'っ': 'つ', 'ぁ': 'あ', 'ぃ': 'い', 'ぇ': 'え', 'ぉ': 'お', 'ゎ': 'わ' }
  let base = ch
  let dak = false
  let han = false
  if (vo[ch]) { base = vo[ch]; dak = true }
  else if (ha[ch]) { base = ha[ch]; han = true }
  else if (sm[ch]) { base = sm[ch] }
  const c = codeOf(base)
  if (!c) return null
  const seq: Keystroke[] = [{ code: c, kana: base }]
  if (dak) seq.push({ code: DAK, kana: '゛' })
  if (han) seq.push({ code: HAN, kana: '゜' })
  return seq
}

export function buildTargets(str: string): { char: string; keys: Keystroke[] }[] {
  const t: { char: string; keys: Keystroke[] }[] = []
  for (const ch of str) {
    const ks = kanaKeys(ch)
    if (ks) t.push({ char: ch, keys: ks })
  }
  return t
}

// On-screen keyboard physical row layout
export function keyboardRowOrder(): string[][] {
  return [
    ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'IntlYen'],
    ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
    ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
    ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'IntlRo'],
  ]
}
