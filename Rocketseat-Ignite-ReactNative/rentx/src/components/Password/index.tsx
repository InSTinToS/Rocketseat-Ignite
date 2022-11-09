import React, { ComponentProps, useState } from 'react'
import { FlexStyle, TextInputProps } from 'react-native'
import { Container, EyeButton, IconContainer, InputText } from './styles'

import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

interface Props extends TextInputProps {
  iconName: ComponentProps<typeof Feather>['name']
  marginTop?: FlexStyle['marginTop']
}

const Password = ({ iconName, marginTop = 0, value, ...props }: Props) => {
  const [isEyeVisible, setIsEyeVisible] = useState(false)
  const [focus, setFocus] = useState(false)
  const [filled, setFilled] = useState(false)

  const theme = useTheme()

  return (
    <Container style={{ marginTop }}>
      <IconContainer withBorderBottom={focus}>
        <Feather
          name={iconName}
          size={24}
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
        secureTextEntry={!isEyeVisible}
        {...props}
      />

      <EyeButton onPress={() => setIsEyeVisible(!isEyeVisible)}>
        <IconContainer withBorderBottom={focus}>
          <Feather
            size={24}
            color={
              focus || filled ? theme.colors.main : theme.colors.text_detail
            }
            name={isEyeVisible ? 'eye-off' : 'eye'}
          />
        </IconContainer>
      </EyeButton>
    </Container>
  )
}

export default Password
