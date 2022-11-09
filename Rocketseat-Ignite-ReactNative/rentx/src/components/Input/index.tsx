import React, { ComponentProps, useState } from 'react'
import { TextInputProps } from 'react-native'
import { Container, IconContainer, InputText } from './styles'

import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

interface Props extends TextInputProps {
  iconName: ComponentProps<typeof Feather>['name']
}

const Input = ({ value, iconName, ...props }: Props) => {
  const [focus, setFocus] = useState(false)
  const [filled, setFilled] = useState(false)

  const theme = useTheme()

  return (
    <Container>
      <IconContainer withBorderBottom={focus}>
        <Feather
          size={24}
          name={iconName}
          color={focus || filled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        withBorderBottom={focus}
        onBlur={() => {
          setFocus(false)
          setFilled(!!value)
        }}
        onFocus={() => setFocus(true)}
        value={value}
        {...props}
      />
    </Container>
  )
}

export default Input
