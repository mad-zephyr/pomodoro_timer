import { FC } from 'react'
import cn from 'classnames'

import { Icon } from '../icon/icon'
import styles from './TimeController.module.sass'
import { Input } from '../ui'
import { TTimeController } from './timeController.props'

const ICON_PROPS = {
  width: '14',
  height: '7',
  viewBox: '0 0 14 7',
}

export const TimeController: FC<TTimeController> = ({
  name,
  value,
  children,
  onIncrease,
  onDicrease,
  onChangeInput,
  classNames,
  label,
  ...props
}) => {
  const handleIncrease = () => {
    onIncrease(name)
  }
  const handleDicrease = () => {
    onDicrease(name)
  }

  return (
    <div className={cn(styles.main, classNames)} {...props}>
      <label>{label}</label>

      <div className={styles.container}>
        <Input
          name={name}
          value={value}
          type="number"
          onChangeInput={onChangeInput}
        />

        <div className={styles.controller}>
          <div className={styles.btn} onClick={handleIncrease}>
            <Icon name="arrow_up" {...ICON_PROPS} />
          </div>
          <div className={styles.btn} onClick={handleDicrease}>
            <Icon name="arrow_down" {...ICON_PROPS} />
          </div>
        </div>
      </div>
    </div>
  )
}
