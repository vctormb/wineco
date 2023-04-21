import { ButtonLink } from '@/components/button'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-red-900 py-5 px-8 text-white">
      <span className="text-xl font-semibold">Wine Co.</span>
      <div className="flex gap-7 font-thin">
        <Link href="#">About us</Link>
        <Link href="#">Products</Link>
        <Link href="#">Our Blog</Link>
        <Link href="#">Wine Quiz</Link>
      </div>
      <div className="flex gap-2">
        <ButtonLink href="#" size="sm" color="yellow">
          Sign up
        </ButtonLink>
        <ButtonLink href="#" size="sm" variant="ghost" color="white">
          Log In
        </ButtonLink>
      </div>
    </nav>
  )
}
