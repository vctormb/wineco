import { screen, setup } from '@/test-utils/setup'
import { Button } from './button'

describe('Button', () => {
  it('should render propely', () => {
    setup(<Button>click me</Button>)

    const buttonElement = screen.getByRole('button', { name: 'click me' })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).not.toHaveAttribute('disabled')
  })

  it('should show loading state properly', () => {
    setup(<Button isLoading>click me</Button>)

    expect(
      screen.queryByRole('button', { name: 'click me' })
    ).not.toBeInTheDocument()

    const buttonElement = screen.getByRole('button', { name: 'Loading...' })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveAttribute('disabled')
  })
})
