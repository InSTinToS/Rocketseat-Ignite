import { User } from '../../model/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const foundUser = this.usersRepository.findById(user_id)

    console.log('adminUser', foundUser)
    if (!foundUser) throw new Error('Not found user with this id')

    return this.usersRepository.turnAdmin(foundUser)
  }
}

export { TurnUserAdminUseCase }
