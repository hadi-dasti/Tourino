import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegistrationManagementService } from './registration.management.service';
import { RegistrationManagementDto } from "./registration.management.dto";
import { RegistrationManagementEntity } from './registration.management.entity';

@Controller('/api/v1/client/dashboard/registration-management')
export class RegistrationManagementController {
  constructor(private readonly registrationManagementService: RegistrationManagementService,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async buildRegisterManagement(
    @Body() registrationDto: RegistrationManagementDto,
  ): Promise<RegistrationManagementEntity> {
    try {
      return await this.registrationManagementService.createRegistration(
        registrationDto,
      );
    } catch (err) {
      HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  async getAllRegister(): Promise<RegistrationManagementEntity[]> {
    try {
      return await this.registrationManagementService.getAllRegistration();
    } catch (err) {
      throw new BadRequestException('Failed to fetch registrations');
    }
  }
}