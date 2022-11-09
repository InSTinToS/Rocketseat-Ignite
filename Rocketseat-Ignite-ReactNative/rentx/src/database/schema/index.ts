import user from './user'
import car from './car'

import { appSchema } from '@nozbe/watermelondb'

const schemas = appSchema({
  version: 2,
  tables: [user, car]
})

export default schemas
