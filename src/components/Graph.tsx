import { useI18n } from '../i18n'
import type { HistoryEntry } from '../types'

export function Graph({ history }: { history: HistoryEntry[] }) {
  const { t } = useI18n()
  if (history.length < 2) {
    return <div style={{ color: 'var(--muted)', fontSize: 13 }}>{t('graph.empty')}</div>
  }
  const recent = history.slice(-30)
  const max = Math.max(...recent.map((x) => x.cpm), 1)
  const n = recent.length
  const x = (i: number) => i * (620 / (n - 1))
  const y = (v: number) => 120 - (v / max) * 100
  const pts = recent.map((e, i) => `${x(i)},${y(e.cpm)}`).join(' ')
  const last = recent[n - 1]
  return (
    <svg viewBox="0 0 620 130" width="100%" height="130">
      <polyline fill="none" stroke="#2f6f5e" strokeWidth="2" points={pts} />
      <circle cx={x(n - 1)} cy={y(last.cpm)} r="3.5" fill="#2f6f5e" />
      <text x="8" y="119" fill="#8b867c" fontSize="11">0</text>
      <text x="8" y="18" fill="#8b867c" fontSize="11">{max} CM</text>
      <text x="300" y="130" fill="#8b867c" fontSize="11" textAnchor="middle">{t('home.prog.count')} →</text>
    </svg>
  )
}
