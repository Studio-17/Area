import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { GithubService } from './github.service';
import { ActionParam } from '../../../cron/interfaces/actionParam.interface';
import { getElemContentInParams } from '../../../cron/utils/getElemContentInParams';
import { ActionResult } from '../../../cron/interfaces/actionResult.interface';
import { CronService } from '../../../cron/cron.service';
import { ActionRecord } from '../../../cron/entity/actionRecord.entity';

@Injectable()
export class GithubCronService {
  constructor(
    private readonly githubService: GithubService,
    private readonly cronService: CronService,
  ) {}

  availableActions = new Map<string, ActionFunction>([
    ['github/check-user-repository/', this.checkUserRepository.bind(this)],
    ['github/check-pull-request/', this.checkPullRequest.bind(this)],
    ['github/check-issue/', this.checkIssue.bind(this)],
    ['github/check-user-issue/', this.checkUserIssue.bind(this)],
    ['github/check-team/', this.checkTeam.bind(this)],
    ['github/check-contributor/', this.checkContributor.bind(this)],
    ['github/check-fork/', this.checkFork.bind(this)],
    ['github/check-star/', this.checkStar.bind(this)],
    ['github/check-user-star/', this.checkUserStar.bind(this)],
    ['github/check-invitation/', this.checkInvitation.bind(this)],
    ['github/check-milestone/', this.checkMilestone.bind(this)],
    ['github/check-review-comment/', this.checkReviewComment.bind(this)],
  ]);

  // --- USER STAR ---
  // TODO - Fix conflict between users
  public async checkUserRepository(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const repository = await this.githubService.getUserRepository(actionParam.accessToken);

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'user-repository';
      record.content = repository.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- PULL REQUEST ---
  public async checkPullRequest(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const pullRequest = await this.githubService.getPullRequest(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'pullRequest';
      record.content = pullRequest.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- ISSUE ---
  public async checkIssue(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const issue = await this.githubService.getIssue(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'issue';
      record.content = issue.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // TODO - Fix user conflicts
  // --- USER ISSUE ---
  public async checkUserIssue(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const issue = await this.githubService.getUserIssue(actionParam.accessToken);

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'user-issue';
      record.content = issue.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- STAR ---
  public async checkStar(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const star = await this.githubService.getStar(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'star';
      record.content = star.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- USER STAR ---
  // TODO - Fix conflict between users
  public async checkUserStar(actionParam: ActionParam): Promise<ActionResult> {
    try {
      const star = await this.githubService.getUserStar(actionParam.accessToken);

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'user-star';
      record.content = star.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- MILESTONE ---
  public async checkMilestone(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const milestone = await this.githubService.getMilestone(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'milestone';
      record.content = milestone.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- TEAM ---
  public async checkTeam(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const team = await this.githubService.getTeam(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'team';
      record.content = team.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- INVITATION ---
  public async checkInvitation(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const invitation = await this.githubService.getInvitation(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'invitation';
      record.content = invitation.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- CONTRIBUTOR ---
  public async checkContributor(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);
    try {
      const contributor = await this.githubService.getContributor(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'contributor';
      record.content = contributor.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- REVIEW COMMENT ---
  public async checkReviewComment(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const review = await this.githubService.getReviewComment(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'review-comment';
      record.content = review.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }

  // --- FORK ---
  public async checkFork(actionParam: ActionParam): Promise<ActionResult> {
    const owner = getElemContentInParams(actionParam.params, 'owner', '', []);
    const repo = getElemContentInParams(actionParam.params, 'repo', '', []);

    try {
      const fork = await this.githubService.getFork(actionParam.accessToken, {
        owner: owner,
        repo: repo,
      });

      const record = new ActionRecord();
      record.myActionId = actionParam.myActionId;
      record.category = 'fork';
      record.content = fork.toString();
      return {
        isTriggered: await this.cronService.findOrUpdateLastRecord(record),
        returnValues: [],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(() => error.message, HttpStatus.BAD_REQUEST, { cause: error });
    }
  }
}
