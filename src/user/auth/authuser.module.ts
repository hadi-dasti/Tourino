import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthUserController} from './authuser.controller';
import {AuthUserService} from './authuser.service';
import { AuthUserEntity } from './authuser.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthUserEntity])],
    providers: [AuthUserService],
    controllers:[AuthUserController]
})
    
export class UserAuthModule { }
