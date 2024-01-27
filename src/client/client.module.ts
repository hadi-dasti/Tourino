import { Module } from '@nestjs/common';
import { AuthClientModule } from './auth-client/auth.client.module';
import { PackagesClientModule } from './packages/package.client.module';
import { DashboardClientModule } from './dashboard-client/dashboard.client.module';

@Module({
  imports: [AuthClientModule, PackagesClientModule, DashboardClientModule],
})
export class ClientModule {}
