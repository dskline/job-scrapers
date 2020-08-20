import React, { FC } from 'react'
import { AppProps } from 'next/app'

import { store } from 'src/config/redux/store'

import './global.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default store.withRedux(App)
