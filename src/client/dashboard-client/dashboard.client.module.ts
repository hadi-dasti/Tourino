import { Module } from '@nestjs/common';
import { RegistrationManagementModule } from './registration-management/registration.management.module';
import { ProgramManagementModule } from './program-management/program.management.module';
import { UserManagementModule } from './user-management/user.management.module';
import { RegisterUserForTheProgramModule } from "./register-user-for-program/register.user.for.program.module";


@Module({
  imports: [
    RegistrationManagementModule,
    ProgramManagementModule,
    UserManagementModule,
    RegisterUserForTheProgramModule,
  ],
})
export class DashboardClientModule {}
