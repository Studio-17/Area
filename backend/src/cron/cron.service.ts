import { HttpService } from '@nestjs/axios';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ActionService } from 'src/action/action.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { MyActionService } from 'src/myAction/myAction.service';
import { UserService } from 'src/user/user.service';
import { ServiceList, ServiceType } from '../service/entity/service.entity';
import { CreateCronDto } from './dto/add-cron.dto';
import { CronJob } from 'cron';
import { Params } from './type/param.type';
import { ServiceService } from 'src/service/service.service';
import { ActionResult } from './interfaces/actionResult.interface';
import { ActionParam } from './interfaces/actionParam.interface';
import { ReturnValues } from './type/returnValue.type';
import { ActionRecord } from './entity/actionRecord.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/utils/exceptions/not-found.exception';

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
    private readonly serviceService: ServiceService,
    @InjectRepository(ActionRecord)
    private readonly actionRecordRepository: Repository<ActionRecord>,
  ) {}

  public async findByActionId(myActionId: string, category: string): Promise<ActionRecord> {
    try {
      return await this.actionRecordRepository.findOneBy({
        myActionId: myActionId,
        category: category,
      });
    } catch (error) {
      return undefined;
    }
  }

  public async findOrUpdateLastRecord(actionRecord: ActionRecord): Promise<boolean> {
    const record = await this.findByActionId(actionRecord.myActionId, actionRecord.category);
    if (!record) {
      try {
        await this.actionRecordRepository.save(actionRecord);
        return false;
      } catch (err) {
        throw new HttpException(() => err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    }
    if (record.content !== actionRecord.content) {
      try {
        const newRecord = await this.actionRecordRepository.update(
          {
            myActionId: actionRecord.myActionId,
            category: record.category,
            content: record.content,
          },
          { ...actionRecord },
        );

        if (!newRecord) {
          throw NotFoundException(`Record does not exist`);
        }
        return true;
      } catch (err) {
        throw new HttpException(() => err.message, HttpStatus.BAD_REQUEST, { cause: err });
      }
    }
    return false;
  }

  public async removeRecord(myActionId: string): Promise<void> {
    await this.actionRecordRepository.delete({ myActionId: myActionId }).catch(() => {
      throw NotFoundException('area');
    });
  }

  async handleCronAddition(
    userId: string,
    myActionId: string,
    actionLink: string,
    service: ServiceList,
    actionHandling: (actionParam: ActionParam) => ActionResult,
    params: Params,
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
      let credential = '';
      if (await this.serviceService.isType(service, ServiceType.EXTERNAL)) {
        credential = (await this.credentialsService.findById(userId, service)).accessToken;
      }
      const argToSend = params
        ? [{ name: 'userId', content: userId, isActionResult: false }, ...params]
        : [{ name: 'userId', content: userId, isActionResult: false }];
      const conditionChecked = await actionHandling({
        accessToken: credential,
        params: argToSend,
        myActionId: myActionId,
      });
      if (conditionChecked.isTriggered) {
        await this.handleCronReaction(userId, actionLink, conditionChecked.returnValues);
      }
    } catch (error: any) {
      return;
    }
  }

  addCron(
    body: CreateCronDto,
    availableActions: Map<string, (actionParam: ActionParam) => Promise<ActionResult>>,
  ) {
    if (!availableActions.has(body.link)) {
      console.log('No such function');
      return;
    }
    const job = new CronJob(
      body.second + ` ` + body.minute + ` ` + body.hour + ` * * *`,
      this.handleCronAddition.bind(
        this,
        body.userId,
        body.myActionId,
        body.link,
        body.service,
        availableActions.get(body.link),
        body.params,
      ),
    );
    console.log('cron has been added');
    this.schedulerRegistry.addCronJob(body.name, job);
    job.start();
  }

  async handleCronReaction(userId: string, actionLink: string, returnValues: ReturnValues) {
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
        console.log('calling reaction:', reaction.link);
        await firstValueFrom(
          this.httpService
            .post<any>(
              `http://${process.env.APP_HOST}:${process.env.API_PORT}${process.env.APP_ENDPOINT}/actions/` +
                reaction.link,
              {
                accessToken: newAccessToken.accessToken,
                params: linked.params,
                returnValues: returnValues,
              },
            )
            .pipe(
              catchError((error: AxiosError) => {
                // console.log(error);
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST, { cause: error });
              }),
            ),
        );
      }
    }
  }
}
