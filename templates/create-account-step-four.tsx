import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/button'
import { useStepperContext } from '@/components/stepper'
import { OptionContent } from './option-content'
import { Checkbox } from '@/components/checkbox'

const validationSchema = z.object({
  cabernetSauvignon: z.boolean(),
})

type FormFields = z.infer<typeof validationSchema>
type Props = {
  onNext: (data: FormFields) => void
}

export function CreateAccountStepFour({ onNext }: Props) {
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
              name="cabernetSauvignon"
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <OptionContent>
                    <Checkbox.Root
                      id="c1"
                      ref={ref}
                      name="cabernetSauvignon"
                      onCheckedChange={onChange}
                      checked={value}
                      aria-label="Cabernet Sauvignon"
                    >
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Checkbox.Label htmlFor="c1">
                      Cabernet Sauvignon
                    </Checkbox.Label>
                  </OptionContent>
                )
              }}
            />
            <Controller
              control={control}
              name="cabernetSauvignon"
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <OptionContent>
                    <Checkbox.Root
                      id="c1"
                      ref={ref}
                      name="cabernetSauvignon"
                      onCheckedChange={onChange}
                      checked={value}
                      aria-label="Cabernet Sauvignon"
                    >
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Checkbox.Label htmlFor="c1">
                      Cabernet Sauvignon
                    </Checkbox.Label>
                  </OptionContent>
                )
              }}
            />
            <Controller
              control={control}
              name="cabernetSauvignon"
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <OptionContent>
                    <Checkbox.Root
                      id="c1"
                      ref={ref}
                      name="cabernetSauvignon"
                      onCheckedChange={onChange}
                      checked={value}
                      aria-label="Cabernet Sauvignon"
                    >
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Checkbox.Label htmlFor="c1">
                      Cabernet Sauvignon
                    </Checkbox.Label>
                  </OptionContent>
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
