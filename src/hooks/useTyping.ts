import { useEffect, useRef, useState } from 'react'
import { K, buildTargets } from '../data/keyMap'
import type { TargetChar, TypingResult } from '../types'

interface UseTyping {
  targets: TargetChar[]
  pos: number
  sub: number
  errs: number
  tot: number
  cpm: number
  acc: number
  net: number
  timeText: string
}

// Portable typing engine. Detects keys by physical event.code. Calls onFinish once; onMiss reports the key you were supposed to hit.
export function useTyping(text: string, onFinish: (r: TypingResult) => void, onMiss?: (code: string) => void): UseTyping {
  const targets = useRef<TargetChar[]>(buildTargets(text))
  const pos = useRef(0)
  const sub = useRef(0)
  const errs = useRef(0)
  const tot = useRef(0)
  const startT = useRef<number | null>(null)
  const finished = useRef(false)
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish
  const onMissRef = useRef(onMiss)
  onMissRef.current = onMiss
  const [, force] = useState(0)
  const rerender = () => force((x) => x + 1)

  // keep refs mirrored for callers and the listener
  const stateRef = useRef({ pos: 0, sub: 0, errs: 0, tot: 0, startT: null as number | null, finished: false })
  stateRef.current = { pos: pos.current, sub: sub.current, errs: errs.current, tot: tot.current, startT: startT.current, finished: finished.current }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') return
      const st = stateRef.current
      if (st.finished) return
      const t = targets.current[st.pos]
      if (!t) return
      const need = t.keys[st.sub]
      if (e.code === need.code) {
        if (!st.startT) {
          st.startT = Date.now()
          startT.current = st.startT
        }
        st.tot++
        tot.current = st.tot
        st.sub++
        if (st.sub >= t.keys.length) {
          st.sub = 0
          st.pos++
          pos.current = st.pos
        }
        if (st.pos >= targets.current.length) {
          st.finished = true
          finished.current = true
          const secs = startT.current ? Math.max(1, Math.round((Date.now() - startT.current) / 1000)) : 0
          const cpm = startT.current ? Math.round(st.pos / (secs / 60)) : 0
          const acc = st.tot ? Math.round(((st.tot - st.errs) / st.tot) * 100) : 100
          onFinishRef.current({ cpm, acc, net: Math.round((cpm * acc) / 100), errs: st.errs })
        }
        rerender()
      } else if (K[e.code]) {
        st.tot++
        tot.current = st.tot
        st.errs++
        errs.current = st.errs
        onMissRef.current?.(t.keys[st.sub].code)
        rerender()
      }
    }
    window.addEventListener('keydown', handler)
    const clock = window.setInterval(rerender, 500)
    return () => {
      window.removeEventListener('keydown', handler)
      window.clearInterval(clock)
    }
  }, [])

  const secs = startT.current ? Math.floor((Date.now() - startT.current) / 1000) : 0
  const cpm = startT.current ? Math.round(pos.current / (secs / 60 + 1e-9)) : 0
  const acc = tot.current ? Math.round(((tot.current - errs.current) / tot.current) * 100) : 100
  const net = Math.round((cpm * acc) / 100)
  const timeText = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`

  return {
    targets: targets.current,
    pos: pos.current,
    sub: sub.current,
    errs: errs.current,
    tot: tot.current,
    cpm,
    acc,
    net,
    timeText,
  }
}
