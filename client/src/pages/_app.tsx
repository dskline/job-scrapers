import React, { FC } from 'react'
import ws from 'isomorphic-ws'
import { withUrqlClient } from 'next-urql'
import { AppProps } from 'next/app'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { defaultExchanges, subscriptionExchange } from 'urql'

import config from 'src/config'
import { store } from 'src/config/redux/store'

import './global.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />

const subscriptionClient = new SubscriptionClient(
  config.public.gqlWebSocketEndpoint,
  {
    reconnect: true,
  },
  ws
)

export default withUrqlClient((_ssrExchange) => ({
  url: config.public.gqlEndpoint,
  exchanges: [
    ...defaultExchanges,
    _ssrExchange,
    subscriptionExchange({
      forwardSubscription (operation) {
        return subscriptionClient.request(operation)
      },
    }),
  ],
}))(store.withRedux(App))
