import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { ClientAuthDto } from '../client.auth.dto';
import { AppDataSource } from '../../../dataSource';
import { ClientAuthEntity } from '../client.auth.entity';


// Method to handle client login
export class LoginClientController {
  public async buildLoginClient(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // Destructuring managerFirstName, managerLastName, and password from the request body
    const { managerFirstName, managerLastName, password }: ClientAuthDto =
      req.body;

    try {

      // Query the database to find the client based on managerFirstName and managerLastName
      const checkClientLogin = await AppDataSource.getRepository(
        ClientAuthEntity,
      ).findOne({
        where: {
          managerFirstName,
          managerLastName,
        },
      });

       // If client is not found, return 404 with error message
      if (!checkClientLogin) {
        return res.status(404).json({
          success: false,
          msg: 'Error Not Found',
        });
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(
        password,
        checkClientLogin.password,
      );
        // If password doesn't match, return 401 with error message
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          msg: 'Invalid password',
        });
      }

      // If client is found and password matches, return 200 with success message
      return res.status(200).json({
        success: true,
        msg: 'Successfully login client',
      });

    } catch (err) {
      // If an error occurs, log the error and return 500 with error message
      console.error(err);
      return res.status(500).json({
        success: false,
        msg: 'Internal  Server Error',
      });
    }
  }
}
