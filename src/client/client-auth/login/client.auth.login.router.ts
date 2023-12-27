import { Router } from 'express';
import { LoginClientController } from './client.auth.login.controller';

const loginClientController = new LoginClientController();

const router: Router = Router();

router.post('/client-login', loginClientController.buildLoginClient);

export default router;
