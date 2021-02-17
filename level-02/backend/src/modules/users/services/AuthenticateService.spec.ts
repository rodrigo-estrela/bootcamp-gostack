import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import AuthenticateService from "./AuthenticateService"
import CreateUserService from './CreateUserService'

describe('AuthenticateService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUserService = new CreateUserService(fakeUsersRepository)

    await createUserService.execute({
      name: 'any_name',
      email: 'mail@example.com',
      password: '123456'
    })

    const auth = new AuthenticateService(fakeUsersRepository)

    const response = await auth.execute({
      email: 'mail@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
  })
})
