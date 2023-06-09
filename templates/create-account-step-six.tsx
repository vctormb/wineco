import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { useStepperContext } from '@/components/stepper'
import { OptionContent } from './option-content'
import { Checkbox } from '@/components/checkbox'
import { MIXPANEL } from '@/utils/mixpanel'
import { useAtomValue } from 'jotai'
import { leadEmailAtom } from '@/pages/setup/create'

const validationSchema = z.object({
  typeOfFoodEnjoy: z.array(z.string()).nonempty(),
})

type FormFields = z.infer<typeof validationSchema>

const options = [
  {
    label: 'Steak',
    value: 'steak',
  },
  {
    label: 'Chicken',
    value: 'chicken',
  },
  {
    label: 'Salmon',
    value: 'salmon',
  },
  {
    label: 'Lamb',
    value: 'lamb',
  },
  {
    label: 'Vegeterian',
    value: 'vegeterian',
  },
]

export function CreateAccountStepSix() {
  const leadEmail = useAtomValue(leadEmailAtom)
  const stepper = useStepperContext()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      typeOfFoodEnjoy: [],
    },
  })

  const onSubmit = handleSubmit((data) => {
    MIXPANEL.track({
      eventName: 'Provided Type Food from Create Acc',
      properties: {
        distinct_id: leadEmail,
        'Type Of Food Enjoy': data.typeOfFoodEnjoy,
      },
    })
    stepper.setStep('step7')
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">
        what type of foods do you enjoy?
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mt-10 max-w-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[repeat(2,_minmax(16rem,_1fr))] gap-2">
            <Controller
              control={control}
              name="typeOfFoodEnjoy"
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    {options.map((option) => (
                      <OptionContent key={option.value}>
                        <Checkbox.Root
                          aria-label={option.label}
                          id={`c-${option.value}`}
                          checked={value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              onChange([...value, option.value])
                            } else {
                              onChange(
                                value.filter(
                                  (oldVal) => oldVal !== option.value
                                )
                              )
                            }
                          }}
                        >
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <Checkbox.Label htmlFor={`c-${option.value}`}>
                          {option.label}
                        </Checkbox.Label>
                      </OptionContent>
                    ))}
                  </>
                )
              }}
            />
          </div>
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
