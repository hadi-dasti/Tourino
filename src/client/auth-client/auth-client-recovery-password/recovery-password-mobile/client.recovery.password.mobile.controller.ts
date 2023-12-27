import {
  Controller,
  Post,
  Patch,
  Body,
  NotFoundException,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { RecoveryPasswordMobileService } from './client.recovery.password.mobile.service';
import { AuthClientEntity } from '../../auth.client.entity';
import { AuthClientDto } from '../../auth.client.dto';

@Controller('/api/v1/admin/auth-client/recovery-password')
export class RecoveryPasswordMobileClientController {
  constructor(
    private readonly recoveryPasswordMobileService: RecoveryPasswordMobileService,
  ) {}

  @Post('/initial-mobile')
  public async initialMobileClient(
    @Body() authClientDto: AuthClientDto,
  ): Promise<AuthClientEntity> {
    try {
      const newInitialMobileClient =
        await this.recoveryPasswordMobileService.initialMobileClient(
          authClientDto,
        );

      if (!newInitialMobileClient) {
        throw new NotFoundException('Error Not Found');
      }

      // TODO: Send the codeOTP to the user's mobile number (e.g., via SMS)

      return newInitialMobileClient;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Failed to initialize mobile client recovery process',
      );
    }
  }

    
  @Post('/verify-codeOtp')
  public async verifyCodeOtpMobileClient(
    @Body() authClientDto: AuthClientDto,
  ): Promise<void> {
    try {
      await this.recoveryPasswordMobileService.verifyMobileCodeClient(
        authClientDto,
      );
    } catch (err) {
      throw new InternalServerErrorException('Verify codeOtp failed');
    }
  }

  @Patch('/:clientId/change-password')
  public async changePasswordClient(
    @Body() authClientDto: AuthClientDto,
    @Param('clientId') id: string,
  ): Promise<AuthClientEntity> {
    try {
      const newPassword =
        await this.recoveryPasswordMobileService.changePasswordMobileClient(
          authClientDto,
          id,
        );
      if (!newPassword) {
        throw new NotFoundException('Change Password failed');
      }
      return newPassword;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Password change operation failed',
      );
    }
  }
}
