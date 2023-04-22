import { ReactNode, createContext, useContext, useState } from 'react'

type ReturnUseStepper = ReturnType<typeof useStepper>

const StepperContext = createContext<ReturnUseStepper>({} as ReturnUseStepper)
export const useStepperContext = () => useContext(StepperContext)

// USE STEPPER

export function useStepper({ step: stepProp }: { step: string }) {
  const [step, setStep] = useState(stepProp)

  return {
    step,
    setStep,
  }
}

// STEPPER ROOT

type StepperRootProps = {
  children: ReactNode
} & ReturnUseStepper

export function StepperRoot({
  children,
  ...useStepperProps
}: StepperRootProps) {
  return (
    <StepperContext.Provider value={{ ...useStepperProps }}>
      {children}
    </StepperContext.Provider>
  )
}

// STEPPER CONTENT

type StepperContentProps = {
  children: ReactNode
  stepKey: ReturnUseStepper['step']
}

export function StepperContent({ children, stepKey }: StepperContentProps) {
  const { step } = useStepperContext()

  if (step !== stepKey) {
    return null
  }

  return <>{children}</>
}
