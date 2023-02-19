import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags } from '@nestjs/swagger';
import { IsServiceDto } from './dto/is-service.dto';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserId } from '../utils/decorators/user-id.decorator';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly jwtService: JwtService,
  ) {}

  // COMMENTED BECAUSE OF SECURITY : SERVICE MODIFICATION ISN'T ACCESSIBLE FROM OUTSIDE THE APP
  // @Post()
  // async create(@Body() createServiceDto: CreateServiceDto) {
  //   return this.serviceService.create(createServiceDto);
  // }

  @Get()
  async getAll() {
    return this.serviceService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':serviceName')
  async getOne(@UserId() userId, @Param() { serviceName }: IsServiceDto, @Req() req: Request) {
    return this.serviceService.findOne(serviceName, userId);
  }

  // COMMENTED BECAUSE OF SECURITY : SERVICE MODIFICATION ISN'T ACCESSIBLE FROM OUTSIDE THE APP
  // @Patch(':serviceName')
  // async update(@Param('serviceName') serviceName: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.serviceService.update(serviceName, updateServiceDto);
  // }

  // COMMENTED BECAUSE OF SECURITY : SERVICE MODIFICATION ISN'T ACCESSIBLE FROM OUTSIDE THE APP
  // @Delete(':serviceName')
  // async delete(@Param('serviceName') serviceName: string) {
  //   return this.serviceService.remove(serviceName);
  // }
}
