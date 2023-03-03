import { Injectable } from '@nestjs/common';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';

@Injectable()
export class TimerCronService {
  async timerDone(actionParam: ActionParam): Promise<ActionResult> {
    void actionParam;
    console.log('timerDone');
    return { isTriggered: true, returnValues: [] };
  }

  public availableActions = new Map<string, ActionFunction>([
    ['timer/timer-done/', this.timerDone.bind(this)],
  ]);
}
