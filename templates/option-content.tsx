import { HTMLAttributes } from 'react'

export function OptionContent(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex items-center border border-neutral-300 py-3 px-5 rounded-lg"
      {...props}
    />
  )
}
