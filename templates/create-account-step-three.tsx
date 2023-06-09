import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { RadioGroup } from '@/components/radio-group'
import { useStepperContext } from '@/components/stepper'
import { OptionContent } from './option-content'
import { MIXPANEL } from '@/utils/mixpanel'
import { useAtomValue } from 'jotai'
import { leadEmailAtom } from '@/pages/setup/create'

const validationSchema = z.object({
  oftenDrinkWine: z.string(),
})

type FormFields = z.infer<typeof validationSchema>

export function CreateAccountStepThree() {
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
      eventName: 'Provided Often Drink Wine from Create Acc',
      properties: {
        distinct_id: leadEmail,
        'Often Drink Wine': data.oftenDrinkWine,
      },
    })
    stepper.setStep('step4')
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">
        how often do you drink Wine?
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mt-10 max-w-sm">
          <Controller
            control={control}
            name="oftenDrinkWine"
            render={({ field: { onChange, value, ref } }) => {
              return (
                <RadioGroup.Root
                  ref={ref}
                  name="oftenDrinkWine"
                  onValueChange={onChange}
                  value={value}
                  aria-label="Wine experience"
                >
                  <OptionContent>
                    <RadioGroup.Item value="everyMeal" id="r1" />
                    <RadioGroup.Label htmlFor="r1">Every meal</RadioGroup.Label>
                  </OptionContent>
                  <OptionContent>
                    <RadioGroup.Item value="often" id="r2" />
                    <RadioGroup.Label htmlFor="r2">Often</RadioGroup.Label>
                  </OptionContent>
                  <OptionContent>
                    <RadioGroup.Item value="onlySpecialOccasions" id="r3" />
                    <RadioGroup.Label htmlFor="r3">
                      Only special occasions
                    </RadioGroup.Label>
                  </OptionContent>
                  <OptionContent>
                    <RadioGroup.Item value="rarely" id="r4" />
                    <RadioGroup.Label htmlFor="r4">Rarely</RadioGroup.Label>
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
