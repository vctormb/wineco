import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { useStepperContext } from '@/components/stepper'
import { OptionContent } from './option-content'
import { RadioGroup } from '@/components/radio-group'
import { MIXPANEL } from '@/utils/mixpanel'
import { useAtomValue } from 'jotai'
import { leadEmailAtom } from '@/pages/setup/create'

const validationSchema = z.object({
  sweetOrDryWine: z.string(),
})

type FormFields = z.infer<typeof validationSchema>

export function CreateAccountStepFive() {
  const leadEmail = useAtomValue(leadEmailAtom)

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
    MIXPANEL.track({
      eventName: 'Provided Sweet or Dry Wine from Create Acc',
      properties: {
        distinct_id: leadEmail,
        'Sweet Or Dry Wine': data.sweetOrDryWine,
      },
    })
    stepper.setStep('step6')
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">
        do you like sweet or dry Wine?
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mt-10 max-w-sm">
          <Controller
            control={control}
            name="sweetOrDryWine"
            render={({ field: { onChange, value, ref } }) => {
              return (
                <RadioGroup.Root
                  ref={ref}
                  name="sweetOrDryWine"
                  onValueChange={onChange}
                  value={value}
                  aria-label="Sweet or dry wine"
                >
                  <OptionContent>
                    <RadioGroup.Item value="sweetWine" id="r1" />
                    <RadioGroup.Label htmlFor="r1">Sweet Wine</RadioGroup.Label>
                  </OptionContent>
                  <OptionContent>
                    <RadioGroup.Item value="dryWine" id="r2" />
                    <RadioGroup.Label htmlFor="r2">Dry Wine</RadioGroup.Label>
                  </OptionContent>
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
