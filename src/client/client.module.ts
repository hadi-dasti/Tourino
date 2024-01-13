import { Module } from '@nestjs/common';
import { AuthClientModule } from './auth-client/auth.client.module';
import { PackagesClientModule } from './packages/package.client.module';

@Module({
  imports: [AuthClientModule, PackagesClientModule],
})
export class ClientModule {}
