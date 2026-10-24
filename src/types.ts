export type Finger = 'LP' | 'LR' | 'LM' | 'LI' | 'RI' | 'RM' | 'RR' | 'RP'

export interface KeyInfo {
  latin: string
  kana: string
  f: Finger
  home?: boolean
}

export interface Keystroke {
  code: string
  kana: string
}

export interface TargetChar {
  char: string
  keys: Keystroke[]
}

export interface Stage {
  t: string
  k: string[] // event.code list introduced by this stage
}

export interface Drill {
  name: string
  kana: string
  words?: WordInfo[]
}

export interface WordInfo {
  kana: string
  kanji?: string
  en: string
}

export interface HistoryEntry {
  d: string
  cpm: number
  acc: number
  net: number
  stage: number
}

export interface TypingResult {
  cpm: number
  acc: number
  net: number
  errs: number
}

export type View = 'home' | 'place' | 'typing' | 'results'
