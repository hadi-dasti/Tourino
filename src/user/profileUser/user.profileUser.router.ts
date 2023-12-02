import { Router } from 'express';
import { ProfileUseController } from './user.profileUser.controller';
import upload from './user.profileUser.uploadImage';


const profileUseController = new ProfileUseController()



const router: Router = Router();

router.post('/complete-profile', upload.single('image'),
    profileUseController.buildProfileUser.bind(profileUseController));


export default router