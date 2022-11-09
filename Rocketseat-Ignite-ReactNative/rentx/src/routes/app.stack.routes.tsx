import React from 'react'

import {
  CarDetails,
  Confirmation,
  Home,
  Scheduling,
  SchedulingDetails
} from 'src/screens'

import { createStackNavigator } from '@react-navigation/stack'

const { Navigator: StackNavigator, Screen } = createStackNavigator()

const AppStackRoutes = () => {
  return (
    <StackNavigator
      initialRouteName='Dashboard'
      screenOptions={{ headerShown: false }}
    >
      <Screen name='Dashboard' component={Home} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='Confirmation' component={Confirmation} />
    </StackNavigator>
  )
}

export default AppStackRoutes
