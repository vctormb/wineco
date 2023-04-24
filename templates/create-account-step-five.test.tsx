import { setup, screen } from '@/test-utils/setup'
import { CreateAccountStepFive } from './create-account-step-five'
import { Stepper } from '@/components/stepper'

describe('CreateAccountStepFive', () => {
  it('should submit the form properly', async () => {
    const onNextMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepFive leadEmail="lead@email.com" onNext={onNextMock} />
      </Stepper.Root>
    )

    const option = screen.getByLabelText('Dry Wine')

    await user.click(option)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onNextMock).toHaveBeenNthCalledWith(1, {
      sweetOrDryWine: 'dryWine',
    })
  })
})
