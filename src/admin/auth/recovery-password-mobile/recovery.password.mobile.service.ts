import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthAdminEntity } from '../auth.admin.entity';
import { AuthAdminDto } from '../auth.admin.dto';
import { GenerateOtp } from './recovery.password.mobile.helper';



// Repository for managing recovery of admin's mobile password
@Injectable()
export class RecoveryPasswordMobileService {
  constructor(
    @InjectRepository(AuthAdminEntity)
    private authAdminEntity: Repository<AuthAdminEntity>,
  ) {}

  // Initializes the recovery process for admin's mobile password
  public async initialMobileAdmin(
    authAdminDto: AuthAdminDto,
  ): Promise<AuthAdminEntity> {
    const { mobileNumber } = authAdminDto;

    try {
      const matchMobileNumber = await this.authAdminEntity.findOneBy({
        mobileNumber,
      });

      if (!matchMobileNumber) {
        throw new NotFoundException('mobile admin not found');
      }

      // Generate codeOTP
      const newCodeOtp = GenerateOtp(6);
      matchMobileNumber.codeOtp = newCodeOtp;

      console.log(`Sent OTP code ${matchMobileNumber.codeOtp} to ${matchMobileNumber.mobileNumber}`);
      return await this.authAdminEntity.save(matchMobileNumber);
      
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to initialize mobile admin recovery process')
    }
  }

  // Verifies the code OTP for admin's mobile password recovery
  public async verifyMobileAdmin(authAdminDto: AuthAdminDto): Promise<void>{
    
    const { codeOtp } = authAdminDto;

    try {

      const verifyCodeOtpMobile = await this.authAdminEntity.findOneBy({ codeOtp });

      if (!verifyCodeOtpMobile) {
        console.log('Error: CodeOTP not found');
        throw new NotFoundException('CodeOTP not found');
      }

      if (verifyCodeOtpMobile.codeOtp !== codeOtp) {
        console.log('Error: CodeOTP does not match');
        throw new UnauthorizedException('Invalid CodeOTP');
      }

      // CodeOTP verification successful
      console.log('CodeOTP verification successful');
      
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Failed to verify mobile admin recovery OTP');
    }
  }

  // Changes the password for admin's mobile password recovery
  public async changePasswordAdmin(authAdminDto: AuthAdminDto, id: string): Promise<AuthAdminEntity>{
    
    const { password } = authAdminDto;

    try {

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const existingAdmin = await this.authAdminEntity.findOneBy({ id });

       if (!existingAdmin) {
         console.log('Error: Admin not found with the provided id');
         throw new NotFoundException('Admin not found with the provided id');
      }
      
      existingAdmin.password = hashedPassword;
      existingAdmin.codeOtp = "";

      const newPasswordAdmin = await this.authAdminEntity.save(existingAdmin);
      return newPasswordAdmin;

    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Failed to change admin password');
    }
  }
}
