import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthAdminEntity } from './auth.admin.entity';
import { AuthAdminDto } from './auth.admin.dto';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthAdminService{
    constructor(
        @InjectRepository(AuthAdminEntity) 
        private authAdminEntity : Repository<AuthAdminEntity>
    ) { }

    public async registerAdmin(authAdminDto: AuthAdminDto): Promise<AuthAdminEntity>{
        
        const { adminName, password, mobileNumber, email } = authAdminDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        try {

            const newAdmin = this.authAdminEntity.create({
                adminName,
                password:hashedPassword,
                mobileNumber,
                email
            });

            if (!newAdmin) {
                console.log('Error of register admin ')
            }

            return await this.authAdminEntity.save(newAdmin);

        } catch (err) {
            console.log(err)
        }
    }

}