import { Router } from 'express';
import dashboardLoginRouter from './dashboard-login/dashboard.login.router';



const router: Router = Router();

router.use('/dashboard-login', dashboardLoginRouter);


export default router;