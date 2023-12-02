import { Router } from 'express';
import { UserGroupController } from './user.usergroup.controller';



const userGroupController = new UserGroupController();


const router: Router = Router();


router.get('/show-all-usergroup', userGroupController.getUserGroup);


export default router;