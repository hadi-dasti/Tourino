import {
  Injectable,
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
    }
  }
}
