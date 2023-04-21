import { ButtonLink } from '@/components/button'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'

type Props = {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
