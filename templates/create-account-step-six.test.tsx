import { setup, screen } from '@/test-utils/setup'
import { CreateAccountStepSix } from './create-account-step-six'
import { Stepper } from '@/components/stepper'

describe('CreateAccountStepSix', () => {
  it('should submit the form properly', async () => {
    const onNextMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepSix leadEmail="lead@email.com" onNext={onNextMock} />
      </Stepper.Root>
    )

    const option1 = screen.getByLabelText('Vegeterian')
    const option2 = screen.getByLabelText('Salmon')

    await user.click(option1)
    await user.click(option2)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onNextMock).toHaveBeenNthCalledWith(1, {
      typeOfFoodEnjoy: ['vegeterian', 'salmon'],
    })
  })
})
