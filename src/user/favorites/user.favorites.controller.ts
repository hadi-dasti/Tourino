import { Request, Response } from "express";
import { favoritesprograms } from './user.favorites.dto';
import { FavoritesPrograms} from './user.favorites.interface';



// Controller class for managing favorite programs
export class FavoritesController{

     // Endpoint to display the page for favorite programs
    public favoritesProgramPage(req: Request, res: Response) {

        try {
            return res.status(200).json({
                success: true,
                msg: "Successfully Show page Favorites Program"
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
         }
    }

    // Endpoint to get all favorite programs
    public getAllFavoritesProgram(req:Request, res:Response) {
        
        try {

            if (favoritesprograms.length === 0 || !favoritesprograms) {
                return res.status(404).json({
                    success: false,
                    msg: "Error Not Found"
                });
            }

            return res.status(200).json({
                success: true,
                data: { favoritesprograms },
                msg: "Show all Favorites Program"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
// Endpoint to get a specific favorite program by ID
    public getOneFavoritesProgram(req: Request, res: Response) {

        const { id } = req.params;

        try {

            const oneFavaoritesProgram = favoritesprograms.find((favorites: FavoritesPrograms) => favorites.id === id);

            if (!oneFavaoritesProgram) {
                return res.status(404).json({
                    success: false,
                    msg: `Error Not Found for Favorites Program ${id}`
                });
            }

            return res.status(200).json({
                success: true,
                msg: `Successfully found Favorite Program ${id}`
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg : "Internal Server Error"
            })
        }
    }
}