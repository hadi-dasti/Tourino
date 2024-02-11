import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserManagementEntity } from './user.management.entity';
import { UserManagementDto } from './user.management.dto';
import { SituationUser, GenderUser, RegistrationStatusUser } from './uesr.management.enum';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserManagementEntity)
    private readonly userManagementRepository: Repository<UserManagementEntity>,
  ) {}

  // registery user in app by client
  public async createAddUser(
    userDto: UserManagementDto,
  ): Promise<UserManagementEntity> {
    const {
      name,
      lastName,
      situation,
      paymentAmount,
      nationalCode,
      programs,
      province,
      gender,
      registrationStatus,
    } = userDto;

    try {
      if (!Object.values(SituationUser).includes(situation)) {
        throw new BadRequestException("Invalid value for situation");
      }

      if (!Object.values(GenderUser).includes(gender)) {
        throw new BadRequestException("Invalid value for gender of user");
      }

      if (!Object.values(RegistrationStatusUser).includes(registrationStatus)) {
        throw new BadRequestException("Invalid value for registrationStatus");
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
        registrationStatus,
      });

      const addedUser = await this.userManagementRepository.save(newUser);

      return addedUser;
    } catch (err) {
      throw new InternalServerErrorException("Internal Server Error");
    }
  }

  // getAllUsers
  public async getManagementAllUsers(): Promise<UserManagementEntity[]> {
    try {
      const allUsers = await this.userManagementRepository.find({
        order: {
          registeryUser: "DESC",
        },
        take: 10,
      });

      if (!allUsers || allUsers.length === 0) {
        throw new NotFoundException("No users found");
      }

      return allUsers;
    } catch (err) {
      throw new InternalServerErrorException("Failed to retrieve users");
    }
  }

  //update user of client
  public async updateManagementUser(id: string,userDto: UserManagementDto): Promise<UserManagementEntity | any> {
    try {
      const {
        name,
        lastName,
        situation,
        paymentAmount,
        nationalCode,
        programs,
        province,
        gender,
        registrationStatus,
      } = userDto;

      const existingUser = await this.userManagementRepository.findOneBy({
        id,
      });

      if (!existingUser) {
        throw new Error(`user wwit ${id} not Found`);
      }

        const updatedUser = await this.userManagementRepository
            .createQueryBuilder()
            .update(UserManagementEntity)
            .set({
                name,
                lastName,
                situation,
                paymentAmount,
                nationalCode,
                programs,
                province,
                gender,
                registrationStatus,
            })
            .where({id })
            .execute();
        
      if (updatedUser.affected === 0) {
          throw new Error(`Failed to update user with ID ${id}`);
      }
        return updatedUser;
    } catch (err) {
        throw new Error(`Failed to update user: ${err.message}`);
    }
  }
}
