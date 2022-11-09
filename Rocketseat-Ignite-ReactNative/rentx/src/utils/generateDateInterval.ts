import getPlataformDate from './getPlataformDate'
import theme from 'src/styles/theme'

import { eachDayOfInterval, format } from 'date-fns'
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking'
import { DateData } from 'react-native-calendars/src/types'

const generateDateInterval = (start: DateData, end: DateData) => {
  let interval: { [key: string]: MarkingProps } = {}

  eachDayOfInterval({
    end: new Date(end.timestamp),
    start: new Date(start.timestamp)
  }).forEach(item => {
    const date = format(getPlataformDate(item), 'yyyy-MM-dd')

    const isStartOrEnd = start.dateString === date || end.dateString === date

    interval = {
      ...interval,
      [date]: {
        color: isStartOrEnd ? theme.colors.main : theme.colors.main_light,
        type: 'period',
        endingDay: end.dateString === date,
        startingDay: start.dateString === date
      }
    }
  })

  return interval
}

export default generateDateInterval
