import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TwitchOAuth2Service } from './twitch-oauth2.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import axios, { AxiosError } from 'axios';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ServiceList } from 'src/service/entity/service.entity';
import { UserService } from 'src/user/user.service';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class TwitchOAuth2Controller {
  constructor(
    private readonly connectionService: TwitchOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/twitch')
  @UseGuards(AuthGuard('jwt'))
  public async twitch(@Req() request, @Res() response) {
    const clientID = process.env.TWITCH_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/twitch/redirect`;
    const scope =
      'user:read:email user:read:follows user:read:subscriptions chat:read analytics:read:games';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['email']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }
    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://id.twitch.tv/oauth2/authorize?scope=${scope}&redirect_uri=${callbackURL}&client_id=${clientID}&response_type=code&state=${token['email']}`,
      ),
      status: 200,
    });
  }

  @Get('/twitch/redirect')
  public async twitchRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.TWITCH_CLIENT_ID;
    const clientSECRET = process.env.TWITCH_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/twitch/redirect`;

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
      const user = await this.userService.findByEmail(id);

      const userCredentials = {
        userId: user.uuid,
        service: ServiceList.TWITCH,
        accessToken: accessToken,
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
