import { setup, screen, within } from '@/test-utils/setup'
import CreatePage from '@/pages/setup/create'
import { signIn } from 'next-auth/react'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const router = { push: jest.fn() }

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  return {
    __esModule: true,
    ...originalModule,
    signIn: jest.fn(() => {}),
  }
})

describe('Create Page', () => {
  beforeEach(() => {
    useRouter.mockReturnValue(router)
    global.fetch = jest.fn().mockReturnValue({ json: () => ({}) })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should submit the funnel form properly', async () => {
    const { user } = setup(<CreatePage />)

    // step 1
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const email = 'lead@email.com'

    await user.type(emailInput, email)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    // step 2
    const stepTwoOption = screen.getByLabelText('Advanced')

    await user.click(stepTwoOption)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    // step 3
    const stepThreeOption = screen.getByLabelText('Often')

    await user.click(stepThreeOption)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    // step 4
    const stepFourOption1 = screen.getByLabelText('Merlot')
    const stepFourOption2 = screen.getByLabelText('Chardonnay')

    await user.click(stepFourOption1)
    await user.click(stepFourOption2)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    // step 5
    const stepFiveOption = screen.getByLabelText('Dry Wine')

    await user.click(stepFiveOption)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    // step 6
    const stepSixOption1 = screen.getByLabelText('Vegeterian')
    const stepSixOption2 = screen.getByLabelText('Salmon')

    await user.click(stepSixOption1)
    await user.click(stepSixOption2)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    // step 7
    const yourEmailIs = within(screen.getByTestId('leadEmail'))
    expect(yourEmailIs.getByText('lead@email.com')).toBeInTheDocument()

    const fullNameInput = screen.getByPlaceholderText('Enter your full name')
    const passwordInput = screen.getByPlaceholderText('Enter your new password')

    const fullName = 'George Harrison'
    const password = '123456'

    await user.type(fullNameInput, fullName)
    await user.type(passwordInput, password)

    await user.click(
      screen.getByRole('button', { name: 'Submit and go to exceptional wines' })
    )

    expect(fetch).toHaveBeenCalledWith('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
      }),
    })

    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'lead@email.com',
      password: '123456',
      redirect: false,
    })
  })
})
