import cn from 'classnames'
import { FC, SVGProps } from 'react'

type IconsType = {
  [key: string]: string
}

const iconsName: IconsType = {
  arrow_up: 'M1 6L7 2L13 6',
  arrow_down: 'M1 1L7 5L13 1',
  check_arrow: 'M1 5.5L4.95263 9.45263L13.4053 1',
  close:
    'M13.364 2.0502L11.9498 0.635986L7.00001 5.58573L2.05026 0.635986L0.636047 2.0502L5.58579 6.99995L0.636047 11.9497L2.05026 13.3639L7.00001 8.41416L11.9498 13.3639L13.364 11.9497L8.41422 6.99995L13.364 2.0502Z',
}

type IconProps = Partial<SVGProps<SVGSVGElement>> & {
  name: string
  viewBox?: string
  className?: string
  width?: string
  height?: string
  fill?: any
  strokeWidth?: number | string
}

export const Icon: FC<IconProps> = ({
  className,
  name,
  fill = 'none',
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    className={cn(className)}
    width={width}
    height={height}
    viewBox={viewBox}
    fill={fill}
    {...props}
  >
    <path d={iconsName[name]} strokeWidth={strokeWidth} />
  </svg>
)
