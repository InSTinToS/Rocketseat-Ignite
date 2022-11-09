import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Description,
  Details,
  Footer,
  Header,
  Name,
  OfflineInfo,
  Period,
  Price,
  Rent
} from './styles'

import BackButton from 'src/components/BackButton'
import ImageSlider from 'src/components/ImageSlider'
import Accessory from 'src/components/Accessory'
import Button from 'src/components/Button'
import { CarResType } from 'src/types/res/Car'
import { NavigationProps } from 'src/types/react-native/navigation'
import getAccessoryIcon from 'src/utils/getAccessoryIcon'
import api from 'src/services/api'

import { useNetInfo } from '@react-native-community/netinfo'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useTheme } from 'styled-components'

interface Params {
  car: CarResType
}

const CarDetails = () => {
  const theme = useTheme()
  const [carUpdated, setCarUpdated] = useState({} as CarResType)
  const navigation = useNavigation<NavigationProps<Params | void>>()
  const route = useRoute()
  const netInfo = useNetInfo()

  const scrollY = useSharedValue(0)

  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0])
  }))

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 90], Extrapolate.CLAMP)
  }))

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const { car } = route.params as Params

  const handleConfirm = () => {
    navigation.navigate('Scheduling', { car })
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const res = await api.get(`/cars/${car.id}`)
      console.log(res.data)
      setCarUpdated(res.data)
    }

    if (netInfo.isConnected === true) fetchCarUpdated()
  }, [netInfo.isConnected])

  return (
    <Container>
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <StatusBar
            translucent
            barStyle='dark-content'
            backgroundColor='transparent'
          />

          <BackButton onPress={() => navigation.navigate('Dashboard')} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider
              imageUrls={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        // 16 porque 1000/60 = 16.6 ~= 60fps
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center'
        }}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>

            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>
        </Details>

        <Accessories>
          {carUpdated.accessories &&
            carUpdated.accessories.map(accessorie => (
              <Accessory
                key={accessorie.type}
                name={accessorie.name}
                icon={getAccessoryIcon(accessorie.type)}
              />
            ))}
        </Accessories>

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          color='red'
          onPress={handleConfirm}
          title='Escolher período do aluguel'
          enabled={netInfo.isConnected === true}
        />
      </Footer>

      {netInfo.isConnected === false && (
        <OfflineInfo>
          Connecte-se a Internet para ver mais detalhes e agendar seu carro.
        </OfflineInfo>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
})

export default CarDetails
