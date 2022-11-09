import React from 'react'

import {
  Confirmation,
  FirstStep,
  SecondStep,
  SignIn,
  Splash
} from 'src/screens'

import { createStackNavigator } from '@react-navigation/stack'

const { Navigator: StackNavigator, Screen } = createStackNavigator()

const AuthRoutes = () => {
  return (
    <StackNavigator
      initialRouteName='Splash'
      screenOptions={{ headerShown: false }}
    >
      <Screen name='Splash' component={Splash} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={FirstStep} />
      <Screen name='SignUpSecondStep' component={SecondStep} />
      <Screen name='Confirmation' component={Confirmation} />
    </StackNavigator>
  )
}

export default AuthRoutes
