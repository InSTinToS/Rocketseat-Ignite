import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

class Car extends Model {
  static table = 'cars'

  @field('name')
  name: string | undefined

  @field('brand')
  brand: string | undefined

  @field('about')
  about: string | undefined

  @field('fuel_type')
  fuel_type: string | undefined

  @field('period')
  period: string | undefined

  @field('price')
  price: string | undefined

  @field('thumbnail')
  thumbnail: string | undefined
}

export default Car
