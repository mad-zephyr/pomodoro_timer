import { ChangeEvent, FC } from 'react'

import { TInput } from './input.props'
import styles from './input.module.sass'

export const Input: FC<TInput> = ({ onChangeInput, ...props }) => {
  const changeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChangeInput({ value: target.value, name: target.name })
  }

  return <input className={styles.input} onChange={changeHandler} {...props} />
}
