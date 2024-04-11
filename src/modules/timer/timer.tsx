import { FC, useCallback } from 'react'
import cn from 'classnames'
import { Countdown } from '@bradgarropy/use-countdown'

import { useAppStore } from '@/context/app.context'

import style from './timer.module.sass'
import { Progress } from './components/progress/progress'

type TTimer = {
  currentMinutes: number
  controls: Countdown
  showTime: string
  remainingTime: number
}

export const Timer: FC<TTimer> = ({ currentMinutes, controls, showTime }) => {
  const timerSteps = useAppStore((state) => state.timerSteps)
  const timerStep = useAppStore((state) => state.timerStep)
  const styletTheme = useAppStore((state) => state.style)
  const isRunning = useAppStore((state) => state.isRunning)

  const { resetTimerStep, setIsRunning } = useAppStore.getState()

  const handleStart = useCallback(() => {
    setIsRunning(true)
  }, [setIsRunning])

  const handleReset = useCallback(() => {
    resetTimerStep()
    setIsRunning(false)
  }, [resetTimerStep, setIsRunning])

  const totalCycles = (timerSteps.length - 1) / 2
  const currentStep = timerSteps[timerStep]

  const currentCycle = ['pomodoro', 'short'].includes(currentStep)
    ? Math.round((timerStep + 1) / 2)
    : Math.round((timerStep + 1) / 2) - 1

  return (
    <div
      className={cn(style.main, {
        ['fontOne']: styletTheme.font === 'font-family',
        ['fontTwo']: styletTheme.font === 'second-family',
        ['fontThree']: styletTheme.font === 'third-family',
      })}
    >
      <div className={style.inner}>
        <div className={style.wrapper}>
          <div
            className={style.cycle}
          >{`${currentCycle} / ${totalCycles}`}</div>
          <div className={style.timer}>{`${showTime}`}</div>
          <div
            className={style.restart}
            onClick={isRunning ? handleReset : handleStart}
          >
            {isRunning ? 'restart' : 'start'}
          </div>
        </div>
        <Progress
          className={style.progress}
          countdown={controls}
          initialTimer={currentMinutes}
          color={styletTheme.color}
        />
      </div>
    </div>
  )
}
