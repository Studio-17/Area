import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { ActionModule } from 'src/action/action.module';
import { MyActionModule } from 'src/myAction/myAction.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { CredentialsMiddleware } from './middleware/credentials.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
    UserModule,
  ],
  providers: [GithubService, JwtService],
  controllers: [GithubController],
  exports: [GithubService],
})
export class GithubModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CredentialsMiddleware).forRoutes(GithubController);
  }
}
