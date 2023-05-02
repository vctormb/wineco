import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/button'
import { Form } from '@/components/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MIXPANEL } from '@/utils/mixpanel'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { leadEmailAtom } from '@/pages/setup/create'

const validationSchema = z.object({
  fullName: z.string().min(1, { message: 'Name is required' }),
  password: z.string().min(6, { message: 'Must be 6 or more characters long' }),
})

type FormFields = z.infer<typeof validationSchema>

export function CreateAccountStepSeven() {
  const router = useRouter()
  const leadEmail = useAtomValue(leadEmailAtom)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
  })

  const handleFormSubmit = handleSubmit(async (data) => {
    const payload = {
      email: leadEmail,
      ...data,
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
        MIXPANEL.track({
          eventName: 'Provided Password from Create Acc',
          properties: {
            distinct_id: leadEmail,
            'Full Name': data.fullName,
          },
        })

        router.push('/setup/exceptional-wines')
      }
    } catch {
      setIsSubmitting(false)
      setShowLoginErrorMessage(true)
    }
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">
        {"it's time to create a password"}
      </h1>
      <div className="flex gap-2 items-center my-5 text-sm">
        <p>your email is</p>
        <span data-testid="leadEmail" className="bg-yellow-100 font-semibold rounded-md px-3 py-1">
          {leadEmail}
        </span>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-3 max-w-xs">
          <div className="w-full">
            <Form.TextField
              placeholder="Enter your full name"
              fullWidth
              autoComplete="name"
              {...register('fullName')}
            />
            <Form.HelperMessage show={!!errors.fullName}>
              {errors.fullName?.message?.toString()}
            </Form.HelperMessage>
          </div>
          <div className="w-full">
            <Form.TextField
              placeholder="Enter your new password"
              fullWidth
              type="password"
              autoComplete="new-password"
              {...register('password')}
            />
            <Form.HelperMessage show={!!errors.password}>
              {errors.password?.message?.toString()}
            </Form.HelperMessage>
          </div>
        </div>
        <div className="mt-10">
          <Button type="submit" disabled={!isValid} isLoading={isSubmitting}>
            Submit and go to exceptional wines
          </Button>
        </div>
        <Form.HelperMessage show={showLoginErrorMessage}>
          Something went wrong. Try again.
        </Form.HelperMessage>
      </form>
    </>
  )
}
