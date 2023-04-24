import { setup, screen } from '@/test-utils/setup'
import { CreateAccountStepThree } from './create-account-step-three'
import { Stepper } from '@/components/stepper'

describe('CreateAccountStepThree', () => {
  it('should submit the form properly', async () => {
    const onNextMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepThree leadEmail="lead@email.com" onNext={onNextMock} />
      </Stepper.Root>
    )

    const option = screen.getByLabelText('Often')

    await user.click(option)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onNextMock).toHaveBeenNthCalledWith(1, {
      oftenDrinkWine: 'often',
    })
  })
})
