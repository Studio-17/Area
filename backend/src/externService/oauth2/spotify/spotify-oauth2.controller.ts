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
import { SpotifyOAuth2Service } from './spotify-oauth2.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CredentialsService } from '../../../credentials/credentials.service';

@ApiTags('/service/connect')
// @UseGuards(JwtAuthenticationGuard)
@Controller('/service/connect')
export class SpotifyOAuth2Controller {
  constructor(
    private readonly connectionService: SpotifyOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/spotify')
  public async spotify(@Res() response, @Query() query: { id: string }) {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/spotify/redirect`;
    const scope = 'playlist-read-private user-read-email';

    return response.status(HttpStatus.OK).json({
      url: `https://accounts.spotify.com/authorize?scope=${scope}&response_type=code&redirect_uri=${callbackURL}&client_id=${clientID}&state=${query.id}`,
      status: 200,
    });
  }

  @Get('/spotify/redirect')
  public async spotifyRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const code = query.code;
    const id = query.id;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/spotify/redirect`;

    const spotifyData = await firstValueFrom(
      this.httpService
        .post(
          `https://accounts.spotify.com/api/token`,
          {
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: callbackURL,
          },
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              Authorization:
                'Basic ' + new Buffer(clientID + ':' + clientSECRET).toString('base64'),
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    const accessToken = spotifyData.data.access_token;

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axios = require('axios');

      const config = {
        method: 'get',
        url: `https://api.spotify.com/v1/me`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const userEmail = await axios(config)
        .then(function (response) {
          return response.data.email;
        })
        .catch(function (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        });

      const userCredentials = {
        id: id,
        service: 'spotify',
        accessToken: spotifyData.data.access_token,
        refreshToken: 'null',
      };

      await this.credentialsService.createCredentialsUser(userCredentials);
    }

    return response.status(HttpStatus.OK).json({
      message: 'User credentials stored in database !',
      status: 200,
    });
  }
}
