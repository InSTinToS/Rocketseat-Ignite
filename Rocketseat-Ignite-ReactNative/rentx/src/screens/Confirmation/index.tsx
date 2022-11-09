import React from 'react'
import { Container, Content, Footer, Message, Title } from './styles'
import { StatusBar, useWindowDimensions } from 'react-native'

import { BrandBackground, Done } from 'src/assets'
import { ConfirmButton } from 'src/components'
import { NavigationProps } from 'src/types/react-native/navigation'

import { useNavigation, useRoute } from '@react-navigation/native'

export interface Params {
  title: string
  message: string
  nextScreen: string
}

const Confirmation = () => {
  const route = useRoute()
  const { width } = useWindowDimensions()
  const navigation = useNavigation<NavigationProps<void>>()

  const { title, message, nextScreen } = route.params as Params

  const handleConfirm = () => {
    navigation.navigate(nextScreen)
  }
  return (
    <Container>
      <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor='transparent'
      />

      <BrandBackground width={width} />

      <Content>
        <Done />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}

export default Confirmation
