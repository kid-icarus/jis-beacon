import { useEffect, useRef, useState } from 'react'
import { STAGES, buildDrills, buildWeakDrill, drillNames, makeDrill } from './data/stages'
import { history, load, loadMinCpm, loadStageDone, markDone, markedDone, recordHistory, save, setMinCpm, setStageDrillDone, startStage } from './lib/storage'
import { useI18n } from './i18n'
import { HomeScreen } from './components/HomeScreen'
import { TypingScreen } from './components/TypingScreen'
import { PlacementScreen } from './components/PlacementScreen'
import { ResultsScreen } from './components/ResultsScreen'
import type { HistoryEntry, TypingResult, View, WordInfo } from './types'

type Mode = 'stage' | 'free'
interface DrillCtx {
  text: string
  title: string
  mode: Mode
  stage: number
  drillName: string
  words?: WordInfo[]
}

export default function App() {
  const { t, lang, setLang } = useI18n()
  const [view, setView] = useState<View>('home')
  const [drillCtx, setDrillCtx] = useState<DrillCtx | null>(null)
  const [chooserStage, setChooserStage] = useState<number | null>(null)
  const [chooserMode, setChooserMode] = useState<Mode>('stage')
  const [done, setDone] = useState<number[]>(markedDone())
  const [hist, setHist] = useState<HistoryEntry[]>(history())
  const [start, setStart] = useState<number>(startStage())
  const [barrier, setBarrier] = useState(false)
  const [metronome, setMetronome] = useState(false)
  const [finger, setFinger] = useState(true)
  const [guideMode, setGuideMode] = useState<'auto' | 'always' | 'off'>('auto')
  const [weak, setWeak] = useState<Record<string, { n: number; t: number } | number>>(() => load().weak || {})
  const [minCpm, setMinCpmState] = useState<number>(() => loadMinCpm())
  const [stageDone, setStageDone] = useState<Record<number, Record<string, boolean>>>(() => loadStageDone())
  const [lastStageDrills, setLastStageDrills] = useState<{ name: string; passed: boolean }[] | null>(null)
  const [lastNextDrill, setLastNextDrill] = useState<string | null>(null)
  const [lastAllPassed, setLastAllPassed] = useState(false)
  const [typingKey, setTypingKey] = useState(0)
  const [lastResult, setLastResult] = useState<TypingResult | null>(null)
  const [lastTitle, setLastTitle] = useState('')
  const [lastVerdict, setLastVerdict] = useState('')
  const [lastShowWeak, setLastShowWeak] = useState(false)

  // Keyboard shortcuts: Esc = back, Enter = retry, → = next (never kana keys)
  const restartCurrent = () => {
    if (drillCtx) startDrill(drillCtx.stage, drillCtx.drillName, drillCtx.mode)
  }
  const doBack = () => gotoHome()
  const doRetry = () => {
    if (drillCtx) restartCurrent()
  }
  const doNext = () => {
    if (view === 'results' && lastAllPassed && drillCtx) openStage(drillCtx.stage + 1)
  }
  const scRef = useRef({ doBack, doRetry, doNext })
  scRef.current = { doBack, doRetry, doNext }
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.code === 'Escape') { e.preventDefault(); scRef.current.doBack() }
      else if (e.code === 'Enter') { e.preventDefault(); scRef.current.doRetry() }
      else if (e.code === 'ArrowRight') { e.preventDefault(); scRef.current.doNext() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const gotoHome = () => {
    setView('home')
    setDrillCtx(null)
    setChooserStage(null)
  }

  const openStage = (si: number) => {
    setChooserStage(si)
    setChooserMode('stage')
    setDrillCtx(null)
    setView('typing')
  }

  const openFree = () => {
    setChooserStage(0)
    setChooserMode('free')
    setDrillCtx(null)
    setView('typing')
  }

  const startDrill = (si: number, drillName: string, mode: Mode) => {
    if (!drillNames(si).includes(drillName)) return
    const d = makeDrill(si, drillName, Math.floor(Math.random() * 2 ** 31))
    setDrillCtx({ text: d.kana, title: `${si + 1}. ${STAGES[si].t} · ${drillName}`, mode, stage: si, drillName, words: d.words })
    setChooserStage(null)
    setTypingKey((k) => k + 1)
    setView('typing')
  }

  const recordMiss = (code: string) => {
    const w = { ...(load().weak || {}) }
    const cur = w[code]
    const n = typeof cur === 'number' ? cur : (cur?.n ?? 0)
    w[code] = { n: n + 1, t: Date.now() }
    save({ weak: w })
    setWeak(w)
  }
  const startWeak = () => {
    const d = buildWeakDrill(load().weak || {})
    if (!d) return
    setDrillCtx({ text: d, title: t('weak.title'), mode: 'free', stage: -1, drillName: '苦手', words: undefined })
    setChooserStage(null)
    setTypingKey((k) => k + 1)
    setView('typing')
  }

  const handleFinish = (r: TypingResult) => {
    const ctx = drillCtx
    if (!ctx) return
    if (ctx.mode === 'stage') {
      recordHistory({ d: new Date().toISOString().slice(0, 10), cpm: r.cpm, acc: r.acc, net: r.net, stage: ctx.stage })
    }
    const passed = ctx.mode === 'stage' && r.acc >= 95 && r.cpm >= minCpm
    let stageDrills: { name: string; passed: boolean }[] | null = null
    let nextDrill: string | null = null
    let allPassed = false
    if (ctx.mode === 'stage') {
      const names = drillNames(ctx.stage)
      let sd = stageDone
      if (passed) {
        sd = setStageDrillDone(ctx.stage, ctx.drillName)
        setStageDone(sd)
      }
      const stMap = sd[ctx.stage] || {}
      stageDrills = names.map((d) => ({ name: d, passed: !!stMap[d] }))
      allPassed = stageDrills.every((x) => x.passed)
      if (allPassed) markDone(ctx.stage)
      const idx = names.indexOf(ctx.drillName)
      nextDrill = idx >= 0 ? names[(idx + 1) % names.length] : null
    }
    setLastStageDrills(stageDrills)
    setLastNextDrill(nextDrill)
    setLastAllPassed(allPassed)
    setDone(markedDone())
    setHist(history())

    const verdicts: string[] = []
    if (ctx.mode === 'stage') {
      if (passed) {
        verdicts.push(
          allPassed
            ? ctx.stage + 1 < STAGES.length
              ? `${t('res.allPassed')} ${t('verdict.next')} ${STAGES[ctx.stage + 1].t}`
              : t('res.allPassed')
            : t('res.drillPassed'),
        )
      } else if (r.acc >= 95) {
        verdicts.push(`${t('res.needSpeed')} (${r.cpm}/${minCpm})`)
      } else if (r.acc >= 85) verdicts.push(t('verdict.close'))
      else verdicts.push(t('verdict.slow'))
    } else {
      verdicts.push(r.acc >= 95 ? t('verdict.passSimple') : t('verdict.slow'))
    }
    setLastResult(r)
    setLastTitle(
      ctx.mode === 'stage'
        ? lang === 'en'
          ? `Stage ${ctx.stage + 1} · ${ctx.drillName}`
          : `第${ctx.stage + 1}段・${ctx.drillName}`
        : t('res.title.free'),
    )
    setLastVerdict(verdicts.join(' '))
    setLastShowWeak(ctx.mode === 'stage' && !passed)
    setView('results')
  }

  const guideShow = guideMode === 'always' ? true : guideMode === 'off' ? false : drillCtx?.drillName === '新キー'

  return (
    <div className="wrap">
      <header>
        <h1>
          JIS <span className="jp">かな</span> タイピング{' '}
          <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: 14 }}>{t('header.sub')}</span>
        </h1>
        <div className="sub">
          {view === 'typing' && drillCtx ? drillCtx.title : view === 'place' ? t('header.place') : ''}
        </div>
        <button className="btn sm ghost" style={{ marginLeft: 'auto' }} onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}>
          {lang === 'jp' ? 'EN' : '日本語'}
        </button>
      </header>

      {view === 'home' && (
        <HomeScreen
          done={done}
          startStage={start}
          history={hist}
          barrier={barrier}
          metronome={metronome}
          fingerHint={finger}
          guideMode={guideMode}
          onGuideMode={setGuideMode}
          weak={weak}
          onPracticeWeak={startWeak}
          minCpm={minCpm}
          onMinCpm={(v) => { setMinCpmState(v); setMinCpm(v) }}
          onToggle={(k, v) => (k === 'barrier' ? setBarrier(v) : k === 'metronome' ? setMetronome(v) : setFinger(v))}
          onOpenStage={openStage}
          onPlacement={() => setView('place')}
          onFree={openFree}
        />
      )}

      {view === 'place' && (
        <PlacementScreen onComplete={() => { setStart(startStage()); gotoHome() }} onCancel={gotoHome} onMiss={recordMiss} />
      )}

      {view === 'typing' && drillCtx && (
        <TypingScreen
          key={typingKey}
          text={drillCtx.text}
          words={drillCtx.words}
          drills={drillCtx && drillCtx.stage >= 0 ? drillNames(drillCtx.stage) : undefined}
          currentDrill={drillCtx.drillName}
          onSwitchDrill={(name) => startDrill(drillCtx.stage, name, drillCtx.mode)}
          barrier={barrier}
          metronome={metronome}
          fingerHint={finger && guideMode !== 'off'}
          showKeyboard={guideShow}
          onMiss={recordMiss}
          onFinish={handleFinish}
          onRestart={restartCurrent}
          onBack={gotoHome}
        />
      )}

      {view === 'typing' && !drillCtx && chooserStage !== null && (
        <div className="card">
          <h3>
            {chooserMode === 'stage'
              ? `${chooserStage + 1}. ${STAGES[chooserStage].t} · ${t('stage.choose')}`
              : t('free.choose')}
          </h3>
          {chooserMode === 'stage' ? (
            <div className="row" style={{ justifyContent: 'start' }}>
              {buildDrills(chooserStage).map((d) => (
                <button key={d.name} className="drillb" onClick={() => startDrill(chooserStage, d.name, 'stage')}>
                  {t(`drill.${d.name === '新キー' ? 'new' : d.name === '混ぜる' ? 'blend' : 'word'}`)}（{d.kana.length}
                  {t('char.count')}）
                </button>
              ))}
            </div>
          ) : (
            <div className="row" style={{ justifyContent: 'start' }}>
              {STAGES.map((s, i) => (
                <button key={i} className="drillb" onClick={() => startDrill(i, '新キー', 'free')}>
                  {i + 1}・{s.t}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'results' && lastResult && (
        <ResultsScreen
          title={lastTitle}
          result={lastResult}
          verdict={lastVerdict}
          onAgain={restartCurrent}
          onNextExercise={lastNextDrill && drillCtx ? () => startDrill(drillCtx.stage, lastNextDrill!, 'stage') : undefined}
          onNextStage={lastAllPassed && drillCtx ? () => openStage(drillCtx.stage + 1) : undefined}
          drillProgress={lastStageDrills}
          minCpm={minCpm}
          onHome={gotoHome}
          showWeakPractice={lastShowWeak}
          onPracticeWeak={startWeak}
        />
      )}
    </div>
  )
}
