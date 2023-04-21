import Home from './pages/index'
import { screen, setup } from './test-utils/setup'

describe('Home', () => {
  it('render properly', () => {
    setup(<Home />)

    expect(screen.getByText('hello world')).toBeInTheDocument()
  })
})
