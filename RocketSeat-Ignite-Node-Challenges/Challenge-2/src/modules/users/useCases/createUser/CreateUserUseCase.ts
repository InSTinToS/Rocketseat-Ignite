import { User } from '../../model/User'
import {
  ICreateUserDTO,
  IUsersRepository
} from '../../repositories/IUsersRepository'

type IRequest = ICreateUserDTO

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute(data: IRequest): User {
    if (this.usersRepository.findByEmail(data.email)) throw new Error('error')

    return this.usersRepository.create(data)
  }
}

export { CreateUserUseCase }
