import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserManagementEntity } from './user.management.entity';
import { UesrManagementDto } from './user.management.dto';
import { SituationUser } from './uesr.management.enum';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserManagementEntity)
      private readonly userManagementEntity: Repository<UserManagementEntity>) { }
    
// registery user in app by client
    public async createAddUser(uesrDto: UesrManagementDto): Promise<UserManagementEntity> {
      
          const {
              name,
              lastName,
              situation,
              paymentAmount,
              nationalCode,
              programs,
        } = uesrDto;
        
        try {

            if (!Object.values(SituationUser).includes(situation)) {
                throw new BadRequestException('Invalid value for situation');
            }

            const users = this.userManagementEntity.create({
                name,
                lastName,
                situation,
                paymentAmount,
                nationalCode,
                programs,
            });

            const addedUser = await this.userManagementEntity.save(users);

             if (!addedUser) {
               throw new InternalServerErrorException('Failed to create add user');
             }

            return addedUser;

        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
  }
}
