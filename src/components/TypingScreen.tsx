import { useTyping } from '../hooks/useTyping'
import { K } from '../data/keyMap'
import { Keyboard } from './Keyboard'
import { useI18n } from '../i18n'
import type { TypingResult, WordInfo } from '../types'

interface Props {
  text: string
  words?: WordInfo[]
  drills?: string[]
  currentDrill?: string
  onSwitchDrill?: (name: string) => void
  barrier: boolean
  metronome: boolean
  fingerHint: boolean
  showKeyboard: boolean
  onFinish: (r: TypingResult) => void
  onRestart: () => void
  onBack: () => void
  onMiss?: (code: string) => void
}

export function TypingScreen({ text, words, drills, currentDrill, onSwitchDrill, barrier, metronome, fingerHint, showKeyboard, onFinish, onRestart, onBack, onMiss }: Props) {
  const { t, fingerName } = useI18n()
  const labKey = (n: string) => (n === '新キー' ? 'drill.new' : n === '混ぜる' ? 'drill.blend' : 'drill.word')
  const typing = useTyping(text, onFinish, onMiss)
  const cur = typing.targets[typing.pos]
  const need = cur ? cur.keys[typing.sub] : null
  const info = need ? K[need.code] : null
  const pct = typing.targets.length ? (typing.pos / typing.targets.length) * 100 : 0
  let activeIdx = -1
  if (words) {
    let acc = 0
    for (let i = 0; i < words.length; i++) {
      if (typing.pos >= acc && typing.pos < acc + words[i].kana.length) { activeIdx = i; break }
      acc += words[i].kana.length
    }
  }

  return (
    <div>
      {drills && drills.length > 0 && (
        <div className="drilltabs">
          {drills.length > 1 && (
            <button className="navarrow" onClick={() => onSwitchDrill?.(drills[(drills.indexOf(currentDrill ?? '') - 1 + drills.length) % drills.length])} aria-label="prev">◀</button>
          )}
          {drills.map((n) => (
            <button
              key={n}
              className={'tab' + (n === currentDrill ? ' active' : '')}
              onClick={() => n !== currentDrill && onSwitchDrill?.(n)}
            >
              {t(labKey(n))}
            </button>
          ))}
          {drills.length > 1 && (
            <button className="navarrow" onClick={() => onSwitchDrill?.(drills[(drills.indexOf(currentDrill ?? '') + 1) % drills.length])} aria-label="next">▶</button>
          )}
        </div>
      )}
      <div className="statgrid">
        <div className="stat"><div className="lbl">{t('stat.cpm')}</div><div className="val">{typing.cpm}</div></div>
        <div className="stat"><div className="lbl">{t('stat.acc')}</div><div className="val ok">{typing.tot ? `${typing.acc}%` : '–'}</div></div>
        <div className="stat"><div className="lbl">{t('stat.net')}</div><div className="val">{typing.net}</div></div>
        <div className="stat"><div className="lbl">{t('stat.err')}</div><div className="val err">{typing.errs}</div></div>
        <div className="stat"><div className="lbl">{t('stat.time')}</div><div className="val">{typing.timeText}</div></div>
      </div>
      <div className="progress"><i style={{ width: `${pct}%` }} /></div>
      <div className={metronome ? 'beatline on' : 'beatline'}><i /></div>
      {words && words.length > 0 && (
        <div className="wordbank">
          {words.map((w, i) => (
            <div key={i} className={'wordcard' + (i === activeIdx ? ' active' : '')}>
              <div className="wkanji">{w.kanji ? <ruby>{w.kanji}<rt>{w.kana}</rt></ruby> : w.kana}</div>
              <div className="wen">{w.en}</div>
            </div>
          ))}
        </div>
      )}
      <div className="target">
        {typing.targets.map((tc, i) => {
          const cls = ['tchar']
          if (i < typing.pos) cls.push('done')
          if (i === typing.pos) cls.push('cur')
          if (barrier && i > typing.pos + 2) cls.push('hidden')
          return (
            <span key={i} className={cls.join(' ')}>
              {tc.char}
            </span>
          )
        })}
      </div>
      <div className="hint">
        {need && info ? (
          <>
            {t('hint.next')} <b style={{ fontSize: 18 }}>{need.kana}</b>
            <span className="pill">{info.latin}</span>
            {fingerHint && (
              <span style={{ color: '#3a9a5e', fontWeight: 600, marginLeft: 8 }}>{fingerName(info.f)}</span>
            )}
          </>
        ) : null}
      </div>
      {showKeyboard ? <Keyboard activeCode={need ? need.code : null} showFinger={fingerHint} /> : null}
      <div className="kbnotes">{cur ? `「${cur.char}」${t('kb.next')}（${info?.latin ?? ''}）` : ''}</div>
      <div className="row" style={{ marginTop: 4 }}>
        <button className="btn" onClick={onRestart}>{t('btn.again')}</button>
        <button className="btn ghost" onClick={onBack}>{t('btn.back')}</button>
      </div>
      <div className="hint" style={{ marginTop: 10 }}>{t('shortcuts')}</div>
    </div>
  )
}
