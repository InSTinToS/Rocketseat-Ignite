import React, { useState } from 'react'
import {
  Accessories,
  Brand,
  CalendarIcon,
  CarContent,
  CarImages,
  Container,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles'
import { Alert, StatusBar } from 'react-native'

import { Params as ConfirmationParams } from 'src/screens/Confirmation'
import { Accessory, BackButton, Button, ImageSlider } from 'src/components'
import { NavigationProps } from 'src/types/react-native/navigation'
import { CarResType } from 'src/types/res/Car'
import getAccessoryIcon from 'src/utils/getAccessoryIcon'
import api from 'src/services/api'

import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

const images = [
  'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
]
interface Params {
  car: CarResType
  dates?: string[]
}

const ShedulingDetails = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)

  const navigation =
    useNavigation<NavigationProps<Params | void | ConfirmationParams>>()
  const route = useRoute()
  const { car, dates } = route.params as Params

  const handleConfirm = async () => {
    setLoading(true)
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailableDates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ]

    api.post(`/schedules_byuser`, {
      car,
      startDate: format(new Date(dates[0]), 'dd/MM/yyyy'),
      endDate: format(new Date(dates[dates.length - 1]), 'dd/MM/yyyy'),
      user_id: 1
    })

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates
      })
      .then(() =>
        navigation.navigate('Confirmation', {
          nextScreen: 'Dashboard',
          title: 'Carro alugado',
          message:
            'Agora você só precisa ir \naté a concessionária do RENTX\npegar o seu atomóvel.'
        })
      )
      .catch(() => {
        setLoading(false)
        Alert.alert('Não foi possível confirmar o agendamento')
      })
  }

  const totalRent = dates.length * Number(car.price)

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          barStyle='dark-content'
          backgroundColor='transparent'
        />

        <BackButton
          onPress={() => navigation.navigate('Scheduling', { car })}
        />
      </Header>

      <CarContent>
        <CarImages>
          <ImageSlider imageUrls={car.photos} />
        </CarImages>

        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>

            <Price>{car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>

            <DateValue>{format(new Date(dates[0]), 'dd/MM/yyyy')}</DateValue>
          </DateInfo>

          <Feather
            size={RFValue(10)}
            name='chevron-right'
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>

            <DateValue>
              {format(new Date(dates[dates.length - 1]), 'dd/MM/yyyy')}
            </DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </RentalPriceQuota>

            <RentalPriceTotal>R$ {totalRent}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </CarContent>

      <Footer>
        <Button
          title='Alugar agora'
          loading={loading}
          enabled={!loading}
          onPress={handleConfirm}
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  )
}

export default ShedulingDetails
