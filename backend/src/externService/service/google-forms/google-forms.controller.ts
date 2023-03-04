import { Controller, Get, HttpStatus, Req, Res, Body, Post } from '@nestjs/common';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { GoogleFormsService } from './google-forms.service';

@Controller('actions/google-forms')
export class GoogleFormsController {
  constructor(private readonly googleFormsService: GoogleFormsService) {}

  @Post('/list/all')
  public async listGoogleForms(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleForms = await this.googleFormsService.listForms(body);

      const data = googleForms.files;
      const formIds = data.map((objects) => objects.id);

      return response.status(HttpStatus.OK).json({
        message: 'Got list of Forms from Forms services',
        id: formIds,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting list of Forms from Google Forms Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/byId')
  public async getGoogleFormsById(@Res() response, @Body() body: ReactionDto) {
    try {
      const googleForm = await this.googleFormsService.getGoogleFormById(body);

      return response.status(HttpStatus.OK).json({
        message: 'Got Forms from service',
        googleForm,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error gettingForms from Google Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/create')
  public async createGoogleForms(@Res() response, @Body() body: ReactionDto) {
    try {
      const formCreated = await this.googleFormsService.createGoogleForm(body);

      return response.status(HttpStatus.OK).json({
        message: 'Created Form from Forms services',
        formCreated,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating Form from Google Forms Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/get/responses/byId')
  public async getGoogleFormsResponsesById(@Res() response, @Body() body: ReactionDto) {
    try {
      const formResponse = await this.googleFormsService.getGoogleFormResponseById(body);

      const data = formResponse.answers;
      const answersIds = data.map((objects) => objects.questionId);

      return response.status(HttpStatus.OK).json({
        message: 'Got response from Forms services',
        id: answersIds,
        formResponse,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching response from Google Forms Apis',
        error: error,
        status: 400,
      });
    }
  }

  @Post('/list/responses')
  public async listGoogleFormsResponses(@Res() response, @Body() body: ReactionDto) {
    try {
      const formResponses = await this.googleFormsService.listGoogleFormResponses(body);

      const data = formResponses.responses;
      const responsesIds = data.map((objects) => objects.responseId);

      return response.status(HttpStatus.OK).json({
        message: 'Got responses for Forms from Forms services',
        id: data,
        formResponses,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching responses for Form from Google Forms Apis',
        error: error,
        status: 400,
      });
    }
  }
}
