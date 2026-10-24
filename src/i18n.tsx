import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Finger } from './types'

export type Lang = 'jp' | 'en'

export interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

const jp: Record<string, string> = {
  'header.sub': '触鍵式・Mavis式',
  'header.place': '判定テスト',
  'home.banner': '1組ずつキーを覚えて、正確さが先。各ステージの練習で 正答率95%以上 を出すと次のステージが開きます。まずは 判定テスト で今の実力を測りましょう。',
  'home.levels': 'ステージ（鍵盤を広げる順）',
  'home.progress': '進み具合と実績',
  'home.prog.cleared': '合格ステージ',
  'home.prog.best': '最高正味',
  'home.prog.count': '練習回数',
  'home.placement': '判定テスト',
  'home.free': '自由練習',
  'home.barrier': 'バリア練習',
  'home.metronome': 'メトロノーム',
  'home.finger': '指ヒント',
  'home.guide': 'キーガイド',
  'guide.auto': '自動（新キーのみ）',
  'guide.always': '常に表示',
  'guide.off': 'オフ（ハード）',
  'home.graph': 'スピード推移（CM ／ 正答率）',
  'home.weak': '苦手キー',
  'weak.none': 'まだミスはありません。練習すると表示されます。',
  'weak.practice': '苦手キーを練習',
  'weak.title': '苦手キーの練習',
  'weak.misses': 'ミス',
  'res.nextDrill': '次の練習へ',
  'res.nextStage': '次のステージへ',
  'res.drillOk': '合格',
  'res.drillNo': '未合格',
  'res.needSpeed': '正答率はOK。CPMを上げよう。',
  'home.minCpm': '合格CPM（正答率95%以上が必要）',
  'res.gate': '合格条件：正答率95%以上・CPM',
  'res.gateUnit': '以上',
  'stage.open': '開く',
  'stage.locked': '未開放',
  'graph.empty': 'まだデータがありません。練習すると推移が表示されます。',
  'stage.choose': '練習を選んでください',
  'free.choose': '自由練習・ステージを選んでください',
  'drill.new': '新キー',
  'drill.blend': '混ぜる',
  'drill.word': '単語',
  'char.count': '字',
  'stat.cpm': '速度 CM',
  'stat.acc': '正答率',
  'stat.net': '正味スコア',
  'stat.err': 'ミス',
  'stat.time': '時間',
  'hint.next': '次:',
  'btn.again': 'もう一度',
  'btn.back': '一覧へ',
  'kb.next': 'の次のキー',
  'place.banner': '判定テスト：時間無制限。落ち着いて、これだけ打てるか試してください。',
  'btn.cancel': 'キャンセル',
  'res.title.free': '自由練習 完了',
  'res.stat.cpm': '速度 CM',
  'res.stat.acc': '正答率',
  'res.stat.net': '正味',
  'res.stat.err': 'ミス',
  'btn.next': '次へ',
  'verdict.perfect': '正確さは完璧。速度も良い感じ。',
  'verdict.perfectSlow': '正確さは完璧。テンポを上げましょう。',
  'verdict.pass': '合格！次のステージが開きました。',
  'verdict.passSimple': '合格です。',
  'verdict.close': 'あと少し。指をホームに戻して、ゆっくり正確に。',
  'verdict.slow': '焦らず1文字ずつ。正確さが先、速度は後からついてきます。',
  'verdict.next': '次:',
  'footer': 'かな入力（かなモード）でタイプ。濁音は「か→゛」、半濁音は「は→゜」、長音「ー」は ¥ キー。',
  'shortcuts': 'Esc 戻る ／ Enter もう一度 ／ → 次へ',
}

const en: Record<string, string> = {
  'header.sub': 'Touch-typing · Mavis method',
  'header.place': 'Placement test',
  'home.banner': 'Learn one key-pair at a time — accuracy first. Score 95%+ on a stage to unlock the next. Take the placement test to find your starting level.',
  'home.levels': 'Stages (in touch-typing order)',
  'home.progress': 'Progress & stats',
  'home.prog.cleared': 'Stages cleared',
  'home.prog.best': 'Best score',
  'home.prog.count': 'Practices',
  'home.placement': 'Placement test',
  'home.free': 'Free practice',
  'home.barrier': 'Barrier drill',
  'home.metronome': 'Metronome',
  'home.finger': 'Finger hints',
  'home.guide': 'Key guide',
  'guide.auto': 'Auto (new keys only)',
  'guide.always': 'Always',
  'guide.off': 'Off (hard)',
  'home.graph': 'Speed over time (CPM / accuracy)',
  'home.weak': 'Weak keys',
  'weak.none': 'No misses yet — practice to build a map.',
  'weak.practice': 'Practice weak keys',
  'weak.title': 'Weak-key practice',
  'weak.misses': 'misses',
  'res.nextDrill': 'Next exercise',
  'res.nextStage': 'Next stage',
  'res.drillOk': 'Passed',
  'res.drillNo': 'Not passed',
  'res.needSpeed': 'Accuracy OK — now raise your CPM.',
  'home.minCpm': 'Target CPM (also needs 95% accuracy)',
  'res.gate': 'Pass: accuracy ≥95% and CPM',
  'res.gateUnit': 'or more',
  'stage.open': 'Open',
  'stage.locked': 'Locked',
  'graph.empty': 'No data yet. Practice to see your progress curve.',
  'stage.choose': 'Choose a drill',
  'free.choose': 'Free practice · pick a stage',
  'drill.new': 'New keys',
  'drill.blend': 'Mix',
  'drill.word': 'Words',
  'char.count': 'chars',
  'stat.cpm': 'Speed CPM',
  'stat.acc': 'Accuracy',
  'stat.net': 'Net score',
  'stat.err': 'Errors',
  'stat.time': 'Time',
  'hint.next': 'Next:',
  'btn.again': 'Try again',
  'btn.back': 'Back',
  'kb.next': 'next key:',
  'place.banner': 'Placement test: untimed. Take your time and see how far you get.',
  'btn.cancel': 'Cancel',
  'res.title.free': 'Free practice complete',
  'res.stat.cpm': 'Speed CPM',
  'res.stat.acc': 'Accuracy',
  'res.stat.net': 'Net',
  'res.stat.err': 'Errors',
  'btn.next': 'Next',
  'verdict.perfect': 'Great accuracy. Nice speed, too.',
  'verdict.perfectSlow': 'Great accuracy. Now pick up the tempo.',
  'verdict.pass': 'Passed! Next stage unlocked.',
  'verdict.passSimple': 'Passed.',
  'verdict.close': 'Almost. Reset your hands to home row and go slow and accurate.',
  'verdict.slow': 'One character at a time. Accuracy first — speed follows.',
  'verdict.next': 'Next:',
  'footer': 'Type in kana mode. For voiced sounds enter base kana then ゛, handakuten then ゜, and ー is the ¥ key.',
  'shortcuts': 'Esc = back · Enter = retry · → = next',
}

const JP_FINGER: Record<Finger, string> = {
  LP: '左小指', LR: '左薬指', LM: '左中指', LI: '左人指',
  RI: '右人指', RM: '右中指', RR: '右薬指', RP: '右小指',
}
const EN_FINGER: Record<Finger, string> = {
  LP: 'L. pinky', LR: 'L. ring', LM: 'L. middle', LI: 'L. index',
  RI: 'R. index', RM: 'R. middle', RR: 'R. ring', RP: 'R. pinky',
}

export const LangContext = createContext<LangCtx>({ lang: 'jp', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('jp')
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useI18n() {
  const { lang, setLang } = useContext(LangContext)
  const t = (k: string): string => (lang === 'en' ? en[k] : jp[k]) ?? jp[k] ?? k
  const fingerName = (f: Finger): string => (lang === 'en' ? EN_FINGER[f] : JP_FINGER[f])
  return { lang, setLang, t, fingerName }
}
