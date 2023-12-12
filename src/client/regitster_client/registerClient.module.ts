import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterClientController} from './registerClient.controller';
import { RegisterClientService} from './registerClient.service';
import { RegisterClientEntity } from './registerClient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RegisterClientEntity])],
    providers: [RegisterClientService],
    controllers:[RegisterClientController]
})

export class RegisterClientModule { }