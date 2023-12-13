import { Module } from "@nestjs/common";
import { authAminModule } from './auth/auth.admin.module';

@Module({
    imports:[authAminModule]
})

export class AdminModule{}