import { Router } from 'express';

// Import the routers for each endpoint clients
import registerClientRouter from './client-auth/client.auth.routes';

const router: Router = Router();


router.use('/client', registerClientRouter);



export default router;



