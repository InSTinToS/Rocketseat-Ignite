import React, { FC } from 'react'
import { Container, Name } from './styles'

import { SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components'

interface Props {
  name: string
  icon: FC<SvgProps>
}

const Accessory = ({ icon: Icon, name }: Props) => {
  const theme = useTheme()

  return (
    <Container>
      <Icon width={32} height={32} fill={theme.colors.header} />

      <Name>{name}</Name>
    </Container>
  )
}

export default Accessory
