import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegisterUserForProgramService } from "./register.user.for.program.service";
import { RegisterUserForProgramController } from "./register.user.for.program.controller";
import { UserManagementEntity } from "../user-management/user.management.entity";
import { ProgramManagementEntity } from "../program-management/program.maagement.entity";




@Module({
  imports: [TypeOrmModule.forFeature([UserManagementEntity, ProgramManagementEntity])],
  providers: [RegisterUserForProgramService],
  controllers: [RegisterUserForProgramController],
})
  
  
export class RegisterUserForTheProgramModule {}