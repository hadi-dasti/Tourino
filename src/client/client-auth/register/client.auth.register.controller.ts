import { Request, Response } from 'express';
import { AppDataSource } from '../../../dataSource';
import { ClientAuthDto } from '../client.auth.dto';
import { ClientAuthEntity } from '../client.auth.entity';
import * as bcrypt from 'bcryptjs';




export class ClientRegisterController {
  public async clientRegister(req: Request, res: Response): Promise<Response> {
    const clientAuthDto: ClientAuthDto = req.body;
    const hashedPassword = await bcrypt.hash(clientAuthDto.password, 10); // Hashing the password
    try {
      const registerClient = AppDataSource.getRepository(
        ClientAuthEntity,
      ).create({ ...clientAuthDto, password: hashedPassword });

      if (!registerClient) {
        return res.status(400).json({
          success: false,
          msg: 'Error Bad Request',
        });
      }

      const newRegisterClient = await AppDataSource.getRepository(
        ClientAuthEntity,
      ).save(registerClient);

      if (!newRegisterClient) {
        return res.status(404).json({
          success: false,
          msg: 'Error Not Found',
        });
      }

      return res.status(201).json({
        success: true,
        data: { newRegisterClient },
        msg: 'Successfully create client',
      });
      
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: 'Internal Server Error',
      });
    }
  }
}
