import { Controller, Get, Param } from '@nestjs/common';
import { PackagesClientDto } from './package.client.dto';
import { PackagesClientService } from './package.client.service';

@Controller('/api/v1/client/packages')
export class PackagesClientController {
  constructor(private readonly packagesClientService: PackagesClientService) {}

  @Get('get-all-packages')
  getAllPackages(): PackagesClientDto[] {
    return this.packagesClientService.getAllPackages();
  }

  @Get(':packageId')
  getOnePackage(@Param('packageId') id: string): PackagesClientDto {
    return this.packagesClientService.getPackageByName(id);
  }
}
