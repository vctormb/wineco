import { DefaultSession } from 'next-auth'

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN: string
    NEXT_PUBLIC_MIXPANEL_DEBUG_MODE_ENABLED?: string
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
  }
}

declare module 'next-auth' {
  interface User {
    email: string
    expiresAt: number
  }

  interface Session {
    error?: 'InvalidTokenError'
    user: {
      email?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string
    expiresAt: number
    error?: 'InvalidTokenError'
  }
}
