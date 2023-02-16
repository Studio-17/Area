import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags } from '@nestjs/swagger';
import { IsServiceDto } from './dto/is-service.dto';
import {JwtAuthenticationGuard} from "../authentication/guards/jwt-authentication.guard";
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Service')
// @UseGuards(JwtAuthenticationGuard)
@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly jwtService: JwtService,
  ) {}

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
  async getOne(@Param() { serviceName }: IsServiceDto, @Req() req: Request) {
    // ----- TO CLEAN ---
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    console.log('-----', json, '-----');
    // ----- TO CLEAN ---
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
