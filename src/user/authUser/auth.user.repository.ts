import { AppDataSource } from '../../dataSource';
import { AuthUserEntity } from './auth.user.entity';
import { AuthUserCredentialsDto, VerifyUserOtpMobileCredentialsDto } from './auth.user.dto';
import { generateOtp } from './auth.user.utils.codeotp';



export const authUserRepository = AppDataSource.getRepository(AuthUserEntity).extend({
    /**
     * Creates a new authentication user with the provided credentials.
     * Generates an OTP code and saves the user in the database.
     * @param authUserCredentialsDto The credentials of the authentication user.
     * @returns The generated OTP code.
     */

    async createAuthUser(authUserCredentialsDto: AuthUserCredentialsDto):Promise<void> {

        const { fullName, mobileNumber } = authUserCredentialsDto;
        
        let otpMobileCode = generateOtp(6);

        try {

            const users = this.create({
                fullName,
                mobileNumber,
                otpMobileCode
            })

            // LIST TODO set Api for send code to users mobile


            await this.save(users);
            console.log(`Sent OTP code ${users.otpMobileCode} to ${users.mobileNumber}`)

            // return otpMobileCode;

        } catch (err) {
            console.log(err)
            throw new Error('Failed to create auth user'); // Throw an error to handle the failure case
       }
        
    },


    /**
   * Verifies the OTP code for a mobile number and marks the user as verified.
   * @param verifyUserOtpMobileCredentialsDto The OTP verification credentials.
   */

    async verifyMobileOtp(verifyUserOtpMobileCredentialsDto: VerifyUserOtpMobileCredentialsDto):Promise<void> {
       
        const { mobileNumber, otpCode } = verifyUserOtpMobileCredentialsDto;

        try {

            const  user = await this.findOneBy({mobileNumber})

            if (!user) {
                throw new Error('User not found')
            }
            // set hotfix error
            if (user.otpMobileCode !== otpCode) {
                console.log('Invalid OTP code');
            }

            user.isVerified = true
            user.otpMobileCode = "";
            await this.save(user)
            console.log(user)

        } catch (err) {
            console.log(err)
        }
   }
})