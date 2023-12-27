import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthClientEntity } from './auth.client.entity';

import { RegisterClientController } from './regitster_client/register.client.controller';
import { RegisterClientService } from './regitster_client/register.client.service';

import { LoginClientController } from './login_client/login.client.controller';
import { LoginClientService } from './login_client/login.client.service';

import { RecoveryPasswordMobileClientController } from './auth-client-recovery-password/recovery-password-mobile/client.recovery.password.mobile.controller';
import { RecoveryPasswordMobileService } from './auth-client-recovery-password/recovery-password-mobile/client.recovery.password.mobile.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthClientEntity])],
  providers: [
    RegisterClientService,
    LoginClientService,
    RecoveryPasswordMobileService,
  ],
  controllers: [
    RegisterClientController,
    LoginClientController,
    RecoveryPasswordMobileClientController,
  ],
})
export class AuthClientModule {}
