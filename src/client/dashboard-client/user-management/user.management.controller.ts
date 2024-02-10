import { Controller, Post, Body, HttpCode, HttpStatus, InternalServerErrorException, Get } from "@nestjs/common";
import { UserManagementService } from './user.management.service';
import { UserManagementDto } from './user.management.dto';
import { UserManagementEntity } from './user.management.entity';

@Controller('/api/v1/client/dashboard/user-management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}
  @Post('/add-user')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() userDto: UserManagementDto): Promise<UserManagementEntity> {
    try {
        return await this.userManagementService.createAddUser(userDto);
    } catch (err) {
        throw new InternalServerErrorException('Failed to add user');
      }
  }

  @Get('/get-all-users')
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<UserManagementEntity[]>{
    try {
        return await this.userManagementService.getManagementAllUsers();
    } catch (err) {
        throw new InternalServerErrorException('Failed to retrieve all users');
    }
  }
}