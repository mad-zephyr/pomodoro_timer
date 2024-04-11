import { useEffect, useMemo, useState } from 'react'
import useCountdown from '@bradgarropy/use-countdown'

import { useAppStore } from '@/context/app.context'

export const useOwnCountdown = () => {
  const [timerCompleted, setTimerCompleted] = useState(false)
  const [timerUpdated, setTimerUpdated] = useState(false)

  const timerSteps = useAppStore((state) => state.timerSteps)
  const timerStep = useAppStore((state) => state.timerStep)
  const timer = useAppStore((state) => state.timer)
  const isRunning = useAppStore((state) => state.isRunning)
  const timerBeforeApply = useAppStore((state) => state.timerBeforeApply)

  const { setTimerStep, setTimer, clearTimerBeforeApply } =
    useAppStore.getState()

  const currentTimerMinutes = useMemo(
    () => timer[timerSteps[timerStep]],
    [timer, timerStep, timerSteps]
  )

  const initialTimerMinutes = useMemo(
    () => timer[timerSteps[timerStep > 0 ? timerStep : 0]],
    [timer, timerStep, timerSteps]
  )

  const countdown = useCountdown({
    autoStart: false,
    onCompleted: () => {
      setTimerCompleted(true)
    },
  })

  // update timer settings from modal only if timer inactive
  useEffect(() => {
    if (!isRunning && countdown.isInactive) {
      if (timerBeforeApply) {
        setTimer(timerBeforeApply)
        clearTimerBeforeApply()
      }
    }
  }, [
    clearTimerBeforeApply,
    countdown.isInactive,
    isRunning,
    setTimer,
    timerBeforeApply,
  ])

  // reset settings
  useEffect(() => {
    if (!isRunning && countdown.isInactive) {
      countdown.reset({
        minutes: timer[timerSteps[0]],
        seconds: 0,
      })
    }
  }, [countdown, isRunning, timer, timerSteps])

  useEffect(() => {
    if (timerCompleted && !timerUpdated) {
      setTimerStep()
      setTimerUpdated(true)
    }
  }, [timerCompleted, setTimerStep, timerUpdated])

  useEffect(() => {
    if (timerCompleted && timerUpdated) {
      countdown.reset({
        minutes: currentTimerMinutes,
        seconds: 0,
      })
      setTimerCompleted(false)
      setTimerUpdated(false)
    }
    isRunning
      ? countdown.start()
      : countdown.reset({
          minutes: initialTimerMinutes,
          seconds: 0,
        })
  }, [
    countdown,
    currentTimerMinutes,
    initialTimerMinutes,
    isRunning,
    timerCompleted,
    timerUpdated,
  ])

  return {
    currentTimerMinutes,
    countdown,
    remainingTime: countdown.minutes * 60 + countdown.seconds,
  }
}
