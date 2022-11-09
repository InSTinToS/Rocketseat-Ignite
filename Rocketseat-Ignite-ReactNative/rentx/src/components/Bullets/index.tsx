import React from 'react'
import { Container } from './styles'

interface IndexProps {
  active?: boolean
}

const Bullets = ({ active = false }: IndexProps) => {
  return <Container active={active} />
}

export default Bullets
