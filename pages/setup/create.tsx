import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Breadcrumb } from '@/components/breadcrumb'
import { Form } from '@/components/form'
import { Button } from '@/components/button'
import Link from 'next/link'

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(validationSchema), mode: 'onTouched' })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="flex flex-col px-8 mt-10">
      <Breadcrumb
        activeIndex={0}
        paths={['create account', 'exceptional wines', 'wines catalog']}
      />
      <h1 className="text-2xl font-semibold mt-7">let&apos;s get started 🍷</h1>
      <form onSubmit={onSubmit}>
        <div className="mt-10 max-w-sm">
          <Form.TextField
            placeholder="Enter your email"
            fullWidth
            {...register('email')}
          />
          <Form.HelperMessage show={!!errors.email}>
            {errors.email?.message?.toString()}
          </Form.HelperMessage>
        </div>
        <div className="mt-10">
          <Button type="submit" disabled={!isValid}>
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}

Create.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <nav className="py-5 px-8">
        <Link href="/" className="text-red-900 text-2xl font-bold">
          Wine Co.
        </Link>
      </nav>
      <div className="hidden fixed h-full top-0 right-0 bg-slate-100 md:block md:w-64 lg:w-[374px]" />
      <main>{page}</main>
    </>
  )
}
