import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { ActionEntity } from './entity/action.entity';
import { ActionSeederService } from '../../config/seeder/action.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity])],
  providers: [ActionService, ActionSeederService],
  controllers: [ActionController],
  exports: [ActionService, ActionSeederService],
})
export class ActionModule {}
