import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import CreateUserService from "./CreateUserService"

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    const user = await createUser.execute({
      name: 'any_name',
      email: 'mail@example.com',
      password: '123456'
    })
    console.log(user)
    expect(user).toHaveProperty('id')
  })
})
