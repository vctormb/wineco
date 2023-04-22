import { AnchorHTMLAttributes } from 'react'
import Link, { LinkProps } from 'next/link'
import { VariantProps } from 'class-variance-authority'
import { buttonStyles } from './button'

type Props = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonStyles>

export function ButtonLink({ size, color, variant, ...props }: Props) {
  return (
    <Link
      {...props}
      className={buttonStyles({
        size,
        color,
        variant,
      })}
    />
  )
}
