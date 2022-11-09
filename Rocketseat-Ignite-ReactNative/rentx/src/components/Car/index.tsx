import React from 'react'
import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type
} from './styles'

import getAccessoryIcon, { CarType } from 'src/utils/getAccessoryIcon'
import ModelCar from 'src/database/models/Car'

import { useNetInfo } from '@react-native-community/netinfo'
import { RectButtonProps } from 'react-native-gesture-handler'

export interface CarData {
  thumbnail: string
  brand: string
  name: string
  rent: {
    period: string
    price: number
  }
}

interface Props extends RectButtonProps {
  data: ModelCar
}

const Car = ({ data, ...props }: Props) => {
  const MotorIcon = getAccessoryIcon(data.fuel_type as keyof CarType)

  const netInfo = useNetInfo()

  return (
    <Container {...props}>
      <Details>
        <Brand>{data.brand}</Brand>

        <Name>{data.name} </Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>

            <Price>
              {`R$ ${netInfo.isConnected === true ? data.price : '...'}`}
            </Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode='contain' source={{ uri: data.thumbnail }} />
    </Container>
  )
}

export default Car
