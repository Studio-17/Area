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
import { DiscordOAuth2Service } from './discord-oauth2.service';
import { CredentialsService } from '../../../credentials/credentials.service';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ServiceList } from '../../../service/entity/service.entity';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class DiscordOAuth2Controller {
  constructor(
    private readonly connectionService: DiscordOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/discord')
  @UseGuards(AuthGuard('jwt'))
  public async discord(@Req() request, @Res() response) {
    const clientID = process.env.DISCORD_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/discord/redirect`;
    const scope = 'email identify guilds guilds.members.read';
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
        `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=${scope}&state=${token['id']}`,
      ),
      status: 200,
    });
  }

  @Get('/discord/redirect')
  public async discordRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.DISCORD_CLIENT_ID;
    const clientSECRET = process.env.DISCORD_CLIENT_SECRET;
    const code = query.code;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/discord/redirect`;
    const id = query.state;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const DiscordOauth2 = require('discord-oauth2');
    const oauth = new DiscordOauth2();

    const discordData = await oauth
      .tokenRequest({
        clientId: clientID,
        clientSecret: clientSECRET,

        code: code,
        scope: 'email identify guilds guilds.members.read',
        grantType: 'authorization_code',

        redirectUri: callbackURL,
      })
      .then((response) => {
        return response;
      });

    const accessToken = discordData.access_token;
    console.log('access token:', accessToken);

    if (accessToken) {
      const userCredentials = {
        userId: id,
        service: ServiceList.DISCORD,
        accessToken: accessToken,
        refreshToken: discordData.refresh_token,
      };

      await this.credentialsService.createCredentialsUser(userCredentials);
    }

    return response.status(HttpStatus.OK).json({
      message: 'User credentials stored in database !',
      status: 200,
    });
  }
}
