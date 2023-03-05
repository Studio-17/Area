import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { WebhookService } from './webhook.service';

@Injectable()
export class WebhookCronService {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly cronService: CronService,
  ) {}

  public async checkGet(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const url = getElemContentInParams(actionParam.params, 'url', undefined, []);
      const response = await this.webhookService.getWebhook(url);
      const record = this.cronService.createRecord(
        actionParam.myActionId,
        'getResponse',
        response.toString(),
      );
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
      };
    } catch (error) {
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  availableActions = new Map<string, ActionFunction>([['webhook/get/', this.checkGet.bind(this)]]);
}
