import { Module } from "@nestjs/common";
import { UserAuthModule } from './auth/authuser.module';


@Module({
    imports:[UserAuthModule]
})


export class UserModule{}