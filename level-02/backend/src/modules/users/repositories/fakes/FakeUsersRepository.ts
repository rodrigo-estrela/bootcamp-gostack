import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { v4 } from "uuid";


class UsersRepository implements IUsersRepository {
  private users: User[] = []

  async findByEmail (email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email)

    return foundUser
  }

  async findById (id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id)

    return foundUser
  }

  async create (data: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: v4() }, data)

    this.users.push(user)

    return user
  }

  async save (user: User): Promise<User> {
    const index = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[index] = user

    return user;
  }

}

export default UsersRepository;
