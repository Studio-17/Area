import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service-dto';
import { UpdateServiceDto } from './dto/update-service-dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async getAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async getOne(@IsUuidParam('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @IsUuidParam('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async delete(@IsUuidParam('id') id: string) {
    return this.serviceService.remove(id);
  }
}
