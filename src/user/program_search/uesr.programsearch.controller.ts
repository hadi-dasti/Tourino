import { Request, Response } from "express";





export class ProgramSearchController{

    /**
     * Get the main page for program search
     * @param req - The request object
     * @param res - The response object
     * @returns The response with success message or error message
     */

    public async getMainPageProgramSearch(req: Request, res: Response): Promise<Response>{
        
        try {
            return res.status(200).json({
                success: true,
                msg: "Successfully get main page program search"
            });
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg : "Internal Server Error"
            })
        }
    }

}