import { Response, Request } from 'express'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const data = request.body
      const created = this.createUserUseCase.execute(data)
      return response.status(201).json(created)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { CreateUserController }
