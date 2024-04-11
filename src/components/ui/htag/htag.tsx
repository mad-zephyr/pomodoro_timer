import { FC } from 'react'
import cn from 'classnames'

import { HtagProps } from './htag.props'
import styles from './htag.module.sass'

export const Htag: FC<HtagProps> = ({ size, text, className, ...props }) => {
  switch (size) {
    case 'h1': {
      return (
        <h1 className={cn(styles.h1, className)} {...props}>
          {text}
        </h1>
      )
    }
    case 'h2': {
      return (
        <h2 className={cn(styles.h2, className)} {...props}>
          {text}
        </h2>
      )
    }
    case 'h3': {
      return (
        <h3 className={cn(styles.h3, className)} {...props}>
          {text}
        </h3>
      )
    }
    default: {
      return (
        <h4 className={cn(styles.h4, className)} {...props}>
          {text}
        </h4>
      )
    }
  }
}
