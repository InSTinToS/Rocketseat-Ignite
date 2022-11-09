import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ShowUserProfileUseCase } from "../showUserProfile/ShowUserProfileUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let readUserUseCase: ShowUserProfileUseCase;

describe("ShowUserProfileUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    readUserUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to show user profile", async () => {
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
