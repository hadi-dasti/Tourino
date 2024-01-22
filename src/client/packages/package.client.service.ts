import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PackagesClientDto } from './package.client.dto';
import { PackageClientEntity } from './package.client.entity';

@Injectable()
export class PackagesClientService {
  private readonly logger = new Logger(PackagesClientService.name);
  constructor(
    @InjectRepository(PackageClientEntity)
    private readonly packageClientRepository: Repository<PackageClientEntity>,
  ) {}
// build package
  public async buildPackage(
    packagesClientDto: PackagesClientDto,
  ): Promise<PackageClientEntity> {
    const { packageName, price } = packagesClientDto;

    try {
      const buildPackages = this.packageClientRepository.create({
        packageName,
        price,
      });

      const packages = await this.packageClientRepository.save(buildPackages);
      if (!packages) {
        this.logger.error('Failed to save package client');
      }
      return packages;
    } catch (err) {
      this.logger.error(`Error building package: ${err.message}`, err.stack);
      throw new InternalServerErrorException('Failed to build package.' + err);
    }
  }
//getAll packages
  public async getAllPackages(): Promise<PackageClientEntity[]> {
    try {
      const getAllPackages = await this.packageClientRepository.find({
        select: {
          id: false,
          packageName: true,
          price: true,
        },
        order: {
          id: 'DESC',
          packageName: 'ASC',
        },
        skip: 100,
        take: 100,
      });

      if (getAllPackages.length === 0) {
        this.logger.log('No packages found for the given criteria');
        throw new NotFoundException('No packages found');
      }

      return getAllPackages;
    } catch (err) {
      this.logger.error(`Error retrieving packages: ${err.message}`, err.stack);
      throw new InternalServerErrorException('Internal Server');
    }
  }
//get one package with build query
  public async getPackageByPackageNameAndId(
    packageName: PackagesClientDto,
    id: string,
  ): Promise<PackageClientEntity> {
    try {
      const getOnePackage = await this.packageClientRepository
        .createQueryBuilder('PackageClientEntity')
        .where({ id, packageName })
        .getOne();

      if (!getOnePackage) {
        this.logger.log(
          `Package with packageName '${packageName}'and packageId '${id} not found`,
        );
        throw new NotFoundException(
          `Package with packageName '${packageName}' not found.`,
        );
      }
      return getOnePackage;
    } catch (err) {
      this.logger.error(`Error retrieving package: ${err.message}`, err.stack);
      throw new InternalServerErrorException(
        `Failed to retrieve package. ${err.message}`,
      );
    }
  }
}
