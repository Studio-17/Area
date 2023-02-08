import {
  Controller,
  Get,
  Res,
  UseGuards,
  HttpStatus,
  Req,
  Query,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { ConnectionService } from './connection.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
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
  public async google(@Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/google/redirect`;
    const scope =
      'email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive';

    return response.status(HttpStatus.OK).json({
      url: `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${callbackURL}&client_id=${clientID}`,
      status: 200,
    });
  }

  @Get('/google/oauth2')
  public async googleOAuth2(@Req() request, @Res() response, @Query() query: { code: string }) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSECRET = process.env.GOOGLE_CLIENT_SECRET;
    const code = query.code;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/google/redirect`;

    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `https://oauth2.googleapis.com/token`,
          {
            client_id: clientID,
            client_secret: clientSECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: callbackURL,
          },
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    return response.status(HttpStatus.OK).json({
      message: 'Everything went fine',
      data: data,
      status: 200,
    });
  }

  @Get('/google/redirect')
  public async googleRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSECRET = process.env.GOOGLE_CLIENT_SECRET;
    const code = query.code;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/google/redirect`;

    const googleData = await firstValueFrom(
      this.httpService
        .post(
          `https://oauth2.googleapis.com/token`,
          {
            client_id: clientID,
            client_secret: clientSECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: callbackURL,
          },
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    const accessToken = googleData.data.access_token;

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axios = require('axios');

      const config = {
        method: 'get',
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      };

      const user_email = axios(config)
        .then(function (response) {
          return JSON.stringify(response.data.email);
        })
        .catch(function (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        });

      // const apiData = await firstValueFrom(
      //   this.httpService
      //     .post<any>(`http://localhost:3000/api/reaccoon/credentials/`, {
      //       email: user_email,
      //       service: 'google',
      //       accessToken: googleData.data.access_token,
      //       refreshToken: googleData.data.refresh_token,
      //     })
      //     .pipe(
      //       catchError((error: AxiosError) => {
      //         return response.status(HttpStatus.OK).json({
      //           message: 'Invalid user credentials queried',
      //           status: 400,
      //         });
      //       }),
      //     ),
      // );
    }

    return response.status(HttpStatus.OK).json({
      message: 'User credentials stored in database !',
      status: 200,
    });
  }
}
