import React from 'react'

import { useAuth } from 'src/hooks/useAuth'
import AppTabRoutes from './app.tab.routes'
import AuthRoutes from './auth.routes'

import { NavigationContainer as NavigationProvider } from '@react-navigation/native'

const Routes = () => {
  const { user } = useAuth()

  return (
    <NavigationProvider>
      {user?.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationProvider>
  )
}

export default Routes
