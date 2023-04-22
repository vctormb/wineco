import { screen, setup } from '@/test-utils/setup'
import { HelperMessage } from './helper-message'

describe('HelperMessage', () => {
  it('should show the message', () => {
    setup(<HelperMessage show>message</HelperMessage>)

    expect(screen.getByText('message')).toBeInTheDocument()
  })

  it('should not show the message', () => {
    setup(<HelperMessage>message</HelperMessage>)

    expect(screen.queryByText('message')).not.toBeInTheDocument()
  })
})
