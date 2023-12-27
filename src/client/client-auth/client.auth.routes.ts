import { Router } from 'express';
import registerClientRouter from './register/client.auth.register.router';
import loginClientRouter from './login/client.auth.login.router';


// Create a new router instance
const router: Router = Router();

// Mount the registerClientRouter at the '/auth-client-register' endpoint
router.use('/auth-client-register', registerClientRouter);

// Mount the loginClientRouter at the '/auth-client-login' endpoint
router.use('/auth-client-login', loginClientRouter);

export default router;