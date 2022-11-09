import React from 'react'
import { Container } from './styles'

import { useTheme } from 'styled-components'

const Load = () => {
  const theme = useTheme()

  return <Container color={theme.colors.main} />
}

export default Load
