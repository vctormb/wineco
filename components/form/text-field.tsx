import { VariantProps, cva } from 'class-variance-authority'
import { InputHTMLAttributes, forwardRef } from 'react'

export const inputStyles = cva(
  'px-4 py-3 border border-neutral-300 rounded-lg placeholder:text-neutral-300 ring-red-900',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
      },
    },
  }
)

type Props = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStyles>

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ fullWidth, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={inputStyles({
          fullWidth,
        })}
      />
    )
  }
)

TextField.displayName = 'TextField'
