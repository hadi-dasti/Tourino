import { Module } from '@nestjs/common';
import { RegistrationManagementModule } from './registration-management/registration.management.module';

@Module({
  imports: [RegistrationManagementModule],
})
export class DashboardClientModule {}
