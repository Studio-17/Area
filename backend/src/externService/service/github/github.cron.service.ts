import { Injectable } from '@nestjs/common';
import { ActionFunction } from 'src/cron/interfaces/actionFunction.interface';
import { GithubService } from './github.service';

@Injectable()
export class GithubCronService {
  constructor(private readonly githubService: GithubService) {}

  availableActions = new Map<string, ActionFunction>([
    [
      'github/check-pull-request/',
      this.githubService.updateLastPullRequest.bind(this.githubService),
    ],
    ['github/check-issue/', this.githubService.updateLastIssue.bind(this.githubService)],
    // ['github/get-repository/', this.githubService.addRepositoryCron.bind(this.githubService)],
  ]);
}
