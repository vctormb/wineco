import { ReactNode, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'

// the token from our backend expires in 2h, so we need to add +1m to make sure that after 2h it will log out
export const TOKEN_EXP_TWO_HOURS_ONE_MINUTE = 2 * 61 * 60

export function Auth({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'InvalidTokenError') {
      signOut()
    }
  }, [session])

  return <>{children}</>
}
