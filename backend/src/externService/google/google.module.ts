import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GmailRecord } from './entity/gmail/gmail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GmailRecord])],
  providers: [GoogleService],
  controllers: [GoogleController],
})
export class GoogleModule {}
