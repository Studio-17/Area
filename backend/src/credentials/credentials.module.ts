import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsController } from './credentials.controller';
import { Credentials } from './entities/credentials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credentials])],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class CredentialsModule {}
