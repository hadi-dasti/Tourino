import { Router } from 'express';
import { uploadImageUserGroup } from './user.usergroup.uploadimage';
import { UserGroupController } from './user.usergroup.controller';


// Create an instance of the UserGroupController
const userGroupController = new UserGroupController();


// Create a new router instance
const router: Router = Router();


// Define the routes
router.get('/show-all-usergroup', userGroupController.getUserGroup);

router.post('/build-usergrop', uploadImageUserGroup.single('upload-image-uergroup'), userGroupController.buildUserGroup);

router.get('/usergroup/:usergroupId', userGroupController.getGroupUserId);

router.get('/usergroup/search', userGroupController.searchCodeGroup);


export default router;