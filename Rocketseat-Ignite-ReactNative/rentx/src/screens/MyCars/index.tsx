import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  SubTitle,
  Title
} from './styles'

import { CarResType } from 'src/types/res/Car'
import api from 'src/services/api'
import { BackButton, Car, Load } from 'src/components'
import { NavigationProps } from 'src/types/react-native/navigation'
import AnimatedLoading from 'src/components/AnimatedLoading'

import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'styled-components'

interface CarProps {
  id: string
  car: CarResType
  user_id: string
  endDate: string
  startDate: string
}

const MyCars = () => {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation<NavigationProps<void>>()
  const theme = useTheme()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api.get('/schedules_byuser')
        setCars(res.data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {}, [cars])

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          barStyle='light-content'
          backgroundColor='transparent'
        />

        <BackButton
          onPress={() => {
            navigation.navigate('Dashboard')
          }}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma data{'\n'} de início e {'\n'} fim do aluguel.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <AnimatedLoading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={({ id }) => String(id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                {/* <Car data={item.car} /> */}
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}

export default MyCars
