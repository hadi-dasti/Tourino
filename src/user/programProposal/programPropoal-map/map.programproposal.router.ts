import { Router } from 'express';
import { MapProgramProposal } from './map.programproposal.controller';

const mapProgramProposal = new MapProgramProposal();

const router: Router = Router();

router.get('/get-location', mapProgramProposal.getMapProgramProposalController);

router.post('/send-location', mapProgramProposal.mapProgramProposoalController);




export default router;