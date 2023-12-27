import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthClientEntity } from '../auth.client.entity';
import { AuthClientDto } from '../auth.client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterClientService {
  constructor(
    @InjectRepository(AuthClientEntity)
    private authClientEntity: Repository<AuthClientEntity>,
  ) {}
  // Method to register a new client
  public async registerClient(
    authClientDto: AuthClientDto,
  ): Promise<AuthClientEntity> {
    try {
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
        centerLogo,
      } = authClientDto;

      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new client entity with the hashed password
      const newRegisterClient = this.authClientEntity.create({
        managerFirstName,
        managerLastName,
        nationalCode,
        dateOfBirth,
        password: hashedPassword,
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
        centerLogo,
      });

      // Save the new client entity
      const savedClient = await this.authClientEntity.save(newRegisterClient);

      if (!savedClient) {
        // If the client was not saved, throw an exception
        throw new HttpException(
          'Error registering client',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

        return savedClient;
        
    } catch (err) {
      // Handle any errors that occur during the registration process
      console.error('Error registering client:', err);
      throw new HttpException(
        'Error registering client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
