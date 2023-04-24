import { setup, screen } from '@/test-utils/setup'
import { CreateAccountStepTwo } from './create-account-step-two'
import { Stepper } from '@/components/stepper'

describe('CreateAccountStepTwo', () => {
  it('should submit the form properly', async () => {
    const onNextMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepTwo leadEmail="lead@email.com" onNext={onNextMock} />
      </Stepper.Root>
    )

    const option = screen.getByLabelText('Advanced')

    await user.click(option)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onNextMock).toHaveBeenNthCalledWith(1, {
      wineExperience: 'level5',
    })
  })
})
