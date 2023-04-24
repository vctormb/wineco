import { setup, screen } from '@/test-utils/setup'
import { CreateAccountStepFour } from './create-account-step-four'
import { Stepper } from '@/components/stepper'

describe('CreateAccountStepFour', () => {
  it('should submit the form properly', async () => {
    const onNextMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepFour leadEmail="lead@email.com" onNext={onNextMock} />
      </Stepper.Root>
    )

    const option1 = screen.getByLabelText('Merlot')
    const option2 = screen.getByLabelText('Chardonnay')

    await user.click(option1)
    await user.click(option2)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onNextMock).toHaveBeenNthCalledWith(1, {
      favoriteTypeWine: ['merlot', 'chardonnay'],
    })
  })
})
