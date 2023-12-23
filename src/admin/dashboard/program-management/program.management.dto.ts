import { ProgramStatus } from './program.management.entity';

export class ProgramManagementDto {
  name: string;
  groupName: string;
  groupCode: string;
  programType: string;
  province: string;
  price: number;
  registeredPeople: number;
  status: ProgramStatus;
  timeOfEvent: Date;
  popularity: number;
  operationFieldIcons: string[];
}
