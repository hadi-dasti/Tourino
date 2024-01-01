import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterClientService } from './register.client.service';
import { AuthClientDto } from '../auth.client.dto';
import { AuthClientEntity } from '../auth.client.entity';

@Controller('/api/v1/client/register-client')
export class RegisterClientController {
  constructor(private registerClientService: RegisterClientService) {}
  // Endpoint to register a new client
  @Post('/')
  async registerCliet(
    @Body() authClientDto: AuthClientDto,
  ): Promise<AuthClientEntity> {
    try {
      return this.registerClientService.registerClient(authClientDto);
    } catch (err) {
      console.error('Error registering client:', err);
      throw new HttpException(
        'Error registering client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
