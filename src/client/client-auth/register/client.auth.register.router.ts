import { Router } from 'express';
import {ClientRegisterController} from './client.auth.register.controller'

const clientRegisterController = new ClientRegisterController();

// Create a new router instance
const router: Router = Router();

// Register a client
router.post('/register-client', clientRegisterController.clientRegister);


export default router;




