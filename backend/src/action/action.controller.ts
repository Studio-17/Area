import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { ActionService } from './action.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { ActionEntity } from './entity/action.entity';
import { IsServiceDto } from '../service/dto/is-service.dto';

@ApiTags('Action')
@UseGuards(JwtAuthenticationGuard)
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get()
  async getAll(): Promise<ActionEntity[]> {
    return this.actionService.findAll();
  }

  @Get('/service/:serviceName')
  async getByService(@Param() { serviceName }: IsServiceDto): Promise<ActionEntity[]> {
    return this.actionService.findByService(serviceName);
  }

  @Get(':actionId')
  async getOne(@IsUuidParam('actionId') actionId: string): Promise<ActionEntity> {
    return this.actionService.findOne(actionId);
  }
}
