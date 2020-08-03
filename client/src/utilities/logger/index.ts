import ReactGA, { EventArgs } from 'react-ga'

import config from 'src/config'

export const logEvent = (eventArgs: EventArgs): void => {
  if (config.public.env === 'production') {
    ReactGA.event(eventArgs)
  } else if (config.public.isDebugMode) {
    console.log(eventArgs)
  }
}

export const logException = (description, fatal = false): void => {
  if (config.public.env === 'production') {
    ReactGA.exception({ description, fatal })
  } else if (fatal) {
    console.error(description)
  } else {
    console.warn(description)
  }
}
