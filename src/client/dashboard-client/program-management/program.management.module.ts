import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProgramManagementEntity } from "./program.maagement.entity";
import { ProgramManagementController } from "./program.management.controller";
import { ProgramManagementService } from "./program.management.service";



@Module({
  imports: [TypeOrmModule.forFeature([ProgramManagementEntity])],
  providers: [ProgramManagementService],
  controllers: [ProgramManagementController],
})
export class ProgramManagementModule {}