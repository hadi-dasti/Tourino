import { Router } from 'express';

import authAdminRouter from './auth/auth.admin.router';
import dashboardAdminRouter from './dashboard/dashboard.admin.routes'

const router: Router = Router();  


router.use('/auth-admin', authAdminRouter);

router.use('/dashboard-admin', dashboardAdminRouter);


export default router;