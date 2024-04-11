'use client'

import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

// import useCountdown from '@bradgarropy/use-countdown'

export const TestView = () => {
  //   const countdown = useCountdown({
  //     minutes: 0,
  //     seconds: 10,
  //     format: 'mm:ss',
  //     autoStart: false,
  //     onCompleted: () => console.log('onCompleted'),
  //   })

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 10,
      intervalMs: 1000,

      //   isIncrement: true,
    })

  useEffect(() => {
    if (count === 0) {
      console.log('COMPLETED')
    }
  }, [count])

  const onStart = () => {
    // countdown.start()
    startCountdown()
  }

  const onPause = () => {
    // countdown.pause()
    stopCountdown()
  }

  const onResume = () => {
    // countdown.resume()
    resetCountdown()
  }

  const onReset = () => {
    // countdown.reset()
    resetCountdown()
  }

  const onResetChange = () => {
    // countdown.reset({ minutes: 2, seconds: 0 })
    resetCountdown()
  }

  return (
    <>
      <h1>⏳ useCountdown hook</h1>
      <h2>{count}</h2>
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onResume}>Resume</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onResetChange}>Reset to 2:00</button>
      <pre>{JSON.stringify(count, null, 2)}</pre>
    </>
  )
}
