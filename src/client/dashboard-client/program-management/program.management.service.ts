import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramManagementEntity, ProgramStatus } from './program.maagement.entity';
import { ProgramDto } from './program.management.dto';


@Injectable()
export class ProgramManagementService {
  constructor(
    @InjectRepository(ProgramManagementEntity)
    private programRepository: Repository<ProgramManagementEntity>,
  ) {}

  // add program
  public async addProgram(
    programDto: ProgramDto,
  ): Promise<ProgramManagementEntity> {
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

      if (
        !Object.values(ProgramStatus).includes(programStatus as ProgramStatus)
      ) {
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
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //get all programs
  public async getAllPrograms(): Promise<ProgramManagementEntity[]> {
    try {
      const allPrograms = await this.programRepository.find({
        select: {
          id: true,
          programName: true,
          programTime: true,
          programStatus: true,
          price: true,
        },
        order: {
          programName: 'ASC',
        },
        take: 10,
        cache: true,
      });

      if (!allPrograms.length) {
        throw new NotFoundException('No programs found.');
      }

      return allPrograms;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to fetch programs.');
    }
  }

  // update program
  public async updateProgram(id: string, programDto: ProgramDto): Promise<any> {
    try {
      const {
        programName,
        programTime,
        programStatus,
        price,
        registeredPeople,
        popularity,
        operationIcons,
      } = programDto;

      const checkIdProgram = await this.programRepository.findOne({
        where: { id: id },
      });

      if (!checkIdProgram) {
        throw new Error('program not found');
      }

      const newPrograms = await this.programRepository
        .createQueryBuilder()
        .update(ProgramManagementEntity)
        .set({
          programName,
          programTime,
          programStatus,
          price,
          registeredPeople,
          popularity,
          operationIcons,
        })
        .where({ id: id })
        .execute();

      return newPrograms;
    } catch (err) {
      console.error('Error updating program:', err);
      throw new Error('Failed to update program');
    }
  }

  // delete program
  public async deletePrograms(id: string): Promise<void> {
    
    try {
      const checkIdProgram = await this.programRepository.findOne({
        where: {
            id:id
          }
      })
      if (!checkIdProgram) {
        throw new Error('Program not found');
      }

      const deleteProgram = await this.programRepository
        .createQueryBuilder()
        .delete()
        .from(ProgramManagementEntity)
        .where({ id: id })
        .execute();
      
      if (deleteProgram.affected === 0) {
         throw new Error('Failed to delete program');
      }
      console.log('Program deleted successfully');

    } catch (err) {
      console.error('Error deleting program:', err.message);
       throw err;
    }
  }
}
