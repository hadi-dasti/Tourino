import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PackagesClientDto } from './package.client.dto';
import { PackagesClientService } from './package.client.service';
import { PackageClientEntity } from './package.client.entity';

@Controller('/api/v1/client/packages')
export class PackagesClientController {
  constructor(private readonly packagesClientService: PackagesClientService) {}

  @Post('build-client-package')
  buildPackageClient(
    @Body() packagesClientDto: PackagesClientDto,
  ): Promise<PackageClientEntity> {
    return this.packagesClientService.buildPackage(packagesClientDto);
  }

  @Get('get-all-packages')
  getAllPackages(): Promise<PackageClientEntity[]> {
    return this.packagesClientService.getAllPackages();
  }

  @Get('')
  getOnePackage(
    @Query('packageName') packageName: PackagesClientDto,
    @Query('id') id: string,
  ): Promise<PackageClientEntity> {
    return this.packagesClientService.getPackageByPackageNameAndId(
      packageName,
      id,
    );
  }
}
