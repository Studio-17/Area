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
import { GoogleOAuth2Service } from './google-oauth2.service';
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
export class GoogleOAuth2Controller {
  constructor(
    private readonly connectionService: GoogleOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/google')
  @UseGuards(AuthGuard('jwt'))
  public async google(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope =
      'email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.readonly';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['email']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google';
    const state = `${token['email']}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google-analytics')
  @UseGuards(AuthGuard('jwt'))
  public async googleAnalytics(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope = 'email profile https://www.googleapis.com/auth/analytics';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google-analytics';
    const state = `${token['id']}+${googleServiceName}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google-drive')
  @UseGuards(AuthGuard('jwt'))
  public async googleDrive(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope = 'email profile https://www.googleapis.com/auth/drive';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google-drive';
    const state = `${token['id']}+${googleServiceName}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google-event')
  @UseGuards(AuthGuard('jwt'))
  public async googleEvengt(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope =
      'email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google-event';
    const state = `${token['id']}+${googleServiceName}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google-forms')
  @UseGuards(AuthGuard('jwt'))
  public async googleForms(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope =
      'email profile https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/forms.responses.readonly';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google-forms';
    const state = `${token['id']}+${googleServiceName}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google-gmail')
  @UseGuards(AuthGuard('jwt'))
  public async googleGmail(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope = 'email profile https://www.googleapis.com/auth/gmail.readonly';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google-mail';
    const state = `${token['id']}+${googleServiceName}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google-suite')
  @UseGuards(AuthGuard('jwt'))
  public async googleSuite(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope =
      'email profile https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/spreadsheets';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google-suite';
    const state = `${token['id']}+${googleServiceName}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google-youtube')
  @UseGuards(AuthGuard('jwt'))
  public async googleYoutube(@Req() request, @Res() response) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;
    const scope =
      'email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly';
    const token = this.jwtService.decode(request.headers['authorization'].split(' ')[1]);

    if (!token['id']) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Error unauthenticated (using jwt)',
        data: token,
        status: 401,
      });
    }

    const googleServiceName = 'google-youtube';
    const state = `${token['id']}+${googleServiceName}`;

    return response.status(HttpStatus.OK).json({
      url: encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${callbackURL}&client_id=${clientID}`,
      ),
      status: 200,
    });
  }

  @Get('/google/redirect')
  public async googleRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSECRET = process.env.GOOGLE_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
    const callbackURL = `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/service/connect/google/redirect`;

    const googleData = await firstValueFrom(
      this.httpService
        .post(
          `https://oauth2.googleapis.com/token`,
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
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
          }),
        ),
    );

    const accessToken = googleData.data.access_token;

    if (accessToken) {
      const user = await this.userService.findByEmail(id);

      const userCredentials = {
        userId: user.uuid,
        service: ServiceList.GOOGLE,
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
