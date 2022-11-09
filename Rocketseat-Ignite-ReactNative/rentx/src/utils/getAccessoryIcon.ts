import { FC } from 'react'

import {
  Acceleration,
  Eletric,
  Exchange,
  Force,
  Gasoline,
  Hybrid,
  People,
  Speed
} from 'src/assets'

export type CarType = typeof icons

const icons = {
  speed: Speed,
  seats: People,
  exchange: Exchange,
  hybrid_motor: Hybrid,
  electric_motor: Eletric,
  electric: Eletric,
  turning_diameter: Force,
  gasoline_motor: Gasoline,
  acceleration: Acceleration
}

const getAccessoryIcon = (type: keyof CarType): FC => {
  return icons[type]
}

export default getAccessoryIcon
