import { Controller, Get, Post, Body, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from './dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/user-register.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  public async login(@Body() loginDto: UserLoginDto): Promise<any> {
    return await this.authenticationService.login(loginDto);
  }

  @Post('/register')
  public async register(@Res() res, @Body() registerUserDto: UserRegisterDto): Promise<any> {
    try {
      await this.authenticationService.register(registerUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'User registration successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not registered!',
        status: 400,
      });
    }
  }

  @Post('login/google')
  public async loginWithGoogle(@Body('token') token) {
    return await this.authenticationService.googleConnect(token);
  }
}
