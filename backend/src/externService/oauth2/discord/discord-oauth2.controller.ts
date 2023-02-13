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

@ApiTags('/service/connect')
@Controller('/service/connect')
export class DiscordOAuth2Controller {
  constructor(
    private readonly connectionService: DiscordOAuth2Service,
    private readonly credentialsService: CredentialsService,
  ) {}
  @Get('/discord')
  public async discord(@Req() request, @Res() response, @Query() query: { id: string }) {
    const clientID = process.env.DISCORD_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/discord/redirect`;
    const scope = encodeURIComponent('email identify');
    const state = query.id;

    return response.status(HttpStatus.OK).json({
      url: encodeURIComponent(
        `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=${scope}&state=${state}`,
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
        scope: 'identify email',
        grantType: 'authorization_code',

        redirectUri: callbackURL,
      })
      .then((response) => {
        return response;
      });

    const accessToken = discordData.access_token;

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axios = require('axios');

      const config = {
        method: 'get',
        url: `https://discord.com/api/v10/users/@me`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const userEmail = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        });

      const userCredentials = {
        userId: id,
        service: 'discord',
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
