import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { CredentialsMiddleware } from './middleware/credentials.middleware';
import { JwtService } from '@nestjs/jwt';
import { CronModule } from 'src/cron/cron.module';
import { GithubCronService } from './github.cron.service';
import { GithubRecordEntity } from './entity/github-record.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([GithubRecordEntity]),
    ScheduleModule.forRoot(),
    CredentialsModule,
    UserModule,
    CronModule,
  ],
  providers: [GithubService, GithubCronService, JwtService],
  controllers: [GithubController],
  exports: [GithubService, GithubCronService],
})
export class GithubModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CredentialsMiddleware).forRoutes(GithubController);
  }
}
