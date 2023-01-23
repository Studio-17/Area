import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooniesService } from './coonies.service';
import { CooniesController } from './coonies.controller';
import { Coonies } from './coonies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coonies])],
  providers: [CooniesService],
  controllers: [CooniesController],
  exports: [CooniesService],
})
export class CooniesModule {}
