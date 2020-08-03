import React, { FC } from 'react'
import Head from 'next/head'

import Navbar from 'src/components/Navbar'
import ThemeProvider from 'src/features/theme/ThemeProvider'

const BasePage: FC = ({ children }) => (
  <ThemeProvider>
    <Head>
      <title>Daily Jobs</title>
    </Head>
    <Navbar />
    <div className='bg-indigo-100 min-h-screen'>{children}</div>
  </ThemeProvider>
)

export default BasePage
