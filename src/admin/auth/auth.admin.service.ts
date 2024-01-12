import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthAdminEntity } from './auth.admin.entity';
import { AuthAdminDto } from './auth.admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectRepository(AuthAdminEntity)
    private authAdminEntity: Repository<AuthAdminEntity>,
  ) {}

  // Method to register a new admin
  public async registerAdmin(
    authAdminDto: AuthAdminDto,
  ): Promise<AuthAdminEntity> {
    const { adminName, password, mobileNumber, email } = authAdminDto;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      // Create a new admin entity with the hashed password
      const newAdmin = this.authAdminEntity.create({
        adminName,
        password: hashedPassword,
        mobileNumber,
        email,
      });

      // Save the new admin entity to the database
      if (!newAdmin) {
        throw new Error('Failed to create new admin');
      }

      return await this.authAdminEntity.save(newAdmin);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to register admin');
    }
  }

  // Method to authenticate and login an admin
  public async loginAdmin(
    authAdminDto: AuthAdminDto,
  ): Promise<AuthAdminEntity> {
    const { adminName, password } = authAdminDto;

    try {
      // Find the admin by adminName
      const admin = await this.authAdminEntity.findOneBy({ adminName });

      // If admin is not found, throw a NotFoundException
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }

      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, admin.password);

      // If passwords do not match, throw an UnauthorizedException
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Return the authenticated admin
      return admin;
    } catch (err) {
      console.error(err);
      throw new Error('Login failed');
    }
  }
}
