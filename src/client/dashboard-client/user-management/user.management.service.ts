import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserManagementEntity } from './user.management.entity';
import { UserManagementDto } from './user.management.dto';
import { SituationUser, GenderUser, RegistrationStatusUser } from './uesr.management.enum';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserManagementEntity)
    private readonly userManagementRepository: Repository<UserManagementEntity>) {}

  // registery user in app by client
    public async createAddUser(userDto: UserManagementDto): Promise<UserManagementEntity> {
      
      const {
          name,
          lastName,
          situation,
          paymentAmount,
          nationalCode,
          programs,
          province,
          gender,
          registrationStatus
      } = userDto;

        try { 
          
      if (!Object.values(SituationUser).includes(situation)) {
          throw new BadRequestException('Invalid value for situation');
        }
        
        if (!Object.values(GenderUser).includes(gender)) {
            throw new BadRequestException('Invalid value for gender of user');
        }

        if (!Object.values(RegistrationStatusUser).includes(registrationStatus)) {
            throw new BadRequestException('Invalid value for registrationStatus');
          }     
        
          const newUser = this.userManagementRepository.create({
            name,
            lastName,
            situation,
            paymentAmount,
            nationalCode,
            programs,
            province,
            gender,
            registrationStatus
        });

        const addedUser = await this.userManagementRepository.save(newUser);

        return addedUser;
        
    } catch (err) {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }

  // getAllUsers
    public async getManagementAllUsers(): Promise<UserManagementEntity[]> {
      
    try {
        const allUsers = await this.userManagementRepository.find({
            order: {
                registeryUser: 'DESC'
            },
            take: 10,
        });

        if (!allUsers || allUsers.length === 0) {
            throw new NotFoundException('No users found')
        }

        return allUsers;
    } catch (err) {
        throw new InternalServerErrorException('Failed to retrieve users');
    }
  }
}
