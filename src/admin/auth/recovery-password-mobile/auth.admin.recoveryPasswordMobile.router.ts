import { Router } from 'express';
import { RecoveryPasswordMobileController } from './auth.admin.recoveryPasswordMobile.controller';

// Create an instance of RecoveryPasswordMobileController
const recoveryPasswordMobileController = new RecoveryPasswordMobileController();


const router: Router = Router();

// Endpoint for initiating the recovery process for admin's mobile password
router.post('/reovery-password-request', recoveryPasswordMobileController.initialMobileNumberAdmin.bind(recoveryPasswordMobileController));

// Endpoint for verifying the code OTP for admin's mobile password recovery
router.post('/verify-codeotp-mobile', recoveryPasswordMobileController.verifyCodeOtpMobile.bind(recoveryPasswordMobileController));

// Endpoint for updating the password for admin's mobile password recovery
router.put('/update-password-admin/:adminId', recoveryPasswordMobileController.buildPasswordAdmin.bind(recoveryPasswordMobileController));


export default router;