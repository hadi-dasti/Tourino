import { Router } from 'express';
import { MovieProgramProposal } from './movie.programproposal.controller';
import { uploadMovie } from './movie.programproposal.upload';

const movieProgramProposal = new MovieProgramProposal();

const router: Router= Router()

router.post('/',uploadMovie.single('upload-movie'), movieProgramProposal.buildMovieProgramProposalController);



export default router;