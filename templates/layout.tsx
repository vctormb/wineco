import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <nav className="flex justify-between">
        Wine Co.
        <div>About us Products Our Blog Wine Quiz</div>
        <div>Sign Up Log In</div>
      </nav>
      <main>{children}</main>
    </>
  )
}
