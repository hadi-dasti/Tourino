import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthClientEntity } from '../auth.client.entity';
import { AuthClientDto } from '../auth.client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginClientService {
  constructor(
    @InjectRepository(AuthClientEntity)
    private authClientEntity: Repository<AuthClientEntity>,
  ) {}
  // Method to handle client login
  public async loginClient(authClientDto: AuthClientDto): Promise<void> {
    const { managerFirstName, managerLastName, password } = authClientDto;

    try {
      // Find the client based on first and last name
      const checkClient = await this.authClientEntity.findOne({
        where: {
          managerFirstName,
          managerLastName,
        },
      });

      if (!checkClient) {
        throw new NotFoundException('Client not found');
      }

      // Compare the provided password with the hashed password in the database
      const matchPassword = await bcrypt.compare(
        password,
        checkClient.password,
      );

      if (!matchPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (err) {
      console.error('Error during client login:', err);
      throw new InternalServerErrorException('Client login failed', err);
    }
  }
}
