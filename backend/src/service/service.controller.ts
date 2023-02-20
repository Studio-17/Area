import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags } from '@nestjs/swagger';
import { IsServiceDto } from './dto/is-service.dto';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { JwtService } from '@nestjs/jwt';
import { UserId } from '../utils/decorators/user-id.decorator';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getAll() {
    return this.serviceService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':serviceName')
  async getOne(@UserId() userId, @Param() { serviceName }: IsServiceDto) {
    return this.serviceService.findOne(serviceName, userId);
  }
}
