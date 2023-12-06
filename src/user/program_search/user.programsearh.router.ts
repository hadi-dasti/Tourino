import { Router } from 'express';
import { ProgramSearchController } from './uesr.programsearch.controller';



const router: Router = Router();

// Create a new instance of ProgramSearchController
const programSearchController = new ProgramSearchController();


// Register a GET route for the main page of the program search feature
router.get('/', programSearchController.getMainPageProgramSearch);



export default router