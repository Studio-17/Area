import { Controller, Get, HttpException, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TwitchOAuth2Service } from './twitch-oauth2.service';
import { CredentialsService } from '../../../credentials/credentials.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import axios, { AxiosError } from 'axios';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class TwitchOAuth2Controller {
  constructor(
    private readonly connectionService: TwitchOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/twitch')
  public async twitch(@Res() response, @Query() query: { id: string }) {
    const clientID = process.env.TWITCH_CLIENT_ID;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/twitch/redirect`;
    const scope = encodeURIComponent(
      'user:read:email user:read:follows user:read:subscriptions chat:read',
    );

    return response.status(HttpStatus.OK).json({
      url: `https://id.twitch.tv/oauth2/authorize?scope=${scope}&redirect_uri=${callbackURL}&client_id=${clientID}&response_type=code&state=${query.id}`,
      status: 200,
    });
  }
  @Get('/twitch/redirect')
  public async twitchRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.TWITCH_CLIENT_ID;
    const clientSECRET = process.env.TWITCH_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/twitch/redirect`;

    const twitchData = await firstValueFrom(
      this.httpService
        .post(
          `https://id.twitch.tv/oauth2/token`,
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

    console.log(twitchData.data);

    const accessToken = twitchData.data.access_token;

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axios = require('axios');

      const config = {
        method: 'get',
        url: `https://api.twitch.tv/helix/users`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Client-Id': `${clientID}`,
        },
      };

      const user = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        });

      const userCredentials = {
        id: id,
        service: 'twitch',
        accessToken: accessToken,
        refreshToken: twitchData.data.refresh_token,
      };

      await this.credentialsService.createCredentialsUser(userCredentials);
    }

    return response.status(HttpStatus.OK).json({
      message: 'User credentials stored in database !',
      status: 200,
    });
  }
}
