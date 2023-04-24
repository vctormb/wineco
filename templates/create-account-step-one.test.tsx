import { setup, screen } from '@/test-utils/setup'
import { CreateAccountStepOne } from './create-account-step-one'
import { Stepper } from '@/components/stepper'

describe('CreateAccountStepOne', () => {
  it('should submit the form properly', async () => {
    const onNextMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepOne onNext={onNextMock} />
      </Stepper.Root>
    )

    const emailInput = screen.getByPlaceholderText('Enter your email')

    const email = 'lead@email.com'

    await user.type(emailInput, email)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onNextMock).toHaveBeenNthCalledWith(1, { email })
  })
})
