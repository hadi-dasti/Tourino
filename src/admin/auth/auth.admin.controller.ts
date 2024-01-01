import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminDto } from './auth.admin.dto';
import { AuthAdminEntity } from './auth.admin.entity';

@Controller('/api/v1/admin/auth-admin')
export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}

  // Endpoint to register a new admin
  @Post('/register')
  registerAdmin(@Body() authAdminDto: AuthAdminDto): Promise<AuthAdminEntity> {
    try {
      const buildAdmin = this.authAdminService.registerAdmin(authAdminDto);

      if (!buildAdmin) {
        throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
      }

      return buildAdmin;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Endpoint to login an admin
  @Post('/login')
  async loginAdmin(
    @Body() authAdminDto: AuthAdminDto,
  ): Promise<AuthAdminEntity> {
    try {
      const authenticatedAdmin =
        await this.authAdminService.loginAdmin(authAdminDto);
      return authenticatedAdmin;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
