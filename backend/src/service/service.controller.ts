import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags } from '@nestjs/swagger';
import { IsServiceDto } from './dto/is-service.dto';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getAll() {
    return this.serviceService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':serviceName')
  async getOne(@Req() request, @Param() { serviceName }: IsServiceDto) {
    const user = await this.userService.findByEmail(request.user.email);

    return this.serviceService.findOne(serviceName, user.uuid);
  }
}
