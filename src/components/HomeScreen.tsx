import { STAGES, stageKanaLabel, weakList } from '../data/stages'
import { Graph } from './Graph'
import { useI18n } from '../i18n'
import type { HistoryEntry } from '../types'

interface Props {
  done: number[]
  startStage: number
  history: HistoryEntry[]
  barrier: boolean
  metronome: boolean
  fingerHint: boolean
  guideMode: 'auto' | 'always' | 'off'
  onGuideMode: (m: 'auto' | 'always' | 'off') => void
  weak: Record<string, { n: number; t: number } | number>
  onPracticeWeak: () => void
  minCpm: number
  onMinCpm: (v: number) => void
  onToggle: (k: 'barrier' | 'metronome' | 'finger', v: boolean) => void
  onOpenStage: (si: number) => void
  onPlacement: () => void
  onFree: () => void
}

export function HomeScreen({ done, startStage, history, barrier, metronome, fingerHint, guideMode, onGuideMode, weak, onPracticeWeak, minCpm, onMinCpm, onToggle, onOpenStage, onPlacement, onFree }: Props) {
  const { t } = useI18n()
  const best = history.length ? history.reduce((m, x) => (x.net > m.net ? x : m), history[0]).net : 0
  const wl = weakList(weak)
  const maxN = wl.length ? wl[0].n : 0
  return (
    <div>
      <div className="banner">{t('home.banner')}</div>
      <div className="cards">
        <div className="card">
          <h3>{t('home.levels')}</h3>
          <div>
            {STAGES.map((s, i) => {
              const isDone = done.includes(i)
              const isOpen = i === 0 || done.includes(i - 1) || i <= startStage
              const cls = ['stageb']
              if (isDone) cls.push('done')
              if (!isOpen) cls.push('locked')
              return (
                <div key={i} className={cls.join(' ')} onClick={isOpen ? () => onOpenStage(i) : undefined}>
                  <span className="num">{i + 1}</span>
                  <span className="nm">
                    <span className="keysmini">{stageKanaLabel(i)}</span>
                    {s.t}
                  </span>
                  {isDone ? <span className="done-mark">✔</span> : <span className="tag">{isOpen ? t('stage.open') : t('stage.locked')}</span>}
                </div>
              )
            })}
          </div>
        </div>
        <div className="card">
          <h3>{t('home.progress')}</h3>
          <table className="prog">
            <tbody>
              <tr><th>{t('home.prog.cleared')}</th><th>{t('home.prog.best')}</th><th>{t('home.prog.count')}</th></tr>
              <tr><td>{done.length} / {STAGES.length}</td><td>{best}</td><td>{history.length}</td></tr>
            </tbody>
          </table>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn primary" onClick={onPlacement}>{t('home.placement')}</button>
            <button className="btn" onClick={onFree}>{t('home.free')}</button>
          </div>
          <div className="row" style={{ marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{t('home.guide')}:</span>
            {(['auto', 'always', 'off'] as const).map((m) => (
              <button key={m} className={'seg' + (guideMode === m ? ' on' : '')} onClick={() => onGuideMode(m)}>
                {t(`guide.${m}`)}
              </button>
            ))}
          </div>
          <div className="row" style={{ marginTop: 12 }}>
            <label className="toggle" style={{ alignItems: 'center' }}>
              {t('home.minCpm')}:
              <input
                type="number"
                min={0}
                value={minCpm}
                onChange={(e) => onMinCpm(Math.max(0, parseInt(e.target.value, 10) || 0))}
                style={{ width: 64, padding: '3px 6px', borderRadius: 6, border: '1px solid var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
              />
            </label>
          </div>
          <div className="row" style={{ marginTop: 12 }}>
            <label className="toggle"><input type="checkbox" checked={barrier} onChange={(e) => onToggle('barrier', e.target.checked)} /> {t('home.barrier')}</label>
            <label className="toggle"><input type="checkbox" checked={metronome} onChange={(e) => onToggle('metronome', e.target.checked)} /> {t('home.metronome')}</label>
            <label className="toggle"><input type="checkbox" checked={fingerHint} onChange={(e) => onToggle('finger', e.target.checked)} /> {t('home.finger')}</label>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>{t('home.graph')}</h3>
        <Graph history={history} />
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>{t('home.weak')}</h3>
        {wl.length ? (
          <>
            <div className="weakrow">
              {wl.slice(0, 8).map((w) => (
                <span key={w.kana} className="weakitem" style={{ ['--w' as string]: `${Math.round((w.n / maxN) * 100)}%` }}>
                  <b>{w.kana}</b>
                  <span className="wcount">{w.n} {t('weak.misses')}</span>
                </span>
              ))}
            </div>
            <div className="row" style={{ marginTop: 10, justifyContent: 'start' }}>
              <button className="btn" onClick={onPracticeWeak}>{t('weak.practice')}</button>
            </div>
          </>
        ) : (
          <div className="hint" style={{ textAlign: 'left' }}>{t('weak.none')}</div>
        )}
      </div>
      <div className="footer">{t('footer')}</div>
    </div>
  )
}
