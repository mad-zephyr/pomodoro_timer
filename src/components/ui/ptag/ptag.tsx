import { FC } from 'react'
import cn from 'classnames'

import { TPtag } from './ptag.props'
import styles from './ptag.module.sass'

export const Ptag: FC<TPtag> = ({ text, size, ...props }) => {
  return (
    <p
      className={cn(styles.body, {
        [styles.body_one]: size === 'one',
        [styles.body_two]: size === 'two',
      })}
      {...props}
    >
      {text}
    </p>
  )
}
