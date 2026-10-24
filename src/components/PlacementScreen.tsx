import { useTyping } from '../hooks/useTyping'
import { PLACE } from '../data/stages'
import { Keyboard } from './Keyboard'
import { setStartStage } from '../lib/storage'
import { useI18n } from '../i18n'
import type { TypingResult } from '../types'

interface Props {
  onComplete: (rec: number) => void
  onCancel: () => void
  onMiss?: (code: string) => void
}

export function PlacementScreen({ onComplete, onCancel, onMiss }: Props) {
  const { t } = useI18n()
  const typing = useTyping(PLACE, (r: TypingResult) => {
    const rec = r.acc >= 98 ? 10 : r.acc >= 95 ? 5 : r.acc >= 88 ? 2 : 0
    setStartStage(rec)
    onComplete(rec)
  }, onMiss)
  const cur = typing.targets[typing.pos]
  const need = cur ? cur.keys[typing.sub] : null

  return (
    <div>
      <div className="banner">{t('place.banner')}</div>
      <div className="target">
        {typing.targets.map((tc, i) => {
          const cls = ['tchar']
          if (i < typing.pos) cls.push('done')
          if (i === typing.pos) cls.push('cur')
          return (
            <span key={i} className={cls.join(' ')}>
              {tc.char}
            </span>
          )
        })}
      </div>
      <div className="hint">{need ? `${t('hint.next')} ${need.kana}` : ''}</div>
      <Keyboard activeCode={need ? need.code : null} />
      <div className="row" style={{ marginTop: 6 }}>
        <button className="btn ghost" onClick={onCancel}>{t('btn.cancel')}</button>
      </div>
    </div>
  )
}
