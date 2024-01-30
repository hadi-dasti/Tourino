import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ProgramManagementEntity,ProgramStatus} from './program.maagement.entity';
import { ProgramDto } from './program.management.dto';


@Injectable()
export class ProgramManagementService {
  constructor(@InjectRepository(ProgramManagementEntity)
  private programRepository: Repository<ProgramManagementEntity>) { }
  
// add program
  public async addProgram(programDto: ProgramDto): Promise<ProgramManagementEntity> {
     const {
       programName,
       programTime,
       programStatus,
       price,
       registeredPeople,
       popularity,
       operationIcons,
    } = programDto;
    
    try {
     
      // Check if programStatus is empty or undefined
      if (!programStatus || programStatus.trim() === '') {
        console.error('Program status is required');
        throw new HttpException(
          'Program status is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!Object.values(ProgramStatus).includes(programStatus as ProgramStatus)) {
        console.error('Invalid program status');
        throw new HttpException(
          'Invalid program status',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createProgram = this.programRepository.create({
        programName,
        programTime,
        programStatus,
        price,
        registeredPeople,
        popularity,
        operationIcons,
      });

      const program = await this.programRepository.save(createProgram);

      if (!program) {
        throw new Error('Failed to add program for dashboard client');
      }

      return program;
      
    } catch (err) {
      console.error('Internal Server Error:', err.message);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
