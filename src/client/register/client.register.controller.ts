import { Request, Response } from 'express';
import { AppDataSource } from './../../dataSource';
import { ClientRegisterDto } from './client.register.dto';
import { ClientRegisterEntity } from './client.register.entity';



export class ClientRegisterController{
    
    public async clientRegister(req:Request,res: Response):Promise<Response>{
        
        try {
           
            const clientRegisterDto: ClientRegisterDto = req.body;

            const client = AppDataSource.getRepository(ClientRegisterEntity).create(clientRegisterDto);
            const result = await AppDataSource.getRepository(ClientRegisterEntity).save(client);
           
            return res.status(201).json({
                success: true,
                data:{result},
                msg: "Successfully build client"
            });

        } catch (err) {
            console.log(err)
           return  res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    };
}

