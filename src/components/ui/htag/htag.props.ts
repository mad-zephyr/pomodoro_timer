import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface HtagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  size: 'h1' | 'h2' | 'h3' | 'h4'
  text: string
}
