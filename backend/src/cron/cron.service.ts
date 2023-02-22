import { HttpService } from '@nestjs/axios';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ActionService } from 'src/action/action.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { MyActionService } from 'src/myAction/myAction.service';

@Injectable()
export class CronService {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly actionService: ActionService,
    @Inject(forwardRef(() => MyActionService))
    private readonly myActionService: MyActionService,
    private readonly httpService: HttpService,
  ) {}

  async handleCronReaction(userId: string, actionLink: string, accessToken: string) {
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
            .post<any>('http://localhost:3000/api/reaccoon/actions/' + reaction.link, {
              accessToken: newAccessToken.accessToken,
              params: linked.params,
            })
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
