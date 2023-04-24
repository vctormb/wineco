import { moneyFormatter } from '@/utils'
import Image from 'next/image'

export type WineItem = {
  id: number
  label: string
  price: number
  src: string
}

export function ProductItem({
  wineItem,
  isSelected,
  onSelect,
}: {
  wineItem: WineItem
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <div key={wineItem.src} className="flex gap-2">
      <div className="flex justify-center items-center bg-slate-100 p-2 rounded-lg h-[6.25rem] w-[6.25rem] lg:h-[7.5rem] lg:w-[7.5rem]">
        <Image
          draggable={false}
          alt={wineItem.label}
          src={wineItem.src}
          className="rounded-lg"
          width={90}
          height={90}
          priority
        />
      </div>
      <div className="flex flex-col justify-between gap-1">
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-red-900">{wineItem.label}</span>
          <span className="text-sm">{moneyFormatter.format(wineItem.price)}</span>
        </div>
        <button
          onClick={() => onSelect()}
          className="self-start min-w-[3.75rem] rounded-full p-2 border border-neutral-300 hover:bg-yellow-100 transition"
        >
          {isSelected ? '-' : '+'}
        </button>
      </div>
    </div>
  )
}
