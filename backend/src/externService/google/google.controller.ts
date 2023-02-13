import { Controller, Get, HttpStatus, Req, Res, Body, Post, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { CreateCronDto } from './dto/gmail/add-cron.dto';

// @UseGuards(JwtAuthenticationGuard)
@Controller('actions/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('/check-mail')
  public async checkIfMailReceived(
    @Req() request,
    @Res() response,
    @Body() body: { accessToken: string; email: string },
  ) {
    try {
      const gmailRecord = await this.googleService.updateLastEmailReceived(
        body.accessToken,
        body.email,
      );

      console.log(gmailRecord);

      return response.status(HttpStatus.OK).json({
        message: 'Got last email from Google services',
        content: gmailRecord,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching emails from Google Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/check-mail/cron')
  public async addCheckMailCron(@Body() body: CreateCronDto) {
    this.googleService.addCron(body.name, body);
  }

  @Post('/publish-doc')
  public async createGoogleDoc(
    @Req() request,
    @Res() response,
    @Body() body: { accessToken: string; filename: string },
  ) {
    console.log('create a doc');
    try {
      const fileId = await this.googleService.createGoogleDocOnDrive(
        body.accessToken,
        body.filename,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Successfully created document on personal drive',
        content: fileId,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error while creating the document',
        error: error,
        status: 400,
      });
    }
  }
}
