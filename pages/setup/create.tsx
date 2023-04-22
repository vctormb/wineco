import { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/breadcrumb'
import { Stepper, useStepper } from '@/components/stepper'
import { CreateAccountStepOne } from '@/templates/create-account-step-one'
import { CreateAccountStepTwo } from '@/templates/create-account-step-two'

export default function Create() {
  const stepper = useStepper({ step: 'step1' })
  const [formValues, setFormValues] = useState({})

  function onSubmit(data: object) {
    console.log('data > ', data)
    console.log('formValues', formValues)
  }

  function onNext(data: object) {
    setFormValues((s) => ({ ...s, ...data }))
  }

  return (
    <div className="flex flex-col px-8 mt-10">
      <Breadcrumb
        activeIndex={0}
        paths={['create account', 'exceptional wines', 'wines catalog']}
      />

      <Stepper.Root {...stepper}>
        <Stepper.Content stepKey="step1">
          <CreateAccountStepOne onNext={onNext} />
        </Stepper.Content>
        <Stepper.Content stepKey="step2">
          <CreateAccountStepTwo onNext={onNext} />
        </Stepper.Content>
        <Stepper.Content stepKey="step3">
          step 3
        </Stepper.Content>
      </Stepper.Root>
    </div>
  )
}

Create.getLayout = (page: ReactElement) => {
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
