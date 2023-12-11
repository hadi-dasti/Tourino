import { Request, Response } from 'express';
import { AuthUserCredentialsDto,VerifyUserOtpMobileCredentialsDto } from './auth.user.dto';
import { authUserRepository } from './auth.user.repository';


export class AuthUserController{
    
    private readonly authUserRepository = authUserRepository;
    
     /**
     * Creates a new authentication user with the provided credentials.
     *  req The HTTP request object.
     *  res The HTTP response object.
     */

    public async registerUserController(req: Request, res: Response): Promise<void> {
       
        const authUserCredentialsDto: AuthUserCredentialsDto = req.body;
        
        try {

            await this.authUserRepository.createAuthUser(authUserCredentialsDto)

            res.status(201).json({
                success: true,
                msg: "User created successfully"
            });

        } catch (err) {
            console.log(err)
            if (err.message == "User not Found") {
                res.status(404).json({
                    success: false,
                    msg: "user not foud"
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: "Internal Server Error"
                });
            } 
        };     
    };

    /**
     * Verifies the OTP code for a mobile number and marks the user as verified.
     *  req The HTTP request object.
     *  res The HTTP response object.
     */

    public async verifyCodeOtpcontroller(req: Request, res: Response): Promise<void> {
        
        const verifyUserOtpMobileCredentialsDto: VerifyUserOtpMobileCredentialsDto = req.body;

        try {
            
            await this.authUserRepository.verifyMobileOtp(verifyUserOtpMobileCredentialsDto)

            res.status(200).json({
                success: true,
                msg: "successfully for login user"
            });
            
        } catch (err) {
            console.log(err)
            if (err.message === 'Invalid OTP code') {
                res.status(400).json({
                    success: false,
                    msg: "Invalid OTP code"
                });
            }else{
                res.status(500).json({
                    success: false,
                    msg: "Internal Server Error"
                });
            };
        };
    };
}