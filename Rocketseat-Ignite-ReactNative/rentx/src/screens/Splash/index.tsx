import React, { useEffect } from 'react'
import { Container } from './styles'

import { Brand, Logo } from 'src/assets'
import { NavigationProps } from 'src/types/react-native/navigation'

import { useNavigation } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

const Splash = () => {
  const navigation = useNavigation<NavigationProps<void>>()

  const splashAnimation = useSharedValue(0)

  const brandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [0, -50],
          Extrapolate.CLAMP
        )
      }
    ]
  }))

  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 1], [0, 50]),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [-50, 0],
          Extrapolate.CLAMP
        )
      }
    ]
  }))

  const startApp = () => {
    navigation.navigate('SignIn')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet'
      runOnJS(startApp)()
    })
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <Brand />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <Logo />
      </Animated.View>

      <StatusBar translucent style='light' />
    </Container>
  )
}

export default Splash
