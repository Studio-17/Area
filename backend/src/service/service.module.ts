import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './service.entity';
import { ServiceSeederService } from '../../config/seeders/service.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceService, ServiceSeederService],
  controllers: [ServiceController],
  exports: [ServiceService, ServiceSeederService],
})
export class ServiceModule {}
