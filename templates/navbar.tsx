import { ButtonLink } from '@/components/button'
import Link from 'next/link'

export function Navbar() {
  return (
    <div className="relative">
      <nav className="absolute w-full flex justify-between items-center bg-red-900 py-5 px-8 text-white">
        <span className="text-xl font-semibold">Wine Co.</span>
        <ul className="hidden md:flex gap-7 font-thin">
          <li>
            <Link href="#">About us</Link>
          </li>
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Our Blog</Link>
          </li>
          <li>
            <Link href="/setup/create">Wine Quiz</Link>
          </li>
        </ul>
        <div className="hidden md:flex gap-2">
          <ButtonLink href="/setup/create" size="sm" color="yellow">
            Sign up
          </ButtonLink>
          <ButtonLink href="#" size="sm" variant="ghost" color="white">
            Log In
          </ButtonLink>
        </div>
      </nav>
    </div>
  )
}
