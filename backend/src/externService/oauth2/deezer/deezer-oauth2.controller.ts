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
import { DeezerOauth2Service } from './deezer-oauth2.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ServiceList } from 'src/service/entity/service.entity';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios/index';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class DeezerOauth2Controller {
  constructor(
    private readonly connectionService: DeezerOauth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/deezer')
  @UseGuards(AuthGuard('jwt'))
  public async discord(@Req() request, @Res() response) {
    const clientID = process.env.DEEZER_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/deezer/redirect`;
    const scope =
      'basic_access,email,manage_library,manage_community,delete_library,listening_history';
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
        `https://connect.deezer.com/oauth/auth.php?app_id=${clientID}&redirect_uri=${callbackURL}&perms=${scope}&state=${token['id']}`,
      ),
      status: 200,
    });
  }

  @Get('/deezer/redirect')
  public async discordRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.DEEZER_CLIENT_ID;
    const clientSECRET = process.env.DEEZER_CLIENT_SECRET;
    const code = query.code;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/deezer/redirect`;
    const id = query.state;

    const deezerData = await firstValueFrom(
      this.httpService
        .post(
          `https://connect.deezer.com/oauth/access_token.php?app_id=${clientID}&secret=${clientSECRET}&code=${code}&output=json`,
          null,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(
          map((value) => {
            return value.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    const accessToken = deezerData.access_token;

    if (accessToken) {
      const userCredentials = {
        userId: id,
        service: ServiceList.DISCORD,
        accessToken: deezerData.access_token,
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
