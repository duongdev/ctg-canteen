import React from 'react'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Helmet from 'react-helmet'
import Routes from 'Routes'
import theme from 'theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Helmet
        defaultTitle="Nhà ăn Chuyên Tiền Giang"
        titleTemplate="%s – Nhà ăn Chuyên Tiền Giang"
      />
      <Routes />
    </ThemeProvider>
  )
}

export default App
