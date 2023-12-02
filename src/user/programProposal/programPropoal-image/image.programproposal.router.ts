import { Router } from 'express';
import { ImageProgramProposal } from './image.programproposal.controller';
import { uploadImageProgramPropoal } from './image.programproposal.upload';


const imageProgramProposal = new ImageProgramProposal()

const router: Router = Router();

router.post('/', uploadImageProgramPropoal.single('upload-image'), imageProgramProposal.buildImageProgramProposalController);


export default router