import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

type ButtonProps = {
  size?: 'sm' | 'md'
  color?: 'primary' | 'yellow' | 'white'
  variant?: 'solid' | 'ghost' | 'outline'
}

type Props = ButtonProps & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

export function ButtonLink({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={clsx('rounded-lg border', {
        // size
        'px-8 py-3': size === 'md',
        'px-4 py-2 text-sm': size === 'sm',
        // variant solid
        'border-transparent bg-yellow-100 text-neutral-700':
          variant === 'solid' && color === 'yellow',
        'bg-white border-neutral-300 text-neutral-700': variant === 'solid' && color === 'white',
        'bg-red-900': variant === 'solid' && color === 'primary',
        // variant ghost
        'text-white bg-transparent border-transparent': variant === 'ghost' && color === 'white',
      })}
    />
  )
}
