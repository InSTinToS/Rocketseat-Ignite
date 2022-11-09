import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ShowUserProfileUseCase } from "../showUserProfile/ShowUserProfileUseCase";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let readUserUseCase: ShowUserProfileUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    readUserUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const createUserData = {
      name: "miguel",
      email: "miguel@miguel.com",
      password: "miguel@1234",
    };

    const createdUser = await createUserUseCase.execute(createUserData);

    if (!createdUser.id) throw new Error("User id not exists");

    const foundCreatedUser = await readUserUseCase.execute(createdUser.id);

    expect(foundCreatedUser).toEqual(createdUser);
  });
});
