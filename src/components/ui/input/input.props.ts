import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type TInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
  onChangeInput: (data: { value: string | string; name: string }) => void
}
