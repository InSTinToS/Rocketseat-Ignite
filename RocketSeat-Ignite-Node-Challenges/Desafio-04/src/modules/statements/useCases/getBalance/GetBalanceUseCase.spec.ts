import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "@modules/statements/repositories/IStatementsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";

import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";

let statementsRepository: IStatementsRepository;
let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let getBalance: GetBalanceUseCase;

describe("GetBalanceUseCase", () => {
  beforeEach(() => {
    statementsRepository = new InMemoryStatementsRepository();
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    getBalance = new GetBalanceUseCase(statementsRepository, usersRepository);
  });

  it("should be able get balance", async () => {
    const createUserData = {
      name: "miguel",
      password: "miguel@1234",
      email: "miguel@miguel.com",
    };

    const createdUser = await createUserUseCase.execute(createUserData);

    if (!createdUser.id) throw new Error("User id not exists");

    const balance = await getBalance.execute({ user_id: createdUser.id });

    expect(balance).toHaveProperty("balance");
  });
});
