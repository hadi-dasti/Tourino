import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserManagementEntity } from "./user.management.entity";
import { UserManagementService } from "./user.management.service";
import { UserManagementController } from "./user.management.controller";


@Module({
  imports: [TypeOrmModule.forFeature([UserManagementEntity])],
  providers: [UserManagementService],
  controllers: [UserManagementController],
})
export class UserManagementModule {}