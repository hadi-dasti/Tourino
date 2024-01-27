import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationManagementEntity } from "./registration.management.entity";
import { RegistrationManagementService } from "./registration.management.service";
import { RegistrationManagementController } from "./registration.management.controller";

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationManagementEntity])],
  providers: [RegistrationManagementService],
  controllers: [RegistrationManagementController],
})
export class RegistrationManagementModule {}