import { Router } from 'express';

// Import the routers for each endpoint clients
import registerClientRouter from './register/client.register.router';

const router: Router = Router();


router.use('/client', registerClientRouter);



export default router;



