import { Controller, HttpCode, Post,HttpStatus, Body, Get, HttpException, Put, Param } from "@nestjs/common";
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
  async addProgram(
    @Body() ProgramDto: ProgramDto,
  ): Promise<ProgramManagementEntity> {
    try {
      return await this.programManagementService.addProgram(ProgramDto);
    } catch (err) {
      HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Get('/get-all-programs')
  @HttpCode(HttpStatus.OK)
  async getAllPrograms(): Promise<ProgramManagementEntity[]> {
    try {
      return await this.programManagementService.getAllPrograms();
    } catch (err) {
      console.error('Error fetching programs:', err);
      throw new HttpException(
        'Failed to fetch programs.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('/update-all-program/:id')
  async updateAllProgram(
    @Param('id') id: string,
    @Body() ProgramDto: ProgramDto): Promise<any> {
    try {
      return await this.programManagementService.updateProgram(id, ProgramDto);
    } catch (err) {
      console.error('Error updating program:', err);
      throw new HttpException(
        'Failed to update program',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
   }
  
}