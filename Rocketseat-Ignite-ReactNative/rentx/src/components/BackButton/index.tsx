import React from 'react'
import { Container } from './styles'

import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { BorderlessButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

interface Props extends BorderlessButtonProps {
  color?: string
}

const BackButton = ({ color, ...props }: Props) => {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <Container {...props}>
      <MaterialIcons
        size={24}
        name='chevron-left'
        onPress={() => navigation.goBack()}
        color={color || theme.colors.text}
      />
    </Container>
  )
}

export default BackButton
