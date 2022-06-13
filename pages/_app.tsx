import React, { ReactChild } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles'
import { AppProps } from 'next/app'
import AppLayout from '@components/layout/Layout'

const App = ({ Component, pageProps }: AppProps): ReactChild => {
  return (
    <ChakraProvider theme={theme}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraProvider>
  )
}

export default App
