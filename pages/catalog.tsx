import { ButtonLink } from '@/components/button'
import { ReactElement } from 'react'

export default function Catalog() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mt-20">
        {"It should be the wine catalog's page"}
      </h1>
      <ButtonLink variant="ghost" href="/">
        {'<'} Home
      </ButtonLink>
    </div>
  )
}

Catalog.getLayout = (page: ReactElement) => {
  return <main className="h-full bg-slate-100">{page}</main>
}
