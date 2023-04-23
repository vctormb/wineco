import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/button'
import { Form } from '@/components/form'
import { useStepperContext } from '@/components/stepper'
import { zodResolver } from '@hookform/resolvers/zod'
import { MIXPANEL } from '@/utils/mixpanel'

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

type FormFields = z.infer<typeof validationSchema>
type Props = {
  onNext: (data: FormFields) => void
}

export function CreateAccountStepOne({ onNext }: Props) {
  const stepper = useStepperContext()
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

    onNext(data)
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
