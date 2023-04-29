import { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/breadcrumb'
import { Stepper, useStepper } from '@/components/stepper'
import { CreateAccountStepOne } from '@/templates/create-account-step-one'
import { CreateAccountStepTwo } from '@/templates/create-account-step-two'
import { CreateAccountStepThree } from '@/templates/create-account-step-three'
import { CreateAccountStepFour } from '@/templates/create-account-step-four'
import { CreateAccountStepFive } from '@/templates/create-account-step-five'
import { CreateAccountStepSix } from '@/templates/create-account-step-six'
import { CreateAccountStepSeven } from '@/templates/create-account-step-seven'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { Form } from '@/components/form'
import Head from 'next/head'

export default function Create() {
  const router = useRouter()
  const stepper = useStepper({ step: 'step1' })
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(data: object) {
    const payload = {
      ...data,
      ...formValues,
    }

    setIsSubmitting(true)

    try {
      await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: payload.fullName,
          email: payload.email,
        }),
      })

      const signInResult = await signIn('credentials', {
        email: payload.email,
        password: payload.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setIsSubmitting(false)
        setShowLoginErrorMessage(true)
      } else {
        router.push('/setup/exceptional-wines')
      }
    } catch {
      setIsSubmitting(false)
      setShowLoginErrorMessage(true)
    }
  }

  function onNext(data: object) {
    setFormValues((s) => ({ ...s, ...data }))
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
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
            <CreateAccountStepTwo
              leadEmail={formValues.email}
              onNext={onNext}
            />
          </Stepper.Content>
          <Stepper.Content stepKey="step3">
            <CreateAccountStepThree
              leadEmail={formValues.email}
              onNext={onNext}
            />
          </Stepper.Content>
          <Stepper.Content stepKey="step4">
            <CreateAccountStepFour
              leadEmail={formValues.email}
              onNext={onNext}
            />
          </Stepper.Content>
          <Stepper.Content stepKey="step5">
            <CreateAccountStepFive
              leadEmail={formValues.email}
              onNext={onNext}
            />
          </Stepper.Content>
          <Stepper.Content stepKey="step6">
            <CreateAccountStepSix
              leadEmail={formValues.email}
              onNext={onNext}
            />
          </Stepper.Content>
          <Stepper.Content stepKey="step7">
            <CreateAccountStepSeven
              leadEmail={formValues.email}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
            />
          </Stepper.Content>
        </Stepper.Root>
        <Form.HelperMessage show={showLoginErrorMessage}>
          Something went wrong. Try again.
        </Form.HelperMessage>
      </div>
    </>
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
