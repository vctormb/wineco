import '@/styles/globals.css'
import { Layout } from '@/templates/layout'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ReactElement, ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  fallback: ['sans-serif'],
  display: 'swap', // minimizes the risk of invisible text or layout shift
  variable: '--font-inter',
})

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
