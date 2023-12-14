import { Router } from 'express';

import authAdminRouter from './auth/auth.admin.router';


const router: Router = Router();  


router.use('/auth-admin', authAdminRouter);


export default router;