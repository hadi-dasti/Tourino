import { Router } from 'express';
import { FavoritesController } from './user.favorites.controller';


// Creating an Express Router instance
const router: Router = Router();

// Creating an instance of FavoritesController
const favoritesController = new FavoritesController();

// Defining routes for various endpoints

// Endpoint to display the page for favorite program
router.get('/', favoritesController.favoritesProgramPage);

// Endpoint to get all favorite programs
router.get('/show-all-favorites', favoritesController.getAllFavoritesProgram);

// Endpoint to get a specific favorite program by ID
router.get('/show-one-favorites/:id', favoritesController.getOneFavoritesProgram);


export default router;