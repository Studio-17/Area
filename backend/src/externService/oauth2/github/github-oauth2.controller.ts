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
import { GithubOAuth2Service } from './github-oauth2.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import axios, { AxiosError } from 'axios';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ServiceList } from 'src/service/entity/service.entity';
import { UserService } from 'src/user/user.service';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class GithubOAuth2Controller {
  constructor(
    private readonly connectionService: GithubOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/github')
  @UseGuards(AuthGuard('jwt'))
  public async github(@Req() request, @Res() response) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/github/redirect`;
    const scope = 'repo user user:email';
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
        `https://github.com/login/oauth/authorize?scope=${scope}&redirect_uri=${callbackURL}&client_id=${clientID}&allow_signup=false&state=${token['email']}`,
      ),
      status: 200,
    });
  }

  @Get('/github/redirect')
  public async githubRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSECRET = process.env.GITHUB_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/github/redirect`;

    const githubData = await firstValueFrom(
      this.httpService
        .post(
          `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSECRET}&code=${code}&redirect_uri=${callbackURL}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    const responseRegex = /access_token=([^&]*)/;
    const responseMatches = githubData.data.match(responseRegex);
    const accessToken = responseMatches[1];

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axios = require('axios');

      const config = {
        method: 'get',
        url: `https://api.github.com/user/emails`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const userEmails = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        });

      const user = await this.userService.findByEmail(id);

      const userCredentials = {
        userId: user.uuid,
        service: ServiceList.GITHUB,
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
