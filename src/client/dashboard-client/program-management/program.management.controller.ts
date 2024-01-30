import { Controller, HttpCode, Post,HttpStatus, Body } from "@nestjs/common";
import { ProgramManagementService } from "./program.management.service";
import { ProgramDto } from "./program.management.dto";
import { ProgramManagementEntity } from "./program.maagement.entity";


@Controller('/api/v1/client/dashboard/program-management')
export class ProgramManagementController {
  constructor(
    private readonly programManagementService: ProgramManagementService,
  ) {}

  @Post('/add-program')
  @HttpCode(HttpStatus.CREATED)
  async addProgram(@Body() ProgramDto: ProgramDto): Promise<ProgramManagementEntity> {
    try {
      return await this.programManagementService.addProgram(ProgramDto);
    } catch (err) {
      HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}