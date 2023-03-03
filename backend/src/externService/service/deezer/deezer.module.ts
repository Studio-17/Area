import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { UserModule } from 'src/user/user.module';
import { DeezerController } from './deezer.controller';
import { DeezerService } from './deezer.service';

@Module({
  imports: [TypeOrmModule.forFeature([]), HttpModule.register({}), CredentialsModule, UserModule],
  providers: [DeezerService],
  controllers: [DeezerController],
  exports: [DeezerService],
})
export class DeezerModule {}
