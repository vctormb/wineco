import { ButtonHTMLAttributes } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

export const buttonStyles = cva('rounded-lg border font-thin cursor-pointer', {
  variants: {
    size: {
      sm: 'px-4 py-2 text-sm',
      md: ['px-8', 'py-3'],
    },
    variant: {
      solid: null,
      ghost: 'border-transparent',
    },
    color: {
      primary: null,
      secondary: null,
      white: null,
    },
    disabled: {
      true: 'bg-neutral-300 text-neutral-400 border-transparent',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'primary',
      disabled: false,
      class: 'bg-red-900 text-white',
    },
    {
      variant: 'solid',
      color: 'secondary',
      disabled: false,
      class: 'border-transparent bg-yellow-100 text-neutral-700',
    },
    {
      variant: 'solid',
      color: 'white',
      disabled: false,
      class: 'bg-white border-neutral-300 text-neutral-700',
    },
    {
      variant: 'ghost',
      color: 'white',
      disabled: false,
      class: 'text-white',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
    disabled: false
  },
})

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>

export function Button({ size, color, variant, ...props }: Props) {
  return (
    <button
      {...props}
      className={buttonStyles({
        size,
        color,
        variant,
        disabled: props.disabled,
      })}
    />
  )
}
