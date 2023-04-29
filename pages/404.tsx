import { Footer } from '@/templates/footer'
import { Navbar } from '@/templates/navbar'
import Head from 'next/head'
import { ReactElement } from 'react'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="flex justify-center items-center min-h-[90vh]">
        <h1 className="text-2xl font-semibold">Page Not Found 👀</h1>
      </div>
    </>
  )
}

Custom404.getLayout = (page: ReactElement) => {
  return (
    <>
      <Navbar />
      <main>{page}</main>
      <Footer />
    </>
  )
}
