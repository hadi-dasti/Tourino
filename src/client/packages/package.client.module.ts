import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesClientService } from './package.client.service';
import { PackagesClientController } from './pakage.client.controller';
import { PackageClientEntity } from "./package.client.entity";


@Module({
  imports: [TypeOrmModule.forFeature([PackageClientEntity])],
  providers: [PackagesClientService],
  controllers: [PackagesClientController],
})
export class PackagesClientModule {}