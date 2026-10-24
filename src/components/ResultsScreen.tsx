import { useI18n } from '../i18n'
import type { TypingResult } from '../types'

interface Props {
  title: string
  result: TypingResult
  verdict: string
  drillProgress?: { name: string; passed: boolean }[] | null
  minCpm?: number
  onAgain: () => void
  onNextExercise?: () => void
  onNextStage?: () => void
  onHome: () => void
  showWeakPractice?: boolean
  onPracticeWeak?: () => void
}

export function ResultsScreen({ title, result, verdict, drillProgress, minCpm, onAgain, onNextExercise, onNextStage, onHome, showWeakPractice, onPracticeWeak }: Props) {
  const { t } = useI18n()
  const dn = (n: string) => t(n === '新キー' ? 'drill.new' : n === '混ぜる' ? 'drill.blend' : 'drill.word')
  return (
    <div className="results">
      <h2>{title}</h2>
      <div className="big">{result.cpm}</div>
      <div className="verdict">{verdict}</div>
      <div className="meter"><i style={{ width: `${result.acc}%` }} /></div>
      <div className="resgrid">
        <div className="stat"><div className="lbl">{t('res.stat.cpm')}</div><div className="val">{result.cpm}</div></div>
        <div className="stat"><div className="lbl">{t('res.stat.acc')}</div><div className="val">{result.acc}%</div></div>
        <div className="stat"><div className="lbl">{t('res.stat.net')}</div><div className="val">{result.net}</div></div>
        <div className="stat"><div className="lbl">{t('res.stat.err')}</div><div className="val err">{result.errs}</div></div>
      </div>

      {drillProgress && drillProgress.length > 0 && (
        <div className="resgrid" style={{ gridTemplateColumns: `repeat(${drillProgress.length}, 1fr)`, marginTop: 4 }}>
          {drillProgress.map((d) => (
            <div key={d.name} className={'seg' + (d.passed ? ' on' : '')} style={{ textAlign: 'center' }}>
              {dn(d.name)} {d.passed ? '✓' : '✗'}
            </div>
          ))}
        </div>
      )}
      {drillProgress && minCpm !== undefined && (
        <div className="hint" style={{ marginTop: 2 }}>
          {t('res.gate')} {minCpm} {t('res.gateUnit')}
        </div>
      )}

      <div className="row" style={{ marginTop: 8 }}>
        <button className="btn primary" onClick={onAgain}>{t('btn.again')}</button>
        {onNextExercise && <button className="btn" onClick={onNextExercise}>▸ {t('res.nextDrill')}</button>}
        {onNextStage && <button className="btn" onClick={onNextStage}>▸ {t('res.nextStage')}</button>}
        <button className="btn ghost" onClick={onHome}>{t('btn.back')}</button>
      </div>
      {showWeakPractice && onPracticeWeak && (
        <div style={{ marginTop: 14 }}>
          <button className="btn primary" onClick={onPracticeWeak}>▶ {t('weak.practice')}</button>
        </div>
      )}
      <div className="hint" style={{ marginTop: 12 }}>{t('shortcuts')}</div>
    </div>
  )
}
