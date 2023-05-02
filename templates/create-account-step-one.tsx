import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/button'
import { Form } from '@/components/form'
import { useStepperContext } from '@/components/stepper'
import { zodResolver } from '@hookform/resolvers/zod'
import { MIXPANEL } from '@/utils/mixpanel'
import { useSetAtom } from 'jotai'
import { leadEmailAtom } from '@/pages/setup/create'

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

type FormFields = z.infer<typeof validationSchema>

export function CreateAccountStepOne() {
  const stepper = useStepperContext()
  const setEmail = useSetAtom(leadEmailAtom)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit((data) => {
    MIXPANEL.track({
      eventName: 'Provided email from Create Acc',
      properties: {
        distinct_id: data.email,
      },
    })
    setEmail(data.email)
    stepper.setStep('step2')
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">{"let's get started 🍷"}</h1>
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
    </>
  )
}
