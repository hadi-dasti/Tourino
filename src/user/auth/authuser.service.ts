import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserDto } from './authuser.dto';
import { AuthUserEntity } from './authuser.entity';
import { generateOtp } from './authuser.helper';



@Injectable()
export class AuthUserService{
    constructor(
        @InjectRepository(AuthUserEntity)
        private authUserRepository : Repository<AuthUserEntity>
    ) { }
    
    async singUp(authUserDto: AuthUserDto): Promise<AuthUserEntity> {
        
        const { fullName, mobileNumber } = authUserDto;
        
        try {

            const newUser = this.authUserRepository.create({
                fullName,
                mobileNumber
            });

            if (!newUser) {
                console.log('Error creating user')
            }

            // Generate OTP
            const OTP_LENGTH = 6;
            const generatedOtp = generateOtp(OTP_LENGTH);

            // Send the OTP code to the user's client (e.g., via SMS or email)
            // TODO: Implement code to send OTP to user's client
            
            newUser.codeOtp = generatedOtp;
            newUser.isVerified = false;
            
            return await this.authUserRepository.save(newUser);


        } catch (err) {
            console.log(err)
        }
    }

    async verifyUser(id:string, otp:string): Promise<AuthUserEntity>{
       
        try {
            const findUserId = await this.authUserRepository.findOneBy({ id });

            if (!findUserId) {
                console.log('User not found')
            };

            if (findUserId.codeOtp !== otp) {
                 console.log('OTP does not match')
            };

            findUserId.codeOtp = "";
            findUserId.isVerified = true

            return await this.authUserRepository.save(findUserId);

        } catch (err) {
            console.log(err)
        }
    }

}