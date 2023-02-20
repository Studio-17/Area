import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { HttpModule } from '@nestjs/axios';
import { CredentialsModule } from '../../../credentials/credentials.module';
import { UserModule } from '../../../user/user.module';
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
})
export class GithubModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CredentialsMiddleware).forRoutes(GithubController);
  }
}
