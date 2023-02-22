import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CredentialsModule } from './credentials/credentials.module';
import { AreaModule } from './area/area.module';
import { ServiceModule } from './service/service.module';
import { ActionModule } from './action/action.module';
import { MyActionModule } from './myAction/myAction.module';
import { ServiceSeederService } from '../config/seeder/service.seeder';
import { LoggerMiddleware } from '../config/middleware/logger.middleware';
import { GithubModule } from './externService/service/github/github.module';
import { GoogleModule } from './externService/service/google/google.module';
import { DiscordOAuth2Module } from './externService/oauth2/discord/discord-oauth2.module';
import { GithubOAuth2Module } from './externService/oauth2/github/github-oauth2.module';
import { GoogleOAuth2Module } from './externService/oauth2/google/google-oauth2.module';
import { MiroOAuth2Module } from './externService/oauth2/miro/miro-oauth2.module';
import { NotionOAuth2Module } from './externService/oauth2/notion/notion-oauth2.module';
import { SpotifyOAuth2Module } from './externService/oauth2/spotify/spotify-oauth2.module';
import { TwitchOAuth2Module } from './externService/oauth2/twitch/twitch-oauth2.module';
import { JwtModule } from '@nestjs/jwt';
import { TemplateSeederService } from '../config/seeder/template.seeder';
import { SpotifyModule } from './externService/service/spotify/spotify.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [],
        subscribers: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AuthenticationModule,
    UserModule,
    CredentialsModule,
    GoogleModule,
    GithubModule,
    AreaModule,
    ServiceModule,
    ActionModule,
    MyActionModule,
    GithubModule,
    GoogleModule,
    SpotifyModule,
    DiscordOAuth2Module,
    GithubOAuth2Module,
    GoogleOAuth2Module,
    MiroOAuth2Module,
    NotionOAuth2Module,
    SpotifyOAuth2Module,
    TwitchOAuth2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    private readonly serviceSeederService: ServiceSeederService,
    private readonly actionSeederService: TemplateSeederService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    console.log('Initializing request Logger...');
    consumer.apply(LoggerMiddleware).forRoutes('*');
    console.log('Request Logger initialized.');
  }

  async onModuleInit() {
    await this.serviceSeederService.seed();
    await this.actionSeederService.seed();
  }
}
