import { Router } from 'express';

import AuthenticateService from '@modules/users/services/AuthenticateService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();

  const authenticateService = new AuthenticateService(usersRepository);

  const { user, token } = await authenticateService.execute({ email, password });
  return response.json({ user, token });
});

export default sessionsRouter;
