import { Injectable } from '@nestjs/common';
import { Params } from 'src/cron/cron.type';

@Injectable()
export class TimerCronService {
  async timerDone(accessToken: string, params: Params): Promise<boolean> {
    void accessToken;
    void params;
    console.log('timerDone');
    return true;
  }

  public availableActions = new Map([['timer/timer-done/', this.timerDone.bind(this)]]);
}
