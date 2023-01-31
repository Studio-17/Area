import {
  Controller,
  Put,
  Get,
  Body,
  Res,
  Param,
  UseGuards,
  HttpStatus,
  NotFoundException,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { ConnectionService } from './connection.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@ApiTags('/service/connect')
// @UseGuards(JwtAuthenticationGuard)
@Controller('/service/connect')
export class ConnectionController {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/google')
  public async redirectGoogle(@Res() response) {
    console.log('redirectGoogle')
    return response.redirect('http://localhost:4000/api/reaccoon/oauth2/google');
  }

  @Get('/google/success')
  public async redirectGoogleSuccess(
    @Req() request,
    @Res() response,
    @Query() query: { accessToken: string; refreshToken: string },
  ) {
    const userId = 1;
    const data = await firstValueFrom(
      this.httpService
        .post<any>(`http://localhost:8000/credentials/${userId}`, {
          user: userId,
          accessToken: query.accessToken,
          refreshToken: query.refreshToken,
        })
        .pipe(
          catchError((error: AxiosError) => {
            return response.status(HttpStatus.OK).json({
              message: 'Invalid user id credentials queried',
              status: 400,
            });
          }),
        ),
    );

    return response.status(HttpStatus.OK).json({
      message: 'Got Google credentials successfully',
      status: 200,
    });
  }
}
