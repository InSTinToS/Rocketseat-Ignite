import React, { ReactNode } from 'react'

import { AuthProvider } from './useAuth'
import theme from 'src/styles/theme'

import { ThemeProvider } from 'styled-components/native'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}

export default AppProvider
