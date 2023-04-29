import { ButtonLink } from '@/components/button'
import Head from 'next/head'
import { ReactElement } from 'react'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mt-20">
          It should be the login page
        </h1>
        <ButtonLink variant="ghost" href="/">
          {'<'} Home
        </ButtonLink>
      </div>
    </>
  )
}

Login.getLayout = (page: ReactElement) => {
  return <main className="h-full bg-slate-100">{page}</main>
}
