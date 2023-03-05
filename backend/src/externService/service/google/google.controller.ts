import { Controller, Get, HttpStatus, Res, Body, Post } from '@nestjs/common';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { GoogleService } from './google.service';

@Controller('actions/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post('/publish-doc')
  public async createGoogleDoc(@Res() response, @Body() body: ReactionDto) {
    try {
      const fileId = await this.googleService.createGoogleDocOnDrive(body);

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

  @Post('/send-mail')
  public async sendMail(@Res() response, @Body() body: ReactionDto) {
    try {
      const mailId = await this.googleService.sendMail(body);
      return response.status(HttpStatus.OK).json({
        message: 'Successfully send email',
        content: mailId,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error while sending email',
        error: error,
        status: 400,
      });
    }
  }
}
