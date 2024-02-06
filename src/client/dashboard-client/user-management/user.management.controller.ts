import { Controller, Post, Body, HttpCode, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { UserManagementService } from './user.management.service';
import { UesrManagementDto } from './user.management.dto';
import { UserManagementEntity } from './user.management.entity';

@Controller('/api/v1/client/dashboard/user-management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}
  @Post('/add-user')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() userDto: UesrManagementDto): Promise<UserManagementEntity> {
    try {
        return await this.userManagementService.createAddUser(userDto);
    } catch (err) {
        throw new InternalServerErrorException('Failed to add user');
      }
  }
}