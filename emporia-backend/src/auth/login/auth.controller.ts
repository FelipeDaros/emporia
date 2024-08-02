import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post()
  public async login(@Body() authUserDto: AuthUserDto){
    return await this.authService.login(authUserDto);
  }
}
