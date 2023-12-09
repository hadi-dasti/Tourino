import { Router } from 'express';
import { AuthUserController } from './auth.uesr.controller';
import { authUserValidation, verifyCodeOtp } from './auth.user.validation';

const router: Router = Router();

const authUserController = new AuthUserController();

// Route for user registration
router.post('/register', authUserValidation, authUserController.registerUserController.bind(authUserController));

// Route for OTP verification
router.post('/verify',verifyCodeOtp, authUserController.verifyCodeOtpcontroller.bind(authUserController));


export default router;