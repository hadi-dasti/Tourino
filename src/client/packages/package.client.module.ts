import { Module } from "@nestjs/common";
import { PackagesClientService } from './package.client.service';
import { PackagesClientController } from './pakage.client.controller';

@Module({
    providers: [PackagesClientService],
    controllers:[PackagesClientController]
})



export class PackagesClientModule{}