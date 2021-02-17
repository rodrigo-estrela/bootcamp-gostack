import AppError from "@shared/errors/AppError"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from "./CreateUserService"

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'any_name',
      email: 'mail@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user if provider email is already in use', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    await createUser.execute({
      name: 'any_name',
      email: 'mail@example.com',
      password: '123456'
    })

    expect(
      createUser.execute({
        name: 'any_name',
        email: 'mail@example.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
