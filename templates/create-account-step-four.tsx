import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { useStepperContext } from '@/components/stepper'
import { OptionContent } from './option-content'
import { Checkbox } from '@/components/checkbox'
import { MIXPANEL } from '@/utils/mixpanel'
import { leadEmailAtom } from '@/pages/setup/create'
import { useAtomValue } from 'jotai'

const validationSchema = z.object({
  favoriteTypeWine: z.array(z.string()).nonempty(),
})

type FormFields = z.infer<typeof validationSchema>

const options = [
  {
    label: 'Cabernet Sauvignon',
    value: 'cabernetSauvignon',
  },
  {
    label: 'Merlot',
    value: 'merlot',
  },
  {
    label: 'Chardonnay',
    value: 'chardonnay',
  },
  {
    label: 'Sauvignon Blanc',
    value: 'sauvignonBlanc',
  },
  {
    label: 'Pinot Grigio',
    value: 'pinotGrigio',
  },
  {
    label: 'Pinot Noir',
    value: 'pinotNoir',
  },
]

export function CreateAccountStepFour() {
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
      favoriteTypeWine: [],
    },
  })

  const onSubmit = handleSubmit((data) => {
    MIXPANEL.track({
      eventName: 'Provided Favorite Type Wine from Create Acc',
      properties: {
        distinct_id: leadEmail,
        'Favorite Type Wine': data.favoriteTypeWine,
      },
    })
    stepper.setStep('step5')
  })

  return (
    <>
      <h1 className="text-2xl font-semibold mt-7">
        {"what's your favorite types of Wine?"}
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mt-10 max-w-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[repeat(2,_minmax(16rem,_1fr))] gap-2">
            <Controller
              control={control}
              name="favoriteTypeWine"
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
