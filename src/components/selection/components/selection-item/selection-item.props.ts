export type TFontVersion = 'font-family' | 'second-family' | 'third-family'
export type TColorVersion = 'red' | 'malibu' | 'purple'

export type TSectionItem = {
  checked: boolean
  version: TFontVersion | TColorVersion
  type: 'font' | 'color'
  onCheck: (
    version: TFontVersion | TColorVersion,
    type: 'font' | 'color'
  ) => void
  content?: string
}
