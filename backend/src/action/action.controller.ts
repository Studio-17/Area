import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action-dto';
import { UpdateActionDto } from './dto/update-action-dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { ActionEntity } from './entity/action.entity';
import { IsServiceDto } from '../service/dto/is-service.dto';

@ApiTags('Action')
@UseGuards(JwtAuthenticationGuard)
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  // COMMENTED BECAUSE OF SECURITY : ACTION MODIFICATION ISN'T ACCESSIBLE FROM OUTSIDE THE APP
  // @Post(':serviceName')
  // async create(
  //   @Param() { serviceName }: IsServiceDto,
  //   @Body() createActionDto: CreateActionDto,
  // ): Promise<ActionEntity> {
  //   return this.actionService.create(serviceName, createActionDto);
  // }

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

  // COMMENTED BECAUSE OF SECURITY : ACTION MODIFICATION ISN'T ACCESSIBLE FROM OUTSIDE THE APP
  // @Patch(':actionId')
  // async update(
  //   @IsUuidParam('actionId') actionId: string,
  //   @Body() updateActionDto: UpdateActionDto,
  // ): Promise<ActionEntity> {
  //   return this.actionService.update(actionId, updateActionDto);
  // }

  // COMMENTED BECAUSE OF SECURITY : ACTION MODIFICATION ISN'T ACCESSIBLE FROM OUTSIDE THE APP
  // @Delete(':actionId')
  // async delete(@IsUuidParam('actionId') actionId: string): Promise<string> {
  //   return this.actionService.remove(actionId);
  // }
}
