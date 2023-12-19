import { Request, Response } from 'express';
import { AuthAdminDto } from './auth.admin.dto';
import { AuthAdminRepository } from './auth.admin.repository';

export class AuthAdminController {
  private authAdminRepository = AuthAdminRepository;

  public async registerAdmin(req: Request, res: Response): Promise<Response> {
    const authAdminDto: AuthAdminDto = req.body;

    try {
      const admin = await this.authAdminRepository.registerAdmin(authAdminDto);

      if (!admin) {
        return res.status(404).json({
          success: false,
          msg: 'Error Not Found',
        });
      }

      return res.status(201).json({
        success: true,
        data: { admin },
        msg: 'User created successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: 'Internal Server Error',
      });
    }
  }
  
    // Logs in an admin
  public async loginAdmin(req: Request, res: Response): Promise<Response> {

    const authAdminDto: AuthAdminDto = req.body;

    try {

      const adminLogin = await this.authAdminRepository.loginAdmin(authAdminDto);

      if (!adminLogin) {
        return res.status(401).json({
          success: false,
          msg: 'Invalid credentials',
        });
      }

      return res.status(200).json({
        success: true,
        msg: 'Admin logged in successfully',
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
