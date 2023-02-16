import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service-dto';
import { UpdateServiceDto } from './dto/update-service-dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@ApiTags('Service')
// @UseGuards(JwtAuthenticationGuard)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // @Post()
  // async create(@Body() createServiceDto: CreateServiceDto) {
  //   return this.serviceService.create(createServiceDto);
  // }

  @Get()
  async getAll() {
    return this.serviceService.findAll();
  }

  @Get(':serviceName')
  async getOne(@Param('serviceName') serviceName: string) {
    return this.serviceService.findOne(serviceName);
  }

  // @Patch(':serviceName')
  // async update(@Param('serviceName') serviceName: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.serviceService.update(serviceName, updateServiceDto);
  // }

  // @Delete(':serviceName')
  // async delete(@Param('serviceName') serviceName: string) {
  //   return this.serviceService.remove(serviceName);
  // }
}
