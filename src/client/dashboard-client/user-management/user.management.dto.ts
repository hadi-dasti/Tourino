import { SituationUser } from './uesr.management.enum';

export class UesrManagementDto {
  readonly name: string;
  readonly lastName: string;
  readonly situation: SituationUser;
  readonly paymentAmount: string;
  readonly nationalCode: string;
  readonly programs: string[];
}
