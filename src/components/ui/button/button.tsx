import { FC } from 'react'
import cn from 'classnames'

import { TButton } from './button.props'
import styles from './button.module.sass'

export const Button: FC<TButton> = ({
  text,
  type,
  size,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(styles.btn, className, {
        [styles.primary]: type === 'primary',
        [styles.ghost]: type === 'gost',
        [styles.shrink]: size === 'shrink',
      })}
      {...props}
    >
      {text}
    </button>
  )
}
