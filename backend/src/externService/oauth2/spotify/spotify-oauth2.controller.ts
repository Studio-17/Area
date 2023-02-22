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
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ServiceList } from '../../../service/entity/service.entity';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class SpotifyOAuth2Controller {
  constructor(
    private readonly connectionService: SpotifyOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/spotify')
  @UseGuards(AuthGuard('jwt'))
  public async spotify(@Req() request, @Res() response) {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/spotify/redirect`;
    const scope =
      'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }
    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.spotify.com/authorize?scope=${scope}&response_type=code&redirect_uri=${callbackURL}&client_id=${clientID}&state=${token['id']}`,
      ),
      status: 200,
    });
  }

  @Get('/spotify/redirect')
  public async spotifyRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/spotify/redirect`;

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

      console.log('data:', userEmail);
      console.log('token:', spotifyData.data.access_token);

      const userCredentials = {
        userId: id,
        service: ServiceList.SPOTIFY,
        accessToken: spotifyData.data.access_token,
        refreshToken: null,
      };

      await this.credentialsService.createCredentialsUser(userCredentials);
    }

    return response.status(HttpStatus.OK).json({
      message: 'User credentials stored in database !',
      status: 200,
    });
  }
}
