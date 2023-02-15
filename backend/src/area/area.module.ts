import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area } from './area.entity';
import { MyActionModule } from 'src/myAction/myAction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Area]), forwardRef(() => MyActionModule)],
  providers: [AreaService],
  controllers: [AreaController],
  exports: [AreaService],
})
export class AreaModule {}