import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { MyActionEntity } from './entity/myAction.entity';
import { CreateMyActionDto } from './dto/create-myaction-dto';
import { ActionService } from 'src/action/action.service';
import { AreaService } from '../area/area.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ActionType } from 'src/action/entity/action.entity';
import { SpotifyCronService } from 'src/externService/service/spotify/spotify.cron.service';
import { ServiceList } from 'src/service/entity/service.entity';
import { GithubCronService } from 'src/externService/service/github/github.cron.service';
import { GoogleCronService } from 'src/externService/service/google/google.cron.service';
import { CronService } from 'src/cron/cron.service';
import { Params } from 'src/cron/cron.type';
import { DiscordCronService } from 'src/externService/service/discord/discord.cron.service';
import { TwitchCronService } from 'src/externService/service/twitch/twitch.cron.service';
import { TimerCronService } from 'src/externService/service/timer/timer.cron.service';

@Injectable()
export class MyActionService {
  constructor(
    @InjectRepository(MyActionEntity)
    private myActionRepository: Repository<MyActionEntity>,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => AreaService))
    private readonly areaService: AreaService,
    private schedulerRegistry: SchedulerRegistry,
    private readonly googleCronService: GoogleCronService,
    private readonly githubCronService: GithubCronService,
    private readonly spotifyCronService: SpotifyCronService,
    private readonly discordCronService: DiscordCronService,
    private readonly twitchCronService: TwitchCronService,
    private readonly timerCronService: TimerCronService,
    private readonly cronService: CronService,
  ) {}

  async findAction(areaId: string) {
    const myActions = await this.myActionRepository.findBy({ areaId: areaId, linkedFromId: null });
    let resultAction = null;
    if (myActions.length) {
      const action = await this.actionService.findOne(myActions[0].actionId);
      resultAction = {
        uuid: action.uuid,
        name: action.name,
        service: action.service,
        myActionId: myActions[0].uuid,
        hour: myActions[0].hour,
        minute: myActions[0].minute,
        second: myActions[0].second,
        params: myActions[0].params,
      };
    }
    return resultAction;
  }

  async findReaction(areaId: string, actionId: string) {
    const myActions = await this.myActionRepository.findBy({
      areaId: areaId,
      linkedFromId: actionId,
    });
    const reactions = [];
    for (let i = 0; i < myActions.length; i++) {
      const action = await this.actionService.findOne(myActions[i].actionId);
      reactions.push({
        uuid: action.uuid,
        name: action.name,
        service: action.service,
        myActionId: myActions[i].uuid,
        params: myActions[i].params,
      });
    }
    return reactions;
  }

  async findAll(areaId: string) {
    const myActions = await this.myActionRepository.findBy({ areaId: areaId });
    const actions = [];
    for (let i = 0; i < myActions.length; i++) {
      const action = await this.actionService.findOne(myActions[i].actionId);
      actions.push({ action: myActions[i], description: action });
    }
    return actions;
  }

  async findByActionId(actionId: string) {
    return await this.myActionRepository.findBy({ actionId: actionId });
  }

  async findByActionAndUserId(actionId: string, userId: string) {
    return await this.myActionRepository.findBy({ userId: userId, actionId: actionId });
  }

  async findOne(myActionId: string, userId: string) {
    return await this.myActionRepository.findOneBy({ uuid: myActionId, userId: userId });
  }

  async findByLinkedFromId(actionId: string) {
    return await this.myActionRepository.findBy({ linkedFromId: actionId });
  }

  availableActions = new Map([
    // MIRO
    // NOTION
    [ServiceList.TWITCH, this.twitchCronService.availableActions],
    [ServiceList.GOOGLE, this.googleCronService.availableActions],
    [ServiceList.GITHUB, this.githubCronService.availableActions],
    [ServiceList.SPOTIFY, this.spotifyCronService.availableActions],
    [ServiceList.DISCORD, this.discordCronService.availableActions],
    [ServiceList.TIMER, this.timerCronService.availableActions],
  ]);

  async addCron(actionId: string, timer: any, myActionId: string, userId: string, params: Params) {
    const action = await this.actionService.findOne(actionId);

    if (action.type === 'action') {
      this.cronService.addCron(
        {
          name: action.name + '-' + myActionId,
          userId: userId,
          link: action.link,
          service: action.service,
          ...timer,
          params: params,
        },
        this.availableActions.get(action.service),
      );
    }
  }

  async addAction(areaId: string, action: CreateMyActionDto, userId: string) {
    const actionIsPresent: boolean = await this.actionService.exist(action.actionId);
    if (!actionIsPresent) {
      throw NotFoundException('action');
    }
    const areaIsPresent: boolean = await this.areaService.exist(areaId);
    if (!areaIsPresent) {
      throw NotFoundException('area');
    }
    const newAction: MyActionEntity = this.myActionRepository.create({
      userId: userId,
      areaId: areaId,
      ...action,
    });
    const myNewAction: MyActionEntity = await this.myActionRepository.save(newAction);
    await this.addCron(
      action.actionId,
      { hour: action.hour, minute: action.minute, second: action.second },
      // token,
      myNewAction.uuid,
      userId,
      myNewAction.params,
    );
    return myNewAction;
  }

  async removeCron(actionId: string, userId: string) {
    const myAction = await this.findOne(actionId, userId);
    if (!myAction) {
      return;
    }
    const action = await this.actionService.findOne(myAction.actionId);
    if (action.type === 'action') {
      try {
        const cronJob = await this.schedulerRegistry.getCronJob(action.name + '-' + myAction.uuid);
        cronJob.stop();
      } catch (error) {}
    }
  }

  async removeAction(actionId: string, userId: string) {
    await this.removeCron(actionId, userId);
    return await this.myActionRepository.delete({ uuid: actionId, userId: userId });
  }

  async removeByAreaId(areaId: string, userId: string) {
    const myActions = await this.findAll(areaId);
    for (const myAction of myActions) {
      await this.removeCron(myAction.uuid, userId);
    }
    return await this.myActionRepository.delete({ areaId: areaId, userId: userId });
  }

  async generateAllCrons() {
    const allActions = await this.actionService.findByType(ActionType.ACTION);
    for (const action of allActions) {
      const myActions = await this.findByActionId(action.uuid);
      for (const myAction of myActions) {
        await this.addCron(
          action.uuid,
          { hour: myAction.hour, minute: myAction.minute, second: myAction.second },
          // myAction.token,
          myAction.uuid,
          myAction.userId,
          myAction.params,
        );
      }
    }
  }
}
