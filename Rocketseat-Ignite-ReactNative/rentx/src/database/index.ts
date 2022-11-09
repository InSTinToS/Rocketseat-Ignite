import { Platform } from 'react-native'

import User from './models/User'
import schemas from './schema'
import Car from './models/Car'

import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

const adapter = new SQLiteAdapter({
  schema: schemas,
  jsi: Platform.OS === 'ios'
})

const database = new Database({
  adapter,
  modelClasses: [User, Car]
})

export default database
