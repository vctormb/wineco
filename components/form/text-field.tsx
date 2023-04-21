import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

type Props = {
  fullWidth?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({ fullWidth, ...props }: Props) {
  return (
    <input
      {...props}
      className={clsx(
        'px-4 py-3 border border-neutral-300 rounded-lg placeholder:text-neutral-300 ring-red-900',
        {
          'w-full': fullWidth,
        }
      )}
    />
  )
}
