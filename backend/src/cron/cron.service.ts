import { HttpService } from '@nestjs/axios';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ActionService } from 'src/action/action.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { MyActionService } from 'src/myAction/myAction.service';
import { UserService } from 'src/user/user.service';
import { ServiceList } from '../service/entity/service.entity';
import { CreateCronDto } from './dto/add-cron.dto';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => MyActionService))
    private readonly myActionService: MyActionService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async handleCronAddition(
    userId: string,
    actionLink: string,
    service: ServiceList,
    actionHandling: (string, params: { name: string; content: string }[]) => boolean,
    params: { name: string; content: string }[],
  ) {
    if (!actionHandling) {
      return;
    }

    this.userService.existByUserId(userId).then((exist) => {
      if (!exist) {
        return;
      }
    });

    try {
      const credential = await this.credentialsService.findById(userId, service);
      const argToSend = params
        ? [{ name: 'userId', content: userId }, ...params]
        : [{ name: 'userId', content: userId }];
      const conditionChecked = await actionHandling(credential.accessToken, argToSend);
      if (conditionChecked) {
        await this.handleCronReaction(userId, actionLink);
      }
    } catch (error: any) {
      console.error(error);
      return;
    }
  }

  addCron(body: CreateCronDto, availableActions: Map<string, any>) {
    if (!availableActions.has(body.link)) {
      console.log('No such function');
      return;
    }

    const job = new CronJob(
      body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
      this.handleCronAddition.bind(
        this,
        body.userId,
        body.link,
        body.service,
        availableActions.get(body.link),
        body.params,
      ),
    );
    this.schedulerRegistry.addCronJob(body.name, job);
    job.start();
  }

  async handleCronReaction(userId: string, actionLink: string) {
    const action = await this.actionService.findByLink(actionLink);
    const relatedActions = await this.myActionService.findByActionAndUserId(action.uuid, userId);

    for (const relatedAction of relatedActions) {
      const linkedReaction = await this.myActionService.findByLinkedFromId(relatedAction.uuid);
      for (const linked of linkedReaction) {
        const reaction = await this.actionService.findOne(linked.actionId);
        const newAccessToken = await this.credentialsService.findById(userId, reaction.service);
        if (!newAccessToken) {
          return;
        }
        await firstValueFrom(
          this.httpService
            .post<any>(
              `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/actions/` +
                reaction.link,
              {
                accessToken: newAccessToken.accessToken,
                params: linked.params,
              },
            )
            .pipe(
              catchError((error: AxiosError) => {
                console.error(error);
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
              }),
            ),
        );
      }
    }
  }
}
