import { Platform } from 'react-native'

import { addDays } from 'date-fns'

const getPlataformDate = (date: Date) =>
  Platform.OS == 'ios' ? addDays(date, 1) : date

export default getPlataformDate
