import React from 'react'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Routes from 'Routes'
import theme from 'theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default App