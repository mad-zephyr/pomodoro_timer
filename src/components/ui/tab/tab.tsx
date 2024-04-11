import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import cn from 'classnames'

import { useAppStore } from '@/context/app.context'

import styles from './style.module.sass'

const DEFAULT_BTN = [
  { text: 'pomodoro', active: true, id: 'pomodoro' },
  { text: 'short break', active: false, id: 'short' },
  { text: 'long break', active: false, id: 'long' },
]

type TTabs = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {}

export const Tabs: FC<TTabs> = ({ className, ...props }) => {
  const { style, timerSteps, timerStep } = useAppStore((state) => state)

  const colculateStyle = (
    btn: {
      text: string
      active: boolean
      id: string
    },
    state: string
  ) => ({
    background: state === btn.id ? `var(--color-${style.color})` : '',
    fontFamily: `var(--${style.font})`,
  })

  return (
    <div className={cn(styles.main, className)} {...props}>
      {DEFAULT_BTN.map((btn, i) => (
        <div
          key={i}
          className={cn(styles.tab, {
            [styles.active]: timerSteps[timerStep] === btn.id,
          })}
          style={colculateStyle(btn, timerSteps[timerStep])}
        >
          {btn.text}
        </div>
      ))}
    </div>
  )
}
