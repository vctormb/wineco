import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = {
  size?: 'sm' | 'md'
  color?: 'primary' | 'secondary' | 'white'
  variant?: 'solid' | 'ghost' | 'outline'
}

type Props = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

export const buttonStyles = ({ size, color, variant }: ButtonProps) =>
  clsx('rounded-lg border font-thin', {
    // size
    'px-8 py-3': size === 'md',
    'px-4 py-2 text-sm': size === 'sm',
    // variant solid
    'bg-red-900 text-white': variant === 'solid' && color === 'primary',
    'border-transparent bg-yellow-100 text-neutral-700':
      variant === 'solid' && color === 'secondary',
    'bg-white border-neutral-300 text-neutral-700':
      variant === 'solid' && color === 'white',
    // variant ghost
    'text-white bg-transparent border-transparent':
      variant === 'ghost' && color === 'white',
  })

export function Button({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  ...props
}: Props) {
  return (
    <button
      className={buttonStyles({ size, color, variant })}
      {...props}
    />
  )
}
