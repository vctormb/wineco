import { ReactElement } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { Form } from '@/components/form'
import { Button } from '@/components/button/button'

export default function Create() {
  return (
    <div className="flex flex-col px-8 mt-10">
      <Breadcrumb
        activeIndex={0}
        paths={['create account', 'exceptional wines', 'wines catalog']}
      />
      <h1 className="text-2xl font-semibold mt-7">let&apos;s get started 🍷</h1>
      <div className="mt-10 max-w-sm">
        <Form.TextField placeholder="Enter your email" fullWidth />
        <Form.HelperMessage>Invalid email</Form.HelperMessage>
      </div>
      <div className="mt-10">
        <Button>Next</Button>
      </div>
    </div>
  )
}

Create.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <nav className="py-5 px-8">
        <span className="text-red-900 text-2xl font-bold">Wine Co.</span>
      </nav>
      <div className="hidden fixed h-full top-0 right-0 bg-slate-100 md:block md:w-64 lg:w-[374px]" />
      <main>{page}</main>
    </>
  )
}
