import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ReactionDto } from 'src/cron/dto/reaction.dto';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { WebhookService } from './webhook.service';

@Controller('actions/webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/get')
  public async get(@Res() response, @Body() body: ReactionDto) {
    try {
      const url = getElemContentInParams(body.params, 'url', undefined, body.returnValues);
      const param = getElemContentInParams(body.params, 'param', undefined, body.returnValues);
      const data = await this.webhookService.getWebhook(url, param);
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

  @Post('/post')
  public async post(@Res() response, @Body() body: ReactionDto) {
    try {
      const url = getElemContentInParams(body.params, 'url', undefined, body.returnValues);
      const bodyValue = getElemContentInParams(body.params, 'body', undefined, body.returnValues);
      const data = await this.webhookService.postWebhook(url, bodyValue);

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
