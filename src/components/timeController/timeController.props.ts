import { ReactElement } from 'react'

export type TTimeController = {
  name: string
  label: string
  value?: number
  classNames?: string
  onIncrease: (name: string) => void
  onDicrease: (name: string) => void
  onChangeInput: (data: { value: number | string; name: string }) => void
  children?: ReactElement
}
