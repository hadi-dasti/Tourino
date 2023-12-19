import { Router } from 'express';
import { AuthAdminController } from './auth.admin.controller';


// recovery-pasword-mobile
import recoveryPasswordMobileRouter from './recovery-password-mobile/auth.admin.recoveryPasswordMobile.router';

const router: Router = Router();


const authAdminController = new AuthAdminController();


router.post('/register', authAdminController.registerAdmin.bind(authAdminController));

router.post('/login', authAdminController.loginAdmin.bind(authAdminController));


// router middelware
router.use('/recovery-password', recoveryPasswordMobileRouter);
export default router