import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PackagesClientDto } from './package.client.dto';

@Injectable()
export class PackagesClientService {
  private readonly packages: PackagesClientDto[] = [
    {
      id: '1',
      packageName: 'Kordan',
      price: '300000',
    },
    {
      id: '2',
      packageName: 'Kordan2',
      price: '600000',
    },
  ];

  public getAllPackages(): PackagesClientDto[] {
    if (this.packages.length === 0) {
      throw new NotFoundException('No packages found');
    }

    return this.packages;
  }

  public getPackageByName(id: string): PackagesClientDto {
    const foundPackage = this.packages.find(
      (p) => p.id === id,
    );

    if (!foundPackage) {
      throw new NotFoundException(`Package with name ${id} not found`);
    }
    return foundPackage;
  }
}
