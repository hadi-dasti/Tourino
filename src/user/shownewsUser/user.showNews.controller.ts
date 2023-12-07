import { Request, Response } from 'express';

// Define the ShowNewsUserController class
export class ShowNewsUserController{
    
    public async getShowNews(req: Request, res: Response): Promise<Response> {
        
        try {
            return res.status(200).json({
                success: true,
                msg: "Successfully get showNews "
            });

        } catch (err) {
            console.log(err)
            return res.status(404).json({
                success: false,
                msg: "Error Not Found ShowNews"
            });
        }
    }
}