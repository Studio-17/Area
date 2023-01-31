import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuth2Guard } from './guards/google-authentication.guard';

@ApiTags('google')
@Controller('google')
export class GoogleController {
  @Get('/')
  @UseGuards(GoogleOAuth2Guard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async loginGoogle(@Res() response, @Req() request) {
    console.log('controller - /oauth2/google');
  }

  @Get('/redirect')
  @UseGuards(GoogleOAuth2Guard)
  public async redirectGoogle(@Res() response, @Req() request) {
    console.log('controller - /oauth2/google/redirect');

    console.log(request.user);

    return response.redirect(
      `http://localhost:8000/service/connect/google/success?accessToken=${request.user.accessToken}&refreshToken=${request.user.refreshToken}`,
    );
  }
}
