import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { RadioGroup } from '@/components/radio-group'
import { useStepperContext } from '@/components/stepper'

const validationSchema = z.object({
  foodExperience: z.string(),
})

type FormFields = z.infer<typeof validationSchema>
type Props = {
  onNext: (data: FormFields) => void
}

export function CreateAccountStepTwo({ onNext }: Props) {
  const stepper = useStepperContext()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit((data) => {
    onNext(data)
    stepper.setStep('step3')
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">
        {"what's your prior experience with Wine?"}
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mt-10 max-w-sm">
          <Controller
            control={control}
            name="foodExperience"
            render={({ field: { onChange, value, ref } }) => {
              return (
                <RadioGroup.Root
                  ref={ref}
                  name="foodExperience"
                  onValueChange={onChange}
                  value={value}
                  aria-label="Wine experience"
                >
                  <RadioGroup.Content>
                    <RadioGroup.Item value="level1" id="r1" />
                    <RadioGroup.Label htmlFor="r1">
                      {"I'm new to wine"}
                    </RadioGroup.Label>
                  </RadioGroup.Content>
                  <RadioGroup.Content>
                    <RadioGroup.Item value="level2" id="r2" />
                    <RadioGroup.Label htmlFor="r2">
                      {"I don't have too much experience"}
                    </RadioGroup.Label>
                  </RadioGroup.Content>
                  <RadioGroup.Content>
                    <RadioGroup.Item value="level3" id="r3" />
                    <RadioGroup.Label htmlFor="r3">
                      {'Mid level'}
                    </RadioGroup.Label>
                  </RadioGroup.Content>
                  <RadioGroup.Content>
                    <RadioGroup.Item value="level4" id="r4" />
                    <RadioGroup.Label htmlFor="r4">
                      {'Experienced'}
                    </RadioGroup.Label>
                  </RadioGroup.Content>
                  <RadioGroup.Content>
                    <RadioGroup.Item value="level5" id="r5" />
                    <RadioGroup.Label htmlFor="r5">
                      {'Advanced'}
                    </RadioGroup.Label>
                  </RadioGroup.Content>
                </RadioGroup.Root>
              )
            }}
          />
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
