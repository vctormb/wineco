import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { HTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react'

// RADIO ROOT

export const RadioGroupRoot = forwardRef<
  HTMLDivElement,
  RadixRadioGroup.RadioGroupProps
>((props, ref) => {
  return <RadixRadioGroup.Root {...props} ref={ref} className="flex flex-col gap-2" />
})

RadioGroupRoot.displayName = 'RadioGroupRoot'

// RADIO CONTENT

export function RadioGroupContent(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex items-center border border-neutral-300 py-3 px-5 rounded-lg"
      {...props}
    />
  )
}

// RADIO ITEM

// export const RadioGroupItem = forwardRef<
//   HTMLButtonElement,
//   RadixRadioGroup.RadioGroupItemProps
// >((props, ref) => {
//   return (
//     <RadixRadioGroup.Item
//       {...props}
//       ref={ref}
//       className="bg-white w-5 h-5 rounded-full border border-neutral-300"
//     >
//       <RadixRadioGroup.Indicator className="flex relative items-center justify-center w-full h-full after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-red-900" />
//     </RadixRadioGroup.Item>
//   )
// })

// RadioGroupItem.displayName = 'RadioGroupItem'

export const RadioGroupItem = (props: RadixRadioGroup.RadioGroupItemProps) => {
  return (
    <RadixRadioGroup.Item
      {...props}
      className="bg-white w-5 h-5 rounded-full border border-neutral-300"
    >
      <RadixRadioGroup.Indicator className="flex relative items-center justify-center w-full h-full after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-red-900" />
    </RadixRadioGroup.Item>
  )
}

// RADIO LABEL

export function RadioGroupLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className="text-sm font-semibold pl-3" />
}
