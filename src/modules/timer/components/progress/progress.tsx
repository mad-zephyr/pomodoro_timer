import { Countdown } from '@bradgarropy/use-countdown'
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'

type TProgress = {
  className?: string
  countdown: Countdown
  initialTimer: number
  color: string
}

const MINUTE = 60
const GAP = 1.2

export const Progress: FC<TProgress> = ({
  className,
  countdown,
  initialTimer,
  color,
}) => {
  const [progress, setProgress] = useState(0)
  const { isActive, minutes, seconds, isRunning } = countdown

  useEffect(() => {
    if (isActive) {
      const secondsLeft = minutes * MINUTE + seconds - GAP
      const progress = 1 - secondsLeft / (initialTimer * MINUTE)
      setProgress(progress)
    } else {
      setProgress(0)
    }
  }, [initialTimer, isActive, minutes, seconds])

  return (
    <motion.svg
      className={className}
      width="324"
      height="324"
      viewBox="0 0 324 324"
      fill="none"
    >
      {isRunning && (
        <motion.circle
          cx="162"
          cy="162"
          r="156"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ ease: 'linear', duration: 1 }}
          stroke={`var(--color-${color})`}
          strokeWidth="12"
          strokeLinecap="round"
        />
      )}
      <circle
        cx="162"
        cy="162"
        r="156"
        stroke="rgba(215, 224, 255, 0.07)"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}
