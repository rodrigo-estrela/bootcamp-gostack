import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


import User from '../models/User'
import authConfig from '../config/auth'
import auth from '../config/auth';

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User,
  token: string,
}

class AuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      email
    })

    if(!user){
      throw new Error('Invalide email/password combination')
    }

    const comparedPassword = await compare(password, user.password)

    if(!comparedPassword){
      throw new Error('Invalide email/password combination')
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateService;
