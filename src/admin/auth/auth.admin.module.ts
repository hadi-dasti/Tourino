import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAdminEntity } from './auth.admin.entity';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminController } from './auth.admin.controller';
import { RecoveryPasswordMobileModule } from './recovery-password-mobile/recovery.password.mobile.module';

@Module({
  // Import the TypeOrmModule with the AuthAdminEntity for feature
  imports: [RecoveryPasswordMobileModule,
    TypeOrmModule.forFeature([AuthAdminEntity]),  
  ],
  // Provide the AuthAdminService as a provider
  providers: [AuthAdminService],
  // Use the AuthAdminController as a controller
  controllers: [AuthAdminController],
})
export class authAminModule {}
