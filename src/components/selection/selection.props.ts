import { TStyle } from '@/context/app.context'

import {
  TColorVersion,
  TFontVersion,
  TSectionItem,
} from './components/selection-item/selection-item.props'

export type TSelection = {
  items: Omit<TSectionItem, 'onCheck'>[]
  type: keyof TStyle
  style: TStyle
  onChange: (
    version: TFontVersion | TColorVersion,
    type: 'font' | 'color'
  ) => void
}
