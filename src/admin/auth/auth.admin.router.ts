import { Router } from 'express';
import { AuthAdminController } from './auth.admin.controller';




const router: Router = Router();


const authAdminController = new AuthAdminController();


router.post('/register', authAdminController.registerAdmin.bind(authAdminController));

router.post('/login', authAdminController.loginAdmin.bind(authAdminController));


export default router