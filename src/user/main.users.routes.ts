import { Router } from 'express';

import authUserRouter from './authUser/auth.user.router';
import completeProfileUserRouter from './profileUser/user.profileUser.router';
import listToursRouter from './listTour/user.listTour.router';
import myTeamUserRouter from './myTeam/user.myTeam.router';
import packageRouter from './packages/user.package.router';
import programProposalRouter from './programProposal/user.programpropoasl.router';
import userGroupRouter from './usergroup/user.usergroup.router';
import userFavoritesRouter from './favorites/user.favorites.router';

const router: Router = Router();

router.use('/auth-user', authUserRouter);

router.use('/profile-user', completeProfileUserRouter);

router.use('/list-tour', listToursRouter);

router.use('/my-team-user', myTeamUserRouter);

router.use('/package', packageRouter);

router.use('/program-proposal', programProposalRouter);

router.use('/usergroup', userGroupRouter);

router.use('/favorites', userFavoritesRouter);


export default router;
