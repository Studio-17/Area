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
import { JwtAuthenticationGuard } from '../../../authentication/guards/jwt-authentication.guard';
import { GoogleOAuth2Service } from './google-oauth2.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CredentialsService } from '../../../credentials/credentials.service';

@ApiTags('/service/connect')
// @UseGuards(JwtAuthenticationGuard)
@Controller('/service/connect')
export class GoogleOAuth2Controller {
  constructor(
    private readonly connectionService: GoogleOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/google')
  public async google(@Res() response, @Query() query: { id: string }) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/google/redirect`;
    const scope =
      'email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive';

    return response.status(HttpStatus.OK).json({
      url: encodeURIComponent(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${query.id}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google/redirect')
  public async googleRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSECRET = process.env.GOOGLE_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
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
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
          }),
        ),
    );

    const accessToken = googleData.data.access_token;

    if (accessToken) {
      const userCredentials = {
        id: id,
        service: 'google',
        accessToken: googleData.data.access_token,
        refreshToken: googleData.data.refresh_token,
      };

      await this.credentialsService.createCredentialsUser(userCredentials);
    }

    return response.status(HttpStatus.OK).json({
      message: 'User credentials stored in database !',
      status: 200,
    });
  }
}
