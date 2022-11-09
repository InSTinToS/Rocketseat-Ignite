import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "@modules/statements/repositories/IStatementsRepository";
import { StatementsRepository } from "@modules/statements/repositories/StatementsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/repositories/UsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

import { OperationType } from "@modules/statements/entities/Statement";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
let createStatementUseCase: CreateStatementUseCase;
let statementsRepository: IStatementsRepository;
let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let getBalance: GetBalanceUseCase;

describe("CreateStatementUseCase", () => {
  beforeEach(() => {
    statementsRepository = new InMemoryStatementsRepository();
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    getBalance = new GetBalanceUseCase(statementsRepository, usersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      usersRepository,
      statementsRepository
    );
  });

  it("should be able to deposit", async () => {
    const createUserData = {
      name: "miguel",
      email: "miguel@miguel.com",
      password: "miguel@1234",
    };

    const createdUser = await createUserUseCase.execute(createUserData);

    if (!createdUser.id) throw new Error("User id not exists");

    const depositAmount = 100;

    await createStatementUseCase.execute({
      amount: depositAmount,
      user_id: createdUser.id,
      description: "description",
      type: "deposit" as OperationType,
    });

    const balance = (await getBalance.execute({ user_id: createdUser.id }))
      .balance;

    expect(balance).toBe(depositAmount);
  });

  it("should be able to withdraw", async () => {
    const createUserData = {
      name: "miguel",
      email: "miguel@miguel.com",
      password: "miguel@1234",
    };

    const createdUser = await createUserUseCase.execute(createUserData);

    if (!createdUser.id) throw new Error("User id not exists");

    const depositAmount = 100;

    await createStatementUseCase.execute({
      amount: depositAmount,
      user_id: createdUser.id,
      description: "description",
      type: "deposit" as OperationType,
    });

    await createStatementUseCase.execute({
      amount: depositAmount / 2,
      user_id: createdUser.id,
      description: "description",
      type: "withdraw" as OperationType,
    });

    const balance = (await getBalance.execute({ user_id: createdUser.id }))
      .balance;

    expect(balance).toBe(depositAmount / 2);
  });
});
