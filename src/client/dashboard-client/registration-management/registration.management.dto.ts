import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegistrationManagementDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  registeredCount: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  suspendedCount: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  cancelledCount: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  totalRegistered: number;
}
