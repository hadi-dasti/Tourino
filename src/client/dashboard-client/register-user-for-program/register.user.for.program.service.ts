import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserManagementEntity } from '../user-management/user.management.entity';
import { UserManagementDto } from '../user-management/user.management.dto';
import { ProgramManagementEntity } from '../program-management/program.maagement.entity';


/**
   * Registers a user for a program.
   * @param userDto User data to register.
   * @param programId ID of the program to register the user into.
   * @returns Promise<ProgramManagementEntity> The updated program entity after registering the user.
   */
  
@Injectable()
export class RegisterUserForProgramService {
  constructor(
    @InjectRepository(UserManagementEntity)
    private userManagementRepository: Repository<UserManagementEntity>,
    @InjectRepository(ProgramManagementEntity)
    private programManagementRepository: Repository<ProgramManagementEntity>,
  ) {}

  public async registerUserInProgram(
    userDto: UserManagementDto,
    programId: string): Promise<ProgramManagementEntity> {
    
    try {
      const {
        name,
        lastName,
        situation,
        paymentAmount,
        nationalCode,
        programs,
        province,
        gender,
        registrationStatus,
      } = userDto;

      const existingProgram = await this.programManagementRepository.findOneBy({
        id: programId,
      });

      if (!existingProgram) {
        throw new NotFoundException("program not found");
      }

      const buildUser = this.userManagementRepository.create({
        name,
        lastName,
        situation,
        paymentAmount,
        nationalCode,
        programs,
        province,
        gender,
        registrationStatus,
      });

      await this.userManagementRepository.save(buildUser);

      existingProgram.registerUsers = [buildUser];
      return await this.programManagementRepository.save(existingProgram);
    } catch (err) {
      throw new InternalServerErrorException("Internal Server Error");
    }
  }
}