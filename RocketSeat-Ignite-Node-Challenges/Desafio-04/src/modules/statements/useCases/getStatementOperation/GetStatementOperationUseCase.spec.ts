import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "@modules/statements/repositories/IStatementsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";

import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { OperationType } from "@modules/statements/entities/Statement";

let statementsRepository: IStatementsRepository;
let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("GetStatementOperationUseCase", () => {
  beforeEach(() => {
    statementsRepository = new InMemoryStatementsRepository();
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);

    createStatementUseCase = new CreateStatementUseCase(
      usersRepository,
      statementsRepository
    );

    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepository,
      statementsRepository
    );
  });

  it("should be able get balance", async () => {
    const createUserData = {
      name: "miguel",
      password: "miguel@1234",
      email: "miguel@miguel.com",
    };

    const createdUser = await createUserUseCase.execute(createUserData);

    if (!createdUser.id) throw new Error("User id not exists");

    const createdStatement = await createStatementUseCase.execute({
      amount: 100,
      user_id: createdUser.id,
      description: "description",
      type: "deposit" as OperationType,
    });

    const foundStatement = await getStatementOperationUseCase.execute({
      user_id: createdUser.id,
      statement_id: createdStatement.id,
    });

    expect(foundStatement).toEqual(createdStatement);
  });
});
