import { SituationUser, GenderUser, RegistrationStatusUser } from './uesr.management.enum';

export class UserManagementDto {
  readonly name: string;
  readonly lastName: string;
  readonly situation: SituationUser;
  readonly paymentAmount: string;
  readonly nationalCode: string;
  readonly programs: string[];
  readonly province: string[];
  readonly gender: GenderUser;
  readonly registrationStatus: RegistrationStatusUser;
}
