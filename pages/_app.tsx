import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'
import { Provider as JotaiProvider } from 'jotai'
import { Auth, TOKEN_EXP_TWO_HOURS_ONE_MINUTE } from '@/templates/auth'
import { Layout } from '@/templates/layout'
import { MIXPANEL } from '@/utils/mixpanel'
import { GA_MEASUREMENT_ID } from '@/utils/google-analytics'

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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      <SessionProvider
        session={session}
        refetchInterval={TOKEN_EXP_TWO_HOURS_ONE_MINUTE}
        refetchOnWindowFocus={false}
      >
        <JotaiProvider>
          <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
        </JotaiProvider>
      </SessionProvider>
    </>
  )
}
