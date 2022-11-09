import React from 'react'
import { Container } from './styles'

import { LoadCar } from 'src/assets'

import LottieView from 'lottie-react-native'

const AnimatedLoading = () => {
  return (
    <Container>
      <LottieView
        source={LoadCar}
        resizeMode='contain'
        autoPlay
        style={{ height: 200 }}
      />
    </Container>
  )
}

export default AnimatedLoading
