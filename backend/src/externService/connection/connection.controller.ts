import { Controller, Get, Res, UseGuards, HttpStatus, Req, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { ConnectionService } from './connection.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { GoogleOAuth2Guard } from './guards/google-authentication.guard';

@ApiTags('/service/connect')
// @UseGuards(JwtAuthenticationGuard)
@Controller('/service/connect')
export class ConnectionController {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/google')
  @UseGuards(GoogleOAuth2Guard)
  public async redirectGoogle(@Res() response) {
    // return response.redirect('http://localhost:4000/api/reaccoon/oauth2/google');
  }

  @Get('/google/success')
  @UseGuards(GoogleOAuth2Guard)
  public async redirectGoogleSuccess(
    @Req() request,
    @Res() response,
    @Query() query: { accessToken: string; refreshToken: string; email: string; userId: string },
  ) {
    console.log(response);

    return response.status(HttpStatus.OK).json({
      message: 'Got Google credentials successfully',
      status: 200,
    });
  }
}
