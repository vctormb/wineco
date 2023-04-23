import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/button'
import { Form } from '@/components/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { MIXPANEL } from '@/utils/mixpanel'

const validationSchema = z.object({
  fullName: z.string().min(1, { message: 'Name is required' }),
  password: z.string().min(6, { message: 'Must be 6 or more characters long' }),
})

type FormFields = z.infer<typeof validationSchema>
type Props = {
  leadEmail: string
  onSubmit: (data: FormFields) => void
}

export function CreateAccountStepSeven({
  leadEmail,
  onSubmit: onSubmitProp,
}: Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
  })

  const handleFormSubmit = handleSubmit((data) => {
    MIXPANEL.track({
      eventName: 'Provided Password from Create Acc',
      properties: {
        distinct_id: leadEmail,
        'Full Name': data.fullName,
      },
    })
    onSubmitProp(data)
    router.push('/setup/exceptional-wines')
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">
        {"it's time to create a password"}
      </h1>
      <div className="flex gap-2 items-center my-5 text-sm">
        <p>your email is</p>
        <span className="bg-yellow-100 font-semibold rounded-md px-3 py-1">
          {leadEmail}
        </span>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-3 max-w-xs">
          <div className="w-full">
            <Form.TextField
              placeholder="Enter your full name"
              fullWidth
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
              {...register('password')}
            />
            <Form.HelperMessage show={!!errors.password}>
              {errors.password?.message?.toString()}
            </Form.HelperMessage>
          </div>
        </div>
        <div className="mt-10">
          <Button type="submit" disabled={!isValid}>
            Submit and go to exceptional wines
          </Button>
        </div>
      </form>
    </>
  )
}
