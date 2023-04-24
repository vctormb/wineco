import '@/styles/globals.css'
import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Auth, TOKEN_EXP_TWO_HOURS_ONE_MINUTE } from '@/templates/auth'
import { Layout } from '@/templates/layout'
import { MIXPANEL } from '@/utils/mixpanel'

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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  useEffect(() => {
    MIXPANEL.init()
  }, [])

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
      <SessionProvider
        session={session}
        refetchInterval={TOKEN_EXP_TWO_HOURS_ONE_MINUTE}
      >
        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
      </SessionProvider>
    </>
  )
}
