import { Controller, Post, Body, HttpCode, HttpStatus, InternalServerErrorException, Get, Patch, Param, NotFoundException, Delete } from "@nestjs/common";
import { UserManagementService } from './user.management.service';
import { UserManagementDto } from './user.management.dto';
import { UserManagementEntity } from './user.management.entity';

@Controller("/api/v1/client/dashboard/user-management")
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}
  @Post("/add-user")
  @HttpCode(HttpStatus.CREATED)
  async addUser(
    @Body() userDto: UserManagementDto,
  ): Promise<UserManagementEntity> {
    try {
      return await this.userManagementService.createAddUser(userDto);
    } catch (err) {
      throw new InternalServerErrorException("Failed to add user");
    }
  }

  @Get("/get-all-users")
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<UserManagementEntity[]> {
    try {
      return await this.userManagementService.getManagementAllUsers();
    } catch (err) {
      throw new InternalServerErrorException("Failed to retrieve all users");
    }
  }

  @Patch("/update-user/:id")
  async updateUser(
    @Param("id") id: string,
    @Body() userDto: UserManagementDto,
  ): Promise<UserManagementEntity | any> {
    try {
      const checkUser = await this.userManagementService.updateManagementUser(
        id,
        userDto,
      );

      if (!checkUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return checkUser;
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to update user: ${err.message}`,
      );
    }
  }

  @Delete("/delete-users")
  async deleteUser(@Param("id") id: string): Promise<void> {
    try {
      return await this.userManagementService.deleteUserById(id);
    } catch (err) {
      throw new InternalServerErrorException(`Failed to delete user: ${err.message}`);
    }
  }
}