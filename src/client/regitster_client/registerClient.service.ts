import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterClientEntity } from './registerClient.entity';
import { RegiterClientDto } from './registerClient.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class RegisterClientService{

    constructor(
        @InjectRepository(RegisterClientEntity)
        private registerClientEntity : Repository<RegisterClientEntity>
    ) { }

    public async registerClient(regiterClientDto:RegiterClientDto): Promise<RegisterClientEntity>{
        
            const {
                managerFirstName,
                managerLastName,
                nationalCode,
                dateOfBirth,
                password,
                fatherName,
                nameOfCenter,
                managerMobileNumber,
                email,
                province,
                city,
                address,
                landLinePhone,
                socialNetworks,
                website,
                centerLogo
        } = regiterClientDto;

        try {
            
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt );

            const newRegisterClient = this.registerClientEntity.create({
                managerFirstName,
                managerLastName,
                nationalCode,
                dateOfBirth,
                password:hashedPassword,
                fatherName,
                nameOfCenter,
                managerMobileNumber,
                province,
                email,
                city,
                address,
                landLinePhone,
                socialNetworks,
                website,
                centerLogo
            });

            if (!newRegisterClient) {
               console.log('error register client in service')
            }

            return await this.registerClientEntity.save(newRegisterClient);

        } catch (err) {
            console.log(err)
        }
    }

}