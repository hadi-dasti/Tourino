import { Body, Controller, InternalServerErrorException, NotFoundException, Param, Post } from "@nestjs/common";
import { RegisterUserForProgramService } from './register.user.for.program.service';
import { UserManagementDto } from "../user-management/user.management.dto";
import { ProgramManagementEntity } from "../program-management/program.maagement.entity";


@Controller("/api/v1/client/dashboard/register-user-for-program")
export class RegisterUserForProgramController {
  constructor(
    private readonly registerUserForProgramService: RegisterUserForProgramService,
  ) {}

  /**
   * Endpoint to register a user for a program.
   * @param userDto User data to register.
   * @param programId ID of the program to register the user into.
   * @returns Promise<ProgramManagementEntity> The updated program entity after registering the user.
   */

  @Post("/:programId")
  async registerUserForProgram(
    @Body() userDto: UserManagementDto,
    @Param("programId") programId: string): Promise<ProgramManagementEntity> {
    
    try {
      return await this.registerUserForProgramService.registerUserInProgram(
        userDto,
        programId
      );
    } catch (err) {
      throw new InternalServerErrorException("Failed to register user for the program");
    }
  }
}