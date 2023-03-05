import { Injectable } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { ActionParam } from 'src/cron/interfaces/actionParam.interface';
import { ActionResult } from 'src/cron/interfaces/actionResult.interface';
import { getElemContentInParams } from 'src/cron/utils/getElemContentInParams';
import { MiroService } from './miro.service';

@Injectable()
export class MiroCronService {
  constructor(
    private readonly miroService: MiroService,
    private readonly cronService: CronService,
  ) {}
  private async newMemberJoinedBoard(actionParam: ActionParam): Promise<ActionResult> {
    const userData = await this.miroService.getAuthenticatedUserInformation(
      actionParam.accessToken,
    );
    const teamBoards = await this.miroService.getTeamBoards(
      actionParam.accessToken,
      userData.team.id,
    );
    const boardName = getElemContentInParams(actionParam.params, 'boardName', undefined);
    const teamMembers = await this.miroService.getBoardTeamMembers(
      actionParam.accessToken,
      teamBoards.data.find((board: any) => board.name === boardName).id,
    );
    const pastRecord = await this.cronService.findByActionId(
      actionParam.myActionId,
      'numberOfMembers',
    );
    const record = this.cronService.createRecord(
      actionParam.myActionId,
      'numberOfMembers',
      teamMembers.total.toString(),
    );
    const isChanged = await this.cronService.findOrUpdateLastRecord(record);
    if (isChanged && +pastRecord.content < +record.content) {
      return {
        isTriggered: true,
        returnValues: [
          { name: 'memberName', content: teamMembers.data.at(-1).name },
          { name: 'memberId', content: teamMembers.data.at(-1).id },
        ],
      };
    }
    return {
      isTriggered: false,
      returnValues: [],
    };
  }

  availableActions = new Map<string, ActionFunction>([
    ['miro/user-join-board/', this.newMemberJoinedBoard.bind(this)],
  ]);
}
