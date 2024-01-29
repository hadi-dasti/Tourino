import { Module } from '@nestjs/common';
import { RegistrationManagementModule } from './registration-management/registration.management.module';
import { ProgramManagementModule } from './program-management/program.management.module';

@Module({
  imports: [
    RegistrationManagementModule,
    ProgramManagementModule
  ],
})
export class DashboardClientModule {}
