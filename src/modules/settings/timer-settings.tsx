import { FC, useRef, useState } from 'react'
import cn from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'

import { Icon } from '@/components/icon/icon'
import { Button, Selection, TimeController } from '@/components'
import { useAppStore } from '@/context/app.context'
import type { TStyle, TTimer } from '@/context/app.context'
import type {
  TColorVersion,
  TFontVersion,
  TSectionItem,
} from '@/components/selection/components/selection-item/selection-item.props'

import type { TTimerSettings } from './timer-settings.props'
import styles from './styles.module.sass'

const SELECTION_FONTS: Omit<TSectionItem, 'onCheck'>[] = [
  { checked: true, version: 'font-family', content: 'Aa', type: 'font' },
  { checked: false, version: 'second-family', content: 'Aa', type: 'font' },
  { checked: false, version: 'third-family', content: 'Aa', type: 'font' },
]

const SELECTION_COLORS: Omit<TSectionItem, 'onCheck'>[] = [
  { checked: true, version: 'malibu', type: 'color' },
  { checked: false, version: 'purple', type: 'color' },
  { checked: false, version: 'red', type: 'color' },
]

type TLocalSettings = {
  timer: TTimer
  style: TStyle
}

type TChangeTimerProps = {
  value: number | string
  name: string
}

export const TimerSettings: FC<TTimerSettings> = ({ onCLose }) => {
  const ref = useRef(null)
  const { timer, style, isRunning } = useAppStore((state) => state)
  const { setTimer, setStyle, updateTimerSteps, setTimerBeforeApply } =
    useAppStore.getState()

  const [timerSetting, setTimerSettings] = useState<TLocalSettings>({
    timer,
    style,
  })

  useOnClickOutside(ref, onCLose)

  const handleUpdateSettings = () => {
    setStyle(timerSetting.style)
    updateTimerSteps(timerSetting.timer.cycles)

    isRunning
      ? setTimerBeforeApply(timerSetting.timer)
      : setTimer(timerSetting.timer)

    onCLose()
  }

  const handleChangeTimer = (data: TChangeTimerProps) => {
    const currentValue = Number(data.value)

    setTimerSettings((prevValue) => ({
      ...prevValue,
      timer: {
        ...prevValue.timer,
        [data.name]: currentValue,
      },
    }))
  }

  const handleIncrease = (name: string) => {
    //@ts-ignore
    const currentValue = +timerSetting.timer[name]

    setTimerSettings((prevValue) => ({
      ...prevValue,
      timer: {
        ...prevValue.timer,
        [name]: currentValue + 1,
      },
    }))
  }

  const handleDicrease = (name: string) => {
    //@ts-ignore
    const currentValue = +timerSetting.timer[name]

    setTimerSettings((prevValue) => ({
      ...prevValue,
      timer: {
        ...prevValue.timer,
        [name]: currentValue > 0 ? currentValue - 1 : 0,
      },
    }))
  }

  const handleSelect = (
    version: TFontVersion | TColorVersion,
    type: 'font' | 'color'
  ) => {
    setTimerSettings((prevValue) => ({
      ...prevValue,
      style: {
        ...prevValue.style,
        [type]: version,
      },
    }))
  }

  return (
    <div ref={ref} className={styles.main}>
      <div className={styles.header}>
        <div>Settings</div>
        <Icon name="close" fill={'#D8D8D8'} onClick={onCLose} />
      </div>
      <div className={styles.content}>
        <div className={styles.row}>TIME (MINUTES)</div>
        <div className={cn(styles.row)}>
          <TimeController
            label="pomodoro"
            name={'pomodoro'}
            classNames={styles.input}
            value={timerSetting.timer.pomodoro}
            onChangeInput={handleChangeTimer}
            onIncrease={handleIncrease}
            onDicrease={handleDicrease}
          />
          <TimeController
            label="short"
            name={'short'}
            classNames={styles.input}
            value={timerSetting.timer.short}
            onChangeInput={handleChangeTimer}
            onIncrease={handleIncrease}
            onDicrease={handleDicrease}
          />
          <TimeController
            label="long"
            name={'long'}
            classNames={styles.input}
            value={timerSetting.timer.long}
            onChangeInput={handleChangeTimer}
            onIncrease={handleIncrease}
            onDicrease={handleDicrease}
          />
        </div>
        <hr />

        <div className={styles.row}>CYCLES</div>
        <div className={styles.row}>
          <TimeController
            label="pomodoro"
            name={'cycles'}
            classNames={styles.input}
            value={timerSetting.timer.cycles}
            onChangeInput={handleChangeTimer}
            onIncrease={handleIncrease}
            onDicrease={handleDicrease}
          />
        </div>
        <hr />
        <div className={styles.row}>
          <div>FONT</div>
          <Selection
            type="font"
            items={SELECTION_FONTS}
            style={timerSetting.style}
            onChange={handleSelect}
          />
        </div>
        <hr />
        <div className={styles.row}>
          <div>COLOR</div>
          <Selection
            type="color"
            items={SELECTION_COLORS}
            style={timerSetting.style}
            onChange={handleSelect}
          />
        </div>
      </div>
      <Button
        className={styles.submit}
        onClick={handleUpdateSettings}
        text="Apply"
      />
    </div>
  )
}
