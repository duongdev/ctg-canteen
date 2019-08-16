import React from 'react'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Helmet from 'react-helmet'
import Routes from 'Routes'
import { light } from 'theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Helmet
        defaultTitle="Kantin – Nhà ăn Chuyên Tiền Giang"
        titleTemplate="%s | Kantin – Nhà ăn Chuyên Tiền Giang"
      />
      <Routes />
    </ThemeProvider>
  )
}

export default App
