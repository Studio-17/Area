import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
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
  public async register(@Res() response, @Body() registerUserDto: UserRegisterDto): Promise<any> {
    try {
      await this.authenticationService.register(registerUserDto);

      return response.status(HttpStatus.OK).json({
        message: 'User registration successfully!',
        status: 200,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not registered!',
        status: 400,
      });
    }
  }

  @Get('/login/google')
  public async loginWithGoogle(@Req() request, @Res() response, @Query() query: { token: string }) {
    try {
      const user = await this.authenticationService.googleConnect(query.token);

      return response.status(HttpStatus.OK).json(user);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not logged in (using google)!',
        status: 400,
      });
    }
  }

  @Get('/login/mobile/google')
  public async loginWithMobileGoogle(
    @Req() request,
    @Res() response,
    @Query() query: { token: string },
  ) {
    try {
      const user = await this.authenticationService.googleConnectMobile(query.token);

      return response.status(HttpStatus.OK).json(user);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not logged in (using google)!',
        status: 400,
      });
    }
  }
}
