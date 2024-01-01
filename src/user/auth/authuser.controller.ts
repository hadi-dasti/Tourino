import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthUserService } from './authuser.service';
import { AuthUserEntity } from './authuser.entity';
import { AuthUserDto } from './authuser.dto';

@Controller('/api/v1/user/auth')
export class AuthUserController {
  constructor(private authUserService: AuthUserService) {}

  @Post('/signup')
  async singUp(@Body() authUserDto: AuthUserDto): Promise<AuthUserEntity> {
    return this.authUserService.singUp(authUserDto);
  }

  @Post('/verify/:id')
  async verifyOtp(
    @Param('id') id: string,
    @Body('otp') otp: string,
  ): Promise<AuthUserEntity> {
    return this.authUserService.verifyUser(id, otp);
  }
}
