import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { LabelHTMLAttributes, forwardRef } from 'react'

// CHECKBOX ROOT

export const CheckboxRoot = forwardRef<
  HTMLButtonElement,
  RadixCheckbox.CheckboxProps
>((props, ref) => {
  return (
    <RadixCheckbox.Root
      {...props}
      ref={ref}
      className="flex items-center justify-center border border-neutral-300 w-5 h-5 rounded-md"
    />
  )
})

CheckboxRoot.displayName = 'CheckboxRoot'

// CHECKBOX INDICATOR

export function CheckboxIndicator() {
  return (
    <RadixCheckbox.Indicator className="text-red-900">
      ✓
    </RadixCheckbox.Indicator>
  )
}

// CHECKBOX LABEL

export function RadioGroupLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className="text-sm font-semibold pl-3" />
}
