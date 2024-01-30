import { ProgramStatus } from './program.maagement.entity';

export class ProgramDto {
  readonly programName: string;
  readonly programTime: string;
  readonly programStatus: ProgramStatus;
  readonly price: string;
  readonly registeredPeople: number;
  readonly popularity: string;
  readonly operationIcons: string;
}