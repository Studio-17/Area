import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { Action } from './action.entity';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Action]), ServiceModule],
  providers: [ActionService],
  controllers: [ActionController],
  exports: [ActionService],
})
export class ActionModule {}
