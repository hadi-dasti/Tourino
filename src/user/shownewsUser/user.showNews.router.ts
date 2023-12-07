import { Router } from 'express';
import { ShowNewsUserController } from './user.showNews.controller';



const router: Router = Router();

// Create an instance of the ShowNewsUserController
const showNewsusercontroller = new ShowNewsUserController();


// Define the route for fetching news
router.get('/', showNewsusercontroller.getShowNews);



export default router;