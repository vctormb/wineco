import Link from 'next/link'

type FooterLinks = {
  label: string
  href?: string
}

const wineCo: FooterLinks[] = [
  {
    label: 'Wine Away Blvd',
  },
  {
    label: '54th St. New York',
  },
  { label: 'United States' },
]

const ourCompany: FooterLinks[] = [
  {
    label: 'Our Team',
    href: '#',
  },
  {
    label: 'Company Vision',
    href: '#',
  },
  {
    label: 'Our History',
    href: '#',
  },
  {
    label: 'Investorys',
    href: '#',
  },
]

const ourResources: FooterLinks[] = [
  {
    label: 'The Blog',
    href: '#',
  },
  {
    label: 'Media',
    href: '#',
  },
  {
    label: 'Wine Quiz',
    href: '#',
  },
]

const ourWines: FooterLinks[] = [
  {
    label: 'Partners',
    href: '#',
  },
  {
    label: 'Wineries',
    href: '#',
  },
  {
    label: 'Visit',
    href: '#',
  },
]

export function Footer() {
  return (
    <footer>
      <div className="bg-neutral-700 py-12 px-20">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col mb-6">
            <span className="text-white font-semibold text-2xl">Wine Co.</span>
            <ul className="flex gap-4 flex-col mt-6">
              {wineCo.map((item) => (
                <li key={item.label}>
                  <span className="text-yellow-100 font-thin text-sm">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-16">
            <ul className="flex gap-4 flex-col">
              <li>
                <span className="font-semibold text-white">Our Company</span>
              </li>
              {ourCompany.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className="text-yellow-100 font-thin text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex gap-4 flex-col">
              <li>
                <span className="font-semibold text-white">Our Resources</span>
              </li>
              {ourResources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className="text-yellow-100 font-thin text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex gap-4 flex-col">
              <li>
                <span className="font-semibold text-white">Our Wines</span>
              </li>
              {ourWines.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className="text-yellow-100 font-thin text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
