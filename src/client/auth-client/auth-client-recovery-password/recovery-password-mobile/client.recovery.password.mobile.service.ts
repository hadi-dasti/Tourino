import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthClientEntity } from '../../auth.client.entity';
import { AuthClientDto } from '../../auth.client.dto';
import { GenerateOtp } from './client.recovery.password.mobile.helper';

@Injectable()
export class RecoveryPasswordMobileService {
  constructor(
    @InjectRepository(AuthClientEntity)
    private authClientEntity: Repository<AuthClientEntity>,
  ) {}

  public async initialMobileClient(
    authClientDto: AuthClientDto,
  ): Promise<AuthClientEntity> {
    const { managerMobileNumber } = authClientDto;

    try {
      const checkMobileClient = await this.authClientEntity.findOneBy({
        managerMobileNumber,
      });
      if (!checkMobileClient) {
        throw new NotFoundException(
          'Error Not Found MobileNumber of manager client',
        );
      }

      // generate codeOto
      const codeOtpMobile = GenerateOtp(6);
      checkMobileClient.codeOtp = codeOtpMobile;

      console.log(
        `Sent OTP code ${checkMobileClient.codeOtp} to ${checkMobileClient.managerMobileNumber}`,
      );

      return await this.authClientEntity.save(checkMobileClient);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Failed to initialize mobile client recovery process',
      );
    }
  }

  public async verifyMobileCodeClient(
    authClientDto: AuthClientDto,
  ): Promise<void> {
    const { codeOtp } = authClientDto;

    try {
      const checkCodeOtp = await this.authClientEntity.findOneBy({ codeOtp });

      if (!checkCodeOtp) {
        throw new NotFoundException('CodeOTP not found');
      }

      if (checkCodeOtp.codeOtp !== codeOtp) {
        console.log('Error: CodeOTP does not match');
        throw new UnauthorizedException('Invalid CodeOTP');
      }

      // CodeOTP verification successful
      console.log('CodeOTP verification successful');
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Failed to verify mobile managerClient recovery OTP',
      );
    }
  }

  public async changePasswordMobileClient(
    authClientDto: AuthClientDto,
    id: string,
  ): Promise<AuthClientEntity> {
    const { password } = authClientDto;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const existingClient = await this.authClientEntity.findOneBy({ id });
      if (!existingClient) {
        throw new NotFoundException('Client not found with the provided id');
      }
      existingClient.password = hashedPassword;
      existingClient.codeOtp = '';

      const newPasswordClient =
        await this.authClientEntity.save(existingClient);
      return newPasswordClient;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to change admin password');
    }
  }
}
