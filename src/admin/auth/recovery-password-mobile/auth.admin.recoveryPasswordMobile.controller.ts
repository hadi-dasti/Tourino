import { Request, Response } from 'express';
import { RecoveryPasswordMobileRepository } from './auth.admin.recoveryPasswordMobile.repository';
import { AuthAdminDto } from '../auth.admin.dto';


export class RecoveryPasswordMobileController {
  private RecoveryPasswordMobileRepository = RecoveryPasswordMobileRepository;

    
    // Initializes the recovery process for admin's mobile password
    public async initialMobileNumberAdmin(req: Request, res: Response): Promise<Response> {
      
    const AuthAdminDto: AuthAdminDto = req.body;

        try {
        
        const buildRecoveryMobileAdmin = await this.RecoveryPasswordMobileRepository.InitialMobileAdmin(AuthAdminDto);

      if (!buildRecoveryMobileAdmin) {
          return res.status(404).json({
              success: false,
              msg: 'Error Not Found mobileNumer Admin',
          });
            }
            
            // TODO: Send the codeOTP to the user's mobile number (e.g., via SMS)

            return res.status(201).json({
                success: true,
                msg: 'Successfully build initial reovery password admin ',
            });
        
    } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: 'Internal Server Error',
            });
        };
    };

    // Verifies the code OTP for admin's mobile password recovery
    public async verifyCodeOtpMobile(req:Request,res:Response): Promise<Response>{
        const authAdminDto: AuthAdminDto = req.body;
        
        try {
            await this.RecoveryPasswordMobileRepository.VerifyMobileAdmin(authAdminDto);
            
            return res.status(200).json({
                success: true,
                msg: "Verifyed codeotp is successfully"
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg : "Internal Server Error"
            })
        }
    }

    // Changes the password for admin's mobile password recovery
    public async buildPasswordAdmin(req: Request, res: Response): Promise<Response> {
        
        const { adminId } = req.params;
        const authAdminDto: AuthAdminDto = req.body;
        
        try {

            const newPasword = await this.RecoveryPasswordMobileRepository.ChangePasswordMoileAdmin(authAdminDto, adminId);

            if (!newPasword) {
                return res.status(400).json({
                    success: false,
                    msg: "Error not found "
                });
            }

            return res.status(201).json({
                success: true,
                data: { newPasword },
                msg: "Successfully update Password for admin "
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    
    }
}
