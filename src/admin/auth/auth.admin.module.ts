import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAdminEntity } from './auth.admin.entity';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminController } from './auth.admin.controller';
import { RecoveryPasswordMobileController } from './recovery-password-mobile/recovery.password.mobile.controller';
import { RecoveryPasswordMobileService } from './recovery-password-mobile/recovery.password.mobile.service';

@Module({
  // Import the TypeOrmModule with the AuthAdminEntity for feature
  imports: [TypeOrmModule.forFeature([AuthAdminEntity])],
  // Provide the AuthAdminService as a provider
  providers: [AuthAdminService, RecoveryPasswordMobileService],
  // Use the AuthAdminController as a controller
  controllers: [AuthAdminController, RecoveryPasswordMobileController],
})
export class authAminModule {}
