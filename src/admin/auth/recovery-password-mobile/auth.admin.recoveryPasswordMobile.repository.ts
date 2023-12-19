import { AuthAdminDto } from '../auth.admin.dto';
import { AuthAdminEntity } from '../auth.admin.entity';
import { AppDataSource } from '../../../dataSource';
import { generateOtp } from './auth.admin.reoveryPasswordMobile.utils.codeotp';
import * as bcrypt from 'bcryptjs';


// Repository for managing recovery of admin's mobile password
export const RecoveryPasswordMobileRepository = AppDataSource.getRepository(AuthAdminEntity).extend({

     // Initializes the recovery process for admin's mobile password
    async InitialMobileAdmin(authAdminDto: AuthAdminDto): Promise<AuthAdminEntity> {
        
        let { mobileNumber } = authAdminDto;
        

        try {

            const existingAdmin = await this.findOneBy({ mobileNumber });

            if (!existingAdmin) {
                throw new Error("Mobile number is not found in the database");
            }

            const codeOtp = generateOtp(6); // Generate codeOTP
            existingAdmin.codeOtp = codeOtp

            const newAdmin = await this.save(existingAdmin);
            console.log(`Sent OTP code ${existingAdmin.codeOtp} to ${existingAdmin.mobileNumber}`)

            return newAdmin;

        } catch (err) {
            console.log(err)
            return err
        }
    },

    // Verifies the code OTP for admin's mobile password recovery
    async VerifyMobileAdmin(authAdminDto: AuthAdminDto): Promise<void> {
        
        const { codeOtp } = authAdminDto;

        try {
            const adminWithCodeOtp = await this.findOneBy({ codeOtp });

            if (!adminWithCodeOtp) {
                console.log('Error: CodeOTP not found');
                throw new Error('CodeOTP not found');
            }

            if (adminWithCodeOtp.codeOtp !== codeOtp) {
                console.log('Error: CodeOTP does not match');
                throw new Error('CodeOTP does not match');
            }
           
            // CodeOTP verification successful
            console.log('CodeOTP verification successful');

        } catch (err) {
            console.log(err)
            throw err; // Rethrow the error to be handled by the caller
        }

    },

    // Changes the password for admin's mobile password recovery
    async ChangePasswordMoileAdmin(authAdminDto: AuthAdminDto, id: string): Promise<AuthAdminEntity> {
       
        const { password } = authAdminDto;
        
        try {

            const hashedPassword = await bcrypt.hash(password, 10);

            const existingAdmin = await this.findOneBy({ id });

            if (!existingAdmin) {
                console.log('Error: Admin not found with the provided id');
                throw new Error('Admin not found with the provided id');
            }
           
            existingAdmin.password = hashedPassword;
            existingAdmin.codeOtp = "";


            return await this.save(existingAdmin);

        } catch (err) {
            console.log(err)
            return err
        }
    }
});