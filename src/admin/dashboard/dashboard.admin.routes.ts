import { Router } from 'express';

import dashboardLoginRouter from './dashboard-login/dashboard.login.router';
import programManagementRouter from './program-management/program.management.router';


const router: Router = Router();

router.use('/dashboard-login', dashboardLoginRouter);
router.use('/program-management', programManagementRouter);


export default router;