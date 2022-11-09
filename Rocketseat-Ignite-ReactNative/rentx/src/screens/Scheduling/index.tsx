import React, { useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title
} from './styles'

import BackButton from 'src/components/BackButton'
import Button from 'src/components/Button'
import Calendar from 'src/components/Calendar'
import { Arrow } from 'src/assets'
import generateDateInterval from 'src/utils/generateDateInterval'
import getPlataformDate from 'src/utils/getPlataformDate'
import { NavigationProps } from 'src/types/react-native/navigation'
import { CarResType } from 'src/types/res/Car'

import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking'
import { DateData } from 'react-native-calendars/src/types'
import { useTheme } from 'styled-components'

interface RentalPeriod {
  formatedEnd: string
  formatedStart: string
}

interface Params {
  car: CarResType
  dates: string[]
}

const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  )
  const [markedDates, setMarkedDates] = useState<{
    [date: string]: MarkingProps
  }>({} as { [date: string]: MarkingProps })
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )

  const theme = useTheme()
  const route = useRoute()
  const navigation = useNavigation<NavigationProps<Params | void>>()

  const { car } = route.params as Params

  const handleConfirm = () => {
    if (!rentalPeriod.formatedStart || !rentalPeriod.formatedEnd)
      Alert.alert('Selecione o intervalo para alugar.')
    else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  const handleChangeDate = (date: DateData) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)

    const interval = generateDateInterval(start, end)

    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      formatedStart: format(
        getPlataformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      formatedEnd: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
  }

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          barStyle='light-content'
          backgroundColor='transparent'
        />

        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <Title>
          Escolha uma data{'\n'} de início e {'\n'} fim do aluguel.
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>

            <DateValue selected={!!rentalPeriod.formatedStart}>
              {rentalPeriod.formatedStart}
            </DateValue>
          </DateInfo>

          <Arrow />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>

            <DateValue selected={!!rentalPeriod.formatedEnd}>
              {rentalPeriod.formatedEnd}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirm}
          enabled={!!rentalPeriod.formatedStart}
        />
      </Footer>
    </Container>
  )
}

export default Scheduling
