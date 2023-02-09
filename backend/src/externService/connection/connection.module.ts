import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { HttpModule } from '@nestjs/axios';
import { CredentialsModule } from '../../credentials/credentials.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CredentialsModule,
  ],
  providers: [ConnectionService],
  controllers: [ConnectionController],
})
export class ConnectionModule {}
