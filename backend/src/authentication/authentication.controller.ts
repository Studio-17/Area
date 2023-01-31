import { Controller, Get, Post, Body, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from './dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/user-register.dto';
import { GoogleAuthenticationGuard } from './guards/google-authentification.guard';
import { GithubAuthenticationGuard } from './guards/github-authentication.guard';

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

  @Get('/google')
  @UseGuards(GoogleAuthenticationGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async loginGoogle(@Req() request) {}

  @Get('/google/redirect')
  @UseGuards(GoogleAuthenticationGuard)
  public async redirectGoogle(@Req() request) {
    return await this.authenticationService.oauth(request.user.email);
  }

  @Get('/github')
  @UseGuards(GithubAuthenticationGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async loginGithub(@Req() request) {}

  @Get('/github/redirect')
  @UseGuards(GithubAuthenticationGuard)
  public async redirectGithub(@Req() request) {
    return await this.authenticationService.oauth(request.user.email);
  }
}
