import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action-dto';
import { UpdateActionDto } from './dto/update-action-dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { ServiceList } from '../service/entity/service.entity';
import { ActionEntity } from './entity/action.entity';

@ApiTags('Action')
@UseGuards(JwtAuthenticationGuard)
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post(':serviceName')
  async create(
    @IsUuidParam('serviceName') serviceName: ServiceList,
    @Body() createActionDto: CreateActionDto,
  ): Promise<ActionEntity> {
    return this.actionService.create(serviceName, createActionDto);
  }

  @Get()
  async getAll(): Promise<ActionEntity[]> {
    return this.actionService.findAll();
  }

  @Get('/service/:serviceName')
  async getByService(
    @IsUuidParam('serviceName') serviceName: ServiceList,
  ): Promise<ActionEntity[]> {
    return this.actionService.findByService(serviceName);
  }

  @Get(':actionId')
  async getOne(@IsUuidParam('actionId') actionId: string): Promise<ActionEntity> {
    return this.actionService.findOne(actionId);
  }

  @Patch(':actionId')
  async update(
    @IsUuidParam('actionId') actionId: string,
    @Body() updateActionDto: UpdateActionDto,
  ): Promise<ActionEntity> {
    return this.actionService.update(actionId, updateActionDto);
  }

  @Delete(':actionId')
  async delete(@IsUuidParam('actionId') actionId: string): Promise<string> {
    return this.actionService.remove(actionId);
  }
}
