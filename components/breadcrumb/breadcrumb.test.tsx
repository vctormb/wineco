import { screen, setup } from '@/test-utils/setup'
import { Breadcrumb } from './breadcrumb'

describe('Breadcrumb', () => {
  it('should render properly', () => {
    setup(<Breadcrumb paths={['create', 'update', 'delete']} />)

    expect(screen.getByText('create')).toBeInTheDocument()
    expect(screen.getByTestId('arrow-1')).toBeInTheDocument()
    expect(screen.getByText('update')).toBeInTheDocument()
    expect(screen.getByTestId('arrow-2')).toBeInTheDocument()
    expect(screen.getByText('delete')).toBeInTheDocument()
    expect(screen.queryByTestId('arrow-3')).not.toBeInTheDocument()
  })
})
