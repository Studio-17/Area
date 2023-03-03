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
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { MiroOAuth2Service } from './miro-oauth2.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CredentialsService } from 'src/credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ServiceList } from 'src/service/entity/service.entity';
import { UserService } from 'src/user/user.service';

@ApiTags('/service/connect')
@Controller('/service/connect')
export class MiroOAuth2Controller {
  constructor(
    private readonly connectionService: MiroOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/miro')
  @UseGuards(AuthGuard('jwt'))
  public async miro(@Req() request, @Res() response) {
    const clientID = process.env.MIRO_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/miro/redirect`;
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
        `https://miro.com/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${callbackURL}&state=${token['email']}`,
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
      const user = await this.userService.findByEmail(id);

      const userCredentials = {
        userId: user.uuid,
        service: ServiceList.MIRO,
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
