import { Router } from 'express';

import { MyTeamController } from './user.myTeam.controller';



const router: Router = Router();

const myTeamController = new MyTeamController();

router.post('/build-my-team-user/:profileUserId', myTeamController.buildMyTeamUser);
router.get('/show-all-my-team-user', myTeamController.getAllMyTeamUser);
router.get('/show-my-team-user/:myteamuserid', myTeamController.getOneMyTeamUser);
router.put('/update-my-team-user/:myteamuserid', myTeamController.updateMyTeamUser);
router.delete('/delete-my-team-user/:myteamuserid', myTeamController.deleteMyTeamUser);


router.post('/sent-my-team-user/:profileUserId', myTeamController.sentMyTeamUser);




export default router;