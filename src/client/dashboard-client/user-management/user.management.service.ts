import { Injectable } from '@nestjs/common';
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

            if (!situation || situation.trim() === '') {
                throw new Error('Bad Request')
            }

            if (!Object.values(SituationUser).includes(situation)) {
                throw new Error('Invalid Values in situation')
            }

            const users = this.userManagementEntity.create({
                name,
                lastName,
                situation,
                paymentAmount,
                nationalCode,
                programs,
            });

            const addUser = await this.userManagementEntity.save(users);

            if (!addUser) {
                throw new Error('user not craete')
            }

            return addUser;


        } catch (err) {
            throw new Error('Internal Server Error');
        }
  }
}
