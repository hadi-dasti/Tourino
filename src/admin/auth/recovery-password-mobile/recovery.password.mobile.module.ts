import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAdminEntity } from '../auth.admin.entity';
import { RecoveryPasswordMobileController } from './recovery.password.mobile.controller';
import { RecoveryPasswordMobileService } from './recovery.password.mobile.service';

@Module({
  imports:[TypeOrmModule.forFeature([AuthAdminEntity])],
  providers: [RecoveryPasswordMobileService],
  controllers: [RecoveryPasswordMobileController],
})
export class RecoveryPasswordMobileModule {}
