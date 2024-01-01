import { Module } from '@nestjs/common';
import { AuthClientModule } from './auth-client/auth.client.module';

@Module({
  imports: [AuthClientModule],
})
export class ClientModule {}
