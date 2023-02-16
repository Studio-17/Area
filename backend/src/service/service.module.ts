import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceEntity} from './entity/service.entity';
import { ServiceSeederService } from '../../config/seeder/service.seeder';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceService, ServiceSeederService, JwtService],
  controllers: [ServiceController],
  exports: [ServiceService, ServiceSeederService],
})
export class ServiceModule {}
