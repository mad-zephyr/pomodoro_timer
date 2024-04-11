import { FC } from 'react'

import { useOwnCountdown } from '@/hooks/useOwnCountdown/useOwnCountdown'

import { Timer } from '../../timer'

export const TimerWrapper: FC = () => {
  const { countdown, currentTimerMinutes, remainingTime } = useOwnCountdown()

  return (
    <Timer
      currentMinutes={currentTimerMinutes}
      remainingTime={remainingTime}
      controls={countdown}
      showTime={countdown.formatted}
    />
  )
}
