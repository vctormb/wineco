import mixpanel from 'mixpanel-browser'
import { MixPanelTrack } from './types'

const MIX_PANEL_PROJECT_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN
const MIXPANEL_ENABLED = !!MIX_PANEL_PROJECT_TOKEN
const MIXPANEL_DEBUG_MODE_ENABLED =
  !!process.env.NEXT_PUBLIC_MIXPANEL_DEBUG_MODE_ENABLED

function call(cb: () => void) {
  if (MIXPANEL_ENABLED) {
    cb()
  }
}

function init() {
  call(() => {
    mixpanel.init(MIX_PANEL_PROJECT_TOKEN!, {
      debug: MIXPANEL_DEBUG_MODE_ENABLED,
    })
  })
}

function track({ eventName, properties }: MixPanelTrack) {
  call(() => {
    mixpanel.track(eventName, properties)
  })
}

export const MIXPANEL = {
  init,
  track,
}
