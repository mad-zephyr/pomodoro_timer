import { DetailedHTMLFactory, DetailedHTMLProps, HTMLAttributes } from 'react'

export type TPtag = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  text: string
  size: 'one' | 'two'
}
