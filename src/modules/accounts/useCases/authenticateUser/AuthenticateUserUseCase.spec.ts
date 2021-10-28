import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTo";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let autheticateUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", ()=>{
  beforeEach(()=>{

    usersRepositoryInMemory = new UserRepositoryInMemory();
    autheticateUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

  })
  it("should be able to autheticate an user", async ()=>{
    const user: ICreateUserDTO = {
      driver_license: "123",
      email: "juniorbezerrass38@gmail.com",
      password: "123sss",
      name:"junior"
    }

    await createUserUseCase.execute(user);

    const userAutheicate = await autheticateUseCase.execute({email: user.email, password: user.password})
    expect(userAutheicate).toHaveProperty("token");
  })

  it("should not be able to autheticate an none exist user", async ()=>{
    expect( async ()=>{

    await autheticateUseCase.execute({email: "teste", password: "teste"})
    }).rejects.toBeInstanceOf(AppError);
  })

  it("should not to be able to authentication with incorrect password",async ()=>{

    expect(async ()=>{
      const user: ICreateUserDTO = {
        driver_license: "12de3",
        email: "juniorbezerrffadedss38@gmail.com",
        password: "123sdedss",
        name:"jundedior"
      }
  
      await createUserUseCase.execute(user);
      await autheticateUseCase.execute({email: user.email, password: "incorroto"})
    }).rejects.toBeInstanceOf(AppError);
  })
})