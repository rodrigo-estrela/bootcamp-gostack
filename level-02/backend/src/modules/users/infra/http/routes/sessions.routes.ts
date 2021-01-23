import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateService from '@modules/users/services/AuthenticateService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateService = container.resolve(AuthenticateService);

  const { user, token } = await authenticateService.execute({ email, password });
  return response.json({ user, token });
});

export default sessionsRouter;
