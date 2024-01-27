import {
  Catch,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationManagementEntity } from './registration.management.entity';
import { RegistrationManagementDto } from './registration.management.dto';

@Injectable()
export class RegistrationManagementService {
  constructor(
    @InjectRepository(RegistrationManagementEntity)
    private RegistrationManagementRepository: Repository<RegistrationManagementEntity>,
  ) {}

  async createRegistration(
    registrationDto: RegistrationManagementDto,
  ): Promise<RegistrationManagementEntity> {
    const {
      name,
      image,
      registeredCount,
      suspendedCount,
      cancelledCount,
      totalRegistered,
    } = registrationDto;

    try {
      const newRegistration = this.RegistrationManagementRepository.create({
        name,
        image,
        registeredCount,
        suspendedCount,
        cancelledCount,
        totalRegistered,
      });

      const savedRegistration =
        await this.RegistrationManagementRepository.save(newRegistration);

      if (!savedRegistration)
        throw new NotFoundException('Failed to create registration');

      return savedRegistration;
    } catch (err) {
      throw new InternalServerErrorException('Failed to create registration');
    }
  }

  async getAllRegistration(): Promise<RegistrationManagementEntity[]>{

    try {

      const allRegistration = await this.RegistrationManagementRepository.find({

        select: {
          id: false,
          name: true,
          image: true,
          registeredCount: true,
          suspendedCount: true,
          cancelledCount: true,
          totalRegistered: true,
        },

        order: {
          registeredCount: 'ASC',
          suspendedCount: 'ASC',
          cancelledCount: 'ASC',
          totalRegistered: 'ASC',
        },
        take: 10,
      });

      return allRegistration;

    } catch (err) {
      throw new InternalServerErrorException('Failed to fetch registrations');
      }
  }
}
