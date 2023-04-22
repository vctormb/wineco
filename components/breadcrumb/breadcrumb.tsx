import clsx from 'clsx'
import { ReactNode } from 'react'

export function Breadcrumb({
  paths,
  activeIndex,
}: {
  paths: string[]
  activeIndex?: number
}) {
  function isDisabled(index: number) {
    return activeIndex === undefined || index > activeIndex
  }

  const breadcrumbs = paths
    .map<ReactNode>((path, i) => {
      return (
        <span
          key={path}
          className={clsx({
            'text-neutral-300': isDisabled(i),
          })}
        >
          {path}
        </span>
      )
    })
    .reduce((prev, curr, i) => [
      prev,
      <span
        key={i}
        data-testid={`arrow-${i}`}
        className={clsx('mx-2', {
          'text-neutral-300': isDisabled(i),
        })}
      >
        {'>'}
      </span>,
      curr,
    ])

  return <div className="font-semibold">{breadcrumbs}</div>
}
