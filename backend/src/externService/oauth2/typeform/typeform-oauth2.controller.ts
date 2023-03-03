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
import { TypeformOauth2Service } from './typeform-oauth2.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ServiceList } from 'src/service/entity/service.entity';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios/index';
import { UserService } from 'src/user/user.service';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class TypeformOauth2Controller {
  constructor(
    private readonly connectionService: TypeformOauth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/typeform')
  @UseGuards(AuthGuard('jwt'))
  public async typeform(@Req() request, @Res() response) {
    const clientID = process.env.TYPEFORM_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/typeform/redirect`;
    const scope = [
      'accounts:read',
      'forms:read',
      'forms:write',
      'responses:read',
      'responses:write',
    ];
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
        `https://api.typeform.com/oauth/authorize?state=${token['email']}&client_id=${clientID}&redirect_uri=${callbackURL}&scope=${scope[0]}+${scope[1]}+${scope[2]}+${scope[3]}+${scope[4]}`,
      ),
      status: 200,
    });
  }

  @Get('/typeform/redirect')
  public async typeformRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.TYPEFORM_CLIENT_ID;
    const clientSECRET = process.env.TYPEFORM_CLIENT_SECRET;
    const code = query.code;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/typeform/redirect`;
    const id = query.state;

    const typeformData = await firstValueFrom(
      this.httpService
        .post(
          `https://api.typeform.com/oauth/token`,
          {
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: callbackURL,
            client_id: clientID,
            client_secret: clientSECRET,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
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

    const accessToken = typeformData.access_token;

    if (accessToken) {
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
