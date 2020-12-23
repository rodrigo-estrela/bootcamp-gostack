import { Router } from 'express';

import AuthenticateService from '../services/AuthenticateService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateService = new AuthenticateService();

  const { user, token } = await authenticateService.execute({ email, password });
  return response.json({ user, token });
})

export default sessionsRouter;
