import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthClientDto } from '../auth.client.dto';
import { LoginClientService } from './login.client.service';

@Controller('/api/v1/client/login-client')
export class LoginClientController {
  constructor(private readonly loginClientService: LoginClientService) {}

  @Post('/')
  async loginClient(@Body() authClientDto: AuthClientDto): Promise<void> {
    try {
        await this.loginClientService.loginClient(authClientDto);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      } else if (err instanceof UnauthorizedException) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(
          'Client login failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
