import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

class User extends Model {
  static table = 'users'

  @field('user_id')
  user_id: string | undefined

  @field('name')
  name: string | undefined

  @field('email')
  email: string | undefined

  @field('driver_license')
  driver_license: string | undefined

  @field('avatar')
  avatar: string | undefined

  @field('token')
  token: string | undefined
}

export default User
