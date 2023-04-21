import { ReactElement } from 'react'

export default function Create() {
  return <div className="flex">create account</div>
}

Create.getLayout = function getLayout(page: ReactElement) {
  return <main>{page}</main>
}
