import { tableSchema } from '@nozbe/watermelondb'

const car = tableSchema({
  name: 'cars',
  columns: [
    {
      name: 'name',
      type: 'string'
    },
    {
      name: 'about',
      type: 'string'
    },
    {
      name: 'fuel_type',
      type: 'string'
    },
    {
      name: 'period',
      type: 'string'
    },
    {
      name: 'price',
      type: 'number'
    },
    {
      name: 'thumbnail',
      type: 'string'
    }
  ]
})

export default car
