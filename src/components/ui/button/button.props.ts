import { DetailedHTMLProps, HTMLAttributes, HtmlHTMLAttributes } from 'react'

export type TButton = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string
  type?: 'primary' | 'gost'
  size?: 'shrink'
}
