import { setup, screen } from '@/test-utils/setup'
import { Stepper } from '@/components/stepper'
import { CreateAccountStepSeven } from './create-account-step-seven'

describe('CreateAccountStepSeven', () => {
  it('should submit the form properly', async () => {
    const onSubmitMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepSeven
          isSubmitting={false}
          leadEmail="lead@email.com"
          onSubmit={onSubmitMock}
        />
      </Stepper.Root>
    )

    const fullNameInput = screen.getByPlaceholderText('Enter your full name')
    const passwordInput = screen.getByPlaceholderText('Enter your new password')

    const fullName = 'George Harrison'
    const password = '123456'

    await user.type(fullNameInput, fullName)
    await user.type(passwordInput, password)

    await user.click(
      screen.getByRole('button', { name: 'Submit and go to exceptional wines' })
    )

    expect(onSubmitMock).toHaveBeenNthCalledWith(1, {
      fullName,
      password,
    })
  })

  it('should show loading text on submit button', async () => {
    const onSubmitMock = jest.fn()

    const { user } = setup(
      <Stepper.Root step="1" setStep={() => {}}>
        <CreateAccountStepSeven
          isSubmitting={true}
          leadEmail="lead@email.com"
          onSubmit={onSubmitMock}
        />
      </Stepper.Root>
    )

    await user.click(screen.getByRole('button', { name: 'Loading...' }))
  })
})
