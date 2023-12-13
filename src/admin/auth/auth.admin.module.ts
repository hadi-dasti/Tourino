import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthAdminEntity } from './auth.admin.entity';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminController } from './auth.admin.controller';

@Module({
    imports: [TypeOrmModule.forFeature([AuthAdminEntity])],
    providers: [AuthAdminService],
    controllers:[AuthAdminController]
})



export class authAminModule { }