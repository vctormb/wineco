import { setup, screen } from '@/test-utils/setup'
import ExceptionalWinesPage from '@/pages/setup/exceptional-wines'

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { email: 'lead@email.com' },
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }
    }),
  }
})

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const router = { push: jest.fn() }

describe('ExceptionalWinesPage', () => {
  beforeEach(() => {
    useRouter.mockReturnValue(router)
  })

  it('should add and remove items from cart properly', async () => {
    const { user } = setup(<ExceptionalWinesPage />)

    await user.click(
      screen.getByRole('button', {
        name: 'Add Chateau Lafite Rothschild Pauillac, 2018 to cart',
      })
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Add Penfolds Cabernet-Shiraz Bin 389, 2019 to cart',
      })
    )

    expect(
      screen.getByRole('button', {
        name: 'Add 2 wines to cart',
      })
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Remove Penfolds Cabernet-Shiraz Bin 389, 2019 from cart',
      })
    )

    expect(
      screen.getByRole('button', {
        name: 'Add 1 wines to cart',
      })
    ).toBeInTheDocument()
  })
})
