import React from 'react'
import { Platform } from 'react-native'

import { Car, Home as HomeIcon, People } from 'src/assets'
import { MyCars, Profile } from 'src/screens'
import AppStackRoutes from './app.stack.routes'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'

const { Navigator: TabNavigator, Screen } = createBottomTabNavigator()

const AppTabRoutes = () => {
  const theme = useTheme()

  return (
    <TabNavigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarStyle: {
          height: 78,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: theme.colors.background_primary
        }
      }}
    >
      <Screen
        name='Home'
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon fill={color} height={24} width={24} />
          )
        }}
      />
      <Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <People fill={color} height={24} width={24} />
          )
        }}
      />
      <Screen
        name='MyCars'
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => <Car fill={color} height={24} width={24} />
        }}
      />
    </TabNavigator>
  )
}

export default AppTabRoutes
