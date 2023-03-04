import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsController } from './credentials.controller';
import { CredentialsEntity } from './entity/credentials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialsEntity])],
  controllers: [CredentialsController],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
