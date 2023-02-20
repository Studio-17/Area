import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { ActionEntity } from './entity/action.entity';
import { ServiceModule } from 'src/service/service.module';
import { ActionSeederService } from '../../config/seeder/action.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity]), ServiceModule],
  providers: [ActionService, ActionSeederService],
  controllers: [ActionController],
  exports: [ActionService, ActionSeederService],
})
export class ActionModule {}
