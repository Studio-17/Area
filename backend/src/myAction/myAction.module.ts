import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from 'src/action/action.module';
import { AreaModule } from 'src/area/area.module';
import { GoogleModule } from 'src/externService/service/google/google.module';
import { MyActionController } from './myAction.controller';
import { MyAction } from './myAction.entity';
import { MyActionService } from './myAction.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([MyAction]),
    ActionModule,
    forwardRef(() => AreaModule),
    forwardRef(() => GoogleModule),
  ],
  providers: [MyActionService],
  controllers: [MyActionController],
  exports: [MyActionService],
})
export class MyActionModule {}
