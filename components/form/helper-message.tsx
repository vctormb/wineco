import { ReactNode } from 'react'

type Props = {
  children: ReactNode | string
  show?: boolean
}

export function HelperMessage({ children, show }: Props) {
  if (!show) {
    return null
  }

  return <p className="text-red-900 text-sm mt-2">{children}</p>
}
