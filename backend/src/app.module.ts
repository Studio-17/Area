import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CredentialsModule } from './credentials/credentials.module';
import { ConnectionModule } from './externService/connection/connection.module';
import { GoogleModule } from './externService/google/google.module';
import { AreaModule } from './area/area.module';
import { ServiceModule } from './service/service.module';
import { ActionModule } from './action/action.module';
import { MyActionModule } from './myAction/myAction.module';

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
    ConnectionModule,
    GoogleModule,
    AreaModule,
    ServiceModule,
    ActionModule,
    MyActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
