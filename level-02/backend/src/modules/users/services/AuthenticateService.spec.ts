import AppError from "@shared/errors/AppError"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import AuthenticateService from "./AuthenticateService"
import CreateUserService from './CreateUserService'

describe('AuthenticateService', () => {
  it('should be able to authenticate a user when valid data is provided', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    await createUserService.execute({
      name: 'any_name',
      email: 'mail@example.com',
      password: '123456'
    })

    const auth = new AuthenticateService(fakeUsersRepository, fakeHashProvider)

    const response = await auth.execute({
      email: 'mail@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate when the user does not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const auth = new AuthenticateService(fakeUsersRepository, fakeHashProvider)

    auth.execute({
      email: 'mail@example.com',
      password: '123456'
    })

    expect(auth.execute({
      email: 'mail@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate a user when invalid data is provided', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    await createUserService.execute({
      name: 'any_name',
      email: 'mail@example.com',
      password: '123456'
    })

    const auth = new AuthenticateService(fakeUsersRepository, fakeHashProvider)

    const response = await auth.execute({
      email: 'mail@example.com',
      password: 'wrong_password'
    })

    expect(response).toHaveProperty('token')
  })
})
