import React from 'react'
import Manifest from 'next-manifest/manifest'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import packageJson from 'package.json'

import HeadLink from 'src/utilities/nextjs/HeadLink'

class Document extends NextDocument {
  render (): JSX.Element {
    // noinspection HtmlRequiredTitleElement (not recommended in _document.tsx)
    return (
      <Html lang='en'>
        <Head>
          <Manifest href='/manifest.json' />
          <meta name='Description' content={packageJson.description} />
          <HeadLink rel='apple-touch-icon' href='/public/favicon/apple-icon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
