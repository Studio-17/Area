import { Controller, Get, HttpStatus, Req, Res, Body, Post } from '@nestjs/common';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { GoogleService } from './google.service';

@Controller('actions/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('/check-mail')
  public async checkIfMailReceived(@Res() response, @Body() body: ReactionDto) {
    try {
      const gmailRecord = await this.googleService.updateLastEmailReceived(
        body.accessToken,
        body.params,
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

  @Post('/publish-doc')
  public async createGoogleDoc(@Res() response, @Body() body: ReactionDto) {
    try {
      const fileId = await this.googleService.createGoogleDocOnDrive(body.accessToken, body.params);

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
