import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTo";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async create({
    driver_license,
    email,
    name,
    avatar,
    id,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar,
    });
    await this.repository.save(user);
    return user;
  }
}

export { UsersRepository };