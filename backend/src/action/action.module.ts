import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { ActionEntity } from './entity/action.entity';
import { ServiceModule } from 'src/service/service.module';
import { TemplateEntity } from './entity/template.entity';
import { TemplateSeederService } from '../../config/seeder/template.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity, TemplateEntity]), ServiceModule],
  providers: [ActionService, TemplateSeederService],
  controllers: [ActionController],
  exports: [ActionService, TemplateSeederService],
})
export class ActionModule {}
