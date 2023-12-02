import { Request, Response } from "express";
import { ListTourUser } from './user.listTour.interface';



export class ListTours{

    public getListTour(req: Request, res: Response) {
        
        try {
            const tours: ListTourUser[] = [
                {
                    nameTour: "Tour 1",
                    price: "100",
                    date: new Date("2023-11-18"),
                    periodOfTime: new Date("2023-11-18T09:00:00"),
                },
                {
                    nameTour: "Tour 2",
                    price: "120",
                    date: new Date("2023-11-20"),
                    periodOfTime: new Date("2023-11-20T14:00:00"),
                },
                {
                    nameTour: "Tour 3",
                    price: "90",
                    date: new Date("2023-11-22"),
                    periodOfTime: new Date("2023-11-22T11:00:00"),
                },
            ];

        if (tours.length === 0) {
            return res.status(400).json({
                success: false,
                msg :"Error for get list Tour"
            })
            }

            return res.status(200).json({
                success: true,
                msg: "Successfully get all Tours"
            });

        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        };
        
    };
    
}




