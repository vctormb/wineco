declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN: string
    NEXT_PUBLIC_MIXPANEL_ENABLED?: string
    NEXT_PUBLIC_MIXPANEL_DEBUG_MODE_ENABLED?: string
  }
}
