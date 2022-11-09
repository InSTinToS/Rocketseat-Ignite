import React from 'react'
import { Container, Title } from './styles'
import { ActivityIndicator } from 'react-native'

import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

interface Props extends RectButtonProps {
  title: string
  light?: boolean
  color?: string
  loading?: boolean
}

const Button = ({
  title,
  enabled = true,
  color,
  light = false,
  loading = false,
  ...props
}: Props) => {
  const theme = useTheme()

  return (
    <Container color={color} enabled={enabled} {...props}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  )
}

export default Button
