import type { HistoryEntry } from '../types'

const KEY = 'jisTutor'

interface Store {
  done?: number[]
  history?: HistoryEntry[]
  startStage?: number
  weak?: Record<string, { n: number; t: number } | number>
  stageDone?: Record<number, Record<string, boolean>>
  minCpm?: number
}

export function load(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') || {}
  } catch {
    return {}
  }
}

export function save(partial: Partial<Store>): void {
  const d = load()
  Object.assign(d, partial)
  localStorage.setItem(KEY, JSON.stringify(d))
}

export function markedDone(): number[] {
  return load().done || []
}

export function markDone(si: number): void {
  const d = load()
  const arr = d.done ? d.done.slice() : []
  if (!arr.includes(si)) arr.push(si)
  d.done = arr
  save(d)
}

export function startStage(): number {
  return load().startStage || 0
}

export function setStartStage(si: number): void {
  save({ startStage: si })
}

export function history(): HistoryEntry[] {
  const h = load().history
  return Array.isArray(h) ? h : []
}

export function recordHistory(entry: HistoryEntry): void {
  const d = load()
  const h = Array.isArray(d.history) ? d.history : []
  h.push(entry)
  if (h.length > 200) h.splice(0, h.length - 200)
  d.history = h
  save(d)
}

export function loadStageDone(): Record<number, Record<string, boolean>> {
  return load().stageDone || {}
}

export function setStageDrillDone(stage: number, drill: string): Record<number, Record<string, boolean>> {
  const d = load()
  const sd = d.stageDone || {}
  const st = sd[stage] || {}
  st[drill] = true
  sd[stage] = st
  save({ stageDone: sd })
  return sd
}

export function loadMinCpm(): number {
  return load().minCpm ?? 12
}

export function setMinCpm(v: number): void {
  save({ minCpm: v })
}
