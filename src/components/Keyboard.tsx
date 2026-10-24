import { FC, K, keyboardRowOrder } from '../data/keyMap'
import { useI18n } from '../i18n'
import type { Finger } from '../types'

const FINGERS: Finger[] = ['LP', 'LR', 'LM', 'LI', 'RI', 'RM', 'RR', 'RP']

interface Props {
  activeCode?: string | null
  showFinger?: boolean
}

export function Keyboard({ activeCode = null, showFinger = true }: Props) {
  const { fingerName } = useI18n()
  const af = activeCode && K[activeCode] ? K[activeCode].f : null

  return (
    <div className="kb">
      {keyboardRowOrder().map((row, i) => (
        <div className="kbrow" key={i}>
          {row.map((code) => {
            const k = K[code]
            if (!k) return null
            const cls = ['key']
            if (k.home) cls.push('home')
            if (activeCode === code) cls.push('active')
            return (
              <div key={code} id={'key-' + code} className={cls.join(' ')}>
                <span className="fingerbar" style={{ background: showFinger ? FC[k.f] : 'transparent' }} />
                <span className="latin">{k.latin}</span>
                <span className="kana">{k.kana}</span>
                {showFinger && <span className="fingerdot" style={{ background: FC[k.f] }} />}
              </div>
            )
          })}
        </div>
      ))}
      {showFinger && (
        <div className="fingerlegend">
          {FINGERS.map((f) => (
            <span key={f} className={'fpill' + (af === f ? ' act' : '')} style={{ color: FC[f] }}>
              <i className="fdot" style={{ background: FC[f] }} />
              {fingerName(f)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
