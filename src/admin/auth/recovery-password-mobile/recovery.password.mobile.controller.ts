import { Controller, Body, Post, NotFoundException } from '@nestjs/common';
import { RecoveryPasswordMobileService } from './recovery.password.mobile.service';
import { AuthAdminEntity } from '../auth.admin.entity';
import { AuthAdminDto } from '../auth.admin.dto';


@Controller('/api/v1/admin/auth-admin/recovery-password-password')
export class RecoveryPasswordMobileController {
  constructor(
    private RecoveryPasswordMobileService: RecoveryPasswordMobileService,
  ) {}

  @Post('/initial-mobile')
  public async initialMobileAdmin(
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
    }
  }
}
