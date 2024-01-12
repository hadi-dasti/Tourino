import {
  Controller,
  Body,
  Post,
  NotFoundException,
  Put,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { RecoveryPasswordMobileService } from './recovery.password.mobile.service';
import { AuthAdminEntity } from '../auth.admin.entity';
import { AuthAdminDto } from '../auth.admin.dto';

@Controller('/api/v1/admin/auth-admin/recovery-password')
export class RecoveryPasswordMobileController {
  constructor(
    private RecoveryPasswordMobileService: RecoveryPasswordMobileService,
  ) {}

  @Post('/initial-mobile')
  async initialMobileAdmin(
    @Body() authAdminDto: AuthAdminDto,
  ): Promise<AuthAdminEntity> {
    try {
      const newInitialMobileAdmin =
        await this.RecoveryPasswordMobileService.initialMobileAdmin(
          authAdminDto,
        );

      if (!newInitialMobileAdmin) {
        throw new NotFoundException('Error Not Found');
      }

      // TODO: Send the codeOTP to the user's mobile number (e.g., via SMS)

      return newInitialMobileAdmin;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Failed to initialize mobile admin recovery process',
      );
    }
  }

  @Post('/verify-codeOtp')
  async verifyCodeOtpMobile(@Body() authAdminDto: AuthAdminDto): Promise<void> {
    try {
      await this.RecoveryPasswordMobileService.verifyMobileAdmin(authAdminDto);
    } catch (err) {
      throw new InternalServerErrorException('Verify codeOtp failed');
    }
  }

  @Put('/new-password/:adminId')
  async changePasswordAdmin(
    @Body() authAdminDto: AuthAdminDto,
    @Param('adminId') id: string,
  ): Promise<AuthAdminEntity> {
    try {
      const newPassword =
        await this.RecoveryPasswordMobileService.changePasswordAdmin(
          authAdminDto,
          id,
        );
      if (!newPassword) {
        throw new NotFoundException('Password change failed');
      }
      return newPassword;
    } catch (err) {
      throw new InternalServerErrorException(
        'Password change operation failed',
      );
    }
  }
}
