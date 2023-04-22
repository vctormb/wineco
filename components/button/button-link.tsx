import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { ButtonProps, buttonStyles } from './button'

type Props = ButtonProps & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

export function ButtonLink({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  ...props
}: Props) {
  return <Link className={buttonStyles({ size, color, variant })} {...props} />
}
