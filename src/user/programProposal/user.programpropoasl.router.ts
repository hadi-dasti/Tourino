import { Router } from 'express';

import uploadMovieRouter from './programProposal-movie/movie.programproposal.router';
import setMapRouter from './programPropoal-map/map.programproposal.router';
import uploadImageRouter from './programPropoal-image/image.programproposal.router';



import { ProgramProposal } from './user.programproposal.controller';



const router: Router = Router();

const programProposal = new ProgramProposal();

router.get('/get-program-propoal', programProposal.getProgramProposalController);

router.post('/create-program-proposal', programProposal.buildProgramProposalController);




router.use('/upload-movie', uploadMovieRouter);
router.use('/set-map', setMapRouter);
router.use('/upload-image-program-proposal', uploadImageRouter);

export default router