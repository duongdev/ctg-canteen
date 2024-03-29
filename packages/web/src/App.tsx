import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import client from 'apollo/client'
import { UseAuthProvider } from 'hooks/useAuth'
import { SnackbarProvider } from 'notistack'
import { CookiesProvider } from 'react-cookie'
import Helmet from 'react-helmet'
import Routes from 'Routes'
import { light } from 'theme'

const App: React.FC = () => {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <UseAuthProvider>
          <ThemeProvider theme={light}>
            <SnackbarProvider maxSnack={3}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Helmet
                defaultTitle="Kantin – Nhà ăn Chuyên Tiền Giang"
                titleTemplate="%s | Kantin – Nhà ăn Chuyên Tiền Giang"
              />
              <Routes />
            </SnackbarProvider>
          </ThemeProvider>
        </UseAuthProvider>
      </ApolloProvider>
    </CookiesProvider>
  )
}

export default App
