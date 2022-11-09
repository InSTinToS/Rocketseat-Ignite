import { User } from '../../model/User'
import { IUsersRepository, ICreateUserDTO } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private users: User[]

  private static INSTANCE: UsersRepository

  private constructor() {
    this.users = []
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository()
    }

    return UsersRepository.INSTANCE
  }

  create(data: ICreateUserDTO): User {
    const newUser = new User()

    Object.assign(newUser, data)

    this.users.push(newUser)

    return newUser
  }

  findById(id: string): User | undefined {
    return this.users.find(user => user.id === id)
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email)
  }

  turnAdmin(receivedUser: User): User {
    const index = this.users.indexOf(receivedUser)
    this.users[index] = { ...receivedUser, admin: true }
    return this.users[index]
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository }