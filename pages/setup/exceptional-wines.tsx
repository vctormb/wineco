import { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/breadcrumb'
import { Button, ButtonLink } from '@/components/button'
import { ProductItem, WineItem } from '@/templates/product-item'
import { useSession } from 'next-auth/react'
import { MIXPANEL } from '@/utils/mixpanel'
import { useRouter } from 'next/router'

const wines: WineItem[] = [
  {
    id: 1,
    label: 'Chateau Lafite Rothschild Pauillac, 2018',
    price: 1499.97,
    src: '/chateau-lafite-rothschild.png',
  },
  {
    id: 2,
    label: 'Penfolds Cabernet-Shiraz Bin 389, 2019',
    price: 58.99,
    src: '/penfolds-cabernet.png',
  },
  {
    id: 3,
    label: 'Antinori Tignanello, 2019',
    price: 149.97,
    src: '/antinori-tignanello.png',
  },
  {
    id: 4,
    label: 'Harlan Estate Red, 2001',
    price: 2599.97,
    src: '/harlan-estate-red.png',
  },
]

const THE_END_MESSAGE =
  "The end of the funnel 🎉 \nNow you will be redirected to the catalog's page!"

export default function ExceptionalWines() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedWines, setSelectedWines] = useState<WineItem[]>([])

  function onSubmit() {
    const wineIds = selectedWines.map((wine) => wine.id)
    const winePrices = selectedWines.map((wine) => wine.price)

    MIXPANEL.track({
      eventName: 'Added Exceptional Wines to Cart',
      properties: {
        distinct_id: session?.user.email!,
        'Wine IDs': wineIds,
        'Wine Prices': winePrices,
      },
    })

    alert(THE_END_MESSAGE)
    router.push('/catalog')
  }

  function onClickSkip() {
    MIXPANEL.track({
      eventName: 'Skipped Exceptional Wines page',
      properties: {
        distinct_id: session?.user.email!,
      },
    })

    alert(THE_END_MESSAGE)
    router.push('/catalog')
  }

  function checkIsSelected(id: number) {
    return selectedWines.some((wine) => wine.id === id)
  }

  function onSelectWine(wine: WineItem) {
    if (checkIsSelected(wine.id)) {
      setSelectedWines((s) => s.filter((item) => item.id !== wine.id))
    } else {
      setSelectedWines((s) => [...s, wine])
    }
  }

  const winesCountLabel = !!selectedWines.length ? selectedWines.length : ''

  return (
    <div className="flex flex-col px-8 mt-10">
      <Breadcrumb
        activeIndex={1}
        paths={['create account', 'exceptional wines', 'wines catalog']}
      />
      <h1 className="text-2xl font-semibold mt-7 mb-7 max-w-xs">
        some exceptional wines just for you!
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-[repeat(2,_minmax(0,23.75rem))] gap-2">
        {wines.map((wine) => (
          <ProductItem
            key={wine.src}
            wineItem={wine}
            isSelected={checkIsSelected(wine.id)}
            onSelect={() => onSelectWine(wine)}
          />
        ))}
      </div>
      <div className="my-10">
        <ButtonLink
          href="/#"
          size="sm"
          type="button"
          variant="ghost"
          onClick={onClickSkip}
        >
          Skip
        </ButtonLink>
        <Button
          type="submit"
          size="sm"
          onClick={onSubmit}
          disabled={!selectedWines.length}
        >
          Add {winesCountLabel} wines to cart
        </Button>
      </div>
    </div>
  )
}

ExceptionalWines.getLayout = (page: ReactElement) => {
  return (
    <>
      <nav className="py-5 px-8">
        <Link href="/" className="text-red-900 text-2xl font-bold">
          Wine Co.
        </Link>
      </nav>
      <div className="hidden fixed h-full top-0 right-0 bg-slate-100 md:block md:w-64" />
      <main>{page}</main>
    </>
  )
}
