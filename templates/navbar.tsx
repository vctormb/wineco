import { ButtonLink } from '@/components/button'
import { MIXPANEL } from '@/utils/mixpanel'
import Link from 'next/link'

export function Navbar() {
  return (
    <div className="relative">
      <nav className="absolute w-full flex justify-between items-center bg-red-900 py-5 px-8 text-white">
        <Link href="/" className="text-xl font-semibold">
          Wine Co.
        </Link>
        <ul className="hidden md:flex gap-7 font-thin">
          <li>
            <Link href="/#">About us</Link>
          </li>
          <li>
            <Link href="/#">Products</Link>
          </li>
          <li>
            <Link href="/#">Our Blog</Link>
          </li>
          <li>
            <Link
              href="/setup/create"
              onClick={() =>
                MIXPANEL.track({
                  eventName: 'Clicked Wine Quiz CTA',
                  properties: {
                    Content: 'navbar',
                  },
                })
              }
            >
              Wine Quiz
            </Link>
          </li>
        </ul>
        <div className="md:flex gap-2">
          <ButtonLink href="/#" size="sm" color="secondary">
            Sign up
          </ButtonLink>
          <ButtonLink href="/login" size="sm" variant="ghost" color="white">
            Log In
          </ButtonLink>
        </div>
      </nav>
    </div>
  )
}
