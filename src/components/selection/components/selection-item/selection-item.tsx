import { FC } from 'react'
import cn from 'classnames'

import { Icon } from '@/components/icon/icon'

import { TSectionItem } from './selection-item.props'
import styles from './selection-item.module.sass'

const ICON_PROPS = {
  width: '15',
  height: '11',
  viewBox: '0 0 15 11',
  stroke: 'var(--color-blue)',
}

export const SelectionItem: FC<TSectionItem> = ({
  checked,
  version,
  content,
  type,
  onCheck,
}) => {
  const checker = !content && checked && (
    <Icon name="check_arrow" {...ICON_PROPS} />
  )

  return (
    <div
      className={cn(styles.main, styles[version], {
        [styles.cheked]: checked,
        [styles.second_family]: version === 'second-family',
        [styles.third_family]: version === 'third-family',
      })}
      onClick={() => onCheck(version, type)}
    >
      {checker || content}
    </div>
  )
}
