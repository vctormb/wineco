import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'

export const breadcrumbStyles = cva(null, {
  variants: {
    isDisabled: {
      true: 'text-neutral-300',
    },
  },
})

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
          className={breadcrumbStyles({
            isDisabled: isDisabled(i),
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
        className={breadcrumbStyles({
          isDisabled: isDisabled(i),
        })}
      >
        {'>'}
      </span>,
      curr,
    ])

  return <div className="font-semibold flex gap-2">{breadcrumbs}</div>
}
