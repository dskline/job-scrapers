import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'

import * as analytics from 'src/utilities/analytics'

import './global.scss'

export function reportWebVitals (metrics): void {
  analytics.logWebVitals(metrics)
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    analytics.init()
  })

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default App
