import { forwardRef, Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { ActionModule } from 'src/action/action.module';
import { MyActionModule } from 'src/myAction/myAction.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { GithubPullRequestEntity } from './entity/github-pull-request.entity';
import { GithubIssueEntity } from './entity/github-issue.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([GithubPullRequestEntity, GithubIssueEntity]),
    ScheduleModule.forRoot(),
    CredentialsModule,
    ActionModule,
    forwardRef(() => MyActionModule),
    UserModule,
  ],
  providers: [GithubService],
  controllers: [GithubController],
  exports: [GithubService],
})
export class GithubModule {}
