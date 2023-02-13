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
import { MiroOAuth2Service } from './miro-oauth2.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CredentialsService } from '../../../credentials/credentials.service';

@ApiTags('/service/connect')
// @UseGuards(JwtAuthenticationGuard)
@Controller('/service/connect')
export class MiroOAuth2Controller {
  constructor(
    private readonly connectionService: MiroOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/miro')
  public async miro(@Res() response, @Query() query: { id: string }) {
    const clientID = process.env.MIRO_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/miro/redirect`;

    return response.status(HttpStatus.OK).json({
      url: encodeURIComponent(
        `https://miro.com/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${callbackURL}&state=${query.id}`,
      ),
      status: 200,
    });
  }

  @Get('/miro/redirect')
  public async miroRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.MIRO_CLIENT_ID;
    const clientSECRET = process.env.MIRO_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/miro/redirect`;

    const miroData = await firstValueFrom(
      this.httpService
        .post(
          `https://api.miro.com/v1/oauth/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSECRET}&code=${code}&redirect_uri=${callbackURL}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    const accessToken = miroData.data.access_token;

    if (accessToken) {
      const userCredentials = {
        userId: id,
        service: 'miro',
        accessToken: miroData.data.access_token,
        refreshToken: miroData.data.refresh_token,
      };

      await this.credentialsService.createCredentialsUser(userCredentials);
    }

    return response.status(HttpStatus.OK).json({
      message: 'User credentials stored in database !',
      status: 200,
    });
  }
}
