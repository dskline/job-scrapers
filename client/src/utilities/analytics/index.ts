import ReactGA from 'react-ga'

import config from 'src/config'

export const init = (): void => {
  if (config.public.env === 'production') {
    ReactGA.initialize(config.public.googleAnalyticsId, {
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
    })
  }
}

export const logWebVitals = (metrics): void => {
  if (config.public.env === 'production') {
    ReactGA.event({
      category: `Next.js ${metrics.label} metric`,
      action: metrics.name,
      value: Math.round(metrics.name === 'CLS' ? metrics.value * 1000 : metrics.value), // values must be integers
      label: metrics.id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate
    })
  }
}
