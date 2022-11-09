import React from 'react'
import { ViewStyle } from 'react-native'

import dates from 'src/locales/dates'

import { Feather } from '@expo/vector-icons'
import {
  Calendar as NativeCalendar,
  CalendarProps as NativeCalendarProps,
  LocaleConfig
} from 'react-native-calendars'
import { Direction, Theme } from 'react-native-calendars/src/types'
import { useTheme } from 'styled-components'

interface CalendarProps extends NativeCalendarProps {}

LocaleConfig.locales['pt-br'] = dates
LocaleConfig.defaultLocale = 'pt-br'

const Calendar = ({ markedDates, onDayPress, ...props }: CalendarProps) => {
  const theme = useTheme()

  const headerStyle: ViewStyle = {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,

    borderBottomColor: theme.colors.text_detail,
    backgroundColor: theme.colors.background_secondary
  }

  const calendarTheme: Theme = {
    textDayHeaderFontSize: 10,
    textDayFontFamily: theme.fonts.primary_400,
    textDayHeaderFontFamily: theme.fonts.primary_500,

    textMonthFontSize: 20,
    monthTextColor: theme.colors.title,
    textMonthFontFamily: theme.fonts.secondary_500,

    arrowStyle: { marginHorizontal: -15 }
  }

  const renderArrow = (direction: Direction) => (
    <Feather
      size={24}
      color={theme.colors.text}
      name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
    />
  )

  return (
    <NativeCalendar
      firstDay={1}
      minDate={new Date()}
      markingType='period'
      theme={calendarTheme}
      onDayPress={onDayPress}
      renderArrow={renderArrow}
      markedDates={markedDates}
      headerStyle={headerStyle}
      {...props}
    />
  )
}

export default Calendar
