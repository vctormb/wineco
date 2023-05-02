import { ReactElement } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { atom } from 'jotai'
import { Breadcrumb } from '@/components/breadcrumb'
import { Stepper, useStepper } from '@/components/stepper'
import { CreateAccountStepOne } from '@/templates/create-account-step-one'
import { CreateAccountStepTwo } from '@/templates/create-account-step-two'
import { CreateAccountStepThree } from '@/templates/create-account-step-three'
import { CreateAccountStepFour } from '@/templates/create-account-step-four'
import { CreateAccountStepFive } from '@/templates/create-account-step-five'
import { CreateAccountStepSix } from '@/templates/create-account-step-six'
import { CreateAccountStepSeven } from '@/templates/create-account-step-seven'

export const leadEmailAtom = atom<string>('')

export default function Create() {
  const stepper = useStepper({ step: 'step1' })

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
            <CreateAccountStepOne />
          </Stepper.Content>
          <Stepper.Content stepKey="step2">
            <CreateAccountStepTwo />
          </Stepper.Content>
          <Stepper.Content stepKey="step3">
            <CreateAccountStepThree />
          </Stepper.Content>
          <Stepper.Content stepKey="step4">
            <CreateAccountStepFour />
          </Stepper.Content>
          <Stepper.Content stepKey="step5">
            <CreateAccountStepFive />
          </Stepper.Content>
          <Stepper.Content stepKey="step6">
            <CreateAccountStepSix />
          </Stepper.Content>
          <Stepper.Content stepKey="step7">
            <CreateAccountStepSeven />
          </Stepper.Content>
        </Stepper.Root>
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
