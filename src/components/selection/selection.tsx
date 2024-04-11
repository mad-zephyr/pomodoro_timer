import { FC } from 'react'

import { SelectionItem } from './components/selection-item/selection-item'
import type { TSelection } from './selection.props'
import styles from './selection.module.sass'

export const Selection: FC<TSelection> = ({ items, type, style, onChange }) => {
  return (
    <div className={styles.main}>
      {items.map((item, index) => (
        <SelectionItem
          key={index}
          checked={item.version === style[type]}
          version={item.version}
          content={item.content}
          type={type}
          onCheck={onChange}
        />
      ))}
    </div>
  )
}
