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
import { NotionOAuth2Service } from './notion-oauth2.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CredentialsService } from '../../../credentials/credentials.service';

@ApiTags('/service/connect')
// @UseGuards(JwtAuthenticationGuard)
@Controller('/service/connect')
export class NotionOAuth2Controller {
  constructor(
    private readonly connectionService: NotionOAuth2Service,
    private readonly credentialsService: CredentialsService,
    private readonly httpService: HttpService,
  ) {}

  @Get('/notion')
  public async notion(@Res() response, @Query() query: { id: string }) {
    const clientID = process.env.NOTION_CLIENT_ID;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/notion/redirect`;

    return response.status(HttpStatus.OK).json({
      url: `https://api.notion.com/v1/oauth/authorize?client_id=${clientID}&response_type=code&owner=user&redirect_uri=${callbackURL}&state=${query.id}`,
      status: 200,
    });
  }

  @Get('/notion/redirect')
  public async notionRedirect(@Req() request, @Res() response, @Query() query) {
    const clientID = process.env.NOTION_CLIENT_ID;
    const clientSECRET = process.env.NOTION_CLIENT_SECRET;
    const code = query.code;
    const id = query.state;
    const callbackURL = `http://localhost:3000/api/reaccoon/service/connect/notion/redirect`;

    const notionData = await firstValueFrom(
      this.httpService
        .post(
          `https://api.notion.com/v1/oauth/token`,
          {
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: callbackURL,
          },
          {
            headers: {
              Authorization: `Basic ${btoa(clientID + ':' + clientSECRET)}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }),
        ),
    );

    const accessToken = notionData.data.access_token;

    if (accessToken) {
      const userCredentials = {
        id: id,
        service: 'notion',
        accessToken: notionData.data.access_token,
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
