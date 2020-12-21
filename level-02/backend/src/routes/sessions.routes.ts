import { Router } from 'express';

import AuthenticateService from '../services/AuthenticateService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try{
    const { email, password } = request.body;

    const authenticateService = new AuthenticateService();

    const { user, token } = await authenticateService.execute({ email, password });
    return response.json({ user, token });
  } catch(err) {
    return response.status(400).json({ message: err.message })
  }
})

export default sessionsRouter;
