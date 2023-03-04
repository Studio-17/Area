import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { WebhookService } from './webhook.service';

@Controller('actions/webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/get')
  public async getAuthenticatedUserInformation(@Res() response, @Body() body: ReactionDto) {
    try {
      const data = await this.webhookService.getWebhook(body);

      return response.status(HttpStatus.OK).json({
        message: 'Got data from Webhook services',
        content: data,
        status: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching the data from provided webhook',
        status: 400,
      });
    }
  }
}
